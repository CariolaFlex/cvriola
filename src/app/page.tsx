'use client';

import React, { useState, useRef, useCallback } from 'react';
import { CVEditor } from '@/components/editor/CVEditor';
import { CVPreview } from '@/components/preview/CVPreview';
import { Dashboard } from '@/components/editor/Dashboard';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { useCVStore } from '@/lib/store/cvStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { TEMPLATE_MAP } from '@/components/templates/CVTemplates';
import { renderToStaticMarkup } from 'react-dom/server';

export default function Home() {
  const { cvData, activeView, setActiveView } = useCVStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

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
    body { background: #f5f5f5; padding: 20px; }
    .cv-template { margin: 0 auto; }
    @media print {
      body { background: white; padding: 0; }
      .cv-template { box-shadow: none; }
      @page { margin: 0; }
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
      
      // Open print dialog
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportImage = async (format: 'png' | 'jpg') => {
    if (!previewRef.current) return;
    setIsExporting(true);
    
    try {
      const cvElement = previewRef.current.querySelector('.cv-template');
      if (!cvElement) return;
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Use html2canvas approach via SVG
      const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${cvElement.clientWidth}" height="${cvElement.clientHeight}">
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
        canvas.width = img.width * 2;
        canvas.height = img.height * 2;
        ctx.scale(2, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `${cvData?.basics.name || 'CV'}_CV.${format}`;
        link.href = canvas.toDataURL(format === 'jpg' ? 'image/jpeg' : 'image/png', 0.95);
        link.click();
        
        URL.revokeObjectURL(url);
        setIsExporting(false);
      };
      img.src = url;
    } catch (error) {
      console.error('Error exporting image:', error);
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
  };

  // Dashboard view
  if (activeView === 'dashboard') {
    return <Dashboard />;
  }

  // Editor view
  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <Toolbar
        onExportPDF={exportPDF}
        onExportPNG={exportPNG}
        onExportJPG={exportJPG}
        onExportHTML={exportHTML}
        isExporting={isExporting}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Back Button */}
        <div className="absolute top-16 left-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveView('dashboard')}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>

        {/* Editor Panel */}
        <div className="w-[400px] border-r overflow-hidden">
          <CVEditor />
        </div>

        {/* Preview Panel */}
        <div className="flex-1" ref={previewRef}>
          <CVPreview />
        </div>
      </div>
    </div>
  );
}
