import { useState } from 'react';
import { type Resource } from "../constants/interface";
import '../App.css';

// Sample data 
const sampleResources: Resource[] = [
    {
        title: 'Crisis Helpline',
        link: 'https://example-helpline.org',
        phone: '1-800-555-0123',
        description: '24/7 crisis support and counseling',
        categories: ['Mental Health', 'Crisis Support']
    },
    {
        title: 'Local Food Bank',
        link: 'https://example-foodbank.org',
        phone: '555-FOOD',
        categories: ['Food Assistance', 'Community Support']
    },
    {
        title: 'Job Training Center',
        link: 'https://example-training.org',
        description: 'Free job training and career development programs',
        categories: ['Employment', 'Education', 'Community Support']
    },
    {
        title: 'Housing Authority',
        phone: '555-HOME',
        description: 'Affordable housing assistance and resources',
        categories: ['Housing', 'Community Support']
    },
    {
        title: 'Therapist Directory',
        link: 'https://example-therapist.org',
        phone: '456-555-1234',
        description: 'helps individuals find and connect with therapists',
        categories: ['Mental Health']
    },
];

export default function ResourceList() {
    // Initialize States
    const [resources, setResources] = useState<Resource[]>(sampleResources)
    const [filter, setFilter] = useState<string>('')

    // Extract unique categories from all resources
    const uniqueCategories = Array.from(
        new Set(
            sampleResources.flatMap(resource => resource.categories)
        )
    );

    // Filter resources based on selected category
    const filteredResources = filter 
        ? resources.filter(resource => resource.categories.includes(filter))
        : resources;

    // Set filter depends on button selected
    const handleFilter = (category: string) => {
        setFilter(filter === category ? '' : category); 
    };

    // Render category buttons and resource list
    return (
        <div>
            <div className="CategoryList">
                {uniqueCategories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleFilter(category)}
                        style={{
                            margin: '5px',
                            padding: '5px',
                            backgroundColor: filter === category ? '#007bff' : '#f8f9fa',
                            color: filter === category ? 'white' : 'black',
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            <div className="ResourceList">
                {filteredResources.map((resource, index) => (
                    <div key={index} style={{ marginBottom: '20px', padding: '20px', border: '5px solid #ccc' }}>

                        <h2>{resource.title}</h2>

                        <p>{resource.description}</p>
                        
                        {resource.link && 
                            <p>
                                <strong>Website:</strong> {
                                    <a href={resource.link} target='_blank'>
                                        {resource.link}
                                    </a>
                                }
                                
                            </p>
                        }

                        {resource.phone && (
                            <p>
                                <strong>Phone:</strong> {resource.phone}
                            </p>
                        )}

                        {resource.categories.length > 0 && (
                            <div>
                                <strong>Categories:</strong> {' '}
                                {resource.categories.map((category, categoryIndex) => (
                                    <span key={categoryIndex}>
                                        {category}
                                        {categoryIndex < resource.categories.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

