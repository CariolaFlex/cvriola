# Sprint 2: Sistema de Plantillas + Preview

## 1. Objetivo del Sprint
Implementar el sistema de plantillas con Shadow DOM para aislamiento de estilos, crear las primeras 3 plantillas (Classic, Sidebar, Modern), y desarrollar el panel de preview con actualización en tiempo real.

**Duración estimada:** 5-7 días

---

## 2. Tareas Detalladas

### Tarea 2.1: Crear TemplateWrapper con Shadow DOM
**Tiempo:** 4 horas

**Archivo:** `src/components/templates/TemplateWrapper.tsx`

Implementar:
- Contenedor con Shadow DOM
- Inyección de variables CSS dinámicas
- Manejo de dimensiones de página
- Sistema de paginación básico

```typescript
// Pseudocódigo
export function TemplateWrapper({ 
  templateId, 
  children, 
  theme, 
  pageSize 
}: TemplateWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<ShadowRoot | null>(null);
  
  useEffect(() => {
    if (containerRef.current && !shadowRef.current) {
      shadowRef.current = containerRef.current.attachShadow({ mode: 'open' });
    }
  }, []);
  
  useEffect(() => {
    if (shadowRef.current) {
      injectStyles(shadowRef.current, theme, pageSize);
    }
  }, [theme, pageSize]);
  
  return <div ref={containerRef} data-template={templateId} />;
}
```

**Checklist:**
- [ ] Shadow DOM implementado
- [ ] Variables CSS inyectadas
- [ ] Dimensiones correctas

---

### Tarea 2.2: Crear Sistema de Registro de Plantillas
**Tiempo:** 2 horas

**Archivo:** `src/lib/templates/registry.ts`

Implementar:
- Clase TemplateRegistry
- Funciones: register, get, getAll, getByCategory
- Tipos TemplateDefinition

**Checklist:**
- [ ] Registro implementado
- [ ] Plantillas registrables

---

### Tarea 2.3: Crear Plantilla Classic
**Tiempo:** 6 horas

**Directorio:** `src/components/templates/Classic/`

Archivos:
- `index.tsx` - Export principal
- `ClassicTemplate.tsx` - Componente principal
- `Header.tsx` - Encabezado con nombre
- `Sections/` - Componentes de sección
  - `ExperienceSection.tsx`
  - `EducationSection.tsx`
  - `SkillsSection.tsx`
  - `CertificatesSection.tsx`
- `styles.ts` - Estilos CSS-in-JS

**Layout Classic:**
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
└─────────────────────────────────────────┘
```

**Checklist:**
- [ ] Layout implementado
- [ ] Todas las secciones renderizan
- [ ] Estilos aplicados correctamente
- [ ] Responsive básico

---

### Tarea 2.4: Crear Plantilla Sidebar
**Tiempo:** 8 horas

**Directorio:** `src/components/templates/Sidebar/`

Archivos:
- `index.tsx`
- `SidebarTemplate.tsx`
- `SidebarColumn.tsx` - Columna lateral oscura
- `MainColumn.tsx` - Columna principal
- `Avatar.tsx` - Foto de perfil
- `Sections/`
  - `SidebarContactSection.tsx`
  - `SidebarSkillsSection.tsx` - Con barras de progreso
  - `SidebarAptitudesSection.tsx`
  - `MainExperienceSection.tsx`
  - `MainEducationSection.tsx`
- `styles.ts`

**Layout Sidebar:**
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
└────────────┴──────────────────────────────┘
```

**Checklist:**
- [ ] Layout de dos columnas
- [ ] Sidebar con fondo oscuro
- [ ] Avatar circular
- [ ] Barras de progreso en skills
- [ ] Todas las secciones funcionando

---

### Tarea 2.5: Crear Plantilla Modern
**Tiempo:** 6 horas

**Directorio:** `src/components/templates/Modern/`

Archivos:
- `index.tsx`
- `ModernTemplate.tsx`
- `Header.tsx` - Header con gradiente
- `Timeline.tsx` - Timeline para experiencia
- `Card.tsx` - Cards para secciones
- `Sections/`
- `styles.ts`

**Checklist:**
- [ ] Header con gradiente
- [ ] Timeline implementado
- [ ] Cards estilizadas
- [ ] Todas las secciones

---

### Tarea 2.6: Crear PreviewPanel
**Tiempo:** 4 horas

**Archivo:** `src/components/preview/PreviewPanel.tsx`

Implementar:
- Contenedor del preview
- Integración con TemplateWrapper
- Zoom controls
- Navegación de páginas (si aplica)

```typescript
export function PreviewPanel() {
  const templateId = useCVStore((state) => state.cvData.meta.templateId);
  const cvData = useCVStore((state) => state.cvData);
  const theme = useCVStore((state) => state.cvData.meta.themeConfig);
  const { previewRef, zoom, setZoom } = useUIStore();
  
  const TemplateComponent = getTemplateComponent(templateId);
  
  return (
    <div className="preview-container">
      <div className="zoom-controls">
        <Button onClick={() => setZoom(zoom - 0.1)}>-</Button>
        <span>{Math.round(zoom * 100)}%</span>
        <Button onClick={() => setZoom(zoom + 0.1)}>+</Button>
      </div>
      
      <div 
        ref={previewRef}
        style={{ transform: `scale(${zoom})` }}
        className="preview-canvas"
      >
        <TemplateWrapper templateId={templateId} theme={theme}>
          <TemplateComponent data={cvData} />
        </TemplateWrapper>
      </div>
    </div>
  );
}
```

**Checklist:**
- [ ] Preview renderizando
- [ ] Zoom funcionando
- [ ] Plantilla cambia dinámicamente

---

### Tarea 2.7: Crear Secciones Compartidas
**Tiempo:** 4 horas

**Archivos:**
- `src/components/templates/shared/SectionTitle.tsx`
- `src/components/templates/shared/EntryItem.tsx`
- `src/components/templates/shared/DateRange.tsx`
- `src/components/templates/shared/LocationBadge.tsx`
- `src/components/templates/shared/SkillBar.tsx`
- `src/components/templates/shared/ProfileLink.tsx`

**Checklist:**
- [ ] Componentes compartidos creados
- [ ] Reutilizables entre plantillas

---

### Tarea 2.8: Implementar Selector de Plantillas
**Tiempo:** 3 horas

**Archivo:** `src/components/toolbar/TemplateSelector.tsx`

Implementar:
- Grid de miniaturas
- Preview en hover
- Selección con un clic
- Indicador de plantilla actual

**Checklist:**
- [ ] Selector visual
- [ ] Cambio de plantilla funciona
- [ ] Preview actualiza

---

### Tarea 2.9: Crear historyStore para Undo/Redo
**Tiempo:** 2 horas

**Archivo:** `src/lib/store/historyStore.ts`

Implementar:
- Stack de estados pasados
- Stack de estados futuros
- Acciones: pushState, undo, redo
- Máximo de historial (50)

**Checklist:**
- [ ] Undo funciona
- [ ] Redo funciona
- [ ] Límite de historial

---

### Tarea 2.10: Implementar Atajos de Teclado
**Tiempo:** 2 horas

**Archivo:** `src/hooks/useKeyboardShortcuts.ts`

Atajos:
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Y` - Redo
- `Ctrl/Cmd + S` - Guardar

**Checklist:**
- [ ] Atajos funcionando
- [ ] Multi-plataforma (Mac/Windows)

---

### Tarea 2.11: Integrar Todo en Editor
**Tiempo:** 3 horas

**Archivo:** `src/app/(app)/editor/[id]/page.tsx`

Integrar:
- EditorPanel (izquierda)
- PreviewPanel (derecha)
- Toolbar (superior)
- Estados sincronizados

**Checklist:**
- [ ] Layout completo
- [ ] Todo sincronizado
- [ ] Responsive

---

## 3. Criterios de Aceptación

### Al finalizar el Sprint 2:
- [ ] 3 plantillas funcionales (Classic, Sidebar, Modern)
- [ ] Preview actualiza en tiempo real
- [ ] Cambio de plantilla funciona
- [ ] Zoom del preview funciona
- [ ] Undo/Redo funciona
- [ ] Atajos de teclado funcionan
- [ ] Shadow DOM aísla estilos correctamente

---

## 4. Entregables

| Entregable | Ubicación |
|------------|-----------|
| TemplateWrapper | `src/components/templates/TemplateWrapper.tsx` |
| Plantilla Classic | `src/components/templates/Classic/` |
| Plantilla Sidebar | `src/components/templates/Sidebar/` |
| Plantilla Modern | `src/components/templates/Modern/` |
| PreviewPanel | `src/components/preview/PreviewPanel.tsx` |
| TemplateSelector | `src/components/toolbar/TemplateSelector.tsx` |
| historyStore | `src/lib/store/historyStore.ts` |

---

## 5. Dependencias para Siguiente Sprint

- Plantillas renderizando datos
- PreviewPanel funcionando
- Store con historial

---

**Sprint:** 2 de 4  
**Estado:** Pendiente  
**Bloqueado por:** Sprint 1
