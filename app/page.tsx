'use client'

import Link from 'next/link'

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '600K+', label: 'Active Carriers' },
  { value: '50+',   label: 'Industries Covered' },
  { value: '48hrs', label: 'Avg. First Commission' },
  { value: '$500',  label: 'Top Single Referral' },
]

// ── Verticals ──────────────────────────────────────────────────────────────────
const VERTICALS = [
{
icon: '🚛',
title: 'Trucking & Freight',
desc:  'Are you a carrier overpaying on commercial insurance? Compare rates from specialists in 3 minutes — no agent calls required.',
href:  '/trucking',
stat:  '600K+ active carriers',
tags:  ['Commercial Insurance', 'Cargo Coverage', 'ELD Compliance', 'Business Continuity'],
color: 'amber',
},
{
icon: '🏥',
title: 'Healthcare Providers',
desc:  'Independent physicians and practice owners — compare health plan options for yourself and your staff without a broker.',
href:  '/go/ehealth',
stat:  '6M+ providers',
tags:  ['Medicare Advantage', 'ACA Plans', 'Group Health', 'Practice Benefits'],
color: 'blue',
},
{
icon: '💼',
title: 'Financial Advisors',
desc:  'Independent advisors looking to grow their book — connect with platforms that match you with qualified prospects.',
href:  '/go/smartasset',
stat:  '300K+ advisors',
tags:  ['Client Matching', 'Lead Platforms', 'AUM Growth', 'Practice Tools'],
color: 'green',
},
{
icon: '🏢',
title: 'Small Business Owners',
desc:  'Running payroll manually or on an outdated system? Compare modern payroll and accounting tools built for businesses your size.',
href:  '/go/gusto',
stat:  '30M+ businesses',
tags:  ['Payroll', 'Accounting', 'General Liability', 'Business Insurance'],
color: 'purple',
},
]

// ── How it works ───────────────────────────────────────────────────────────────
const STEPS = [
  { n: '01', title: 'Tell us about your situation', desc: 'Answer a few quick questions about your operation, practice, or business. Takes under 3 minutes. No sensitive data required up front.' },
  { n: '02', title: 'Get matched to the right options', desc: 'We surface carriers, platforms, and tools that specialise in your specific situation — not generic results that don\'t apply to you.' },
  { n: '03', title: 'Compare without pressure', desc: 'Review your options side by side. No agent calls, no follow-up unless you want it. The information is yours to act on.' },
  { n: '04', title: 'Switch if it makes sense', desc: 'If you find a better rate or a better fit, make the change. If not, you\'ve confirmed your current setup is competitive. Either way you win.' },
]

// ── Ticker items ───────────────────────────────────────────────────────────────
const TICKER = [
  'Simply Business · $75/quote',
  'Gusto · $500/company',
  'HubSpot · 30% recurring',
  'Samsara · $800/contract',
  'SelectQuote · $400/policy',
  'GoHealth · $200/enrollment',
  'Insureon · $80/lead',
  'QuickBooks · 30% recurring',
  'Progressive · $400/policy',
  'SmartAsset · $100/lead',
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink font-body">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ghost/30 bg-ink/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-amber flex items-center justify-center">
              <span className="font-display text-ink text-base leading-none">R</span>
            </div>
            <span className="font-display text-ice text-xl tracking-widest">RADIUSLEAD</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-mist">
            <Link href="/trucking"       className="hover:text-ice transition-colors">Trucking</Link>
            <Link href="/go/ehealth"     className="hover:text-ice transition-colors">Healthcare</Link>
            <Link href="/go/smartasset"  className="hover:text-ice transition-colors">Financial</Link>
            <Link href="/go/gusto"       className="hover:text-ice transition-colors">Business</Link>
          </div>
          <Link href="/trucking"
            className="btn-amber px-5 py-2 rounded text-sm font-display tracking-widest text-ink">
            GET LEADS →
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center grid-bg pt-16 overflow-hidden">

        {/* Background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber/5 blur-[120px] pointer-events-none"/>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber/3 blur-[80px] pointer-events-none"/>

        {/* Corner decorations */}
        <div className="absolute top-24 left-6 text-ghost/40 font-mono text-xs hidden lg:block">
          <div>DOT REGISTRY</div>
          <div>600,421 ACTIVE</div>
        </div>
        <div className="absolute top-24 right-6 text-ghost/40 font-mono text-xs text-right hidden lg:block">
          <div>LAST UPDATED</div>
          <div>LIVE FEED</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-5xl">

            {/* Eyebrow */}
            <div className="animate-fade-up flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-amber"/>
              <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">Precision Lead Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-ice leading-none mb-8 animate-fade-up delay-100">
              <span className="block text-[clamp(56px,10vw,140px)] leading-none">FIND LEADS.</span>
              <span className="block text-[clamp(56px,10vw,140px)] leading-none shimmer-text">EARN FAST.</span>
              <span className="block text-[clamp(56px,10vw,140px)] leading-none text-ghost/60">SCALE BIG.</span>
            </h1>

            {/* Sub */}
            <p className="text-mist text-lg md:text-xl max-w-2xl leading-relaxed mb-10 animate-fade-up delay-200">
              Verified business leads sourced from federal registries — DOT, NIPR, NPI, FINRA.
              Built for agents, advisors, and brokers who close deals, not just collect contacts.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link href="/trucking"
                className="btn-amber px-8 py-4 rounded-lg font-display tracking-widest text-ink text-lg">
                TRUCKING LEADS →
              </Link>
              <Link href="#how-it-works"
                className="btn-outline px-8 py-4 rounded-lg font-display tracking-widest text-lg">
                HOW IT WORKS
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-ghost/30 animate-fade-up delay-400">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-display text-amber text-4xl leading-none mb-1 text-amber-glow">{s.value}</div>
                  <div className="text-mist text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ghost text-xs animate-float">
          <span className="font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-ghost to-transparent"/>
        </div>
      </section>

      {/* ── Ticker ──────────────────────────────────────────────────────── */}
      <div className="bg-amber/10 border-y border-amber/20 py-3 overflow-hidden">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-8 font-mono text-sm text-amber">
                <span className="w-1 h-1 rounded-full bg-amber/60 flex-shrink-0"/>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Verticals ───────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-14 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber"/>
            <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">Lead Categories</span>
          </div>
          <h2 className="font-display text-ice text-5xl md:text-7xl leading-none">FIND YOUR<br/>MARKET.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VERTICALS.map((v, i) => (
            <Link key={v.title} href={v.href}
              className={`card-hover group relative rounded-xl border border-ghost/30 bg-slate p-8 overflow-hidden animate-fade-up delay-${(i+1)*100}`}>

              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>

              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div className="text-4xl">{v.icon}</div>
                <div className="font-mono text-xs text-ghost border border-ghost/30 rounded px-2 py-1">{v.stat}</div>
              </div>

              {/* Title */}
              <h3 className="font-display text-ice text-3xl md:text-4xl leading-none mb-3 group-hover:text-amber transition-colors duration-300">
                {v.title.toUpperCase()}
              </h3>

              {/* Desc */}
              <p className="text-mist text-sm leading-relaxed mb-6">{v.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {v.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs text-ghost border border-ghost/30 rounded px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-amber text-sm font-display tracking-widest">
                <span>EXPLORE LEADS</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-navy border-y border-ghost/20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber"/>
              <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">The System</span>
            </div>
            <h2 className="font-display text-ice text-5xl md:text-7xl leading-none">HOW IT<br/>WORKS.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ghost/20">
            {STEPS.map((step, i) => (
              <div key={step.n} className="bg-navy p-8 relative">
                {/* Number */}
                <div className="font-display text-ghost/20 text-7xl leading-none absolute top-6 right-6 select-none">
                  {step.n}
                </div>
                {/* Step number badge */}
                <div className="w-8 h-8 rounded-full border border-amber/30 flex items-center justify-center mb-6">
                  <span className="font-mono text-amber text-xs">{i+1}</span>
                </div>
                <h3 className="font-display text-ice text-2xl leading-tight mb-3">{step.title.toUpperCase()}</h3>
                <p className="text-mist text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="font-mono text-ghost text-xs tracking-[0.2em] uppercase">Data Sources</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {[
            { name: 'FMCSA SAFER', sub: 'Motor Carriers' },
            { name: 'NIPR',        sub: 'Insurance Agents' },
            { name: 'NPPES NPI',   sub: 'Healthcare' },
            { name: 'FINRA',       sub: 'Financial Advisors' },
            { name: 'DOT Open Data', sub: 'Transportation' },
          ].map(s => (
            <div key={s.name} className="text-center px-6 py-4 border border-ghost/20 rounded-lg bg-slate">
              <div className="font-display text-ice text-xl tracking-wider mb-1">{s.name}</div>
              <div className="font-mono text-ghost text-xs">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-amber my-12 mx-6 rounded-2xl amber-glow">
        <div className="absolute inset-0 grid-bg opacity-10"/>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
        <div className="relative max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="font-display text-ink text-5xl md:text-7xl leading-none mb-3">
              YOUR FIRST<br/>COMMISSION.
            </div>
            <p className="text-ink/70 max-w-lg">
              Trucking carriers in your state. Verified phone and email.
              Scored by insurance opportunity. Ready to contact today.
            </p>
          </div>
          <Link href="/trucking"
            className="flex-shrink-0 bg-ink text-ice px-10 py-5 rounded-xl font-display text-xl tracking-widest hover:bg-slate transition-colors">
            START NOW →
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-ghost/20 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber flex items-center justify-center">
              <span className="font-display text-ink text-sm leading-none">R</span>
            </div>
            <span className="font-display text-mist tracking-widest">RADIUSLEAD</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-ghost">
            <Link href="/trucking"      className="hover:text-mist transition-colors">Trucking</Link>
            <Link href="/go/ehealth"    className="hover:text-mist transition-colors">Healthcare</Link>
            <Link href="/go/smartasset" className="hover:text-mist transition-colors">Financial</Link>
            <Link href="/go/gusto"      className="hover:text-mist transition-colors">Business</Link>
          </div>
          <div className="text-ghost text-xs font-mono">
            © 2025 RADIUSLEAD · outreach@radiuslead.com
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-6 pt-6 border-t border-ghost/10">
          <p className="text-ghost/50 text-xs font-mono leading-relaxed">
            RadiusLead earns referral commissions when you use our links to sign up for products and services.
            This does not affect the price you pay. All data sourced from public federal registries.
          </p>
        </div>
      </footer>

    </div>
  )
}
