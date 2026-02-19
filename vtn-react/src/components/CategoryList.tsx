import React from 'react';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

export default function CategoryList({ categories, selected, onSelect }: Props) {
  return (
    <div className="CategoryPanel">
      <div className="CategoryHeader">
        <h2>Explore Resources by Category</h2>
        <div className="Crisis">For immediate crisis: <button className="CrisisButton">9-1-1</button></div>
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
