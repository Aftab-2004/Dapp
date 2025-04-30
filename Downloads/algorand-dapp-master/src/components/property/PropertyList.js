import React, { useState } from 'react';

const PropertyList = ({ account }) => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({ description: '', price: '' });

  const handleAddProperty = () => {
    if (!newProperty.description || !newProperty.price) return;

    const property = {
      id: Date.now(),
      owner: account,
      ...newProperty,
    };

    setProperties([...properties, property]);
    setNewProperty({ description: '', price: '' });
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Property Listings</h2>

      <div>
        <input
          type="text"
          placeholder="Property Description"
          value={newProperty.description}
          onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (ALGO)"
          value={newProperty.price}
          onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
        />
        <button onClick={handleAddProperty}>List Property</button>
      </div>

      <ul>
        {properties.map((prop) => (
          <li key={prop.id}>
            <strong>{prop.description}</strong> – {prop.price} ALGO  
            {prop.owner === account && " (You)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
