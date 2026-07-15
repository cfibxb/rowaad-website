'use client'
import Image from 'next/image'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { TeamMember } from '@/lib/types'
import { motion } from 'framer-motion'

interface TeamProps { members: TeamMember[] }
export function Team({ members }: TeamProps) {
  const { locale, t } = useLanguage()
  return (
    <section id="team" className="py-24 md:py-32 bg-background">
      <div className="container px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t('team.heading')}</h2>
        </motion.div>
        {members.length === 0 ? <p className="text-center text-muted-foreground">{t('team.empty')}</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => {
              const title = locale === 'fr' ? member.title_fr : member.title_en
              const bio = locale === 'fr' ? member.bio_fr : member.bio_en
              return (
                <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="bg-card/60 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-all">
                  {member.photo_url && <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"><Image src={member.photo_url} alt={member.name} fill className="object-cover" /></div>}
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground">{member.name}</h3>
                  {title && <p className="text-indigo-400 text-sm">{title}</p>}
                  {bio && <p className="mt-2 text-sm text-muted-foreground">{bio}</p>}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}