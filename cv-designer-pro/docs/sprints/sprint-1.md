# Sprint 1: Estructura Base + Editor Básico

## 1. Objetivo del Sprint
Establecer la arquitectura del proyecto, crear la estructura de carpetas, configurar el stack tecnológico y desarrollar el editor básico con formularios para las secciones principales del CV.

**Duración estimada:** 5-7 días

---

## 2. Tareas Detalladas

### Tarea 1.1: Inicialización del Proyecto
**Tiempo:** 2 horas

```bash
# Crear proyecto Next.js 16
pnpm create next-app@latest cv-designer-pro --typescript --tailwind --eslint --app --src-dir

# Instalar dependencias base
cd cv-designer-pro
pnpm add zustand react-hook-form @hookform/resolvers zod
pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
pnpm add lucide-react clsx tailwind-merge
pnpm add uuid
pnpm add -D @types/uuid
```

**Estructura de carpetas a crear:**
```
src/
├── app/
│   ├── (app)/
│   │   ├── page.tsx          # Dashboard
│   │   └── editor/
│   │       └── [id]/
│   │           └── page.tsx  # Editor
│   ├── api/
│   │   └── export/
│   │       └── pdf/
│   │           └── route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn/ui
│   ├── editor/
│   ├── preview/
│   ├── templates/
│   └── toolbar/
├── lib/
│   ├── store/
│   ├── schema/
│   ├── utils/
│   └── constants/
├── hooks/
├── types/
└── styles/
```

**Checklist:**
- [ ] Proyecto creado con Next.js 16
- [ ] TypeScript configurado
- [ ] Tailwind CSS 4 configurado
- [ ] Estructura de carpetas creada
- [ ] Dependencias instaladas

---

### Tarea 1.2: Configurar shadcn/ui
**Tiempo:** 1 hora

```bash
# Inicializar shadcn/ui
pnpm dlx shadcn@latest init

# Instalar componentes necesarios
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add textarea
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add dialog
pnpm dlx dlx shadcn@latest add toast
pnpm dlx shadcn@latest add slider
pnpm dlx shadcn@latest add tabs
pnpm dlx shadcn@latest add collapsible
pnpm dlx shadcn@latest add accordion
```

**Checklist:**
- [ ] shadcn/ui inicializado
- [ ] Componentes base instalados
- [ ] Tema configurado en globals.css

---

### Tarea 1.3: Definir Tipos TypeScript
**Tiempo:** 2 horas

**Archivo:** `src/types/cv.ts`

Crear interfaces para:
- `CVData` - Estructura completa del CV
- `Basics` - Información personal
- `Work` - Experiencia laboral
- `Education` - Educación
- `Skills` - Habilidades
- `Meta` - Configuración de visualización
- `ThemeConfig` - Configuración de tema
- `LayoutConfig` - Configuración de layout

**Archivo:** `src/types/template.ts`

Crear interfaces para:
- `TemplateProps` - Props de plantilla
- `TemplateDefinition` - Definición de plantilla
- `SectionComponent` - Componente de sección

**Checklist:**
- [ ] Tipos de CV definidos
- [ ] Tipos de plantilla definidos
- [ ] Tipos exportados en index.ts

---

### Tarea 1.4: Crear Schema Zod
**Tiempo:** 2 horas

**Archivo:** `src/lib/schema/cvSchema.ts`

Crear schemas de validación para:
- `profileSchema`
- `locationSchema`
- `basicsSchema`
- `workSchema`
- `educationSchema`
- `skillSchema`
- `certificateSchema`
- `languageSchema`
- `metaSchema`
- `cvSchema` (schema principal)

**Checklist:**
- [ ] Todos los schemas creados
- [ ] Mensajes de error en español
- [ ] Validaciones funcionando

---

### Tarea 1.5: Implementar cvStore
**Tiempo:** 3 horas

**Archivo:** `src/lib/store/cvStore.ts`

Implementar:
- Estado inicial (`defaultCVData`)
- Store con Zustand + persist middleware
- Acciones CRUD para CVs
- Acciones de actualización por sección
- Acciones de meta configuración

**Checklist:**
- [ ] Store creado con persist
- [ ] Acciones CRUD funcionando
- [ ] LocalStorage guardando correctamente
- [ ] Selectores optimizados

---

### Tarea 1.6: Implementar uiStore
**Tiempo:** 1 hora

**Archivo:** `src/lib/store/uiStore.ts`

Implementar:
- Estado de UI (zoom, sidebar, modals)
- Acciones de UI
- Referencia al preview

**Checklist:**
- [ ] Store de UI creado
- [ ] Acciones funcionando

---

### Tarea 1.7: Crear EditorPanel
**Tiempo:** 4 horas

**Archivo:** `src/components/editor/EditorPanel.tsx`

Implementar:
- Layout de dos columnas (editor + preview)
- Sidebar colapsable
- Header con título y acciones
- Integración con cvStore

**Checklist:**
- [ ] Layout responsive
- [ ] Sidebar colapsable
- [ ] Integración con store

---

### Tarea 1.8: Crear FormSection
**Tiempo:** 2 horas

**Archivo:** `src/components/editor/FormSection.tsx`

Implementar:
- Sección colapsable con animación
- Icono y título
- Indicador de completitud
- Contenido children

**Checklist:**
- [ ] Animación de colapso
- [ ] Indicador visual
- [ ] Accesible

---

### Tarea 1.9: Crear Formularios por Sección
**Tiempo:** 8 horas

**Archivos a crear:**
- `src/components/editor/sections/PersonalInfoForm.tsx`
- `src/components/editor/sections/ContactForm.tsx`
- `src/components/editor/sections/ProfileLinksForm.tsx`
- `src/components/editor/sections/WorkExperienceForm.tsx`
- `src/components/editor/sections/EducationForm.tsx`
- `src/components/editor/sections/SkillsForm.tsx`
- `src/components/editor/sections/CertificatesForm.tsx`
- `src/components/editor/sections/LanguagesForm.tsx`

**Características:**
- React Hook Form para manejo de formularios
- Zod para validación
- Campos dinámicos (añadir/eliminar items)
- Debounce para actualización del store

**Checklist:**
- [ ] Todos los formularios creados
- [ ] Validación funcionando
- [ ] Campos dinámicos funcionando
- [ ] Sincronización con store

---

### Tarea 1.10: Crear Utilidades Base
**Tiempo:** 2 horas

**Archivos:**
- `src/lib/utils/cn.ts` - Clases Tailwind
- `src/lib/utils/storage.ts` - Helpers de localStorage
- `src/lib/utils/debounce.ts` - Debounce helpers

**Checklist:**
- [ ] Utilidades creadas
- [ ] Tests básicos

---

### Tarea 1.11: Crear Constantes
**Tiempo:** 1 hora

**Archivos:**
- `src/lib/constants/colors.ts` - Paletas de colores
- `src/lib/constants/fonts.ts` - Fuentes disponibles
- `src/lib/constants/templates.ts` - Config de plantillas
- `src/lib/constants/sections.ts` - Secciones disponibles

**Checklist:**
- [ ] Constantes definidas
- [ ] Exportadas correctamente

---

### Tarea 1.12: Crear Página del Editor
**Tiempo:** 3 horas

**Archivo:** `src/app/(app)/editor/[id]/page.tsx`

Implementar:
- Carga del CV por ID
- Layout del editor (EditorPanel + PreviewPanel)
- Manejo de CV no encontrado
- Redirección si no hay ID

**Checklist:**
- [ ] Página renderizando
- [ ] Carga de CV funcionando
- [ ] Manejo de errores

---

## 3. Criterios de Aceptación

### Al finalizar el Sprint 1:
- [ ] Proyecto corre sin errores
- [ ] Editor muestra formularios para todas las secciones
- [ ] Datos se guardan en localStorage
- [ ] Validación de formularios funciona
- [ ] UI responsive básica
- [ ] Tipado TypeScript completo sin errores

---

## 4. Entregables

| Entregable | Ubicación |
|------------|-----------|
| Proyecto inicializado | `/cv-designer-pro` |
| Tipos TypeScript | `src/types/` |
| Schemas Zod | `src/lib/schema/` |
| Stores Zustand | `src/lib/store/` |
| Componentes Editor | `src/components/editor/` |
| Página Editor | `src/app/(app)/editor/[id]/page.tsx` |

---

## 5. Dependencias para Siguiente Sprint

- Editor funcional con formularios
- Store persistiendo datos
- Tipos y schemas definidos
- Estructura de carpetas completa

---

**Sprint:** 1 de 4  
**Estado:** Pendiente  
**Bloqueado por:** Ninguno
