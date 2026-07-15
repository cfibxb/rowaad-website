'use client'
import { FaWhatsapp } from 'react-icons/fa'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { motion } from 'framer-motion'

export function WhatsAppButton() {
  const { locale, t } = useLanguage()
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '21600000000'
  const message = locale === 'fr' ? t('whatsapp.defaultMessage') : t('whatsapp.defaultMessage')
  return (
    <motion.a href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <FaWhatsapp size={32} />
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
    </motion.a>
  )
}