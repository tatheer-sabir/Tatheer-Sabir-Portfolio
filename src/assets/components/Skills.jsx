import React, { useRef, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import {
  Bot,
  Layout,
  Globe,
  Cpu,
  CheckCircle2,
  Trophy,
  Sparkles,
  Heart,
  Gift,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
  Mail,
  Zap,
  Database,
  Server,
  Code2,
  Workflow,
  Palette,
  Layers,
  Boxes,
} from 'lucide-react'

/* ==========================================================================
   1. Card Data (unchanged)
   ========================================================================== */

const buildOfferings = [
  {
    title: 'Landing Pages',
    icon: Layout,
    description:
      'High-converting, vibrant, and fully responsive landing pages tailored to convert visitors.',
    Deliverables: [
      'High-Impact Animated Hero',
      'Mobile-First Layout',
      'Framer Motion Interactions',
      'SEO & Fast Load Speeds',
    ],
  },
  {
    title: 'Full-Stack Web Applications',
    icon: Globe,
    description:
      'Custom, scalable web platforms built from the ground up using modern web architecture.',
    Deliverables: [
      'React / Next.js Frontends',
      'Node.js & Express REST APIs',
      'Database Design (PostgreSQL / MongoDB)',
      'Secure User Authentication',
    ],
  },
  {
    title: 'Custom Developer Portfolios',
    icon: Sparkles,
    description:
      'Sleek, interactive 3D portfolios built to showcase skills and land top tech opportunities.',
    Deliverables: [
      'Interactive 3D WebGL Elements',
      'Personal Branding & Theme',
      'Projects Showcase Section',
      'Contact Form & API Sync',
    ],
  },
  {
    title: 'Wedding Websites',
    icon: Heart,
    description:
      'Elegant, personalized websites for couples to share their love story and event schedules.',
    Deliverables: [
      'Interactive Event Timeline',
      'Guest RSVP Management',
      'Photo Gallery & Countdown',
      'Location Maps & Accommodations',
    ],
  },
  {
    title: 'Wedding Invitation Websites',
    icon: Mail,
    description:
      'Digital invitation cards with interactive animations and instant response tracking.',
    Deliverables: [
      'Custom Animated Digital Card',
      'Instant One-Click RSVP',
      'Google Maps & Calendar Integration',
      'Guestbook Messaging',
    ],
  },
  {
    title: 'Birthday Invitation Websites',
    icon: PartyPopper,
    description:
      'Fun, energetic birthday invitations equipped with interactive games and guest check-ins.',
    Deliverables: [
      'Vibrant Animated Graphics',
      'Party Location & Directions',
      'Guest Attendance Tracking',
      'Music & Confetti Effects',
    ],
  },
  {
    title: 'Interactive Birthday Cards',
    icon: Gift,
    description:
      'Memorable digital greeting cards with custom secret messages, audio, and animations.',
    Deliverables: [
      'Unfolding Envelope Animation',
      'Custom Music & Audio Playback',
      'Personalized Photo Memories',
      'Surprise Unboxing Effects',
    ],
  },
  {
    title: 'Leaderboards & Dashboards',
    icon: Trophy,
    description:
      'Dynamic applications featuring real-time data tracking, ranks, and admin controls.',
    Deliverables: [
      'Live Ranking & Scoreboards',
      'Real-Time WebSockets Sync',
      'Interactive Admin Panel',
      'Data Analytics & Graphs',
    ],
  },
  {
    title: 'AI & Business Automation',
    icon: Bot,
    description:
      'Automate repetitive workflows, connect third-party platforms, and integrate AI APIs.',
    Deliverables: [
      'Custom n8n Workflow Pipelines',
      'OpenAI API Integrations',
      'Automated Lead Handling',
      'Webhook Synchronization',
    ],
  },
]

/* ==========================================================================
   2. Infinite 3D Carousel — unchanged
   ========================================================================== */

function Infinite3DCarousel({ items }) {
  const [rotationIndex, setRotationIndex] = useState(0)
  const containerRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const totalItems = items.length
  const angleStep = (2 * Math.PI) / totalItems
  const radius = 280

  const getWrappedIndex = (val) => ((val % totalItems) + totalItems) % totalItems
  const activeIndex = getWrappedIndex(Math.round(-rotationIndex))

  const handleNext = () => setRotationIndex((prev) => prev - 1)
  const handlePrev = () => setRotationIndex((prev) => prev + 1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
      if (isHorizontal || Math.abs(e.deltaY) > 10) {
        e.preventDefault()
        e.stopPropagation()
        const delta = isHorizontal ? e.deltaX : e.deltaY
        setRotationIndex((prev) => prev + (delta > 0 ? -0.3 : 0.3))
      }
    }
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const handlePointerDown = (e) => {
    isDragging.current = true
    startX.current = e.clientX || e.touches?.[0]?.clientX
  }
  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const currentX = e.clientX || e.touches?.[0]?.clientX
    const diff = currentX - startX.current
    if (Math.abs(diff) > 5) {
      setRotationIndex((prev) => prev + diff * 0.005)
      startX.current = currentX
    }
  }
  const handlePointerUp = () => {
    if (isDragging.current) {
      isDragging.current = false
      setRotationIndex((prev) => Math.round(prev))
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-4">
      <div
        ref={containerRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative flex h-[520px] w-full max-w-full cursor-grab items-center justify-center overflow-hidden touch-pan-y active:cursor-grabbing sm:h-[560px]"
        style={{ perspective: '1200px' }}
      >
        {items.map((item, index) => {
          const itemAngle = (index + rotationIndex) * angleStep
          const translateX = Math.sin(itemAngle) * radius
          const translateZ = Math.cos(itemAngle) * radius - radius
          const rotateY = itemAngle * (180 / Math.PI)

          const isCenter = getWrappedIndex(index) === activeIndex
          const opacity = isCenter ? 1 : Math.max(0.45, (Math.cos(itemAngle) + 1) / 2.6)
          const zIndex = Math.round((Math.cos(itemAngle) + 1) * 100)

          const Icon = item.icon

          return (
            <motion.div
              key={index}
              onClick={() => {
                const diff = (activeIndex - index + totalItems) % totalItems
                const shortest = diff > totalItems / 2 ? diff - totalItems : diff
                setRotationIndex((prev) => prev + shortest)
              }}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY: rotateY,
                opacity: opacity,
                scale: isCenter ? 1.06 : 0.88,
              }}
              whileHover={!isCenter ? { scale: 0.92, opacity: 1 } : undefined}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              style={{ zIndex, transformStyle: 'preserve-3d' }}
              className={`group absolute top-1/2 left-1/2 h-[420px] w-[280px] -translate-x-1/2 -translate-y-1/2
                          select-none overflow-hidden rounded-2xl border p-6 backdrop-blur-2xl
                          transition-[box-shadow,border-color,background-color] duration-500
                          sm:w-[300px]
                ${
                  isCenter
                    ? 'border-[var(--gold)]/45 bg-white shadow-[0_30px_70px_-25px_rgba(90,70,30,0.35),0_1px_0_rgba(255,255,255,0.9)_inset] dark:border-[var(--gold)]/45 dark:bg-[#14131A] dark:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.05)_inset]'
                    : 'border-[var(--gold)]/15 bg-white/70 shadow-[0_20px_40px_-20px_rgba(90,70,30,0.25)] dark:border-[var(--gold)]/15 dark:bg-[#14131A]/70 dark:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]'
                }`}
            >
              {isCenter && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, color-mix(in srgb, var(--gold) 45%, transparent), transparent 70%)',
                  }}
                />
              )}

              <div className="relative flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl
                              border transition-colors duration-500
                    ${
                      isCenter
                        ? 'border-[var(--gold)]/40 bg-[var(--gold)]/[0.12] text-[var(--gold)]'
                        : 'border-[var(--gold)]/20 bg-[var(--gold)]/[0.06] text-[var(--gold)]/70'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/[0.08]
                                 px-2.5 py-0.5 font-mono text-[10px] font-bold tabular-nums tracking-wider
                                 text-[var(--gold)]">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>

              <div className="relative mt-5">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E]">
                  {item.description}
                </p>
              </div>

              <ul className="relative mt-5 space-y-2 border-t border-[var(--gold)]/20 pt-4">
                {item.Deliverables.map((deliv, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-center gap-2 text-xs font-medium text-[var(--ink)]/85"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
                    <span className="line-clamp-1">{deliv}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={handlePrev}
          className="flex h-9 w-9 items-center justify-center rounded-full
                     border border-[var(--gold)]/40 bg-transparent text-[var(--ink)]
                     transition-all duration-500
                     hover:border-[var(--gold)]/70 hover:bg-[var(--gold)]/[0.08]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                     focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F4] dark:focus-visible:ring-offset-[#0E0E10]"
          aria-label="Previous card"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex max-w-[180px] flex-wrap justify-center gap-1.5 sm:max-w-none">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const diff = (activeIndex - idx + totalItems) % totalItems
                const shortest = diff > totalItems / 2 ? diff - totalItems : diff
                setRotationIndex((prev) => prev + shortest)
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === idx
                  ? 'w-5 bg-[var(--gold)]'
                  : 'w-1.5 bg-[var(--gold)]/25 hover:bg-[var(--gold)]/50'
              }`}
              aria-label={`Go to item ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex h-9 w-9 items-center justify-center rounded-full
                     border border-[var(--gold)]/40 bg-transparent text-[var(--ink)]
                     transition-all duration-500
                     hover:border-[var(--gold)]/70 hover:bg-[var(--gold)]/[0.08]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                     focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF8F4] dark:focus-visible:ring-offset-[#0E0E10]"
          aria-label="Next card"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A8A8A] dark:text-[#6E6E72]">
        ← Drag or scroll to rotate →
      </p>
    </div>
  )
}

/* ==========================================================================
   3. Globe — theme-aware node badges + fixed scroll hijack
   ========================================================================== */

const iconMap = {
  Database,
  Backend: Server,
  Frontend: Code2,
  Workflow,
  'UI / Styling': Palette,
  Language: Layers,
  Animation: Boxes,
  Integration: Globe,
  'AI Tools': Bot,
}

// Fixed hex values for three.js materials (can't read CSS vars)
const NODE_GOLD_DARK = '#D4AF6A'   // bright champagne — for dark bg
const NODE_GOLD_LIGHT = '#8A6A2F'  // deep champagne — for light bg
const CATEGORY_GOLD_DARK = '#D4AF6A'
const CATEGORY_GOLD_LIGHT = '#8A6A2F'

function TagNode({ position, name, category, isMobile, isDark }) {
  const IconComponent = iconMap[category] || Cpu

  const nodeColor = isDark ? NODE_GOLD_DARK : NODE_GOLD_LIGHT
  const chipTextColor = isDark ? CATEGORY_GOLD_DARK : CATEGORY_GOLD_LIGHT
  const chipBg = isDark ? `${CATEGORY_GOLD_DARK}22` : `${CATEGORY_GOLD_LIGHT}1A`

  return (
    <group position={position}>
      {/* Halo */}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.12 : 0.16, 16, 16]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.18} />
      </mesh>
      {/* Solid dot */}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.055 : 0.07, 16, 16]} />
        <meshBasicMaterial color={nodeColor} />
      </mesh>

      <Html distanceFactor={isMobile ? 14 : 12} center style={{ pointerEvents: 'none' }}>
        <div
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2 py-1 backdrop-blur-md sm:gap-2 sm:px-2.5 sm:py-1.5
            ${
              isDark
                ? 'border-[#D4AF6A]/45 bg-[#14131A]/95 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.06)]'
                : 'border-[#8A6A2F]/35 bg-white/95 shadow-[0_4px_14px_-4px_rgba(90,70,30,0.35)]'
            }`}
        >
          <IconComponent
            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
            style={{ color: nodeColor }}
          />
          <span
            className="text-[10px] font-semibold sm:text-xs"
            style={{ color: isDark ? '#F2F1EE' : '#1A1A1A' }}
          >
            {name}
          </span>
          <span
            className="rounded px-1 py-0.5 text-[8px] font-medium sm:px-1.5 sm:text-[9px]"
            style={{ backgroundColor: chipBg, color: chipTextColor }}
          >
            {category}
          </span>
        </div>
      </Html>
    </group>
  )
}

function GlobeContent({ techStack, rotationSpeed, isMobile, isDark }) {
  const groupRef = useRef()
  const radius = isMobile ? 2.5 : 3.4

  const { nodes, primaryConnections, secondaryConnections } = useMemo(() => {
    const points = []
    const count = techStack.length

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      points.push({ position: [x, y, z], ...techStack[i] })
    }

    const primary = []
    const secondary = []
    const primaryDist = isMobile ? 1.9 : 2.4
    const secondaryDist = isMobile ? 2.6 : 3.4

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = new THREE.Vector3(...points[i].position)
        const p2 = new THREE.Vector3(...points[j].position)
        const d = p1.distanceTo(p2)
        if (d < primaryDist) {
          primary.push([points[i].position, points[j].position])
        } else if (d < secondaryDist) {
          secondary.push([points[i].position, points[j].position])
        }
      }
    }

    return { nodes: points, primaryConnections: primary, secondaryConnections: secondary }
  }, [techStack, radius, isMobile])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015 + rotationSpeed.current.x
      groupRef.current.rotation.x += rotationSpeed.current.y
      rotationSpeed.current.x *= 0.92
      rotationSpeed.current.y *= 0.92
    }
  })

  // WebGL material color — must be fixed hex, switches with theme
  const lineColor = isDark ? NODE_GOLD_DARK : NODE_GOLD_LIGHT

  return (
    <group ref={groupRef}>
      {secondaryConnections.map((linePoints, idx) => (
        <Line
          key={`s-${idx}`}
          points={linePoints}
          color={lineColor}
          opacity={isDark ? 0.12 : 0.08}
          transparent
          lineWidth={1}
        />
      ))}
      {primaryConnections.map((linePoints, idx) => (
        <Line
          key={`p-${idx}`}
          points={linePoints}
          color={lineColor}
          opacity={isDark ? 0.45 : 0.32}
          transparent
          lineWidth={1.2}
        />
      ))}
      {nodes.map((node, idx) => (
        <TagNode key={idx} {...node} isMobile={isMobile} isDark={isDark} />
      ))}
    </group>
  )
}

function TechGlobe({ techStack }) {
  const rotationSpeed = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Watch the <html> class list to sync dark mode with the WebGL scene
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  // FIX: Wheel listener attached manually with { passive: false } so
  // preventDefault() actually works. React's onWheel prop is passive by
  // default and silently ignores preventDefault — that's why the page
  // was scrolling when wheeling over the globe.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleWheel = (e) => {
      // Only hijack scroll when the globe is meaningfully in view —
      // prevents accidental scroll-stealing when passing by.
      const rect = el.getBoundingClientRect()
      const inView =
        rect.top < window.innerHeight * 0.75 &&
        rect.bottom > window.innerHeight * 0.25
      if (!inView) return

      e.preventDefault()
      e.stopPropagation()
      rotationSpeed.current.x += e.deltaY * 0.0008
      rotationSpeed.current.y += e.deltaX * 0.0008
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div
      ref={containerRef}
      // overscroll-contain: stops the page from continuing to scroll after
      // the wheel event has been handled inside this element.
      className="relative h-[380px] w-full cursor-grab overscroll-contain active:cursor-grabbing sm:h-[460px]"
    >
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 14.5 : 12.5],
          fov: isMobile ? 50 : 55,
        }}
      >
        <ambientLight intensity={isDark ? 0.85 : 0.6} />
        <GlobeContent
          techStack={techStack}
          rotationSpeed={rotationSpeed}
          isMobile={isMobile}
          isDark={isDark}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}

/* ==========================================================================
   4. Section
   ========================================================================== */

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const globeWrapVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
}

const techStack = [
  { name: 'MongoDB', category: 'Database' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'n8n Automation', category: 'Workflow' },
  { name: 'Tailwind CSS', category: 'UI / Styling' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'REST APIs', category: 'Integration' },
  { name: 'OpenAI API', category: 'AI Tools' },
]

const benefits = [
  'Real-time capable, production-grade stacks',
  'Built to scale with your business',
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex w-full scroll-mt-0 flex-col justify-center
                 bg-[#FAF8F4] px-4 py-20
                 [--gold:#8A6A2F] [--gold-soft:#C9A961] [--ink:#1A1A1A]
                 dark:bg-[#0E0E10] dark:[--gold:#D4AF6A] dark:[--gold-soft:#E8CE94] dark:[--ink:#F2F1EE]
                 lg:scroll-mt-0 lg:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 40% at 70% 20%, color-mix(in srgb, var(--gold) 7%, transparent), transparent 70%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto w-full max-w-6xl space-y-20"
      >
        {/* ============ Section 1: Heading + Carousel ============ */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div variants={itemVariants} className="space-y-5 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full
                            border border-[var(--gold)]/30 bg-[var(--gold)]/[0.06]
                            px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]
                            text-[var(--gold)]">
              <Zap className="h-3 w-3 text-[var(--gold)]" />
              <span>Solutions &amp; Capabilities</span>
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)] sm:text-5xl">
              What I can build for you
            </h2>

            <div
              aria-hidden
              className="h-px w-20 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent"
            />

            <p className="text-base leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E] sm:text-lg">
              From landing pages and full-stack web platforms to wedding &amp;
              birthday invitation websites and custom AI automation — every
              project ships with clean code and a considered interface.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-7">
            <Infinite3DCarousel items={buildOfferings} />
          </motion.div>
        </div>

        {/* ============ Section 2: Globe (60% left) + Copy (40% right) ============ */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <motion.div variants={globeWrapVariants} className="order-2 lg:order-1">
            <div
              className="relative overflow-hidden rounded-2xl
                         border border-[var(--gold)]/25
                         bg-[#FBF9F4] p-2
                         shadow-[0_30px_80px_-40px_rgba(90,70,30,0.35),0_1px_0_rgba(255,255,255,0.7)_inset]
                         dark:border-[var(--gold)]/25
                         dark:bg-[#0E0E10]
                         dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.04)_inset]"
            >
              <TechGlobe techStack={techStack} />

              <div
                className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5
                           rounded-full border border-[var(--gold)]/30 bg-white/90 px-2.5 py-1
                           font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--gold)]
                           shadow-[0_4px_14px_-4px_rgba(90,70,30,0.25)] backdrop-blur-sm
                           dark:bg-[#14131A]/90
                           dark:shadow-[0_4px_14px_-4px_rgba(0,0,0,0.7)]"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />
                10 tools · live network
              </div>

              <div
                role="note"
                className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2
                           rounded-full border border-[var(--gold)]/25 bg-white/85 px-3 py-1
                           font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--gold)]/80
                           backdrop-blur-sm
                           dark:bg-[#14131A]/85"
              >
                Drag or scroll to rotate
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 space-y-5 lg:order-2">
            <div
              className="inline-flex items-center gap-2 rounded-full
                         border border-[var(--gold)]/30 bg-[var(--gold)]/[0.06]
                         px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]
                         text-[var(--gold)]"
            >
              <Cpu className="h-3 w-3" />
              <span>Built with</span>
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Technologies I build with
            </h2>

            <div
              aria-hidden
              className="h-px w-20 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent"
            />

            <p className="text-base leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E] sm:text-lg">
              Every tool in this network is a deliberate choice — no filler,
              no trend-chasing.
            </p>

            <ul className="space-y-2.5 pt-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <span className="text-sm leading-relaxed text-[var(--ink)]/85">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 pt-4">
              <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--gold)]">
                Every project ships with this stack
              </span>
            </div>
          </motion.div>
        </div>

        {/* ============ Section 3: CTA ============ */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl
                     border border-[var(--gold)]/25
                     bg-white p-6
                     shadow-[0_20px_60px_-30px_rgba(90,70,30,0.25),0_1px_0_rgba(255,255,255,0.9)_inset]
                     dark:border-[var(--gold)]/25
                     dark:bg-[#14131A]
                     dark:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.05)_inset]
                     sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase
                              tracking-[0.2em] text-[var(--gold)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Have a custom project in mind?</span>
              </div>
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink)] sm:text-xl">
                Let&rsquo;s turn your idea into a working platform.
              </h3>
            </div>

            <a
              href="#contact"
              className="group relative inline-flex shrink-0 items-center justify-center gap-2
                         overflow-hidden rounded-full
                         bg-[var(--gold)] px-6 py-3 text-sm font-medium tracking-tight
                         text-[#0B0B0C]
                         shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.15),0_10px_30px_-12px_rgba(138,106,47,0.7)]
                         transition-all duration-500
                         hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.18),0_16px_44px_-12px_rgba(138,106,47,0.95)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         focus-visible:ring-[var(--gold)]
                         focus-visible:ring-offset-[#FAF8F4] dark:focus-visible:ring-offset-[#0E0E10]
                         active:scale-[0.98]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent
                           transition-transform duration-1000 ease-out group-hover:translate-x-full"
              />
              <span className="relative">Start Building</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}