import React from 'react';

type Props = {
  // Header currently only renders the Add Resource button
}

export default function Header(_: Props) {
  return (
    <div className="HeaderOnly">
      <button className="AddResource">Add Resource</button>
    </div>
  )
}
