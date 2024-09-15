import React from 'react';
import './ParentInfo.css'; // Import the CSS file

const ParentInfo = ({ nextStep, handleChange, formData }) => {
  const handleNext = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.parentName || !formData.contactNumber || !formData.email || !formData.houseNumber || !formData.street || !formData.city || !formData.state || !formData.postalCode || !formData.country) {
      alert('Please fill out all required fields');
      return;
    }

    // Specific field validation
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      alert('Contact Number must be 10 digits');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Invalid email format');
      return;
    }

    if (!/^\d{6}$/.test(formData.postalCode)) {
      alert('Postal Code must be 6 digits');
      return;
    }

    nextStep(); // Proceed to the next step if validation passes
  };

  return (
    <div className="parent-info">
      <h2>Parent Information</h2>
      <form>
        <label>
          Parent Name:
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        
        {/* Address Fields */}
        <label>
          House Number:
          <input
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </label>

        <button onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default ParentInfo;
