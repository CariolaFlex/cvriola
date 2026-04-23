# Sprint 4: Personalización + Plantillas Adicionales + Pulido Final

## 1. Objetivo del Sprint
Implementar el sistema completo de personalización (colores, fuentes, tamaños), agregar 2 plantillas adicionales (Minimal, Creative), crear el dashboard de CVs, y realizar el pulido final de UI/UX y testing integral.

**Duración estimada:** 5-7 días

---

## 2. Tareas Detalladas

### Tarea 4.1: Crear ThemeSelector
**Tiempo:** 4 horas

**Archivo:** `src/components/toolbar/ThemeSelector.tsx`

Implementar:
- Grid de paletas predefinidas
- Preview de colores en hover
- Color picker personalizado
- Integración con cvStore

```typescript
export function ThemeSelector() {
  const theme = useCVStore((state) => state.cvData.meta.themeConfig);
  const updateTheme = useCVStore((state) => state.updateTheme);
  
  return (
    <div className="theme-selector">
      <h4>Paletas de Colores</h4>
      <div className="palettes-grid">
        {COLOR_PALETTES.map(palette => (
          <button
            key={palette.id}
            onClick={() => updateTheme({
              primaryColor: palette.primary,
              secondaryColor: palette.secondary,
              accentColor: palette.accent,
            })}
            className={cn('palette-btn', { active: theme.primaryColor === palette.primary })}
          >
            <div className="palette-preview">
              <div style={{ background: palette.primary }} />
              <div style={{ background: palette.secondary }} />
              <div style={{ background: palette.accent }} />
            </div>
            <span>{palette.name}</span>
          </button>
        ))}
      </div>
      
      <div className="custom-colors">
        <ColorPicker 
          label="Color Principal" 
          value={theme.primaryColor}
          onChange={(color) => updateTheme({ primaryColor: color })}
        />
        {/* Más pickers... */}
      </div>
    </div>
  );
}
```

**Checklist:**
- [ ] Paletas predefinidas funcionan
- [ ] Color picker funciona
- [ ] Preview actualiza en tiempo real

---

### Tarea 4.2: Crear FontSelector
**Tiempo:** 3 horas

**Archivo:** `src/components/toolbar/FontSelector.tsx`

Implementar:
- Selectores separados para títulos y cuerpo
- Preview de cada fuente
- Categorización (serif, sans-serif)
- Carga dinámica de Google Fonts

**Checklist:**
- [ ] Fuentes listadas
- [ ] Preview funciona
- [ ] Carga dinámica de fuentes

---

### Tarea 4.3: Crear PageSizeSelector
**Tiempo:** 2 horas

**Archivo:** `src/components/toolbar/PageSizeSelector.tsx`

Implementar:
- Selector de formato (A4, Letter, Legal, Custom)
- Selector de orientación
- Configuración de márgenes
- Preview de dimensiones

**Checklist:**
- [ ] Formatos funcionan
- [ ] Orientación funciona
- [ ] Márgenes personalizables

---

### Tarea 4.4: Crear TypographyControls
**Tiempo:** 2 horas

**Archivo:** `src/components/toolbar/TypographyControls.tsx`

Implementar:
- Slider de tamaño de títulos
- Slider de tamaño de cuerpo
- Slider de interlineado
- Slider de espaciado entre secciones

**Checklist:**
- [ ] Sliders funcionan
- [ ] Valores limitados
- [ ] Preview actualiza

---

### Tarea 4.5: Crear Plantilla Minimal
**Tiempo:** 4 horas

**Directorio:** `src/components/templates/Minimal/`

Características:
- Solo escala de grises
- Tipografía serif elegante
- Sin colores de fondo
- Máximo espacio en blanco
- Líneas divisorias sutiles

**Checklist:**
- [ ] Layout implementado
- [ ] Estilo minimalista aplicado
- [ ] Todas las secciones

---

### Tarea 4.6: Crear Plantilla Creative
**Tiempo:** 4 horas

**Directorio:** `src/components/templates/Creative/`

Características:
- Paleta de colores vibrantes
- Elementos decorativos
- Layouts asimétricos
- Header con gradiente
- Iconos coloridos

**Checklist:**
- [ ] Layout implementado
- [ ] Estilo creativo aplicado
- [ ] Todas las secciones

---

### Tarea 4.7: Crear Dashboard de CVs
**Tiempo:** 4 horas

**Archivo:** `src/app/(app)/page.tsx`

Implementar:
- Grid de CVs guardados
- Miniaturas de preview
- Acciones: Crear, Editar, Duplicar, Eliminar
- Búsqueda/filtrado
- Ordenamiento por fecha

```typescript
export default function DashboardPage() {
  const cvList = useCVStore((state) => state.cvList);
  const createNewCV = useCVStore((state) => state.createNewCV);
  const deleteCV = useCVStore((state) => state.deleteCV);
  
  return (
    <div className="dashboard">
      <header>
        <h1>Mis Currículums</h1>
        <Button onClick={() => createNewCV()}>
          <Plus /> Nuevo CV
        </Button>
      </header>
      
      <div className="cv-grid">
        {cvList.map(cv => (
          <CVCard 
            key={cv.id}
            cv={cv}
            onEdit={() => router.push(`/editor/${cv.id}`)}
            onDuplicate={() => duplicateCV(cv.id)}
            onDelete={() => deleteCV(cv.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

**Checklist:**
- [ ] Grid de CVs
- [ ] CRUD completo
- [ ] Miniaturas
- [ ] Responsive

---

### Tarea 4.8: Crear CVCard Component
**Tiempo:** 2 horas

**Archivo:** `src/components/dashboard/CVCard.tsx`

Implementar:
- Miniatura del CV
- Nombre y fecha
- Menú de acciones
- Hover effects

**Checklist:**
- [ ] Card creada
- [ ] Acciones funcionan
- [ ] UI atractiva

---

### Tarea 4.9: Implementar Drag & Drop de Secciones
**Tiempo:** 4 horas

**Archivo:** `src/components/editor/DraggableSection.tsx`

Implementar:
- Cada sección es arrastrable
- Indicador de drop zone
- Animación durante drag
- Actualización del orden en store

**Checklist:**
- [ ] Drag funciona
- [ ] Orden se actualiza
- [ ] Animaciones suaves

---

### Tarea 4.10: Implementar Auto-guardado
**Tiempo:** 2 horas

**Archivo:** `src/hooks/useAutoSave.ts`

Implementar:
- Guardado cada 30 segundos
- Guardado antes de cerrar página
- Indicador de "Guardado"
- Indicador de "Cambios sin guardar"

**Checklist:**
- [ ] Auto-guardado funciona
- [ ] Indicadores visuales
- [ ] No interfiere con edición

---

### Tarea 4.11: Crear Página de Landing
**Tiempo:** 3 horas

**Archivo:** `src/app/(public)/page.tsx`

Implementar:
- Hero section
- Features list
- Call to action
- Preview de plantillas

**Checklist:**
- [ ] Landing atractiva
- [ ] Responsive
- [ ] CTA funciona

---

### Tarea 4.12: Implementar Undo/Redo Visual
**Tiempo:** 2 horas

**Archivo:** `src/components/toolbar/UndoRedoButtons.tsx`

Implementar:
- Botones Undo/Redo
- Estado deshabilitado cuando no hay historial
- Tooltip con shortcut

**Checklist:**
- [ ] Botones creados
- [ ] Estados correctos
- [ ] Atajos visibles

---

### Tarea 4.13: Testing Integral
**Tiempo:** 4 horas

Probar:
- [ ] Crear nuevo CV
- [ ] Editar todas las secciones
- [ ] Cambiar plantilla
- [ ] Personalizar colores
- [ ] Personalizar fuentes
- [ ] Exportar PDF
- [ ] Exportar PNG
- [ ] Exportar JPG
- [ ] Exportar HTML
- [ ] Duplicar CV
- [ ] Eliminar CV
- [ ] Undo/Redo
- [ ] Auto-guardado
- [ ] Responsive en móvil
- [ ] Accesibilidad básica

---

### Tarea 4.14: Optimizar Performance
**Tiempo:** 3 horas

Implementar:
- Lazy loading de plantillas
- Memoización de componentes
- Code splitting
- Optimización de imágenes

**Checklist:**
- [ ] Lighthouse score > 90
- [ ] First paint < 2s
- [ ] Bundle size optimizado

---

### Tarea 4.15: Documentación Final
**Tiempo:** 2 horas

Actualizar:
- README.md
- Comentarios en código
- JSDoc en funciones principales

**Checklist:**
- [ ] README completo
- [ ] Código documentado

---

## 3. Criterios de Aceptación Final

### Al finalizar el Sprint 4:
- [ ] 5 plantillas funcionales
- [ ] Personalización completa de colores
- [ ] Personalización completa de fuentes
- [ ] Configuración de página funciona
- [ ] Dashboard de CVs funciona
- [ ] Drag & Drop de secciones funciona
- [ ] Auto-guardado funciona
- [ ] Todas las exportaciones funcionan
- [ ] Landing page completa
- [ ] Responsive en todos los dispositivos
- [ ] Performance optimizado
- [ ] Sin errores de TypeScript
- [ ] Sin errores de ESLint

---

## 4. Entregables

| Entregable | Ubicación |
|------------|-----------|
| ThemeSelector | `src/components/toolbar/ThemeSelector.tsx` |
| FontSelector | `src/components/toolbar/FontSelector.tsx` |
| PageSizeSelector | `src/components/toolbar/PageSizeSelector.tsx` |
| TypographyControls | `src/components/toolbar/TypographyControls.tsx` |
| Plantilla Minimal | `src/components/templates/Minimal/` |
| Plantilla Creative | `src/components/templates/Creative/` |
| Dashboard | `src/app/(app)/page.tsx` |
| CVCard | `src/components/dashboard/CVCard.tsx` |
| DraggableSection | `src/components/editor/DraggableSection.tsx` |
| useAutoSave | `src/hooks/useAutoSave.ts` |
| Landing | `src/app/(public)/page.tsx` |
| UndoRedoButtons | `src/components/toolbar/UndoRedoButtons.tsx` |

---

## 5. Checklist Final del MVP

### Funcionalidades Core
- [x] Editor de CV con todas las secciones
- [x] Vista previa en tiempo real
- [x] 5 plantillas de diseño
- [x] Exportación PDF vectorial
- [x] Exportación PNG/JPG
- [x] Exportación HTML
- [x] Personalización de colores
- [x] Personalización de fuentes
- [x] Configuración de tamaño de página
- [x] Guardado en localStorage
- [x] Drag & Drop de secciones
- [x] Undo/Redo
- [x] Auto-guardado
- [x] Dashboard de CVs

### Calidad
- [x] Responsive design
- [x] Accesibilidad básica
- [x] Performance optimizado
- [x] Sin errores de compilación

---

**Sprint:** 4 de 4  
**Estado:** Pendiente  
**Bloqueado por:** Sprint 3

---

# RESUMEN DE SPRINTS

| Sprint | Duración | Entregable Principal |
|--------|----------|---------------------|
| 1 | 5-7 días | Estructura + Editor básico |
| 2 | 5-7 días | Sistema de plantillas + Preview |
| 3 | 4-5 días | Exportación completa |
| 4 | 5-7 días | Personalización + Plantillas adicionales + Pulido |
| **Total** | **19-26 días** | **MVP Completo** |
