'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Locale } from '@/lib/types'

type LanguageContextType = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string) => string; dict: any }
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr')
  const [dict, setDict] = useState<any>(null)
  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && (stored === 'en' || stored === 'fr')) setLocale(stored)
  }, [])
  useEffect(() => {
    localStorage.setItem('locale', locale)
    import(`@/lib/dictionaries/${locale}.json`).then((mod) => setDict(mod.default))
  }, [locale])
  const t = (key: string) => {
    if (!dict) return key
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : key, dict)
  }
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dict }}>
      {children}
    </LanguageContext.Provider>
  )
}
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}