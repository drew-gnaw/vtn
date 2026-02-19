import React from 'react';

type Props = {
  category: string;
}

export default function Header({ category }: Props) {
  return (
    <div className="ResourcesHeader">
      <h2>Resources</h2>
      <div className="RightControls">
        <div className="CategoryLabel">Category: <strong>{category}</strong></div>
        <button className="AddResource">Add Resource</button>
      </div>
    </div>
  )
}
