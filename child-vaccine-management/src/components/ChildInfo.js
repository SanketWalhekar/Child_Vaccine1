// src/components/ChildInfo.js
import React, { useState, useEffect } from 'react';
import './ChildInfo.css';

const ChildInfo = ({ prevStep, nextStep, handleChange, formData, setFormData }) => {
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDifference = today.getMonth() - dob.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      setAge(age);
      setFormData(prevData => ({ ...prevData, age }));
    }
  }, [formData.dateOfBirth, setFormData]);

  const handlePrev = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.childName) newErrors.childName = 'Child Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    nextStep();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="child-info">
      <h2>Child Information</h2>
      <form>
        <label>
          Child's Name:
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            required
          />
          {errors.childName && <span className="error">{errors.childName}</span>}
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </label>
        <label>
          Age: <span>{age}</span>
        </label>
        <label>
          Password:
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </label>
        <label>
          Confirm Password:
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </label>

        <button onClick={handlePrev}>Back</button>
        <button onClick={handleNext}>Submit</button>
      </form>
    </div>
  );
};

export default ChildInfo;
