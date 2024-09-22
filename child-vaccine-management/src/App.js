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
import LandingPage from './components/LandingPage'; 
import Register from './components/Register';
import GoogleMapsNearbyPlaces from './components/GoogleMapsNearbyPlaces';


const App = () => {
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  

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
            <Route path="/register" element={<Register />} />
            <Route path="/bookapp" element={<GoogleMapsNearbyPlaces />} />


            {/* <Route path="/book" element={<BookAppointment />}/> */}
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
