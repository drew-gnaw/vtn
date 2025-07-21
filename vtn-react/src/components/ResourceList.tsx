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
        title: "Crisis Helpline",
        phone: "1-800-555-0123",
        description: "24/7 crisis support and counseling",
        categories: ["Mental Health", "Crisis Support"]
    },
    {
        title: "Local Food Bank",
        link: "https://example-foodbank.org",
        phone: "555-FOOD",
        description: "Free food assistance for families in need",
        categories: ["Food Assistance", "Community Resources"]
    },
    {
        title: "Job Training Center",
        link: "https://example-training.org",
        description: "Free job training and career development programs",
        categories: ["Employment", "Education"]
    },
    {
        title: "Housing Authority",
        phone: "555-HOME",
        description: "Affordable housing assistance and resources",
        categories: []
    }
];

export default function ResourceList() {
    return (
        <div>
            {/*display code goes here...*/}
        </div>
    )
}