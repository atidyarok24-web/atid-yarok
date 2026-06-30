import { useState, useRef, type ChangeEvent } from 'react'
import { trpc } from '@/providers/trpc'
import { FaUpload, FaTrash, FaImage, FaVideo, FaSpinner, FaFilm } from 'react-icons/fa'

type FileType = 'image' | 'video' | 'both'

interface FileUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  folder?: string
  fileType?: FileType
}

export default function FileUploader({
  value,
  onChange,
  label = 'קובץ',
  folder = 'images',
  fileType = 'image'
}: FileUploaderProps) {
  const [preview, setPreview] = useState<string>(value)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const uploadMut = trpc.upload.uploadFile.useMutation()
  const deleteMut = trpc.upload.deleteFile.useMutation()

  const isImage = (type: string) => type.startsWith('image/')
  const isVideo = (type: string) => type.startsWith('video/')

  const getAccept = () => {
    if (fileType === 'image') return 'image/*'
    if (fileType === 'video') return 'video/*'
    return 'image/*,video/*'
  }

  const getIcon = () => {
    if (fileType === 'image') return <FaImage />
    if (fileType === 'video') return <FaVideo />
    return <FaFilm />
  }

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const fileIsImage = isImage(file.type)
    const fileIsVideo = isVideo(file.type)

    if (fileType === 'image' && !fileIsImage) {
      setError('יש לבחור קובץ תמונה בלבד')
      return
    }
    if (fileType === 'video' && !fileIsVideo) {
      setError('יש לבחור קובץ וידאו בלבד')
      return
    }
    if (fileType === 'both' && !fileIsImage && !fileIsVideo) {
      setError('יש לבחור קובץ תמונה או וידאו בלבד')
      return
    }

    setError('')
    setUploading(true)
    setProgress(0)

    try {
      // Read file as base64
      const reader = new FileReader()

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100))
        }
      }

      reader.onloadend = async () => {
        const base64 = reader.result as string
        setPreview(base64) // Show local preview immediately

        const targetFolder = fileIsVideo ? 'videos' : folder
        const filename = `${Date.now()}-${file.name}`
        const result = await uploadMut.mutateAsync({
          filename,
          data: base64,
          folder: targetFolder,
        })

        onChange(result.url)
        setPreview(result.url)
        setUploading(false)
        setProgress(0)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      setError('שגיאה בהעלאת הקובץ')
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDelete = async () => {
    if (!value) return

    const filename = value.split('/').pop()
    const valueFolder = value.startsWith('/videos/') ? 'videos' : folder
    if (filename) {
      try {
        await deleteMut.mutateAsync({ filename, folder: valueFolder })
      } catch {
        // Ignore delete errors
      }
    }

    onChange('')
    setPreview('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const showPreview = preview || value
  const isCurrentVideo = showPreview && (showPreview.endsWith('.mp4') || showPreview.endsWith('.webm') || showPreview.endsWith('.mov'))

  return (
    <div>
      <label className="font-body-sm text-stone-600 block mb-1">{label}</label>

      {/* Preview Area */}
      {showPreview && (
        <div className="relative mb-3 inline-block">
          {isCurrentVideo ? (
            <video
              src={showPreview}
              controls
              className="w-64 h-40 object-cover rounded-lg border border-stone-200"
            />
          ) : (
            <img
              src={showPreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-stone-200"
            />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col items-center justify-center">
              <FaSpinner className="text-white text-xl animate-spin mb-2" />
              <span className="text-white text-sm font-body">{progress}%</span>
            </div>
          )}
          <button
            onClick={handleDelete}
            className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer border-none z-10"
            title="מחק קובץ"
            type="button"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept={getAccept()}
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="bg-green-700 text-white px-4 py-2 rounded-lg font-body-sm hover:bg-green-800 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer border-none"
          type="button"
        >
          {uploading ? <><FaSpinner className="animate-spin" /> מעלה... ({progress}%)</> : <><FaUpload /> העלה {fileType === 'video' ? 'סרטון' : fileType === 'both' ? 'קובץ' : 'תמונה'}</>}
        </button>
        {!showPreview && (
          <span className="font-body-sm text-stone-400 flex items-center gap-1">
            {getIcon()} אין קובץ
          </span>
        )}
      </div>

      {/* Manual URL Input */}
      <div className="mt-2">
        <label className="font-body-sm text-stone-400 block mb-1">או הכנס נתיב ידני:</label>
        <input
          value={value}
          onChange={e => { onChange(e.target.value); setPreview(e.target.value) }}
          placeholder={fileType === 'video' ? '/videos/example.mp4' : '/images/example.jpg'}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 font-body focus:border-green-700 focus:outline-none text-sm"
        />
      </div>

      {error && <p className="font-body-sm text-red-500 mt-2">{error}</p>}
    </div>
  )
}
