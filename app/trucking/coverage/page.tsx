'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id:      string
  text:    string
  sub?:    string
  type:    'yesno' | 'select' | 'number'
  options?: { value: string; label: string }[]
}

interface GapResult {
  name:     string
  status:   'covered' | 'gap' | 'unknown'
  priority: 'critical' | 'high' | 'medium'
  detail:   string
  link:     string
}

const QUESTIONS: Question[] = [
  {
    id:   'trucks',
    text: 'How many trucks (power units) does your operation run?',
    sub:  'Include all trucks you own or lease',
    type: 'select',
    options: [
      { value: '1',     label: '1 truck (owner-operator)' },
      { value: '2-5',   label: '2–5 trucks' },
      { value: '6-10',  label: '6–10 trucks' },
      { value: '11-50', label: '11–50 trucks' },
      { value: '50+',   label: '50+ trucks' },
    ],
  },
  {
    id:   'liability',
    text: 'Do you carry primary auto liability coverage?',
    sub:  'This is the federal requirement for all interstate carriers',
    type: 'yesno',
  },
  {
    id:   'liability_amount',
    text: 'What is your primary liability limit?',
    sub:  'Federal minimum is $750K — most shippers now require $1M',
    type: 'select',
    options: [
      { value: 'under_750',  label: 'Under $750,000' },
      { value: '750k',       label: '$750,000 (federal minimum)' },
      { value: '1m',         label: '$1,000,000' },
      { value: 'over_1m',    label: 'Over $1,000,000' },
      { value: 'unsure',     label: 'Not sure' },
    ],
  },
  {
    id:   'cargo',
    text: 'Do you have motor truck cargo coverage?',
    sub:  'Covers the freight you haul if it\'s lost, damaged, or stolen',
    type: 'yesno',
  },
  {
    id:   'physical_damage',
    text: 'Do you have physical damage coverage on your trucks?',
    sub:  'Covers your own vehicles — collision, theft, fire, weather',
    type: 'yesno',
  },
  {
    id:   'bobtail',
    text: 'Do you have non-trucking liability (bobtail) coverage?',
    sub:  'Covers you when driving without a load or off-dispatch',
    type: 'yesno',
  },
  {
    id:   'workers_comp',
    text: 'Do you have workers\' compensation coverage?',
    sub:  'Required in most states when you have employed drivers',
    type: 'yesno',
  },
  {
    id:   'drivers',
    text: 'Do you have employed drivers (not just yourself)?',
    type: 'yesno',
  },
  {
    id:   'bci',
    text: 'Do you have business interruption (business continuity) insurance?',
    sub:  'Replaces lost income if your trucks are forced off the road',
    type: 'yesno',
  },
  {
    id:   'general_liability',
    text: 'Do you have commercial general liability (CGL) coverage?',
    sub:  'Covers incidents at your premises, loading docks, or yard',
    type: 'yesno',
  },
  {
    id:   'hazmat',
    text: 'Do you haul hazardous materials?',
    sub:  'Liquids, chemicals, flammables, or any HAZMAT-classified cargo',
    type: 'yesno',
  },
  {
    id:   'umbrella',
    text: 'Do you have an umbrella or excess liability policy?',
    sub:  'Provides additional limits above your primary coverage',
    type: 'yesno',
  },
]

function analyzeGaps(answers: Record<string, string>): GapResult[] {
  const trucks    = answers.trucks ?? '1'
  const hasDrivers = answers.drivers === 'yes'
  const isHazmat  = answers.hazmat === 'yes'
  const isBig     = ['11-50','50+'].includes(trucks)

  const gaps: GapResult[] = []

  // Primary liability
  if (answers.liability === 'no') {
    gaps.push({ name: 'Primary Auto Liability', status: 'gap', priority: 'critical',
      detail: 'CRITICAL — You are operating without federally required coverage. FMCSA minimum is $750K. Operating without it can result in out-of-service orders and personal liability.',
      link: '/go/insurance' })
  } else if (answers.liability_amount === 'under_750') {
    gaps.push({ name: 'Primary Auto Liability', status: 'gap', priority: 'critical',
      detail: 'Your limits are below the $750K federal minimum. This is an immediate compliance issue that must be corrected.',
      link: '/go/insurance' })
  } else if (answers.liability_amount === '750k') {
    gaps.push({ name: 'Primary Auto Liability', status: 'gap', priority: 'high',
      detail: 'You meet the federal minimum but most brokers and shippers now require $1M. You may be turned away from loads or contracts.',
      link: '/go/insurance' })
  } else if (answers.liability_amount === 'unsure') {
    gaps.push({ name: 'Primary Auto Liability', status: 'unknown', priority: 'high',
      detail: 'You should know your exact liability limits. Check your declarations page or call your agent to confirm.',
      link: '/go/insurance' })
  } else {
    gaps.push({ name: 'Primary Auto Liability', status: 'covered', priority: 'critical',
      detail: 'You have adequate primary liability coverage in place.', link: '/go/insurance' })
  }

  // Cargo
  if (answers.cargo === 'no') {
    gaps.push({ name: 'Motor Truck Cargo', status: 'gap', priority: 'critical',
      detail: 'Without cargo coverage, you are personally liable for lost or damaged freight. Most brokers require proof of cargo insurance before dispatch.',
      link: '/go/insurance' })
  } else if (answers.cargo === 'yes') {
    gaps.push({ name: 'Motor Truck Cargo', status: 'covered', priority: 'critical',
      detail: 'Cargo coverage is in place. Confirm your limits match the value of your highest-value load.', link: '/go/insurance' })
  }

  // Physical damage
  if (answers.physical_damage === 'no') {
    gaps.push({ name: 'Physical Damage', status: 'gap', priority: 'high',
      detail: 'If your truck is totaled, stolen, or severely damaged without physical damage coverage, you absorb the full replacement cost out of pocket.',
      link: '/go/insurance' })
  } else if (answers.physical_damage === 'yes') {
    gaps.push({ name: 'Physical Damage', status: 'covered', priority: 'high',
      detail: 'Physical damage coverage is in place. Confirm it\'s at replacement value, not depreciated book value.', link: '/go/insurance' })
  }

  // Bobtail
  if (answers.bobtail === 'no') {
    gaps.push({ name: 'Non-Trucking Liability (Bobtail)', status: 'gap', priority: 'high',
      detail: 'When you\'re driving your truck off-dispatch or without a load, your primary liability typically does not apply. Bobtail coverage fills this gap.',
      link: '/go/insurance' })
  } else if (answers.bobtail === 'yes') {
    gaps.push({ name: 'Non-Trucking Liability (Bobtail)', status: 'covered', priority: 'high',
      detail: 'Bobtail coverage is in place.', link: '/go/insurance' })
  }

  // Workers comp
  if (hasDrivers && answers.workers_comp === 'no') {
    gaps.push({ name: "Workers' Compensation", status: 'gap', priority: 'critical',
      detail: 'You have employees but no workers\' comp. This is legally required in most states and exposes you to unlimited liability if a driver is injured on the job.',
      link: '/go/insurance' })
  } else if (hasDrivers && answers.workers_comp === 'yes') {
    gaps.push({ name: "Workers' Compensation", status: 'covered', priority: 'high',
      detail: 'Workers\' comp is in place for your drivers.', link: '/go/insurance' })
  }

  // BCI
  if (answers.bci === 'no') {
    gaps.push({ name: 'Business Interruption / Continuity', status: 'gap', priority: 'high',
      detail: `A major accident or disaster that takes your trucks off the road for 30–90 days means zero income. For a ${trucks === '1' ? 'single-truck operation' : trucks + '-truck fleet'}, that could be tens of thousands of dollars in lost revenue with no safety net.`,
      link: '/go/insurance' })
  } else if (answers.bci === 'yes') {
    gaps.push({ name: 'Business Interruption / Continuity', status: 'covered', priority: 'high',
      detail: 'Business interruption coverage is in place.', link: '/go/insurance' })
  }

  // General liability
  if (answers.general_liability === 'no') {
    gaps.push({ name: 'Commercial General Liability', status: 'gap', priority: 'medium',
      detail: 'Slip-and-fall at your yard, property damage at a loading dock, or completed operations claims are not covered by your trucking liability. CGL fills this gap.',
      link: '/go/insurance' })
  } else if (answers.general_liability === 'yes') {
    gaps.push({ name: 'Commercial General Liability', status: 'covered', priority: 'medium',
      detail: 'General liability coverage is in place.', link: '/go/insurance' })
  }

  // Hazmat
  if (isHazmat && answers.liability !== 'no') {
    gaps.push({ name: 'Hazmat Liability (MCS-90)', status: 'unknown', priority: 'critical',
      detail: 'Hauling hazmat requires an MCS-90 endorsement with limits of $1M–$5M depending on your commodity class. Confirm this is included in your current policy.',
      link: '/go/insurance' })
  }

  // Umbrella — only suggest for bigger fleets
  if (isBig && answers.umbrella === 'no') {
    gaps.push({ name: 'Umbrella / Excess Liability', status: 'gap', priority: 'medium',
      detail: 'For a fleet your size, a single catastrophic accident can exhaust your primary liability limits. Umbrella coverage extends your protection at relatively low cost.',
      link: '/go/insurance' })
  }

  return gaps
}

const PRIORITY_STYLES = {
  critical: { border: 'border-red-500/25',   bg: 'bg-red-500/8',   text: 'text-red-400',   badge: 'CRITICAL' },
  high:     { border: 'border-[#F5A623]/25', bg: 'bg-[#F5A623]/8', text: 'text-[#F5A623]', badge: 'HIGH'     },
  medium:   { border: 'border-[#3A4558]/40', bg: 'bg-[#111622]',   text: 'text-[#8A96AA]', badge: 'MEDIUM'   },
}

const STATUS_ICON = {
  gap:     { icon: '✗', color: 'text-red-400'       },
  covered: { icon: '✓', color: 'text-emerald-400'   },
  unknown: { icon: '?', color: 'text-[#F5A623]'     },
}

export default function CoverageCheckerPage() {
  const [answers,   setAnswers]   = useState<Record<string, string>>({})
  const [step,      setStep]      = useState(0)
  const [completed, setCompleted] = useState(false)

  // Filter questions — skip bobtail for non-drivers etc.
  const activeQuestions = QUESTIONS.filter(q => {
    if (q.id === 'liability_amount' && answers.liability !== 'yes') return false
    if (q.id === 'workers_comp'     && answers.drivers   !== 'yes') return false
    return true
  })

  const currentQ  = activeQuestions[step]
  const progress  = Math.round((step / activeQuestions.length) * 100)
  const gaps      = completed ? analyzeGaps(answers) : []
  const gapCount  = gaps.filter(g => g.status === 'gap').length
  const critCount = gaps.filter(g => g.status === 'gap' && g.priority === 'critical').length

  const handleAnswer = (value: string) => {
    const next = { ...answers, [currentQ.id]: value }
    setAnswers(next)
    if (step + 1 < activeQuestions.length) {
      setStep(s => s + 1)
    } else {
      setCompleted(true)
    }
  }

  const reset = () => { setAnswers({}); setStep(0); setCompleted(false) }

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#E8EDF5]" style={{ fontFamily: 'var(--font-body, DM Sans, sans-serif)' }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#3A4558]/30 bg-[#080A0F]/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#F5A623] flex items-center justify-center">
              <span className="text-[#080A0F] text-base font-bold leading-none">R</span>
            </div>
            <span className="text-[#E8EDF5] text-xl font-bold tracking-widest" style={{ fontFamily: 'var(--font-display, sans-serif)' }}>RADIUSLEAD</span>
          </Link>
          <Link href="/trucking" className="text-[#8A96AA] text-sm hover:text-[#E8EDF5] transition-colors">
            ← Back
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-28 pb-20">

        {!completed ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#F5A623]"/>
                <span className="font-mono text-[#F5A623] text-xs tracking-[0.2em] uppercase">Coverage Gap Checker</span>
              </div>
              <h1 className="font-bold text-4xl text-[#E8EDF5] mb-2"
                style={{ fontFamily: 'var(--font-display, sans-serif)', letterSpacing: '0.02em' }}>
                FIND YOUR GAPS.
              </h1>
              <p className="text-[#8A96AA]">Answer {activeQuestions.length} quick questions — takes under 2 minutes.</p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[#3A4558] text-xs">{step + 1} of {activeQuestions.length}</span>
                <span className="font-mono text-[#F5A623] text-xs">{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#1A2033] overflow-hidden">
                <div className="h-full rounded-full bg-[#F5A623] transition-all duration-500"
                  style={{ width: `${progress}%` }}/>
              </div>
            </div>

            {/* Question card */}
            {currentQ && (
              <div className="bg-[#111622] rounded-2xl border border-[#3A4558]/30 p-8 animate-fade-up" key={currentQ.id}>
                <div className="font-mono text-[#3A4558] text-xs uppercase tracking-wider mb-4">
                  Question {step + 1}
                </div>
                <h2 className="text-xl font-semibold text-[#E8EDF5] mb-2 leading-snug">{currentQ.text}</h2>
                {currentQ.sub && <p className="text-[#8A96AA] text-sm mb-6">{currentQ.sub}</p>}

                {/* Yes/No */}
                {currentQ.type === 'yesno' && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { v: 'yes', label: 'Yes', icon: '✓' },
                      { v: 'no',  label: 'No',  icon: '✗' },
                    ].map(opt => (
                      <button key={opt.v} onClick={() => handleAnswer(opt.v)}
                        className="h-16 rounded-xl border font-bold text-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                        style={{
                          borderColor: opt.v === 'yes' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)',
                          background:  opt.v === 'yes' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                          color:       opt.v === 'yes' ? '#10B981' : '#EF4444',
                        }}>
                        <span>{opt.icon}</span>
                        <span style={{ fontFamily: 'var(--font-display, sans-serif)', letterSpacing: '0.05em' }}>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Select */}
                {currentQ.type === 'select' && currentQ.options && (
                  <div className="space-y-2">
                    {currentQ.options.map(opt => (
                      <button key={opt.value} onClick={() => handleAnswer(opt.value)}
                        className="w-full text-left px-4 py-3 rounded-xl border border-[#3A4558]/30 bg-[#1A2033] text-[#E8EDF5] text-sm hover:border-[#F5A623]/40 hover:bg-[#F5A623]/5 transition-all">
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Back button */}
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="mt-4 text-[#3A4558] text-sm hover:text-[#8A96AA] transition-colors font-mono">
                ← Previous question
              </button>
            )}
          </>
        ) : (
          /* Results */
          <div className="space-y-6 animate-fade-up">
            {/* Summary */}
            <div className={`rounded-2xl border p-6 ${
              gapCount === 0
                ? 'border-emerald-500/25 bg-emerald-500/8'
                : critCount > 0
                ? 'border-red-500/25 bg-red-500/8'
                : 'border-[#F5A623]/25 bg-[#F5A623]/8'
            }`}>
              <div className="font-mono text-xs uppercase tracking-wider mb-2"
                style={{ color: gapCount === 0 ? '#10B981' : critCount > 0 ? '#EF4444' : '#F5A623' }}>
                Coverage Analysis Complete
              </div>
              <h2 className="text-3xl font-bold text-[#E8EDF5] mb-2"
                style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                {gapCount === 0
                  ? 'WELL COVERED'
                  : critCount > 0
                  ? `${critCount} CRITICAL GAP${critCount > 1 ? 'S' : ''} FOUND`
                  : `${gapCount} GAP${gapCount > 1 ? 'S' : ''} TO ADDRESS`
                }
              </h2>
              <p className="text-[#8A96AA] text-sm">
                {gapCount === 0
                  ? 'Based on your answers, your coverage appears solid. Consider getting a rate comparison to make sure you\'re not overpaying.'
                  : `Your operation has ${gapCount} coverage gap${gapCount > 1 ? 's' : ''} — ${critCount > 0 ? `${critCount} of which ${critCount > 1 ? 'are' : 'is'} critical` : 'review recommended'}. See the details below.`
                }
              </p>
            </div>

            {/* Gap items */}
            {gaps.map(gap => {
              const ps  = PRIORITY_STYLES[gap.priority]
              const si  = STATUS_ICON[gap.status]
              return (
                <div key={gap.name} className={`rounded-xl border ${ps.border} ${ps.bg} p-5`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold ${si.color}`}>{si.icon}</span>
                      <h3 className="font-semibold text-[#E8EDF5]">{gap.name}</h3>
                    </div>
                    <span className={`font-mono text-xs border rounded px-2 py-0.5 flex-shrink-0 ${ps.border} ${ps.text}`}>
                      {ps.badge}
                    </span>
                  </div>
                  <p className="text-[#8A96AA] text-sm leading-relaxed pl-7">{gap.detail}</p>
                  {gap.status === 'gap' && (
                    <div className="pl-7 mt-3">
                      <Link href={gap.link}
                        className="text-[#F5A623] text-xs font-mono hover:underline">
                        Get quotes to fix this gap →
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}

            {/* CTA */}
            <div className="bg-[#111622] rounded-2xl border border-[#3A4558]/30 p-6">
              <h3 className="text-xl font-bold text-[#E8EDF5] mb-2"
                style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                READY TO FILL YOUR GAPS?
              </h3>
              <p className="text-[#8A96AA] text-sm leading-relaxed mb-5">
                A 3-minute quote comparison across carriers that specialise in commercial trucking
                will show you what it costs to close these gaps — and often saves you money on
                coverage you already have.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/go/insurance"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold tracking-widest text-sm transition-all hover:-translate-y-0.5"
                  style={{ fontFamily: 'var(--font-display, sans-serif)', background: '#F5A623', color: '#080A0F' }}>
                  COMPARE QUOTES NOW →
                </Link>
                <button onClick={reset}
                  className="px-6 py-3 rounded-xl font-bold tracking-widest text-sm border border-[#3A4558]/50 text-[#8A96AA] hover:text-[#E8EDF5] transition-all"
                  style={{ fontFamily: 'var(--font-display, sans-serif)' }}>
                  START OVER
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}
