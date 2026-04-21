'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { 
  Palette, Type, FileText, Download, Image, Code, 
  Settings, Check, Monitor, Undo2, Redo2, Save
} from 'lucide-react';
import { useCVStore } from '@/lib/store/cvStore';
import { COLOR_PALETTES, HEADING_FONTS, BODY_FONTS, TEMPLATE_DEFINITIONS, PAGE_SIZES } from '@/lib/constants/cv-constants';
import type { ColorPalette } from '@/types/cv';

interface ToolbarProps {
  onExportPDF: () => void;
  onExportPNG: () => void;
  onExportJPG: () => void;
  onExportHTML: () => void;
  isExporting: boolean;
}

export function Toolbar({ onExportPDF, onExportPNG, onExportJPG, onExportHTML, isExporting }: ToolbarProps) {
  const { cvData, setTemplate, updateTheme, updateTypography, updateLayout, undo, redo, canUndo, canRedo, saveCV } = useCVStore();
  const [showExportMenu, setShowExportMenu] = useState(false);

  if (!cvData) return null;

  const currentTheme = cvData.meta.themeConfig;
  const currentTypography = cvData.meta.typographyConfig;
  const currentLayout = cvData.meta.layoutConfig;

  const applyPalette = (palette: ColorPalette) => {
    updateTheme({
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      accentColor: palette.accent,
      backgroundColor: palette.background,
      textColor: palette.text,
      mutedColor: palette.muted,
    });
  };

  return (
    <div className="bg-white border-b shadow-sm px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left side - Template and Colors */}
        <div className="flex items-center gap-2">
          {/* Template Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Plantilla
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Seleccionar Plantilla</h4>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATE_DEFINITIONS.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setTemplate(template.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        cvData.meta.templateId === template.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'hover:border-slate-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{template.category}</div>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Color Palette Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Palette className="h-4 w-4" />
                Colores
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Paleta de Colores</h4>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => applyPalette(palette)}
                      className={`p-2 rounded-lg border transition-all ${
                        currentTheme.primaryColor === palette.primary
                          ? 'ring-2 ring-primary'
                          : 'hover:border-slate-300'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: palette.primary }} />
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: palette.secondary }} />
                        <div className="w-5 h-5 rounded" style={{ backgroundColor: palette.accent }} />
                      </div>
                      <div className="text-xs text-left">{palette.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Typography Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Type className="h-4 w-4" />
                Tipografía
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Fuente Títulos</Label>
                  <Select 
                    value={currentTypography.headingFont} 
                    onValueChange={(v) => updateTypography({ headingFont: v })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HEADING_FONTS.map((f) => (
                        <SelectItem key={f.family} value={f.family}>{f.family}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Fuente Cuerpo</Label>
                  <Select 
                    value={currentTypography.bodyFont} 
                    onValueChange={(v) => updateTypography({ bodyFont: v })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BODY_FONTS.map((f) => (
                        <SelectItem key={f.family} value={f.family}>{f.family}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Tamaño Títulos: {currentTypography.headingSize}pt</Label>
                  <Slider
                    value={[currentTypography.headingSize]}
                    onValueChange={([v]) => updateTypography({ headingSize: v })}
                    min={10}
                    max={20}
                    step={1}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Tamaño Cuerpo: {currentTypography.bodySize}pt</Label>
                  <Slider
                    value={[currentTypography.bodySize]}
                    onValueChange={([v]) => updateTypography({ bodySize: v })}
                    min={8}
                    max={14}
                    step={1}
                    className="mt-1"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Page Settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Monitor className="h-4 w-4" />
                Página
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Tamaño de Página</Label>
                  <Select 
                    value={currentLayout.pageSize} 
                    onValueChange={(v) => updateLayout({ pageSize: v as 'A4' | 'Letter' | 'Legal' })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(PAGE_SIZES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Orientación</Label>
                  <Select 
                    value={currentLayout.orientation} 
                    onValueChange={(v) => updateLayout({ orientation: v as 'portrait' | 'landscape' })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Vertical</SelectItem>
                      <SelectItem value="landscape">Horizontal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right side - Undo/Redo and Export */}
        <div className="flex items-center gap-2">
          {/* Undo/Redo */}
          <Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo()}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo()}>
            <Redo2 className="h-4 w-4" />
          </Button>

          {/* Save */}
          <Button variant="ghost" size="sm" onClick={saveCV} className="gap-1">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>

          {/* Export Dropdown */}
          <Popover open={showExportMenu} onOpenChange={setShowExportMenu}>
            <PopoverTrigger asChild>
              <Button className="gap-2" disabled={isExporting}>
                <Download className="h-4 w-4" />
                {isExporting ? 'Exportando...' : 'Exportar'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-1">
                <button
                  onClick={() => { onExportPDF(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100"
                >
                  <FileText className="h-4 w-4 text-red-500" />
                  PDF Vectorial
                </button>
                <button
                  onClick={() => { onExportPNG(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100"
                >
                  <Image className="h-4 w-4 text-blue-500" />
                  PNG Alta Res.
                </button>
                <button
                  onClick={() => { onExportJPG(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100"
                >
                  <Image className="h-4 w-4 text-green-500" />
                  JPG Optimizado
                </button>
                <button
                  onClick={() => { onExportHTML(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-slate-100"
                >
                  <Code className="h-4 w-4 text-purple-500" />
                  HTML Código
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
