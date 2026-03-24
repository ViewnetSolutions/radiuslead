import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const CENSUS_API = 'https://data.transportation.gov/resource/az4n-8mr2.json'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dot = searchParams.get('dot')?.trim().replace(/\D/g, '')

  if (!dot) return NextResponse.json({ error: 'DOT number required' }, { status: 400 })

  try {
    const controller = new AbortController()
    const timer      = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(
      `${CENSUS_API}?dot_number=${dot}&$limit=1`,
      { signal: controller.signal, cache: 'no-store' }
    )
    clearTimeout(timer)

    if (!res.ok) return NextResponse.json({ error: 'FMCSA API unavailable' }, { status: 502 })

    const data = await res.json()
    if (!data?.length) return NextResponse.json({ error: 'No carrier found for that DOT number' }, { status: 404 })

    const r           = data[0]
    const trucks      = parseInt(r.power_units ?? '0') || 0
    const drivers     = parseInt(r.total_drivers ?? r.drivers ?? '0') || 0
    const isActive    = String(r.out_of_service ?? '').toUpperCase() !== 'Y'
    const safetyRating = normalizeSafetyRating(r.safety_rating ?? '')
    const hazmat      = ['Y','1','true','yes'].includes(String(r.hazmat_flag ?? '').toLowerCase())

    // Score 0–100 — insurance opportunity signal
    let score = 40  // base
    if (isActive) score += 20
    if (trucks >= 2 && trucks <= 10) score += 20
    else if (trucks > 10)            score += 12
    if (safetyRating === 'Conditional')  score += 15
    else if (safetyRating === 'Not Rated') score += 10
    if (hazmat) score += 8
    if (r.email_address) score += 5
    score = Math.min(99, score)

    // Premium estimate
    const premium = estimatePremium(trucks, hazmat, safetyRating)

    return NextResponse.json({
      dotNumber:    dot,
      legalName:    String(r.legal_name    ?? '').trim(),
      dbaName:      String(r.dba_name      ?? '').trim() || null,
      phone:        formatPhone(String(r.telephone ?? '')),
      email:        String(r.email_address ?? '').trim().toLowerCase() || null,
      city:         String(r.phy_city      ?? '').trim(),
      state:        String(r.phy_state     ?? '').trim(),
      operatingStatus: isActive ? 'Active' : 'Inactive',
      safetyRating,
      totalTrucks:  trucks || null,
      totalDrivers: drivers || null,
      hazmat,
      cargoCarried: String(r.cargo_carried ?? '').trim() || null,
      score,
      premiumEstimate: premium,
      mcNumber: extractMC(String(r.mc_mx_ff_numbers ?? '')),
    })

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('aborted') || msg.includes('ECONNRESET')) {
      return NextResponse.json({ error: 'FMCSA API timeout — try again' }, { status: 504 })
    }
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 })
  }
}

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
  let base = { low: 8000, high: 18000 }
  if      (trucks === 1)       base = { low: 8000,   high: 18000  }
  else if (trucks <= 10)       base = { low: 15000,  high: 60000  }
  else if (trucks <= 50)       base = { low: 50000,  high: 250000 }
  else if (trucks <= 200)      base = { low: 200000, high: 800000 }
  else                         base = { low: 500000, high: 1500000}

  if (hazmat) { base.low = Math.round(base.low * 1.3); base.high = Math.round(base.high * 1.4) }
  if (rating === 'Conditional') { base.low = Math.round(base.low * 1.2); base.high = Math.round(base.high * 1.3) }

  const fmt = (n: number) => n >= 1000000
    ? `$${(n/1000000).toFixed(1)}M`
    : `$${Math.round(n/1000)}K`

  return { low: base.low, high: base.high, label: `${fmt(base.low)} – ${fmt(base.high)}/yr` }
}
