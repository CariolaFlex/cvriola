'use client';

import React from 'react';

// Visual SVG thumbnails for each template
export const TemplateThumbnails: Record<string, React.ReactNode> = {
  classic: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <rect width="120" height="160" fill="#ffffff" rx="4"/>
      {/* Header */}
      <rect x="10" y="12" width="100" height="6" fill="#1e3a5f" rx="1"/>
      <rect x="30" y="22" width="60" height="4" fill="#94a3b8" rx="1"/>
      {/* Contact line */}
      <rect x="20" y="30" width="80" height="3" fill="#e2e8f0" rx="1"/>
      {/* Summary */}
      <rect x="10" y="40" width="100" height="2" fill="#1e3a5f" rx="1"/>
      <rect x="10" y="46" width="100" height="10" fill="#f1f5f9" rx="1"/>
      {/* Work */}
      <rect x="10" y="62" width="100" height="2" fill="#1e3a5f" rx="1"/>
      <rect x="10" y="68" width="50" height="3" fill="#334155" rx="0.5"/>
      <rect x="75" y="68" width="35" height="3" fill="#94a3b8" rx="0.5"/>
      <rect x="10" y="74" width="100" height="8" fill="#f8fafc" rx="1"/>
      <rect x="10" y="86" width="50" height="3" fill="#334155" rx="0.5"/>
      <rect x="75" y="86" width="35" height="3" fill="#94a3b8" rx="0.5"/>
      <rect x="10" y="92" width="100" height="8" fill="#f8fafc" rx="1"/>
      {/* Education */}
      <rect x="10" y="106" width="100" height="2" fill="#1e3a5f" rx="1"/>
      <rect x="10" y="112" width="45" height="3" fill="#334155" rx="0.5"/>
      <rect x="10" y="118" width="80" height="4" fill="#f1f5f9" rx="1"/>
      {/* Skills */}
      <rect x="10" y="128" width="100" height="2" fill="#1e3a5f" rx="1"/>
      <rect x="10" y="134" width="20" height="6" fill="#2d5a87" rx="2"/>
      <rect x="34" y="134" width="25" height="6" fill="#2d5a87" rx="2"/>
      <rect x="63" y="134" width="18" height="6" fill="#2d5a87" rx="2"/>
      <rect x="85" y="134" width="22" height="6" fill="#2d5a87" rx="2"/>
    </svg>
  ),
  sidebar: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <rect width="120" height="160" fill="#ffffff" rx="4"/>
      {/* Sidebar */}
      <rect x="0" y="0" width="42" height="160" fill="#0f3638" rx="4"/>
      <rect x="42" y="0" width="78" height="160" fill="#ffffff"/>
      {/* Photo */}
      <circle cx="21" cy="25" r="14" fill="#4f98a3"/>
      {/* Name */}
      <rect x="5" y="45" width="32" height="4" fill="#ffffff" rx="1"/>
      <rect x="8" y="52" width="26" height="3" fill="#4f98a3" rx="1"/>
      {/* Contact */}
      <rect x="5" y="62" width="32" height="2" fill="#4f98a3" rx="0.5"/>
      <rect x="5" y="68" width="32" height="2" fill="#4f98a3" rx="0.5"/>
      <rect x="5" y="74" width="32" height="2" fill="#4f98a3" rx="0.5"/>
      {/* Skills bars */}
      <rect x="5" y="85" width="25" height="2" fill="#ffffff" rx="0.5"/>
      <rect x="5" y="90" width="32" height="3" fill="rgba(255,255,255,0.2)" rx="1"/>
      <rect x="5" y="90" width="24" height="3" fill="#4f98a3" rx="1"/>
      <rect x="5" y="98" width="32" height="3" fill="rgba(255,255,255,0.2)" rx="1"/>
      <rect x="5" y="98" width="20" height="3" fill="#4f98a3" rx="1"/>
      <rect x="5" y="106" width="32" height="3" fill="rgba(255,255,255,0.2)" rx="1"/>
      <rect x="5" y="106" width="28" height="3" fill="#4f98a3" rx="1"/>
      {/* Main content */}
      <rect x="48" y="12" width="64" height="3" fill="#0f3638" rx="0.5"/>
      <rect x="48" y="20" width="64" height="10" fill="#f1f5f9" rx="1"/>
      <rect x="48" y="36" width="64" height="3" fill="#0f3638" rx="0.5"/>
      <rect x="48" y="44" width="40" height="2.5" fill="#334155" rx="0.5"/>
      <rect x="48" y="50" width="64" height="8" fill="#f8fafc" rx="1"/>
      <rect x="48" y="62" width="40" height="2.5" fill="#334155" rx="0.5"/>
      <rect x="48" y="68" width="64" height="8" fill="#f8fafc" rx="1"/>
      <rect x="48" y="82" width="64" height="3" fill="#0f3638" rx="0.5"/>
      <rect x="48" y="90" width="35" height="2.5" fill="#334155" rx="0.5"/>
      <rect x="48" y="96" width="64" height="5" fill="#f1f5f9" rx="1"/>
    </svg>
  ),
  modern: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <defs>
        <linearGradient id="modernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155"/>
          <stop offset="100%" stopColor="#64748b"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="#ffffff" rx="4"/>
      {/* Gradient header */}
      <rect x="0" y="0" width="120" height="45" fill="url(#modernGrad)" rx="4"/>
      <rect x="10" y="12" width="60" height="5" fill="#ffffff" rx="1"/>
      <rect x="10" y="22" width="40" height="3" fill="rgba(255,255,255,0.8)" rx="1"/>
      <rect x="10" y="30" width="50" height="2" fill="rgba(255,255,255,0.6)" rx="0.5"/>
      <rect x="65" y="30" width="45" height="2" fill="rgba(255,255,255,0.6)" rx="0.5"/>
      {/* Content with accent bars */}
      <rect x="10" y="52" width="4" height="3" fill="#3b82f6" rx="1"/>
      <rect x="18" y="52" width="50" height="3" fill="#334155" rx="0.5"/>
      <rect x="10" y="60" width="100" height="10" fill="#f8fafc" rx="1"/>
      <rect x="10" y="76" width="4" height="3" fill="#3b82f6" rx="1"/>
      <rect x="18" y="76" width="50" height="3" fill="#334155" rx="0.5"/>
      {/* Timeline dots */}
      <circle cx="12" cy="94" r="3" fill="#3b82f6"/>
      <rect x="18" y="92" width="45" height="2.5" fill="#334155" rx="0.5"/>
      <rect x="75" y="92" width="35" height="2.5" fill="#94a3b8" rx="0.5"/>
      <rect x="18" y="98" width="92" height="8" fill="#f1f5f9" rx="1"/>
      <circle cx="12" cy="114" r="3" fill="#3b82f6"/>
      <rect x="18" y="112" width="45" height="2.5" fill="#334155" rx="0.5"/>
      <rect x="75" y="112" width="35" height="2.5" fill="#94a3b8" rx="0.5"/>
      <rect x="18" y="118" width="92" height="8" fill="#f1f5f9" rx="1"/>
      {/* Two columns */}
      <rect x="10" y="134" width="4" height="3" fill="#3b82f6" rx="1"/>
      <rect x="18" y="134" width="35" height="3" fill="#334155" rx="0.5"/>
      <rect x="65" y="134" width="4" height="3" fill="#3b82f6" rx="1"/>
      <rect x="73" y="134" width="35" height="3" fill="#334155" rx="0.5"/>
      <rect x="10" y="142" width="45" height="4" fill="#334155" rx="2"/>
      <rect x="60" y="142" width="50" height="4" fill="#334155" rx="2"/>
      <rect x="10" y="150" width="40" height="4" fill="#334155" rx="2"/>
      <rect x="55" y="150" width="55" height="4" fill="#334155" rx="2"/>
    </svg>
  ),
  minimal: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <rect width="120" height="160" fill="#ffffff" rx="4"/>
      {/* Centered header */}
      <text x="60" y="22" textAnchor="middle" fill="#18181b" fontSize="7" fontWeight="400" letterSpacing="1">NOMBRE</text>
      <rect x="35" y="28" width="50" height="2" fill="#71717a" rx="1"/>
      {/* Separator */}
      <rect x="10" y="40" width="100" height="0.5" fill="#e5e5e5"/>
      {/* Quote */}
      <rect x="15" y="48" width="90" height="10" fill="#fafafa" rx="1"/>
      {/* Work */}
      <text x="10" y="72" fill="#18181b" fontSize="4" letterSpacing="1.5" fontWeight="400">EXPERIENCIA</text>
      <rect x="10" y="78" width="45" height="3" fill="#18181b" rx="0.5"/>
      <rect x="85" y="78" width="25" height="3" fill="#71717a" rx="0.5"/>
      <rect x="10" y="84" width="35" height="2" fill="#a1a1aa" rx="0.5"/>
      <rect x="10" y="90" width="45" height="3" fill="#18181b" rx="0.5"/>
      <rect x="85" y="90" width="25" height="3" fill="#71717a" rx="0.5"/>
      <rect x="10" y="96" width="35" height="2" fill="#a1a1aa" rx="0.5"/>
      {/* Education */}
      <text x="10" y="112" fill="#18181b" fontSize="4" letterSpacing="1.5" fontWeight="400">EDUCACIÓN</text>
      <rect x="10" y="118" width="45" height="3" fill="#18181b" rx="0.5"/>
      <rect x="85" y="118" width="25" height="3" fill="#71717a" rx="0.5"/>
      <rect x="10" y="124" width="35" height="2" fill="#a1a1aa" rx="0.5"/>
      {/* Skills */}
      <text x="10" y="138" fill="#18181b" fontSize="4" letterSpacing="1.5" fontWeight="400">HABILIDADES</text>
      <rect x="10" y="144" width="100" height="2" fill="#3f3f46" rx="0.5"/>
    </svg>
  ),
  creative: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <defs>
        <linearGradient id="creativeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed"/>
          <stop offset="50%" stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="#faf5ff" rx="4"/>
      {/* Wavy header */}
      <path d="M0,0 L120,0 L120,50 Q60,60 0,50 Z" fill="url(#creativeGrad)"/>
      <rect x="10" y="12" width="60" height="5" fill="#ffffff" rx="1"/>
      <rect x="10" y="22" width="40" height="3" fill="rgba(255,255,255,0.8)" rx="1"/>
      {/* Contact bar */}
      <rect x="10" y="55" width="100" height="12" fill="#ffffff" rx="2"/>
      <circle cx="22" cy="61" r="3" fill="#7c3aed"/>
      <rect x="28" y="59" width="25" height="3" fill="#7c3aed" rx="0.5"/>
      <circle cx="62" cy="61" r="3" fill="#7c3aed"/>
      <rect x="68" y="59" width="20" height="3" fill="#7c3aed" rx="0.5"/>
      {/* About */}
      <text x="10" y="82" fill="#7c3aed" fontSize="4" fontWeight="600">✨ Sobre mí</text>
      <rect x="10" y="86" width="100" height="10" fill="#ffffff" rx="2"/>
      {/* Experience cards */}
      <text x="10" y="106" fill="#7c3aed" fontSize="4" fontWeight="600">💼 Experiencia</text>
      <rect x="10" y="110" width="100" height="16" fill="#ffffff" rx="2" stroke="#f59e0b" strokeWidth="1"/>
      <rect x="15" y="114" width="45" height="3" fill="#7c3aed" rx="0.5"/>
      <rect x="80" y="114" width="25" height="3" fill="#f59e0b" rx="1"/>
      <rect x="15" y="120" width="90" height="3" fill="#e5e7eb" rx="0.5"/>
      {/* Two columns */}
      <text x="10" y="138" fill="#7c3aed" fontSize="4" fontWeight="600">🎓 Educación</text>
      <text x="65" y="138" fill="#7c3aed" fontSize="4" fontWeight="600">⭐ Habilidades</text>
      <rect x="10" y="142" width="45" height="3" fill="#a78bfa" rx="4"/>
      <rect x="60" y="142" width="50" height="3" fill="#7c3aed" rx="4"/>
      <rect x="60" y="148" width="40" height="3" fill="#a78bfa" rx="4"/>
      <rect x="60" y="154" width="45" height="3" fill="#f59e0b" rx="4"/>
    </svg>
  ),
  executive: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <rect width="120" height="160" fill="#ffffff" rx="4"/>
      {/* Double border header */}
      <rect x="8" y="8" width="104" height="44" fill="none" stroke="#1a1814" strokeWidth="1"/>
      <rect x="11" y="11" width="98" height="38" fill="none" stroke="#a67c3f" strokeWidth="0.5"/>
      {/* Photo square */}
      <rect x="16" y="16" width="28" height="28" fill="#4a3f35" rx="1"/>
      <rect x="18" y="18" width="24" height="24" fill="#a67c3f" rx="0.5"/>
      {/* Name + tagline */}
      <rect x="50" y="20" width="55" height="4" fill="#1a1814" rx="0.5"/>
      <rect x="50" y="28" width="40" height="2.5" fill="#a67c3f" rx="0.5"/>
      <rect x="50" y="34" width="48" height="2" fill="#6b6a65" rx="0.5"/>
      <rect x="50" y="39" width="48" height="2" fill="#6b6a65" rx="0.5"/>
      {/* Tagline */}
      <text x="60" y="60" fill="#a67c3f" fontSize="3.5" fontStyle="italic" letterSpacing="1">CURRICULUM VITAE</text>
      {/* Quote summary */}
      <rect x="14" y="66" width="2" height="14" fill="#a67c3f"/>
      <rect x="20" y="68" width="90" height="2" fill="#4a3f35" rx="0.5"/>
      <rect x="20" y="73" width="85" height="2" fill="#4a3f35" rx="0.5"/>
      <rect x="20" y="78" width="70" height="2" fill="#4a3f35" rx="0.5"/>
      {/* Trajectory grid */}
      <rect x="10" y="88" width="100" height="1" fill="#1a1814"/>
      <rect x="10" y="92" width="20" height="2.5" fill="#a67c3f" rx="0.5"/>
      <rect x="38" y="92" width="40" height="2.5" fill="#1a1814" rx="0.5"/>
      <rect x="38" y="98" width="65" height="2" fill="#6b6a65" rx="0.5"/>
      <rect x="10" y="106" width="20" height="2.5" fill="#a67c3f" rx="0.5"/>
      <rect x="38" y="106" width="40" height="2.5" fill="#1a1814" rx="0.5"/>
      <rect x="38" y="112" width="65" height="2" fill="#6b6a65" rx="0.5"/>
      {/* Two columns */}
      <rect x="10" y="124" width="100" height="1" fill="#1a1814"/>
      <rect x="10" y="128" width="35" height="3" fill="#1a1814" rx="0.5"/>
      <rect x="65" y="128" width="35" height="3" fill="#1a1814" rx="0.5"/>
      {/* Skill dots */}
      <rect x="10" y="136" width="30" height="2" fill="#4a3f35" rx="0.5"/>
      <circle cx="10" cy="143" r="1.5" fill="#a67c3f"/>
      <circle cx="15" cy="143" r="1.5" fill="#a67c3f"/>
      <circle cx="20" cy="143" r="1.5" fill="#a67c3f"/>
      <circle cx="25" cy="143" r="1.5" fill="#a67c3f"/>
      <circle cx="30" cy="143" r="1.5" fill="#e5e5e5"/>
      <rect x="10" y="150" width="30" height="2" fill="#4a3f35" rx="0.5"/>
      <rect x="65" y="136" width="40" height="2" fill="#4a3f35" rx="0.5"/>
      <rect x="65" y="142" width="40" height="2" fill="#4a3f35" rx="0.5"/>
      <rect x="65" y="148" width="40" height="2" fill="#4a3f35" rx="0.5"/>
    </svg>
  ),
  timeline: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <defs>
        <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4c1d95"/>
          <stop offset="50%" stopColor="#7c3aed"/>
          <stop offset="100%" stopColor="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="120" height="160" fill="#ffffff" rx="4"/>
      {/* Gradient hero */}
      <rect x="0" y="0" width="120" height="52" fill="url(#timelineGrad)" rx="4"/>
      {/* Circle photo */}
      <circle cx="22" cy="26" r="14" fill="#ffffff"/>
      <circle cx="22" cy="26" r="12" fill="#7c3aed"/>
      {/* Name */}
      <rect x="42" y="16" width="55" height="5" fill="#ffffff" rx="1"/>
      <rect x="42" y="25" width="40" height="3" fill="rgba(255,255,255,0.85)" rx="0.5"/>
      {/* Glass pills */}
      <rect x="42" y="32" width="22" height="5" fill="rgba(255,255,255,0.25)" rx="2.5"/>
      <rect x="66" y="32" width="22" height="5" fill="rgba(255,255,255,0.25)" rx="2.5"/>
      <rect x="42" y="40" width="22" height="5" fill="rgba(255,255,255,0.25)" rx="2.5"/>
      {/* Timeline line */}
      <rect x="17" y="62" width="1.5" height="85" fill="#a78bfa"/>
      {/* Timeline dots + cards */}
      <circle cx="18" cy="68" r="3.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5"/>
      <rect x="26" y="64" width="84" height="18" fill="#faf5ff" rx="2" stroke="#a78bfa" strokeWidth="0.5"/>
      <rect x="30" y="68" width="40" height="3" fill="#4c1d95" rx="0.5"/>
      <rect x="78" y="68" width="28" height="3" fill="#7c3aed" rx="1"/>
      <rect x="30" y="74" width="70" height="5" fill="#e9d5ff" rx="1"/>
      <circle cx="18" cy="92" r="3.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5"/>
      <rect x="26" y="88" width="84" height="18" fill="#faf5ff" rx="2" stroke="#a78bfa" strokeWidth="0.5"/>
      <rect x="30" y="92" width="40" height="3" fill="#4c1d95" rx="0.5"/>
      <rect x="78" y="92" width="28" height="3" fill="#7c3aed" rx="1"/>
      <rect x="30" y="98" width="70" height="5" fill="#e9d5ff" rx="1"/>
      <circle cx="18" cy="116" r="3.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5"/>
      <rect x="26" y="112" width="84" height="16" fill="#faf5ff" rx="2" stroke="#a78bfa" strokeWidth="0.5"/>
      <rect x="30" y="116" width="40" height="3" fill="#4c1d95" rx="0.5"/>
      <rect x="30" y="122" width="70" height="3" fill="#e9d5ff" rx="1"/>
      {/* Skills gradient badges */}
      <rect x="10" y="136" width="22" height="6" fill="url(#timelineGrad)" rx="3"/>
      <rect x="36" y="136" width="18" height="6" fill="url(#timelineGrad)" rx="3"/>
      <rect x="58" y="136" width="24" height="6" fill="url(#timelineGrad)" rx="3"/>
      <rect x="86" y="136" width="20" height="6" fill="url(#timelineGrad)" rx="3"/>
      <rect x="10" y="146" width="26" height="6" fill="url(#timelineGrad)" rx="3"/>
      <rect x="40" y="146" width="20" height="6" fill="url(#timelineGrad)" rx="3"/>
      <rect x="64" y="146" width="22" height="6" fill="url(#timelineGrad)" rx="3"/>
    </svg>
  ),
  infographic: (
    <svg viewBox="0 0 120 160" className="w-full h-full">
      <rect width="120" height="160" fill="#ffffff" rx="4"/>
      {/* Sidebar */}
      <rect x="0" y="0" width="45" height="160" fill="#0f3638" rx="4"/>
      <rect x="45" y="0" width="75" height="160" fill="#ffffff"/>
      {/* Photo circle */}
      <circle cx="22" cy="22" r="14" fill="#4f98a3" stroke="#ffffff" strokeWidth="2"/>
      {/* Name */}
      <rect x="5" y="42" width="35" height="3" fill="#ffffff" rx="0.5"/>
      <rect x="8" y="48" width="28" height="2" fill="#4f98a3" rx="0.5"/>
      {/* Stats */}
      <rect x="5" y="56" width="15" height="12" fill="rgba(255,255,255,0.1)" rx="1"/>
      <text x="12" y="64" fill="#4f98a3" fontSize="5" fontWeight="700" textAnchor="middle">5+</text>
      <rect x="24" y="56" width="15" height="12" fill="rgba(255,255,255,0.1)" rx="1"/>
      <text x="31" y="64" fill="#4f98a3" fontSize="5" fontWeight="700" textAnchor="middle">20</text>
      {/* Skill rings */}
      <circle cx="12" cy="84" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      <circle cx="12" cy="84" r="6" fill="none" stroke="#4f98a3" strokeWidth="2" strokeDasharray="30 40" transform="rotate(-90 12 84)"/>
      <circle cx="32" cy="84" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      <circle cx="32" cy="84" r="6" fill="none" stroke="#01696f" strokeWidth="2" strokeDasharray="25 40" transform="rotate(-90 32 84)"/>
      <circle cx="12" cy="104" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      <circle cx="12" cy="104" r="6" fill="none" stroke="#4f98a3" strokeWidth="2" strokeDasharray="35 40" transform="rotate(-90 12 104)"/>
      <circle cx="32" cy="104" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      <circle cx="32" cy="104" r="6" fill="none" stroke="#01696f" strokeWidth="2" strokeDasharray="32 40" transform="rotate(-90 32 104)"/>
      {/* Contact */}
      <rect x="5" y="122" width="35" height="2" fill="rgba(255,255,255,0.5)" rx="0.5"/>
      <rect x="5" y="128" width="35" height="2" fill="rgba(255,255,255,0.5)" rx="0.5"/>
      <rect x="5" y="134" width="35" height="2" fill="rgba(255,255,255,0.5)" rx="0.5"/>
      <rect x="5" y="140" width="35" height="2" fill="rgba(255,255,255,0.5)" rx="0.5"/>
      {/* Main content */}
      <circle cx="52" cy="14" r="3" fill="#01696f"/>
      <text x="52" y="16" fill="#ffffff" fontSize="3.5" textAnchor="middle">💼</text>
      <rect x="58" y="12" width="55" height="4" fill="#0f3638" rx="0.5"/>
      <rect x="50" y="20" width="65" height="14" fill="#f0fdfa" rx="1" stroke="#4f98a3" strokeWidth="0.3"/>
      <rect x="53" y="23" width="35" height="2.5" fill="#0f3638" rx="0.5"/>
      <rect x="53" y="28" width="50" height="2" fill="#6b6a65" rx="0.5"/>
      <rect x="50" y="38" width="65" height="14" fill="#f0fdfa" rx="1" stroke="#4f98a3" strokeWidth="0.3"/>
      <rect x="53" y="41" width="35" height="2.5" fill="#0f3638" rx="0.5"/>
      <rect x="53" y="46" width="50" height="2" fill="#6b6a65" rx="0.5"/>
      <circle cx="52" cy="60" r="3" fill="#01696f"/>
      <rect x="58" y="58" width="55" height="4" fill="#0f3638" rx="0.5"/>
      <rect x="50" y="66" width="65" height="12" fill="#f0fdfa" rx="1"/>
      <circle cx="52" cy="86" r="3" fill="#01696f"/>
      <rect x="58" y="84" width="55" height="4" fill="#0f3638" rx="0.5"/>
      <rect x="50" y="92" width="65" height="12" fill="#f0fdfa" rx="1"/>
      <circle cx="52" cy="112" r="3" fill="#01696f"/>
      <rect x="58" y="110" width="55" height="4" fill="#0f3638" rx="0.5"/>
      <rect x="50" y="118" width="20" height="5" fill="#4f98a3" rx="2.5"/>
      <rect x="72" y="118" width="16" height="5" fill="#4f98a3" rx="2.5"/>
      <rect x="90" y="118" width="22" height="5" fill="#4f98a3" rx="2.5"/>
      <rect x="50" y="126" width="24" height="5" fill="#4f98a3" rx="2.5"/>
      <rect x="76" y="126" width="18" height="5" fill="#4f98a3" rx="2.5"/>
    </svg>
  ),
};
