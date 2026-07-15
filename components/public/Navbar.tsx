'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const { locale, setLocale, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navItems = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.services'), href: '#pricing' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.team'), href: '#team' },
    { label: t('nav.contact'), href: '#contact' },
  ]
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-foreground">ROWAAD</Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm">
          {navItems.map((item) => <a key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground transition">{item.label}</a>)}
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium hover:bg-white/20 transition">{locale.toUpperCase()}</button>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '21600000000'}`} target="_blank" rel="noopener noreferrer" className="hidden md:inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-background font-semibold rounded-full text-sm hover:scale-105 transition">{t('nav.contact')}</a>
          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10">
            <nav className="flex flex-col items-center py-8 space-y-6 text-lg">
              {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition">{item.label}</a>)}
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '21600000000'}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-400 text-background font-semibold rounded-full" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}