import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion'
import { Sparkles, ArrowDown } from 'lucide-react'

const CARDS = [
  {
    tag: 'Identity',
    question: 'Who are you?',
    answer:
      "I'm Tatheer — an independent freelance web developer who crafts modern websites and scalable web applications for growing local businesses.",
    subtext: 'React • Next.js • Tailwind CSS • UI/UX Design',
  },
  {
    tag: 'Mission',
    question: "What's your motive?",
    answer:
      "Most small businesses rely on generic, outdated templates that fail to convert. I want to change that by building clean, fast, and revenue-driving digital sites.",
    subtext: 'High Conversion • 100% Mobile Responsive • Modern Standards',
  },
  {
    tag: 'Services',
    question: 'What do you do?',
    answer:
      'I design and engineer custom landing pages, client portals, and full-stack web applications built for speed, SEO ranking, and effortless user experience.',
    subtext: 'Full-Stack Development • API Integration • Performance Tuning',
  },
  {
    tag: 'Background',
    question: "What's your background?",
    answer:
      'Computer Science student with deep hands-on expertise across React, Flutter, and Python. I approach every project with a dedicated engineering mindset.',
    subtext: 'Scalable Architecture • Clean Codebase • Long-term Support',
  },
]

// ============================================================
// StackCard — same motion values as before, upgraded visuals.
//
// Kept identical:
//   y, scale, rotate, opacity from scrollYProgress
//   same start/end ranges
//   same zIndex scheme
//
// Added:
//   entrance choreography per card
//   hover lift + shadow bloom + gold border brighten
//   exit blur for premium dissolve
//   "peek" of next cards behind (via translate/scale on non-active)
// ============================================================
function StackCard({ item, index, total, scrollYProgress, activeIndex }) {
  const pad = 0.15                                   // <-- tune this (0.1–0.25 feels good)
  const start = pad + (index / total) * (1 - pad)
  const end   = pad + ((index + 1) / total) * (1 - pad)
  const isLast = index === total - 1

  const y = useTransform(scrollYProgress, [start, end], ['0%', isLast ? '0%' : '-200%'])
  const scale = useTransform(scrollYProgress, [start, end], [1, isLast ? 1 : 0.92])
  const rotate = useTransform(
    scrollYProgress,
    [start, end],
    [0, isLast ? 0 : index % 2 === 0 ? -3 : 3]
  )
  const opacity = useTransform(scrollYProgress, [start, end], [1, isLast ? 1 : 0.1])

  const isActive = activeIndex === index

  return (
    <motion.div
      style={{
        y,
        scale,
        rotate,
        opacity,
        zIndex: total - index,
      }}
      whileHover={
        isActive
          ? {
              y: '-2%',
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      className="group absolute inset-0 flex flex-col justify-start overflow-hidden rounded-3xl
                 border border-[var(--gold)]/25
                 bg-white p-6
                 shadow-[0_30px_80px_-30px_rgba(90,70,30,0.35),0_1px_0_rgba(255,255,255,0.9)_inset]
                 transition-[border-color,box-shadow] duration-500
                 hover:border-[var(--gold)]/50
                 hover:shadow-[0_40px_100px_-30px_rgba(90,70,30,0.5),0_1px_0_rgba(255,255,255,0.95)_inset]
                 dark:border-[var(--gold)]/25
                 dark:bg-[#14131A]
                 dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.05)_inset]
                 dark:hover:border-[var(--gold)]/50
                 dark:hover:shadow-[0_40px_100px_-30px_rgba(212,175,106,0.25),0_1px_0_rgba(255,255,255,0.06)_inset]
                 sm:p-10"
    >
      {/* Gold bloom corner — only visible on active/hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl
                   opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--gold) 40%, transparent), transparent 70%)',
        }}
      />

      {/* Top Meta Bar */}
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full
                         border border-[var(--gold)]/30 bg-[var(--gold)]/[0.08]
                         px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]
                         text-[var(--gold)]">
          <Sparkles className="h-3 w-3" />
          {item.tag}
        </span>
        <span className="font-mono text-xs font-semibold tabular-nums tracking-wider text-[var(--gold)]">
          0{index + 1} <span className="opacity-40">/</span> 0{total}
        </span>
      </div>

      {/* Grouped Content Block — entrance choreography per card.
          Each element uses `isActive` to trigger its own timing. */}
      <div className="relative mt-5 flex flex-col gap-3 sm:mt-7 sm:gap-4">
        <motion.h3
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0.35,
            y: isActive ? 0 : 6,
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl"
        >
          {item.question}
        </motion.h3>
        <motion.p
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0.4,
            y: isActive ? 0 : 6,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: isActive ? 0.05 : 0 }}
          className="text-sm leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E] sm:text-lg"
        >
          {item.answer}
        </motion.p>
      </div>

      {/* Footer Subtext — gold hairline rule + tracked label */}
      <div className="relative mt-auto pt-3 sm:pt-4">
        <div
          aria-hidden
          className="mb-3 h-px w-full bg-gradient-to-r from-[var(--gold)]/40 via-[var(--gold)]/15 to-transparent"
        />
        <motion.p
          initial={false}
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--gold)] sm:text-xs"
        >
          {item.subtext}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function GetToKnowMeSection() {
  const containerRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Logic unchanged: same offset swap for mobile/desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isDesktop ? ['start start', 'end end'] : ['start center', 'end center'],
  })

  // Track which card is "active" so we can drive per-card choreography
  // and the desktop right-column text. Doesn't touch scroll physics.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(CARDS.length - 1, Math.max(0, Math.floor(v * CARDS.length)))
    setActiveIndex(idx)
    if (v > 0.02 && !hasStarted) setHasStarted(true)
  })

  const sectionHeight = `${CARDS.length * 120}vh`

  return (
    <section id="about" className="relative w-full scroll-mt-16 pt-28 pb-20 lg:scroll-mt-0 lg:pt-22 lg:pb-0">
      {/* Ambient warm glow behind the whole section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 30% 40%, color-mix(in srgb, var(--gold) 7%, transparent), transparent 70%)',
        }}
      />

      <div ref={containerRef}>
        <div
          className="mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-[3fr_2fr] lg:gap-16"
          style={{ '--stack-h': sectionHeight }}
        >
          {/* CARDS CONTAINER */}
          <div className="relative lg:order-1 lg:mt-0" style={{ height: sectionHeight }}>
            <div className="sticky top-[38%] mx-auto h-[380px] max-w-xl px-2 sm:h-[400px] sm:px-4
                            lg:sticky lg:top-10 lg:flex lg:h-screen lg:max-w-none lg:items-center lg:justify-center lg:px-0">

              {/* MOBILE-ONLY HEADING — retheme'd to match hero */}
              <div className="absolute -top-28 left-0 right-0 text-center lg:hidden">
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl"
                >
                  Get to Know Me
                </motion.h2>
                {/* Gold rule — matches hero underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="mx-auto mt-3 h-px w-16 origin-left bg-gradient-to-r from-[var(--gold)] to-transparent"
                />
                <p className="mt-3 text-xs text-[#5A5A5A] dark:text-[#9A9A9E] sm:text-sm">
                  Scroll to flip through my stack
                </p>
              </div>

              {/* CARD STACK */}
              <div className="relative mx-auto mt-12 h-[380px] w-full max-w-xl lg:mt-0 sm:h-[400px]">
                {/* Peek card behind — signals "there's more below" */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 translate-y-3 scale-[0.96]
                             rounded-3xl border border-[var(--gold)]/10 bg-white/60
                             dark:border-[var(--gold)]/10 dark:bg-[#14131A]/50"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 translate-y-6 scale-[0.92]
                             rounded-3xl border border-[var(--gold)]/[0.06] bg-white/40
                             dark:border-[var(--gold)]/[0.06] dark:bg-[#14131A]/30"
                />

                {CARDS.map((item, i) => (
                  <StackCard
                    key={i}
                    item={item}
                    index={i}
                    total={CARDS.length}
                    scrollYProgress={scrollYProgress}
                    activeIndex={activeIndex}
                  />
                ))}

                {/* Progress rail — desktop only, right edge of card stack */}
                <div className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2
                                flex-col items-center gap-3 lg:flex">
                  <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--gold)]">
                    0{activeIndex + 1}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {CARDS.map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{
                          height: i === activeIndex ? 20 : 6,
                          opacity: i === activeIndex ? 1 : 0.25,
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-[2px] rounded-full bg-[var(--gold)]"
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--gold)]/40">
                    0{CARDS.length}
                  </span>
                </div>
              </div>

              {/* Scroll hint — only before user starts scrolling, mobile+desktop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hasStarted ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2
                           items-center gap-2 lg:flex"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]/60"
                >
                  Scroll
                </motion.span>
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowDown className="h-3 w-3 text-[var(--gold)]/60" />
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* DESKTOP-ONLY TEXT — now synced with active card */}
          <div className="relative mt-0 hidden text-center lg:order-2 lg:block lg:h-[var(--stack-h)] lg:text-left">
            <div className="lg:sticky lg:top-10 lg:flex lg:h-screen lg:items-center">
              <div>
                {/* Kicker — reflects the active card's tag */}
                <motion.div
                  key={`kicker-${activeIndex}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 inline-flex items-center gap-2 rounded-full
                             border border-[var(--gold)]/30 bg-[var(--gold)]/[0.06]
                             px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]
                             text-[var(--gold)]"
                >
                  <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />
                  {CARDS[activeIndex]?.tag ?? 'Identity'}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)] sm:text-4xl"
                >
                  Get to Know Me
                </motion.h2>

                {/* Gold rule matching hero */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="mt-5 h-px w-24 origin-left bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent"
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="mt-5 text-base text-[#5A5A5A] dark:text-[#9A9A9E]"
                >
                  A quick look at my journey.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                  className="mt-4 max-w-sm text-sm leading-relaxed text-[#5A5A5A] dark:text-[#8A8A90]"
                >
                  A CS student who turned curiosity about how software gets built
                  into a habit of shipping real products — from freelance client
                  sites to full-stack tools and AI-driven pipelines. Each card is
                  a different angle on the same throughline.
                </motion.p>

                {/* Progress counter below the text — big, editorial */}
                <div className="mt-10 flex items-center gap-4">
                  <span className="font-mono text-4xl font-semibold tabular-nums tracking-tight text-[var(--ink)]">
                    0{activeIndex + 1}
                  </span>
                  <div className="flex-1">
                    <div className="h-px w-full bg-black/[0.08] dark:bg-white/[0.08]">
                      <motion.div
                        animate={{ scaleX: (activeIndex + 1) / CARDS.length }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="h-px origin-left bg-gradient-to-r from-[var(--gold)] to-[var(--gold)]/40"
                      />
                    </div>
                  </div>
                  <span className="font-mono text-xs tabular-nums tracking-wider text-[var(--gold)]">
                    0{CARDS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}