# Sprint 3: Exportación (PDF, PNG, JPG, HTML)

## 1. Objetivo del Sprint
Implementar el sistema completo de exportación para generar documentos en PDF vectorial, PNG de alta resolución, JPG optimizado y HTML limpio. Cada formato debe mantener la fidelidad visual de la plantilla seleccionada.

**Duración estimada:** 4-5 días

---

## 2. Tareas Detalladas

### Tarea 3.1: Instalar Dependencias de Exportación
**Tiempo:** 30 minutos

```bash
# Playwright para PDF (backend)
pnpm add playwright

# html-to-image para PNG/JPG (frontend)
pnpm add html-to-image
```

**Checklist:**
- [ ] Dependencias instaladas
- [ ] Playwright browsers instalados

---

### Tarea 3.2: Crear API Route para PDF
**Tiempo:** 4 horas

**Archivo:** `src/app/api/export/pdf/route.ts`

Implementar:
- Endpoint POST que recibe cvData
- Renderizado de plantilla a HTML
- Lanzamiento de navegador Playwright
- Generación de PDF vectorial
- Respuesta con archivo PDF

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

export async function POST(request: NextRequest) {
  const { cvData, templateId, theme, pageSize } = await request.json();
  
  // Renderizar HTML
  const html = await renderTemplateToHTML({ templateId, cvData, theme, pageSize });
  
  // Lanzar navegador
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.ready);
  
  // Generar PDF
  const pdf = await page.pdf({
    width: pageSize.width,
    height: pageSize.height,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  
  await browser.close();
  
  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${cvData.basics.name}_CV.pdf"`,
    },
  });
}
```

**Checklist:**
- [ ] API route creada
- [ ] Playwright funciona en serverless
- [ ] PDF se genera correctamente
- [ ] Fuentes cargan en el PDF

---

### Tarea 3.3: Crear Función renderTemplateToHTML
**Tiempo:** 3 horas

**Archivo:** `src/lib/utils/renderTemplate.ts`

Implementar:
- Renderizado de componente React a string
- Generación de HTML completo
- Inclusión de estilos
- Carga de fuentes de Google

```typescript
import { renderToString } from 'react-dom/server';

export async function renderTemplateToHTML(options: RenderOptions): Promise<string> {
  const { templateId, cvData, theme, pageSize } = options;
  
  const template = TemplateRegistry.get(templateId);
  const Component = template.component;
  
  const componentHTML = renderToString(
    <Component data={cvData} theme={theme} />
  );
  
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
      <style>
        ${generateBaseStyles(theme, pageSize)}
        ${template.styles}
      </style>
    </head>
    <body>
      ${componentHTML}
    </body>
    </html>
  `;
}
```

**Checklist:**
- [ ] Función creada
- [ ] HTML generado es válido
- [ ] Estilos incluidos

---

### Tarea 3.4: Crear Funciones de Exportación de Imagen
**Tiempo:** 3 horas

**Archivo:** `src/lib/utils/exportImage.ts`

Implementar:
- Exportación a PNG con html-to-image
- Exportación a JPG con calidad configurable
- Manejo de alta resolución (pixelRatio)
- Embebido de fuentes

```typescript
import { toPng, toJpeg } from 'html-to-image';

export async function exportAsImage(options: ImageExportOptions): Promise<Blob> {
  const { node, format, quality = 0.95, pixelRatio = 2 } = options;
  
  const config = {
    quality,
    pixelRatio,
    backgroundColor: '#ffffff',
    cacheBust: true,
    fontEmbedCSS: await getFontEmbedCSS(),
  };
  
  const dataUrl = format === 'png' 
    ? await toPng(node, config)
    : await toJpeg(node, config);
  
  const response = await fetch(dataUrl);
  return response.blob();
}
```

**Checklist:**
- [ ] PNG se genera
- [ ] JPG se genera
- [ ] Alta resolución funciona
- [ ] Fuentes se embeben

---

### Tarea 3.5: Crear Función de Exportación HTML
**Tiempo:** 2 horas

**Archivo:** `src/lib/utils/exportHTML.ts`

Implementar:
- Generación de HTML standalone
- Inclusión de estilos inline
- Schema.org markup
- Meta tags para SEO

**Checklist:**
- [ ] HTML completo generado
- [ ] Válido W3C
- [ ] Schema.org incluido

---

### Tarea 3.6: Crear Hook useExport
**Tiempo:** 3 horas

**Archivo:** `src/hooks/useExport.ts`

Implementar:
- exportPDF()
- exportImage(format)
- exportHTML()
- Estado de carga
- Manejo de errores
- Retry logic

```typescript
export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const exportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/export/pdf', {
        method: 'POST',
        body: JSON.stringify({ cvData, templateId, theme, pageSize }),
      });
      const blob = await response.blob();
      downloadBlob(blob, `${cvData.basics.name}_CV.pdf`);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsExporting(false);
    }
  }, [cvData, templateId, theme, pageSize]);
  
  return { exportPDF, exportImage, exportHTML, isExporting, error };
}
```

**Checklist:**
- [ ] Hook creado
- [ ] Todas las exportaciones funcionan
- [ ] Estados de carga
- [ ] Manejo de errores

---

### Tarea 3.7: Crear Componente ExportButtons
**Tiempo:** 2 horas

**Archivo:** `src/components/toolbar/ExportButtons.tsx`

Implementar:
- Botón principal "Descargar PDF"
- Dropdown con más formatos
- Indicador de carga
- Mensajes de error

**Checklist:**
- [ ] Botones creados
- [ ] UI clara
- [ ] Estados visuales

---

### Tarea 3.8: Implementar Paginación para PDF
**Tiempo:** 4 horas

**Archivo:** `src/lib/utils/pagination.ts`

Implementar:
- Cálculo de altura de contenido
- Detección de overflow
- División en páginas
- CSS para evitar cortes

```css
/* Evitar cortes */
.section { break-inside: avoid; }
.entry { break-inside: avoid; }

/* Estilos de página */
@page {
  size: A4;
  margin: 0;
}
@page :first {
  /* Primera página diferente si es necesario */
}
```

**Checklist:**
- [ ] Paginación detectada
- [ ] Múltiples páginas se generan
- [ ] No hay cortes en secciones

---

### Tarea 3.9: Optimizar Rendimiento de Exportación
**Tiempo:** 2 horas

Implementar:
- Caché de plantillas renderizadas
- Compresión de respuestas
- Timeouts apropiados

**Checklist:**
- [ ] Caché implementado
- [ ] Tiempos de respuesta < 5s

---

### Tarea 3.10: Testing de Exportación
**Tiempo:** 2 horas

Probar:
- PDF con cada plantilla
- PNG/JPG con cada plantilla
- HTML con cada plantilla
- Múltiples páginas
- Casos edge (CV vacío, CV muy largo)

**Checklist:**
- [ ] Todas las exportaciones probadas
- [ ] Casos edge manejados

---

## 3. Criterios de Aceptación

### Al finalizar el Sprint 3:
- [ ] PDF se genera correctamente con todas las plantillas
- [ ] PDF es vectorial (texto seleccionable)
- [ ] PNG se genera en alta resolución
- [ ] JPG se genera optimizado
- [ ] HTML es válido y autocontenido
- [ ] Indicador de carga durante exportación
- [ ] Errores se muestran al usuario
- [ ] Paginación funciona para CVs largos

---

## 4. Entregables

| Entregable | Ubicación |
|------------|-----------|
| API PDF | `src/app/api/export/pdf/route.ts` |
| renderTemplateToHTML | `src/lib/utils/renderTemplate.ts` |
| exportAsImage | `src/lib/utils/exportImage.ts` |
| exportAsHTML | `src/lib/utils/exportHTML.ts` |
| useExport | `src/hooks/useExport.ts` |
| ExportButtons | `src/components/toolbar/ExportButtons.tsx` |
| pagination | `src/lib/utils/pagination.ts` |

---

## 5. Dependencias para Siguiente Sprint

- Exportación completa funcionando
- PDF vectorial ATS-friendly
- Todos los formatos disponibles

---

**Sprint:** 3 de 4  
**Estado:** Pendiente  
**Bloqueado por:** Sprint 2
