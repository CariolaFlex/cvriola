'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  User, Briefcase, GraduationCap, Star, Award, Languages, 
  FolderKanban, Heart, Sparkles, Quote, Plus, Trash2,
  ChevronDown, ChevronUp, GripVertical, Undo2, Redo2
} from 'lucide-react';
import type { CVData, Work, Education, Skill, Certificate, Language } from '@/types/cv';
import { useCVStore } from '@/lib/store/cvStore';

const generateId = () => Math.random().toString(36).substring(2, 15);

// Icon mapping
const SECTION_ICONS: Record<string, React.ReactNode> = {
  basics: <User className="h-4 w-4" />,
  work: <Briefcase className="h-4 w-4" />,
  education: <GraduationCap className="h-4 w-4" />,
  skills: <Star className="h-4 w-4" />,
  certificates: <Award className="h-4 w-4" />,
  languages: <Languages className="h-4 w-4" />,
  projects: <FolderKanban className="h-4 w-4" />,
  volunteer: <Heart className="h-4 w-4" />,
  interests: <Sparkles className="h-4 w-4" />,
  references: <Quote className="h-4 w-4" />,
};

const SECTION_LABELS: Record<string, string> = {
  basics: 'Información Personal',
  work: 'Experiencia Laboral',
  education: 'Educación',
  skills: 'Habilidades',
  certificates: 'Certificaciones',
  languages: 'Idiomas',
  projects: 'Proyectos',
  volunteer: 'Voluntariado',
  interests: 'Intereses',
  references: 'Referencias',
};

// Collapsible Section Component
function CollapsibleSection({ 
  id, 
  title, 
  icon, 
  children, 
  defaultOpen = false 
}: { 
  id: string; 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-xl overflow-hidden mb-3 bg-card shadow-sm"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4 bg-card">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Personal Info Form
function PersonalInfoForm() {
  const { cvData, updateBasics } = useCVStore();
  
  if (!cvData) return null;

  return (
    <CollapsibleSection id="basics" title="Información Personal" icon={SECTION_ICONS.basics} defaultOpen>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">Nombre Completo</Label>
          <Input
            id="name"
            value={cvData.basics.name}
            onChange={(e) => updateBasics({ name: e.target.value })}
            placeholder="Juan Pérez"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="label" className="text-sm font-medium">Título Profesional</Label>
          <Input
            id="label"
            value={cvData.basics.label}
            onChange={(e) => updateBasics({ label: e.target.value })}
            placeholder="Ingeniero de Software"
            className="mt-1.5"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            value={cvData.basics.email}
            onChange={(e) => updateBasics({ email: e.target.value })}
            placeholder="juan@ejemplo.com"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-sm font-medium">Teléfono</Label>
          <Input
            id="phone"
            value={cvData.basics.phone}
            onChange={(e) => updateBasics({ phone: e.target.value })}
            placeholder="+56 9 1234 5678"
            className="mt-1.5"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="url" className="text-sm font-medium">Sitio Web / LinkedIn</Label>
        <Input
          id="url"
          value={cvData.basics.url}
          onChange={(e) => updateBasics({ url: e.target.value })}
          placeholder="https://linkedin.com/in/juanperez"
          className="mt-1.5"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-sm font-medium">Ciudad</Label>
          <Input
            id="city"
            value={cvData.basics.location.city}
            onChange={(e) => updateBasics({ location: { ...cvData.basics.location, city: e.target.value } })}
            placeholder="Santiago"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="country" className="text-sm font-medium">País</Label>
          <Select 
            value={cvData.basics.location.countryCode} 
            onValueChange={(v) => updateBasics({ location: { ...cvData.basics.location, countryCode: v } })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Seleccionar país" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CL">Chile</SelectItem>
              <SelectItem value="AR">Argentina</SelectItem>
              <SelectItem value="MX">México</SelectItem>
              <SelectItem value="CO">Colombia</SelectItem>
              <SelectItem value="ES">España</SelectItem>
              <SelectItem value="US">Estados Unidos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="summary" className="text-sm font-medium">Resumen Profesional</Label>
        <Textarea
          id="summary"
          value={cvData.basics.summary}
          onChange={(e) => updateBasics({ summary: e.target.value })}
          placeholder="Describe brevemente tu perfil profesional..."
          rows={4}
          className="mt-1.5 resize-none"
        />
      </div>
    </CollapsibleSection>
  );
}

// Work Experience Form
function WorkForm() {
  const { cvData, updateWork, addWork } = useCVStore();
  
  if (!cvData) return null;

  const addNewWork = () => {
    const newWork: Work = {
      id: generateId(),
      company: '',
      position: '',
      url: '',
      startDate: '',
      endDate: '',
      summary: '',
      highlights: [],
      location: '',
    };
    addWork(newWork);
  };

  const updateWorkItem = (id: string, updates: Partial<Work>) => {
    const updated = cvData.work.map(w => w.id === id ? { ...w, ...updates } : w);
    updateWork(updated);
  };

  const removeWork = (id: string) => {
    updateWork(cvData.work.filter(w => w.id !== id));
  };

  return (
    <CollapsibleSection id="work" title="Experiencia Laboral" icon={SECTION_ICONS.work}>
      <AnimatePresence mode="popLayout">
        {cvData.work.map((job, idx) => (
          <motion.div
            key={job.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border rounded-xl p-4 space-y-3 bg-muted/30"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Trabajo {idx + 1}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeWork(job.id)}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium">Empresa</Label>
                <Input
                  value={job.company}
                  onChange={(e) => updateWorkItem(job.id, { company: e.target.value })}
                  placeholder="Nombre de la empresa"
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Cargo</Label>
                <Input
                  value={job.position}
                  onChange={(e) => updateWorkItem(job.id, { position: e.target.value })}
                  placeholder="Tu cargo"
                  className="mt-1 h-9"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium">Fecha Inicio</Label>
                <Input
                  type="month"
                  value={job.startDate}
                  onChange={(e) => updateWorkItem(job.id, { startDate: e.target.value })}
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Fecha Término</Label>
                <Input
                  type="month"
                  value={job.endDate}
                  onChange={(e) => updateWorkItem(job.id, { endDate: e.target.value })}
                  placeholder="Dejar vacío si es actual"
                  className="mt-1 h-9"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium">Ubicación</Label>
              <Input
                value={job.location}
                onChange={(e) => updateWorkItem(job.id, { location: e.target.value })}
                placeholder="Ciudad, País"
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Descripción</Label>
              <Textarea
                value={job.summary}
                onChange={(e) => updateWorkItem(job.id, { summary: e.target.value })}
                placeholder="Describe tus responsabilidades..."
                rows={3}
                className="mt-1 resize-none"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={addNewWork} className="w-full h-9 border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Agregar Trabajo
      </Button>
    </CollapsibleSection>
  );
}

// Education Form
function EducationForm() {
  const { cvData, updateEducation, addEducation } = useCVStore();
  
  if (!cvData) return null;

  const addNewEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      institution: '',
      url: '',
      area: '',
      studyType: '',
      startDate: '',
      endDate: '',
      score: '',
    };
    addEducation(newEdu);
  };

  const updateEduItem = (id: string, updates: Partial<Education>) => {
    const updated = cvData.education.map(e => e.id === id ? { ...e, ...updates } : e);
    updateEducation(updated);
  };

  const removeEducation = (id: string) => {
    updateEducation(cvData.education.filter(e => e.id !== id));
  };

  return (
    <CollapsibleSection id="education" title="Educación" icon={SECTION_ICONS.education}>
      <AnimatePresence mode="popLayout">
        {cvData.education.map((edu, idx) => (
          <motion.div
            key={edu.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border rounded-xl p-4 space-y-3 bg-muted/30"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Educación {idx + 1}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeEducation(edu.id)}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium">Institución</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEduItem(edu.id, { institution: e.target.value })}
                  placeholder="Universidad / Instituto"
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Título / Carrera</Label>
                <Input
                  value={edu.area}
                  onChange={(e) => updateEduItem(edu.id, { area: e.target.value })}
                  placeholder="Ingeniería en..."
                  className="mt-1 h-9"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium">Tipo</Label>
                <Select value={edu.studyType} onValueChange={(v) => updateEduItem(edu.id, { studyType: v })}>
                  <SelectTrigger className="mt-1 h-9">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Universidad">Universidad</SelectItem>
                    <SelectItem value="Instituto">Instituto</SelectItem>
                    <SelectItem value="Bootcamp">Bootcamp</SelectItem>
                    <SelectItem value="Certificación">Certificación</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium">Fecha Término</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEduItem(edu.id, { endDate: e.target.value })}
                  className="mt-1 h-9"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={addNewEducation} className="w-full h-9 border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Agregar Educación
      </Button>
    </CollapsibleSection>
  );
}

// Skills Form
function SkillsForm() {
  const { cvData, updateSkills, addSkill } = useCVStore();
  
  if (!cvData) return null;

  const addNewSkill = () => {
    const newSkill: Skill = {
      id: generateId(),
      name: '',
      level: 80,
      keywords: [],
    };
    addSkill(newSkill);
  };

  const updateSkillItem = (id: string, updates: Partial<Skill>) => {
    const updated = cvData.skills.map(s => s.id === id ? { ...s, ...updates } : s);
    updateSkills(updated);
  };

  const removeSkill = (id: string) => {
    updateSkills(cvData.skills.filter(s => s.id !== id));
  };

  return (
    <CollapsibleSection id="skills" title="Habilidades" icon={SECTION_ICONS.skills}>
      <AnimatePresence mode="popLayout">
        {cvData.skills.map((skill, idx) => (
          <motion.div
            key={skill.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border rounded-xl p-4 space-y-3 bg-muted/30"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Habilidad {idx + 1}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSkill(skill.id)}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <Label className="text-xs font-medium">Nombre</Label>
              <Input
                value={skill.name}
                onChange={(e) => updateSkillItem(skill.id, { name: e.target.value })}
                placeholder="JavaScript, React, etc."
                className="mt-1 h-9"
              />
            </div>
            <div>
              <Label className="text-xs font-medium">Nivel: {skill.level}%</Label>
              <Slider
                value={[skill.level]}
                onValueChange={([v]) => updateSkillItem(skill.id, { level: v })}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={addNewSkill} className="w-full h-9 border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Agregar Habilidad
      </Button>
    </CollapsibleSection>
  );
}

// Languages Form
function LanguagesForm() {
  const { cvData, updateLanguages, addLanguage } = useCVStore();
  
  if (!cvData) return null;

  const addNewLanguage = () => {
    const newLang: Language = {
      id: generateId(),
      language: '',
      fluency: 'Intermediate',
    };
    addLanguage(newLang);
  };

  const updateLangItem = (id: string, updates: Partial<Language>) => {
    const updated = cvData.languages.map(l => l.id === id ? { ...l, ...updates } : l);
    updateLanguages(updated);
  };

  const removeLanguage = (id: string) => {
    updateLanguages(cvData.languages.filter(l => l.id !== id));
  };

  return (
    <CollapsibleSection id="languages" title="Idiomas" icon={SECTION_ICONS.languages}>
      <AnimatePresence mode="popLayout">
        {cvData.languages.map((lang, idx) => (
          <motion.div
            key={lang.id}
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex gap-3 items-end"
          >
            <div className="flex-1">
              <Label className="text-xs font-medium">{idx === 0 ? 'Idioma' : ''}</Label>
              <Input
                value={lang.language}
                onChange={(e) => updateLangItem(lang.id, { language: e.target.value })}
                placeholder="Inglés, Español, etc."
                className="mt-1 h-9"
              />
            </div>
            <div className="w-36">
              <Label className="text-xs font-medium">{idx === 0 ? 'Nivel' : ''}</Label>
              <Select value={lang.fluency} onValueChange={(v) => updateLangItem(lang.id, { fluency: v })}>
                <SelectTrigger className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Native">Nativo</SelectItem>
                  <SelectItem value="Fluent">Fluido</SelectItem>
                  <SelectItem value="Intermediate">Intermedio</SelectItem>
                  <SelectItem value="Basic">Básico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => removeLanguage(lang.id)}
              className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={addNewLanguage} className="w-full h-9 border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Agregar Idioma
      </Button>
    </CollapsibleSection>
  );
}

// Certificates Form
function CertificatesForm() {
  const { cvData, updateCertificates, addCertificate } = useCVStore();
  
  if (!cvData) return null;

  const addNewCert = () => {
    const newCert: Certificate = {
      id: generateId(),
      name: '',
      date: '',
      issuer: '',
      url: '',
    };
    addCertificate(newCert);
  };

  const updateCertItem = (id: string, updates: Partial<Certificate>) => {
    const updated = cvData.certificates.map(c => c.id === id ? { ...c, ...updates } : c);
    updateCertificates(updated);
  };

  const removeCert = (id: string) => {
    updateCertificates(cvData.certificates.filter(c => c.id !== id));
  };

  return (
    <CollapsibleSection id="certificates" title="Certificaciones" icon={SECTION_ICONS.certificates}>
      <AnimatePresence mode="popLayout">
        {cvData.certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border rounded-xl p-4 space-y-3 bg-muted/30"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Certificación {idx + 1}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeCert(cert.id)}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium">Nombre</Label>
                <Input
                  value={cert.name}
                  onChange={(e) => updateCertItem(cert.id, { name: e.target.value })}
                  placeholder="AWS Certified..."
                  className="mt-1 h-9"
                />
              </div>
              <div>
                <Label className="text-xs font-medium">Institución</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => updateCertItem(cert.id, { issuer: e.target.value })}
                  placeholder="Amazon, Google, etc."
                  className="mt-1 h-9"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium">Fecha</Label>
              <Input
                type="month"
                value={cert.date}
                onChange={(e) => updateCertItem(cert.id, { date: e.target.value })}
                className="mt-1 h-9"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outline" onClick={addNewCert} className="w-full h-9 border-dashed">
        <Plus className="h-4 w-4 mr-2" /> Agregar Certificación
      </Button>
    </CollapsibleSection>
  );
}

// Main Editor Component
export function CVEditor() {
  const { undo, redo, canUndo, canRedo } = useCVStore();

  return (
    <div className="h-full overflow-y-auto p-4 bg-muted/30">
      {/* Undo/Redo buttons */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 mb-4"
      >
        <Button 
          variant="outline" 
          size="sm" 
          onClick={undo} 
          disabled={!canUndo()}
          title="Deshacer (Ctrl+Z)"
          className="h-8"
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={redo} 
          disabled={!canRedo()}
          title="Rehacer (Ctrl+Y)"
          className="h-8"
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </motion.div>
      
      <PersonalInfoForm />
      <WorkForm />
      <EducationForm />
      <SkillsForm />
      <LanguagesForm />
      <CertificatesForm />
    </div>
  );
}
