import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'lucide-react'

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-2xl glass-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Command className="w-5 h-5 text-text-muted" />
          <input
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs font-mono bg-surface rounded border border-border text-text-tertiary">
            ESC
          </kbd>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          <p className="px-3 py-2 text-xs text-text-muted">Quick actions</p>
          {/* Command items would go here */}
        </div>
      </div>
    </div>
  )
}
