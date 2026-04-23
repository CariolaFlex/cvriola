# Módulo: Exportación

## 1. Descripción General
El módulo de exportación es responsable de generar los documentos finales en múltiples formatos: PDF vectorial, PNG, JPG y HTML. Cada formato tiene su propia pipeline de generación optimizada para calidad y rendimiento.

---

## 2. Arquitectura de Exportación

### 2.1 Diagrama General
```
┌─────────────────────────────────────────────────────────────────┐
│                    DATOS DEL CV (Zustand)                        │
│                         cvData + meta                            │
└─────────────────────────────┬───────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
        ┌─────────┐     ┌─────────┐     ┌─────────┐
        │   PDF   │     │ PNG/JPG │     │   HTML  │
        │Pipeline │     │ Pipeline│     │ Pipeline│
        └────┬────┘     └────┬────┘     └────┬────┘
             │               │               │
             ▼               ▼               ▼
        ┌─────────┐     ┌─────────┐     ┌─────────┐
        │Playwright│    │html-to- │     │Template │
        │  (API)  │     │ image   │     │ Render  │
        └────┬────┘     └────┬────┘     └────┬────┘
             │               │               │
             ▼               ▼               ▼
        ┌─────────┐     ┌─────────┐     ┌─────────┐
        │   PDF   │     │PNG / JPG│     │  HTML   │
        │ Vectorial│    │  Blob   │     │ String  │
        └─────────┘     └─────────┘     └─────────┘
```

---

## 3. Exportación PDF

### 3.1 Endpoint API
**Ubicación:** `app/api/export/pdf/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(request: NextRequest) {
  try {
    const { cvData, templateId, pageSize, theme } = await request.json();
    
    // 1. Renderizar HTML
    const html = await renderTemplateToHTML({
      templateId,
      cvData,
      theme,
    });
    
    // 2. Lanzar navegador
    const browser = await chromium.launch({
      headless: true,
    });
    
    const page = await browser.newPage();
    
    // 3. Cargar contenido
    await page.setContent(html, {
      waitUntil: 'networkidle',
    });
    
    // 4. Esperar fuentes
    await page.waitForFunction(() => 
      document.fonts.ready.then(() => true)
    );
    
    // 5. Generar PDF
    const pdf = await page.pdf({
      width: pageSize.width,
      height: pageSize.height,
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
      format: pageSize.format || undefined,
    });
    
    await browser.close();
    
    // 6. Retornar como response
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${cvData.basics.name.replace(/\s+/g, '_')}_CV.pdf"`,
      },
    });
    
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
```

### 3.2 Renderizado HTML
**Ubicación:** `lib/utils/renderTemplate.ts`

```typescript
import { renderToString } from 'react-dom/server';
import { TemplateRegistry } from '@/lib/templates/registry';

interface RenderOptions {
  templateId: string;
  cvData: CVData;
  theme: ThemeConfig;
}

export async function renderTemplateToHTML(options: RenderOptions): Promise<string> {
  const { templateId, cvData, theme } = options;
  
  // Obtener plantilla
  const template = TemplateRegistry.get(templateId);
  if (!template) throw new Error(`Template ${templateId} not found`);
  
  // Renderizar componente a string
  const Component = template.component;
  const componentHTML = renderToString(
    <Component 
      data={cvData} 
      theme={theme}
    />
  );
  
  // Generar HTML completo con estilos
  const fullHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>${cvData.basics.name} - CV</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=${theme.headingFont}&family=${theme.bodyFont}&display=swap" rel="stylesheet">
      <style>
        /* Reset */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* Variables CSS */
        :root {
          --primary-color: ${theme.primaryColor};
          --secondary-color: ${theme.secondaryColor};
          --accent-color: ${theme.accentColor};
          --background-color: ${theme.backgroundColor};
          --text-color: ${theme.textColor};
          --muted-color: ${theme.mutedColor};
          --heading-font: '${theme.headingFont}', serif;
          --body-font: '${theme.bodyFont}', sans-serif;
        }
        
        /* Estilos de impresión */
        @media print {
          @page {
            size: ${pageSize.width} ${pageSize.height};
            margin: 0;
          }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        
        /* Estilos de la plantilla */
        ${template.styles}
      </style>
    </head>
    <body>
      ${componentHTML}
    </body>
    </html>
  `;
  
  return fullHTML;
}
```

### 3.3 Características del PDF
- **Vectorial:** Texto seleccionable y searchable
- **ATS-friendly:** Estructura semántica preservada
- **Alta calidad:** Sin pixelación
- **Tamaño optimizado:** ~100-300KB típicamente
- **Fuentes embebidas:** Google Fonts incluidas

---

## 4. Exportación PNG/JPG

### 4.1 Implementación Cliente
**Ubicación:** `lib/utils/exportImage.ts`

```typescript
import { toPng, toJpeg } from 'html-to-image';

interface ImageExportOptions {
  node: HTMLElement;
  format: 'png' | 'jpg';
  quality?: number; // 0-1 for JPG
  pixelRatio?: number; // For high DPI
}

export async function exportAsImage(options: ImageExportOptions): Promise<Blob> {
  const { node, format, quality = 0.95, pixelRatio = 2 } = options;
  
  const config = {
    quality,
    pixelRatio,
    backgroundColor: '#ffffff',
    cacheBust: true,
    // Fuentes
    fontEmbedCSS: await getFontEmbedCSS(),
  };
  
  let dataUrl: string;
  
  if (format === 'png') {
    dataUrl = await toPng(node, config);
  } else {
    dataUrl = await toJpeg(node, config);
  }
  
  // Convertir DataURL a Blob
  const response = await fetch(dataUrl);
  return response.blob();
}

// Helper para embeber fuentes
async function getFontEmbedCSS(): Promise<string> {
  const fonts = document.querySelectorAll('link[rel="stylesheet"]');
  let css = '';
  
  for (const font of fonts) {
    if (font instanceof HTMLLinkElement) {
      try {
        const response = await fetch(font.href);
        css += await response.text();
      } catch (e) {
        console.warn('Could not fetch font:', font.href);
      }
    }
  }
  
  return css;
}
```

### 4.2 Hook de Exportación
**Ubicación:** `hooks/useExport.ts`

```typescript
import { useState, useCallback } from 'react';
import { exportAsImage } from '@/lib/utils/exportImage';

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const exportPDF = useCallback(async (cvData: CVData, templateId: string) => {
    setIsExporting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData, templateId }),
      });
      
      if (!response.ok) throw new Error('PDF export failed');
      
      const blob = await response.blob();
      downloadBlob(blob, `${cvData.basics.name}_CV.pdf`);
      
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setIsExporting(false);
    }
  }, []);
  
  const exportImage = useCallback(async (
    node: HTMLElement, 
    cvData: CVData,
    format: 'png' | 'jpg'
  ) => {
    setIsExporting(true);
    setError(null);
    
    try {
      const blob = await exportAsImage({ node, format });
      downloadBlob(blob, `${cvData.basics.name}_CV.${format}`);
      
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setIsExporting(false);
    }
  }, []);
  
  const exportHTML = useCallback((cvData: CVData, html: string) => {
    const blob = new Blob([html], { type: 'text/html' });
    downloadBlob(blob, `${cvData.basics.name}_CV.html`);
  }, []);
  
  return {
    exportPDF,
    exportImage,
    exportHTML,
    isExporting,
    error,
  };
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

---

## 5. Exportación HTML

### 5.1 Implementación
**Ubicación:** `lib/utils/exportHTML.ts`

```typescript
interface HTMLExportOptions {
  cvData: CVData;
  templateId: string;
  theme: ThemeConfig;
  includeStyles: boolean;
  standalone: boolean;
}

export function exportAsHTML(options: HTMLExportOptions): string {
  const { cvData, templateId, theme, includeStyles = true, standalone = true } = options;
  
  const template = TemplateRegistry.get(templateId);
  if (!template) throw new Error(`Template ${templateId} not found`);
  
  // Renderizar componente
  const componentHTML = renderToString(
    <template.component data={cvData} theme={theme} />
  );
  
  if (standalone) {
    // HTML completo autocontenido
    return generateStandaloneHTML({
      componentHTML,
      cvData,
      theme,
      template,
      includeStyles,
    });
  }
  
  // Solo el componente
  return componentHTML;
}

function generateStandaloneHTML(params: {
  componentHTML: string;
  cvData: CVData;
  theme: ThemeConfig;
  template: TemplateDefinition;
  includeStyles: boolean;
}): string {
  const { componentHTML, cvData, theme, template, includeStyles } = params;
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cvData.basics.name} - Currículum Vitae</title>
  <meta name="description" content="${cvData.basics.summary || ''}">
  <meta name="author" content="${cvData.basics.name}">
  
  ${includeStyles ? `
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(theme.headingFont)}:wght@400;600&family=${encodeURIComponent(theme.bodyFont)}:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Estilos -->
  <style>
    ${generateInlineStyles(theme, template)}
  </style>
  ` : ''}
  
  <!-- JSON-LD para SEO -->
  <script type="application/ld+json">
  ${JSON.stringify(generatePersonSchema(cvData))}
  </script>
</head>
<body>
  ${componentHTML}
</body>
</html>`;
}

function generatePersonSchema(cvData: CVData): object {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": cvData.basics.name,
    "jobTitle": cvData.basics.label,
    "email": cvData.basics.email,
    "telephone": cvData.basics.phone,
    "url": cvData.basics.url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cvData.basics.location.city,
      "addressCountry": cvData.basics.location.countryCode,
    },
    "sameAs": cvData.basics.profiles.map(p => p.url),
  };
}
```

---

## 6. Botones de Exportación

### 6.1 ExportButtons.tsx
**Ubicación:** `components/toolbar/ExportButtons.tsx`

```typescript
import { useState } from 'react';
import { Download, FileText, Image, Code, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useExport } from '@/hooks/useExport';

export function ExportButtons() {
  const { exportPDF, exportImage, exportHTML, isExporting, error } = useExport();
  const cvData = useCVStore((state) => state.cvData);
  const templateId = useCVStore((state) => state.cvData.meta.templateId);
  const previewRef = useUIStore((state) => state.previewRef);
  
  const handleExportPDF = () => {
    exportPDF(cvData, templateId);
  };
  
  const handleExportPNG = () => {
    if (previewRef.current) {
      exportImage(previewRef.current, cvData, 'png');
    }
  };
  
  const handleExportJPG = () => {
    if (previewRef.current) {
      exportImage(previewRef.current, cvData, 'jpg');
    }
  };
  
  const handleExportHTML = async () => {
    const html = exportAsHTML({ cvData, templateId, theme: cvData.meta.themeConfig });
    downloadBlob(new Blob([html], { type: 'text/html' }), `${cvData.basics.name}_CV.html`);
  };
  
  return (
    <>
      {/* Botón principal PDF */}
      <Button 
        onClick={handleExportPDF} 
        disabled={isExporting}
        className="gap-2"
      >
        {isExporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
        Descargar PDF
      </Button>
      
      {/* Dropdown más formatos */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Más formatos
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
            PDF (Vectorial)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportPNG}>
            <Image className="h-4 w-4 mr-2" />
            PNG (Alta resolución)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportJPG}>
            <Image className="h-4 w-4 mr-2" />
            JPG (Comprimido)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportHTML}>
            <Code className="h-4 w-4 mr-2" />
            HTML (Código fuente)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </>
  );
}
```

---

## 7. Optimizaciones de Rendimiento

### 7.1 Caché de Plantillas
```typescript
const templateCache = new Map<string, string>();

async function getCachedTemplateHTML(templateId: string): Promise<string> {
  if (templateCache.has(templateId)) {
    return templateCache.get(templateId)!;
  }
  
  const html = await renderTemplateToHTML(templateId);
  templateCache.set(templateId, html);
  return html;
}
```

### 7.2 Compresión de Respuesta
```typescript
// En API route
import { compress } from 'compression';

// Aplicar compresión gzip para respuestas grandes
export const config = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
```

---

## 8. Manejo de Errores

### 8.1 Errores Comunes
| Error | Causa | Solución |
|-------|-------|----------|
| Timeout | PDF muy grande | Reducir contenido o usar paginación |
| Font not loaded | Google Fonts no carga | Fallback a fuentes del sistema |
| Memory limit | Imágenes muy grandes | Comprimir antes de procesar |
| Network error | API no responde | Reintentar con backoff |

### 8.2 Retry Logic
```typescript
async function exportWithRetry(
  fn: () => Promise<Blob>, 
  maxRetries = 3
): Promise<Blob> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // Backoff
    }
  }
  
  throw lastError;
}
```

---

## 9. Dependencias del Módulo

```json
{
  "dependencies": {
    "playwright": "^1.x",
    "html-to-image": "^1.x",
    "react-dom": "^19.x"
  }
}
```

---

## 10. Testing

### 10.1 Casos de Test
- [ ] PDF se genera correctamente
- [ ] PDF es legible y vectorial
- [ ] PNG se genera en alta resolución
- [ ] JPG se genera con calidad correcta
- [ ] HTML es válido y completo
- [ ] Fuentes se embeben correctamente
- [ ] Manejo de errores funciona
- [ ] Retry logic funciona

---

**Versión:** 1.0.0  
**Depende de:** Módulo Estado, Módulo Plantillas  
**Dependientes:** N/A (módulo terminal)
