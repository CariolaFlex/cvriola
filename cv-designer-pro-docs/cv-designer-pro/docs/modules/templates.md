# Módulo: Sistema de Plantillas

## 1. Descripción General
El módulo de plantillas gestiona todos los diseños visuales disponibles para los CVs. Cada plantilla es un componente React que consume los datos del CV desde Zustand y los renderiza con estilos aislados mediante Shadow DOM.

---

## 2. Arquitectura de Plantillas

### 2.1 TemplateWrapper.tsx
**Ubicación:** `components/templates/TemplateWrapper.tsx`

**Responsabilidad:** Contenedor que aísla estilos y maneja paginación.

```typescript
interface TemplateWrapperProps {
  templateId: string;
  children: React.ReactNode;
  pageSize: PageSize;
  orientation: 'portrait' | 'landscape';
  theme: ThemeConfig;
}
```

**Características:**
- Implementa Shadow DOM para aislamiento de estilos
- Inyecta variables CSS dinámicas desde `themeConfig`
- Calcula paginación automática
- Maneja márgenes y dimensiones de página

**Implementación Shadow DOM:**
```typescript
'use client';

import { useEffect, useRef } from 'react';

export function TemplateWrapper({ 
  templateId, 
  children, 
  pageSize, 
  orientation,
  theme 
}: TemplateWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);
  
  useEffect(() => {
    if (containerRef.current && !shadowRef.current) {
      shadowRef.current = containerRef.current.attachShadow({ 
        mode: 'open' 
      });
    }
  }, []);
  
  // Inyectar estilos y variables CSS
  useEffect(() => {
    if (shadowRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        :host {
          --primary-color: ${theme.primaryColor};
          --secondary-color: ${theme.secondaryColor};
          --accent-color: ${theme.accentColor};
          --background-color: ${theme.backgroundColor};
          --text-color: ${theme.textColor};
          --muted-color: ${theme.mutedColor};
          --heading-font: '${theme.headingFont}', serif;
          --body-font: '${theme.bodyFont}', sans-serif;
          
          /* Dimensiones de página */
          --page-width: ${pageSize.width};
          --page-height: ${pageSize.height};
        }
        
        /* Reset y estilos base */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        .page {
          width: var(--page-width);
          min-height: var(--page-height);
          background: var(--background-color);
          font-family: var(--body-font);
          color: var(--text-color);
        }
        
        /* ... más estilos base ... */
      `;
      shadowRef.current.appendChild(style);
    }
  }, [theme, pageSize]);
  
  return <div ref={containerRef} data-template={templateId} />;
}
```

---

### 2.2 Estructura de una Plantilla

**Directorio por plantilla:**
```
components/templates/Sidebar/
├── index.tsx              # Componente principal
├── Sidebar.tsx            # Layout principal
├── Header.tsx             # Encabezado
├── SidebarColumn.tsx      # Columna lateral
├── MainColumn.tsx         # Columna principal
├── Sections/
│   ├── ExperienceSection.tsx
│   ├── EducationSection.tsx
│   ├── SkillsSection.tsx
│   └── ...
└── styles.css             # Estilos específicos
```

---

## 3. Plantillas Detalladas

### 3.1 Template: Classic
**ID:** `classic`
**Descripción:** Diseño tradicional de una columna, limpio y corporativo.

**Características:**
- Una sola columna
- Encabezado centrado con nombre y título
- Secciones en orden vertical
- Ideal para sectores tradicionales

**Layout:**
```
┌─────────────────────────────────────────┐
│              [NOMBRE]                   │
│           [TÍTULO PROFESIONAL]          │
│        email | phone | location         │
├─────────────────────────────────────────┤
│ ▬▬▬ EXPERIENCIA PROFESIONAL             │
│                                          │
│ ▬▬▬ EDUCACIÓN                            │
│                                          │
│ ▬▬▬ HABILIDADES                          │
│                                          │
│ ▬▬▬ CERTIFICACIONES                      │
│                                          │
└─────────────────────────────────────────┘
```

**Variables CSS por defecto:**
```css
.template-classic {
  --primary-color: #1e3a5f;
  --secondary-color: #2d5a87;
  --accent-color: #3498db;
  --heading-font: 'Merriweather', serif;
  --body-font: 'Open Sans', sans-serif;
}
```

---

### 3.2 Template: Sidebar
**ID:** `sidebar`
**Descripción:** Barra lateral oscura con información de contacto y foto.

**Características:**
- Dos columnas (sidebar + main)
- Sidebar con fondo oscuro
- Foto de perfil circular
- Habilidades con barras de progreso
- Similar al CV de Aileen

**Layout:**
```
┌────────────┬──────────────────────────────┐
│   [FOTO]   │                              │
│   NOMBRE   │    NOMBRE COMPLETO           │
│  TÍTULO    │    Título Profesional        │
│            ├──────────────────────────────┤
│ ▬ CONTACTO │ ▬▬▬ PERFIL PROFESIONAL       │
│   addr     │                              │
│   phone    │ ▬▬▬ EXPERIENCIA              │
│   email    │                              │
│            │ ▬▬▬ EDUCACIÓN                │
│ ▬ SKILLS   │                              │
│   ████░ 90%│ ▬▬▬ CURSOS                   │
│   ███░░ 80%│                              │
│            │                              │
│ ▬ APTITUDES│                              │
│   • item   │                              │
│   • item   │                              │
└────────────┴──────────────────────────────┘
```

**Variables CSS por defecto:**
```css
.template-sidebar {
  --primary-color: #0f3638;
  --secondary-color: #4f98a3;
  --accent-color: #01696f;
  --sidebar-bg: #0f3638;
  --sidebar-text: #e8f0ef;
  --heading-font: 'Cormorant Garamond', serif;
  --body-font: 'Inter', sans-serif;
  --sidebar-width: 68mm;
}
```

---

### 3.3 Template: Modern
**ID:** `modern`
**Descripción:** Diseño contemporáneo con acentos de color y elementos visuales modernos.

**Características:**
- Header con gradiente
- Acentos de color en bordes
- Cards para secciones
- Timeline para experiencia

**Layout:**
```
┌─────────────────────────────────────────┐
│ ███████████████████████████████████████ │
│   [NOMBRE]           [CONTACTO]         │
│   [Título]           email | phone      │
│ ███████████████████████████████████████ │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ ● EXPERIENCIA                       │  │
│ │ ├─ Trabajo 1                        │  │
│ │ ├─ Trabajo 2                        │  │
│ │ └─ Trabajo 3                        │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ┌──────────────────┐ ┌────────────────┐ │
│ │ HABILIDADES       │ │ EDUCACIÓN      │ │
│ │                   │ │                │ │
│ └──────────────────┘ └────────────────┘ │
└─────────────────────────────────────────┘
```

---

### 3.4 Template: Minimal
**ID:** `minimal`
**Descripción:** Blanco y negro, tipografía elegante, mínimo elementos gráficos.

**Características:**
- Solo escala de grises
- Tipografía serif elegante
- Sin colores de fondo
- Máximo espacio en blanco

**Variables CSS por defecto:**
```css
.template-minimal {
  --primary-color: #18181b;
  --secondary-color: #3f3f46;
  --accent-color: #71717a;
  --background-color: #ffffff;
  --text-color: #18181b;
  --heading-font: 'Playfair Display', serif;
  --body-font: 'Lora', serif;
}
```

---

### 3.5 Template: Creative
**ID:** `creative`
**Descripción:** Colores vibrantes, elementos gráficos, para profesionales creativos.

**Características:**
- Paletas de colores vibrantes
- Elementos decorativos
- Layouts asimétricos
- Ideal para diseñadores, marketing

**Variables CSS por defecto:**
```css
.template-creative {
  --primary-color: #7c3aed;
  --secondary-color: #a78bfa;
  --accent-color: #f59e0b;
  --background-color: #faf5ff;
  --heading-font: 'Montserrat', sans-serif;
  --body-font: 'Nunito', sans-serif;
}
```

---

## 4. Sistema de Secciones

### 4.1 Mapeo de Secciones
**Ubicación:** `lib/constants/templates.ts`

```typescript
export const SECTION_COMPONENTS = {
  basics: BasicSection,
  work: WorkSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  certificates: CertificatesSection,
  languages: LanguagesSection,
  volunteer: VolunteerSection,
  interests: InterestsSection,
  references: ReferencesSection,
};

export const SECTION_TITLES = {
  basics: 'Información Personal',
  work: 'Experiencia Profesional',
  education: 'Educación',
  skills: 'Habilidades',
  projects: 'Proyectos',
  certificates: 'Certificaciones',
  languages: 'Idiomas',
  volunteer: 'Voluntariado',
  interests: 'Intereses',
  references: 'Referencias',
};

export const SECTION_ICONS = {
  basics: User,
  work: Briefcase,
  education: GraduationCap,
  skills: Star,
  projects: FolderKanban,
  certificates: Award,
  languages: Languages,
  volunteer: Heart,
  interests: Sparkles,
  references: Quote,
};
```

### 4.2 Orden Dinámico de Secciones
```typescript
// En cvStore
interface CVState {
  // ...
  meta: {
    sectionOrder: string[]; // ['work', 'education', 'skills', ...]
    visibleSections: string[]; // Secciones activas
  };
}

// Función para renderizar secciones en orden
function renderSections(template: Template, data: CVData) {
  const { sectionOrder, visibleSections } = data.meta;
  
  return sectionOrder
    .filter(sectionId => visibleSections.includes(sectionId))
    .map(sectionId => {
      const Component = SECTION_COMPONENTS[sectionId];
      return <Component key={sectionId} data={data[sectionId]} />;
    });
}
```

---

## 5. Paginación Automática

### 5.1 Algoritmo de Paginación
**Ubicación:** `lib/utils/pagination.ts`

```typescript
interface PageMeasurement {
  height: number;
  pageNumber: number;
  elements: HTMLElement[];
}

export function calculatePagination(
  container: HTMLElement,
  pageHeight: number
): PageMeasurement[] {
  const pages: PageMeasurement[] = [];
  let currentPage: PageMeasurement = { height: 0, pageNumber: 1, elements: [] };
  
  const children = Array.from(container.children);
  
  for (const child of children) {
    const element = child as HTMLElement;
    const elementHeight = element.offsetHeight;
    
    if (currentPage.height + elementHeight > pageHeight) {
      // Nueva página
      pages.push(currentPage);
      currentPage = { height: 0, pageNumber: pages.length + 1, elements: [] };
    }
    
    currentPage.height += elementHeight;
    currentPage.elements.push(element);
  }
  
  pages.push(currentPage);
  return pages;
}
```

### 5.2 Prevención de Cortes
```css
/* Evitar que elementos se corten entre páginas */
.section {
  break-inside: avoid;
}

.entry {
  break-inside: avoid;
}

/* Permitir corte solo en espacios naturales */
.entry-list li {
  break-inside: auto;
}
```

---

## 6. Selector de Plantillas

### 6.1 TemplateSelector.tsx
**Ubicación:** `components/toolbar/TemplateSelector.tsx`

```typescript
interface TemplateSelectorProps {
  currentTemplate: string;
  onSelect: (templateId: string) => void;
}

// Miniaturas de plantillas
// Vista previa en hover
// Selección con un clic
```

**Características:**
- Grid de miniaturas
- Preview en hover
- Indicador de plantilla actual
- Animación de transición

---

## 7. Registro de Plantillas

### 7.1 Sistema de Plugins
**Ubicación:** `lib/templates/registry.ts`

```typescript
interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'corporate' | 'creative' | 'minimal' | 'academic';
  features: string[];
  defaultTheme: ThemeConfig;
  component: React.ComponentType<TemplateProps>;
}

class TemplateRegistry {
  private templates: Map<string, TemplateDefinition> = new Map();
  
  register(template: TemplateDefinition) {
    this.templates.set(template.id, template);
  }
  
  get(id: string): TemplateDefinition | undefined {
    return this.templates.get(id);
  }
  
  getAll(): TemplateDefinition[] {
    return Array.from(this.templates.values());
  }
  
  getByCategory(category: string): TemplateDefinition[] {
    return this.getAll().filter(t => t.category === category);
  }
}

export const templateRegistry = new TemplateRegistry();

// Registro de plantillas
templateRegistry.register({
  id: 'classic',
  name: 'Classic',
  description: 'Diseño tradicional de una columna',
  thumbnail: '/templates/classic-thumb.png',
  category: 'corporate',
  features: ['ATS-optimized', 'Single column', 'Clean layout'],
  defaultTheme: classicTheme,
  component: ClassicTemplate,
});
```

---

## 8. Dependencias del Módulo

```json
{
  "dependencies": {
    "react": "^19.x",
    "zustand": "^5.x",
    "lucide-react": "^0.x"
  }
}
```

---

## 9. Testing

### 9.1 Casos de Test
- [ ] Renderizado de cada plantilla
- [ ] Variables CSS se aplican correctamente
- [ ] Paginación funciona con contenido largo
- [ ] Cambio de plantilla mantiene datos
- [ ] Secciones se ordenan dinámicamente
- [ ] Shadow DOM aísla estilos correctamente
- [ ] Secciones ocultas no se renderizan

---

**Versión:** 1.0.0  
**Depende de:** Módulo Estado, Módulo Personalización  
**Dependientes:** Módulo Preview, Módulo Exportación
