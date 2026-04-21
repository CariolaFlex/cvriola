// CV Types based on JSON Resume Schema

export interface Location {
  address: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  image: string;
  location: Location;
  profiles: Profile[];
}

export interface Work {
  id: string;
  company: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  keywords: string[];
}

export interface Certificate {
  id: string;
  name: string;
  date: string;
  issuer: string;
  url: string;
}

export interface Language {
  id: string;
  language: string;
  fluency: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  url: string;
  startDate: string;
  endDate: string;
}

export interface Volunteer {
  id: string;
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Interest {
  id: string;
  name: string;
  keywords: string[];
}

export interface Reference {
  id: string;
  name: string;
  reference: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
}

export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  headingSize: number;
  bodySize: number;
  lineHeight: number;
}

export interface LayoutConfig {
  pageSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margins: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

export interface CVMeta {
  templateId: string;
  layoutConfig: LayoutConfig;
  themeConfig: ThemeConfig;
  typographyConfig: TypographyConfig;
  sectionOrder: string[];
  visibleSections: string[];
}

export interface CVData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  basics: Basics;
  work: Work[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  volunteer: Volunteer[];
  interests: Interest[];
  references: Reference[];
  meta: CVMeta;
}

export interface CVListItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  templateId: string;
}

// Template types
export interface TemplateProps {
  data: CVData;
  theme: ThemeConfig;
  typography: TypographyConfig;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: 'corporate' | 'creative' | 'minimal' | 'academic';
  features: string[];
  defaultTheme: ThemeConfig;
}

// Color Palettes
export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
}

// Font options
export interface FontOption {
  family: string;
  category: 'serif' | 'sans-serif' | 'display';
  googleFontsUrl: string;
}
