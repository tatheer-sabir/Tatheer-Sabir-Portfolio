import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  MessageSquare,
  Phone,
  User,
  Send,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  // Replace these with your actual contact details:
  const CONTACT_EMAIL = 'tatheersabir1@gmail.com'
  const WHATSAPP_NUMBER = '03294512679' // Format: Country code + Number without '+' or spaces

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Action 1: Send via Direct Email Client
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      formData.subject || 'New Contact Form Submission'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail:${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    )}`
    window.location.href = mailtoLink
  }

  // Action 2: Send via WhatsApp Web/App
  const handleWhatsAppSubmit = () => {
    const text = `Hello! My name is ${formData.name || 'a client'}.\nEmail: ${
      formData.email || 'N/A'
    }\nPhone: ${formData.phone || 'N/A'}\nSubject: ${
      formData.subject || 'General Inquiry'
    }\n\nMessage: ${formData.message || 'I would like to work with you.'}`
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`
    window.open(waLink, '_blank')
  }

  return (
    <section
      id="contact"
      className="relative flex w-full flex-col justify-center overflow-hidden
                 bg-[#FAF8F4] px-4 py-20 text-[#1A1A1A]
                 [--gold:#8A6A2F] [--gold-soft:#C9A961] [--ink:#1A1A1A]
                 dark:bg-[#0E0E10] dark:text-[#F2F1EE]
                 dark:[--gold:#D4AF6A] dark:[--gold-soft:#E8CE94] dark:[--ink:#F2F1EE]
                 transition-colors duration-300
                 lg:px-12"
    >
      {/* Ambient warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 45% at 30% 30%, color-mix(in srgb, var(--gold) 7%, transparent), transparent 70%)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto w-full max-w-5xl space-y-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full
                          border border-[var(--gold)]/30 bg-[var(--gold)]/[0.06]
                          px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]
                          text-[var(--gold)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink)] sm:text-5xl">
            Let&rsquo;s build something{' '}
            <span className="text-[var(--gold)]">together</span>
          </h2>

          {/* Gold rule — matches hero + about + skills */}
          <div
            aria-hidden
            className="h-px w-20 bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent"
          />

          <p className="max-w-2xl text-base leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E] sm:text-lg">
            Have a project in mind or want to automate your business workflow?
            Send me a message using your preferred channel.
          </p>
        </motion.div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* ============ Direct Channels Sidebar ============ */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 rounded-2xl
                       border border-[var(--gold)]/20
                       bg-white p-6
                       shadow-[0_30px_80px_-40px_rgba(90,70,30,0.35),0_1px_0_rgba(255,255,255,0.9)_inset]
                       dark:border-[var(--gold)]/20 dark:bg-[#14131A]
                       dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.05)_inset]"
          >
            <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--ink)]">
              Direct contact
            </h3>
            <p className="text-xs leading-relaxed text-[#5A5A5A] dark:text-[#9A9A9E]">
              Reach out directly through email or instant message.
            </p>

            <div className="mt-4 space-y-3">
              {/* Mail Card */}
              <div className="group flex items-center gap-3 rounded-xl
                              border border-[var(--gold)]/20 bg-[#FBF9F4] p-3.5
                              transition-all duration-500
                              hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/[0.04]
                              dark:border-[var(--gold)]/15 dark:bg-[#0F0F12]
                              dark:hover:border-[var(--gold)]/40 dark:hover:bg-[var(--gold)]/[0.05]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                                bg-[var(--gold)] text-[#0B0B0C]
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.12)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5A5A5A] dark:text-[#9A9A9E]">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="block truncate text-xs font-semibold text-[var(--ink)]
                               transition-colors duration-500
                               hover:text-[var(--gold)]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="group flex items-center gap-3 rounded-xl
                              border border-[var(--gold)]/20 bg-[#FBF9F4] p-3.5
                              transition-all duration-500
                              hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/[0.04]
                              dark:border-[var(--gold)]/15 dark:bg-[#0F0F12]
                              dark:hover:border-[var(--gold)]/40 dark:hover:bg-[var(--gold)]/[0.05]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                                bg-[#0E8A5F] text-white
                                shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-1px_0_rgba(0,0,0,0.12)]">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5A5A5A] dark:text-[#9A9A9E]">
                    WhatsApp
                  </p>
                  <button
                    type="button"
                    onClick={handleWhatsAppSubmit}
                    className="text-xs font-semibold text-[var(--ink)]
                               transition-colors duration-500
                               hover:text-[#0E8A5F] dark:hover:text-[#34D399]
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  >
                    Chat on WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Response time footer */}
            <div className="mt-auto pt-6">
              <div
                aria-hidden
                className="mb-4 h-px w-full bg-gradient-to-r from-[var(--gold)]/30 via-[var(--gold)]/15 to-transparent"
              />
              <div className="flex items-center gap-2 text-xs font-medium text-[#5A5A5A] dark:text-[#9A9A9E]">
                <CheckCircle2 className="h-4 w-4 text-[#0E8A5F] dark:text-[#34D399]" />
                <span>Fast response time within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* ============ Form Section ============ */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl
                       border border-[var(--gold)]/20
                       bg-white p-6
                       shadow-[0_30px_80px_-40px_rgba(90,70,30,0.35),0_1px_0_rgba(255,255,255,0.9)_inset]
                       dark:border-[var(--gold)]/20 dark:bg-[#14131A]
                       dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7),0_1px_0_rgba(255,255,255,0.05)_inset]
                       lg:col-span-2"
          >
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase
                                    tracking-[0.14em] text-[#5A5A5A] dark:text-[#9A9A9E]">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A] dark:text-[#6E6E72]" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-[var(--gold)]/20
                                 bg-[#FBF9F4] py-2.5 pl-9 pr-3 text-xs font-medium text-[var(--ink)]
                                 placeholder-[#A09A8E]
                                 outline-none transition-all duration-500
                                 focus:border-[var(--gold)]/60 focus:bg-white
                                 focus:ring-2 focus:ring-[var(--gold)]/20
                                 dark:border-[var(--gold)]/15 dark:bg-[#0F0F12]
                                 dark:text-[#F2F1EE] dark:placeholder-[#5A5A5E]
                                 dark:focus:border-[var(--gold)]/50 dark:focus:bg-[#0E0E10]
                                 dark:focus:ring-[var(--gold)]/15"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase
                                    tracking-[0.14em] text-[#5A5A5A] dark:text-[#9A9A9E]">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A] dark:text-[#6E6E72]" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-[var(--gold)]/20
                                 bg-[#FBF9F4] py-2.5 pl-9 pr-3 text-xs font-medium text-[var(--ink)]
                                 placeholder-[#A09A8E]
                                 outline-none transition-all duration-500
                                 focus:border-[var(--gold)]/60 focus:bg-white
                                 focus:ring-2 focus:ring-[var(--gold)]/20
                                 dark:border-[var(--gold)]/15 dark:bg-[#0F0F12]
                                 dark:text-[#F2F1EE] dark:placeholder-[#5A5A5E]
                                 dark:focus:border-[var(--gold)]/50 dark:focus:bg-[#0E0E10]
                                 dark:focus:ring-[var(--gold)]/15"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Phone Number */}
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase
                                    tracking-[0.14em] text-[#5A5A5A] dark:text-[#9A9A9E]">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8A8A] dark:text-[#6E6E72]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-[var(--gold)]/20
                                 bg-[#FBF9F4] py-2.5 pl-9 pr-3 text-xs font-medium text-[var(--ink)]
                                 placeholder-[#A09A8E]
                                 outline-none transition-all duration-500
                                 focus:border-[var(--gold)]/60 focus:bg-white
                                 focus:ring-2 focus:ring-[var(--gold)]/20
                                 dark:border-[var(--gold)]/15 dark:bg-[#0F0F12]
                                 dark:text-[#F2F1EE] dark:placeholder-[#5A5A5E]
                                 dark:focus:border-[var(--gold)]/50 dark:focus:bg-[#0E0E10]
                                 dark:focus:ring-[var(--gold)]/15"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase
                                    tracking-[0.14em] text-[#5A5A5A] dark:text-[#9A9A9E]">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Web Development / Automation"
                    className="w-full rounded-xl border border-[var(--gold)]/20
                               bg-[#FBF9F4] py-2.5 px-3 text-xs font-medium text-[var(--ink)]
                               placeholder-[#A09A8E]
                               outline-none transition-all duration-500
                               focus:border-[var(--gold)]/60 focus:bg-white
                               focus:ring-2 focus:ring-[var(--gold)]/20
                               dark:border-[var(--gold)]/15 dark:bg-[#0F0F12]
                               dark:text-[#F2F1EE] dark:placeholder-[#5A5A5E]
                               dark:focus:border-[var(--gold)]/50 dark:focus:bg-[#0E0E10]
                               dark:focus:ring-[var(--gold)]/15"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase
                                  tracking-[0.14em] text-[#5A5A5A] dark:text-[#9A9A9E]">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project goals or requirements..."
                  className="w-full resize-none rounded-xl border border-[var(--gold)]/20
                             bg-[#FBF9F4] p-3 text-xs font-medium text-[var(--ink)]
                             placeholder-[#A09A8E]
                             outline-none transition-all duration-500
                             focus:border-[var(--gold)]/60 focus:bg-white
                             focus:ring-2 focus:ring-[var(--gold)]/20
                             dark:border-[var(--gold)]/15 dark:bg-[#0F0F12]
                             dark:text-[#F2F1EE] dark:placeholder-[#5A5A5E]
                             dark:focus:border-[var(--gold)]/50 dark:focus:bg-[#0E0E10]
                             dark:focus:ring-[var(--gold)]/15"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                {/* Send via Email Button — primary gold CTA (matches everywhere else) */}
                <button
                  type="submit"
                  className="group relative inline-flex flex-1 items-center justify-center gap-2
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
                  <Send className="relative h-4 w-4" />
                  <span className="relative">Send via Email</span>
                </button>

                {/* Send via WhatsApp Button — emerald, matches theme's success accent */}
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="group relative inline-flex flex-1 items-center justify-center gap-2
                             overflow-hidden rounded-full
                             border border-[#0E8A5F]/50 bg-transparent px-6 py-3
                             text-sm font-medium tracking-tight text-[var(--ink)]
                             transition-all duration-500
                             hover:border-[#0E8A5F] hover:bg-[#0E8A5F]/[0.08]
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                             focus-visible:ring-[#0E8A5F]
                             focus-visible:ring-offset-[#FAF8F4] dark:focus-visible:ring-offset-[#0E0E10]
                             dark:border-[#34D399]/40 dark:text-[#F2F1EE]
                             dark:hover:border-[#34D399] dark:hover:bg-[#34D399]/[0.08]
                             active:scale-[0.98]"
                >
                  <MessageSquare className="h-4 w-4 transition-colors duration-500 group-hover:text-[#0E8A5F] dark:group-hover:text-[#34D399]" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}