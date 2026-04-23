'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Edit, Copy, Trash2, FileText, Clock, Sparkles, Layout, Palette, Image as ImageIcon, Download, Zap, Award, Users, TrendingUp } from 'lucide-react';
import { useCVStore } from '@/lib/store/cvStore';
import { TEMPLATE_DEFINITIONS } from '@/lib/constants/cv-constants';
import { TemplateThumbnails } from '@/components/templates/TemplateThumbnails';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4 },
};

export function Dashboard() {
  const { cvList, createNewCV, loadCV, duplicateCV, deleteCV, renameCV } = useCVStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCVToDelete] = useState<string | null>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [cvToRename, setCVToRename] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);

  const handleCreateNew = (templateId: string) => {
    createNewCV(templateId);
    setTemplateDialogOpen(false);
  };

  const handleDelete = () => {
    if (cvToDelete) {
      deleteCV(cvToDelete);
      setCVToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleRename = () => {
    if (cvToRename && newName.trim()) {
      renameCV(cvToRename, newName.trim());
      setCVToRename(null);
      setNewName('');
      setRenameDialogOpen(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
              >
                <FileText className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                CVriola
              </h1>
              <p className="text-muted-foreground mt-0.5">Crea currículums profesionales en minutos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              onClick={() => setTemplateDialogOpen(true)} 
              className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            >
              <Plus className="h-4 w-4" />
              Nuevo CV
            </Button>
          </div>
        </motion.div>

        {/* Hero + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 p-8 mb-8"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -mb-32 w-96 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4"
              >
                <Zap className="h-3.5 w-3.5" />
                Nuevo · 8 plantillas premium con foto
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                Diseña un CV que{' '}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  destaque
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Editor en tiempo real, plantillas profesionales, exportación PDF y soporte para fotos.
                Todo local. Todo tuyo.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-card border border-border"><ImageIcon className="h-3 w-3"/> Fotos</span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-card border border-border"><Palette className="h-3 w-3"/> Temas</span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-card border border-border"><Download className="h-3 w-3"/> PDF</span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-card border border-border"><Layout className="h-3 w-3"/> Drag & drop</span>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              {[
                { icon: FileText, label: 'Mis CVs', value: cvList.length, color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-500' },
                { icon: Layout, label: 'Plantillas', value: TEMPLATE_DEFINITIONS.length, color: 'from-violet-500/20 to-fuchsia-500/20', iconColor: 'text-violet-500' },
                { icon: Award, label: 'Premium', value: TEMPLATE_DEFINITIONS.filter(t => ['executive','timeline','infographic'].includes(t.id)).length, color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-500' },
                { icon: TrendingUp, label: 'ATS Ready', value: '100%', color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-500' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} border border-border/50 p-4 backdrop-blur-sm`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.iconColor} mb-2`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section heading */}
        {cvList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-5"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-primary" />
              <h2 className="text-xl font-semibold">Tus currículums</h2>
              <span className="text-sm text-muted-foreground">({cvList.length})</span>
            </div>
          </motion.div>
        )}

        {/* CV Grid */}
        {cvList.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
              </div>
            </motion.div>
            <h2 className="text-xl font-medium text-foreground mb-2">No tienes CVs creados</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Comienza creando tu primer currículum profesional con nuestras plantillas optimizadas
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setTemplateDialogOpen(true)} 
                size="lg"
                className="gap-2 shadow-lg shadow-primary/20"
              >
                <Plus className="h-5 w-5" />
                Crear mi primer CV
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {cvList.map((cv, index) => (
                <motion.div
                  key={cv.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-0">
                      {/* Preview */}
                      <motion.div 
                        className="h-44 bg-gradient-to-br from-muted/80 to-muted/40 relative overflow-hidden cursor-pointer"
                        variants={cardHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        onClick={() => loadCV(cv.id)}
                      >
                        {/* Template thumbnail */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-80">
                          {TemplateThumbnails[cv.templateId] || TemplateThumbnails.classic}
                        </div>
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        
                        {/* Action buttons */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); loadCV(cv.id); }}
                              className="h-9 w-9 p-0 shadow-lg"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => { 
                                e.stopPropagation();
                                duplicateCV(cv.id); 
                              }}
                              className="h-9 w-9 p-0 shadow-lg"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCVToDelete(cv.id);
                                setDeleteDialogOpen(true);
                              }}
                              className="h-9 w-9 p-0 shadow-lg hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Info */}
                      <div className="p-4 cursor-pointer" onClick={() => loadCV(cv.id)}>
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-foreground truncate flex-1">{cv.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {formatDate(cv.updatedAt)}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {TEMPLATE_DEFINITIONS.find(t => t.id === cv.templateId)?.name || 'Classic'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Features showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-6 w-1 rounded-full bg-primary" />
            <h2 className="text-xl font-semibold">Todo lo que necesitas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Layout, title: '8 Plantillas', desc: 'Classic, Modern, Executive, Timeline, Infographic y más', color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { icon: ImageIcon, title: 'Fotos de perfil', desc: 'Sube tu foto y aparece en plantillas compatibles', color: 'text-violet-500', bg: 'bg-violet-500/10' },
              { icon: Palette, title: 'Temas personalizables', desc: '8 paletas y 6 tipografías profesionales', color: 'text-amber-500', bg: 'bg-amber-500/10' },
              { icon: Download, title: 'Export PDF', desc: 'A4, Letter y Legal · calidad de imprenta', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-5 hover:border-primary/40 transition-colors"
              >
                <div className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${f.bg} mb-3`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Template Selection Dialog */}
        <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
          <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl">Selecciona una Plantilla</DialogTitle>
              <DialogDescription>
                Elige el diseño que mejor se adapte a tu perfil profesional
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
              {TEMPLATE_DEFINITIONS.map((template, index) => (
                <motion.button
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCreateNew(template.id)}
                  className="group relative overflow-hidden rounded-xl border-2 border-transparent hover:border-primary bg-card transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[3/4] bg-muted/30 p-3">
                    <div className="w-full h-full rounded shadow-lg overflow-hidden">
                      {TemplateThumbnails[template.id]}
                    </div>
                  </div>
                  
                  {/* Info overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/95 to-transparent p-3">
                    <h4 className="font-semibold text-foreground text-left">{template.name}</h4>
                    <p className="text-xs text-muted-foreground text-left mt-0.5 line-clamp-2">{template.description}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary capitalize">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Eliminar CV?</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer. El CV será eliminado permanentemente.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rename Dialog */}
        <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Renombrar CV</DialogTitle>
            </DialogHeader>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nuevo nombre del CV"
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              autoFocus
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleRename}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
