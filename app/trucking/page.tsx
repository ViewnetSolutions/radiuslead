'use client'

import Link from 'next/link'

// ── This page talks TO carriers — not to agents ───────────────────────────────
// Goal: get a trucker to click through to an insurance quote comparison
// Voice: direct, plain-spoken, practical — like a knowledgeable industry peer

const PAIN_POINTS = [
  {
    icon: '📉',
    heading: 'Overpaying on renewal',
    body: 'Most carriers haven\'t compared rates in 2+ years. The average small fleet overpays by $2,000–$6,000 annually simply by staying with the same carrier.',
  },
  {
    icon: '⚠️',
    heading: 'Conditional safety rating',
    body: 'A Conditional FMCSA rating can trigger premium spikes or non-renewal at your next policy date — often without warning. You need options before that happens.',
  },
  {
    icon: '🚨',
    heading: 'Coverage gaps you don\'t know about',
    body: 'Primary liability is the minimum. Most carriers are missing cargo coverage at full value, bobtail protection, and business interruption — until a claim makes it obvious.',
  },
  {
    icon: '📋',
    heading: 'New authority, no history',
    body: 'New carriers with no safety rating often get quoted the highest rates by default. There are carriers that specialise in new authority — most agents won\'t find them for you.',
  },
]

const COVERAGE_TYPES = [
  { name: 'Primary Auto Liability',      required: true,  detail: 'Federal minimum $750K · Most shippers require $1M+' },
  { name: 'Motor Truck Cargo',           required: true,  detail: 'Covers freight loss or damage while in your care' },
  { name: 'Physical Damage',             required: true,  detail: 'Collision, theft, fire — based on replacement value' },
  { name: 'Non-Trucking Liability',      required: false, detail: 'Covers you when driving off-dispatch (bobtail)' },
  { name: "Workers' Compensation",       required: false, detail: 'Required by most states when you have employed drivers' },
  { name: 'Business Interruption',       required: false, detail: 'Replaces lost income if trucks are forced off the road' },
  { name: 'General Liability',           required: false, detail: 'Premises, loading dock incidents, completed operations' },
  { name: 'Umbrella / Excess Liability', required: false, detail: 'Additional limits above your primary policy' },
]

const FAQS = [
  {
    q: 'How long does a quote comparison take?',
    a: 'About 3 minutes. You provide basic information about your operation — DOT number, fleet size, cargo type — and receive quotes from multiple carriers that specialise in commercial trucking.',
  },
  {
    q: 'Do I have to talk to an agent?',
    a: 'No. The comparison process is online. If you want to speak with someone before binding, that option is available — but it\'s not required to get your quotes.',
  },
  {
    q: 'Will this affect my current policy?',
    a: 'No. Getting quotes is not a commitment. You can compare and decide whether switching makes financial sense without touching your current coverage.',
  },
  {
    q: 'I have a Conditional safety rating. Can I still get quotes?',
    a: 'Yes — and this is exactly the right time to shop. Several carriers in the comparison specialise in Conditional-rated fleets and offer competitive rates with risk management programs that can help improve your score.',
  },
  {
    q: 'What\'s the federal liability minimum?',
    a: 'For general freight, $750K. For household goods, $300K. For hazmat, $1M–$5M depending on commodity. Many shippers and brokers now require $1M regardless of federal minimums.',
  },
]

export default function TruckingPage() {
  return (
    <div className="min-h-screen bg-ink font-body">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ghost/30 bg-ink/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-amber flex items-center justify-center">
              <span className="font-display text-ink text-base leading-none">R</span>
            </div>
            <span className="font-display text-ice text-xl tracking-widest">RADIUSLEAD</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 font-mono text-ghost text-xs">
            <span>FOR CARRIERS</span>
            <span className="text-ghost/40">·</span>
            <span>TRUCKING INSURANCE</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/trucking/lookup"    className="text-mist text-xs hover:text-amber transition-colors font-mono">DOT LOOKUP</Link>
            <span className="text-ghost/40">·</span>
            <Link href="/trucking/estimate"  className="text-mist text-xs hover:text-amber transition-colors font-mono">ESTIMATOR</Link>
            <span className="text-ghost/40">·</span>
            <Link href="/trucking/coverage"  className="text-mist text-xs hover:text-amber transition-colors font-mono">GAP CHECKER</Link>
          </div>
          <Link href="/go/insurance"
            className="btn-amber px-5 py-2 rounded text-sm font-display tracking-widest text-ink">
            COMPARE QUOTES →
          </Link>
        </div>
      </nav>

      {/* ── Hero — talking TO carriers ──────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none"/>
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-amber/4 blur-[100px] pointer-events-none -translate-y-1/2"/>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 animate-fade-up">
            <div className="h-px w-8 bg-amber"/>
            <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">For Owner-Operators & Fleet Managers</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-display text-ice leading-none mb-6 animate-fade-up delay-100">
                <span className="block text-[clamp(48px,7vw,96px)] leading-none">STOP</span>
                <span className="block text-[clamp(48px,7vw,96px)] leading-none shimmer-text">OVERPAYING</span>
                <span className="block text-[clamp(48px,7vw,96px)] leading-none">FOR COVERAGE.</span>
              </h1>

              <p className="text-mist text-lg leading-relaxed mb-4 animate-fade-up delay-200">
                Most trucking companies haven&apos;t shopped their commercial insurance in over two years.
                In that time, your fleet has changed, the market has changed, and you&apos;re likely
                paying rates that no longer reflect your actual risk profile.
              </p>
              <p className="text-mist text-lg leading-relaxed mb-8 animate-fade-up delay-300">
                A free 3-minute comparison across carriers that specialise in commercial trucking —
                not the same generic business insurance your current agent sells to everyone.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
                <Link href="/go/insurance"
                  className="btn-amber px-8 py-4 rounded-lg font-display tracking-widest text-ink text-lg">
                  GET FREE QUOTES →
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-ghost/20 animate-fade-up delay-500">
                {[
                  { v: '3 min',   l: 'to compare' },
                  { v: '$0',      l: 'cost to you' },
                  { v: '10+',     l: 'carriers compared' },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-display text-amber text-3xl">{s.v}</div>
                    <div className="text-ghost text-xs font-mono mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card — what you get */}
            <div className="bg-slate rounded-2xl border border-ghost/30 p-8 animate-fade-up delay-300">
              <div className="font-mono text-amber text-xs tracking-widest uppercase mb-6">
                What the comparison covers
              </div>
              <div className="space-y-4">
                {COVERAGE_TYPES.map(c => (
                  <div key={c.name} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      c.required
                        ? 'bg-amber/20 border border-amber/40'
                        : 'bg-ghost/15 border border-ghost/25'
                    }`}>
                      {c.required
                        ? <span className="text-amber text-xs font-bold">✓</span>
                        : <span className="text-ghost text-xs">+</span>
                      }
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${c.required ? 'text-ice' : 'text-mist'}`}>
                        {c.name}
                        {c.required && <span className="ml-2 font-mono text-xs text-amber/70">required</span>}
                      </div>
                      <div className="text-ghost text-xs leading-snug mt-0.5">{c.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/go/insurance"
                className="mt-8 w-full btn-amber px-4 py-3 rounded-lg font-display tracking-widest text-ink text-sm flex items-center justify-center gap-2">
                SEE MY RATES →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain points — why carriers should act ──────────────────────── */}
      <section className="bg-navy border-y border-ghost/20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber"/>
              <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">Common Situations</span>
            </div>
            <h2 className="font-display text-ice text-4xl md:text-6xl leading-none">
              DOES ANY OF<br/>THIS SOUND FAMILIAR?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAIN_POINTS.map((p, i) => (
              <div key={p.heading}
                className={`rounded-xl border border-ghost/25 bg-slate p-8 animate-fade-up delay-${(i+1)*100}`}>
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-display text-ice text-2xl leading-tight mb-3">{p.heading.toUpperCase()}</h3>
                <p className="text-mist text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/go/insurance"
              className="btn-amber inline-flex px-10 py-4 rounded-lg font-display tracking-widest text-ink text-lg">
              COMPARE YOUR RATES NOW →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Free Tools strip ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-amber"/>
          <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">Free Tools — No Signup Required</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/trucking/lookup',   icon: '🔍', title: 'DOT Safety Lookup',          desc: 'Enter any USDOT number and see the carrier\'s safety rating, fleet size, contact info, and estimated premium range instantly.', cta: 'Look up a DOT number' },
            { href: '/trucking/estimate', icon: '💰', title: 'Premium Estimator',           desc: 'Get a ballpark annual premium across all major coverage lines based on your fleet size, cargo type, state, and safety rating.', cta: 'Estimate my premiums' },
            { href: '/trucking/coverage', icon: '✅', title: 'Coverage Gap Checker',       desc: 'Answer 10 yes/no questions about your current policies. We identify exactly which coverages you\'re missing and why they matter.', cta: 'Check my coverage gaps' },
          ].map(tool => (
            <Link key={tool.href} href={tool.href}
              className="card-hover group rounded-xl border border-ghost/25 bg-slate p-6">
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="font-display text-ice text-xl leading-tight mb-2 group-hover:text-amber transition-colors">{tool.title.toUpperCase()}</h3>
              <p className="text-mist text-sm leading-relaxed mb-4">{tool.desc}</p>
              <div className="flex items-center gap-2 text-amber text-xs font-mono">
                <span>{tool.cta}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works for the carrier ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber"/>
            <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">The Process</span>
          </div>
          <h2 className="font-display text-ice text-4xl md:text-6xl leading-none">HOW THE<br/>COMPARISON WORKS.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ghost/15 rounded-xl overflow-hidden">
          {[
            { n: '01', title: 'Tell us about your operation', desc: 'DOT number, fleet size, cargo type, and current renewal date. Takes about 3 minutes. No sensitive financial information required.' },
            { n: '02', title: 'See quotes from specialists', desc: 'Multiple carriers that focus on commercial trucking — not generic business insurance. Rates specific to your fleet profile and operating history.' },
            { n: '03', title: 'Decide with no pressure', desc: 'Review your options. If you find a better rate, switch. If your current coverage is competitive, stay. Either way you have the information.' },
          ].map((step, i) => (
            <div key={step.n} className={`bg-slate p-8 relative animate-fade-up delay-${(i+1)*100}`}>
              <div className="font-display text-ghost/15 text-8xl leading-none absolute top-4 right-4 select-none">{step.n}</div>
              <div className="w-8 h-8 rounded-full border border-amber/30 flex items-center justify-center mb-6">
                <span className="font-mono text-amber text-xs">{i + 1}</span>
              </div>
              <h3 className="font-display text-ice text-2xl leading-tight mb-3">{step.title.toUpperCase()}</h3>
              <p className="text-mist text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BCI callout ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="rounded-2xl border border-amber/20 bg-amber/5 p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 font-display text-amber/5 text-[200px] leading-none select-none pointer-events-none -translate-y-8">BCI</div>
          <div className="relative max-w-2xl">
            <div className="font-mono text-amber text-xs tracking-[0.2em] uppercase mb-4">Often Overlooked by Carriers</div>
            <h3 className="font-display text-ice text-4xl md:text-5xl leading-none mb-4">
              WHAT HAPPENS IF<br/>YOUR TRUCKS STOP?
            </h3>
            <p className="text-mist leading-relaxed mb-6">
              A major accident, fire, or weather event puts your trucks off the road for 30–90 days.
              Your primary liability covers the other party. Your physical damage covers the truck.
              But <span className="text-ice font-medium">nothing covers the income you lose while you&apos;re down</span> —
              unless you have business interruption coverage.
            </p>
            <p className="text-mist leading-relaxed mb-6">
              For a 5-truck fleet, a 60-day shutdown is <span className="text-amber font-medium">$40,000+ in lost revenue</span>.
              Most carriers don&apos;t carry this coverage because nobody explained it to them at renewal.
              It&apos;s included in the comparison.
            </p>
            <Link href="/go/insurance"
              className="btn-amber inline-flex px-8 py-4 rounded-lg font-display tracking-widest text-ink">
              CHECK IF YOU&apos;RE COVERED →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-navy border-t border-ghost/20 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber"/>
              <span className="font-mono text-amber text-xs tracking-[0.2em] uppercase">Common Questions</span>
            </div>
            <h2 className="font-display text-ice text-4xl md:text-5xl leading-none">WHAT CARRIERS<br/>ASK US.</h2>
          </div>

          <div className="space-y-px">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-ghost/20 bg-slate rounded-lg p-6">
                <div className="flex gap-4">
                  <span className="font-mono text-amber text-sm flex-shrink-0 mt-0.5">Q.</span>
                  <div>
                    <div className="font-semibold text-ice mb-2">{faq.q}</div>
                    <div className="text-mist text-sm leading-relaxed">{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/go/insurance"
              className="btn-amber inline-flex px-10 py-4 rounded-lg font-display tracking-widest text-ink text-lg">
              GET YOUR FREE COMPARISON →
            </Link>
            <div className="mt-4 font-mono text-ghost text-xs">No obligation · No agent calls required · 3 minutes</div>
          </div>
        </div>
      </section>

      {/* ── Disclosure + footer ──────────────────────────────────────────── */}
      <footer className="border-t border-ghost/20 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber flex items-center justify-center">
              <span className="font-display text-ink text-sm leading-none">R</span>
            </div>
            <span className="font-display text-mist tracking-widest">RADIUSLEAD</span>
          </Link>
          <p className="text-ghost/50 text-xs font-mono text-center max-w-md">
            RadiusLead earns a referral fee from insurance carriers when you use our comparison link.
            This does not affect your quote or the rates you are shown.
          </p>
          <div className="text-ghost text-xs font-mono">outreach@radiuslead.com</div>
        </div>
      </footer>

    </div>
  )
}
