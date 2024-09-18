import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    contactNumber: '',
    email: '',
    houseNumber: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Regular expressions for validation
    const phonePattern = /^[0-9]{10}$/;
    const postalPattern = /^[0-9]{5}$/; // Adjust this based on your postal code format
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
    const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces

    if (!formData.parentName) newErrors.parentName = 'Parent’s Name is required.';
    else if (!namePattern.test(formData.parentName)) newErrors.parentName = 'Parent’s Name can only contain letters and spaces.';

    if (!formData.contactNumber) newErrors.contactNumber = 'Contact Number is required.';
    else if (!phonePattern.test(formData.contactNumber)) newErrors.contactNumber = 'A valid 10-digit mobile number is required.';

    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email address is required.';

    if (!formData.houseNumber) newErrors.houseNumber = 'House Number is required.';
    else if (formData.houseNumber.length < 1 || formData.houseNumber.length > 10) newErrors.houseNumber = 'House Number must be between 1 and 10 characters.';

    if (!formData.street) newErrors.street = 'Street is required.';
    else if (formData.street.length < 1 || formData.street.length > 50) newErrors.street = 'Street must be between 1 and 50 characters.';

    if (!formData.city) newErrors.city = 'City is required.';
    else if (formData.city.length < 1 || formData.city.length > 30) newErrors.city = 'City must be between 1 and 30 characters.';

    if (!formData.state) newErrors.state = 'State is required.';
    else if (formData.state.length < 1 || formData.state.length > 30) newErrors.state = 'State must be between 1 and 30 characters.';

    if (!formData.postalCode) newErrors.postalCode = 'Postal Code is required.';

    if (!formData.country) newErrors.country = 'Country is required.';
    else if (formData.country.length < 1 || formData.country.length > 30) newErrors.country = 'Country must be between 1 and 30 characters.';

    if (!formData.password) newErrors.password = 'Password is required.';

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`Registration successful! Your unique ID: ${result.uniqueId}`);
        setErrors({});
      } else {
        setMessage(result.message || 'Registration failed');
        setErrors({});
      }
    } catch (error) {
      setMessage('Error during registration');
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Parent Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Parent's Name:
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
          {errors.parentName && <span className="error-message">{errors.parentName}</span>}
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
          {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
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
          {errors.email && <span className="error-message">{errors.email}</span>}
        </label>
        <label>
          House Number:
          <input
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            required
          />
          {errors.houseNumber && <span className="error-message">{errors.houseNumber}</span>}
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
          {errors.street && <span className="error-message">{errors.street}</span>}
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
          {errors.city && <span className="error-message">{errors.city}</span>}
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
          {errors.state && <span className="error-message">{errors.state}</span>}
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
          {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
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
          {errors.country && <span className="error-message">{errors.country}</span>}
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </label>
        <button type="submit">Register</button>
      </form>

      {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

export default Register;
