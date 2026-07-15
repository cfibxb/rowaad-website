'use client'
import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'

interface ImageDropzoneProps {
  onUpload: (url: string | string[]) => void
  currentUrl?: string | null
  currentUrls?: string[]
  multiple?: boolean
  maxFiles?: number
  bucket: string
  onRemove?: (index: number) => void
}

export function ImageDropzone({ onUpload, currentUrl, currentUrls = [], multiple = false, maxFiles = 8, bucket, onRemove }: ImageDropzoneProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const fileArray = Array.from(files)
    if (!multiple && fileArray.length > 1) { alert('Only one file allowed'); return }
    if (multiple && currentUrls.length + fileArray.length > maxFiles) { alert(`Max ${maxFiles} images allowed`); return }
    setUploading(true)
    const uploadPromises = fileArray.map(async (file) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { error } = await supabase.storage.from(bucket).upload(fileName, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName)
      return publicUrl
    })
    try {
      const urls = await Promise.all(uploadPromises)
      if (multiple) onUpload(urls)
      else onUpload(urls[0])
    } catch (e) { alert('Upload failed') }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = '' }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {!multiple && currentUrl && <div className="relative w-32 h-32"><Image src={currentUrl} alt="Cover" fill className="object-cover rounded" /></div>}
        {multiple && currentUrls.map((url, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <Image src={url} alt={`Screenshot ${idx+1}`} fill className="object-cover rounded" />
            {onRemove && <button onClick={() => onRemove(idx)} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"><X size={14} /></button>}
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading || (multiple && currentUrls.length >= maxFiles)}>{uploading ? 'Uploading...' : 'Upload Image'}</Button>
      <input ref={fileInputRef} type="file" accept="image/*" multiple={multiple} onChange={handleFileChange} className="hidden" />
    </div>
  )
}