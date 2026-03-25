'use client'

import Link from 'next/link'
import { RadiusLeadLogo } from './Logo'

interface NavProps {
  centerSlot?: React.ReactNode
  rightSlot?:  React.ReactNode
}

export function Nav({ centerSlot, rightSlot }: NavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ghost/30 bg-ink/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="hover:opacity-85 transition-opacity">
          <RadiusLeadLogo size="sm" />
        </Link>

        {/* Center — nav links or custom slot */}
        {centerSlot ?? (
          <div className="hidden md:flex items-center gap-8 text-sm text-mist">
            <Link href="/trucking"      className="hover:text-ice transition-colors">Trucking</Link>
            <Link href="/go/ehealth"    className="hover:text-ice transition-colors">Healthcare</Link>
            <Link href="/go/smartasset" className="hover:text-ice transition-colors">Financial</Link>
            <Link href="/go/gusto"      className="hover:text-ice transition-colors">Business</Link>
            <Link href="/dispatch"      className="hover:text-ice transition-colors" style={{ color: '#FF8C0099' }}>DispatchOS</Link>
          </div>
        )}

        {/* Right — CTA or custom slot */}
        {rightSlot ?? (
          <Link href="/go/insurance"
            className="btn-amber px-5 py-2 rounded text-sm font-display tracking-widest text-ink">
            GET QUOTES →
          </Link>
        )}
      </div>
    </nav>
  )
}
