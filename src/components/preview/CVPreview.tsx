'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import { useCVStore } from '@/lib/store/cvStore';
import { TEMPLATE_MAP } from '@/components/templates/CVTemplates';
import { motion, AnimatePresence } from 'framer-motion';

export function CVPreview() {
  const { cvData } = useCVStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.5);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Memoize font URLs to prevent unnecessary reloads
  const fontUrl = useMemo(() => {
    if (!cvData) return null;
    const { headingFont, bodyFont } = cvData.meta.typographyConfig;
    return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(headingFont)}:wght@400;600;700&family=${encodeURIComponent(bodyFont)}:wght@400;500;600&display=swap`;
  }, [cvData?.meta.typographyConfig.headingFont, cvData?.meta.typographyConfig.bodyFont]);

  useEffect(() => {
    if (!fontUrl) return;

    // Check if font link already exists
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) {
      setFontsLoaded(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    link.onload = () => setFontsLoaded(true);
    link.onerror = () => setFontsLoaded(true); // Continue even if fonts fail
    
    document.head.appendChild(link);

    return () => {
      // Only remove if we added it
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [fontUrl]);

  if (!cvData) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <Maximize2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Selecciona o crea un CV para previsualizar</p>
        </motion.div>
      </div>
    );
  }

  const Template = TEMPLATE_MAP[cvData.meta.templateId] || TEMPLATE_MAP.classic;
  const theme = cvData.meta.themeConfig;
  const typography = cvData.meta.typographyConfig;

  return (
    <div className="h-full flex flex-col bg-muted/50">
      {/* Zoom Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-2 py-3 bg-background/80 backdrop-blur-sm border-b"
      >
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}
          className="h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium w-16 text-center tabular-nums">
          {Math.round(zoom * 100)}%
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
          className="h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <div className="w-px h-4 bg-border mx-1" />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setZoom(0.5)}
          className="h-8 w-8 p-0"
          title="Restablecer zoom"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-6 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={cvData.meta.templateId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={previewRef}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
            }}
            className="transition-transform duration-200 ease-out"
          >
            <div 
              className="shadow-2xl rounded-sm overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <Template data={cvData} theme={theme} typography={typography} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
