'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { Project } from '@/lib/types'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface ProjectModalProps { project: Project; onClose: () => void }
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { locale } = useLanguage()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const modalRef = useRef<HTMLDivElement>(null)
  const title = locale === 'fr' ? project.title_fr : project.title_en
  const description = locale === 'fr' ? project.description_fr : project.description_en
  const images = project.images || []

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && emblaApi) emblaApi.scrollPrev()
      if (e.key === 'ArrowRight' && emblaApi) emblaApi.scrollNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [emblaApi, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) onClose()
  }

  return (
    <AnimatePresence>
      <motion.div ref={modalRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/90 backdrop-blur-lg flex items-center justify-center p-4" onClick={handleBackdropClick}>
        <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="relative bg-card max-w-6xl w-full rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={28} /></button>
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold text-foreground">{title}</h2>
            {images.length > 0 && (
              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}><div className="flex">{images.map((url, idx) => <div key={idx} className="flex-[0_0_100%] min-w-0"><div className="relative aspect-video"><Image src={url} alt={`${title} - ${idx + 1}`} fill className="object-cover rounded-lg" /></div></div>)}</div></div>
                {images.length > 1 && (
                  <>
                    <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur p-2 rounded-full"><ArrowLeft size={20} /></button>
                    <button onClick={() => emblaApi?.scrollNext()} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/60 backdrop-blur p-2 rounded-full"><ArrowRight size={20} /></button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">{images.map((_, idx) => <button key={idx} className={`w-2 h-2 rounded-full ${idx === (emblaApi?.selectedScrollSnap() || 0) ? 'bg-foreground' : 'bg-muted'}`} onClick={() => emblaApi?.scrollTo(idx)} />)}</div>
                  </>
                )}
              </div>
            )}
            {description && <p className="text-muted-foreground">{description}</p>}
            {project.website_url && <a href={project.website_url} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-background font-semibold rounded-full hover:scale-105 transition">{locale === 'fr' ? 'Visiter le Site →' : 'Visit Live Website →'}</a>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}