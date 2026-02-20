import { useState, useEffect } from 'react';
import { type Resource } from "../constants/interface";
import '../App.css';
import '../index.css';
import BACKEND_URL from '../lib/backend';
import CategoryList from './CategoryList';
import AddResourceModal from './AddResourceModal';
import LoginModal from './LoginModal';

export default function ResourceList() {
    // Initialize States
    const [resources, setResources] = useState<Resource[]>([])
    const [filter, setFilter] = useState<string>('All')
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [showAdd, setShowAdd] = useState<boolean>(false)
    const [showLogin, setShowLogin] = useState<boolean>(false)

    // Fetch resources from backend on mount
    useEffect(() => {
        fetch(BACKEND_URL + '/api/resources')
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then((data: any[]) => {
                const mapped: Resource[] = data.map(d => ({
                    title: d.name,
                    description: d.description,
                    link: d.link,
                    phone: d.phone_number,
                    categories: Array.isArray(d.categories) ? d.categories : []
                }))
                setResources(mapped)
            })
            .catch(err => console.error('Failed to fetch resources', err))
    }, [])

    useEffect(() => {
        // detect touch-capable / mobile devices
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
        } catch (err) {
            // ignore
        }
    }

    // Extract unique categories from all resources and include "All"
    const uniqueCategories = [
        'All',
        ...Array.from(new Set(resources.flatMap(resource => resource.categories)))
    ];

    // Filter resources based on selected category
    const filteredResources = filter === 'All'
        ? resources
        : resources.filter(resource => resource.categories.includes(filter))

    // Set filter depends on tile selected
    const handleFilter = (category: string) => {
        setFilter(category)
    };

    return (
        <div className="ResourcePage">
            <CategoryList categories={uniqueCategories} selected={filter} onSelect={handleFilter} />

            <div className="ResourcesPanel">
                <div className="ResourcesHeaderRow">
                    <div className="ResourcesTop">
                        <h2 className="ResourcesTitle">Resources</h2>
                        <div className="CategoryIndicator">Category: <strong>{filter}</strong></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button className="AddResource" onClick={() => setShowAdd(true)}>Add Resource</button>
                      <button className="AddResource" onClick={() => setShowLogin(true)}>Admin Login</button>
                    </div>
                </div>

                <div className="ResourceList">

                    {filteredResources.map((resource, index) => {
                        const content = (
                            <>
                                <div className="ResourceTitle">{resource.title}</div>
                                {resource.description && <p className="ResourceDescription">{resource.description}</p>}
                                {resource.phone && (
                                    <p className="ResourcePhone">
                                        {isMobile ? (
                                            <a className="ResourcePhoneLink" href={`tel:${formatTel(resource.phone)}`}>{resource.phone}</a>
                                        ) : (
                                            <button
                                                className="ResourcePhoneCopy"
                                                onClick={(e: any) => { e.stopPropagation(); e.preventDefault(); copyToClipboard(formatTel(resource.phone)); }}
                                                onKeyDown={(e: any) => { e.stopPropagation(); }}
                                            >
                                                {resource.phone}
                                            </button>
                                        )}
                                    </p>
                                )}
                                {resource.categories.length > 0 && (
                                    <div className="ResourceCategories">{resource.categories.join(', ')}</div>
                                )}
                            </>
                        )

                        const openLink = (e: any) => {
                            // allow normal link clicks to behave
                            if (e?.target?.closest?.('a')) return;
                            window.open(resource.link, '_blank', 'noopener');
                        }

                        return resource.link
                            ? (
                                <div
                                    key={index}
                                    className="ResourceCard ResourceCardClickable"
                                    role="link"
                                    tabIndex={0}
                                    onClick={openLink}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLink(e); }}
                                >
                                    {content}
                                    <div>
                                      <a className="ResourceLink" href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
                                    </div>
                                </div>
                            ) : (
                                <div key={index} className="ResourceCard">
                                    {content}
                                </div>
                            )
                    })}
                </div>
            </div>
            <AddResourceModal visible={showAdd} onClose={() => setShowAdd(false)} initialCategories={uniqueCategories} />
            <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
        </div>
    );
}

// local state inserted near top of file

function formatTel(phone?: string) {
    if (!phone) return '';
    // keep leading + if present, remove all other non-digit characters
    const trimmed = phone.trim();
    const leadingPlus = trimmed.startsWith('+') ? '+' : '';
    return leadingPlus + trimmed.replace(/[^0-9]/g, '');
}

