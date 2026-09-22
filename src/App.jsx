import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from './assets/components/SettingsContext'
import Header from './assets/components/Header'
import HeroSection from './assets/components/HeroSection'
import About from './assets/components/About'
import Skills from './assets/components/Skills'
import Contact from './assets/components/Contact'
import Footer from './assets/components/Footer'
import Projects from './assets/components/Project'

const GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"

export default function App() {
  return (
    <SettingsProvider>
      <Router>
        <Header />

        <main className="relative min-h-screen bg-[#FAF8F4] text-[#1A1A1A] dark:bg-[#0E0E10] dark:text-[#F2F1EE] transition-colors duration-300 pb-24 pt-16 lg:pb-0 lg:pr-16 lg:pt-20">
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 opacity-[0.16] mix-blend-multiply dark:opacity-[0.07] dark:mix-blend-screen"
            style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: '140px 140px' }}
          />
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-12">
            <HeroSection />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </div>
        </main>

        <Footer />
      </Router>
    </SettingsProvider>
  )
}