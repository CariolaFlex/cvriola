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
        display: 'flex',
        alignItems: 'center',
        gap: '20pt',
      }}>
        {data.basics.image && (
          <img
            src={data.basics.image}
            alt="Foto"
            style={{
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid rgba(255,255,255,0.3)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ flex: 1 }}>
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
        <div style={{ display: 'flex', gap: '20pt', marginTop: '15pt', fontSize: `${typography.bodySize - 1}pt`, flexWrap: 'wrap' }}>
          {data.basics.email && <span>✉ {data.basics.email}</span>}
          {data.basics.phone && <span>📞 {data.basics.phone}</span>}
          {data.basics.location.city && <span>📍 {data.basics.location.city}</span>}
        </div>
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

// Executive Template - Luxurious with photo and elegant typography
export function ExecutiveTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="cv-template executive"
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
      {/* Elegant header with photo on the side */}
      <header style={{
        position: 'relative',
        padding: '20mm 20mm 15mm',
        borderBottom: `3px double ${theme.primaryColor}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20pt' }}>
          {data.basics.image && (
            <img
              src={data.basics.image}
              alt="Foto"
              style={{
                width: '130px',
                height: '130px',
                objectFit: 'cover',
                border: `3pt solid ${theme.primaryColor}`,
                boxShadow: `0 0 0 6pt ${theme.backgroundColor}, 0 0 0 8pt ${theme.primaryColor}30`,
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: `${typography.bodySize - 1}pt`,
              letterSpacing: '4pt',
              color: theme.accentColor,
              textTransform: 'uppercase',
              marginBottom: '5pt',
            }}>
              Curriculum Vitae
            </div>
            <h1 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize + 18}pt`,
              color: theme.primaryColor,
              margin: 0,
              fontWeight: 700,
              letterSpacing: '-0.5pt',
              lineHeight: 1.1,
            }}>
              {data.basics.name || 'Tu Nombre'}
            </h1>
            {data.basics.label && (
              <p style={{
                fontSize: `${typography.bodySize + 3}pt`,
                color: theme.secondaryColor,
                marginTop: '6pt',
                fontStyle: 'italic',
                fontFamily: `'${typography.headingFont}', serif`,
              }}>
                {data.basics.label}
              </p>
            )}
            <div style={{
              display: 'flex',
              gap: '15pt',
              marginTop: '12pt',
              flexWrap: 'wrap',
              fontSize: `${typography.bodySize - 1}pt`,
              color: theme.mutedColor,
            }}>
              {data.basics.email && <span>✉ {data.basics.email}</span>}
              {data.basics.phone && <span>📞 {data.basics.phone}</span>}
              {data.basics.location.city && <span>📍 {data.basics.location.city}</span>}
              {data.basics.url && <span>🔗 {data.basics.url}</span>}
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: '15mm 20mm 20mm' }}>
        {data.basics.summary && (
          <section style={{ marginBottom: '15pt', padding: '10pt 15pt', borderLeft: `4pt solid ${theme.accentColor}`, backgroundColor: theme.accentColor + '08' }}>
            <p style={{ margin: 0, fontStyle: 'italic', fontSize: `${typography.bodySize + 1}pt`, lineHeight: 1.6 }}>
              "{data.basics.summary}"
            </p>
          </section>
        )}

        {data.work.length > 0 && (
          <section style={{ marginBottom: '18pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize + 2}pt`,
              color: theme.primaryColor,
              marginBottom: '12pt',
              textTransform: 'uppercase',
              letterSpacing: '3pt',
              fontWeight: 700,
              borderBottom: `1pt solid ${theme.primaryColor}30`,
              paddingBottom: '5pt',
            }}>
              Trayectoria Profesional
            </h2>
            {data.work.map((job, idx) => (
              <div key={job.id || idx} style={{ marginBottom: '15pt', display: 'grid', gridTemplateColumns: '90pt 1fr', gap: '15pt' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    color: theme.accentColor,
                    fontSize: `${typography.bodySize}pt`,
                    fontWeight: 600,
                    fontFamily: `'${typography.headingFont}', serif`,
                  }}>
                    {formatDate(job.startDate)}
                  </div>
                  <div style={{
                    color: theme.mutedColor,
                    fontSize: `${typography.bodySize - 1}pt`,
                  }}>
                    {job.endDate ? formatDate(job.endDate) : 'Presente'}
                  </div>
                </div>
                <div style={{ borderLeft: `2pt solid ${theme.primaryColor}`, paddingLeft: '15pt' }}>
                  <h3 style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: `${typography.bodySize + 2}pt`,
                    color: theme.primaryColor,
                    fontFamily: `'${typography.headingFont}', serif`,
                  }}>
                    {job.position}
                  </h3>
                  <p style={{ margin: '3pt 0', color: theme.secondaryColor, fontWeight: 600, fontStyle: 'italic' }}>
                    {job.company}{job.location ? ` · ${job.location}` : ''}
                  </p>
                  {job.summary && <p style={{ margin: '6pt 0', textAlign: 'justify' }}>{job.summary}</p>}
                  {job.highlights.length > 0 && (
                    <ul style={{ margin: '5pt 0', paddingLeft: '18pt' }}>
                      {job.highlights.map((h, i) => <li key={i} style={{ marginBottom: '3pt' }}>{h}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25pt' }}>
          {data.education.length > 0 && (
            <section>
              <h2 style={{
                fontFamily: `'${typography.headingFont}', serif`,
                fontSize: `${typography.headingSize + 1}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
                textTransform: 'uppercase',
                letterSpacing: '2pt',
                fontWeight: 700,
                borderBottom: `1pt solid ${theme.primaryColor}30`,
                paddingBottom: '4pt',
              }}>
                Formación
              </h2>
              {data.education.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: '10pt' }}>
                  <h3 style={{ margin: 0, fontWeight: 700, color: theme.primaryColor }}>{edu.area}</h3>
                  <p style={{ margin: '2pt 0', color: theme.secondaryColor, fontStyle: 'italic' }}>{edu.institution}</p>
                  <p style={{ margin: 0, color: theme.mutedColor, fontSize: `${typography.bodySize - 1}pt` }}>
                    {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Presente'}
                  </p>
                </div>
              ))}
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h2 style={{
                fontFamily: `'${typography.headingFont}', serif`,
                fontSize: `${typography.headingSize + 1}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
                textTransform: 'uppercase',
                letterSpacing: '2pt',
                fontWeight: 700,
                borderBottom: `1pt solid ${theme.primaryColor}30`,
                paddingBottom: '4pt',
              }}>
                Competencias
              </h2>
              {data.skills.map((skill, idx) => (
                <div key={skill.id || idx} style={{ marginBottom: '7pt' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2pt', fontSize: `${typography.bodySize - 1}pt` }}>
                    <span style={{ fontWeight: 600 }}>{skill.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2pt' }}>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: '4pt',
                          backgroundColor: i < Math.ceil(skill.level / 20) ? theme.accentColor : theme.mutedColor + '30',
                          borderRadius: '1pt',
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {data.languages.length > 0 && (
          <section style={{ marginTop: '15pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', serif`,
              fontSize: `${typography.headingSize + 1}pt`,
              color: theme.primaryColor,
              marginBottom: '10pt',
              textTransform: 'uppercase',
              letterSpacing: '2pt',
              fontWeight: 700,
              borderBottom: `1pt solid ${theme.primaryColor}30`,
              paddingBottom: '4pt',
            }}>
              Idiomas
            </h2>
            <div style={{ display: 'flex', gap: '20pt', flexWrap: 'wrap' }}>
              {data.languages.map((lang, idx) => (
                <div key={lang.id || idx}>
                  <strong style={{ color: theme.primaryColor }}>{lang.language}</strong> · <span style={{ color: theme.mutedColor }}>{lang.fluency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// Timeline Template - Full timeline journey design with photo
export function TimelineTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="cv-template timeline"
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
      {/* Hero header with gradient and photo */}
      <header style={{
        background: `linear-gradient(120deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 60%, ${theme.accentColor} 100%)`,
        color: '#fff',
        padding: '25mm 20mm',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-40mm',
          right: '-40mm',
          width: '140mm',
          height: '140mm',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20mm',
          left: '-20mm',
          width: '80mm',
          height: '80mm',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20pt', position: 'relative' }}>
          {data.basics.image ? (
            <img
              src={data.basics.image}
              alt="Foto"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '5px solid rgba(255,255,255,0.4)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                flexShrink: 0,
              }}
            />
          ) : (
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '5px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '42pt',
              fontWeight: 700,
              flexShrink: 0,
            }}>
              {(data.basics.name || 'TN').charAt(0)}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize + 16}pt`,
              margin: 0,
              fontWeight: 800,
              letterSpacing: '-0.5pt',
            }}>
              {data.basics.name || 'Tu Nombre'}
            </h1>
            {data.basics.label && (
              <p style={{
                fontSize: `${typography.bodySize + 4}pt`,
                opacity: 0.95,
                marginTop: '5pt',
                fontWeight: 300,
              }}>
                {data.basics.label}
              </p>
            )}
            <div style={{ display: 'flex', gap: '12pt', marginTop: '14pt', flexWrap: 'wrap', fontSize: `${typography.bodySize - 1}pt` }}>
              {data.basics.email && (
                <span style={{ padding: '4pt 10pt', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20pt', backdropFilter: 'blur(10px)' }}>
                  ✉ {data.basics.email}
                </span>
              )}
              {data.basics.phone && (
                <span style={{ padding: '4pt 10pt', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20pt' }}>
                  📞 {data.basics.phone}
                </span>
              )}
              {data.basics.location.city && (
                <span style={{ padding: '4pt 10pt', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20pt' }}>
                  📍 {data.basics.location.city}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: '15mm 20mm' }}>
        {data.basics.summary && (
          <section style={{ marginBottom: '20pt', textAlign: 'center' }}>
            <p style={{
              margin: 0,
              fontSize: `${typography.bodySize + 2}pt`,
              lineHeight: 1.6,
              color: theme.secondaryColor,
              fontStyle: 'italic',
              maxWidth: '150mm',
              marginInline: 'auto',
            }}>
              {data.basics.summary}
            </p>
          </section>
        )}

        {/* Vertical Timeline */}
        {data.work.length > 0 && (
          <section style={{ marginBottom: '20pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize + 2}pt`,
              color: theme.primaryColor,
              marginBottom: '15pt',
              textAlign: 'center',
              fontWeight: 700,
            }}>
              Mi Trayectoria
            </h2>
            <div style={{ position: 'relative', paddingLeft: '30pt' }}>
              <div style={{
                position: 'absolute',
                left: '10pt',
                top: '5pt',
                bottom: '5pt',
                width: '3pt',
                background: `linear-gradient(to bottom, ${theme.primaryColor}, ${theme.accentColor})`,
                borderRadius: '2pt',
              }} />
              {data.work.map((job, idx) => (
                <div key={job.id || idx} style={{ marginBottom: '18pt', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-27pt',
                    top: '4pt',
                    width: '17pt',
                    height: '17pt',
                    borderRadius: '50%',
                    backgroundColor: theme.accentColor,
                    border: `3pt solid ${theme.backgroundColor}`,
                    boxShadow: `0 0 0 2pt ${theme.primaryColor}`,
                  }} />
                  <div style={{
                    padding: '12pt 15pt',
                    backgroundColor: theme.primaryColor + '08',
                    borderRadius: '8pt',
                    borderLeft: `4pt solid ${theme.accentColor}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '5pt' }}>
                      <h3 style={{ margin: 0, fontWeight: 700, color: theme.primaryColor, fontSize: `${typography.bodySize + 2}pt` }}>
                        {job.position}
                      </h3>
                      <span style={{
                        fontSize: `${typography.bodySize - 1}pt`,
                        padding: '2pt 10pt',
                        backgroundColor: theme.accentColor,
                        color: '#fff',
                        borderRadius: '12pt',
                        fontWeight: 600,
                      }}>
                        {formatDate(job.startDate)} — {job.endDate ? formatDate(job.endDate) : 'Actual'}
                      </span>
                    </div>
                    <p style={{ margin: '3pt 0', color: theme.secondaryColor, fontWeight: 600 }}>
                      🏢 {job.company}{job.location ? ` • ${job.location}` : ''}
                    </p>
                    {job.summary && <p style={{ margin: '6pt 0', textAlign: 'justify' }}>{job.summary}</p>}
                    {job.highlights.length > 0 && (
                      <ul style={{ margin: '5pt 0', paddingLeft: '15pt' }}>
                        {job.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Three column grid for Education, Skills, Languages */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20pt', marginBottom: '15pt' }}>
          {data.education.length > 0 && (
            <section>
              <h3 style={{
                fontFamily: `'${typography.headingFont}', sans-serif`,
                fontSize: `${typography.headingSize}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6pt',
              }}>
                🎓 Educación
              </h3>
              {data.education.map((edu, idx) => (
                <div key={edu.id || idx} style={{ marginBottom: '10pt', padding: '8pt', backgroundColor: theme.primaryColor + '08', borderRadius: '6pt' }}>
                  <h4 style={{ margin: 0, fontWeight: 600 }}>{edu.area}</h4>
                  <p style={{ margin: '2pt 0', fontSize: `${typography.bodySize - 1}pt`, color: theme.secondaryColor }}>{edu.institution}</p>
                  <p style={{ margin: 0, fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                    {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Presente'}
                  </p>
                </div>
              ))}
            </section>
          )}

          {data.skills.length > 0 && (
            <section>
              <h3 style={{
                fontFamily: `'${typography.headingFont}', sans-serif`,
                fontSize: `${typography.headingSize}pt`,
                color: theme.primaryColor,
                marginBottom: '10pt',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6pt',
              }}>
                ⚡ Habilidades
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6pt' }}>
                {data.skills.map((skill, idx) => (
                  <span key={skill.id || idx} style={{
                    padding: '5pt 12pt',
                    background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor})`,
                    color: '#fff',
                    borderRadius: '15pt',
                    fontSize: `${typography.bodySize - 1}pt`,
                    fontWeight: 600,
                    boxShadow: `0 2pt 4pt ${theme.primaryColor}30`,
                  }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.languages.length > 0 && (
          <section>
            <h3 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize}pt`,
              color: theme.primaryColor,
              marginBottom: '10pt',
              fontWeight: 700,
            }}>
              🌍 Idiomas
            </h3>
            <div style={{ display: 'flex', gap: '15pt', flexWrap: 'wrap' }}>
              {data.languages.map((lang, idx) => (
                <div key={lang.id || idx} style={{
                  padding: '6pt 14pt',
                  backgroundColor: theme.backgroundColor,
                  border: `2pt solid ${theme.primaryColor}`,
                  borderRadius: '20pt',
                }}>
                  <strong style={{ color: theme.primaryColor }}>{lang.language}</strong>
                  <span style={{ color: theme.mutedColor, marginLeft: '5pt' }}>· {lang.fluency}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// Infographic Template - Visual, data-rich design with photo
export function InfographicTemplate({ data, theme, typography }: { data: CVData; theme: ThemeConfig; typography: TypographyConfig }) {
  const formatDate = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
  };

  const yearsExp = data.work.reduce((acc, w) => {
    if (!w.startDate) return acc;
    const start = new Date(w.startDate);
    const end = w.endDate ? new Date(w.endDate) : new Date();
    return acc + (end.getFullYear() - start.getFullYear());
  }, 0);

  return (
    <div
      className="cv-template infographic"
      style={{
        fontFamily: `'${typography.bodyFont}', sans-serif`,
        fontSize: `${typography.bodySize}pt`,
        lineHeight: typography.lineHeight,
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        width: '210mm',
        minHeight: '297mm',
        display: 'grid',
        gridTemplateColumns: '75mm 1fr',
      }}
    >
      {/* Left colorful sidebar */}
      <aside style={{
        background: `linear-gradient(180deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
        color: '#fff',
        padding: '15mm 12mm',
      }}>
        {/* Photo */}
        <div style={{ textAlign: 'center', marginBottom: '18pt' }}>
          {data.basics.image ? (
            <img
              src={data.basics.image}
              alt="Foto"
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `5pt solid ${theme.accentColor}`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            />
          ) : (
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: theme.accentColor,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44pt',
              fontWeight: 700,
            }}>
              {(data.basics.name || 'TN').charAt(0)}
            </div>
          )}
        </div>

        {/* Stats rings */}
        <div style={{ marginBottom: '18pt' }}>
          <h3 style={{
            fontSize: `${typography.bodySize - 1}pt`,
            textTransform: 'uppercase',
            letterSpacing: '2pt',
            marginBottom: '10pt',
            borderBottom: `2pt solid ${theme.accentColor}`,
            paddingBottom: '4pt',
          }}>
            Stats
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10pt' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28pt', fontWeight: 800, color: theme.accentColor, lineHeight: 1 }}>
                {yearsExp || 0}+
              </div>
              <div style={{ fontSize: `${typography.bodySize - 2}pt`, marginTop: '4pt', opacity: 0.9 }}>Años Exp.</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28pt', fontWeight: 800, color: theme.accentColor, lineHeight: 1 }}>
                {data.work.length}
              </div>
              <div style={{ fontSize: `${typography.bodySize - 2}pt`, marginTop: '4pt', opacity: 0.9 }}>Proyectos</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '18pt' }}>
          <h3 style={{
            fontSize: `${typography.bodySize - 1}pt`,
            textTransform: 'uppercase',
            letterSpacing: '2pt',
            marginBottom: '10pt',
            borderBottom: `2pt solid ${theme.accentColor}`,
            paddingBottom: '4pt',
          }}>
            Contacto
          </h3>
          {data.basics.email && <p style={{ margin: '6pt 0', fontSize: `${typography.bodySize - 1}pt`, wordBreak: 'break-all' }}>✉ {data.basics.email}</p>}
          {data.basics.phone && <p style={{ margin: '6pt 0', fontSize: `${typography.bodySize - 1}pt` }}>📞 {data.basics.phone}</p>}
          {data.basics.location.city && <p style={{ margin: '6pt 0', fontSize: `${typography.bodySize - 1}pt` }}>📍 {data.basics.location.city}</p>}
          {data.basics.url && <p style={{ margin: '6pt 0', fontSize: `${typography.bodySize - 1}pt`, wordBreak: 'break-all' }}>🔗 {data.basics.url}</p>}
        </div>

        {/* Skills donut bars */}
        {data.skills.length > 0 && (
          <div style={{ marginBottom: '18pt' }}>
            <h3 style={{
              fontSize: `${typography.bodySize - 1}pt`,
              textTransform: 'uppercase',
              letterSpacing: '2pt',
              marginBottom: '12pt',
              borderBottom: `2pt solid ${theme.accentColor}`,
              paddingBottom: '4pt',
            }}>
              Skills
            </h3>
            {data.skills.slice(0, 6).map((skill, idx) => {
              const circ = 2 * Math.PI * 22;
              return (
                <div key={skill.id || idx} style={{ display: 'flex', alignItems: 'center', gap: '10pt', marginBottom: '10pt' }}>
                  <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                    <circle
                      cx="25" cy="25" r="22"
                      fill="none"
                      stroke={theme.accentColor}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(skill.level / 100) * circ} ${circ}`}
                      transform="rotate(-90 25 25)"
                    />
                    <text x="25" y="29" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
                      {skill.level}
                    </text>
                  </svg>
                  <div style={{ flex: 1, fontSize: `${typography.bodySize - 1}pt`, fontWeight: 600 }}>
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h3 style={{
              fontSize: `${typography.bodySize - 1}pt`,
              textTransform: 'uppercase',
              letterSpacing: '2pt',
              marginBottom: '10pt',
              borderBottom: `2pt solid ${theme.accentColor}`,
              paddingBottom: '4pt',
            }}>
              Idiomas
            </h3>
            {data.languages.map((lang, idx) => (
              <div key={lang.id || idx} style={{ marginBottom: '6pt', fontSize: `${typography.bodySize - 1}pt` }}>
                <strong>{lang.language}</strong>
                <div style={{ opacity: 0.9, fontSize: `${typography.bodySize - 2}pt` }}>{lang.fluency}</div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Right main content */}
      <main style={{ padding: '15mm 15mm' }}>
        {/* Name */}
        <div style={{ marginBottom: '15pt' }}>
          <h1 style={{
            fontFamily: `'${typography.headingFont}', sans-serif`,
            fontSize: `${typography.headingSize + 14}pt`,
            margin: 0,
            color: theme.primaryColor,
            fontWeight: 800,
            letterSpacing: '-0.5pt',
            lineHeight: 1.05,
          }}>
            {data.basics.name || 'Tu Nombre'}
          </h1>
          {data.basics.label && (
            <p style={{
              fontSize: `${typography.bodySize + 3}pt`,
              color: theme.accentColor,
              marginTop: '4pt',
              fontWeight: 600,
              letterSpacing: '1pt',
              textTransform: 'uppercase',
            }}>
              {data.basics.label}
            </p>
          )}
        </div>

        {data.basics.summary && (
          <section style={{ marginBottom: '15pt' }}>
            <div style={{
              padding: '12pt 15pt',
              background: `linear-gradient(135deg, ${theme.primaryColor}08, ${theme.accentColor}08)`,
              borderRadius: '8pt',
              borderLeft: `4pt solid ${theme.accentColor}`,
            }}>
              <p style={{ margin: 0, fontSize: `${typography.bodySize + 1}pt`, lineHeight: 1.6 }}>
                {data.basics.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience with icons */}
        {data.work.length > 0 && (
          <section style={{ marginBottom: '15pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize + 1}pt`,
              color: theme.primaryColor,
              marginBottom: '12pt',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8pt',
            }}>
              <div style={{
                width: '24pt',
                height: '24pt',
                backgroundColor: theme.accentColor,
                color: '#fff',
                borderRadius: '6pt',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12pt',
              }}>💼</div>
              Experiencia Profesional
            </h2>
            {data.work.map((job, idx) => (
              <div key={job.id || idx} style={{
                marginBottom: '12pt',
                padding: '10pt 12pt',
                borderRadius: '8pt',
                border: `1pt solid ${theme.primaryColor}20`,
                background: idx % 2 === 0 ? `${theme.primaryColor}05` : 'transparent',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontWeight: 700, color: theme.primaryColor, fontSize: `${typography.bodySize + 1}pt` }}>
                    {job.position}
                  </h3>
                  <span style={{
                    fontSize: `${typography.bodySize - 1}pt`,
                    color: theme.accentColor,
                    fontWeight: 700,
                  }}>
                    {formatDate(job.startDate)} → {job.endDate ? formatDate(job.endDate) : 'Ahora'}
                  </span>
                </div>
                <p style={{ margin: '3pt 0', color: theme.secondaryColor, fontWeight: 600 }}>
                  {job.company}{job.location ? ` · ${job.location}` : ''}
                </p>
                {job.summary && <p style={{ margin: '5pt 0', fontSize: `${typography.bodySize}pt` }}>{job.summary}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section style={{ marginBottom: '15pt' }}>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize + 1}pt`,
              color: theme.primaryColor,
              marginBottom: '10pt',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8pt',
            }}>
              <div style={{
                width: '24pt',
                height: '24pt',
                backgroundColor: theme.accentColor,
                color: '#fff',
                borderRadius: '6pt',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12pt',
              }}>🎓</div>
              Educación
            </h2>
            {data.education.map((edu, idx) => (
              <div key={edu.id || idx} style={{ marginBottom: '8pt', paddingLeft: '10pt', borderLeft: `3pt solid ${theme.accentColor}` }}>
                <h3 style={{ margin: 0, fontWeight: 700 }}>{edu.area}</h3>
                <p style={{ margin: '2pt 0', color: theme.secondaryColor }}>{edu.institution} · {edu.studyType}</p>
                <p style={{ margin: 0, fontSize: `${typography.bodySize - 1}pt`, color: theme.mutedColor }}>
                  {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Presente'}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Certificates */}
        {data.certificates.length > 0 && (
          <section>
            <h2 style={{
              fontFamily: `'${typography.headingFont}', sans-serif`,
              fontSize: `${typography.headingSize + 1}pt`,
              color: theme.primaryColor,
              marginBottom: '10pt',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8pt',
            }}>
              <div style={{
                width: '24pt',
                height: '24pt',
                backgroundColor: theme.accentColor,
                color: '#fff',
                borderRadius: '6pt',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12pt',
              }}>🏆</div>
              Certificaciones
            </h2>
            {data.certificates.map((cert, idx) => (
              <div key={cert.id || idx} style={{ marginBottom: '6pt' }}>
                <strong>{cert.name}</strong> · <span style={{ color: theme.mutedColor }}>{cert.issuer} ({formatDate(cert.date)})</span>
              </div>
            ))}
          </section>
        )}
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
  executive: ExecutiveTemplate,
  timeline: TimelineTemplate,
  infographic: InfographicTemplate,
};
