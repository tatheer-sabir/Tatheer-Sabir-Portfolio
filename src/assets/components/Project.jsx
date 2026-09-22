import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  GitFork,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Compass,
  Sparkles,
  BookOpen,
} from 'lucide-react'

/* ==========================================================================
   1. Data (unchanged)
   ========================================================================== */

const primaryProjects = [
  {
    id: 'lumio',
    indexStr: '01',
    title: 'Lumio Experience',
    subtitle: 'Curated Motivational & Quotes App',
    category: 'Mobile UX',
    deviceType: 'mobile',
    coverBg: 'bg-emerald-950/80 dark:bg-[#15231c]',
    borderColor: 'border-emerald-500/40',
    accentColor: 'text-emerald-600 dark:text-emerald-400',
    coverImage: 'src/assets/Image/lumio.png',
    videoUrl: 'src/assets/Videos/lumio.mp4',
    posterImage: '/images/lumia-cover.jpg',
    overview:
      'An interactive mobile application delivering daily motivation across 10 curated life categories with custom bookmarking and quote exports.',
    keyFeatures: [
      '10+ categories (Study, Focus, Mindset, Growth)',
      'Fluid swipe gestures and animated transitions',
      'Favorites bookmarking & daily notification schedule',
      'Custom theme toggle & quote card exporter',
    ],
    techStack: ['Flutter', 'React Native', 'Firebase'],
    liveUrl: 'https://github.com/tatheer-sabir/Lumio',
    githubUrl: 'https://github.com/tatheer-sabir/Lumio',
  },
  {
    id: 'commission-ai',
    indexStr: '02',
    title: 'Imparical AI',
    subtitle: 'Automated Story & Video Engine',
    category: 'AI / Pipeline',
    deviceType: 'laptop',
    coverBg: 'bg-slate-900/80 dark:bg-[#1e293b]',
    borderColor: 'border-blue-500/40',
    accentColor: 'text-sky-600 dark:text-sky-400',
    coverImage: 'src/assets/Image/Imaprical.png',
    videoUrl: 'src/assets/Videos/imparical.mp4',
    posterImage: '/images/commission-ai-cover.jpg',
    overview:
      'Fully automated story-generation, video rendering, and YouTube publishing engine built to run hands-free content pipelines.',
    keyFeatures: [
      'Automated story script generation via LLMs',
      'Synthetic voice generation & video clip assembly',
      'Direct YouTube Data API publishing pipeline',
      'Scheduled CRON job execution & error recovery',
    ],
    techStack: ['Python', 'OpenAI API', 'FFmpeg', 'YouTube API', 'n8n'],
    liveUrl: 'https://www.youtube.com/@ImperialRebirthTales-m9f',
    githubUrl: 'https://github.com/tatheer-sabir/imperial-Ai',
  },
  {
    id: 'daily-loop',
    indexStr: '03',
    title: 'The Daily Loop',
    subtitle: 'News Summarizer & Dispatcher',
    category: 'Web Engine',
    deviceType: 'laptop',
    coverBg: 'bg-orange-950/80 dark:bg-[#2a1b18]',
    borderColor: 'border-orange-500/40',
    accentColor: 'text-orange-600 dark:text-orange-400',
    coverImage: 'src/assets/Image/dailyloop.png',
    videoUrl: 'src/assets/Videos/Daily Loop.mp4',
    posterImage: '/images/daily-loop-cover.jpg',
    overview:
      'Aggregates feeds across 10 website categories, runs AI summarization on news items, and delivers personalized email newsletters.',
    keyFeatures: [
      'RSS feed parser scraping 10 distinct niches',
      'AI-driven summary filtering and curation',
      'User registration & subscription preference portal',
      'Automated Gmail API dispatch engine',
    ],
    techStack: ['Node.js', 'Express', 'React', 'Gmail API', 'MongoDB'],
    liveUrl: 'https://thedailyloop.vercel.app/',
    githubUrl: 'https://github.com/thedailyloopteam-beep/thedailyloop',
  },
  {
    id: 'freelio',
    indexStr: '04',
    title: 'Freelio Analytics',
    subtitle: 'Freelancer Project & Earnings Suite',
    category: 'SaaS Platform',
    deviceType: 'mobile',
    coverBg: 'bg-purple-950/80 dark:bg-[#221c35]',
    borderColor: 'border-purple-500/40',
    accentColor: 'text-purple-600 dark:text-purple-400',
    coverImage: 'src/assets/Image/Freelio.png',
    videoUrl: 'src/assets/Videos/Freelio.mp4',
    posterImage: '/images/freelio-cover.jpg',
    overview:
      'Productivity and financial management tool engineered for freelancers to track ongoing client deliverables and net earnings.',
    keyFeatures: [
      'Real-time project milestone & deadline tracker',
      'Client invoice & revenue analytics dashboard',
      'Hourly wage & project payout calculator',
      'Local data encryption & cloud backup sync',
    ],
    techStack: ['React Native', 'Redux Toolkit', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://github.com/tatheer-sabir/freelio',
    githubUrl: 'https://github.com/tatheer-sabir/freelio',
  },
  {
    id: 'nexus-studio',
    indexStr: '05',
    title: 'Iron Core',
    subtitle: 'Gym Landing Page',
    category: 'Website',
    deviceType: 'Responsive',
    coverBg: 'bg-rose-950/80 dark:bg-[#2d1218]',
    borderColor: 'border-rose-500/40',
    accentColor: 'text-rose-600 dark:text-rose-400',
    coverImage: 'src/assets/Image/ironcore.png',
    videoUrl: 'src/assets/Videos/iron core.mp4',
    posterImage: '/images/nexus-cover.jpg',
    overview:
      'A high-impact fitness landing page built to convert visitors into gym members, with bold typography, smooth scroll animations, and a fully responsive layout across devices.',
    keyFeatures: [
      'Hero section with animated call-to-action and membership pitch',
      'Responsive layout optimized for mobile, tablet, and desktop',
      'Class/program showcase with pricing and trainer highlights',
      'Smooth scroll-triggered animations and hover interactions',
    ],
    techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://iron-core-two.vercel.app/',
    githubUrl: 'https://github.com/tatheer-sabir/IRON-CORE',
  },
]

/* ==========================================================================
   2. Sub-Components
   ========================================================================== */

function MediaFrame({ project }) {
  const isMobile = project.deviceType === 'mobile'

  if (isMobile) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="relative w-[150px] rounded-[28px]
                        bg-gradient-to-b from-[#33333A] to-[#1A1A1E]
                        p-[10px]
                        shadow-[0_20px_45px_rgba(0,0,0,0.35)]
                        dark:from-[#2b2d33] dark:to-[#0A0A0C]
                        dark:shadow-[0_20px_45px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.05)]
                        sm:w-[170px]">
          <div className="absolute -right-[2px] top-[70px] h-10 w-[2px] rounded bg-[#2A2A30] dark:bg-[#1c1d21]" />
          <div className="absolute -left-[2px] top-[60px] h-6 w-[2px] rounded bg-[#2A2A30] dark:bg-[#1c1d21]" />
          <div className="absolute -left-[2px] top-[90px] h-6 w-[2px] rounded bg-[#2A2A30] dark:bg-[#1c1d21]" />

          <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[20px] bg-black">
            <video
              src={project.videoUrl}
              poster={project.posterImage}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center py-2">
      <div className="w-full overflow-hidden rounded-t-lg border border-b-0
                      border-black/[0.08] bg-[#F4F1EA]
                      shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)]
                      dark:border-white/[0.06] dark:bg-[#1b1d24]">
        <div className="flex items-center gap-2 border-b
                        border-black/[0.06] bg-[#EDE9DF] px-3 py-2
                        dark:border-white/[0.06] dark:bg-[#22242c]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#33333A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#33333A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#33333A]" />
          <div className="ml-2 flex-1 truncate rounded-full
                          border border-black/[0.06] bg-white px-3 py-1
                          text-center font-mono text-[9px] text-[#5A5A5A]
                          dark:border-white/[0.06] dark:bg-[#14151b] dark:text-[#9A9A9E]">
            {project.title.toLowerCase().replace(/\s+/g, '-')}.app
          </div>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <video
            src={project.videoUrl}
            poster={project.posterImage}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-90"
          />
        </div>
      </div>

      <div className="h-2 w-[92%] rounded-b-md
                      bg-gradient-to-b from-[#B8B0A0] to-[#E5DFD0]
                      shadow-lg
                      dark:from-[#3a3d47] dark:to-[#1b1d24]" />
      <div className="h-[3px] w-[40%] rounded-b-sm bg-[#6E6A63] dark:bg-[#0e0f13]" />
    </div>
  )
}

function OvalBookCard({ project, activeIndex, index, onSelect, onOpen }) {
  const offset = index - activeIndex
  const isCenter = offset === 0

  const absOffset = Math.abs(offset)
  const xTranslation = offset * 110
  const yTranslation = Math.pow(absOffset, 1.8) * 12
  const zIndex = 30 - absOffset * 5

  const scale = isCenter ? 1.15 : Math.max(0.75, 1 - absOffset * 0.12)
  const opacity = isCenter ? 1 : Math.max(0.4, 0.95 - absOffset * 0.2)

  return (
    <motion.div
      onClick={() => {
        if (isCenter) {
          onOpen(project)
        } else {
          onSelect(index)
        }
      }}
      animate={{ x: xTranslation, y: yTranslation, scale, opacity }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      style={{ zIndex }}
      className={`absolute cursor-pointer select-none rounded-r-md rounded-l-sm border
                  ${project.borderColor}
                  ${
                    isCenter
                      ? 'ring-2 ring-[var(--gold)] shadow-[0_15px_35px_rgba(138,106,47,0.35)] dark:shadow-[0_15px_35px_rgba(212,175,106,0.3)]'
                      : 'shadow-lg hover:brightness-110 dark:hover:brightness-125'
                  }
                  h-[280px] w-[170px] transition-shadow duration-500
                  sm:h-[320px] sm:w-[190px]`}
    >
      <div className="absolute top-0 bottom-0 left-0 z-20 w-3 rounded-l-sm bg-gradient-to-r from-black/60 via-white/10 to-transparent" />
      <div className="absolute top-0 bottom-0 left-1 z-20 w-[1px] bg-white/20" />

      <div className={`absolute inset-0 rounded-r-md ${project.coverBg}`} />

      <div className="relative z-10 flex h-full flex-col justify-between p-3.5 text-white">
        <div className="flex items-center justify-between border-b border-white/20 pb-2">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-white/60 sm:text-[11px]">
            {project.indexStr}
          </span>
          <Compass className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${project.accentColor}`} />
        </div>

        <div className="my-auto space-y-2 sm:space-y-3">
          <div className="relative mx-auto h-28 w-full overflow-hidden rounded border border-white/10 bg-black/40 shadow-inner sm:h-32">
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="text-center">
            <h3 className="font-serif text-sm font-bold tracking-wide text-white sm:text-base">
              {project.title}
            </h3>
            <p className="line-clamp-1 font-sans text-[9px] text-white/60 sm:text-[10px]">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-2 font-mono text-[9px] text-white/60 sm:text-[10px]">
          <span>{project.category}</span>
          <span className="flex items-center gap-1 font-semibold text-[var(--gold-soft,#E8CE94)]">
            {isCenter ? 'Open' : 'Select'}{' '}
            <Play className="h-2 w-2 fill-[var(--gold-soft,#E8CE94)] sm:h-2.5 sm:w-2.5" />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 rounded-r-md bg-gradient-to-tr from-transparent via-white/10 to-transparent dark:via-white/5" />
    </motion.div>
  )
}

function OpenBookModal({ project, onClose, onNext, onPrev }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999999999999999999999999999999999999999999] flex items-center justify-center overflow-y-auto
                 bg-black/60 p-3 backdrop-blur-xl perspective-[1200px]
                 dark:bg-black/80 sm:p-6 lg:px-24"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-5xl flex-col items-center"
      >
        {/* Header bar — label only, no close button */}
        <div className="mb-3 flex w-full items-center px-2 font-mono text-xs
                        text-[#5A5A5A] dark:text-[#9A9A9E]">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 animate-pulse text-[var(--gold)]" />
            <span className="font-bold uppercase tracking-wider text-[var(--gold)]">
              Volume {project.indexStr} // Archive Codex
            </span>
          </div>
        </div>

        {/* BOOK + SIDE CLOSE BUTTON WRAPPER
            The close button is absolutely positioned to the right edge of
            this wrapper, vertically centered. It never scrolls away. */}
        <div className="relative w-full">

          {/* SIDE CLOSE BUTTON — pinned to right edge of the book, centered */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close book"
            className="group absolute -right-4 top-1/2 z-[10000] hidden -translate-y-1/2
                       flex-col items-center gap-2 lg:flex
                       translate-x-full pl-3"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full
                         border border-[var(--gold)]/40 bg-white/95 text-[var(--gold)]
                         shadow-[0_8px_24px_-8px_rgba(90,70,30,0.4),inset_0_1px_0_rgba(255,255,255,0.9)]
                         backdrop-blur-md transition-all duration-500
                         group-hover:border-[var(--gold)]/70 group-hover:bg-[var(--gold)]
                         group-hover:text-[#0B0B0C]
                         group-hover:shadow-[0_12px_32px_-8px_rgba(138,106,47,0.85),inset_0_1px_0_rgba(255,255,255,0.6)]
                         dark:border-[var(--gold)]/40 dark:bg-[#14131A]/95 dark:text-[var(--gold)]
                         dark:group-hover:bg-[var(--gold)] dark:group-hover:text-[#0B0B0C]
                         dark:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            >
              <X className="h-5 w-5" />
            </span>
            <span className="rotate-180 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]/70"
                  style={{ writingMode: 'vertical-rl' }}>
              Close
            </span>
          </button>

          {/* MOBILE CLOSE BUTTON — top-right corner of the book */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close book"
            className="absolute -right-2 -top-2 z-[10000] flex h-10 w-10 items-center justify-center
                       rounded-full border border-[var(--gold)]/40 bg-white/95 text-[var(--gold)]
                       shadow-[0_8px_20px_-8px_rgba(90,70,30,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]
                       backdrop-blur-md transition-all duration-500
                       hover:bg-[var(--gold)] hover:text-[#0B0B0C]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                       dark:border-[var(--gold)]/40 dark:bg-[#14131A]/95 dark:text-[var(--gold)]
                       dark:hover:bg-[var(--gold)] dark:hover:text-[#0B0B0C]
                       lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Open book spread */}
          <motion.div
            initial={{ rotateX: 25, rotateY: -35, scale: 0.7, opacity: 0 }}
            animate={{ rotateX: 0, rotateY: 0, scale: 1, opacity: 1 }}
            exit={{ rotateX: -20, scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid w-full grid-cols-1 overflow-hidden rounded-2xl
                       border-4 border-[var(--gold)]/20 bg-white
                       shadow-[0_30px_90px_rgba(90,70,30,0.25)]
                       dark:border-[var(--gold)]/25 dark:bg-[#0E0E10]
                       dark:shadow-[0_30px_90px_rgba(0,0,0,0.9)]
                       lg:grid-cols-2"
          >
            {/* Spine crease */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 z-40 hidden w-12 -translate-x-1/2 bg-gradient-to-r from-black/10 via-black/[0.03] to-black/10 dark:from-black/70 dark:via-black/20 dark:to-black/70 lg:block" />
            <div className="pointer-events-none absolute inset-y-0 left-1/2 z-50 hidden w-[2px] -translate-x-1/2 bg-[var(--gold)]/30 lg:block" />

            {/* Ribbon bookmark */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-40 hidden h-32 w-3 -translate-x-2 -rotate-3 rounded-b-sm bg-gradient-to-b from-[var(--gold)] to-[var(--gold-soft,#C9A961)] shadow-md lg:block" />

            {/* LEFT PAGE — media demo */}
            <motion.div
              initial={{ rotateY: -40, transformOrigin: 'right center' }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="relative flex flex-col justify-between border-b border-black/[0.06]
                         bg-[#FBF9F4] p-6 shadow-[inset_0_0_30px_rgba(90,70,30,0.05)]
                         dark:border-white/[0.06] dark:bg-[#0F0F12]
                         dark:shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]
                         sm:p-8 lg:border-b-0 lg:border-r"
            >
              <div className="pointer-events-none absolute inset-0 bg-radial from-[var(--gold)]/[0.04] to-transparent" />

              <div className="relative z-10 flex items-center justify-between border-b
                              border-black/[0.06] pb-3 font-mono text-[11px]
                              dark:border-white/[0.06]">
                <span className="font-semibold uppercase tracking-widest text-[var(--gold)]">
                  [ Visual Demo Recording ]
                </span>
                <span className="text-[#9A958A] dark:text-[#6E6A63]">
                  Page L-{project.indexStr}
                </span>
              </div>

              <div className="relative z-10 my-4 flex justify-center">
                <MediaFrame project={project} />
              </div>
              <div className="relative z-10 -mt-2 mb-2 flex justify-center">
                <span className="flex items-center gap-1.5 rounded-md border
                                 border-[var(--gold)]/25 bg-white/85 px-2.5 py-1
                                 font-mono text-[10px] text-[var(--gold)] shadow-sm
                                 backdrop-blur-md dark:bg-black/60">
                  <Play className="h-2.5 w-2.5 fill-[var(--gold)]" />
                  Interactive Runtime Showcase
                </span>
              </div>

              <div className="relative z-10 border-t border-black/[0.06] pt-3 text-center dark:border-white/[0.06]">
                <p className="font-serif text-xs italic text-[#5A5A5A] dark:text-[#9A9A9E]">
                  &ldquo;{project.subtitle}&rdquo;
                </p>
              </div>
            </motion.div>

            {/* RIGHT PAGE — spec sheet */}
            <motion.div
              initial={{ rotateY: 40, transformOrigin: 'left center' }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="relative flex flex-col justify-between bg-white p-6
                         text-[var(--ink,#1A1A1A)]
                         shadow-[inset_0_0_30px_rgba(90,70,30,0.05)]
                         dark:bg-[#0E0E10] dark:text-[#F2F1EE]
                         dark:shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]
                         sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-radial from-[var(--gold)]/[0.04] to-transparent" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b
                                border-black/[0.06] pb-3 font-mono text-[11px]
                                dark:border-white/[0.06]">
                  <span className="uppercase tracking-widest text-[#5A5A5A] dark:text-[#9A9A9E]">
                    Category: {project.category}
                  </span>
                  <span className="text-[#9A958A] dark:text-[#6E6A63]">
                    Page R-{project.indexStr}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold tracking-tight text-[var(--ink)] dark:text-[#F2F1EE] sm:text-3xl">
                    {project.title}
                  </h2>
                  <div className="mt-2 font-sans text-xs leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E] sm:text-sm">
                    <span className="float-left pr-2 pt-0.5 font-serif text-3xl font-black leading-none text-[var(--gold)]">
                      {project.overview.charAt(0)}
                    </span>
                    {project.overview.slice(1)}
                  </div>
                </div>

                <div className="space-y-2 border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                    Core Architecture Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {project.keyFeatures.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 font-sans text-xs text-[#5A5A5A] dark:text-[#9A9A9E]"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
                  <h4 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#5A5A5A] dark:text-[#9A9A9E]">
                    Engineered With
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-[var(--gold)]/30 bg-[var(--gold)]/[0.08]
                                   px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--gold)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3 border-t
                              border-black/[0.06] pt-4 dark:border-white/[0.06]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-xl
                               bg-[var(--gold)] px-5 py-2 text-xs font-bold
                               text-[#0B0B0C]
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.15),0_8px_20px_-8px_rgba(138,106,47,0.7)]
                               transition-all duration-500
                               hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.18),0_12px_28px_-8px_rgba(138,106,47,0.95)]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent
                                 transition-transform duration-1000 ease-out group-hover:translate-x-full"
                    />
                    <ExternalLink className="relative h-3.5 w-3.5" />
                    <span className="relative">Launch Application</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border
                               border-[var(--gold)]/35 bg-transparent px-4 py-2 text-xs font-bold
                               text-[var(--ink,#1A1A1A)]
                               transition-all duration-500
                               hover:border-[var(--gold)]/70 hover:bg-[var(--gold)]/[0.06]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                               dark:text-[#F2F1EE]"
                  >
                    <GitFork className="h-3.5 w-3.5 text-[var(--gold)]" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Modal footer nav */}
        <div className="mt-4 flex items-center gap-6 font-mono text-xs text-[#5A5A5A] dark:text-[#9A9A9E]">
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 transition-colors duration-500 hover:text-[var(--gold)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          >
            <ChevronLeft className="h-4 w-4" /> Previous Book
          </button>
          <span className="text-[#B8B0A0] dark:text-[#3A3850]">|</span>
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 transition-colors duration-500 hover:text-[var(--gold)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          >
            Next Book <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ==========================================================================
   3. Main Projects Component
   ========================================================================== */

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const shelfRef = useRef(null)

  const wheelLockRef = useRef(false)
  const wheelResetTimeoutRef = useRef(null)

  const activeProject = primaryProjects[activeIndex]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % primaryProjects.length)
  }

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + primaryProjects.length) % primaryProjects.length
    )
  }

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpenModal) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpenModal])

  useEffect(() => {
    const shelfElement = shelfRef.current
    if (!shelfElement) return

    const handleShelfWheel = (e) => {
      const horizontalDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0

      if (horizontalDelta === 0) return

      e.preventDefault()
      e.stopPropagation()

      if (wheelLockRef.current) return

      if (horizontalDelta > 0) {
        handleNext()
      } else {
        handlePrev()
      }

      wheelLockRef.current = true
      clearTimeout(wheelResetTimeoutRef.current)
      wheelResetTimeoutRef.current = setTimeout(() => {
        wheelLockRef.current = false
      }, 450)
    }

    shelfElement.addEventListener('wheel', handleShelfWheel, { passive: false })

    return () => {
      shelfElement.removeEventListener('wheel', handleShelfWheel)
    }
  }, [])

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden
                 bg-[#FAF8F4] px-4 py-16 text-[#1A1A1A]
                 [--gold:#8A6A2F] [--gold-soft:#C9A961] [--ink:#1A1A1A]
                 dark:bg-[#0E0E10] dark:text-[#F2F1EE]
                 dark:[--gold:#D4AF6A] dark:[--gold-soft:#E8CE94] dark:[--ink:#F2F1EE]
                 scroll-mt-16 transition-colors duration-300
                 lg:scroll-mt-0 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl space-y-12">
        {/* Section Title */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full
                          border border-[var(--gold)]/30 bg-[var(--gold)]/[0.06]
                          px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]
                          text-[var(--gold)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Project Shelf Codex</span>
          </div>

          <h2 className="font-serif text-3xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-5xl">
            Selected Work{' '}
            <span className="text-[var(--gold)]">Library</span>
          </h2>

          <div
            aria-hidden
            className="h-px w-20 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent"
          />
        </div>

        {/* 3D Bookshelf */}
        <div className="relative rounded-2xl border border-[var(--gold)]/20
                        bg-white p-4
                        shadow-[0_30px_80px_-40px_rgba(90,70,30,0.35),0_1px_0_rgba(255,255,255,0.9)_inset]
                        dark:border-[var(--gold)]/20 dark:bg-[#14131A]
                        dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.05)_inset]
                        sm:p-8">
          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                       rounded-full border border-[var(--gold)]/40 bg-white/90
                       text-[var(--ink)] backdrop-blur-md
                       shadow-[0_6px_20px_-8px_rgba(90,70,30,0.35)]
                       transition-all duration-500
                       hover:border-[var(--gold)]/70 hover:bg-[var(--gold)]/[0.08]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                       dark:bg-[#14131A]/90 dark:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.7)]
                       sm:left-6"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center
                       rounded-full border border-[var(--gold)]/40 bg-white/90
                       text-[var(--ink)] backdrop-blur-md
                       shadow-[0_6px_20px_-8px_rgba(90,70,30,0.35)]
                       transition-all duration-500
                       hover:border-[var(--gold)]/70 hover:bg-[var(--gold)]/[0.08]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                       dark:bg-[#14131A]/90 dark:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.7)]
                       sm:right-6"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Shelf stage */}
          <div
            ref={shelfRef}
            className="relative flex h-[380px] w-full touch-pan-y items-center justify-center overflow-hidden sm:h-[420px]"
          >
            {primaryProjects.map((project, idx) => (
              <OvalBookCard
                key={project.id}
                project={project}
                activeIndex={activeIndex}
                index={idx}
                onSelect={(newIdx) => setActiveIndex(newIdx)}
                onOpen={() => setIsOpenModal(true)}
              />
            ))}
          </div>

          {/* Curved base */}
          <div className="relative mt-2">
            <div className="h-2.5 w-full rounded-t-sm border-t border-[var(--gold)]/20
                            bg-gradient-to-r from-[#3A2F27]/30 via-[#6E5A3A]/40 to-[#3A2F27]/30
                            dark:from-[#211b17] dark:via-[#3a2f27] dark:to-[#211b17]" />
            <div className="h-5 w-full rounded-b-md border-b border-[var(--gold)]/10
                            bg-gradient-to-r from-[#1A1410]/50 via-[#3A2F27]/60 to-[#1A1410]/50
                            shadow-2xl
                            dark:from-[#0d0a08] dark:via-[#1a1410] dark:to-[#0d0a08]" />
          </div>

          {/* Active details */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t
                          border-black/[0.06] pt-4
                          dark:border-white/[0.06]
                          sm:flex-row">
            <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
              <span className="font-mono text-sm font-bold tabular-nums text-[var(--gold)]">
                {activeProject.indexStr} / 0{primaryProjects.length}
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
                  {activeProject.title}
                </h3>
                <p className="font-sans text-xs text-[#5A5A5A] dark:text-[#9A9A9E]">
                  {activeProject.subtitle}
                </p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {primaryProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === i
                      ? 'w-6 bg-[var(--gold)]'
                      : 'w-1.5 bg-[var(--gold)]/25 hover:bg-[var(--gold)]/50'
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsOpenModal(true)}
              className="rounded-lg border border-[var(--gold)]/40 bg-transparent px-4 py-2
                         font-sans text-xs font-bold text-[var(--gold)]
                         transition-all duration-500
                         hover:border-[var(--gold)]/70 hover:bg-[var(--gold)]/[0.08]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            >
              Open Active Book Spread →
            </button>
          </div>
        </div>
      </div>

      {/* ============ PORTALED MODAL ============ */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpenModal && activeProject && (
              <OpenBookModal
                project={activeProject}
                onClose={() => setIsOpenModal(false)}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}