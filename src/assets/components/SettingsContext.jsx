import React, { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    // 1. Toggle root .dark class for Tailwind
    document.documentElement.classList.toggle('dark', dark)

    // 2. Save preference
    localStorage.setItem('theme', dark ? 'dark' : 'light')

    // 3. Update mobile address bar tint
    const bg = dark ? '#0E0E10' : '#FAF8F4'
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((el) => el.setAttribute('content', bg))
  }, [dark])

  return (
    <SettingsContext.Provider value={{ dark, setDark }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)