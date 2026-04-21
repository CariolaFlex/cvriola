# PRD - CV Designer Pro
## Documento de Requisitos del Producto

---

## 1. Resumen Ejecutivo

### 1.1 Visión del Producto
**CV Designer Pro** es una plataforma web de clase mundial para la creación, personalización y exportación de currículums vitae. Su objetivo es ser la mejor opción del mercado, combinando:
- Editor en tiempo real con vista previa instantánea
- Optimización ATS (Applicant Tracking Systems) garantizada
- Múltiples plantillas profesionales extensibles
- Exportación en PDF vectorial, PNG, JPG y HTML
- Personalización completa sin comprometer la legibilidad algorítmica

### 1.2 Objetivos de Negocio
| Objetivo | Métrica | Meta |
|----------|---------|------|
| MVP funcional | Usuarios activos | 100 usuarios beta |
| Satisfacción UX | NPS | > 8/10 |
| Tasa de conversión | PDFs descargados | > 80% de CVs creados |
| Calidad ATS | Score promedio | > 85/100 |

### 1.3 Alcance del MVP
- Editor de CV con vista previa en tiempo real
- 5 plantillas de diseño profesional
- Exportación PDF, PNG, JPG, HTML
- Personalización de colores y fuentes
- Guardado local (localStorage)
- Sistema de plantillas extensible

---

## 2. Stack Tecnológico

### 2.1 Frontend
| Tecnología | Versión | Justificación |
|------------|---------|---------------|
| **Next.js** | 16 | Turbopack, React 19.2, Server Components |
| **React** | 19.2 | Compilador automático, memoización |
| **TypeScript** | 5.x | Tipado estático obligatorio |
| **Tailwind CSS** | 4.0 | Variables CSS nativas, compilación rápida |
| **Zustand** | 5.x | Estado global ligero, selectores optimizados |
| **React Hook Form** | 7.x | Formularios no controlados, rendimiento |
| **Zod** | 3.x | Validación de esquemas en runtime |
| **dnd-kit** | 6.x | Drag & drop moderno, accesible |
| **Tiptap** | 2.x | Editor WYSIWYG headless, extensible |
| **shadcn/ui** | Latest | Componentes accesibles, sin lock-in |
| **Lucide Icons** | Latest | Iconos ligeros, consistentes |
| **html-to-image** | 1.x | Exportación PNG/JPG sin artefactos |

### 2.2 Backend / Generación de Documentos
| Tecnología | Uso |
|------------|-----|
| **Playwright** | Generación de PDF vectorial |
| **API Routes** | Endpoints de exportación |
| **JSON Resume Schema** | Estructura de datos estándar |

### 2.3 Herramientas de Desarrollo
- **pnpm** - Gestor de paquetes
- **ESLint** + **Prettier** - Calidad de código
- **Vitest** - Testing unitario

---

## 3. Arquitectura del Sistema

### 3.1 Estructura de Carpetas
```
cv-designer-pro/
├── app/
│   ├── (public)/                 # Landing, pricing, SEO
│   │   ├── page.tsx              # Home
│   │   └── layout.tsx
│   ├── (app)/                    # Aplicación principal
│   │   ├── page.tsx              # Dashboard de CVs
│   │   ├── editor/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Editor de CV
│   │   └── layout.tsx
│   ├── api/
│   │   ├── export/
│   │   │   ├── pdf/route.ts      # API PDF
│   │   │   └── image/route.ts    # API PNG/JPG
│   │   └── templates/route.ts    # API plantillas
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # Primitivas shadcn/ui
│   ├── editor/
│   │   ├── EditorPanel.tsx       # Panel de formularios
│   │   ├── FormSection.tsx       # Sección reutilizable
│   │   ├── DraggableSection.tsx  # Sección arrastrable
│   │   └── RichTextField.tsx     # Editor Tiptap
│   ├── preview/
│   │   ├── PreviewPanel.tsx      # Contenedor Shadow DOM
│   │   └── PageNavigation.tsx    # Navegación páginas
│   ├── templates/
│   │   ├── TemplateWrapper.tsx   # Wrapper común
│   │   ├── Classic/              # Plantilla Classic
│   │   ├── Sidebar/              # Plantilla Sidebar
│   │   ├── Modern/               # Plantilla Modern
│   │   ├── Minimal/              # Plantilla Minimal
│   │   └── Creative/             # Plantilla Creative
│   ├── toolbar/
│   │   ├── ThemeSelector.tsx     # Selector de colores
│   │   ├── FontSelector.tsx      # Selector de fuentes
│   │   ├── PageSizeSelector.tsx  # Tamaño de página
│   │   └── ExportButtons.tsx     # Botones exportación
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
├── lib/
│   ├── store/
│   │   ├── cvStore.ts            # Estado del CV
│   │   ├── uiStore.ts            # Estado de UI
│   │   └── historyStore.ts       # Undo/Redo
│   ├── schema/
│   │   ├── cvSchema.ts           # Schema Zod para CV
│   │   └── jsonResumeSchema.ts   # JSON Resume estándar
│   ├── utils/
│   │   ├── cn.ts                 # Clases Tailwind
│   │   ├── export.ts             # Funciones exportación
│   │   └── storage.ts            # LocalStorage helpers
│   └── constants/
│       ├── colors.ts             # Paletas predefinidas
│       ├── fonts.ts              # Fuentes disponibles
│       └── templates.ts          # Config plantillas
├── hooks/
│   ├── useCV.ts                  # Hook principal CV
│   ├── useExport.ts              # Hook exportación
│   ├── useAutoSave.ts            # Auto-guardado
│   └── useDebounce.ts            # Debounce formularios
├── types/
│   ├── cv.ts                     # Tipos TypeScript
│   └── template.ts               # Tipos plantillas
├── styles/
│   └── globals.css               # Estilos globales
├── public/
│   ├── fonts/                    # Fuentes locales
│   └── images/                   # Assets estáticos
├── docs/                         # Documentación
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

### 3.2 Flujo de Datos
```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EDITOR PANEL (Forms)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ React Hook  │  │   Tiptap    │  │   dnd-kit   │             │
│  │    Form     │  │  (WYSIWYG)  │  │ (Drag Drop) │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          │                                       │
│                          ▼ (debounce 300ms)                      │
│                 ┌─────────────────┐                              │
│                 │    Zustand      │                              │
│                 │   cvStore.ts    │                              │
│                 │                 │                              │
│                 │  - cvData       │                              │
│                 │  - themeConfig  │                              │
│                 │  - layoutConfig │                              │
│                 │  - history[]    │                              │
│                 └────────┬────────┘                              │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    PREVIEW PANEL (Shadow DOM)                     │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    Template Component                        │ │
│  │  ┌─────────────────────────────────────────────────────────┐│ │
│  │  │  - Renderiza cvData con estilos aislados               ││ │
│  │  │  - Variables CSS inyectadas desde themeConfig          ││ │
│  │  │  - Paginación automática según layoutConfig            ││ │
│  │  └─────────────────────────────────────────────────────────┘│ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                      EXPORTACIÓN                                  │
│                                                                   │
│  PDF ──────► API Route ──► Playwright ──► PDF Vectorial          │
│  PNG/JPG ──► html-to-image ──► Canvas ──► Blob                   │
│  HTML ──────► Template Component ──► HTML String                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Estructura de Datos (JSON Resume)

### 4.1 Schema Principal
```typescript
interface CVData {
  // Información básica (JSON Resume estándar)
  basics: {
    name: string;
    label: string; // Título profesional
    email: string;
    phone: string;
    url?: string;
    summary: string;
    image?: string;
    location: {
      address: string;
      city: string;
      region: string;
      postalCode: string;
      countryCode: string;
    };
    profiles: Array<{
      network: string; // LinkedIn, GitHub, etc.
      username: string;
      url: string;
    }>;
  };
  
  // Experiencia laboral
  work: Array<{
    id: string;
    company: string;
    position: string;
    url?: string;
    startDate: string;
    endDate?: string;
    summary: string;
    highlights: string[];
    location?: string;
  }>;
  
  // Educación
  education: Array<{
    id: string;
    institution: string;
    url?: string;
    area: string; // Área de estudio
    studyType: string; // Tipo de grado
    startDate: string;
    endDate?: string;
    score?: string; // Nota/Promedio
  }>;
  
  // Habilidades
  skills: Array<{
    id: string;
    name: string;
    level: number; // 0-100
    keywords: string[];
  }>;
  
  // Proyectos
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    highlights: string[];
    url?: string;
    startDate?: string;
    endDate?: string;
  }>;
  
  // Certificaciones
  certificates?: Array<{
    id: string;
    name: string;
    date: string;
    issuer: string;
    url?: string;
  }>;
  
  // Idiomas
  languages?: Array<{
    id: string;
    language: string;
    fluency: string; // Native, Fluent, Intermediate, Basic
  }>;
  
  // Voluntariado
  volunteer?: Array<{
    id: string;
    organization: string;
    position: string;
    url?: string;
    startDate: string;
    endDate?: string;
    summary: string;
    highlights: string[];
  }>;
  
  // Intereses
  interests?: Array<{
    id: string;
    name: string;
    keywords: string[];
  }>;
  
  // Referencias
  references?: Array<{
    id: string;
    name: string;
    reference: string;
  }>;
  
  // Configuración de visualización (extensión propietaria)
  meta: {
    templateId: string;
    layoutConfig: {
      pageSize: 'A4' | 'Letter' | 'Legal' | 'Custom';
      customWidth?: string;
      customHeight?: string;
      orientation: 'portrait' | 'landscape';
      margins: {
        top: string;
        right: string;
        bottom: string;
        left: string;
      };
      pages: number | 'auto';
    };
    themeConfig: {
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
      backgroundColor: string;
      textColor: string;
      mutedColor: string;
    };
    typographyConfig: {
      headingFont: string;
      bodyFont: string;
      headingSize: number;
      bodySize: number;
      lineHeight: number;
    };
    sectionOrder: string[]; // Orden de secciones
    visibleSections: string[]; // Secciones visibles
  };
}
```

---

## 5. Plantillas de Diseño

### 5.1 Catálogo MVP

| ID | Nombre | Descripción | Uso Principal |
|----|--------|-------------|---------------|
| `classic` | Classic | Diseño tradicional de una columna, limpio y corporativo | General, Corporativo |
| `sidebar` | Sidebar | Barra lateral oscura con foto, como el CV de Aileen | Tech, Creativo |
| `modern` | Modern | Diseño contemporáneo con acentos de color | Startups, Tech |
| `minimal` | Minimal | Blanco y negro, tipografía elegante | Académico, Legal |
| `creative` | Creative | Colores vibrantes, elementos gráficos | Diseño, Marketing |

### 5.2 Sistema de Variables CSS por Plantilla
```css
/* Cada plantilla define variables por defecto */
.template-sidebar {
  --primary-color: #0f3638;
  --secondary-color: #4f98a3;
  --accent-color: #01696f;
  --background-color: #ffffff;
  --text-color: #1a1814;
  --muted-color: #6b6a65;
  --heading-font: 'Cormorant Garamond', serif;
  --body-font: 'Inter', sans-serif;
  --sidebar-width: 68mm;
  --border-radius: 4px;
}
```

---

## 6. Paletas de Colores Predefinidas

### 6.1 Catálogo
| ID | Nombre | Primary | Secondary | Accent | Uso |
|----|--------|---------|-----------|--------|-----|
| `teal` | Teal Professional | #0f3638 | #4f98a3 | #01696f | General |
| `navy` | Navy Corporate | #1e3a5f | #2d5a87 | #3498db | Corporativo |
| `forest` | Forest | #1a3a2f | #3d6b5a | #2d8659 | Naturaleza |
| `wine` | Wine | #4a1c2b | #8b3a4a | #c45c6a | Elegante |
| `slate` | Slate Modern | #334155 | #64748b | #3b82f6 | Tech |
| `amber` | Amber | #78350f | #b45309 | #f59e0b | Creativo |
| `violet` | Violet | #4c1d95 | #7c3aed | #a78bfa | Innovador |
| `charcoal` | Charcoal | #18181b | #3f3f46 | #71717a | Minimal |

---

## 7. Fuentes Disponibles

### 7.1 Fuentes para Títulos
| Nombre | Categoría | Google Fonts |
|--------|-----------|--------------|
| Cormorant Garamond | Serif | ✅ |
| Playfair Display | Serif | ✅ |
| Merriweather | Serif | ✅ |
| Montserrat | Sans-serif | ✅ |
| Poppins | Sans-serif | ✅ |
| Lora | Serif | ✅ |

### 7.2 Fuentes para Cuerpo
| Nombre | Categoría | Google Fonts |
|--------|-----------|--------------|
| Inter | Sans-serif | ✅ |
| Roboto | Sans-serif | ✅ |
| Open Sans | Sans-serif | ✅ |
| Lato | Sans-serif | ✅ |
| Source Sans 3 | Sans-serif | ✅ |
| Nunito | Sans-serif | ✅ |

---

## 8. Configuración de Página

### 8.1 Tamaños Soportados
| ID | Nombre | Dimensiones |
|----|--------|-------------|
| `A4` | A4 (Estándar) | 210mm × 297mm |
| `Letter` | US Letter | 8.5in × 11in |
| `Legal` | US Legal | 8.5in × 14in |
| `Custom` | Personalizado | Definido por usuario |

### 8.2 Márgenes Predefinidos
| ID | Nombre | Valor |
|----|--------|-------|
| `narrow` | Estrecho | 10mm |
| `normal` | Normal | 15mm |
| `wide` | Amplio | 25mm |
| `custom` | Personalizado | Por eje |

---

## 9. Funcionalidades Detalladas

### 9.1 Editor de CV
| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| Formularios por sección | Campos editables para cada sección | P0 |
| Vista previa en tiempo real | Cambios reflejados instantáneamente | P0 |
| Undo/Redo | Historial de cambios (50 steps) | P1 |
| Drag & Drop secciones | Reordenar secciones arrastrando | P1 |
| Duplicar secciones | Clonar bloques existentes | P1 |
| Eliminar secciones | Remover secciones completas | P1 |
| Auto-guardado | Guardado automático cada 30s | P1 |
| Importar/Exportar JSON | Backup y restauración | P2 |
| Atajos de teclado | Ctrl+Z, Ctrl+Y, Ctrl+S | P2 |

### 9.2 Personalización
| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| Selector de plantilla | Cambio instantáneo de diseño | P0 |
| Selector de colores | Paletas predefinidas + custom | P0 |
| Selector de fuentes | Google Fonts integradas | P0 |
| Tamaño de página | A4, Letter, Legal, Custom | P0 |
| Márgenes | Configuración de márgenes | P1 |
| Orientación | Vertical / Horizontal | P2 |
| Tamaño de fuente | Global y por sección | P2 |
| Espaciado | Interlineado y entre secciones | P2 |

### 9.3 Exportación
| Formato | Método | Calidad | Prioridad |
|---------|--------|---------|-----------|
| PDF | Playwright (backend) | Vectorial, ATS-friendly | P0 |
| PNG | html-to-image | Alta resolución | P0 |
| JPG | html-to-image | Optimizado | P0 |
| HTML | Template string | Código limpio | P0 |

### 9.4 Gestión de CVs
| Funcionalidad | Descripción | Prioridad |
|---------------|-------------|-----------|
| Crear nuevo CV | Desde cero o plantilla | P0 |
| Duplicar CV | Copia completa | P1 |
| Eliminar CV | Con confirmación | P1 |
| Listar CVs | Dashboard con previews | P1 |
| Renombrar CV | Editar título | P2 |

---

## 10. Casos de Uso Principales

### UC-01: Usuario nuevo creando su primer CV
1. Usuario accede a la plataforma
2. Selecciona "Crear nuevo CV"
3. Elige una plantilla inicial
4. Completa información básica (nombre, contacto)
5. Añade secciones (experiencia, educación, etc.)
6. Personaliza colores y fuentes
7. Exporta en formato deseado

### UC-02: Usuario editando CV existente
1. Usuario accede al dashboard
2. Selecciona un CV existente
3. Modifica campos deseados
4. Ve cambios en tiempo real
5. Exporta versión actualizada

### UC-03: Usuario cambiando de plantilla
1. Usuario está en el editor
2. Abre selector de plantillas
3. Previsualiza diferentes opciones
4. Selecciona nueva plantilla
5. El contenido se mantiene, solo cambia el diseño

### UC-04: Usuario exportando a PDF
1. Usuario finaliza edición
2. Clic en "Exportar PDF"
3. Sistema genera PDF vectorial
4. Archivo se descarga automáticamente

### UC-05: Usuario reordenando secciones
1. Usuario arrastra sección "Educación"
2. La coloca antes de "Experiencia"
3. La vista previa se actualiza
4. El orden queda guardado

---

## 11. Requisitos No Funcionales

### 11.1 Rendimiento
| Métrica | Objetivo |
|---------|----------|
| Tiempo de carga inicial | < 3 segundos |
| Actualización de preview | < 100ms |
| Generación de PDF | < 5 segundos |
| Generación de imagen | < 2 segundos |
| Tamaño del bundle | < 500KB (gzipped) |

### 11.2 Compatibilidad
| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 11.3 Accesibilidad
- WCAG 2.1 nivel AA
- Navegación por teclado completa
- Contraste de colores mínimo 4.5:1
- Labels en todos los campos de formulario

### 11.4 SEO
- Meta tags dinámicos
- Open Graph tags
- Schema.org markup
- Sitemap.xml

---

## 12. Roadmap de Desarrollo

### Fase 1: MVP (4 semanas)
- Semana 1: Estructura base + Editor básico
- Semana 2: Sistema de plantillas (3 plantillas)
- Semana 3: Exportación (PDF, PNG, JPG, HTML)
- Semana 4: Personalización + Testing

### Fase 2: Mejoras (2 semanas)
- 2 plantillas adicionales
- Drag & Drop de secciones
- Undo/Redo
- Auto-guardado

### Fase 3: Avanzado (Futuro)
- Autenticación con Firebase
- Almacenamiento en la nube
- Múltiples CVs por usuario
- Importación desde LinkedIn
- Análisis ATS con IA

---

## 13. Criterios de Aceptación del MVP

### Checklist Final
- [ ] Editor funcional con todas las secciones
- [ ] Vista previa en tiempo real sin lag
- [ ] 5 plantillas disponibles
- [ ] Exportación PDF vectorial funcional
- [ ] Exportación PNG/JPG funcional
- [ ] Exportación HTML limpia
- [ ] Selector de colores funcional
- [ ] Selector de fuentes funcional
- [ ] Configuración de tamaño de página
- [ ] Guardado en localStorage
- [ ] Responsive design
- [ ] Accesibilidad básica

---

## 14. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retraso en generación de PDF | Media | Alto | Caché de plantillas renderizadas |
| Pérdida de datos del usuario | Baja | Crítico | Auto-guardado + backup en localStorage |
| Incompatibilidad ATS | Media | Alto | Testing con parsers reales |
| Performance en móviles | Media | Medio | Diseño responsive optimizado |

---

## 15. Documentación Relacionada

| Documento | Ubicación |
|-----------|-----------|
| Módulo Editor | `docs/modules/editor.md` |
| Módulo Plantillas | `docs/modules/templates.md` |
| Módulo Exportación | `docs/modules/export.md` |
| Módulo Personalización | `docs/modules/personalization.md` |
| Módulo Estado | `docs/modules/state.md` |
| Sprint 1 | `docs/sprints/sprint-1.md` |
| Sprint 2 | `docs/sprints/sprint-2.md` |
| Sprint 3 | `docs/sprints/sprint-3.md` |
| Sprint 4 | `docs/sprints/sprint-4.md` |

---

**Versión:** 1.0.0  
**Última actualización:** 2026-04-22  
**Autor:** CV Designer Pro Team
