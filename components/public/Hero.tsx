'use client'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { motion } from 'framer-motion'
import { SiteSettings } from '@/lib/types'

interface HeroProps { settings: SiteSettings | null }
export function Hero({ settings }: HeroProps) {
  const { locale, t } = useLanguage()
  const [time, setTime] = useState('')
  useEffect(() => {
    const updateClock = () => {
      const tz = settings?.hero_timezone || 'Africa/Tunis'
      const now = new Date().toLocaleString('fr-FR', { timeZone: tz })
      const date = new Date(now)
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
      const formatted = locale === 'fr' ? `${hours}h${minutes}` : `${hours}:${minutes} ${ampm}`
      setTime(formatted)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [locale, settings?.hero_timezone])

  const eyebrow = locale === 'fr' ? settings?.hero_eyebrow_fr : settings?.hero_eyebrow_en
  const title = locale === 'fr' ? settings?.hero_title_fr : settings?.hero_title_en
  const subtitle = locale === 'fr' ? settings?.hero_subtitle_fr : settings?.hero_subtitle_en

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="container px-4 md:px-8 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
          {eyebrow && <p className="text-sm uppercase tracking-widest text-muted-foreground">{eyebrow}</p>}
          {title && <h1 className="font-heading font-bold leading-tight tracking-tight text-foreground" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>{title}</h1>}
          {subtitle && <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">{subtitle}</p>}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="#portfolio" className="px-8 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-full hover:bg-white/20 transition">{t('hero.ctaWork')}</a>
            <a href={`https://wa.me/${settings?.whatsapp_number || '21600000000'}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-400 text-background font-semibold rounded-full hover:scale-105 transition">{t('hero.ctaWhatsApp')}</a>
          </div>
        </motion.div>
        {time && <div className="absolute bottom-8 left-8 text-xs text-muted-foreground bg-white/5 backdrop-blur px-3 py-1 rounded-full">🕐 {locale === 'fr' ? `Actuellement ${time} à Tunis` : `Currently ${time} in Tunis`}</div>}
      </div>
    </section>
  )
}