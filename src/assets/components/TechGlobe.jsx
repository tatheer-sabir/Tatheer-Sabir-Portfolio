import React, { useRef, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'
import {
  Code2,
  Database,
  Server,
  Workflow,
  Palette,
  Bot,
  Globe as GlobeIcon,
  Layers,
  Cpu,
  Boxes,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

/* ==========================================================================
   Icon map — maps category labels to Lucide icons
   ========================================================================== */
const iconMap = {
  Database: Database,
  Backend: Server,
  Frontend: Code2,
  Workflow: Workflow,
  'UI / Styling': Palette,
  Language: Layers,
  Animation: Boxes,
  Integration: GlobeIcon,
  'AI Tools': Bot,
}

/* ==========================================================================
   WebGL material colors — must be fixed hexes (three.js can't read CSS vars)
   Switched from red to the site's gold so the network feels part of the theme.
   ========================================================================== */
const NODE_GOLD = '#D4AF6A'
const NODE_GOLD_LIGHT = '#8A6A2F'
const CATEGORY_GOLD = '#D4AF6A'

/* ==========================================================================
   1. Tag Node — gold dot + gold icon + warm paper badge
   ========================================================================== */
function TagNode({ position, name, category, isMobile }) {
  const IconComponent = iconMap[category] || Cpu

  return (
    <group position={position}>
      {/* Soft halo behind the dot */}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.12 : 0.16, 16, 16]} />
        <meshBasicMaterial color={NODE_GOLD} transparent opacity={0.18} />
      </mesh>

      {/* Solid dot */}
      <mesh>
        <sphereGeometry args={[isMobile ? 0.055 : 0.07, 16, 16]} />
        <meshBasicMaterial color={NODE_GOLD} />
      </mesh>

      {/* HTML Badge — warm paper surface, not cold slate */}
      <Html
        distanceFactor={isMobile ? 14 : 12}
        center
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border
                     border-[var(--gold)]/35 bg-white/95 px-2 py-1
                     shadow-[0_4px_14px_-4px_rgba(90,70,30,0.35)] backdrop-blur-md
                     sm:gap-2 sm:px-2.5 sm:py-1.5"
        >
          <IconComponent
            className="h-3 w-3 sm:h-3.5 sm:w-3.5"
            style={{ color: NODE_GOLD_LIGHT }}
          />
          <span className="text-[10px] font-semibold text-[var(--ink)] sm:text-xs">
            {name}
          </span>
          <span
            className="rounded px-1 py-0.5 text-[8px] font-medium sm:px-1.5 sm:text-[9px]"
            style={{ backgroundColor: `${CATEGORY_GOLD}22`, color: NODE_GOLD_LIGHT }}
          >
            {category}
          </span>
        </div>
      </Html>
    </group>
  )
}

/* ==========================================================================
   2. GlobeContent — geometry untouched, connections upgraded
   ========================================================================== */
function GlobeContent({ techStack, rotationSpeed, isMobile }) {
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

    // Two-tier connections: primary (short distance, bold) + secondary (long, faint)
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

  return (
    <group ref={groupRef}>
      {/* Secondary (longer, faint) connections — the web */}
      {secondaryConnections.map((linePoints, idx) => (
        <Line
          key={`s-${idx}`}
          points={linePoints}
          color={NODE_GOLD}
          opacity={0.08}
          transparent
          lineWidth={1}
        />
      ))}

      {/* Primary (shorter, bolder) connections — the backbone */}
      {primaryConnections.map((linePoints, idx) => (
        <Line
          key={`p-${idx}`}
          points={linePoints}
          color={NODE_GOLD}
          opacity={0.32}
          transparent
          lineWidth={1.2}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, idx) => (
        <TagNode key={idx} {...node} isMobile={isMobile} />
      ))}
    </group>
  )
}

/* ==========================================================================
   3. TechGlobe — smaller, contained, part of a bigger card layout
   ========================================================================== */
export default function TechGlobe({ techStack }) {
  const rotationSpeed = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleWheel = (e) => {
    e.preventDefault()
    rotationSpeed.current.x += e.deltaY * 0.0008
    rotationSpeed.current.y += e.deltaX * 0.0008
  }

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="relative h-[380px] w-full cursor-grab active:cursor-grabbing sm:h-[460px]"
    >
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 9.5 : 8.5],
          fov: isMobile ? 50 : 55,
        }}
      >
        <ambientLight intensity={0.6} />
        <GlobeContent
          techStack={techStack}
          rotationSpeed={rotationSpeed}
          isMobile={isMobile}
        />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  )
}

/* ==========================================================================
   4. Full skills section — new two-column layout (globe left, copy right)
   ========================================================================== */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
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
  'Typesafe, tested, and documented code',
  'Built to scale with your business',
]

export function TechGlobeSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="relative w-full"
    >
      <div
        className="grid grid-cols-1 items-center gap-10
                   lg:grid-cols-[3fr_2fr] lg:gap-16"
      >
        {/* ============ LEFT — Globe Card (60%) ============ */}
        <motion.div variants={itemVariants} className="order-2 lg:order-1">
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

            {/* Corner label — small, unobtrusive */}
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

            {/* Bottom hint */}
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

        {/* ============ RIGHT — Copy Column (40%) ============ */}
        <motion.div variants={itemVariants} className="order-1 space-y-5 lg:order-2">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 rounded-full
                       border border-[var(--gold)]/30 bg-[var(--gold)]/[0.06]
                       px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]
                       text-[var(--gold)]"
          >
            <Cpu className="h-3 w-3" />
            <span>Built with</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Technologies I build with
          </h2>

          {/* Gold rule — matches hero + about */}
          <div
            aria-hidden
            className="h-px w-20 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent"
          />

          {/* Emotional tagline for prospective clients */}
          <p className="text-base leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E] sm:text-lg">
            Every tool in this network is a deliberate choice — no filler,
            no trend-chasing. Just the stack that reliably ships your idea,
            from first sketch to production.
          </p>

          {/* Benefits list — grounded in outcomes, not buzzwords */}
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

          {/* Small closing flourish — reinforces the promise */}
          <div className="flex items-center gap-2 pt-4">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gold)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--gold)]">
              Every project ships with this stack
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

/* Named export for the standalone globe, in case you want it elsewhere */
export { TechGlobe }