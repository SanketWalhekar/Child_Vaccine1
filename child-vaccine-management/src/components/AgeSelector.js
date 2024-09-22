import React, { useState } from 'react';
import './AgeSelector.css'; // Import the CSS file

const AgeSelector = ({ onAgeSelect }) => {
  const [age, setAge] = useState('');

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    onAgeSelect(e.target.value);  // Pass selected age to parent component
  };

  return (
    <div className="age-selector">
      <label>Select Child Age: </label>
      <input type="number" value={age} onChange={handleAgeChange} min="0" max="18" />
    </div>
  );
};

export default AgeSelector;
