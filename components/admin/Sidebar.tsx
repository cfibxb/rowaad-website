'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, Briefcase, DollarSign, Users, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const links = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/settings', label: 'Site Settings', icon: Settings },
    { href: '/admin/projects', label: 'Projects', icon: Briefcase },
    { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
    { href: '/admin/team', label: 'Team', icon: Users },
  ]
  const handleLogout = async () => { await supabase.auth.signOut(); router.push('/admin/login') }
  return (
    <aside className="hidden md:flex flex-col w-64 bg-card/60 backdrop-blur border-r border-white/10 p-6 space-y-6 h-screen sticky top-0">
      <div className="font-heading text-2xl font-bold text-foreground">ROWAAD</div>
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${active ? 'bg-indigo-500/20 text-indigo-400' : 'text-muted-foreground hover:bg-white/5'}`}><Icon size={18} /><span>{link.label}</span></Link>
        })}
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-foreground transition"><LogOut size={18} /><span>Logout</span></button>
    </aside>
  )
}