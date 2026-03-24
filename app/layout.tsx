import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const display = Bebas_Neue({
  weight:   ['400'],
  subsets:  ['latin'],
  variable: '--font-display',
})

const body = DM_Sans({
  subsets:  ['latin'],
  variable: '--font-body',
})

const mono = DM_Mono({
  weight:   ['400', '500'],
  subsets:  ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title:       'RadiusLead — Find Qualified Business Leads in Your Radius',
  description: 'Precision lead intelligence for insurance agents, financial advisors, and business professionals. Find carriers, providers, and businesses ready to buy.',
  keywords:    'business leads, trucking insurance leads, carrier prospecting, lead generation',
  openGraph: {
    title:       'RadiusLead — Precision Lead Intelligence',
    description: 'Find qualified business leads within your radius. Insurance, financial, and commercial leads.',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
