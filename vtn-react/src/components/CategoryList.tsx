import React, { useEffect, useState } from 'react';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

export default function CategoryList({ categories, selected, onSelect }: Props) {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    try {
      const nav = typeof navigator !== 'undefined' ? navigator : null
      const touch = nav && (nav.maxTouchPoints && nav.maxTouchPoints > 0 || /Mobi|Android|iPhone|iPad|iPod/i.test(nav.userAgent))
      setIsMobile(Boolean(touch))
    } catch {
      setIsMobile(false)
    }
  }, [])

  const copyToClipboard = async (text: string) => {
    if (!text) return
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.left = '-9999px'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      window.dispatchEvent(new CustomEvent('vtn:copied', { detail: 'Copied' }))
    } catch {
      // ignore
    }
  }

  const tel911 = '911'

  return (
    <div className="CategoryPanel">
      <div className="CategoryHeader">
        <h2>Explore Resources by Category</h2>
        <div className="Crisis">
          For immediate crisis: {
            isMobile ? (
              <a className="CrisisButton" href={`tel:${tel911}`}>9-1-1</a>
              ) : (
              <button
                className="CrisisButton"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); copyToClipboard(tel911); }}
              >
                9-1-1
              </button>
            )
          }
        </div>
      </div>

      <div className="CategoryGrid">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`CategoryTile ${selected === category ? 'selected' : ''}`}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
