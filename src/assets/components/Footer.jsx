import React from 'react'
import { Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative w-full border-t border-black/[0.06]
                 bg-[#FAF8F4]/85 px-4 py-4 backdrop-blur-xl
                 pb-20 transition-colors duration-300
                 dark:border-white/[0.06] dark:bg-[#0E0E10]/85
                 lg:pb-5
                 [--gold:#8A6A2F] [--gold-soft:#C9A961]
                 dark:[--gold:#D4AF6A] dark:[--gold-soft:#E8CE94]"
    >
      {/* Top hairline accent — matches page-break rule used across sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px w-full
                   bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        {/* Brand / Copyright */}
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]
                        text-[#5A5A5A] dark:text-[#9A9A9E]">
          {/* Small live indicator dot — gold pulse, matches availability chip in hero */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold)] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          </span>
          <span className="normal-case tracking-normal">
            © {currentYear}{' '}
            <span className="font-semibold text-[var(--ink)] dark:text-[#F2F1EE]">
              Tatheer Sabir
            </span>
            <span className="text-[#8A8A8A] dark:text-[#6E6E72]"> · All rights reserved</span>
          </span>
        </div>

        {/* Tagline badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full
                        border border-[var(--gold)]/25 bg-[var(--gold)]/[0.06]
                        px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]
                        text-[var(--gold)] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]
                        dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]">
          <Sparkles className="h-3 w-3" />
          <span>Crafted with passion &amp; code</span>
        </div>
      </div>
    </footer>
  )
}