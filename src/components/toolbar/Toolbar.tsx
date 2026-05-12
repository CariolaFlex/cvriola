'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import {
  Palette, Type, FileText, Download, Image, Code,
  Monitor, Undo2, Redo2, Save, Check, Loader2, FileJson, Upload
} from 'lucide-react';
import { useCVStore } from '@/lib/store/cvStore';
import { COLOR_PALETTES, HEADING_FONTS, BODY_FONTS, TEMPLATE_DEFINITIONS, PAGE_SIZES } from '@/lib/constants/cv-constants';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import type { ColorPalette } from '@/types/cv';
import { toast } from 'sonner';

interface ToolbarProps {
  onExportPDF: () => void;
  onExportFitPage: () => void;
  onExportPNG: () => void;
  onExportJPG: () => void;
  onExportHTML: () => void;
  isExporting: boolean;
}

export function Toolbar({ onExportPDF, onExportFitPage, onExportPNG, onExportJPG, onExportHTML, isExporting }: ToolbarProps) {
  const { cvData, setTemplate, updateTheme, updateTypography, updateLayout, undo, redo, canUndo, canRedo, saveCV, exportJSON, importJSON } = useCVStore();
  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    const json = exportJSON();
    if (!json) return;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cvData?.name || 'cv'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('CV exportado como JSON');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (importJSON(text)) {
        toast.success('CV importado correctamente');
      } else {
        toast.error('JSON inválido. Revisa el archivo.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

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
    toast.success(`Paleta "${palette.name}" aplicada`);
  };

  const handleSave = () => {
    saveCV();
    toast.success('CV guardado correctamente');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background/95 backdrop-blur-md border-b shadow-sm px-4 py-2.5 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Template and Colors */}
        <div className="flex items-center gap-2">
          {/* Template Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Plantilla</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="start">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Seleccionar Plantilla</h4>
                <div className="grid grid-cols-2 gap-2">
                  {TEMPLATE_DEFINITIONS.map((template) => (
                    <motion.button
                      key={template.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setTemplate(template.id);
                        toast.success(`Plantilla "${template.name}" seleccionada`);
                      }}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        cvData.meta.templateId === template.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'hover:border-muted-foreground/30'
                      }`}
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 capitalize">{template.category}</div>
                      {cvData.meta.templateId === template.id && (
                        <Check className="h-3 w-3 text-primary absolute top-2 right-2" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Color Palette Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Colores</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="start">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Paleta de Colores</h4>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PALETTES.map((palette) => (
                    <motion.button
                      key={palette.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => applyPalette(palette)}
                      className={`relative p-2 rounded-lg border transition-all ${
                        currentTheme.primaryColor === palette.primary
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'hover:border-muted-foreground/30'
                      }`}
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-5 h-5 rounded shadow-sm" style={{ backgroundColor: palette.primary }} />
                        <div className="w-5 h-5 rounded shadow-sm" style={{ backgroundColor: palette.secondary }} />
                        <div className="w-5 h-5 rounded shadow-sm" style={{ backgroundColor: palette.accent }} />
                      </div>
                      <div className="text-xs text-left font-medium">{palette.name}</div>
                      {currentTheme.primaryColor === palette.primary && (
                        <Check className="h-3 w-3 text-primary absolute top-2 right-2" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Typography Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Type className="h-4 w-4" />
                <span className="hidden sm:inline">Tipografía</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Fuente Títulos</Label>
                  <Select 
                    value={currentTypography.headingFont} 
                    onValueChange={(v) => updateTypography({ headingFont: v })}
                  >
                    <SelectTrigger className="mt-1.5">
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
                  <Label className="text-sm font-medium">Fuente Cuerpo</Label>
                  <Select 
                    value={currentTypography.bodyFont} 
                    onValueChange={(v) => updateTypography({ bodyFont: v })}
                  >
                    <SelectTrigger className="mt-1.5">
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
                  <Label className="text-sm font-medium">Tamaño Títulos: {currentTypography.headingSize}pt</Label>
                  <Slider
                    value={[currentTypography.headingSize]}
                    onValueChange={([v]) => updateTypography({ headingSize: v })}
                    min={10}
                    max={20}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Tamaño Cuerpo: {currentTypography.bodySize}pt</Label>
                  <Slider
                    value={[currentTypography.bodySize]}
                    onValueChange={([v]) => updateTypography({ bodySize: v })}
                    min={8}
                    max={14}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Page Settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">Página</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="start">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Tamaño de Página</Label>
                  <Select 
                    value={currentLayout.pageSize} 
                    onValueChange={(v) => updateLayout({ pageSize: v as 'A4' | 'Letter' | 'Legal' })}
                  >
                    <SelectTrigger className="mt-1.5">
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
                  <Label className="text-sm font-medium">Orientación</Label>
                  <Select 
                    value={currentLayout.orientation} 
                    onValueChange={(v) => updateLayout({ orientation: v as 'portrait' | 'landscape' })}
                  >
                    <SelectTrigger className="mt-1.5">
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
        <div className="flex items-center gap-1">
          {/* Undo/Redo */}
          <div className="flex items-center border-r pr-2 mr-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={undo} 
              disabled={!canUndo()}
              className="h-8 w-8 p-0"
              title="Deshacer (Ctrl+Z)"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={redo} 
              disabled={!canRedo()}
              className="h-8 w-8 p-0"
              title="Rehacer (Ctrl+Y)"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Save */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSave} 
            className="gap-2 h-8"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Guardar</span>
          </Button>

          {/* Export Dropdown */}
          <Popover open={showExportMenu} onOpenChange={setShowExportMenu}>
            <PopoverTrigger asChild>
              <Button className="gap-2 h-9 shadow-lg shadow-primary/20" disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">{isExporting ? 'Exportando...' : 'Exportar'}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-2" align="end">
              <div className="space-y-1">
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => { onExportPDF(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">PDF Vectorial</div>
                    <div className="text-xs text-muted-foreground">Alta calidad</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => { onExportFitPage(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">PDF - 1 Página</div>
                    <div className="text-xs text-muted-foreground">Todo en una hoja</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => { onExportPNG(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Image className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">PNG Alta Res.</div>
                    <div className="text-xs text-muted-foreground">Transparencia</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => { onExportJPG(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Image className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">JPG Optimizado</div>
                    <div className="text-xs text-muted-foreground">Menor tamaño</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => { onExportHTML(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Code className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">HTML Código</div>
                    <div className="text-xs text-muted-foreground">Editable</div>
                  </div>
                </motion.button>
                <div className="h-px bg-border my-1" />
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => { handleExportJSON(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <FileJson className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">JSON Backup</div>
                    <div className="text-xs text-muted-foreground">Portable</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => { fileInputRef.current?.click(); setShowExportMenu(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Upload className="h-4 w-4 text-cyan-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Importar JSON</div>
                    <div className="text-xs text-muted-foreground">Reemplaza datos</div>
                  </div>
                </motion.button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={handleImportJSON}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.div>
  );
}
