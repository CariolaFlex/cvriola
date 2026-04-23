# CV Designer Pro - Guía de Desarrollo

## Resumen del Proyecto

**CV Designer Pro** es una plataforma web de clase mundial para la creación, personalización y exportación de currículums vitae.

### Stack Tecnológico
- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **Estado:** Zustand + React Hook Form + Zod
- **Componentes:** shadcn/ui + Radix UI
- **Exportación:** Playwright (PDF) + html-to-image (PNG/JPG)
- **Editor:** Tiptap (WYSIWYG) + dnd-kit (Drag & Drop)

---

## Estructura de Documentación

```
docs/
├── PRD.md                    # Documento de requisitos (LEER PRIMERO)
├── METODOLOGIA.md            # Esta guía
├── modules/
│   ├── editor.md             # Módulo del editor
│   ├── templates.md          # Sistema de plantillas
│   ├── export.md             # Sistema de exportación
│   ├── personalization.md    # Personalización visual
│   └── state.md              # Estado global
└── sprints/
    ├── sprint-1.md           # Estructura + Editor
    ├── sprint-2.md           # Plantillas + Preview
    ├── sprint-3.md           # Exportación
    └── sprint-4.md           # Personalización + Pulido
```

---

## Orden de Lectura Recomendado

1. **PRD.md** - Visión general del proyecto
2. **modules/state.md** - Entender la estructura de datos
3. **modules/editor.md** - Cómo funciona el editor
4. **modules/templates.md** - Sistema de plantillas
5. **modules/export.md** - Sistema de exportación
6. **modules/personalization.md** - Personalización
7. **sprints/sprint-1.md** → **sprint-4.md** - Plan de desarrollo

---

## Flujo de Trabajo con Claude Code

### 1. Preparación
```bash
# Crear directorio del proyecto
mkdir c:/cv-designer-pro
cd c:/cv-designer-pro

# Copiar documentación
# (Pegar contenido de los archivos .md en la carpeta docs/)
```

### 2. Desarrollo por Sprint
Para cada sprint, seguir este proceso:

```
1. Leer el sprint completo
2. Ejecutar las tareas en orden
3. Validar cada checklist
4. Pasar al siguiente sprint solo cuando todo esté completo
```

### 3. Comandos de Validación
```bash
# Verificar errores de TypeScript
pnpm tsc --noEmit

# Verificar errores de ESLint
pnpm lint

# Ejecutar tests
pnpm test

# Build de producción
pnpm build
```

---

## Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar producción
pnpm start

# Linting
pnpm lint
```

---

## Checklist Pre-Deploy

### Funcionalidades
- [ ] Editor funciona con todas las secciones
- [ ] 5 plantillas renderizan correctamente
- [ ] Exportación PDF funciona
- [ ] Exportación PNG funciona
- [ ] Exportación JPG funciona
- [ ] Exportación HTML funciona
- [ ] Personalización de colores funciona
- [ ] Personalización de fuentes funciona
- [ ] Drag & Drop funciona
- [ ] Undo/Redo funciona
- [ ] Auto-guardado funciona

### Calidad
- [ ] Sin errores de TypeScript
- [ ] Sin errores de ESLint
- [ ] Build exitoso
- [ ] Responsive en móvil
- [ ] Lighthouse score > 80

### Deploy
- [ ] Repositorio en GitHub creado
- [ ] Conectado a Vercel
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado (opcional)

---

## Notas Importantes

### Generación de PDF
- Playwright requiere Chromium instalado
- En Vercel, usar `@playwright/test` con configuración serverless
- Alternativa: usar API externa como Browserless

### Fuentes
- Google Fonts se cargan dinámicamente
- Para PDF, las fuentes deben embeberse
- Fallbacks a fuentes del sistema

### LocalStorage
- Límite de ~5MB por dominio
- Considerar IndexedDB para CVs con imágenes grandes
- Comprimir datos si es necesario

---

## Próximos Pasos Post-MVP

1. **Autenticación** - Firebase Auth
2. **Almacenamiento en la nube** - Firebase Firestore
3. **Importación LinkedIn** - Parseo de PDF/HTML
4. **Análisis ATS** - Scoring con IA
5. **Colaboración** - Compartir CVs con editores
6. **Templates Premium** - Plantillas de pago

---

**Versión:** 1.0.0  
**Última actualización:** 2026-04-22
