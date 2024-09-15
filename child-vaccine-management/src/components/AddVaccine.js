import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddVaccine = ({ addVaccine }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addVaccine({ id: uuidv4(), name, date });
    setName('');
    setDate('');
  };

  return (
    <div className="container">
      <h2>Add New Vaccine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Vaccine Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date Administered:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Vaccine</button>
      </form>
      <div className="image-container">
        <img src="/vaccine2.jpg" alt="Add Vaccine" />
      </div>
    </div>
  );
};

export default AddVaccine;
