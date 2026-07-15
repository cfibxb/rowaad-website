'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { Project } from '@/lib/types'
import { motion } from 'framer-motion'
import { ProjectModal } from './ProjectModal'

interface PortfolioProps { projects: Project[] }
export function Portfolio({ projects }: PortfolioProps) {
  const { locale, t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const visible = projects.filter(p => p.is_published)
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background/50">
      <div className="container px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t('portfolio.heading')}</h2>
        </motion.div>
        {visible.length === 0 ? <p className="text-center text-muted-foreground">{t('portfolio.empty')}</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project, index) => {
              const title = locale === 'fr' ? project.title_fr : project.title_en
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }} className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer hover:scale-[1.02] transition-transform duration-300" onClick={() => setSelectedProject(project)}>
                  {project.cover_image_url && <div className="aspect-[4/3] relative"><Image src={project.cover_image_url} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" /></div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-heading font-bold text-foreground">{title}</h3>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  )
}