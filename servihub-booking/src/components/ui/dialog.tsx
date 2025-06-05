// src/components/ui/dialog.tsx
import type { ReactNode } from 'react'

export function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-muted">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-red-500 transition">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
