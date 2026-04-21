'use client';

import React, { useState } from 'react';
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
import { Plus, Edit, Copy, Trash2, FileText, Clock } from 'lucide-react';
import { useCVStore } from '@/lib/store/cvStore';
import { TEMPLATE_DEFINITIONS } from '@/lib/constants/cv-constants';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">CV Designer Pro</h1>
            <p className="text-slate-500 mt-1">Crea currículums profesionales en minutos</p>
          </div>
          <Button onClick={() => setTemplateDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo CV
          </Button>
        </div>

        {/* CV Grid */}
        {cvList.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-slate-600 mb-2">No tienes CVs creados</h2>
            <p className="text-slate-500 mb-6">Comienza creando tu primer currículum profesional</p>
            <Button onClick={() => setTemplateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Crear mi primer CV
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvList.map((cv) => (
              <Card key={cv.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Preview placeholder */}
                  <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                    <FileText className="h-12 w-12 text-slate-400" />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => loadCV(cv.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setCVToRename(cv.id);
                          setNewName(cv.name);
                          setRenameDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setCVToDelete(cv.id);
                          setDeleteDialogOpen(true);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-slate-800 truncate">{cv.name}</h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {formatDate(cv.updatedAt)}
                    </div>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
                        {TEMPLATE_DEFINITIONS.find(t => t.id === cv.templateId)?.name || 'Classic'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Template Selection Dialog */}
        <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Selecciona una Plantilla</DialogTitle>
              <DialogDescription>
                Elige el diseño que mejor se adapte a tu perfil profesional
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
              {TEMPLATE_DEFINITIONS.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleCreateNew(template.id)}
                  className="p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all text-left"
                >
                  <div className="aspect-[3/4] bg-slate-100 rounded mb-3 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{template.description}</p>
                </button>
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
