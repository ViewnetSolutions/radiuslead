// RadiusLead Nav Logo — circle R icon + RADIUSLEAD wordmark side by side
// Based on brand image: silver ring, blue gradient R, road curve, orange arrow

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: { icon: 34, text: '17px', gap: '9px' },
  md: { icon: 44, text: '22px', gap: '11px' },
  lg: { icon: 60, text: '30px', gap: '14px' },
}

export function RadiusLeadLogo({ size = 'sm' }: LogoProps) {
  const s = SIZES[size]

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, textDecoration: 'none' }}
    >
      {/* ── Circle R Icon ── */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          {/* Blue gradient — deep navy to sky blue, matching the logo */}
          <linearGradient id="rl-b" x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1240B0" />
            <stop offset="45%"  stopColor="#2272D8" />
            <stop offset="100%" stopColor="#40B4F8" />
          </linearGradient>

          {/* Silver ring gradient */}
          <linearGradient id="rl-s" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#E0E4F0" />
            <stop offset="50%"  stopColor="#B0B8D0" />
            <stop offset="100%" stopColor="#8890A8" />
          </linearGradient>

          {/* Orange arrow gradient */}
          <linearGradient id="rl-o" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="#FF9000" />
            <stop offset="100%" stopColor="#F54800" />
          </linearGradient>

          {/* Subtle inner glow for depth */}
          <radialGradient id="rl-bg" cx="50%" cy="45%" r="50%">
            <stop offset="0%"   stopColor="#1A3A8A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0A0E1A" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* ── Background fill ── */}
        <circle cx="50" cy="50" r="46" fill="url(#rl-bg)" />

        {/* ── Silver outer ring ── */}
        <circle cx="50" cy="50" r="46" stroke="url(#rl-s)" strokeWidth="4.5" fill="none" />

        {/* ── R vertical stem ── */}
        <rect x="21" y="18" width="12" height="58" rx="2" fill="url(#rl-b)" />

        {/* ── R top bowl — horizontal top bar ── */}
        <rect x="21" y="18" width="38" height="11" rx="3" fill="url(#rl-b)" />

        {/* ── R bowl curve ── */}
        <path
          d="M21 29 L54 29 Q64 29 64 36 Q64 44 54 44 L21 44 Z"
          fill="url(#rl-b)"
        />

        {/* ── Road/highway curve sweeping through R leg — signature element ── */}
        <path
          d="M33 44 Q44 52 52 64 Q57 72 62 79"
          stroke="#0D2060"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        {/* Dashed centre-line on road */}
        <path
          d="M35 47 Q45 55 53 67"
          stroke="#7AB8F0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 4"
          fill="none"
          opacity="0.5"
        />

        {/* ── R leg (diagonal, below bowl) ── */}
        <path
          d="M33 44 L55 76 L67 76 L45 44 Z"
          fill="url(#rl-b)"
        />

        {/* ── Orange arrow pointing right through top-right of R ── */}
        {/* Arrow shaft */}
        <rect x="56" y="27" width="14" height="7" rx="1.5" fill="url(#rl-o)" />
        {/* Arrow head */}
        <path d="M68 21 L80 30.5 L68 40 Z" fill="url(#rl-o)" />
      </svg>

      {/* ── RADIUSLEAD wordmark ── */}
      <span
        style={{
          fontFamily: 'var(--font-display, "Bebas Neue", serif)',
          fontSize: s.text,
          letterSpacing: '0.1em',
          color: '#E8EDF5',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        RADIUSLEAD
      </span>
    </span>
  )
}
