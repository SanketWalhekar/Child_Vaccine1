// src/components/GoogleMap.js
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMapComponent = ({ addresses }) => {
  const mapRef = useRef();
  const [selected, setSelected] = useState(null);
  const [locations, setLocations] = useState([]);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback((map) => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    const geocodeAddress = async (address) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=YOUR_API_KEY`
      );
      const data = await response.json();
      if (data.results[0]) {
        return {
          coordinates: data.results[0].geometry.location,
          address,
        };
      }
      return null;
    };

    const fetchLocations = async () => {
      const results = await Promise.all(
        addresses.map((addr) =>
          geocodeAddress(addr.address).then((res) => ({
            ...res,
            details: addr.details,
          }))
        )
      );
      setLocations(results.filter((location) => location !== null));
    };

    fetchLocations();
  }, [addresses]);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={location.coordinates}
            onClick={() => setSelected(location)}
          />
        ))}
        {selected && (
          <InfoWindow
            position={selected.coordinates}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{selected.address}</h2>
              <p>{selected.details}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
