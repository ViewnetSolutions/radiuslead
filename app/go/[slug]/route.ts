import { NextRequest, NextResponse } from 'next/server'

// ── Affiliate link map ────────────────────────────────────────────────────────
// Each slug maps to an env var containing the real affiliate URL.
// Set the env vars in Vercel → Settings → Environment Variables.
// NEVER hardcode affiliate URLs — use env vars so you can swap them without redeploying.

const SLUG_MAP: Record<string, string> = {
  // Trucking insurance
  'insurance':     process.env.INSURANCE_URL     ?? 'https://www.simplybusiness.com',
  'insureon':      process.env.INSUREON_URL      ?? 'https://www.insureon.com',
  'coverwallet':   process.env.COVERWALLET_URL   ?? 'https://www.coverwallet.com',
  'thimble':       process.env.THIMBLE_URL       ?? 'https://www.thimble.com',
  'progressive':   process.env.PROGRESSIVE_URL   ?? 'https://www.progressive.com/commercial',

  // Life & health
  'selectquote':   process.env.SELECTQUOTE_URL   ?? 'https://www.selectquote.com',
  'policygenius':  process.env.POLICYGENIUS_URL  ?? 'https://www.policygenius.com',
  'ehealth':       process.env.EHEALTH_URL       ?? 'https://www.ehealthinsurance.com',
  'gohealth':      process.env.GOHEALTH_URL      ?? 'https://www.gohealth.com',
  'assurance':     process.env.ASSURANCE_URL     ?? 'https://www.assurance.com',
  'healthmarkets': process.env.HEALTHMARKETS_URL ?? 'https://www.healthmarkets.com',

  // Financial
  'smartasset':    process.env.SMARTASSET_URL    ?? 'https://smartasset.com/financial-advisor',
  'zoefinancial':  process.env.ZOEFINANCIAL_URL  ?? 'https://www.zoefinancial.com',
  'harness':       process.env.HARNESS_URL       ?? 'https://www.harnesswealth.com',

  // SaaS
  'hubspot':       process.env.HUBSPOT_URL       ?? 'https://www.hubspot.com',
  'gusto':         process.env.GUSTO_URL         ?? 'https://gusto.com',
  'quickbooks':    process.env.QUICKBOOKS_URL    ?? 'https://quickbooks.intuit.com',
  'samsara':       process.env.SAMSARA_URL       ?? 'https://www.samsara.com',
  'motive':        process.env.MOTIVE_URL        ?? 'https://gomotive.com',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: rawSlug } = await params
  const slug        = rawSlug?.toLowerCase().trim()
  const destination = SLUG_MAP[slug]

  // Log the click (extend this later to write to Supabase)
  console.log(`[RadiusLead] /go/${slug} → ${destination ?? 'NOT FOUND'} @ ${new Date().toISOString()}`)

  if (!destination) {
    // Unknown slug — redirect to homepage rather than 404
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Append UTM params for tracking in affiliate dashboards
  const url = new URL(destination)
  url.searchParams.set('utm_source',   'radiuslead')
  url.searchParams.set('utm_medium',   'referral')
  url.searchParams.set('utm_campaign', slug)

  // 302 = temporary redirect (good for affiliate links — can swap destination without cache issues)
  return NextResponse.redirect(url.toString(), { status: 302 })
}
