import React, { useState } from 'react';
import './BookAppointment.css';

const BookAppointment = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic here
    console.log('Appointment booked:', { name, age, date, time });
  };

  const handleFindCenter = () => {
    // Handle finding nearby vaccination center logic here
    console.log('Finding nearby vaccination center...');
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Child's Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Child's Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="book-button">Book Appointment</button>
          <button type="button" className="center-button" onClick={handleFindCenter}>Find Nearby Vaccination Center</button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
