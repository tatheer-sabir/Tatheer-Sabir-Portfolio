import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, FolderKanban } from 'lucide-react'

// ============================================================
// THEME — "Ink & Champagne"
//
// Section stays warm-paper (light) / near-black (dark) — unchanged.
// ONLY the code panel flips with the mode:
//   light mode -> BLACK editor (as before)
//   dark  mode -> WHITE editor (the change)
// Everything else stays exactly as it was.
//
// FLOAT: the code panel now idles with a slow, continuous
// up/down drift once it has landed — like it's hovering — on
// top of (not instead of) its original entrance animation.
// Disabled under prefers-reduced-motion.
// ============================================================

const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"

// ---- Dark editor syntax (used in LIGHT mode) ----
const codeLinesDark = [
  [{ t: '// about.ts', c: 'text-[#5B5A78]' }],
  [],
  [
    { t: 'const ', c: 'text-[#7AA2F7]' },
    { t: 'tatheer ', c: 'text-[#E4E1F5]' },
    { t: '= {', c: 'text-[#8B93B8]' },
  ],
  [
    { t: '  role', c: 'text-[#C9BEFF]' },
    { t: ': ', c: 'text-[#8B93B8]' },
    { t: '"Full-Stack Developer"', c: 'text-[#B7E8A8]' },
    { t: ',', c: 'text-[#8B93B8]' },
  ],
  [
    { t: '  study', c: 'text-[#C9BEFF]' },
    { t: ': ', c: 'text-[#8B93B8]' },
    { t: '"BS Computer Science"', c: 'text-[#B7E8A8]' },
    { t: ',', c: 'text-[#8B93B8]' },
  ],
  [
    { t: '  university', c: 'text-[#C9BEFF]' },
    { t: ': ', c: 'text-[#8B93B8]' },
    { t: '"Univ. of Gujrat"', c: 'text-[#B7E8A8]' },
    { t: ',', c: 'text-[#8B93B8]' },
  ],
  [
    { t: '  stack', c: 'text-[#C9BEFF]' },
    { t: ': [', c: 'text-[#8B93B8]' },
    { t: '"React"', c: 'text-[#B7E8A8]' },
    { t: ', ', c: 'text-[#8B93B8]' },
    { t: '"Flutter"', c: 'text-[#B7E8A8]' },
    { t: ', ', c: 'text-[#8B93B8]' },
    { t: '"Firebase"', c: 'text-[#B7E8A8]' },
    { t: ', ', c: 'text-[#8B93B8]' },
    { t: '"Python"', c: 'text-[#B7E8A8]' },
    { t: '],', c: 'text-[#8B93B8]' },
  ],
  [
    { t: '  openTo', c: 'text-[#C9BEFF]' },
    { t: ': ', c: 'text-[#8B93B8]' },
    { t: '"internships"', c: 'text-[#B7E8A8]' },
    { t: ',', c: 'text-[#8B93B8]' },
  ],
  [{ t: '};', c: 'text-[#8B93B8]' }],
  [],
  [
    { t: 'export default ', c: 'text-[#7AA2F7]' },
    { t: 'tatheer', c: 'text-[#E4E1F5]' },
    { t: ';', c: 'text-[#8B93B8]' },
  ],
]

// ---- Light editor syntax (used in DARK mode) ----
const codeLinesLight = [
  [{ t: '// about.ts', c: 'text-[#9A958A]' }],
  [],
  [
    { t: 'const ', c: 'text-[#6A4FBF]' },
    { t: 'tatheer ', c: 'text-[#1A1A1A]' },
    { t: '= {', c: 'text-[#6E6A63]' },
  ],
  [
    { t: '  role', c: 'text-[#8A6A2F]' },
    { t: ': ', c: 'text-[#6E6A63]' },
    { t: '"Full-Stack Developer"', c: 'text-[#0E7A4F]' },
    { t: ',', c: 'text-[#6E6A63]' },
  ],
  [
    { t: '  study', c: 'text-[#8A6A2F]' },
    { t: ': ', c: 'text-[#6E6A63]' },
    { t: '"BS Computer Science"', c: 'text-[#0E7A4F]' },
    { t: ',', c: 'text-[#6E6A63]' },
  ],
  [
    { t: '  university', c: 'text-[#8A6A2F]' },
    { t: ': ', c: 'text-[#6E6A63]' },
    { t: '"Univ. of Gujrat"', c: 'text-[#0E7A4F]' },
    { t: ',', c: 'text-[#6E6A63]' },
  ],
  [
    { t: '  stack', c: 'text-[#8A6A2F]' },
    { t: ': [', c: 'text-[#6E6A63]' },
    { t: '"React"', c: 'text-[#0E7A4F]' },
    { t: ', ', c: 'text-[#6E6A63]' },
    { t: '"Flutter"', c: 'text-[#0E7A4F]' },
    { t: ', ', c: 'text-[#6E6A63]' },
    { t: '"Firebase"', c: 'text-[#0E7A4F]' },
    { t: ', ', c: 'text-[#6E6A63]' },
    { t: '"Python"', c: 'text-[#0E7A4F]' },
    { t: '],', c: 'text-[#6E6A63]' },
  ],
  [
    { t: '  openTo', c: 'text-[#8A6A2F]' },
    { t: ': ', c: 'text-[#6E6A63]' },
    { t: '"internships"', c: 'text-[#0E7A4F]' },
    { t: ',', c: 'text-[#6E6A63]' },
  ],
  [{ t: '};', c: 'text-[#6E6A63]' }],
  [],
  [
    { t: 'export default ', c: 'text-[#6A4FBF]' },
    { t: 'tatheer', c: 'text-[#1A1A1A]' },
    { t: ';', c: 'text-[#6E6A63]' },
  ],
]

const leftContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const leftItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const ruleAnim = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.55 } },
}
const panelAnim = {
  hidden: { opacity: 0, x: 28, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
  },
}

function CodeLine({ tokens, index, revealed }) {
  if (tokens.length === 0) return <div className="h-[1.5em] sm:h-[1.6em]" aria-hidden />
  return (
    <div className="flex">
      <span className="mr-3 w-4 shrink-0 select-none text-right font-mono tabular-nums opacity-40 sm:mr-4">
        {index}
      </span>
      <motion.div
        initial={revealed ? false : { clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 0.4, ease: 'linear', delay: index * 0.085 }}
        className="whitespace-pre"
      >
        {tokens.map((tok, i) => (
          <span key={i} className={tok.c}>
            {tok.t}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const [typingDone, setTypingDone] = useState(prefersReducedMotion)
  const [codeHovered, setCodeHovered] = useState(false)
  // Entrance (panelAnim) plays once; the float loop only kicks in after
  // it lands, so the two never fight over the same beat.
  const [panelLanded, setPanelLanded] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return
    const totalLines = codeLinesDark.length
    const timer = setTimeout(() => setTypingDone(true), totalLines * 85 + 400)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  const scrollToSection = (id) => (event) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="home"
      className="relative w-full scroll-mt-16 overflow-hidden px-4 py-10
                 bg-[#FAF8F4] text-[#1A1A1A]
                 dark:bg-[#0E0E10] dark:text-[#F2F1EE]
                 [--gold:#8A6A2F] [--gold-soft:#C9A961] [--ink:#1A1A1A]
                 dark:[--gold:#D4AF6A] dark:[--gold-soft:#E8CE94] dark:[--ink:#F2F1EE]
                 lg:scroll-mt-0 sm:px-6 sm:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.16] mix-blend-multiply
                   dark:opacity-[0.07] dark:mix-blend-screen"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: '140px 140px' }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 65% 55% at 50% 35%, color-mix(in srgb, var(--gold) 9%, transparent), transparent 70%),
            radial-gradient(ellipse 55% 60% at 8% 90%, color-mix(in srgb, #5A6B8A 6%, transparent), transparent 70%)
          `,
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_auto] lg:items-center lg:gap-x-12 lg:gap-y-0">
        {/* ============ COPY — TOP HALF ============ */}
        <motion.div
          variants={leftContainer}
          initial="hidden"
          animate="show"
          className="order-1 text-center lg:order-none lg:col-start-1 lg:row-start-1 lg:text-left"
        >
          <motion.div variants={leftItem} className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/30
                             bg-[var(--gold)]/[0.045] px-3 py-1 font-mono text-[10px] uppercase
                             tracking-[0.2em] text-[var(--gold)]
                             shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]
                             dark:border-[var(--gold)]/25 dark:bg-[var(--gold)]/[0.07]
                             dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]">
              <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />
              Computer Science Student
            </span>
          </motion.div>

          <motion.h1
            variants={leftItem}
            className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[var(--ink)]
                       sm:text-5xl lg:text-[4.5rem] lg:leading-[1.02]"
          >
            Tatheer Sabir
          </motion.h1>

          <motion.div
            variants={ruleAnim}
            aria-hidden
            className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent
                       lg:mx-0"
          />

          <motion.h2
            variants={leftItem}
            className="mt-5 text-lg font-normal tracking-tight text-[#5A5A5A]
                       dark:text-[#A8A8A8] sm:text-xl"
          >
            Full-Stack Developer
          </motion.h2>

          <motion.p
            variants={leftItem}
            className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A8A8A]
                       dark:text-[#6E6E72]"
          >
            Available · Internships · 2025
          </motion.p>
        </motion.div>

        {/* ============ CODE SNIPPET ============ */}
        {/* Outer motion.div: handles the one-time entrance only (fade + slide + blur-in).
            It no longer owns any looping motion, so the entrance transition and the
            float below never compete over the same transform. */}
        <motion.div
          variants={panelAnim}
          initial="hidden"
          animate="show"
          onAnimationComplete={() => setPanelLanded(true)}
          className="relative order-2 mx-auto w-full max-w-sm lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-auto lg:max-w-lg lg:self-center"
        >
          {/* Inner motion.div: the continuous "hovering" idle loop. Starts only
              once the entrance has landed, drifts a few px up and down forever,
              and is skipped entirely under prefers-reduced-motion. */}
          <motion.div
            animate={
              !prefersReducedMotion && panelLanded
                ? { y: [0, -10, 0] }
                : { y: 0 }
            }
            transition={
              !prefersReducedMotion && panelLanded
                ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            onMouseEnter={() => setCodeHovered(true)}
            onMouseLeave={() => setCodeHovered(false)}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] blur-3xl transition-opacity duration-700"
              style={{
                background:
                  'radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--gold) 55%, transparent), transparent 65%)',
                opacity: codeHovered ? 0.5 : 0,
              }}
            />

            {/* Outer desktop card: light card on light, dark transparent on dark (unchanged) */}
            <div
              className="sm:rounded-[22px] sm:bg-white sm:p-3 sm:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.14)] sm:ring-1 sm:ring-black/[0.05]
                         transition-all duration-500
                         dark:sm:bg-transparent dark:sm:p-0 dark:sm:shadow-none dark:sm:ring-0"
            >
              {/* THE PANEL — flips with the mode:
                  LIGHT mode -> BLACK editor (unchanged)
                  DARK  mode -> WHITE editor (the change) */}
              <div
                className="overflow-hidden rounded-lg
                           bg-[#0A0A0C] ring-1 ring-white/[0.06]
                           sm:rounded-2xl
                           dark:bg-white dark:ring-black/[0.08]"
                style={{
                  boxShadow: codeHovered
                    ? '0 30px 80px -25px rgba(0,0,0,0.55), 0 0 0 1px color-mix(in srgb, var(--gold) 40%, transparent)'
                    : undefined,
                }}
              >
                {/* Chrome bar — flips with the editor */}
                <div className="hidden items-center border-b border-white/[0.06] bg-[#0A0A0C] px-4 py-3
                                dark:border-black/[0.06] dark:bg-[#F6F3EB] sm:flex">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#33333A] dark:bg-[#C9C2B2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#33333A] dark:bg-[#C9C2B2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#33333A] dark:bg-[#C9C2B2]" />
                    <span className="ml-3 font-mono text-[11px] tracking-wide text-[#8A85A8] dark:text-[#8A8270]">
                      about.ts
                    </span>
                  </div>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-[#55555E] dark:text-[#9A9280]">
                    TS · 13 lines
                  </span>
                </div>

                {/* Code body — flips with the editor */}
                <div className="overflow-x-auto bg-[#0A0A0C] px-4 py-4 font-mono text-[11px] leading-[1.6]
                                dark:bg-white sm:px-5 sm:py-6 sm:pb-8 sm:text-[13px] sm:leading-[1.75]">
                  {/* Dark syntax in light mode */}
                  <div className="dark:hidden">
                    {codeLinesDark.map((tokens, i) => (
                      <CodeLine key={i} tokens={tokens} index={i + 1} revealed={typingDone} />
                    ))}
                  </div>
                  {/* Light syntax in dark mode */}
                  <div className="hidden dark:block">
                    {codeLinesLight.map((tokens, i) => (
                      <CodeLine key={i} tokens={tokens} index={i + 1} revealed={typingDone} />
                    ))}
                  </div>

                  <div className="flex">
                    <span className="mr-3 w-4 shrink-0 sm:mr-4" aria-hidden />
                    <motion.span
                      aria-hidden
                      initial={{ opacity: 0 }}
                      animate={
                        typingDone
                          ? prefersReducedMotion
                            ? { opacity: 1 }
                            : { opacity: [1, 0.15, 1] }
                          : { opacity: 0 }
                      }
                      transition={
                        typingDone && !prefersReducedMotion
                          ? { duration: 1.15, repeat: Infinity, ease: 'easeInOut' }
                          : { duration: 0.2 }
                      }
                      className="inline-block h-[1.1em] w-[7px] translate-y-[0.15em] bg-[var(--gold)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Availability chip — floats together with the panel as one unit */}
            <div
              className="relative mt-3 flex w-fit items-center gap-2 rounded-full
                         border border-[var(--gold)]/25 bg-white py-1.5 pl-1.5 pr-4
                         shadow-[0_10px_30px_-15px_rgba(138,106,47,0.4),0_1px_0_rgba(255,255,255,0.9)_inset]
                         backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5
                         dark:bg-[#14131A]
                         dark:shadow-[0_10px_30px_-15px_rgba(212,175,106,0.4),0_1px_0_rgba(255,255,255,0.06)_inset]
                         mx-auto sm:absolute sm:-bottom-6 sm:right-0 sm:mt-0 sm:mx-0"
            >
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full
                               bg-gradient-to-br from-[var(--gold-soft)] to-[var(--gold)]
                               text-[11px] font-semibold tracking-tight text-[#1A1A1A]
                               ring-1 ring-white/40 dark:ring-white/15">
                <img
                  src="/assets/tatheer-sabir.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <span className="relative">TS</span>
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                </span>
                Open to work
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ============ COPY — BOTTOM HALF ============ */}
        <motion.div
          variants={leftContainer}
          initial="hidden"
          animate="show"
          className="order-3 pb-2 text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:pb-0 lg:text-left"
        >
          <motion.p
            variants={leftItem}
            className="mx-auto max-w-md text-sm leading-relaxed text-[#5A5A5A]
                       dark:text-[#9A9A9E] sm:text-base lg:mx-0"
          >
            I build modern web and mobile applications with React, Flutter, Python, and AI — turning ideas into practical, real-world products.
          </motion.p>

          <motion.div
            variants={leftItem}
            className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#contact"
              onClick={scrollToSection('contact')}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full
                         bg-[var(--gold)] px-6 py-3 text-sm font-medium tracking-tight
                         text-[#0B0B0C]
                         shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1),0_10px_30px_-12px_rgba(138,106,47,0.7)]
                         transition-all duration-500
                         hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.1),0_16px_44px_-12px_rgba(138,106,47,0.95)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--gold)]
                         focus-visible:ring-offset-[#FAF8F4] dark:focus-visible:ring-offset-[#0E0E10]
                         active:scale-[0.98] sm:w-auto"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent
                           transition-transform duration-1000 ease-out group-hover:translate-x-full"
              />
              <span className="relative">Contact now</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#projects"
              onClick={scrollToSection('projects')}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full
                         border border-[var(--gold)]/40 bg-transparent px-6 py-3 text-sm font-medium tracking-tight
                         text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]
                         transition-all duration-500
                         hover:border-[var(--gold)]/70 hover:bg-[var(--gold)]/[0.06]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--gold)]
                         focus-visible:ring-offset-[#FAF8F4] dark:focus-visible:ring-offset-[#0E0E10]
                         dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                         active:scale-[0.98] sm:w-auto"
            >
              View Projects
              <FolderKanban className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px
                   bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent"
      />
    </section>
  )
}

export default HeroSection