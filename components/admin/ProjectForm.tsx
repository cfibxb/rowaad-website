'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { ImageDropzone } from './ImageDropzone'
import { Project } from '@/lib/types'

const projectSchema = z.object({
  title_en: z.string().min(1),
  title_fr: z.string().min(1),
  description_en: z.string().optional(),
  description_fr: z.string().optional(),
  website_url: z.string().url().optional().or(z.literal('')),
  is_published: z.boolean().default(true),
})
type ProjectFormData = z.infer<typeof projectSchema>

export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(project?.images || [])
  const [coverImage, setCoverImage] = useState<string | null>(project?.cover_image_url || null)

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      title_en: project.title_en,
      title_fr: project.title_fr,
      description_en: project.description_en || '',
      description_fr: project.description_fr || '',
      website_url: project.website_url || '',
      is_published: project.is_published,
    } : { is_published: true },
  })

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true)
    try {
      const payload = { ...data, cover_image_url: coverImage, images }
      if (project) {
        await supabase.from('projects').update(payload).eq('id', project.id)
        toast({ title: 'Project updated' })
      } else {
        await supabase.from('projects').insert(payload)
        toast({ title: 'Project created' })
      }
      router.push('/admin/projects')
      router.refresh()
    } catch (e) {
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' })
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><Label>Title (EN)</Label><Input {...register('title_en')} />{errors.title_en && <p className="text-red-500 text-sm">{errors.title_en.message}</p>}</div>
        <div><Label>Title (FR)</Label><Input {...register('title_fr')} />{errors.title_fr && <p className="text-red-500 text-sm">{errors.title_fr.message}</p>}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><Label>Description (EN)</Label><Textarea {...register('description_en')} /></div>
        <div><Label>Description (FR)</Label><Textarea {...register('description_fr')} /></div>
      </div>
      <div><Label>Website URL</Label><Input {...register('website_url')} placeholder="https://example.com" />{errors.website_url && <p className="text-red-500 text-sm">{errors.website_url.message}</p>}</div>
      <div><Label>Cover Image</Label><ImageDropzone onUpload={(url) => setCoverImage(url as string)} currentUrl={coverImage} bucket="project-images" /></div>
      <div><Label>Screenshots (max 8)</Label><ImageDropzone multiple maxFiles={8} onUpload={(urls) => setImages(prev => [...prev, ...(urls as string[])])} currentUrls={images} bucket="project-images" onRemove={(idx) => setImages(prev => prev.filter((_, i) => i !== idx))} /></div>
      <div className="flex items-center space-x-2"><Switch {...register('is_published')} defaultChecked={project?.is_published ?? true} /><Label>Published</Label></div>
      <div className="flex gap-4"><Button type="submit" disabled={loading}>{loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}</Button><Button variant="outline" type="button" onClick={() => router.push('/admin/projects')}>Cancel</Button></div>
    </form>
  )
}