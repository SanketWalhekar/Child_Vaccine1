import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    contactNumber: '',
    email: '',
    address: '',
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
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number
    const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces

    if (!formData.parentName) newErrors.parentName = 'Parent’s Name is required.';
    else if (!namePattern.test(formData.parentName)) newErrors.parentName = 'Parent’s Name can only contain letters and spaces.';

    if (!formData.contactNumber) newErrors.contactNumber = 'Contact Number is required.';
    else if (!phonePattern.test(formData.contactNumber)) newErrors.contactNumber = 'A valid 10-digit mobile number is required.';

    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email address is required.';

    if (!formData.address) newErrors.address = 'Address is required.';

    if (!formData.password) newErrors.password = 'Password is required.';
    // else if (!passwordPattern.test(formData.password)) newErrors.password = 'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a number.';

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
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
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
