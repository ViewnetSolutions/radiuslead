'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Nav } from '@/components/Nav'

// ── Feature pillars pulled directly from the app ─────────────────────────────
const FEATURES = [
  {
    id:     '01',
    label:  'Live Load Intercept',
    title:  'Kill risks before they become claims.',
    body:   'Every active load is scored for risk in real time — mechanical delays, detention exposure, floor rate breaches. When a load hits threshold, dispatch gets an intercept prompt before the situation escalates.',
    accent: '#FF8C00',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="#FF8C00" strokeWidth="1.5" fill="none"/>
        <path d="M14 7v8l5 3" stroke="#FF8C00" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="2" fill="#FF8C00"/>
      </svg>
    ),
  },
  {
    id:     '02',
    label:  'AI Tactical Brief',
    title:  'Start every shift with a complete ops picture.',
    body:   'Gemini AI reads your entire load board and generates a ranked tactical summary — which loads need immediate action, which brokers are exposed, and what decisions are sitting in queue.',
    accent: '#60A5FA',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="#60A5FA" strokeWidth="1.5" fill="none"/>
        <path d="M8 10h12M8 14h8M8 18h6" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="22" cy="6" r="4" fill="#1A2B3C" stroke="#60A5FA" strokeWidth="1"/>
        <path d="M20 6l1.5 1.5L24 4" stroke="#60A5FA" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:     '03',
    label:  'Broker Intelligence',
    title:  'Know who you\'re doing business with.',
    body:   'Every broker is scored on credit risk, payment velocity, concentration index, and override history. Run a full compliance audit in 2 seconds — blocked, watchlisted, or approved with Gemini commentary.',
    accent: '#F87171',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L3 8v9c0 5.5 4.5 10.5 11 12 6.5-1.5 11-6.5 11-12V8L14 3z" stroke="#F87171" strokeWidth="1.5" fill="none"/>
        <path d="M9 14l3.5 3.5L19 10" stroke="#F87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id:     '04',
    label:  'Manager Decision Theater',
    title:  'Governance built into the workflow.',
    body:   'Rate overrides, fuel advances, detention claims, and escalations all flow through a central approval queue with risk level tagging, time-in-queue tracking, and full audit trails.',
    accent: '#A78BFA',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="22" height="16" rx="2" stroke="#A78BFA" strokeWidth="1.5" fill="none"/>
        <path d="M8 8V6a6 6 0 0112 0v2" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="14" cy="16" r="3" stroke="#A78BFA" strokeWidth="1.5" fill="none"/>
        <path d="M14 19v2" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:     '05',
    label:  'Role-Based Access',
    title:  'Dispatcher, Manager, Executive — each sees their lane.',
    body:   'Three hardened roles with granular view controls. Dispatchers run loads. Managers approve exceptions. Executives see P&L exposure. No one sees what they shouldn\'t.',
    accent: '#34D399',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="9"  cy="10" r="4" stroke="#34D399" strokeWidth="1.5" fill="none"/>
        <circle cx="19" cy="10" r="4" stroke="#34D399" strokeWidth="1.5" fill="none"/>
        <path d="M3 23c0-4 2.7-6 6-6s6 2 6 6" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 19h8M20 15v8" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id:     '06',
    label:  'Booking Wizard',
    title:  'New loads booked in under 90 seconds.',
    body:   'Guided booking flow captures origin, destination, carrier, broker, floor rate, and ETA in a single pass. Auto-populates risk scoring the moment a load is created.',
    accent: '#FBBF24',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="3" width="18" height="22" rx="2" stroke="#FBBF24" strokeWidth="1.5" fill="none"/>
        <path d="M9 8h10M9 12h10M9 16h6" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="21" cy="21" r="5" fill="#1A2B3C" stroke="#FBBF24" strokeWidth="1"/>
        <path d="M19 21h4M21 19v4" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const METRICS = [
  { value: '< 90s',  label: 'Load booking time' },
  { value: '3 roles', label: 'Hardened access tiers' },
  { value: '2 sec',  label: 'Broker audit runtime' },
  { value: '100%',   label: 'Decision audit trail' },
]

// ── Inline dashboard mockup ───────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ background: '#0E1A26', fontFamily: 'monospace' }}>

      {/* Top bar */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-white/8" style={{ background: '#1A2B3C' }}>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#FF8C00' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L1 3.5v4c0 2.5 2 4.5 5 5.5 3-1 5-3 5-5.5v-4L6 1z" fill="white"/>
            </svg>
          </div>
          <span className="text-white text-xs font-bold tracking-widest">COCKPIT.OPS</span>
          <span className="text-white/20 mx-1">|</span>
          {['BRIEF','OPERATIONS','BROKERS','QUEUE'].map((t, i) => (
            <span key={t} className={`text-xs px-2 py-0.5 rounded font-bold tracking-wider ${i === 0 ? 'text-[#FF8C00] border border-white/10 bg-white/5' : 'text-white/40'}`}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          <span className="text-white/30 text-xs">14:22:07</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3 p-4">
        {[
          { label: 'ACTIVE LOADS', value: '24', delta: '+12%', color: '#FF8C00' },
          { label: 'AT RISK',      value: '3',  delta: '-5%',  color: '#F87171' },
          { label: 'GROSS REV',    value: '$16.2k', delta: '+8%', color: '#34D399' },
          { label: 'AVG RPM',      value: '2.76', delta: '+2%',  color: '#60A5FA' },
        ].map(m => (
          <div key={m.label} className="rounded-xl p-3 border border-white/6" style={{ background: '#1A2B3C' }}>
            <div className="text-white/40 text-xs tracking-widest mb-1">{m.label}</div>
            <div className="text-white text-lg font-bold" style={{ fontFamily: 'monospace' }}>{m.value}</div>
            <div className="text-xs mt-0.5" style={{ color: m.delta.startsWith('+') ? '#34D399' : '#F87171' }}>{m.delta}</div>
          </div>
        ))}
      </div>

      {/* Load table */}
      <div className="px-4 pb-2">
        <div className="rounded-xl border border-white/8 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/8 flex items-center justify-between" style={{ background: '#1A2B3C' }}>
            <span className="text-white/60 text-xs font-bold tracking-widest">AT-RISK OPERATION QUEUE</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-pulse"/>
              <span className="text-[#FF8C00] text-xs">LIVE</span>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { id: 'LD-8840', driver: 'M. Chen',    route: 'SAV → CMH', status: 'MECHANICAL', risk: 'HIGH',     val: '$2,850', rpm: '3.10' },
              { id: 'LD-7721', driver: 'D. Miller',  route: 'OAK → PHX', status: 'FLOOR BREACH', risk: 'CRITICAL', val: '$3,100', rpm: '2.10' },
              { id: 'LD-5512', driver: 'J. Torres',  route: 'DAL → ATL', status: 'LATE PICKUP', risk: 'MEDIUM',   val: '$2,200', rpm: '2.55' },
            ].map(row => (
              <div key={row.id} className="grid grid-cols-6 gap-2 px-4 py-2.5 text-xs items-center hover:bg-white/3 transition-colors">
                <span className="font-mono text-[#FF8C00]">{row.id}</span>
                <span className="text-white/70">{row.driver}</span>
                <span className="text-white/50">{row.route}</span>
                <span className="font-mono text-xs px-1.5 py-0.5 rounded text-center"
                  style={{
                    background: row.risk === 'CRITICAL' ? '#7F1D1D' : row.risk === 'HIGH' ? '#431407' : '#1A2B3C',
                    color:      row.risk === 'CRITICAL' ? '#FCA5A5' : row.risk === 'HIGH' ? '#FDBA74' : '#FCD34D',
                    border:     `1px solid ${row.risk === 'CRITICAL' ? '#EF444430' : '#FF8C0030'}`,
                  }}>{row.status}</span>
                <span className="text-white/60 text-right">{row.val}</span>
                <span className="text-white/40 text-right font-mono">{row.rpm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI brief strip */}
      <div className="mx-4 mb-4 mt-2 rounded-xl border border-blue-500/20 p-3" style={{ background: 'rgba(96,165,250,0.05)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"/>
          <span className="text-blue-400 text-xs font-bold tracking-widest">AI TACTICAL BRIEF</span>
        </div>
        <p className="text-white/50 text-xs leading-relaxed">
          3 loads require immediate intervention. LD-7721 is operating below floor rate — recommend rate renegotiation or load pull. C.H. Robinson concentration at 28%, exceeding policy threshold. Manager queue has 2 critical approvals pending &gt; 8 minutes.
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0E1A26, transparent)' }}/>
    </div>
  )
}

export default function DispatchPage() {
  const [email, setEmail]       = useState('')
  const [company, setCompany]   = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!email || !company) return
    setSubmitting(true)
    // In production: POST to an API route or Formspree/Resend
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen font-body" style={{ background: '#080A0F' }}>

      <Nav
        centerSlot={
          <div className="hidden md:flex items-center gap-2 font-mono text-xs" style={{ color: '#FF8C00', opacity: 0.7 }}>
            <span>DISPATCHOS</span>
            <span className="opacity-40">·</span>
            <span className="opacity-60 text-white">ENTERPRISE DISPATCH PLATFORM</span>
          </div>
        }
        rightSlot={
          <a href="#waitlist"
            className="px-5 py-2 rounded text-sm font-bold tracking-widest text-white transition-all hover:opacity-90"
            style={{ background: '#FF8C00', fontFamily: 'var(--font-display, sans-serif)' }}>
            JOIN WAITLIST →
          </a>
        }
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(26,43,60,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,43,60,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}/>
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: 'rgba(255,140,0,0.06)' }}/>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <div className="h-px w-8" style={{ background: '#FF8C00' }}/>
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#FF8C00' }}>
              For Truckload Brokerages &amp; Owner-Operators
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="font-display leading-none mb-6 animate-fade-up delay-100"
                style={{ color: '#E8EDF5', fontSize: 'clamp(52px, 7vw, 96px)' }}>
                <span className="block">DISPATCH</span>
                <span className="block" style={{ color: '#FF8C00' }}>OPERATIONS</span>
                <span className="block" style={{ color: 'rgba(232,237,245,0.4)' }}>GOVERNED.</span>
              </h1>

              <p className="text-lg leading-relaxed mb-4 animate-fade-up delay-200" style={{ color: '#8A96AA' }}>
                DispatchOS is the command layer for freight operations that can&apos;t afford surprises
                — live load intercept, AI tactical briefs, broker compliance scoring, and a manager
                approval theater in one platform.
              </p>
              <p className="text-lg leading-relaxed mb-8 animate-fade-up delay-300" style={{ color: '#8A96AA' }}>
                Built for brokerages running 50+ loads per day and owner-operators who need
                professional-grade dispatch without enterprise pricing.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
                <a href="#waitlist"
                  className="px-8 py-4 rounded-lg font-bold tracking-widest text-white text-lg transition-all hover:-translate-y-0.5"
                  style={{ background: '#FF8C00', fontFamily: 'var(--font-display, sans-serif)' }}>
                  JOIN THE WAITLIST →
                </a>
                <a href="#features"
                  className="px-8 py-4 rounded-lg font-bold tracking-widest text-lg border transition-all"
                  style={{ borderColor: '#3A4558', color: '#8A96AA', fontFamily: 'var(--font-display, sans-serif)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF8C0060'; e.currentTarget.style.color = '#E8EDF5' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#3A4558'; e.currentTarget.style.color = '#8A96AA' }}>
                  SEE HOW IT WORKS
                </a>
              </div>

              {/* Metrics strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t animate-fade-up delay-500"
                style={{ borderColor: '#3A4558' }}>
                {METRICS.map(m => (
                  <div key={m.label}>
                    <div className="font-display text-3xl leading-none mb-1"
                      style={{ color: '#FF8C00', fontFamily: 'var(--font-display, sans-serif)', textShadow: '0 0 30px rgba(255,140,0,0.3)' }}>
                      {m.value}
                    </div>
                    <div className="font-mono text-xs" style={{ color: '#8A96AA' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="animate-fade-up delay-300 lg:sticky lg:top-24">
              <DashboardMockup/>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 border-y" style={{ borderColor: '#1A2B3C', background: '#0B0E17' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: '#FF8C00' }}/>
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#FF8C00' }}>
                Platform Capabilities
              </span>
            </div>
            <h2 className="font-display leading-none" style={{ color: '#E8EDF5', fontSize: 'clamp(40px, 6vw, 80px)', fontFamily: 'var(--font-display, sans-serif)' }}>
              EVERYTHING IN<br/>ONE COCKPIT.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={f.id}
                className={`rounded-xl p-6 border transition-all duration-300 animate-fade-up delay-${(i % 4 + 1) * 100} group cursor-default`}
                style={{ background: '#111622', borderColor: '#3A4558' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = f.accent + '40'
                  e.currentTarget.style.boxShadow = `0 8px 32px ${f.accent}10`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#3A4558'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg" style={{ background: f.accent + '10', border: `1px solid ${f.accent}20` }}>
                    {f.icon}
                  </div>
                  <span className="font-mono text-xs" style={{ color: '#3A4558' }}>{f.id}</span>
                </div>
                <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: f.accent }}>
                  {f.label}
                </div>
                <h3 className="font-bold mb-3 leading-snug" style={{ color: '#E8EDF5', fontSize: '15px' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A96AA' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: '#FF8C00' }}/>
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#FF8C00' }}>
                Built For
              </span>
            </div>
            <h2 className="font-display leading-none" style={{ color: '#E8EDF5', fontSize: 'clamp(40px, 6vw, 80px)', fontFamily: 'var(--font-display, sans-serif)' }}>
              IS THIS<br/>YOU?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                role: 'Owner-Operator',
                pain: 'You\'re doing dispatch yourself between deliveries. A missed check call or a bad broker deal can cost you more than the load is worth.',
                fix: 'DispatchOS gives you the same risk scoring and broker intelligence as large brokerages — without the headcount.',
                color: '#FBBF24',
              },
              {
                role: 'Dispatcher',
                pain: 'You\'re managing 30 loads simultaneously and the only way you find out about a risk is when the driver calls you panicked.',
                fix: 'DispatchOS surfaces at-risk loads before they escalate — with one-click intercept and a pre-populated action brief.',
                color: '#FF8C00',
              },
              {
                role: 'Operations Manager',
                pain: 'Rate overrides, fuel advances, and broker disputes are handled over Slack and email. Nothing is documented. Everything is a fire.',
                fix: 'Every exception flows through the Decision Theater — tagged by risk level, timestamped, and resolved with a full audit trail.',
                color: '#60A5FA',
              },
              {
                role: 'Executive / Owner',
                pain: 'You have no real-time visibility into what\'s happening on the load board. You find out about problems on the P&L statement.',
                fix: 'Executive mode shows you gross revenue exposure, at-risk load count, and broker concentration without the operational noise.',
                color: '#34D399',
              },
            ].map(p => (
              <div key={p.role} className="rounded-xl p-7 border" style={{ background: '#111622', borderColor: '#3A4558' }}>
                <div className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: p.color }}>{p.role}</div>
                <div className="mb-4 p-4 rounded-lg" style={{ background: '#1A2B3C', borderLeft: `3px solid ${p.color}30` }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A96AA' }}>
                    <span className="font-semibold" style={{ color: '#E8EDF5' }}>The problem: </span>
                    {p.pain}
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#8A96AA' }}>
                  <span className="font-semibold" style={{ color: p.color }}>DispatchOS: </span>
                  {p.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo request form ─────────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6 border-t" style={{ borderColor: '#1A2B3C', background: '#0B0E17' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#FF8C00' }}/>
            <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#FF8C00' }}>Waitlist — Free Early Access</span>
            <div className="h-px w-8" style={{ background: '#FF8C00' }}/>
          </div>
          <h2 className="font-display leading-none mb-4"
            style={{ color: '#E8EDF5', fontSize: 'clamp(40px,6vw,72px)', fontFamily: 'var(--font-display, sans-serif)' }}>
            GET EARLY ACCESS.
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: '#8A96AA' }}>
            DispatchOS is in private beta — open to brokerages and owner-operators.
            Join the waitlist and get early access when your slot opens. Free to start.
          </p>

          {!submitted ? (
            <div className="space-y-4 text-left">
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: '#FF8C00' }}>
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@yourcompany.com"
                  className="w-full h-12 px-4 rounded-xl font-mono text-sm placeholder:text-[#3A4558] focus:outline-none transition-all"
                  style={{
                    background: '#1A2B3C',
                    border: '1px solid #3A4558',
                    color: '#E8EDF5',
                  }}
                  onFocus={e => e.target.style.borderColor = '#FF8C0060'}
                  onBlur={e => e.target.style.borderColor = '#3A4558'}
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-widest uppercase mb-2" style={{ color: '#FF8C00' }}>
                  Company or Operation Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Apex Freight · or · Independent Owner-Operator"
                  className="w-full h-12 px-4 rounded-xl font-mono text-sm placeholder:text-[#3A4558] focus:outline-none transition-all"
                  style={{
                    background: '#1A2B3C',
                    border: '1px solid #3A4558',
                    color: '#E8EDF5',
                  }}
                  onFocus={e => e.target.style.borderColor = '#FF8C0060'}
                  onBlur={e => e.target.style.borderColor = '#3A4558'}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting || !email || !company}
                className="w-full h-14 rounded-xl font-bold text-lg tracking-widest text-white transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: '#FF8C00', fontFamily: 'var(--font-display, sans-serif)' }}
              >
                {submitting ? 'JOINING...' : 'JOIN WAITLIST →'}
              </button>
              <p className="text-center font-mono text-xs" style={{ color: '#3A4558' }}>
                No spam · Free early access · Brokerages and owner-operators both welcome
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border p-10 text-center"
              style={{ background: 'rgba(52,211,153,0.05)', borderColor: 'rgba(52,211,153,0.25)' }}>
              <div className="text-4xl mb-4">✓</div>
              <div className="font-display text-3xl mb-3" style={{ color: '#34D399', fontFamily: 'var(--font-display, sans-serif)' }}>
                YOU&apos;RE ON THE LIST
              </div>
              <p style={{ color: '#8A96AA' }}>
                We&apos;ll send early access to <span style={{ color: '#34D399' }}>{email}</span> as soon as your slot opens. Stay tuned.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t py-10 px-6" style={{ borderColor: '#1A2B3C' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded" style={{ background: '#FF8C00' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L1 3.5v4c0 3 2.2 5.5 6 6.5 3.8-1 6-3.5 6-6.5v-4L7 1z" fill="white"/>
              </svg>
            </div>
            <span className="font-bold tracking-widest text-sm" style={{ color: '#E8EDF5', fontFamily: 'var(--font-display, sans-serif)' }}>
              DISPATCH<span style={{ color: '#FF8C00' }}>OS</span>
            </span>
            <span style={{ color: '#3A4558' }}>·</span>
            <span className="font-mono text-xs" style={{ color: '#3A4558' }}>by RadiusLead</span>
          </div>
          <div className="flex gap-6 font-mono text-xs" style={{ color: '#3A4558' }}>
            <Link href="/" className="hover:text-white transition-colors" style={{ color: '#3A4558' }}>RadiusLead Home</Link>
            <Link href="/trucking" className="hover:text-white transition-colors" style={{ color: '#3A4558' }}>Trucking Tools</Link>
            <a href="mailto:outreach@radiuslead.com" className="hover:text-white transition-colors" style={{ color: '#3A4558' }}>Contact</a>
          </div>
          <div className="font-mono text-xs" style={{ color: '#3A4558' }}>
            © 2025 DispatchOS · partnerships@radiuslead.com
          </div>
        </div>
      </footer>
    </div>
  )
}
