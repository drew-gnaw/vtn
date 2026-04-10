import { useState, useEffect } from 'react'
import { type Resource } from '../constants/interface'

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
  resource: Resource | null
  onClose: () => void
  onSave: (resourceId: string, updates: Partial<Resource>) => Promise<void>
  availableCategories: string[]
}

export default function EditResourceModal({ visible, resource, onClose, onSave, availableCategories }: Props) {
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
    if (!visible || !resource) return
    setTitle(resource.title || '')
    setLink(resource.link || '')
    setPhone(resource.phone || '')
    setDescription(resource.description || '')
    setAvailable(availableCategories.filter(c => c !== 'All'))
    setSelected(resource.categories || [])
    setNewCat('')
  }, [resource, visible, availableCategories])

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, onClose])

  if (!visible || !resource) return null

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
      const updates = {
        title,
        description: description || undefined,
        link: link || undefined,
        phone: phone || undefined,
        categories: selected || []
      }

      await onSave(resource.id!, updates)
      setToastMessage('Resource updated successfully')
      window.setTimeout(() => {
        setToastMessage(null)
        onClose()
      }, 1200)
    } catch (err: any) {
      console.error('edit error', err)
      setToastMessage(err?.message || 'Failed to update resource, please try again later.')
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
            <div className="ModalTitle">Edit Resource</div>
            <div className="ModalSubtitle">Update the resource information below</div>
          </div>

          <button className="ModalClose" onClick={onClose} aria-label="Close"><CloseIcon size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="FormRow">
            <label>Title*</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Name of the resource' />
          </div>

          <div className="FormRow">
            <label>Link</label>
            <input value={link} onChange={e => setLink(e.target.value)} placeholder='Link to the resource' />
          </div>

          <div className="FormRow">
            <label>Phone Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder='Phone number of the resource' />
          </div>

          <div className="FormRow">
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder='Describe the resource...' />
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
            <button type="submit" disabled={submitting} className="AddResource">{submitting ? 'Saving...' : 'Save Changes'}</button>
            <button type="button" onClick={onClose} disabled={submitting}>Cancel</button>
          </div>
        </form>
        {toastMessage && (
          <div className="CopiedToast" role="status" aria-live="polite">{toastMessage}</div>
        )}
      </div>
    </div>
  )
}
