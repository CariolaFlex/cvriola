# Módulo: Estado Global (State Management)

## 1. Descripción General
El módulo de estado gestiona toda la data de la aplicación mediante Zustand. Implementa un patrón de store particionado, historial de undo/redo, persistencia en localStorage y sincronización con formularios.

---

## 2. Arquitectura de Stores

### 2.1 Diagrama de Stores
```
┌─────────────────────────────────────────────────────────────────┐
│                         STORES                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    cvStore      │  │    uiStore      │  │  historyStore   │ │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤ │
│  │ - cvData        │  │ - previewRef    │  │ - past[]        │ │
│  │ - cvList        │  │ - isEditing     │  │ - present       │ │
│  │ - activeCVId    │  │ - expandedSec   │  │ - future[]      │ │
│  │ - isDirty       │  │ - zoom          │  │ - maxHistory    │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. cvStore (Store Principal)

### 3.1 Definición
**Ubicación:** `lib/store/cvStore.ts`

```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { CVData, CVMeta } from '@/types/cv';

interface CVState {
  // Datos del CV activo
  cvData: CVData;
  
  // Lista de CVs guardados
  cvList: Array<{
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    preview: string; // Base64 thumbnail
  }>;
  
  // ID del CV actualmente activo
  activeCVId: string | null;
  
  // Flag de cambios no guardados
  isDirty: boolean;
  
  // Acciones
  createNewCV: (templateId?: string) => void;
  loadCV: (id: string) => void;
  saveCV: () => void;
  duplicateCV: (id: string) => void;
  deleteCV: (id: string) => void;
  renameCV: (id: string, name: string) => void;
  
  updateCV: (data: Partial<CVData>) => void;
  updateBasics: (basics: Partial<CVData['basics']>) => void;
  updateWork: (work: CVData['work']) => void;
  updateEducation: (education: CVData['education']) => void;
  updateSkills: (skills: CVData['skills']) => void;
  // ... más secciones
  
  updateMeta: (meta: Partial<CVMeta>) => void;
  updateTheme: (theme: Partial<CVMeta['themeConfig']>) => void;
  updateLayout: (layout: Partial<CVMeta['layoutConfig']>) => void;
  reorderSections: (sections: string[]) => void;
  toggleSection: (sectionId: string) => void;
  
  // Import/Export
  exportJSON: () => string;
  importJSON: (json: string) => void;
}

// Valores por defecto
const defaultCVData: CVData = {
  basics: {
    name: '',
    label: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    image: '',
    location: {
      address: '',
      city: '',
      region: '',
      postalCode: '',
      countryCode: 'CL',
    },
    profiles: [],
  },
  work: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  volunteer: [],
  interests: [],
  references: [],
  meta: {
    templateId: 'classic',
    layoutConfig: {
      pageSize: 'A4',
      orientation: 'portrait',
      margins: {
        top: '15mm',
        right: '15mm',
        bottom: '15mm',
        left: '15mm',
      },
      pages: 'auto',
    },
    themeConfig: {
      primaryColor: '#1e3a5f',
      secondaryColor: '#2d5a87',
      accentColor: '#3498db',
      backgroundColor: '#ffffff',
      textColor: '#2c3e50',
      mutedColor: '#7f8c8d',
    },
    typographyConfig: {
      headingFont: 'Merriweather',
      bodyFont: 'Open Sans',
      headingSize: 14,
      bodySize: 10,
      lineHeight: 1.5,
    },
    sectionOrder: ['work', 'education', 'skills', 'certificates', 'languages'],
    visibleSections: ['work', 'education', 'skills'],
  },
};

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      cvData: defaultCVData,
      cvList: [],
      activeCVId: null,
      isDirty: false,
      
      createNewCV: (templateId = 'classic') => {
        const id = uuidv4();
        const now = new Date().toISOString();
        
        const newCV: CVData = {
          ...defaultCVData,
          id,
          meta: {
            ...defaultCVData.meta,
            templateId,
          },
        };
        
        set((state) => ({
          cvData: newCV,
          cvList: [
            ...state.cvList,
            {
              id,
              name: 'Nuevo CV',
              createdAt: now,
              updatedAt: now,
              preview: '',
            },
          ],
          activeCVId: id,
          isDirty: false,
        }));
      },
      
      loadCV: (id) => {
        const { cvList } = get();
        // Cargar desde localStorage
        const saved = localStorage.getItem(`cv-designer-cv-${id}`);
        if (saved) {
          const cvData = JSON.parse(saved);
          set({ cvData, activeCVId: id, isDirty: false });
        }
      },
      
      saveCV: () => {
        const { cvData, activeCVId } = get();
        if (activeCVId) {
          localStorage.setItem(
            `cv-designer-cv-${activeCVId}`,
            JSON.stringify(cvData)
          );
          set({ isDirty: false });
        }
      },
      
      duplicateCV: (id) => {
        const { cvList } = get();
        const original = localStorage.getItem(`cv-designer-cv-${id}`);
        if (original) {
          const newId = uuidv4();
          const cvData = { ...JSON.parse(original), id: newId };
          const now = new Date().toISOString();
          
          localStorage.setItem(`cv-designer-cv-${newId}`, JSON.stringify(cvData));
          
          set((state) => ({
            cvList: [
              ...state.cvList,
              {
                id: newId,
                name: `${cvList.find(c => c.id === id)?.name || 'CV'} (copia)`,
                createdAt: now,
                updatedAt: now,
                preview: '',
              },
            ],
          }));
        }
      },
      
      deleteCV: (id) => {
        localStorage.removeItem(`cv-designer-cv-${id}`);
        set((state) => ({
          cvList: state.cvList.filter((cv) => cv.id !== id),
          activeCVId: state.activeCVId === id ? null : state.activeCVId,
        }));
      },
      
      renameCV: (id, name) => {
        set((state) => ({
          cvList: state.cvList.map((cv) =>
            cv.id === id ? { ...cv, name, updatedAt: new Date().toISOString() } : cv
          ),
        }));
      },
      
      updateCV: (data) => {
        set((state) => ({
          cvData: { ...state.cvData, ...data },
          isDirty: true,
        }));
      },
      
      updateBasics: (basics) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            basics: { ...state.cvData.basics, ...basics },
          },
          isDirty: true,
        }));
      },
      
      updateWork: (work) => {
        set((state) => ({
          cvData: { ...state.cvData, work },
          isDirty: true,
        }));
      },
      
      updateEducation: (education) => {
        set((state) => ({
          cvData: { ...state.cvData, education },
          isDirty: true,
        }));
      },
      
      updateSkills: (skills) => {
        set((state) => ({
          cvData: { ...state.cvData, skills },
          isDirty: true,
        }));
      },
      
      updateMeta: (meta) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            meta: { ...state.cvData.meta, ...meta },
          },
          isDirty: true,
        }));
      },
      
      updateTheme: (theme) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            meta: {
              ...state.cvData.meta,
              themeConfig: { ...state.cvData.meta.themeConfig, ...theme },
            },
          },
          isDirty: true,
        }));
      },
      
      updateLayout: (layout) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            meta: {
              ...state.cvData.meta,
              layoutConfig: { ...state.cvData.meta.layoutConfig, ...layout },
            },
          },
          isDirty: true,
        }));
      },
      
      reorderSections: (sections) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            meta: { ...state.cvData.meta, sectionOrder: sections },
          },
          isDirty: true,
        }));
      },
      
      toggleSection: (sectionId) => {
        set((state) => {
          const visible = state.cvData.meta.visibleSections;
          const newVisible = visible.includes(sectionId)
            ? visible.filter((s) => s !== sectionId)
            : [...visible, sectionId];
          
          return {
            cvData: {
              ...state.cvData,
              meta: { ...state.cvData.meta, visibleSections: newVisible },
            },
            isDirty: true,
          };
        });
      },
      
      exportJSON: () => {
        const { cvData } = get();
        return JSON.stringify(cvData, null, 2);
      },
      
      importJSON: (json) => {
        try {
          const cvData = JSON.parse(json);
          set({ cvData, isDirty: true });
        } catch (e) {
          console.error('Invalid JSON:', e);
        }
      },
    }),
    {
      name: 'cv-designer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cvList: state.cvList,
        activeCVId: state.activeCVId,
      }),
    }
  )
);
```

---

## 4. uiStore (Store de UI)

### 4.1 Definición
**Ubicación:** `lib/store/uiStore.ts`

```typescript
import { create } from 'zustand';

interface UIState {
  // Referencia al contenedor de preview
  previewRef: HTMLElement | null;
  
  // Estado de edición
  isEditing: boolean;
  
  // Sección expandida en el editor
  expandedSection: string | null;
  
  // Nivel de zoom del preview
  zoom: number;
  
  // Página visible (para multi-página)
  currentPage: number;
  totalPages: number;
  
  // Sidebar colapsado
  sidebarCollapsed: boolean;
  
  // Modal activo
  activeModal: string | null;
  
  // Acciones
  setPreviewRef: (ref: HTMLElement | null) => void;
  setIsEditing: (editing: boolean) => void;
  setExpandedSection: (section: string | null) => void;
  setZoom: (zoom: number) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  toggleSidebar: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  previewRef: null,
  isEditing: false,
  expandedSection: 'basics',
  zoom: 1,
  currentPage: 1,
  totalPages: 1,
  sidebarCollapsed: false,
  activeModal: null,
  
  setPreviewRef: (ref) => set({ previewRef: ref }),
  setIsEditing: (editing) => set({ isEditing: editing }),
  setExpandedSection: (section) => set({ expandedSection: section }),
  setZoom: (zoom) => set({ zoom: Math.max(0.25, Math.min(2, zoom)) }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
```

---

## 5. historyStore (Undo/Redo)

### 5.1 Definición
**Ubicación:** `lib/store/historyStore.ts`

```typescript
import { create } from 'zustand';
import type { CVData } from '@/types/cv';

interface HistoryState {
  past: CVData[];
  present: CVData | null;
  future: CVData[];
  maxHistory: number;
  
  // Acciones
  pushState: (state: CVData) => void;
  undo: () => CVData | null;
  redo: () => CVData | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  present: null,
  future: [],
  maxHistory: 50,
  
  pushState: (state) => {
    set((history) => {
      // No agregar si es igual al estado actual
      if (history.present && JSON.stringify(history.present) === JSON.stringify(state)) {
        return history;
      }
      
      return {
        past: history.present 
          ? [...history.past.slice(-(history.maxHistory - 1)), history.present]
          : history.past,
        present: state,
        future: [], // Limpiar future al hacer nuevo cambio
      };
    });
  },
  
  undo: () => {
    const { past, present, future } = get();
    
    if (past.length === 0) return null;
    
    const previous = past[past.length - 1];
    const newPast = past.slice(0, -1);
    
    set({
      past: newPast,
      present: previous,
      future: present ? [present, ...future] : future,
    });
    
    return previous;
  },
  
  redo: () => {
    const { past, present, future } = get();
    
    if (future.length === 0) return null;
    
    const next = future[0];
    const newFuture = future.slice(1);
    
    set({
      past: present ? [...past, present] : past,
      present: next,
      future: newFuture,
    });
    
    return next;
  },
  
  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
  
  clear: () => set({ past: [], present: null, future: [] }),
}));
```

### 5.2 Integración con cvStore
```typescript
// Hook combinado para undo/redo
export function useCVWithHistory() {
  const cvData = useCVStore((state) => state.cvData);
  const updateCV = useCVStore((state) => state.updateCV);
  const { pushState, undo, redo, canUndo, canRedo } = useHistoryStore();
  
  // Push state on significant changes
  const updateWithHistory = useCallback((data: Partial<CVData>) => {
    pushState(cvData);
    updateCV(data);
  }, [cvData, pushState, updateCV]);
  
  // Undo
  const handleUndo = useCallback(() => {
    const previous = undo();
    if (previous) {
      updateCV(previous);
    }
  }, [undo, updateCV]);
  
  // Redo
  const handleRedo = useCallback(() => {
    const next = redo();
    if (next) {
      updateCV(next);
    }
  }, [redo, updateCV]);
  
  return {
    cvData,
    updateCV: updateWithHistory,
    undo: handleUndo,
    redo: handleRedo,
    canUndo: canUndo(),
    canRedo: canRedo(),
  };
}
```

---

## 6. Selectores Optimizados

### 6.1 Selectores para Prevenir Re-renders
```typescript
// Mal - causa re-render en cualquier cambio
const cvData = useCVStore((state) => state.cvData);

// Bien - solo re-render cuando cambia basics
const name = useCVStore((state) => state.cvData.basics.name);

// Mejor - selector shallow
const { name, email } = useCVStore(
  (state) => ({
    name: state.cvData.basics.name,
    email: state.cvData.basics.email,
  }),
  shallow
);

// Con selector personalizado
const createSectionSelector = (section: string) => (state: CVState) => 
  state.cvData[section as keyof CVData];

const work = useCVStore(createSectionSelector('work'));
```

---

## 7. Sincronización con React Hook Form

### 7.1 Bridge
**Ubicación:** `hooks/useCVForm.ts`

```typescript
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'use-debounce';
import { useCVStore } from '@/lib/store/cvStore';

export function useCVForm<T extends keyof CVData>(section: T) {
  const data = useCVStore((state) => state.cvData[section]);
  const updateSection = useCVStore((state) => {
    const actions: Record<string, Function> = {
      basics: state.updateBasics,
      work: state.updateWork,
      education: state.updateEducation,
      skills: state.updateSkills,
    };
    return actions[section];
  });
  
  const { register, handleSubmit, reset, formState, watch } = useForm({
    defaultValues: data,
    mode: 'onChange',
  });
  
  // Reset form when data changes externally
  useEffect(() => {
    reset(data);
  }, [data, reset]);
  
  // Debounced sync to store
  const debouncedUpdate = useDebounceCallback((value) => {
    updateSection(value);
  }, 300);
  
  // Watch for changes
  useEffect(() => {
    const subscription = watch((value) => {
      debouncedUpdate(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedUpdate]);
  
  return {
    register,
    handleSubmit,
    formState,
    reset,
  };
}
```

---

## 8. Dependencias del Módulo

```json
{
  "dependencies": {
    "zustand": "^5.x",
    "uuid": "^9.x",
    "use-debounce": "^10.x"
  },
  
  "devDependencies": {
    "@types/uuid": "^9.x"
  }
}
```

---

## 9. Testing

### 9.1 Casos de Test
- [ ] Store se inicializa correctamente
- [ ] Persistencia en localStorage funciona
- [ ] CRUD de CVs funciona
- [ ] Undo/Redo funciona
- [ ] Selectores no causan re-renders innecesarios
- [ ] Sincronización con formularios funciona
- [ ] Import/Export JSON funciona

---

**Versión:** 1.0.0  
**Depende de:** N/A (módulo base)  
**Dependientes:** Todos los demás módulos
