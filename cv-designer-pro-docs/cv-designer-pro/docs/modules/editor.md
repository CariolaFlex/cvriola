# Módulo: Editor de CV

## 1. Descripción General
El módulo Editor es el núcleo de la aplicación, responsable de la captura, validación y manipulación de todos los datos del currículum. Proporciona una interfaz de formularios dinámicos con validación en tiempo real y sincronización bidireccional con el estado global.

---

## 2. Componentes del Módulo

### 2.1 EditorPanel.tsx
**Ubicación:** `components/editor/EditorPanel.tsx`

**Responsabilidad:** Contenedor principal del panel de edición.

```typescript
interface EditorPanelProps {
  cvId: string;
  onSectionReorder?: (sections: string[]) => void;
}

// Estructura interna:
// - Header con título del CV y acciones
// - Lista de secciones colapsables
// - Botón para añadir nuevas secciones
```

**Estado local:**
- `expandedSection: string | null` - Sección actualmente expandida
- `isDragging: boolean` - Estado de drag & drop

**Conexiones:**
- Lee `cvData` de `cvStore`
- Dispara `updateSection` en `cvStore`
- Consume `sectionOrder` de `meta` en `cvStore`

---

### 2.2 FormSection.tsx
**Ubicación:** `components/editor/FormSection.tsx`

**Responsabilidad:** Sección colapsable que contiene campos de formulario.

```typescript
interface FormSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}
```

**Características:**
- Animación de colapso/expansión
- Indicador visual de completitud
- Arrastrable por el header

---

### 2.3 DraggableSection.tsx
**Ubicación:** `components/editor/DraggableSection.tsx`

**Responsabilidad:** Wrapper que permite arrastrar secciones.

```typescript
interface DraggableSectionProps {
  id: string;
  index: number;
  children: React.ReactNode;
}
```

**Dependencias:**
- `@dnd-kit/core` - Core de drag & drop
- `@dnd-kit/sortable` - Ordenamiento
- `@dnd-kit/utilities` - Utilidades CSS

**Eventos:**
- `onDragStart` - Inicia arrastre
- `onDragEnd` - Finaliza arrastre, actualiza orden

---

### 2.4 RichTextField.tsx
**Ubicación:** `components/editor/RichTextField.tsx`

**Responsabilidad:** Editor de texto enriquecido para descripciones largas.

```typescript
interface RichTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}
```

**Características Tiptap:**
- Extensión de párrafo
- Extensión de texto en negrita/cursiva
- Extensión de listas (bullet)
- Extensión de links
- Toolbar personalizado

**Extensiones utilizadas:**
```typescript
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
```

---

### 2.5 Formularios por Sección

#### PersonalInfoForm.tsx
**Campos:**
| Campo | Tipo | Validación |
|-------|------|------------|
| name | text | Requerido, 2-100 chars |
| label | text | Requerido, 2-100 chars |
| email | email | Requerido, formato email |
| phone | tel | Opcional, formato teléfono |
| url | url | Opcional, formato URL |
| summary | textarea | Opcional, max 500 chars |
| image | file | Opcional, JPG/PNG, max 2MB |

#### AddressForm.tsx
**Campos:**
| Campo | Tipo | Validación |
|-------|------|------------|
| address | text | Opcional |
| city | text | Requerido |
| region | text | Opcional |
| postalCode | text | Opcional |
| countryCode | select | Requerido |

#### ProfilesForm.tsx
**Estructura:** Array dinámico de perfiles

| Campo | Tipo | Validación |
|-------|------|------------|
| network | select | Requerido (LinkedIn, GitHub, etc.) |
| username | text | Requerido |
| url | url | Auto-generado |

#### WorkExperienceForm.tsx
**Estructura:** Array dinámico de trabajos

| Campo | Tipo | Validación |
|-------|------|------------|
| company | text | Requerido |
| position | text | Requerido |
| url | url | Opcional |
| startDate | date | Requerido |
| endDate | date | Opcional (vacío = actualidad) |
| summary | richText | Opcional |
| highlights | array | Lista de strings |
| location | text | Opcional |

#### EducationForm.tsx
**Estructura:** Array dinámico de educación

| Campo | Tipo | Validación |
|-------|------|------------|
| institution | text | Requerido |
| area | text | Requerido |
| studyType | text | Requerido |
| startDate | date | Requerido |
| endDate | date | Opcional |
| score | text | Opcional |

#### SkillsForm.tsx
**Estructura:** Array dinámico de habilidades

| Campo | Tipo | Validación |
|-------|------|------------|
| name | text | Requerido |
| level | range | 0-100 |
| keywords | array | Lista de strings |

#### CertificatesForm.tsx
**Estructura:** Array dinámico de certificados

| Campo | Tipo | Validación |
|-------|------|------------|
| name | text | Requerido |
| issuer | text | Requerido |
| date | date | Requerido |
| url | url | Opcional |

#### LanguagesForm.tsx
**Estructura:** Array dinámico de idiomas

| Campo | Tipo | Validación |
|-------|------|------------|
| language | text | Requerido |
| fluency | select | Native, Fluent, Intermediate, Basic |

---

## 3. Validación con Zod

### 3.1 Schema Principal
**Ubicación:** `lib/schema/cvSchema.ts`

```typescript
import { z } from 'zod';

export const profileSchema = z.object({
  network: z.string().min(1, 'Red social requerida'),
  username: z.string().min(1, 'Usuario requerido'),
  url: z.string().url('URL inválida').optional(),
});

export const workSchema = z.object({
  id: z.string(),
  company: z.string().min(2, 'Mínimo 2 caracteres'),
  position: z.string().min(2, 'Mínimo 2 caracteres'),
  url: z.string().url('URL inválida').optional().or(z.literal('')),
  startDate: z.string().min(1, 'Fecha requerida'),
  endDate: z.string().optional().or(z.literal('')),
  summary: z.string().max(1000, 'Máximo 1000 caracteres').optional(),
  highlights: z.array(z.string()).default([]),
  location: z.string().optional(),
});

export const cvSchema = z.object({
  basics: z.object({
    name: z.string().min(2, 'Nombre requerido'),
    label: z.string().min(2, 'Título profesional requerido'),
    email: z.string().email('Email inválido'),
    phone: z.string().optional(),
    url: z.string().url('URL inválida').optional().or(z.literal('')),
    summary: z.string().max(500, 'Máximo 500 caracteres').optional(),
    image: z.string().optional(),
    location: z.object({
      address: z.string().optional(),
      city: z.string().min(1, 'Ciudad requerida'),
      region: z.string().optional(),
      postalCode: z.string().optional(),
      countryCode: z.string().min(2, 'País requerido'),
    }),
    profiles: z.array(profileSchema).default([]),
  }),
  work: z.array(workSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(skillSchema).default([]),
  // ... más secciones
  meta: metaSchema,
});
```

---

## 4. Sincronización Estado-Formulario

### 4.1 Flujo de Datos
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Hook    │────►│    Debounce     │────►│    Zustand      │
│      Form       │     │    (300ms)      │     │    cvStore      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         ▲                                              │
         │                                              │
         └──────────────────────────────────────────────┘
                    Hidratación inicial
```

### 4.2 Hook Personalizado
**Ubicación:** `hooks/useCV.ts`

```typescript
export function useCV() {
  const { cvData, updateCV, undo, redo, canUndo, canRedo } = useCVStore();
  const { register, handleSubmit, reset, formState, watch } = useForm<CVData>({
    resolver: zodResolver(cvSchema),
    defaultValues: cvData,
  });
  
  // Debounced update
  const debouncedUpdate = useDebounceCallback((data: Partial<CVData>) => {
    updateCV(data);
  }, 300);
  
  // Watch for changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        debouncedUpdate({ [name]: value });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  
  // Sync from store on mount
  useEffect(() => {
    reset(cvData);
  }, [cvData.id]);
  
  return {
    register,
    handleSubmit,
    formState,
    undo,
    redo,
    canUndo,
    canRedo,
    cvData,
  };
}
```

---

## 5. Historial (Undo/Redo)

### 5.1 Implementación
**Ubicación:** `lib/store/historyStore.ts`

```typescript
interface HistoryState {
  past: CVData[];
  present: CVData;
  future: CVData[];
  maxHistory: number; // 50
}

// Acciones:
// - pushState: Añade estado al historial
// - undo: Retrocede un paso
// - redo: Avanza un paso
// - clear: Limpia historial
```

### 5.2 Atajos de Teclado
| Acción | Windows/Linux | macOS |
|--------|---------------|-------|
| Undo | Ctrl + Z | Cmd + Z |
| Redo | Ctrl + Y / Ctrl + Shift + Z | Cmd + Y / Cmd + Shift + Z |
| Guardar | Ctrl + S | Cmd + S |

---

## 6. Auto-guardado

### 6.1 Implementación
**Ubicación:** `hooks/useAutoSave.ts`

```typescript
export function useAutoSave(delay: number = 30000) {
  const cvData = useCVStore((state) => state.cvData);
  
  useEffect(() => {
    const interval = setInterval(() => {
      saveToLocalStorage(cvData);
    }, delay);
    
    return () => clearInterval(interval);
  }, [cvData, delay]);
  
  // También guardar antes de cerrar página
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage(cvData);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cvData]);
}
```

### 6.2 LocalStorage Keys
```typescript
const STORAGE_KEYS = {
  CV_PREFIX: 'cv-designer-cv-',
  CV_LIST: 'cv-designer-cv-list',
  SETTINGS: 'cv-designer-settings',
  LAST_EDITED: 'cv-designer-last-edited',
};
```

---

## 7. Dependencias del Módulo

```json
{
  "dependencies": {
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "zod": "^3.x",
    "@tiptap/react": "^2.x",
    "@tiptap/starter-kit": "^2.x",
    "@tiptap/extension-link": "^2.x",
    "@tiptap/extension-placeholder": "^2.x",
    "@dnd-kit/core": "^6.x",
    "@dnd-kit/sortable": "^8.x",
    "@dnd-kit/utilities": "^3.x",
    "lucide-react": "^0.x",
    "zustand": "^5.x",
    "use-debounce": "^10.x"
  }
}
```

---

## 8. Testing

### 8.1 Casos de Test
- [ ] Renderizado de todos los formularios
- [ ] Validación de campos requeridos
- [ ] Validación de formatos (email, URL, teléfono)
- [ ] Drag & drop de secciones
- [ ] Undo/Redo funciona correctamente
- [ ] Auto-guardado se ejecuta
- [ ] Persistencia en localStorage

### 8.2 Comandos
```bash
# Ejecutar tests del módulo
pnpm test components/editor

# Coverage
pnpm test:coverage components/editor
```

---

**Versión:** 1.0.0  
**Depende de:** Módulo Estado, Módulo Personalización  
**Dependientes:** Módulo Preview, Módulo Exportación
