import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Home, User, GraduationCap, FolderKanban, Mail, Sun, Moon, Menu, X } from 'lucide-react'

// Section ids must match the `id` on each <section> in the landing page.
// The header is fixed (h-16 / lg:h-20), so on mobile each section needs
// `scroll-mt-16` (and `lg:scroll-mt-0`, since the rail is on the side on
// desktop, not the top) or scrollIntoView will land partly under it.
const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Capabilities', icon: GraduationCap },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Mail },
]

const DISPLAY_NAME = 'Tatheer Sabir'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark')
  })

  // Synchronize dark class with HTML root element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  // Track which section is currently in view so the nav pill follows
  // scroll position instead of a route.
  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (mostVisible) setActiveId(mostVisible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const goToSection = useCallback(
    (id) => (event) => {
      event.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveId(id)
    },
    []
  )

  return (
    <>
      {/* ============ TOP BAR ============ */}
      <header
        className="fixed inset-x-0 top-0 z-500000000000 flex h-16 items-center justify-between
                   border-b border-black/[0.06] bg-[#FAF8F4]/85 px-4
                   shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_4px_20px_-8px_rgba(90,70,30,0.12)]
                   backdrop-blur-xl
                   dark:border-white/[0.06] dark:bg-[#0E0E10]/90
                   dark:shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_4px_20px_-8px_rgba(0,0,0,0.5)]
                   [--gold:#8A6A2F] dark:[--gold:#D4AF6A]
                   lg:h-20 lg:px-8"
      >
        {/* Name / Logo — kept neutral ink; color is reserved for the active nav pill and CTA */}
        <span className="text-base font-semibold tracking-[-0.02em] text-[var(--ink,#1A1A1A)]
                         dark:text-[#F2F1EE] lg:text-xl">
          {DISPLAY_NAME}
        </span>

        {/* Mobile View Top Right: Sun/Moon Theme Toggle + Contact CTA */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl
                       text-[#5A5A5A] transition-colors duration-500
                       hover:text-[var(--gold)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                       dark:text-[#9A9A9E] dark:hover:text-[var(--gold)]"
            aria-label="Toggle theme"
          >
            <motion.div
              key={isDark ? 'mobile-moon' : 'mobile-sun'}
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </motion.div>
          </button>

          <a
            href="#contact"
            onClick={goToSection('contact')}
            className="group relative overflow-hidden rounded-full
                       bg-[var(--gold)] px-4 py-2 text-sm font-medium tracking-tight
                       text-[#0B0B0C]
                       shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.15),0_8px_20px_-8px_rgba(138,106,47,0.7)]
                       transition-all duration-500
                       hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.18),0_12px_28px_-8px_rgba(138,106,47,0.95)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                       focus-visible:ring-[var(--gold)]
                       focus-visible:ring-offset-[#FAF8F4] dark:focus-visible:ring-offset-[#0E0E10]
                       active:scale-[0.97]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent
                         transition-transform duration-1000 ease-out group-hover:translate-x-full"
            />
            <span className="relative">Contact now</span>
          </a>
        </div>
      </header>

      {/* ============ NAVIGATION BAR / SIDEBAR RAIL ============ */}
      <nav
        className={`fixed z-[5000000000000] flex items-center
                   border-black/[0.06] bg-[#FAF8F4]/85 backdrop-blur-xl
                   dark:border-white/[0.06] dark:bg-[#0E0E10]/90
                   bottom-0 left-0 right-0 h-16 flex-row justify-around border-t px-2
                   lg:bottom-0 lg:left-auto lg:right-0 lg:top-0 lg:h-screen lg:flex-col
                   lg:justify-between lg:border-l lg:border-t-0 lg:py-6
                   [--gold:#8A6A2F] dark:[--gold:#D4AF6A]
                   ${menuOpen ? 'lg:w-44' : 'lg:w-12'}`}
      >
        {/* Navigation Group */}
        <div className="flex w-full items-center justify-around lg:w-full lg:flex-col lg:items-center lg:gap-6 lg:py-3.5 lg:mb-12">

          {/* Desktop Hamburger Toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="hidden h-8 w-8 items-center justify-center rounded-full
                       text-[#5A5A5A] transition-colors duration-500 hover:text-[var(--ink,#1A1A1A)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                       dark:text-[#9A9A9E] dark:hover:text-[#F2F1EE] lg:flex"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.span>
          </button>

          {/* Main Links — anchor to section ids, no routing. */}
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeId === id
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={goToSection(id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex h-10 w-10 items-center justify-center gap-3 rounded-xl
                           transition-colors duration-300
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                           lg:h-8 lg:w-full lg:justify-start lg:rounded-xl lg:px-2
                           ${
                             isActive
                               ? 'text-[#0B0B0C]'
                               : 'text-[#5A5A5A] hover:text-[var(--ink,#1A1A1A)] dark:text-[#9A9A9E] dark:hover:text-[#F2F1EE]'
                           }`}
                aria-label={label}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-xl
                               bg-[var(--gold)]
                               shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.12),0_6px_16px_-8px_rgba(138,106,47,0.75)]
                               dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.15),0_6px_16px_-8px_rgba(212,175,106,0.5)]
                               lg:rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className="relative z-10 h-5 w-5 shrink-0 lg:h-4 lg:w-4"
                  strokeWidth={isActive ? 2.25 : 1.75}
                />

                {menuOpen && (
                  <span className="relative z-10 hidden whitespace-nowrap text-[13px] font-semibold lg:inline">
                    {label}
                  </span>
                )}
              </a>
            )
          })}
        </div>

        {/* Desktop Bottom Theme Toggle */}
        <div className="hidden lg:flex lg:w-full lg:items-center lg:justify-start lg:px-0">
          <button
            onClick={toggleTheme}
            className="flex h-8 w-full items-center gap-3 justify-start rounded-xl px-2
                       text-[#5A5A5A] transition-colors duration-500 hover:text-[var(--gold)]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]
                       dark:text-[#9A9A9E] dark:hover:text-[var(--gold)]"
            aria-label="Toggle theme"
          >
            <motion.div
              key={isDark ? 'desktop-moon' : 'desktop-sun'}
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex shrink-0 items-center justify-center"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.div>
            {menuOpen && (
              <span className="whitespace-nowrap text-[13px] font-semibold">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  )
}