interface Resource {
    title: string;
    link?: string;
    phone?: string;
    description?: string;
    categories: string[];
}

// sample data 
const sampleResources: Resource[] = [
    {
        title: 'Crisis Helpline',
        link: 'https://example-helpline.org',
        phone: '1-800-555-0123',
        description: '24/7 crisis support and counseling',
        categories: ['Mental Health', 'Crisis Support', 'Bomba', 'Sybau', 'OG Fortnite 67 Geekbar']
    },
    {
        title: 'Local Food Bank',
        link: 'https://example-foodbank.org',
        phone: '555-FOOD',
        categories: ['Food Assistance', 'Community Resources']
    },
    {
        title: 'Job Training Center',
        link: 'https://example-training.org',
        description: 'Free job training and career development programs',
        categories: ['Employment', 'Education']
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
        categories: []
    },
];

export default function ResourceList() {
    return (
        <div>
            <h1>Resources List</h1>
            {sampleResources.map((resource, index) => (
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
    );
}

