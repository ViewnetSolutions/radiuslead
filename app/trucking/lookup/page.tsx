'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/Nav'

// ── Call FMCSA API directly from the browser (CORS-enabled public API) ────────
const FMCSA_API = 'https://data.transportation.gov/resource/az4n-8mr2.json'

interface CarrierResult {
  dotNumber:       string
  legalName:       string
  dbaName:         string | null
  phone:           string | null
  email:           string | null
  city:            string
  state:           string
  operatingStatus: string
  safetyRating:    string
  totalTrucks:     number | null
  totalDrivers:    number | null
  hazmat:          boolean
  cargoCarried:    string | null
  mcNumber:        string | null
  score:           number
  premiumEstimate: { low: number; high: number; label: string }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function normalizeSafetyRating(raw: string): string {
  const s = raw.toLowerCase().trim()
  if (s === 's' || s.includes('satisfactory'))   return 'Satisfactory'
  if (s === 'c' || s.includes('conditional'))    return 'Conditional'
  if (s === 'u' || s.includes('unsatisfactory')) return 'Unsatisfactory'
  return 'Not Rated'
}

function formatPhone(raw: string): string | null {
  const d = raw.replace(/\D/g, '')
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`
  if (d.length === 11 && d[0] === '1') return `(${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`
  return raw.trim() || null
}

function extractMC(raw: string): string | null {
  const m = raw.match(/MC-?(\d+)/i)
  return m ? m[1] : null
}

function estimatePremium(trucks: number, hazmat: boolean, rating: string): { low: number; high: number; label: string } {
  let base =
    trucks <= 1  ? { low: 8000,   high: 18000   } :
    trucks <= 10 ? { low: 15000,  high: 60000   } :
    trucks <= 50 ? { low: 50000,  high: 250000  } :
    trucks <= 200? { low: 200000, high: 800000  } :
                   { low: 500000, high: 1500000 }

  if (hazmat)                   { base.low = Math.round(base.low * 1.3);  base.high = Math.round(base.high * 1.4) }
  if (rating === 'Conditional') { base.low = Math.round(base.low * 1.2);  base.high = Math.round(base.high * 1.3) }

  const fmt = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(1)}M` : `$${Math.round(n/1000)}K`
  return { low: base.low, high: base.high, label: `${fmt(base.low)} – ${fmt(base.high)}/yr` }
}

function calcScore(trucks: number, hazmat: boolean, rating: string, hasEmail: boolean, isActive: boolean): number {
  let score = 40
  if (isActive)                          score += 20
  if (trucks >= 2 && trucks <= 10)       score += 20
  else if (trucks > 10)                  score += 12
  if (rating === 'Conditional')          score += 15
  else if (rating === 'Not Rated')       score += 10
  if (hazmat)                            score += 8
  if (hasEmail)                          score += 5
  return Math.min(99, score)
}

// ── Parse raw FMCSA row into CarrierResult ────────────────────────────────────
function parseRow(r: Record<string, string>, dot: string): CarrierResult {
  const trucks       = parseInt(r.power_units ?? '0') || 0
  const drivers      = parseInt(r.total_drivers ?? r.drivers ?? '0') || 0
  const isActive     = String(r.out_of_service ?? '').toUpperCase() !== 'Y'
  const safetyRating = normalizeSafetyRating(r.safety_rating ?? '')
  const hazmat       = ['Y','1','true','yes'].includes(String(r.hazmat_flag ?? '').toLowerCase())
  const email        = String(r.email_address ?? '').trim().toLowerCase() || null

  return {
    dotNumber:       dot,
    legalName:       String(r.legal_name ?? '').trim(),
    dbaName:         String(r.dba_name ?? '').trim() || null,
    phone:           formatPhone(String(r.telephone ?? '')),
    email,
    city:            String(r.phy_city  ?? '').trim(),
    state:           String(r.phy_state ?? '').trim(),
    operatingStatus: isActive ? 'Active' : 'Inactive',
    safetyRating,
    totalTrucks:     trucks  || null,
    totalDrivers:    drivers || null,
    hazmat,
    cargoCarried:    String(r.cargo_carried ?? '').trim() || null,
    mcNumber:        extractMC(String(r.mc_mx_ff_numbers ?? '')),
    score:           calcScore(trucks, hazmat, safetyRating, !!email, isActive),
    premiumEstimate: estimatePremium(trucks, hazmat, safetyRating),
  }
}

// ── UI Components ─────────────────────────────────────────────────────────────
function ScoreBar({ score }: { score: number }) {
  const color = score >= 70 ? '#10B981' : score >= 50 ? '#F5A623' : '#EF4444'
  const label = score >= 70 ? 'Strong candidate' : score >= 50 ? 'Worth reviewing' : 'Lower opportunity'
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-[#8A96AA]">Insurance opportunity score</span>
        <span className="font-display text-2xl" style={{ color }}>{score}<span className="text-sm text-[#3A4558]">/99</span></span>
      </div>
      <div className="h-2 rounded-full bg-[#1A2033] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: color }}/>
      </div>
      <div className="text-xs mt-1" style={{ color }}>{label}</div>
    </div>
  )
}

function RatingBadge({ rating }: { rating: string }) {
  const styles: Record<string, string> = {
    'Satisfactory':   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Conditional':    'bg-red-500/10 text-red-400 border-red-500/20',
    'Unsatisfactory': 'bg-red-600/15 text-red-400 border-red-600/20',
    'Not Rated':      'bg-[#1A2033] text-[#8A96AA] border-[#3A4558]/40',
  }
  return (
    <span className={`inline-flex px-2.5 py-1 rounded border text-xs font-mono ${styles[rating] ?? styles['Not Rated']}`}>
      {rating}
    </span>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LookupPage() {
  const [dot,     setDot]     = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState<CarrierResult | null>(null)
  const [error,   setError]   = useState<string | null>(null)

  const handleLookup = async () => {
    const clean = dot.replace(/\D/g, '')
    if (!clean) return
    setLoading(true); setError(null); setResult(null)
    try {
      // Call FMCSA API directly — public, CORS-enabled, no server needed
      const url = `${FMCSA_API}?dot_number=${clean}&$limit=1`
      const res  = await fetch(url, { cache: 'no-store' })

      if (!res.ok) { setError('FMCSA API unavailable — please try again'); return }

      const data = await res.json()
      if (!data?.length) { setError('No carrier found for that DOT number'); return }

      setResult(parseRow(data[0], clean))
    } catch (e) {
      setError('Network error — please check your connection and try again')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#E8EDF5]" style={{ fontFamily: 'var(--font-body, DM Sans, sans-serif)' }}>

      <Nav
        centerSlot={<span/>}
        rightSlot={
          <Link href="/trucking" className="text-mist text-sm hover:text-ice transition-colors font-mono">
            ← Back to Trucking
          </Link>
        }
      />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#F5A623]"/>
            <span className="font-mono text-[#F5A623] text-xs tracking-[0.2em] uppercase">Free · No signup required</span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl text-[#E8EDF5] leading-tight mb-4"
            style={{ fontFamily: 'var(--font-display, sans-serif)', letterSpacing: '0.02em' }}>
            DOT SAFETY<br/>LOOKUP
          </h1>
          <p className="text-[#8A96AA] text-lg leading-relaxed">
            Enter any US DOT number to see the carrier&apos;s public FMCSA record —
            safety rating, fleet size, operating status, contact info, and estimated
            annual insurance premium range.
          </p>
        </div>

        {/* Search */}
        <div className="bg-[#111622] rounded-2xl border border-[#3A4558]/30 p-6 mb-8">
          <label className="block font-mono text-[#F5A623] text-xs tracking-[0.15em] uppercase mb-3">
            Enter US DOT Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={dot}
              onChange={e => setDot(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLookup()}
              placeholder="e.g. 2345678"
              maxLength={10}
              className="flex-1 h-12 px-4 rounded-xl bg-[#1A2033] border border-[#3A4558]/40 text-[#E8EDF5] font-mono text-lg placeholder:text-[#3A4558] focus:border-[#F5A623]/50 focus:outline-none transition-all"
            />
            <button
              onClick={handleLookup}
              disabled={loading || !dot.replace(/\D/g,'').length}
              className="h-12 px-8 rounded-xl font-bold tracking-widest text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{
                fontFamily: 'var(--font-display, sans-serif)',
                background: loading ? '#3A4558' : '#F5A623',
                color:      loading ? '#8A96AA' : '#080A0F',
              }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  LOOKING UP...
                </span>
              ) : 'LOOK UP →'}
            </button>
          </div>
          <p className="text-[#3A4558] text-xs font-mono mt-3">
            Data sourced from FMCSA Open Data Portal · Updated daily
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4 animate-fade-up">

            {/* Identity card */}
            <div className="bg-[#111622] rounded-2xl border border-[#3A4558]/30 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#E8EDF5] mb-1">{result.legalName}</h2>
                  {result.dbaName && <div className="text-[#8A96AA] text-sm">dba {result.dbaName}</div>}
                  <div className="text-[#8A96AA] text-sm mt-1">{result.city}, {result.state}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-[#F5A623] text-sm">DOT #{result.dotNumber}</div>
                  {result.mcNumber && <div className="font-mono text-[#3A4558] text-xs mt-0.5">MC #{result.mcNumber}</div>}
                  <div className={`text-xs mt-1 font-mono ${result.operatingStatus === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.operatingStatus === 'Active' ? '● Active' : '○ Inactive'}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#3A4558]/20">
                <div>
                  <div className="font-mono text-[#3A4558] text-xs uppercase tracking-wider mb-1">Phone</div>
                  {result.phone
                    ? <a href={`tel:${result.phone.replace(/\D/g,'')}`} className="text-[#F5A623] text-sm hover:underline">{result.phone}</a>
                    : <span className="text-[#3A4558] text-sm">Not on file</span>
                  }
                </div>
                <div>
                  <div className="font-mono text-[#3A4558] text-xs uppercase tracking-wider mb-1">Email</div>
                  {result.email
                    ? <a href={`mailto:${result.email}`} className="text-[#06B6D4] text-sm hover:underline truncate block">{result.email}</a>
                    : <span className="text-[#3A4558] text-sm">Not on file</span>
                  }
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Safety Rating', value: <RatingBadge rating={result.safetyRating}/> },
                { label: 'Power Units',   value: <span className="text-xl font-bold text-[#E8EDF5]">{result.totalTrucks ?? '—'}</span> },
                { label: 'Drivers',       value: <span className="text-xl font-bold text-[#E8EDF5]">{result.totalDrivers ?? '—'}</span> },
                { label: 'Hazmat',        value: <span className={`text-sm font-mono ${result.hazmat ? 'text-[#EA580C]' : 'text-[#3A4558]'}`}>{result.hazmat ? '☢ Yes' : 'No'}</span> },
              ].map(s => (
                <div key={s.label} className="bg-[#111622] rounded-xl border border-[#3A4558]/30 p-4">
                  <div className="font-mono text-[#3A4558] text-xs uppercase tracking-wider mb-2">{s.label}</div>
                  {s.value}
                </div>
              ))}
            </div>

            {/* Premium estimate */}
            <div className="bg-[#111622] rounded-2xl border border-[#F5A623]/20 p-6">
              <div className="font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-3">
                Estimated Annual Insurance Premium
              </div>
              <div className="text-4xl font-bold text-[#E8EDF5] mb-1" style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                {result.premiumEstimate.label}
              </div>
              <div className="text-[#8A96AA] text-sm mb-6">
                Based on {result.totalTrucks ?? 'unknown'} power unit{result.totalTrucks !== 1 ? 's' : ''},
                {' '}{result.safetyRating} safety rating{result.hazmat ? ', hazmat operations' : ''}.
                Actual rates depend on driving history, cargo, and routes.
              </div>
              <ScoreBar score={result.score}/>
            </div>

            {/* CTA */}
            <div className="bg-[#F5A623]/8 border border-[#F5A623]/20 rounded-2xl p-6">
              <div className="font-mono text-[#F5A623] text-xs tracking-widest uppercase mb-2">
                Is {result.legalName} overpaying?
              </div>
              <h3 className="text-xl font-bold text-[#E8EDF5] mb-3" style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                GET ACTUAL QUOTES FOR THIS FLEET
              </h3>
              <p className="text-[#8A96AA] text-sm leading-relaxed mb-5">
                The estimate above is a range based on fleet size and safety profile.
                Actual quotes from carriers that specialise in commercial trucking take
                3 minutes and cost nothing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/go/insurance"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold tracking-widest text-sm transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: 'var(--font-display, sans-serif)', background: '#F5A623', color: '#080A0F' }}>
                  COMPARE REAL QUOTES →
                </Link>
                <Link href="/trucking/coverage"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold tracking-widest text-sm border border-[#3A4558]/50 text-[#8A96AA] hover:text-[#E8EDF5] hover:border-[#F5A623]/30 transition-all"
                  style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                  CHECK COVERAGE GAPS →
                </Link>
              </div>
            </div>

            {/* FMCSA link */}
            <div className="text-center">
              <a href={`https://safer.fmcsa.dot.gov/query.asp?query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${result.dotNumber}`}
                target="_blank" rel="noopener noreferrer"
                className="font-mono text-[#3A4558] text-xs hover:text-[#8A96AA] transition-colors">
                View full FMCSA SAFER profile for DOT #{result.dotNumber} ↗
              </a>
            </div>
          </div>
        )}

        {/* Examples when empty */}
        {!result && !error && !loading && (
          <div className="text-center py-8">
            <div className="font-mono text-[#3A4558] text-xs uppercase tracking-wider mb-4">Try an example</div>
            <div className="flex flex-wrap gap-3 justify-center">
              {['2345678','1234567','3456789'].map(d => (
                <button key={d} onClick={() => setDot(d)}
                  className="font-mono text-sm text-[#8A96AA] border border-[#3A4558]/30 rounded-lg px-4 py-2 hover:border-[#F5A623]/30 hover:text-[#F5A623] transition-all">
                  DOT #{d}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
