# Módulo: Personalización

## 1. Descripción General
El módulo de personalización permite a los usuarios modificar la apariencia visual de su CV: colores, fuentes, tamaños, espaciado y configuración de página. Todos los cambios se aplican en tiempo real mediante variables CSS.

---

## 2. Componentes del Módulo

### 2.1 ThemeSelector.tsx
**Ubicación:** `components/toolbar/ThemeSelector.tsx`

**Responsabilidad:** Selector de paletas de colores predefinidas y personalizadas.

```typescript
interface ThemeSelectorProps {
  currentTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
}

interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}
```

**Características:**
- Grid de paletas predefinidas
- Preview de colores en hover
- Selector de color personalizado (color picker)
- Preview en tiempo real

**Paletas Predefinidas:**
```typescript
export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: 'teal',
    name: 'Teal Professional',
    primary: '#0f3638',
    secondary: '#4f98a3',
    accent: '#01696f',
    background: '#ffffff',
    text: '#1a1814',
    muted: '#6b6a65',
  },
  {
    id: 'navy',
    name: 'Navy Corporate',
    primary: '#1e3a5f',
    secondary: '#2d5a87',
    accent: '#3498db',
    background: '#ffffff',
    text: '#2c3e50',
    muted: '#7f8c8d',
  },
  // ... más paletas
];
```

---

### 2.2 FontSelector.tsx
**Ubicación:** `components/toolbar/FontSelector.tsx`

**Responsabilidad:** Selector de fuentes tipográficas.

```typescript
interface FontSelectorProps {
  headingFont: string;
  bodyFont: string;
  onHeadingFontChange: (font: string) => void;
  onBodyFontChange: (font: string) => void;
}

interface FontOption {
  family: string;
  category: 'serif' | 'sans-serif' | 'display';
  googleFontsUrl: string;
  preview: string; // URL de preview
}
```

**Características:**
- Selectores separados para títulos y cuerpo
- Preview en tiempo real
- Categorización (serif, sans-serif, display)
- Búsqueda por nombre

**Fuentes Disponibles:**
```typescript
export const HEADING_FONTS: FontOption[] = [
  { family: 'Cormorant Garamond', category: 'serif', googleFontsUrl: 'Cormorant+Garamond' },
  { family: 'Playfair Display', category: 'serif', googleFontsUrl: 'Playfair+Display' },
  { family: 'Merriweather', category: 'serif', googleFontsUrl: 'Merriweather' },
  { family: 'Montserrat', category: 'sans-serif', googleFontsUrl: 'Montserrat' },
  { family: 'Poppins', category: 'sans-serif', googleFontsUrl: 'Poppins' },
];

export const BODY_FONTS: FontOption[] = [
  { family: 'Inter', category: 'sans-serif', googleFontsUrl: 'Inter' },
  { family: 'Roboto', category: 'sans-serif', googleFontsUrl: 'Roboto' },
  { family: 'Open Sans', category: 'sans-serif', googleFontsUrl: 'Open+Sans' },
  { family: 'Lato', category: 'sans-serif', googleFontsUrl: 'Lato' },
  { family: 'Source Sans 3', category: 'sans-serif', googleFontsUrl: 'Source+Sans+3' },
  { family: 'Nunito', category: 'sans-serif', googleFontsUrl: 'Nunito' },
  { family: 'Lora', category: 'serif', googleFontsUrl: 'Lora' },
];
```

---

### 2.3 PageSizeSelector.tsx
**Ubicación:** `components/toolbar/PageSizeSelector.tsx`

**Responsabilidad:** Configuración de tamaño y orientación de página.

```typescript
interface PageSizeSelectorProps {
  pageSize: PageSizeConfig;
  onPageSizeChange: (config: PageSizeConfig) => void;
}

interface PageSizeConfig {
  format: 'A4' | 'Letter' | 'Legal' | 'Custom';
  width: string;
  height: string;
  orientation: 'portrait' | 'landscape';
  margins: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}
```

**Tamaños Predefinidos:**
```typescript
export const PAGE_SIZES = {
  A4: { width: '210mm', height: '297mm' },
  Letter: { width: '8.5in', height: '11in' },
  Legal: { width: '8.5in', height: '14in' },
};

export const MARGIN_PRESETS = {
  narrow: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  normal: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
  wide: { top: '25mm', right: '25mm', bottom: '25mm', left: '25mm' },
};
```

---

### 2.4 TypographyControls.tsx
**Ubicación:** `components/toolbar/TypographyControls.tsx`

**Responsabilidad:** Control de tamaños de fuente y espaciado.

```typescript
interface TypographyControlsProps {
  config: TypographyConfig;
  onChange: (config: TypographyConfig) => void;
}

interface TypographyConfig {
  headingSize: number; // 12-24 pt
  bodySize: number;    // 8-14 pt
  lineHeight: number;  // 1.2-2.0
  sectionSpacing: number; // 8-24 pt
}
```

**Controles:**
- Slider para tamaño de títulos
- Slider para tamaño de cuerpo
- Slider para interlineado
- Slider para espaciado entre secciones

---

## 3. Sistema de Variables CSS

### 3.1 Inyección Dinámica
**Ubicación:** `lib/utils/themeInjection.ts`

```typescript
export function injectThemeVariables(
  element: HTMLElement,
  theme: ThemeConfig,
  typography: TypographyConfig
): void {
  const cssVariables = {
    '--primary-color': theme.primaryColor,
    '--secondary-color': theme.secondaryColor,
    '--accent-color': theme.accentColor,
    '--background-color': theme.backgroundColor,
    '--text-color': theme.textColor,
    '--muted-color': theme.mutedColor,
    '--heading-font': `'${theme.headingFont}', serif`,
    '--body-font': `'${theme.bodyFont}', sans-serif`,
    '--heading-size': `${typography.headingSize}pt`,
    '--body-size': `${typography.bodySize}pt`,
    '--line-height': typography.lineHeight.toString(),
    '--section-spacing': `${typography.sectionSpacing}pt`,
  };
  
  Object.entries(cssVariables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}
```

### 3.2 Uso en Plantillas
```css
/* Cada plantilla usa las variables */
.template-section {
  color: var(--text-color);
  font-family: var(--body-font);
  font-size: var(--body-size);
  line-height: var(--line-height);
  margin-bottom: var(--section-spacing);
}

.template-heading {
  font-family: var(--heading-font);
  font-size: var(--heading-size);
  color: var(--primary-color);
}

.template-accent {
  color: var(--accent-color);
  border-color: var(--secondary-color);
}
```

---

## 4. Carga Dinámica de Fuentes

### 4.1 FontLoader
**Ubicación:** `lib/utils/fontLoader.ts`

```typescript
export async function loadGoogleFont(family: string): Promise<void> {
  // Verificar si ya está cargada
  if (document.fonts.check(`12px "${family}"`)) {
    return;
  }
  
  // Crear link element
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700&display=swap`;
  
  document.head.appendChild(link);
  
  // Esperar a que cargue
  await document.fonts.ready;
}

export async function preloadFonts(fonts: string[]): Promise<void> {
  await Promise.all(fonts.map(loadGoogleFont));
}
```

### 4.2 Hook useFontLoader
**Ubicación:** `hooks/useFontLoader.ts`

```typescript
export function useFontLoader(headingFont: string, bodyFont: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    Promise.all([
      loadGoogleFont(headingFont),
      loadGoogleFont(bodyFont),
    ])
      .then(() => setIsLoading(false))
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  }, [headingFont, bodyFont]);
  
  return { isLoading, error };
}
```

---

## 5. Preview en Tiempo Real

### 5.1 Actualización Reactiva
```typescript
// En el componente de preview
function PreviewPanel() {
  const theme = useCVStore((state) => state.cvData.meta.themeConfig);
  const typography = useCVStore((state) => state.cvData.meta.typographyConfig);
  const previewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (previewRef.current) {
      injectThemeVariables(previewRef.current, theme, typography);
    }
  }, [theme, typography]);
  
  return (
    <div ref={previewRef}>
      <TemplateWrapper theme={theme}>
        {/* Template content */}
      </TemplateWrapper>
    </div>
  );
}
```

---

## 6. Almacenamiento de Preferencias

### 6.1 Persistencia
```typescript
// Guardar tema como preferencia del usuario
const saveThemePreference = (theme: ThemeConfig) => {
  localStorage.setItem('cv-designer-theme-preference', JSON.stringify(theme));
};

// Cargar tema guardado
const loadThemePreference = (): ThemeConfig | null => {
  const saved = localStorage.getItem('cv-designer-theme-preference');
  return saved ? JSON.parse(saved) : null;
};
```

---

## 7. Componentes de UI

### 7.1 ColorPicker
**Ubicación:** `components/ui/color-picker.tsx`

```typescript
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

// Usando componente de shadcn/ui
// con input de color nativo como fallback
```

### 7.2 Slider Personalizado
**Ubicación:** `components/ui/custom-slider.tsx`

```typescript
interface CustomSliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  label: string;
  unit?: string;
}

// Slider con label y valor visible
```

---

## 8. Dependencias del Módulo

```json
{
  "dependencies": {
    "@radix-ui/react-slider": "^1.x",
    "@radix-ui/react-popover": "^1.x",
    "lucide-react": "^0.x"
  }
}
```

---

## 9. Testing

### 9.1 Casos de Test
- [ ] Cambio de paleta de colores funciona
- [ ] Color picker personalizado funciona
- [ ] Cambio de fuente funciona
- [ ] Fuentes de Google cargan correctamente
- [ ] Variables CSS se inyectan
- [ ] Preview se actualiza en tiempo real
- [ ] Tamaño de página cambia correctamente
- [ ] Márgenes se aplican correctamente

---

**Versión:** 1.0.0  
**Depende de:** Módulo Estado  
**Dependientes:** Módulo Plantillas, Módulo Exportación
