import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Hero } from '@/components/public/Hero'
import { Pricing } from '@/components/public/Pricing'
import { Portfolio } from '@/components/public/Portfolio'
import { Team } from '@/components/public/Team'
import { SiteSettings, PricingPackage, Project, TeamMember } from '@/lib/types'

export default async function HomePage() {
  const supabase = createServerSupabaseClient()
  const [settingsRes, pricingRes, projectsRes, teamRes] = await Promise.all([
    supabase.from('site_settings').select('*').single(),
    supabase.from('pricing_packages').select('*').order('order_index', { ascending: true }),
    supabase.from('projects').select('*').order('order_index', { ascending: true }),
    supabase.from('team_members').select('*').order('order_index', { ascending: true }),
  ])
  const settings = settingsRes.data as SiteSettings | null
  const pricingPackages = pricingRes.data as PricingPackage[] | []
  const projects = projectsRes.data as Project[] | []
  const teamMembers = teamRes.data as TeamMember[] | []

  return (
    <>
      <Hero settings={settings} />
      <Pricing packages={pricingPackages} />
      <Portfolio projects={projects} />
      <Team members={teamMembers} />
    </>
  )
}