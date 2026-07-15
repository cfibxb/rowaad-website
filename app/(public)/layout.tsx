import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { Navbar } from '@/components/public/Navbar'
import { Footer } from '@/components/public/Footer'
import { WhatsAppButton } from '@/components/public/WhatsAppButton'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
      <WhatsAppButton />
    </LanguageProvider>
  )
}