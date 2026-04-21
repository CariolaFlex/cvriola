import type { ColorPalette, FontOption, TemplateDefinition, CVData } from '@/types/cv';

// Color Palettes
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
  {
    id: 'forest',
    name: 'Forest',
    primary: '#1a3a2f',
    secondary: '#3d6b5a',
    accent: '#2d8659',
    background: '#ffffff',
    text: '#1a1a1a',
    muted: '#666666',
  },
  {
    id: 'wine',
    name: 'Wine Elegant',
    primary: '#4a1c2b',
    secondary: '#8b3a4a',
    accent: '#c45c6a',
    background: '#ffffff',
    text: '#2d2d2d',
    muted: '#777777',
  },
  {
    id: 'slate',
    name: 'Slate Modern',
    primary: '#334155',
    secondary: '#64748b',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b',
    muted: '#94a3b8',
  },
  {
    id: 'amber',
    name: 'Amber Creative',
    primary: '#78350f',
    secondary: '#b45309',
    accent: '#f59e0b',
    background: '#fffbeb',
    text: '#1c1917',
    muted: '#78716c',
  },
  {
    id: 'violet',
    name: 'Violet Innovation',
    primary: '#4c1d95',
    secondary: '#7c3aed',
    accent: '#a78bfa',
    background: '#faf5ff',
    text: '#1e1b4b',
    muted: '#6b7280',
  },
  {
    id: 'charcoal',
    name: 'Charcoal Minimal',
    primary: '#18181b',
    secondary: '#3f3f46',
    accent: '#71717a',
    background: '#ffffff',
    text: '#18181b',
    muted: '#71717a',
  },
];

// Heading Fonts
export const HEADING_FONTS: FontOption[] = [
  { family: 'Cormorant Garamond', category: 'serif', googleFontsUrl: 'Cormorant+Garamond:wght@400;600;700' },
  { family: 'Playfair Display', category: 'serif', googleFontsUrl: 'Playfair+Display:wght@400;600;700' },
  { family: 'Merriweather', category: 'serif', googleFontsUrl: 'Merriweather:wght@400;700' },
  { family: 'Montserrat', category: 'sans-serif', googleFontsUrl: 'Montserrat:wght@400;600;700' },
  { family: 'Poppins', category: 'sans-serif', googleFontsUrl: 'Poppins:wght@400;600;700' },
  { family: 'Lora', category: 'serif', googleFontsUrl: 'Lora:wght@400;600;700' },
];

// Body Fonts
export const BODY_FONTS: FontOption[] = [
  { family: 'Inter', category: 'sans-serif', googleFontsUrl: 'Inter:wght@400;500;600' },
  { family: 'Roboto', category: 'sans-serif', googleFontsUrl: 'Roboto:wght@400;500' },
  { family: 'Open Sans', category: 'sans-serif', googleFontsUrl: 'Open+Sans:wght@400;500;600' },
  { family: 'Lato', category: 'sans-serif', googleFontsUrl: 'Lato:wght@400;700' },
  { family: 'Source Sans 3', category: 'sans-serif', googleFontsUrl: 'Source+Sans+3:wght@400;500;600' },
  { family: 'Nunito', category: 'sans-serif', googleFontsUrl: 'Nunito:wght@400;600;700' },
];

// Template Definitions
export const TEMPLATE_DEFINITIONS: TemplateDefinition[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Diseño tradicional de una columna, limpio y corporativo',
    category: 'corporate',
    features: ['ATS-optimized', 'Single column', 'Clean layout'],
    defaultTheme: {
      primaryColor: '#1e3a5f',
      secondaryColor: '#2d5a87',
      accentColor: '#3498db',
      backgroundColor: '#ffffff',
      textColor: '#2c3e50',
      mutedColor: '#7f8c8d',
    },
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'Barra lateral oscura con información de contacto y foto',
    category: 'creative',
    features: ['Two columns', 'Photo support', 'Skill bars'],
    defaultTheme: {
      primaryColor: '#0f3638',
      secondaryColor: '#4f98a3',
      accentColor: '#01696f',
      backgroundColor: '#ffffff',
      textColor: '#1a1814',
      mutedColor: '#6b6a65',
    },
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Diseño contemporáneo con acentos de color y timeline',
    category: 'corporate',
    features: ['Header gradient', 'Timeline', 'Modern cards'],
    defaultTheme: {
      primaryColor: '#334155',
      secondaryColor: '#64748b',
      accentColor: '#3b82f6',
      backgroundColor: '#ffffff',
      textColor: '#1e293b',
      mutedColor: '#94a3b8',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Blanco y negro, tipografía elegante, mínimo elementos',
    category: 'minimal',
    features: ['Grayscale', 'Elegant typography', 'Clean lines'],
    defaultTheme: {
      primaryColor: '#18181b',
      secondaryColor: '#3f3f46',
      accentColor: '#71717a',
      backgroundColor: '#ffffff',
      textColor: '#18181b',
      mutedColor: '#71717a',
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Colores vibrantes y elementos gráficos para creativos',
    category: 'creative',
    features: ['Vibrant colors', 'Asymmetric layout', 'Visual elements'],
    defaultTheme: {
      primaryColor: '#7c3aed',
      secondaryColor: '#a78bfa',
      accentColor: '#f59e0b',
      backgroundColor: '#faf5ff',
      textColor: '#1e1b4b',
      mutedColor: '#6b7280',
    },
  },
];

// Section Configuration
export const SECTION_CONFIG = {
  basics: { label: 'Información Personal', icon: 'User' },
  work: { label: 'Experiencia Laboral', icon: 'Briefcase' },
  education: { label: 'Educación', icon: 'GraduationCap' },
  skills: { label: 'Habilidades', icon: 'Star' },
  certificates: { label: 'Certificaciones', icon: 'Award' },
  languages: { label: 'Idiomas', icon: 'Languages' },
  projects: { label: 'Proyectos', icon: 'FolderKanban' },
  volunteer: { label: 'Voluntariado', icon: 'Heart' },
  interests: { label: 'Intereses', icon: 'Sparkles' },
  references: { label: 'Referencias', icon: 'Quote' },
};

// Page Sizes
export const PAGE_SIZES = {
  A4: { width: '210mm', height: '297mm', label: 'A4 (210 × 297 mm)' },
  Letter: { width: '8.5in', height: '11in', label: 'US Letter (8.5 × 11 in)' },
  Legal: { width: '8.5in', height: '14in', label: 'US Legal (8.5 × 14 in)' },
};

// Default CV Data
export const createDefaultCV = (id: string, templateId: string = 'classic'): CVData => {
  const now = new Date().toISOString();
  return {
    id,
    name: 'Mi Currículum',
    createdAt: now,
    updatedAt: now,
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
      templateId,
      layoutConfig: {
        pageSize: 'A4',
        orientation: 'portrait',
        margins: {
          top: '15mm',
          right: '15mm',
          bottom: '15mm',
          left: '15mm',
        },
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
        headingFont: 'Montserrat',
        bodyFont: 'Inter',
        headingSize: 14,
        bodySize: 10,
        lineHeight: 1.5,
      },
      sectionOrder: ['work', 'education', 'skills', 'certificates', 'languages'],
      visibleSections: ['work', 'education', 'skills'],
    },
  };
};
