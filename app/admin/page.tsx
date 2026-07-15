import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function AdminOverview() {
  const supabase = createServerSupabaseClient()
  const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })
  const { count: teamCount } = await supabase.from('team_members').select('*', { count: 'exact', head: true })
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card/60 backdrop-blur border border-white/10 rounded-xl p-6">
          <p className="text-muted-foreground">Projects</p>
          <p className="text-4xl font-bold text-foreground">{projectCount || 0}</p>
        </div>
        <div className="bg-card/60 backdrop-blur border border-white/10 rounded-xl p-6">
          <p className="text-muted-foreground">Team Members</p>
          <p className="text-4xl font-bold text-foreground">{teamCount || 0}</p>
        </div>
      </div>
    </div>
  )
}