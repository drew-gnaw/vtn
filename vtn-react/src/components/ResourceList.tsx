import { useState, useEffect } from 'react';
import { type Resource } from "../constants/interface";
import '../App.css';
import '../index.css';
import BACKEND_URL from '../lib/backend';
import CategoryList from './CategoryList';
import Header from './Header';

export default function ResourceList() {
    // Initialize States
    const [resources, setResources] = useState<Resource[]>([])
    const [filter, setFilter] = useState<string>('All')

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
                <Header category={filter} />

                <div className="ResourceList">
                    {filteredResources.map((resource, index) => (
                        <div key={index} className="ResourceCard">
                            <div className="ResourceTitle">{resource.title}</div>
                            {resource.description && <p className="ResourceDescription">{resource.description}</p>}
                            {resource.phone && <p className="ResourcePhone">{resource.phone}</p>}
                            {resource.categories.length > 0 && (
                                <div className="ResourceCategories">{resource.categories.join(', ')}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

