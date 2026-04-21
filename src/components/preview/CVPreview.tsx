'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useCVStore } from '@/lib/store/cvStore';
import { TEMPLATE_MAP } from '@/components/templates/CVTemplates';

export function CVPreview() {
  const { cvData } = useCVStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.5);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Fonts
    if (cvData) {
      const { headingFont, bodyFont } = cvData.meta.typographyConfig;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(headingFont)}:wght@400;600;700&family=${encodeURIComponent(bodyFont)}:wght@400;500;600&display=swap`;
      document.head.appendChild(link);
      
      link.onload = () => setFontsLoaded(true);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [cvData?.meta.typographyConfig.headingFont, cvData?.meta.typographyConfig.bodyFont]);

  if (!cvData) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-200">
        <p className="text-slate-500">Selecciona o crea un CV para previsualizar</p>
      </div>
    );
  }

  const Template = TEMPLATE_MAP[cvData.meta.templateId] || TEMPLATE_MAP.classic;
  const theme = cvData.meta.themeConfig;
  const typography = cvData.meta.typographyConfig;

  return (
    <div className="h-full flex flex-col bg-slate-300">
      {/* Zoom Controls */}
      <div className="flex items-center justify-center gap-2 py-2 bg-slate-100 border-b">
        <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium w-16 text-center">{Math.round(zoom * 100)}%</span>
        <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setZoom(0.5)}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-4 flex justify-center">
        <div
          ref={previewRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <Template data={cvData} theme={theme} typography={typography} />
        </div>
      </div>
    </div>
  );
}
