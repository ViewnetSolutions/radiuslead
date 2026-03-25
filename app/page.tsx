'use client'

import Link from 'next/link'
import { Nav } from '@/components/Nav'

const STATS = [
  { value: '600K+', label: 'Active Carriers' },
  { value: '50+',   label: 'Industries Covered' },
  { value: '48hrs', label: 'Avg. First Commission' },
  { value: '$500',  label: 'Top Single Referral' },
]

// ── Vertical icons — amber-tinted SVGs, consistent 40×40, no emojis ──────────

const TruckIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="10" fill="#F5A623" fillOpacity="0.08"/>
    {/* Trailer */}
    <rect x="5" y="15" width="21" height="13" rx="2" stroke="#F5A623" strokeWidth="1.6" fill="none"/>
    {/* Cab */}
    <path d="M26 18h7l4 6v4H26V18z" stroke="#F5A623" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
    {/* Cab window */}
    <path d="M27 19.5h5l2.5 4H27v-4z" fill="#F5A623" fillOpacity="0.18"/>
    {/* Wheels */}
    <circle cx="11"  cy="29" r="2.8" stroke="#F5A623" strokeWidth="1.5" fill="none"/>
    <circle cx="20"  cy="29" r="2.8" stroke="#F5A623" strokeWidth="1.5" fill="none"/>
    <circle cx="32"  cy="29" r="2.8" stroke="#F5A623" strokeWidth="1.5" fill="none"/>
    {/* Chassis line */}
    <line x1="5" y1="28" x2="37" y2="28" stroke="#F5A623" strokeWidth="1" strokeOpacity="0.3"/>
    {/* Road dash */}
    <line x1="4" y1="36" x2="40" y2="36" stroke="#F5A623" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="4 4"/>
  </svg>
)

const HealthIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="10" fill="#14B8A6" fillOpacity="0.08"/>
    {/* Hospital building */}
    <rect x="8" y="12" width="28" height="26" rx="2" stroke="#14B8A6" strokeWidth="1.6" fill="none"/>
    {/* Roof line / pediment */}
    <path d="M6 13l16-7 16 7" stroke="#14B8A6" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
    {/* Cross */}
    <rect x="19" y="18" width="6" height="12" rx="1.5" fill="#14B8A6" fillOpacity="0.7"/>
    <rect x="16" y="21" width="12" height="6" rx="1.5" fill="#14B8A6" fillOpacity="0.7"/>
    {/* Door */}
    <rect x="18" y="30" width="8" height="8" rx="1" stroke="#14B8A6" strokeWidth="1.2" fill="none"/>
    {/* Windows */}
    <rect x="10" y="16" width="5" height="5" rx="1" fill="#14B8A6" fillOpacity="0.2" stroke="#14B8A6" strokeWidth="0.8"/>
    <rect x="29" y="16" width="5" height="5" rx="1" fill="#14B8A6" fillOpacity="0.2" stroke="#14B8A6" strokeWidth="0.8"/>
  </svg>
)

const AdvisorIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="10" fill="#60A5FA" fillOpacity="0.08"/>
    {/* Rising bar chart */}
    <rect x="7"  y="26" width="6" height="12" rx="1" fill="#60A5FA" fillOpacity="0.45"/>
    <rect x="15" y="20" width="6" height="18" rx="1" fill="#60A5FA" fillOpacity="0.65"/>
    <rect x="23" y="13" width="6" height="25" rx="1" fill="#60A5FA" fillOpacity="0.85"/>
    <rect x="31" y="17" width="6" height="21" rx="1" fill="#60A5FA" fillOpacity="0.65"/>
    {/* Trend line */}
    <path d="M10 26 L18 20 L26 13 L34 17" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Dot markers */}
    <circle cx="10" cy="26" r="2" fill="#BFDBFE"/>
    <circle cx="18" cy="20" r="2" fill="#BFDBFE"/>
    <circle cx="26" cy="13" r="2" fill="#BFDBFE"/>
    <circle cx="34" cy="17" r="2" fill="#BFDBFE"/>
    {/* Baseline */}
    <line x1="5" y1="38" x2="39" y2="38" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.4" strokeLinecap="round"/>
  </svg>
)

const BusinessIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect width="44" height="44" rx="10" fill="#A78BFA" fillOpacity="0.08"/>
    {/* Office building */}
    <rect x="10" y="8" width="24" height="30" rx="2" stroke="#A78BFA" strokeWidth="1.6" fill="none"/>
    {/* Floor lines */}
    <line x1="10" y1="16" x2="34" y2="16" stroke="#A78BFA" strokeWidth="0.8" strokeOpacity="0.4"/>
    <line x1="10" y1="24" x2="34" y2="24" stroke="#A78BFA" strokeWidth="0.8" strokeOpacity="0.4"/>
    {/* Windows — floor 1 */}
    <rect x="13" y="10" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.35"/>
    <rect x="20" y="10" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.35"/>
    <rect x="27" y="10" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.35"/>
    {/* Windows — floor 2 */}
    <rect x="13" y="18" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.25"/>
    <rect x="20" y="18" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.35"/>
    <rect x="27" y="18" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.25"/>
    {/* Windows — floor 3 */}
    <rect x="13" y="26" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.2"/>
    <rect x="27" y="26" width="4" height="4" rx="0.5" fill="#A78BFA" fillOpacity="0.2"/>
    {/* Door */}
    <rect x="19" y="30" width="6" height="8" rx="1" stroke="#A78BFA" strokeWidth="1.2" fill="none"/>
  </svg>
)

const VERTICALS = [
  {
    Icon:  TruckIcon,
    title: 'Trucking & Freight',
    desc:  'Are you a carrier overpaying on commercial insurance? Compare rates from specialists in 3 minutes — no agent calls required.',
    href:  '/trucking',
    stat:  '600K+ active carriers',
    tags:  ['Commercial Insurance', 'Cargo Coverage', 'ELD Compliance', 'Business Continuity'],
    accent: '#F5A623',
  },
  {
    Icon:  HealthIcon,
    title: 'Healthcare Providers',
    desc:  'Independent physicians and practice owners — compare health plan options for yourself and your staff without a broker.',
    href:  '/go/ehealth',
    stat:  '6M+ providers',
    tags:  ['Medicare Advantage', 'ACA Plans', 'Group Health', 'Practice Benefits'],
    accent: '#14B8A6',
  },
  {
    Icon:  AdvisorIcon,
    title: 'Financial Advisors',
    desc:  'Independent advisors looking to grow their book — connect with platforms that match you with qualified prospects.',
    href:  '/go/smartasset',
    stat:  '300K+ advisors',
    tags:  ['Client Matching', 'Lead Platforms', 'AUM Growth', 'Practice Tools'],
    accent: '#60A5FA',
  },
  {
    Icon:  BusinessIcon,
    title: 'Small Business Owners',
    desc:  'Running payroll manually or on an outdated system? Compare modern payroll and accounting tools built for businesses your size.',
    href:  '/go/gusto',
    stat:  '30M+ businesses',
    tags:  ['Payroll', 'Accounting', 'General Liability', 'Business Insurance'],
    accent: '#A78BFA',
  },
]

const STEPS = [
  { n: '01', title: 'Tell us about your situation',     desc: 'Answer a few quick questions about your operation, practice, or business. Takes under 3 minutes. No sensitive data required up front.' },
  { n: '02', title: 'Get matched to the right options', desc: "We surface carriers, platforms, and tools that specialise in your specific situation — not generic results that don't apply to you." },
  { n: '03', title: 'Compare without pressure',         desc: "Review your options side by side. No agent calls, no follow-up unless you want it. The information is yours to act on." },
  { n: '04', title: 'Switch if it makes sense',         desc: "If you find a better rate or a better fit, make the change. If not, you've confirmed your current setup is competitive. Either way you win." },
]

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

// ── Custom SVG icons for data source trust strip ──────────────────────────────
function FMCSAIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <path d="M19 3L5 9v11c0 7.5 5.8 14.5 14 16.5 8.2-2 14-9 14-16.5V9L19 3z" fill="#1E3A6E" stroke="#3B82F6" strokeWidth="1.3"/>
      <rect x="8" y="16" width="13" height="9" rx="1" fill="none" stroke="#93C5FD" strokeWidth="1.3"/>
      <path d="M21 18h5l3 5v3h-8V18z" fill="none" stroke="#93C5FD" strokeWidth="1.3"/>
      <circle cx="12" cy="26" r="1.8" fill="#93C5FD"/>
      <circle cx="18" cy="26" r="1.8" fill="#93C5FD"/>
      <circle cx="25" cy="26" r="1.8" fill="#93C5FD"/>
      <rect x="8" y="12" width="13" height="4" rx="0.5" fill="#1E3A6E" stroke="#3B82F6" strokeWidth="0.8"/>
      <text x="14.5" y="15.2" textAnchor="middle" fill="#93C5FD" fontSize="3.2" fontWeight="bold" fontFamily="monospace">FMCSA</text>
    </svg>
  )
}
function NIRPIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <path d="M19 3L4 9v11c0 8 6 15 15 17 9-2 15-9 15-17V9L19 3z" fill="#7F1D1D" stroke="#F87171" strokeWidth="1.3"/>
      <text x="19" y="22" textAnchor="middle" fill="#FCA5A5" fontSize="14" fontWeight="900" fontFamily="monospace">N</text>
      <text x="19" y="29" textAnchor="middle" fill="#F87171" fontSize="4" fontWeight="bold" fontFamily="monospace">NIPR</text>
      <circle cx="10" cy="11" r="1" fill="#FCA5A5" fillOpacity="0.6"/>
      <circle cx="19" cy="8" r="1" fill="#FCA5A5" fillOpacity="0.6"/>
      <circle cx="28" cy="11" r="1" fill="#FCA5A5" fillOpacity="0.6"/>
    </svg>
  )
}
function NPIIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="15" fill="#134E4A" stroke="#14B8A6" strokeWidth="1.3"/>
      <rect x="16" y="9" width="6" height="20" rx="2" fill="#14B8A6" fillOpacity="0.85"/>
      <rect x="9" y="16" width="20" height="6" rx="2" fill="#14B8A6" fillOpacity="0.85"/>
      <circle cx="28" cy="10" r="6" fill="#0A3228" stroke="#14B8A6" strokeWidth="1"/>
      <text x="28" y="11.8" textAnchor="middle" fill="#5EEAD4" fontSize="3.8" fontWeight="bold" fontFamily="monospace">CMS</text>
    </svg>
  )
}
function FINRAIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect x="4" y="22" width="6" height="10" rx="1" fill="#3B82F6" fillOpacity="0.6"/>
      <rect x="12" y="16" width="6" height="16" rx="1" fill="#3B82F6" fillOpacity="0.8"/>
      <rect x="20" y="10" width="6" height="22" rx="1" fill="#60A5FA"/>
      <rect x="28" y="14" width="6" height="18" rx="1" fill="#3B82F6" fillOpacity="0.7"/>
      <path d="M7 22 L15 16 L23 10 L31 14" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="22" r="1.5" fill="#BFDBFE"/>
      <circle cx="15" cy="16" r="1.5" fill="#BFDBFE"/>
      <circle cx="23" cy="10" r="1.5" fill="#BFDBFE"/>
      <circle cx="31" cy="14" r="1.5" fill="#BFDBFE"/>
      <line x1="3" y1="32" x2="33" y2="32" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="1" y="1" width="18" height="8" rx="1.5" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="0.8"/>
      <text x="10" y="6.5" textAnchor="middle" fill="#93C5FD" fontSize="4.5" fontWeight="bold" fontFamily="monospace">FINRA</text>
    </svg>
  )
}
function DOTIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <path d="M19 2L3 9v12c0 9 7 17 16 19 9-2 16-10 16-19V9L19 2z" fill="#78350F" stroke="#F59E0B" strokeWidth="1.3"/>
      <path d="M5 26 Q19 18 33 26" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M8 30 Q19 23 30 30" stroke="#D97706" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M13 28 L15 27.2" stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M18 25.8 L20 25" stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M23 24 L25 23.3" stroke="#FCD34D" strokeWidth="1.2" strokeLinecap="round"/>
      <text x="19" y="17" textAnchor="middle" fill="#FCD34D" fontSize="7" fontWeight="900" fontFamily="monospace">DOT</text>
    </svg>
  )
}

const SOURCES = [
  { href: 'https://safer.fmcsa.dot.gov',       name: 'FMCSA SAFER', sub: 'Motor Carriers',       count: '600K+ records', label: 'Live · daily', accent: '#3B82F6', bg: '#1E3A6E', icon: <FMCSAIcon/> },
  { href: 'https://www.nipr.com',               name: 'NIPR',        sub: 'Insurance Agents',     count: 'All 50 states', label: 'Live · daily', accent: '#F87171', bg: '#7F1D1D', icon: <NIRPIcon/>  },
  { href: 'https://npiregistry.cms.hhs.gov',    name: 'NPPES NPI',   sub: 'Healthcare Providers', count: '6M+ providers', label: 'Free · no key', accent: '#14B8A6', bg: '#134E4A', icon: <NPIIcon/>   },
  { href: 'https://brokercheck.finra.org',      name: 'FINRA',       sub: 'Financial Advisors',   count: 'BrokerCheck',   label: 'Live · daily', accent: '#60A5FA', bg: '#1E3A8A', icon: <FINRAIcon/> },
  { href: 'https://data.transportation.gov',    name: 'DOT Open Data', sub: 'Transportation',    count: 'data.gov portal', label: 'Free · no key', accent: '#F59E0B', bg: '#78350F', icon: <DOTIcon/>  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink font-body">

      <Nav
        rightSlot={
          <Link href="/trucking" className="btn-amber px-5 py-2 rounded text-sm font-display tracking-widest text-ink">
            GET LEADS →
          </Link>
        }
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center grid-bg pt-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber/5 blur-[120px] pointer-events-none"/>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber/3 blur-[80px] pointer-events-none"/>
        <div className="absolute top-24 left-6 text-ghost/40 font-mono text-xs hidden lg:block">
          <div>DOT REGISTRY</div><div>600,421 ACTIVE</div>
        </div>
        <div className="absolute top-24 right-6 text-ghost/40 font-mono text-xs text-right hidden lg:block">
          <div>LAST UPDATED</div><div>LIVE FEED</div>
        </div>
        <div className="max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-5xl">
            <div className="animate-fade-up flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-amber"/>
              <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">Precision Lead Intelligence</span>
            </div>
            <h1 className="font-display text-ice leading-none mb-8 animate-fade-up delay-100">
              <span className="block text-[clamp(56px,10vw,140px)] leading-none">FIND LEADS.</span>
              <span className="block text-[clamp(56px,10vw,140px)] leading-none shimmer-text">EARN FAST.</span>
              <span className="block text-[clamp(56px,10vw,140px)] leading-none text-ghost/60">SCALE BIG.</span>
            </h1>
            <p className="text-mist text-lg md:text-xl max-w-2xl leading-relaxed mb-10 animate-fade-up delay-200">
              Verified business leads sourced from federal registries — DOT, NIPR, NPI, FINRA.
              Built for agents, advisors, and brokers who close deals, not just collect contacts.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link href="/trucking" className="btn-amber px-8 py-4 rounded-lg font-display tracking-widest text-ink text-lg">
                TRUCKING LEADS →
              </Link>
              <Link href="#how-it-works" className="btn-outline px-8 py-4 rounded-lg font-display tracking-widest text-lg">
                HOW IT WORKS
              </Link>
            </div>
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ghost text-xs animate-float">
          <span className="font-mono tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-ghost to-transparent"/>
        </div>
      </section>

      {/* Ticker */}
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

      {/* Verticals — SVG icon cards */}
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${v.accent}08, transparent 70%)` }}/>
              <div className="flex items-start justify-between mb-6">
                <v.Icon/>
                <div className="font-mono text-xs text-ghost border border-ghost/30 rounded px-2 py-1">{v.stat}</div>
              </div>
              <h3 className="font-display text-ice text-3xl md:text-4xl leading-none mb-3 transition-colors duration-300"
                style={{ color: undefined }}
                onMouseEnter={e => (e.currentTarget.style.color = v.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = '')}>
                {v.title.toUpperCase()}
              </h3>
              <p className="text-mist text-sm leading-relaxed mb-6">{v.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {v.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs text-ghost border border-ghost/30 rounded px-2 py-1">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm font-display tracking-widest" style={{ color: v.accent }}>
                <span>EXPLORE LEADS</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
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
                <div className="font-display text-ghost/20 text-7xl leading-none absolute top-6 right-6 select-none">{step.n}</div>
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

      {/* Trust strip */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-amber"/>
            <span className="font-mono text-ghost text-xs tracking-[0.2em] uppercase">Verified Data Sources</span>
            <div className="h-px w-8 bg-amber"/>
          </div>
          <p className="text-ghost text-xs font-mono">All data sourced directly from official US federal registries — public domain, updated daily</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SOURCES.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 px-4 py-6 rounded-xl border border-ghost/20 bg-slate transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = s.accent + '55'
                el.style.background  = s.accent + '0A'
                el.style.boxShadow   = `0 0 24px ${s.accent}18`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = ''
                el.style.background  = ''
                el.style.boxShadow   = ''
              }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{ background: s.bg + '66', border: `1px solid ${s.accent}30` }}>
                {s.icon}
              </div>
              <div className="text-center">
                <div className="font-display text-ice text-base tracking-wide leading-tight mb-0.5">{s.name}</div>
                <div className="font-mono text-ghost text-xs">{s.sub}</div>
                <div className="font-mono text-xs mt-1.5" style={{ color: s.accent + 'AA' }}>{s.count}</div>
              </div>
              <div className="flex items-center gap-1.5 mt-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                <span className="font-mono text-[#3A4558] text-xs">{s.label}</span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-center font-mono text-[#3A4558] text-xs mt-8">
          All registries are official US government sources · Public domain · No scraping required
        </p>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-amber my-12 mx-6 rounded-2xl amber-glow">
        <div className="absolute inset-0 grid-bg opacity-10"/>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"/>
        <div className="relative max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="font-display text-ink text-5xl md:text-7xl leading-none mb-3">YOUR FIRST<br/>COMMISSION.</div>
            <p className="text-ink/70 max-w-lg">Trucking carriers in your state. Verified phone and email. Scored by insurance opportunity. Ready to contact today.</p>
          </div>
          <Link href="/trucking" className="flex-shrink-0 bg-ink text-ice px-10 py-5 rounded-xl font-display text-xl tracking-widest hover:bg-slate transition-colors">
            START NOW →
          </Link>
        </div>
      </section>

      {/* Footer */}
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
          <div className="text-ghost text-xs font-mono">© 2025 RADIUSLEAD · partnerships@radiuslead.com</div>
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
