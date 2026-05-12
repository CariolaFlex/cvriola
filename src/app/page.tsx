'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CVEditor } from '@/components/editor/CVEditor';
import { CVPreview } from '@/components/preview/CVPreview';
import { Dashboard } from '@/components/editor/Dashboard';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { useCVStore } from '@/lib/store/cvStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { TEMPLATE_MAP } from '@/components/templates/CVTemplates';
import { renderToStaticMarkup } from 'react-dom/server';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function Home() {
  const { cvData, activeView, setActiveView, saveCV } = useCVStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Auto-save on changes
  useEffect(() => {
    if (cvData) {
      const timer = setTimeout(() => {
        saveCV();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cvData, saveCV]);

  const generateHTML = useCallback(() => {
    if (!cvData) return '';
    
    const Template = TEMPLATE_MAP[cvData.meta.templateId] || TEMPLATE_MAP.classic;
    const theme = cvData.meta.themeConfig;
    const typography = cvData.meta.typographyConfig;
    
    const content = renderToStaticMarkup(<Template data={cvData} theme={theme} typography={typography} />);
    
    const { headingFont, bodyFont } = typography;
    
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cvData.basics.name || 'CV'} - Currículum Vitae</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(headingFont)}:wght@400;600;700&family=${encodeURIComponent(bodyFont)}:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #f5f5f5; padding: 20px; font-family: '${bodyFont}', sans-serif; }
    .cv-template { margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
    @media print {
      body { background: white; padding: 0; }
      .cv-template { box-shadow: none; }
      @page { margin: 0; size: A4; }
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
  }, [cvData]);

  const exportPDF = async () => {
    if (!cvData) return;
    setIsExporting(true);

    try {
      const html = generateHTML();

      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 500);
        toast.success('PDF listo para imprimir', {
          description: 'Usa el diálogo de impresión para guardar como PDF'
        });
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Error al exportar PDF');
    } finally {
      setIsExporting(false);
    }
  };

  const exportFitPage = async () => {
    if (!cvData) return;
    setIsExporting(true);

    try {
      const html = generateHTML();
      const printWindow = window.open('', '_blank');
      if (!printWindow) { setIsExporting(false); return; }

      printWindow.document.write(html);
      printWindow.document.close();

      const fitAndPrint = () => {
        try {
          const cvEl = printWindow.document.querySelector('.cv-template');
          if (cvEl) {
            // A4 height in CSS pixels at 96 DPI: 297mm × (96px/25.4mm) ≈ 1122px
            const A4H = Math.round((297 / 25.4) * 96);
            const contentH = cvEl.scrollHeight;

            if (contentH > A4H) {
              const scale = (A4H / contentH).toFixed(4);
              // zoom (unlike transform) changes layout flow → browser counts fewer pages
              const s = printWindow.document.createElement('style');
              s.textContent = `@media print { html { zoom: ${scale}; } @page { size: A4 portrait; margin: 0; } }`;
              printWindow.document.head.appendChild(s);
            }
          }
        } catch (_) {/* continue even on measurement error */}

        printWindow.print();
        setIsExporting(false);
      };

      // Wait for Google Fonts to finish loading before measuring
      if (printWindow.document.fonts) {
        printWindow.document.fonts.ready.then(() => setTimeout(fitAndPrint, 300));
      } else {
        setTimeout(fitAndPrint, 1500);
      }

      toast.success('Preparando PDF de una página...', {
        description: 'El contenido se escalará automáticamente para caber en A4'
      });
    } catch (error) {
      console.error('Error exporting fit-page PDF:', error);
      toast.error('Error al exportar PDF una página');
      setIsExporting(false);
    }
  };

  const exportImage = async (format: 'png' | 'jpg') => {
    if (!previewRef.current) return;
    setIsExporting(true);
    
    try {
      const cvElement = previewRef.current.querySelector('.cv-template');
      if (!cvElement) {
        toast.error('No se encontró el CV para exportar');
        return;
      }
      
      // Create a canvas with proper dimensions
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const scale = 2; // High resolution
      const width = cvElement.clientWidth;
      const height = cvElement.clientHeight;
      
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);
      
      // Use foreignObject SVG approach
      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${cvElement.innerHTML}
          </div>
        </foreignObject>
      </svg>`;
      
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `${cvData?.basics.name || 'CV'}_CV.${format}`;
        link.href = canvas.toDataURL(format === 'jpg' ? 'image/jpeg' : 'image/png', 0.95);
        link.click();
        
        URL.revokeObjectURL(url);
        setIsExporting(false);
        toast.success(`${format.toUpperCase()} exportado correctamente`);
      };
      
      img.onerror = () => {
        toast.error('Error al generar la imagen');
        URL.revokeObjectURL(url);
        setIsExporting(false);
      };
      
      img.src = url;
    } catch (error) {
      console.error('Error exporting image:', error);
      toast.error('Error al exportar imagen');
      setIsExporting(false);
    }
  };

  const exportPNG = () => exportImage('png');
  const exportJPG = () => exportImage('jpg');

  const exportHTML = () => {
    if (!cvData) return;
    
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `${cvData.basics.name || 'CV'}_CV.html`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    toast.success('HTML exportado correctamente');
  };

  // Dashboard view
  if (activeView === 'dashboard') {
    return <Dashboard />;
  }

  // Editor view
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Toolbar */}
      <Toolbar
        onExportPDF={exportPDF}
        onExportFitPage={exportFitPage}
        onExportPNG={exportPNG}
        onExportJPG={exportJPG}
        onExportHTML={exportHTML}
        isExporting={isExporting}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 left-4 z-10"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveView('dashboard')}
            className="gap-2 shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </motion.div>

        {/* Editor Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-[400px] border-r overflow-hidden bg-muted/30"
        >
          <CVEditor />
        </motion.div>

        {/* Preview Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex-1" 
          ref={previewRef}
        >
          <CVPreview />
        </motion.div>
      </div>
    </div>
  );
}
