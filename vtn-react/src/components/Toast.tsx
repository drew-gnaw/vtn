import React, { useEffect, useState } from 'react'
import '../index.css'

export default function Toast() {
  const [message, setMessage] = useState<string | null>(null)
  useEffect(() => {
    const handler = (e: any) => {
      const text = e?.detail ?? 'Copied'
      setMessage(text)
      window.setTimeout(() => setMessage(null), 2000)
    }
    window.addEventListener('vtn:copied', handler as EventListener)
    return () => window.removeEventListener('vtn:copied', handler as EventListener)
  }, [])

  if (!message) return null

  return (
    <div className="CopiedToast" role="status" aria-live="polite">{message}</div>
  )
}
