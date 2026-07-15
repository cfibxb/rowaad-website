'use client'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { PricingPackage } from '@/lib/types'
import { motion } from 'framer-motion'

interface PricingProps { packages: PricingPackage[] }
export function Pricing({ packages }: PricingProps) {
  const { locale, t } = useLanguage()
  const formatPrice = (price: number) => price.toLocaleString(locale === 'en' ? 'en-US' : 'fr-FR')
  return (
    <section id="pricing" className="py-24 md:py-32 bg-background">
      <div className="container px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t('pricing.heading')}</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const name = locale === 'fr' ? pkg.name_fr : pkg.name_en
            const ideal = locale === 'fr' ? pkg.ideal_for_fr : pkg.ideal_for_en
            const features = locale === 'fr' ? pkg.features_fr : pkg.features_en
            const delivery = locale === 'fr' ? pkg.delivery_fr : pkg.delivery_en
            const suffix = locale === 'fr' ? pkg.billing_suffix_fr : pkg.billing_suffix_en
            return (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className={`relative bg-card/60 backdrop-blur border rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 ${pkg.is_featured ? 'border-indigo-500/70 shadow-lg shadow-indigo-500/20' : 'border-white/10'}`}>
                {pkg.is_featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber text-background text-xs font-bold rounded-full">{t('pricing.popular')}</span>}
                <h3 className="font-heading text-2xl font-bold text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{ideal}</p>
                <div className="mt-4"><span className="text-4xl font-bold text-foreground">{formatPrice(pkg.price)}</span><span className="text-muted-foreground ml-1">{pkg.currency}{suffix}</span></div>
                <ul className="mt-6 space-y-2 text-sm">{features.map((f, i) => <li key={i} className="flex items-start gap-2"><span className="text-indigo-400">✓</span><span className="text-muted-foreground">{f}</span></li>)}</ul>
                {delivery && <p className="mt-4 text-xs text-muted-foreground">🕒 {delivery}</p>}
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '21600000000'}?text=${encodeURIComponent(locale === 'fr' ? `Bonjour, je suis intéressé par le forfait ${name}.` : `Hi, I'm interested in the ${name} package.`)}`} target="_blank" rel="noopener noreferrer" className="mt-6 block w-full text-center py-2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-background font-semibold rounded-full hover:scale-105 transition">{t('pricing.choose')}</a>
              </motion.div>
            )
          })}
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground border-t border-white/10 pt-12">
          <div><h4 className="font-heading text-lg text-foreground mb-2">{locale === 'fr' ? 'Modalités de Paiement' : 'Payment Terms'}</h4><p>{locale === 'fr' ? 'Acompte de 50 % pour démarrer le travail, 50 % à la livraison · Tarification fixe convenue par écrit avant le début du projet — aucun frais caché · Les projets hors de ces forfaits sont chiffrés sur devis personnalisé.' : '50% deposit to begin work, 50% on delivery · Fixed pricing agreed in writing before the project starts — no hidden fees · Projects outside these packages are scoped with a custom quote.'}</p></div>
          <div><h4 className="font-heading text-lg text-foreground mb-2">{locale === 'fr' ? 'Pourquoi Travailler Avec Nous' : 'Why Work With Us'}</h4><p>{locale === 'fr' ? 'Tarification transparente et fixe dès le premier jour · Design mobile-first — pensé pour la façon dont vos clients naviguent réellement · Délais de livraison clairs pour chaque projet · Le support ne s'arrête pas au lancement.' : 'Transparent, fixed pricing from day one · Mobile-first design — built for how your customers actually browse · Clear delivery timelines for every project · Support doesn't end at launch.'}</p></div>
        </div>
      </div>
    </section>
  )
}