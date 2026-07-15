'use client'
import { useLanguage } from '@/components/providers/LanguageProvider'
export function AdminHeader() {
  const { locale, setLocale } = useLanguage()
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 md:px-8 bg-background/80 backdrop-blur">
      <div className="text-sm text-muted-foreground">Admin</div>
      <button onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium">{locale.toUpperCase()}</button>
    </header>
  )
}