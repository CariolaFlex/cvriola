'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CVData, CVListItem, ThemeConfig, TypographyConfig, LayoutConfig } from '@/types/cv';
import { createDefaultCV } from '@/lib/constants/cv-constants';

interface CVState {
  // Current CV being edited
  cvData: CVData | null;
  
  // List of all saved CVs
  cvList: CVListItem[];
  
  // Active view: 'dashboard' | 'editor'
  activeView: 'dashboard' | 'editor';
  
  // Selected section in editor
  activeSection: string;
  
  // Undo/Redo history
  history: CVData[];
  historyIndex: number;
  
  // Actions
  setActiveView: (view: 'dashboard' | 'editor') => void;
  setActiveSection: (section: string) => void;
  
  // CV CRUD
  createNewCV: (templateId?: string) => void;
  loadCV: (id: string) => void;
  saveCV: () => void;
  duplicateCV: (id: string) => void;
  deleteCV: (id: string) => void;
  renameCV: (id: string, name: string) => void;
  
  // CV Data Updates
  updateBasics: (basics: Partial<CVData['basics']>) => void;
  updateWork: (work: CVData['work']) => void;
  addWork: (work: CVData['work'][0]) => void;
  updateEducation: (education: CVData['education']) => void;
  addEducation: (education: CVData['education'][0]) => void;
  updateSkills: (skills: CVData['skills']) => void;
  addSkill: (skill: CVData['skills'][0]) => void;
  updateCertificates: (certificates: CVData['certificates']) => void;
  addCertificate: (certificate: CVData['certificates'][0]) => void;
  updateLanguages: (languages: CVData['languages']) => void;
  addLanguage: (language: CVData['languages'][0]) => void;
  updateProjects: (projects: CVData['projects']) => void;
  updateVolunteer: (volunteer: CVData['volunteer']) => void;
  updateInterests: (interests: CVData['interests']) => void;
  updateReferences: (references: CVData['references']) => void;
  
  // Meta Updates
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateTypography: (typography: Partial<TypographyConfig>) => void;
  updateLayout: (layout: Partial<LayoutConfig>) => void;
  setTemplate: (templateId: string) => void;
  reorderSections: (sections: string[]) => void;
  toggleSection: (sectionId: string) => void;
  
  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Import/Export
  exportJSON: () => string | null;
  importJSON: (json: string) => boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      cvData: null,
      cvList: [],
      activeView: 'dashboard',
      activeSection: 'basics',
      history: [],
      historyIndex: -1,
      
      setActiveView: (view) => set({ activeView: view }),
      setActiveSection: (section) => set({ activeSection: section }),
      
      createNewCV: (templateId = 'classic') => {
        const id = generateId();
        const now = new Date().toISOString();
        const newCV = createDefaultCV(id, templateId);
        newCV.name = 'Mi Currículum';
        
        set((state) => ({
          cvData: newCV,
          cvList: [
            { id, name: newCV.name, createdAt: now, updatedAt: now, templateId },
            ...state.cvList,
          ],
          activeView: 'editor',
          activeSection: 'basics',
          history: [newCV],
          historyIndex: 0,
        }));
      },
      
      loadCV: (id) => {
        const stored = localStorage.getItem(`cv-designer-cv-${id}`);
        if (stored) {
          try {
            const cvData = JSON.parse(stored) as CVData;
            set({
              cvData,
              activeView: 'editor',
              activeSection: 'basics',
              history: [cvData],
              historyIndex: 0,
            });
          } catch (e) {
            console.error('Failed to load CV:', e);
          }
        }
      },
      
      saveCV: () => {
        const { cvData } = get();
        if (cvData) {
          const now = new Date().toISOString();
          const updatedCV = { ...cvData, updatedAt: now };
          localStorage.setItem(`cv-designer-cv-${cvData.id}`, JSON.stringify(updatedCV));
          
          set((state) => ({
            cvData: updatedCV,
            cvList: state.cvList.map((cv) =>
              cv.id === cvData.id ? { ...cv, name: cvData.name, updatedAt: now } : cv
            ),
          }));
        }
      },
      
      duplicateCV: (id) => {
        const stored = localStorage.getItem(`cv-designer-cv-${id}`);
        if (stored) {
          const original = JSON.parse(stored) as CVData;
          const newId = generateId();
          const now = new Date().toISOString();
          const duplicate: CVData = {
            ...original,
            id: newId,
            name: `${original.name} (copia)`,
            createdAt: now,
            updatedAt: now,
          };
          
          localStorage.setItem(`cv-designer-cv-${newId}`, JSON.stringify(duplicate));
          
          set((state) => ({
            cvList: [
              { id: newId, name: duplicate.name, createdAt: now, updatedAt: now, templateId: duplicate.meta.templateId },
              ...state.cvList,
            ],
          }));
        }
      },
      
      deleteCV: (id) => {
        localStorage.removeItem(`cv-designer-cv-${id}`);
        set((state) => ({
          cvList: state.cvList.filter((cv) => cv.id !== id),
          cvData: state.cvData?.id === id ? null : state.cvData,
          activeView: state.cvData?.id === id ? 'dashboard' : state.activeView,
        }));
      },
      
      renameCV: (id, name) => {
        set((state) => ({
          cvList: state.cvList.map((cv) =>
            cv.id === id ? { ...cv, name, updatedAt: new Date().toISOString() } : cv
          ),
          cvData: state.cvData?.id === id ? { ...state.cvData, name } : state.cvData,
        }));
      },
      
      updateBasics: (basics) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = {
            ...state.cvData,
            basics: { ...state.cvData.basics, ...basics },
            updatedAt: new Date().toISOString(),
          };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateWork: (work) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, work, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      addWork: (work) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, work: [...state.cvData.work, work], updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateEducation: (education) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, education, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      addEducation: (education) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, education: [...state.cvData.education, education], updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateSkills: (skills) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, skills, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      addSkill: (skill) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, skills: [...state.cvData.skills, skill], updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateCertificates: (certificates) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, certificates, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      addCertificate: (certificate) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, certificates: [...state.cvData.certificates, certificate], updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateLanguages: (languages) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, languages, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      addLanguage: (language) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, languages: [...state.cvData.languages, language], updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateProjects: (projects) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, projects, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateVolunteer: (volunteer) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, volunteer, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateInterests: (interests) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, interests, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateReferences: (references) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = { ...state.cvData, references, updatedAt: new Date().toISOString() };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateTheme: (theme) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = {
            ...state.cvData,
            meta: {
              ...state.cvData.meta,
              themeConfig: { ...state.cvData.meta.themeConfig, ...theme },
            },
            updatedAt: new Date().toISOString(),
          };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateTypography: (typography) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = {
            ...state.cvData,
            meta: {
              ...state.cvData.meta,
              typographyConfig: { ...state.cvData.meta.typographyConfig, ...typography },
            },
            updatedAt: new Date().toISOString(),
          };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      updateLayout: (layout) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = {
            ...state.cvData,
            meta: {
              ...state.cvData.meta,
              layoutConfig: { ...state.cvData.meta.layoutConfig, ...layout },
            },
            updatedAt: new Date().toISOString(),
          };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      setTemplate: (templateId) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = {
            ...state.cvData,
            meta: { ...state.cvData.meta, templateId },
            updatedAt: new Date().toISOString(),
          };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      reorderSections: (sections) => {
        set((state) => {
          if (!state.cvData) return state;
          const newCV = {
            ...state.cvData,
            meta: { ...state.cvData.meta, sectionOrder: sections },
            updatedAt: new Date().toISOString(),
          };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      toggleSection: (sectionId) => {
        set((state) => {
          if (!state.cvData) return state;
          const visible = state.cvData.meta.visibleSections;
          const newVisible = visible.includes(sectionId)
            ? visible.filter((s) => s !== sectionId)
            : [...visible, sectionId];
          const newCV = {
            ...state.cvData,
            meta: { ...state.cvData.meta, visibleSections: newVisible },
            updatedAt: new Date().toISOString(),
          };
          return {
            cvData: newCV,
            history: [...state.history.slice(0, state.historyIndex + 1), newCV],
            historyIndex: state.historyIndex + 1,
          };
        });
      },
      
      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          set({
            cvData: history[historyIndex - 1],
            historyIndex: historyIndex - 1,
          });
        }
      },
      
      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          set({
            cvData: history[historyIndex + 1],
            historyIndex: historyIndex + 1,
          });
        }
      },
      
      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,
      
      exportJSON: () => {
        const { cvData } = get();
        return cvData ? JSON.stringify(cvData, null, 2) : null;
      },
      
      importJSON: (json) => {
        try {
          const cvData = JSON.parse(json) as CVData;
          set({
            cvData,
            history: [cvData],
            historyIndex: 0,
          });
          return true;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'cv-designer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cvList: state.cvList,
      }),
    }
  )
);
