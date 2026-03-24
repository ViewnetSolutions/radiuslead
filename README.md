# radiuslead.com

Public-facing lead intelligence site and affiliate tracking hub.

## Structure

```
/                    → Homepage — all verticals
/trucking            → Trucking & commercial insurance landing page
/go/[slug]           → Affiliate redirect handler (tracking links)
```

## Affiliate Link Slugs

| URL | Program | Env Var |
|-----|---------|---------|
| `/go/insurance` | Simply Business | `INSURANCE_URL` |
| `/go/insureon` | Insureon | `INSUREON_URL` |
| `/go/coverwallet` | CoverWallet | `COVERWALLET_URL` |
| `/go/gusto` | Gusto | `GUSTO_URL` |
| `/go/hubspot` | HubSpot | `HUBSPOT_URL` |
| `/go/samsara` | Samsara | `SAMSARA_URL` |
| `/go/policygenius` | Policygenius | `POLICYGENIUS_URL` |
| `/go/smartasset` | SmartAsset | `SMARTASSET_URL` |

Full list in `.env.local`.

## Setup

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy to Vercel

1. Push to GitHub
2. Connect repo in Vercel
3. Add all env vars (affiliate URLs) in Vercel → Settings → Environment Variables
4. Point `radiuslead.com` DNS to Vercel

## Outreach email

Set up Google Workspace on `radiuslead.com` → use `outreach@radiuslead.com` for cold email.
Never use personal Gmail for cold outreach — keep domains separate.

## Related

- `affiliate-engine` — private dashboard for pipeline and commission tracking
- `fmcsa-prospector` — finds trucking leads that go to `/go/insurance`
