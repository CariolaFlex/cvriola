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
};
