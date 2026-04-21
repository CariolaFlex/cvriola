'use client';

import React from 'react';
import type { CVData, ThemeConfig, TypographyConfig } from '@/types/cv';

// Classic Template - Single column, clean corporate design
export function ClassicTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="cv-template classic"
      style={{
        fontFamily: `'${typography.bodyFont}', sans-serif`,
        fontSize: `${typography.bodySize}pt`,
        lineHeight: typography.lineHeight,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        padding: '15mm',
        width: '210mm',
        minHeight: '297mm',
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '20pt', borderBottom: `2px solid ${theme.primaryColor}`, paddingBottom: '15pt' }}>
        <h1 style={{ 
          fontFamily: `'${typography.headingFont}', serif`,
          fontSize: `${typography.headingSize + 10}pt`,
          color: theme.primaryColor,
          margin: 0,
          fontWeight: 700,
        }}>
          {data.basics.name || 'Tu Nombre'}
        </h1>
        {data.basics.label && (
          <p style={{ fontSize: `${typography.bodySize + 2}pt`, color: theme.mutedColor, marginTop: '5pt' }}>
            {data.basics.label}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15pt', marginTop: '10pt', flexWrap: 'wrap' }}>
          {data.basics.email && <span style={{ fontSize: `${typography.bodySize - 1}pt` }}>✉ {data.basics.email}</span>}
          {data.basics.phone && <span style={{ fontSize: `${typography.bodySize - 1}pt` }}>📞 {data.basics.phone}</span>}
          {data.basics.location.city && <span style={{ fontSize: `${typography.bodySize - 1}pt` }}>📍 {data.basics.location.city}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.basics.summary && (
        <section style={{ marginBottom: '15pt' }}>
          <h2 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize}pt`,
            color: theme.primaryColor,
            borderBottom: `1px solid ${theme.secondaryColor}`,
            paddingBottom: '5pt',
            marginBottom: '10pt',
          }}>
            Perfil Profesional
          </h2>
          <p style={{ margin: 0, textAlign: 'justify' }}>{data.basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.work.length > 0 && (
        <section style={{ marginBottom: '15pt' }}>
          <h2 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize}pt`,
            color: theme.primaryColor,
            borderBottom: `1px solid ${theme.secondaryColor}`,
            paddingBottom: '5pt',
            marginBottom: '10pt',
          }}>
            Experiencia Laboral
          </h2>
          {data.work.map((job, idx) => (
            <div key={job.id || idx} style={{ marginBottom: '12pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontSize: `${typography.bodySize + 1}pt` }}>{job.position}</h3>
                <span style={{ fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                  {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Presente'}
                </span>
              </div>
              <p style={{ margin: '2pt 0', color: theme.secondaryColor, fontWeight: 500 }}>
                {job.company}{job.location ? ` • ${job.location}` : ''}
              </p>
              {job.summary && <p style={{ margin: '5pt 0', textAlign: 'justify' }}>{job.summary}</p>}
              {job.highlights.length > 0 && (
                <ul style={{ margin: '5pt 0', paddingLeft: '15pt' }}>
                  {job.highlights.map((h, i) => <li key={i} style={{ marginBottom: '3pt' }}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section style={{ marginBottom: '15pt' }}>
          <h2 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize}pt`,
            color: theme.primaryColor,
            borderBottom: `1px solid ${theme.secondaryColor}`,
            paddingBottom: '5pt',
            marginBottom: '10pt',
          }}>
            Educación
          </h2>
          {data.education.map((edu, idx) => (
            <div key={edu.id || idx} style={{ marginBottom: '10pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontWeight: 600 }}>{edu.area}</h3>
                <span style={{ fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Presente'}
                </span>
              </div>
              <p style={{ margin: '2pt 0', color: theme.secondaryColor }}>
                {edu.institution} • {edu.studyType}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section style={{ marginBottom: '15pt' }}>
          <h2 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize}pt`,
            color: theme.primaryColor,
            borderBottom: `1px solid ${theme.secondaryColor}`,
            paddingBottom: '5pt',
            marginBottom: '10pt',
          }}>
            Habilidades
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8pt' }}>
            {data.skills.map((skill, idx) => (
              <span key={skill.id || idx} style={{
                padding: '4pt 10pt',
                backgroundColor: theme.secondaryColor + '20',
                borderRadius: '4pt',
                fontSize: `${typography.bodySize - 1}pt`,
              }}>
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section style={{ marginBottom: '15pt' }}>
          <h2 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize}pt`,
            color: theme.primaryColor,
            borderBottom: `1px solid ${theme.secondaryColor}`,
            paddingBottom: '5pt',
            marginBottom: '10pt',
          }}>
            Idiomas
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15pt' }}>
            {data.languages.map((lang, idx) => (
              <span key={lang.id || idx}>
                <strong>{lang.language}</strong>: {lang.fluency}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certificates */}
      {data.certificates.length > 0 && (
        <section style={{ marginBottom: '15pt' }}>
          <h2 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize}pt`,
            color: theme.primaryColor,
            borderBottom: `1px solid ${theme.secondaryColor}`,
            paddingBottom: '5pt',
            marginBottom: '10pt',
          }}>
            Certificaciones
          </h2>
          {data.certificates.map((cert, idx) => (
            <div key={cert.id || idx} style={{ marginBottom: '8pt' }}>
              <strong>{cert.name}</strong> - {cert.issuer} ({formatDate(cert.date)})
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

// Sidebar Template - Two columns with dark sidebar
export function SidebarTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="cv-template sidebar"
      style={{
        fontFamily: `'${typography.bodyFont}', sans-serif`,
        fontSize: `${typography.bodySize}pt`,
        lineHeight: typography.lineHeight,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        width: '210mm',
        minHeight: '297mm',
        display: 'flex',
      }}
    >
      {/* Sidebar */}
      <aside style={{
        width: '68mm',
        backgroundColor: theme.primaryColor,
        color: '#fff',
        padding: '15mm 12mm',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Photo */}
        {data.basics.image && (
          <div style={{ textAlign: 'center', marginBottom: '15pt' }}>
            <img
              src={data.basics.image}
              alt="Foto de perfil"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid ' + theme.secondaryColor,
              }}
            />
          </div>
        )}

        {/* Name */}
        <div style={{ textAlign: 'center', marginBottom: '20pt' }}>
          <h1 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize + 6}pt`,
            margin: 0,
            fontWeight: 700,
          }}>
            {data.basics.name || 'Tu Nombre'}
          </h1>
          {data.basics.label && (
            <p style={{ fontSize: `${typography.bodySize}pt`, opacity: 0.9, marginTop: '5pt' }}>
              {data.basics.label}
            </p>
          )}
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '20pt' }}>
          <h2 style={{
            fontFamily: `'${typography.headingFont}', serif`,
            fontSize: `${typography.headingSize - 2}pt`,
            borderBottom: '2px solid ' + theme.secondaryColor,
            paddingBottom: '5pt',
            marginBottom: '10pt',
            textTransform: 'uppercase',
            letterSpacing: '1pt',
          }}>
            Contacto
          </h2>
          <div style={{ fontSize: `${typography.bodySize - 1}pt` }}>
            {data.basics.email && <p style={{ margin: '5pt 0' }}>✉ {data.basics.email}</p>}
            {data.basics.phone && <p style={{ margin: '5pt 0' }}>📞 {data.basics.phone}</p>}
            {data.basics.location.city && (
              <p style={{ margin: '5pt 0' }}>📍 {data.basics.location.city}, {data.basics.location.countryCode}</p>
            )}
            {data.basics.url && <p style={{ margin: '5pt 0' }}>🔗 {data.basics.url}</p>}
          </div>
        </div>

        {/* Skills with bars */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize - 2}pt`,
              borderBottom: '2px solid ' + theme.secondaryColor,
              paddingBottom: '5pt',
              marginBottom: '10pt',
              textTransform: 'uppercase',
              letterSpacing: '1pt',
            }}>
              Habilidades
            </h2>
            {data.skills.map((skill, idx) => (
              <div key={skill.id || idx} style={{ marginBottom: '10pt' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3pt', fontSize: `${typography.bodySize - 1}pt` }}>
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
                  <div style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    backgroundColor: theme.secondaryColor,
                    borderRadius: '3px',
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize - 2}pt`,
              borderBottom: '2px solid ' + theme.secondaryColor,
              paddingBottom: '5pt',
              marginBottom: '10pt',
              textTransform: 'uppercase',
              letterSpacing: '1pt',
            }}>
              Idiomas
            </h2>
            {data.languages.map((lang, idx) => (
              <div key={lang.id || idx} style={{ marginBottom: '5pt', fontSize: `${typography.bodySize - 1}pt` }}>
                <strong>{lang.language}</strong>: {lang.fluency}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '15mm' }}>
        {/* Summary */}
        {data.basics.summary && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              borderBottom: `2px solid ${theme.primaryColor}`,
              paddingBottom: '5pt',
              marginBottom: '10pt',
            }}>
              Perfil Profesional
            </h2>
            <p style={{ margin: 0, textAlign: 'justify' }}>{data.basics.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.work.length > 0 && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              borderBottom: `2px solid ${theme.primaryColor}`,
              paddingBottom: '5pt',
              marginBottom: '10pt',
            }}>
              Experiencia Laboral
            </h2>
            {data.work.map((job, idx) => (
              <div key={job.id || idx} style={{ marginBottom: '15pt', paddingLeft: '10pt', borderLeft: `3px solid ${theme.secondaryColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontWeight: 600, fontSize: `${typography.bodySize + 1}pt` }}>{job.position}</h3>
                  <span style={{ fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                    {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Presente'}
                  </span>
                </div>
                <p style={{ margin: '2pt 0', color: theme.secondaryColor, fontWeight: 500 }}>
                  {job.company}{job.location ? ` • ${job.location}` : ''}
                </p>
                {job.summary && <p style={{ margin: '5pt 0', textAlign: 'justify' }}>{job.summary}</p>}
                {job.highlights.length > 0 && (
                  <ul style={{ margin: '5pt 0', paddingLeft: '15pt' }}>
                    {job.highlights.map((h, i) => <li key={i} style={{ marginBottom: '3pt' }}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              borderBottom: `2px solid ${theme.primaryColor}`,
              paddingBottom: '5pt',
              marginBottom: '10pt',
            }}>
              Educación
            </h2>
            {data.education.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: '12pt', paddingLeft: '10pt', borderLeft: `3px solid ${theme.secondaryColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontWeight: 600 }}>{edu.area}</h3>
                  <span style={{ fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Presente'}
                  </span>
                </div>
                <p style={{ margin: '2pt 0', color: theme.secondaryColor }}>
                  {edu.institution} • {edu.studyType}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Certificates */}
        {data.certificates.length > 0 && (
          <section>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              borderBottom: `2px solid ${theme.primaryColor}`,
              paddingBottom: '5pt',
              marginBottom: '10pt',
            }}>
              Certificaciones
            </h2>
            {data.certificates.map((cert, idx) => (
              <div key={cert.id || idx} style={{ marginBottom: '8pt', paddingLeft: '10pt', borderLeft: `3px solid ${theme.secondaryColor}` }}>
                <strong>{cert.name}</strong> - {cert.issuer} ({formatDate(cert.date)})
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

// Modern Template - Gradient header, cards
export function ModernTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="cv-template modern"
      style={{
        fontFamily: `'${typography.bodyFont}', sans-serif`,
        fontSize: `${typography.bodySize}pt`,
        lineHeight: typography.lineHeight,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        width: '210mm',
        minHeight: '297mm',
      }}
    >
      {/* Gradient Header */}
      <header style={{
        background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 100%)`,
        color: '#fff',
        padding: '25mm 20mm 15mm',
        position: 'relative',
      }}>
        <h1 style={{
          fontFamily: `'${typography.headingFont}', sans-serif`,
          fontSize: `${typography.headingSize + 14}pt`,
          margin: 0,
          fontWeight: 700,
        }}>
          {data.basics.name || 'Tu Nombre'}
        </h1>
        {data.basics.label && (
          <p style={{ fontSize: `${typography.bodySize + 3}pt`, opacity: 0.9, marginTop: '5pt' }}>
            {data.basics.label}
          </p>
        )}
        <div style={{ display: 'flex', gap: '20pt', marginTop: '15pt', fontSize: `${typography.bodySize - 1}pt` }}>
          {data.basics.email && <span>✉ {data.basics.email}</span>}
          {data.basics.phone && <span>📞 {data.basics.phone}</span>}
          {data.basics.location.city && <span>📍 {data.basics.location.city}</span>}
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '15mm 20mm' }}>
        {/* Summary */}
        {data.basics.summary && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              marginBottom: '10pt',
              display: 'flex',
              alignItems: 'center',
              gap: '10pt',
            }}>
              <span style={{ width: '4px', height: '20px', backgroundColor: theme.accentColor, display: 'inline-block' }} />
              Perfil Profesional
            </h2>
            <p style={{ margin: 0, textAlign: 'justify' }}>{data.basics.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.work.length > 0 && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              marginBottom: '10pt',
              display: 'flex',
              alignItems: 'center',
              gap: '10pt',
            }}>
              <span style={{ width: '4px', height: '20px', backgroundColor: theme.accentColor, display: 'inline-block' }} />
              Experiencia Laboral
            </h2>
            {data.work.map((job, idx) => (
              <div key={job.id || idx} style={{ marginBottom: '15pt', position: 'relative', paddingLeft: '20pt' }}>
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: theme.accentColor,
                }} />
                <div style={{ borderLeft: `2px solid ${theme.secondaryColor}40`, paddingLeft: '15pt', marginLeft: '-15pt' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ margin: 0, fontWeight: 600 }}>{job.position}</h3>
                    <span style={{ fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                      {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Presente'}
                    </span>
                  </div>
                  <p style={{ margin: '2pt 0', color: theme.accentColor, fontWeight: 500 }}>
                    {job.company}{job.location ? ` • ${job.location}` : ''}
                  </p>
                  {job.summary && <p style={{ margin: '5pt 0', textAlign: 'justify' }}>{job.summary}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Two columns for Education and Skills */}
        <div style={{ display: 'flex', gap: '20pt' }}>
          {/* Education */}
          {data.education.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: `'${typography.headingFont}', sans-serif`,
                fontSize: `${typography.headingSize}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
                display: 'flex',
                alignItems: 'center',
                gap: '10pt',
              }}>
                <span style={{ width: '4px', height: '20px', backgroundColor: theme.accentColor, display: 'inline-block' }} />
                Educación
              </h2>
              {data.education.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: '10pt' }}>
                  <h3 style={{ margin: 0, fontWeight: 600, fontSize: `${typography.bodySize}pt` }}>{edu.area}</h3>
                  <p style={{ margin: '2pt 0', fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                    {edu.institution} • {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Presente'}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: `'${typography.headingFont}', sans-serif`,
                fontSize: `${typography.headingSize}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
                display: 'flex',
                alignItems: 'center',
                gap: '10pt',
              }}>
                <span style={{ width: '4px', height: '20px', backgroundColor: theme.accentColor, display: 'inline-block' }} />
                Habilidades
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6pt' }}>
                {data.skills.map((skill, idx) => (
                  <span key={skill.id || idx} style={{
                    padding: '4pt 10pt',
                    backgroundColor: theme.primaryColor,
                    color: '#fff',
                    borderRadius: '15pt',
                    fontSize: `${typography.bodySize - 1}pt`,
                  }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

// Minimal Template - Grayscale, elegant
export function MinimalTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="cv-template minimal"
      style={{
        fontFamily: `'${typography.headingFont}', serif`,
        fontSize: `${typography.bodySize}pt`,
        lineHeight: typography.lineHeight,
        color: '#18181b',
        backgroundColor: '#fff',
        padding: '20mm',
        width: '210mm',
        minHeight: '297mm',
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '25pt', paddingBottom: '20pt', borderBottom: '1px solid #e5e5e5' }}>
        <h1 style={{
          fontSize: `${typography.headingSize + 12}pt`,
          margin: 0,
          fontWeight: 400,
          letterSpacing: '2pt',
          textTransform: 'uppercase',
        }}>
          {data.basics.name || 'Tu Nombre'}
        </h1>
        {data.basics.label && (
          <p style={{ fontSize: `${typography.bodySize + 1}pt`, color: '#71717a', marginTop: '8pt', letterSpacing: '1pt' }}>
            {data.basics.label}
          </p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20pt', marginTop: '12pt', fontSize: `${typography.bodySize - 1}pt`, color: '#71717a' }}>
          {data.basics.email && <span>{data.basics.email}</span>}
          {data.basics.phone && <span>{data.basics.phone}</span>}
          {data.basics.location.city && <span>{data.basics.location.city}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.basics.summary && (
        <section style={{ marginBottom: '20pt' }}>
          <p style={{ margin: 0, textAlign: 'center', fontStyle: 'italic', color: '#3f3f46' }}>{data.basics.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.work.length > 0 && (
        <section style={{ marginBottom: '20pt' }}>
          <h2 style={{
            fontSize: `${typography.headingSize - 1}pt`,
            marginBottom: '12pt',
            letterSpacing: '2pt',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}>
            Experiencia
          </h2>
          {data.work.map((job, idx) => (
            <div key={job.id || idx} style={{ marginBottom: '15pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontFamily: `'${typography.bodyFont}', sans-serif` }}>{job.position}</h3>
                <span style={{ fontSize: `${typography.bodySize - 1}pt`, color: '#71717a' }}>
                  {formatDate(job.startDate)} — {job.endDate ? formatDate(job.endDate) : 'Presente'}
                </span>
              </div>
              <p style={{ margin: '3pt 0', color: '#71717a', fontFamily: `'${typography.bodyFont}', sans-serif` }}>
                {job.company}
              </p>
              {job.summary && <p style={{ margin: '5pt 0', fontFamily: `'${typography.bodyFont}', sans-serif` }}>{job.summary}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section style={{ marginBottom: '20pt' }}>
          <h2 style={{
            fontSize: `${typography.headingSize - 1}pt`,
            marginBottom: '12pt',
            letterSpacing: '2pt',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}>
            Educación
          </h2>
          {data.education.map((edu, idx) => (
            <div key={edu.id || idx} style={{ marginBottom: '10pt' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontWeight: 600, fontFamily: `'${typography.bodyFont}', sans-serif` }}>{edu.area}</h3>
                <span style={{ fontSize: `${typography.bodySize - 1}pt`, color: '#71717a' }}>
                  {formatDate(edu.endDate || '')}
                </span>
              </div>
              <p style={{ margin: '3pt 0', color: '#71717a', fontFamily: `'${typography.bodyFont}', sans-serif` }}>
                {edu.institution}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 style={{
            fontSize: `${typography.headingSize - 1}pt`,
            marginBottom: '12pt',
            letterSpacing: '2pt',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}>
            Habilidades
          </h2>
          <p style={{ fontFamily: `'${typography.bodyFont}', sans-serif`, color: '#3f3f46' }}>
            {data.skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
}

// Creative Template - Vibrant colors, asymmetric
export function CreativeTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="cv-template creative"
      style={{
        fontFamily: `'${typography.bodyFont}', sans-serif`,
        fontSize: `${typography.bodySize}pt`,
        lineHeight: typography.lineHeight,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        width: '210mm',
        minHeight: '297mm',
      }}
    >
      {/* Colorful Header */}
      <header style={{
        background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 50%, ${theme.accentColor} 100%)`,
        color: '#fff',
        padding: '30mm 25mm 20mm',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
      }}>
        <h1 style={{
          fontFamily: `'${typography.headingFont}', sans-serif`,
          fontSize: `${typography.headingSize + 16}pt`,
          margin: 0,
          fontWeight: 700,
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        }}>
          {data.basics.name || 'Tu Nombre'}
        </h1>
        {data.basics.label && (
          <p style={{ fontSize: `${typography.bodySize + 4}pt`, opacity: 0.95, marginTop: '8pt', fontWeight: 300 }}>
            {data.basics.label}
          </p>
        )}
      </header>

      {/* Contact Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '25pt',
        padding: '10mm 20mm',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '15pt',
      }}>
        {data.basics.email && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5pt', color: theme.primaryColor }}>
            <span style={{ fontSize: `${typography.bodySize + 2}pt` }}>✉</span> {data.basics.email}
          </span>
        )}
        {data.basics.phone && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5pt', color: theme.primaryColor }}>
            <span style={{ fontSize: `${typography.bodySize + 2}pt` }}>📞</span> {data.basics.phone}
          </span>
        )}
        {data.basics.location.city && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5pt', color: theme.primaryColor }}>
            <span style={{ fontSize: `${typography.bodySize + 2}pt` }}>📍</span> {data.basics.location.city}
          </span>
        )}
      </div>

      {/* Content */}
      <main style={{ padding: '5mm 25mm 25mm' }}>
        {/* Summary */}
        {data.basics.summary && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              marginBottom: '10pt',
            }}>
              ✨ Sobre mí
            </h2>
            <p style={{ margin: 0, textAlign: 'justify' }}>{data.basics.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {data.work.length > 0 && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              marginBottom: '12pt',
            }}>
              💼 Experiencia
            </h2>
            {data.work.map((job, idx) => (
              <div key={job.id || idx} style={{
                marginBottom: '15pt',
                padding: '12pt',
                backgroundColor: '#fff',
                borderRadius: '8pt',
                borderLeft: `4px solid ${theme.accentColor}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontWeight: 600, color: theme.primaryColor }}>{job.position}</h3>
                  <span style={{
                    fontSize: `${typography.bodySize - 1}pt`,
                    padding: '2pt 8pt',
                    backgroundColor: theme.accentColor + '20',
                    borderRadius: '10pt',
                    color: theme.accentColor,
                  }}>
                    {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Ahora'}
                  </span>
                </div>
                <p style={{ margin: '5pt 0', color: theme.secondaryColor, fontWeight: 500 }}>
                  {job.company}
                </p>
                {job.summary && <p style={{ margin: '5pt 0' }}>{job.summary}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education & Skills Row */}
        <div style={{ display: 'flex', gap: '20pt' }}>
          {/* Education */}
          {data.education.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: `'${typography.headingFont}', sans-serif`,
                fontSize: `${typography.headingSize}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
              }}>
                🎓 Educación
              </h2>
              {data.education.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: '10pt' }}>
                  <h3 style={{ margin: 0, fontWeight: 600 }}>{edu.area}</h3>
                  <p style={{ margin: '3pt 0', fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                    {edu.institution} • {edu.studyType}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section style={{ flex: 1 }}>
              <h2 style={{
                fontFamily: `'${typography.headingFont}', sans-serif`,
                fontSize: `${typography.headingSize}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
              }}>
                ⭐ Habilidades
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6pt' }}>
                {data.skills.map((skill, idx) => (
                  <span key={skill.id || idx} style={{
                    padding: '5pt 12pt',
                    background: `linear-gradient(135deg, ${theme.primaryColor}30, ${theme.secondaryColor}30)`,
                    borderRadius: '20pt',
                    fontSize: `${typography.bodySize - 1}pt`,
                    border: `1px solid ${theme.secondaryColor}50`,
                  }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

// Export template map
export const TEMPLATE_MAP: Record<string, React.ComponentType<{ data: CVData; theme: ThemeConfig; typography: TypographyConfig }>> = {
  classic: ClassicTemplate,
  sidebar: SidebarTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
};
