'use client'

import { useState } from 'react'
import Link from 'next/link'

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV',
  'NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN',
  'TX','UT','VT','VA','WA','WV','WI','WY',
]

// State risk multipliers (high-traffic, litigation-heavy states cost more)
const STATE_MULT: Record<string, number> = {
  CA: 1.35, FL: 1.25, NY: 1.30, TX: 1.15, IL: 1.20,
  NJ: 1.28, PA: 1.18, OH: 1.10, GA: 1.12, MI: 1.15,
  WA: 1.18, CO: 1.10, AZ: 1.08, NC: 1.05, VA: 1.08,
}

function calcEstimate(
  trucks:     number,
  cargo:      string,
  hazmat:     boolean,
  rating:     string,
  state:      string,
  experience: string,
): { primaryLiability: [number,number]; cargo: [number,number]; physDamage: [number,number]; bobtail: [number,number]; bci: [number,number]; total: [number,number] } {
  const stateMult  = STATE_MULT[state] ?? 1.0
  const ratingMult = rating === 'conditional' ? 1.30 : rating === 'not_rated' ? 1.15 : 1.0
  const expMult    = experience === 'new' ? 1.25 : experience === '1-2' ? 1.10 : 1.0
  const hazMult    = hazmat ? 1.4 : 1.0
  const mult       = stateMult * ratingMult * expMult * hazMult

  // Base per-truck annual premium (primary liability at $1M)
  const baseLiab =
    trucks === 1 ? [7500,  14000] :
    trucks <= 5  ? [6500,  12000] :
    trucks <= 10 ? [5800,  10000] :
    trucks <= 50 ? [5200,   9000] :
                   [4800,   8000]

  const primaryLiability: [number,number] = [
    Math.round(baseLiab[0] * trucks * mult),
    Math.round(baseLiab[1] * trucks * mult),
  ]

  // Cargo (varies by cargo type)
  const cargoBase =
    cargo === 'general'      ? [800,  2500] :
    cargo === 'refrigerated' ? [1200, 3500] :
    cargo === 'chemicals'    ? [2000, 6000] :
    cargo === 'vehicles'     ? [900,  2800] :
    cargo === 'household'    ? [1000, 3000] :
                               [800,  2500]
  const cargoEst: [number,number] = [
    Math.round(cargoBase[0] * trucks * (hazmat ? 1.5 : 1.0)),
    Math.round(cargoBase[1] * trucks * (hazmat ? 1.5 : 1.0)),
  ]

  // Physical damage (per truck)
  const physBase = [1800, 5500]
  const physDamage: [number,number] = [
    Math.round(physBase[0] * trucks * 0.9),
    Math.round(physBase[1] * trucks),
  ]

  // Bobtail (flat-ish regardless of fleet size)
  const bobtail: [number,number] = [
    Math.round(350  * (trucks > 5 ? 0.7 : 1)),
    Math.round(1200 * (trucks > 5 ? 0.7 : 1)),
  ]

  // Business continuity
  const bciBase = trucks === 1 ? [600, 2000] : trucks <= 10 ? [1500, 6000] : [4000, 15000]
  const bci: [number,number] = [bciBase[0], bciBase[1]]

  const total: [number,number] = [
    primaryLiability[0] + cargoEst[0] + physDamage[0] + bobtail[0] + bci[0],
    primaryLiability[1] + cargoEst[1] + physDamage[1] + bobtail[1] + bci[1],
  ]

  return { primaryLiability, cargo: cargoEst, physDamage, bobtail, bci, total }
}

function fmt(n: number): string {
  return n >= 1000000
    ? `$${(n / 1000000).toFixed(1)}M`
    : `$${(n / 1000).toFixed(0)}K`
}

function Range({ lo, hi, label }: { lo: number; hi: number; label: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#3A4558]/20 last:border-0">
      <span className="text-[#8A96AA] text-sm">{label}</span>
      <span className="font-mono text-[#E8EDF5] text-sm font-medium">{fmt(lo)} – {fmt(hi)}/yr</span>
    </div>
  )
}

export default function EstimatePage() {
  const [trucks,     setTrucks]     = useState(1)
  const [cargo,      setCargo]      = useState('general')
  const [hazmat,     setHazmat]     = useState(false)
  const [rating,     setRating]     = useState('satisfactory')
  const [state,      setState]      = useState('MD')
  const [experience, setExperience] = useState('3+')
  const [showResult, setShowResult] = useState(false)

  const estimate = showResult
    ? calcEstimate(trucks, cargo, hazmat, rating, state, experience)
    : null

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#E8EDF5]" style={{ fontFamily: 'var(--font-body, DM Sans, sans-serif)' }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#3A4558]/30 bg-[#080A0F]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#F5A623] flex items-center justify-center">
              <span className="text-[#080A0F] text-base font-bold leading-none">R</span>
            </div>
            <span className="text-[#E8EDF5] text-xl font-bold tracking-widest" style={{ fontFamily: 'var(--font-display, sans-serif)' }}>RADIUSLEAD</span>
          </Link>
          <Link href="/trucking" className="text-[#8A96AA] text-sm hover:text-[#E8EDF5] transition-colors">← Back</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20">

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F5A623]"/>
            <span className="font-mono text-[#F5A623] text-xs tracking-[0.2em] uppercase">Free Estimate · No signup</span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl text-[#E8EDF5] leading-tight mb-3"
            style={{ fontFamily: 'var(--font-display, sans-serif)', letterSpacing: '0.02em' }}>
            TRUCKING INSURANCE<br/>PREMIUM ESTIMATOR
          </h1>
          <p className="text-[#8A96AA] text-lg">
            Get a ballpark annual premium range for your operation before you start shopping.
            Estimates cover all major commercial trucking coverage lines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Form */}
          <div className="lg:col-span-3 space-y-5">

            {/* Trucks */}
            <div className="bg-[#111622] rounded-xl border border-[#3A4558]/30 p-5">
              <label className="block font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-3">
                Number of Power Units (Trucks)
              </label>
              <div className="flex items-center gap-4">
                <button onClick={() => setTrucks(t => Math.max(1, t - 1))}
                  className="w-10 h-10 rounded-lg bg-[#1A2033] border border-[#3A4558]/40 text-[#E8EDF5] text-xl font-bold hover:border-[#F5A623]/40 transition-all">−</button>
                <span className="font-bold text-4xl text-[#E8EDF5] min-w-[60px] text-center"
                  style={{ fontFamily: 'var(--font-display, sans-serif)' }}>{trucks}</span>
                <button onClick={() => setTrucks(t => Math.min(500, t + 1))}
                  className="w-10 h-10 rounded-lg bg-[#1A2033] border border-[#3A4558]/40 text-[#E8EDF5] text-xl font-bold hover:border-[#F5A623]/40 transition-all">+</button>
                <span className="text-[#3A4558] text-sm font-mono">truck{trucks !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Cargo type */}
            <div className="bg-[#111622] rounded-xl border border-[#3A4558]/30 p-5">
              <label className="block font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-3">
                Primary Cargo Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { v: 'general',      l: 'General Freight'    },
                  { v: 'refrigerated', l: 'Refrigerated / Food' },
                  { v: 'chemicals',    l: 'Chemicals / Liquids' },
                  { v: 'vehicles',     l: 'Vehicles / Auto'    },
                  { v: 'household',    l: 'Household Goods'    },
                  { v: 'other',        l: 'Other'              },
                ].map(o => (
                  <button key={o.v} onClick={() => setCargo(o.v)}
                    className="px-3 py-2 rounded-lg text-sm text-left transition-all border"
                    style={{
                      borderColor: cargo === o.v ? 'rgba(245,166,35,0.4)' : 'rgba(58,69,88,0.4)',
                      background:  cargo === o.v ? 'rgba(245,166,35,0.08)' : 'rgba(26,32,51,1)',
                      color:       cargo === o.v ? '#F5A623' : '#8A96AA',
                    }}>
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            {/* State + rating row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111622] rounded-xl border border-[#3A4558]/30 p-5">
                <label className="block font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-3">State</label>
                <select value={state} onChange={e => setState(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#1A2033] border border-[#3A4558]/40 text-[#E8EDF5] text-sm focus:border-[#F5A623]/40 focus:outline-none appearance-none">
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="bg-[#111622] rounded-xl border border-[#3A4558]/30 p-5">
                <label className="block font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-3">Safety Rating</label>
                <select value={rating} onChange={e => setRating(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#1A2033] border border-[#3A4558]/40 text-[#E8EDF5] text-sm focus:border-[#F5A623]/40 focus:outline-none appearance-none">
                  <option value="satisfactory">Satisfactory</option>
                  <option value="not_rated">Not Rated / New</option>
                  <option value="conditional">Conditional</option>
                </select>
              </div>
            </div>

            {/* Experience + hazmat row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#111622] rounded-xl border border-[#3A4558]/30 p-5">
                <label className="block font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-3">Years in Operation</label>
                <select value={experience} onChange={e => setExperience(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-[#1A2033] border border-[#3A4558]/40 text-[#E8EDF5] text-sm focus:border-[#F5A623]/40 focus:outline-none appearance-none">
                  <option value="new">New authority (&lt;6mo)</option>
                  <option value="1-2">1–2 years</option>
                  <option value="3+">3+ years</option>
                </select>
              </div>
              <div className="bg-[#111622] rounded-xl border border-[#3A4558]/30 p-5">
                <label className="block font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-3">Hazmat Operations</label>
                <div className="flex gap-3 mt-1">
                  {[{v: false, l: 'No'}, {v: true, l: 'Yes'}].map(o => (
                    <button key={String(o.v)} onClick={() => setHazmat(o.v)}
                      className="flex-1 h-10 rounded-lg border text-sm font-medium transition-all"
                      style={{
                        borderColor: hazmat === o.v ? (o.v ? 'rgba(234,88,12,0.4)' : 'rgba(16,185,129,0.3)') : 'rgba(58,69,88,0.4)',
                        background:  hazmat === o.v ? (o.v ? 'rgba(234,88,12,0.08)' : 'rgba(16,185,129,0.08)') : 'rgba(26,32,51,1)',
                        color:       hazmat === o.v ? (o.v ? '#EA580C' : '#10B981') : '#8A96AA',
                      }}>
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setShowResult(true)}
              className="w-full h-14 rounded-xl font-bold text-lg tracking-widest transition-all hover:-translate-y-0.5 active:translate-y-0"
              style={{ fontFamily: 'var(--font-display, sans-serif)', background: '#F5A623', color: '#080A0F' }}>
              ESTIMATE MY PREMIUMS →
            </button>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-2">
            {estimate ? (
              <div className="bg-[#111622] rounded-2xl border border-[#F5A623]/20 p-6 sticky top-24 animate-fade-up">
                <div className="font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-2">Estimated Annual Premium</div>
                <div className="text-4xl font-bold text-[#E8EDF5] mb-1"
                  style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                  {fmt(estimate.total[0])} – {fmt(estimate.total[1])}
                </div>
                <div className="text-[#8A96AA] text-xs mb-6">per year · all lines combined</div>

                <div className="border border-[#3A4558]/30 rounded-xl divide-y divide-[#3A4558]/20 mb-6">
                  <Range lo={estimate.primaryLiability[0]} hi={estimate.primaryLiability[1]} label="Primary Liability ($1M)" />
                  <Range lo={estimate.cargo[0]} hi={estimate.cargo[1]} label="Motor Truck Cargo" />
                  <Range lo={estimate.physDamage[0]} hi={estimate.physDamage[1]} label="Physical Damage" />
                  <Range lo={estimate.bobtail[0]} hi={estimate.bobtail[1]} label="Non-Trucking Liability" />
                  <Range lo={estimate.bci[0]} hi={estimate.bci[1]} label="Business Interruption" />
                </div>

                <div className="text-[#3A4558] text-xs font-mono mb-5 leading-relaxed">
                  This is an estimate based on industry averages. Actual quotes depend on driving history,
                  loss runs, routes, and carrier appetite.
                </div>

                <Link href="/go/insurance"
                  className="w-full h-12 rounded-xl font-bold tracking-widest text-sm flex items-center justify-center transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: 'var(--font-display, sans-serif)', background: '#F5A623', color: '#080A0F' }}>
                  GET REAL QUOTES →
                </Link>
                <Link href="/trucking/coverage"
                  className="mt-3 w-full h-10 rounded-xl font-bold tracking-widest text-xs flex items-center justify-center border border-[#3A4558]/40 text-[#8A96AA] hover:text-[#E8EDF5] hover:border-[#F5A623]/30 transition-all"
                  style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                  CHECK MY COVERAGE GAPS →
                </Link>
              </div>
            ) : (
              <div className="bg-[#111622] rounded-2xl border border-[#3A4558]/30 p-6 sticky top-24 text-center">
                <div className="text-5xl mb-4">🚛</div>
                <div className="font-bold text-[#3A4558] text-lg mb-2"
                  style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                  YOUR ESTIMATE<br/>APPEARS HERE
                </div>
                <p className="text-[#3A4558] text-sm">Fill in your fleet details and click Estimate.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
