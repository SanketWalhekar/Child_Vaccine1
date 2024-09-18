import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddVaccine from './components/AddVaccine';
import ViewRecords from './components/ViewRecords';
import Login from './components/Login';
import BookAppointment from './components/BookAppointment';
import Healthcare from './components/Healthcare';
import Recommendation from './components/Recommendation';
import Footer from './components/Footer';
import ParentInfo from './components/ParentInfo';
import ChildInfo from './components/ChildInfo';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage'; // Import LandingPage

const App = () => {
  const [step, setStep] = useState(1);
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
    childName: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
    password: '',
    confirmPassword: '',
    age: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = async () => {
    if (step === 2) {
      try {
        const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
        }

        const result = await response.json();
        setSuccessMessage('Form submitted successfully!');
        setErrorMessage('');
        console.log('Server response:', result);
        setStep(step + 1); // Proceed to the next step after successful registration
      } catch (error) {
        setErrorMessage(error.message || 'Something went wrong');
        console.error('Fetch error:', error);
      }
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleLogin = (isLoggedIn, userId) => {
    setIsAuthenticated(isLoggedIn);
    if (isLoggedIn) {
      setUserId(userId);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={isAuthenticated ? <AddVaccine /> : <Navigate to="/login" />} />
            <Route path="/view" element={isAuthenticated ? <ViewRecords /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/register"
              element={
                <>
                  {step === 1 && (
                    <ParentInfo
                      nextStep={nextStep}
                      handleChange={handleChange}
                      formData={formData}
                    />
                  )}
                  {step === 2 && (
                    <ChildInfo
                      prevStep={prevStep}
                      nextStep={nextStep}
                      handleChange={handleChange}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {step > 2 && (
                    <div>
                      <div>{successMessage}</div>
                      <div style={{ color: 'red' }}>{errorMessage}</div>
                    </div>
                  )}
                </>
              }
            />
            <Route path="/book" element={isAuthenticated ? <BookAppointment /> : <Navigate to="/login" />} />
            <Route path="/healthcare" element={isAuthenticated ? <Healthcare /> : <Navigate to="/login" />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/profile" element={isAuthenticated && userId ? <Profile userId={userId} /> : <Navigate to="/login" />} />
            <Route path="/landing" element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
// comment