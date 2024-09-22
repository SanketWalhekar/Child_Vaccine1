// src/BookAppointment.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const BookAppointment = () => {
  const [pincode, setPincode] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default center (India)

  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const geoResponse = await fetch(`/api/geocode?address=${pincode}`);
      if (!geoResponse.ok) {
        const errorText = await geoResponse.text();
        console.error('Geocode API error:', errorText);
        alert("Error fetching geocode data.");
        return;
      }
      const geoData = await geoResponse.json();
      
      if (geoData.results.length > 0) {
        const { lat, lng } = geoData.results[0].geometry.location;
  
        const placesResponse = await fetch(`/api/nearby-hospitals?lat=${lat}&lng=${lng}`);
        if (!placesResponse.ok) {
          const errorText = await placesResponse.text();
          console.error('Nearby hospitals API error:', errorText);
          alert("Error fetching nearby hospitals.");
          return;
        }
        const placesData = await placesResponse.json();
        
        setHospitals(placesData.results);
        
        if (placesData.results.length > 0) {
          setMapCenter({ lat: placesData.results[0].geometry.location.lat, lng: placesData.results[0].geometry.location.lng });
        }
      } else {
        alert("No results found for this pincode.");
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert("An error occurred while fetching data.");
    }
  };
  

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital.name);
  };

  return (
    <div>
      <form onSubmit={handlePincodeSubmit}>
        <input
          type="text"
          placeholder="Enter your pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button type="submit">Find Hospitals</button>
      </form>

      <h3>Selected Hospital: {selectedHospital || "None"}</h3>

      <LoadScript googleMapsApiKey="AIzaSyB739by2F55lwunVBKNPpmFm72MqwpdaYU">
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={mapCenter}
          zoom={10}
        >
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={{ lat: hospital.geometry.location.lat, lng: hospital.geometry.location.lng }}
              onClick={() => handleMarkerClick(hospital)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default BookAppointment;
