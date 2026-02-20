import { useState, useEffect } from 'react'
import BACKEND_URL from '../lib/backend'

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type Props = {
  visible: boolean
  onClose: () => void
  initialCategories: string[]
}

export default function AddResourceModal({ visible, onClose, initialCategories }: Props) {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [available, setAvailable] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [newCat, setNewCat] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    // initialize available categories (filter out 'All')
    setAvailable(initialCategories.filter(c => c !== 'All'))
    setSelected([])
  }, [initialCategories, visible])

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  if (!visible) return null

  const toggle = (c: string) => {
    setSelected(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]))
  }

  const addCategory = () => {
    const v = newCat.trim()
    if (!v) return
    if (!available.includes(v)) setAvailable(prev => [...prev, v])
    if (!selected.includes(v)) setSelected(prev => [...prev, v])
    setNewCat('')
  }

  const handleSubmit = async (e?: any) => {
    e?.preventDefault()
    if (!title.trim()) {
      setToastMessage('Title is required')
      return
    }
    setSubmitting(true)
    try {
      const body = {
        name: title,
        description: description || undefined,
        link: link || undefined,
        phone_number: phone || undefined,
        categories: selected || []
      }

      const res = await fetch(BACKEND_URL + '/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error(await res.text())

      await res.json()
      setToastMessage('Resource submitted: pending moderation')
      window.setTimeout(() => {
        setToastMessage(null)
        onClose()
      }, 1200)
    } catch (err) {
      console.error('submit error', err)
      setToastMessage('Failed to submit resource, please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="ModalOverlay"
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="ModalContent">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="ModalTitle">Submit a Resource</div>
            <div className="ModalSubtitle">When you submit a resource, it will be reviewed by moderators before appearing on the site.</div>
          </div>

          <button className="ModalClose" onClick={onClose} aria-label="Close"><CloseIcon size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="FormRow">
            <label>Title*</label>
            <input value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="FormRow">
            <label>Link</label>
            <input value={link} onChange={e => setLink(e.target.value)} />
          </div>

          <div className="FormRow">
            <label>Phone Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <div className="FormRow">
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div className="FormRow">
            <label>Categories</label>
            <div className="MultiCategoryList">
              {available.map((c) => (
                <label key={c} className="CategoryCheckbox">
                  <input type="checkbox" checked={selected.includes(c)} onChange={() => toggle(c)} />
                  <span>{c}</span>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input className="AddCategoryInput" value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Add new category" />
              <button type="button" onClick={addCategory}>Add</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, paddingBottom: 12 }}>
            <button type="submit" disabled={submitting} className="AddResource">{submitting ? 'Submitting...' : 'Submit'}</button>
          </div>
        </form>
        {toastMessage && (
          <div className="CopiedToast" role="status" aria-live="polite">{toastMessage}</div>
        )}
      </div>
    </div>
  )
}
