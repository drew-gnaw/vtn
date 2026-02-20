import { useState, useEffect, useRef } from 'react'
import BACKEND_URL from '../lib/backend'

type Props = {
  visible: boolean
  onClose: () => void
}

export default function LoginModal({ visible, onClose }: Props) {
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!visible) return
    setPassword('')
    setMessage(null)
  }, [visible])

  useEffect(() => {
    return () => { if (timerRef.current) window.clearTimeout(timerRef.current) }
  }, [])

  if (!visible) return null

  const handleSubmit = async (e?: any) => {
    e?.preventDefault()
    if (!password.trim()) {
      setMessage('Password required')
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setMessage(null), 2600)
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(BACKEND_URL + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (!res.ok) {
        const err = data?.message || data || 'Login failed'
        throw new Error(err)
      }
      const token = data?.token
      if (token) {
        try { localStorage.setItem('vtn:adminToken', token) } catch {}
        setMessage('Logged in')
        if (timerRef.current) window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => { setMessage(null); onClose() }, 1200)
      } else {
        throw new Error('No token returned')
      }
    } catch (err: any) {
      setMessage(err?.message.error || 'Login failed')
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setMessage(null), 2600)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="ModalOverlay" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="ModalContent">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="ModalTitle">Admin Login</div>
            <div className="ModalSubtitle">Enter admin password</div>
          </div>
          <button className="ModalClose" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="FormRow">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, paddingBottom: 12 }}>
            <button type="submit" disabled={submitting} className="AddResource">{submitting ? 'Logging in...' : 'Log in'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
        {message && <div className="CopiedToast" role="status" aria-live="polite">{message}</div>}
      </div>
    </div>
  )
}
