/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink:    '#080A0F',
        navy:   '#0B0E17',
        slate:  '#111622',
        steel:  '#1A2033',
        amber:  { DEFAULT: '#F5A623', dim: '#D4891A', glow: 'rgba(245,166,35,0.15)' },
        ice:    '#E8EDF5',
        mist:   '#8A96AA',
        ghost:  '#3A4558',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'line-grow':  'lineGrow 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
        'count-up':   'fadeUp 0.6s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        lineGrow: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
      },
    },
  },
  plugins: [],
}
