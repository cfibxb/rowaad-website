'use client'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export function Footer() {
  const { locale, t } = useLanguage()
  return (
    <footer className="bg-background border-t border-white/10 py-12">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div><h3 className="font-heading text-2xl font-bold text-foreground">ROWAAD</h3><p className="text-muted-foreground text-sm mt-2">{t('footer.tagline')}</p></div>
          <div className="flex flex-col space-y-2">
            <a href="#home" className="text-muted-foreground hover:text-foreground text-sm">{t('nav.home')}</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground text-sm">{t('nav.services')}</a>
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground text-sm">{t('nav.portfolio')}</a>
            <a href="#team" className="text-muted-foreground hover:text-foreground text-sm">{t('nav.team')}</a>
          </div>
          <div><p className="text-muted-foreground text-sm">contact@rowaad.tn</p><div className="flex gap-4 mt-2"><a href="#" className="text-muted-foreground hover:text-foreground"><FaGithub size={20} /></a><a href="#" className="text-muted-foreground hover:text-foreground"><FaLinkedin size={20} /></a><a href="#" className="text-muted-foreground hover:text-foreground"><FaTwitter size={20} /></a></div></div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ROWAAD. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-foreground transition">{t('footer.admin')}</Link>
        </div>
      </div>
    </footer>
  )
}