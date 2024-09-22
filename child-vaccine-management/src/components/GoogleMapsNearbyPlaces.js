import React, { useEffect, useState } from 'react';
import './GoogleMapsNearbyPlaces.css';

// Load the Google Maps script
const loadScript = (url) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
};

// Main Component
const GoogleMapsNearbyPlaces = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userLocationMarker, setUserLocationMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [placeDetails, setPlaceDetails] = useState({
    name: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyB739by2F55lwunVBKNPpmFm72MqwpdaYU&libraries=places&callback=initMap');
    window.initMap = initMap; // Ensure initMap is attached to the window object
  }, []);

  // Function to initialize the map
  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15
    });

    const circleInstance = new window.google.maps.Circle({
      map: mapInstance,
      radius: 0,
      fillOpacity: 0.2,
      strokeColor: '#00FF00',
      strokeOpacity: 1,
      strokeWeight: 1
    });

    setMap(mapInstance);
    setCircle(circleInstance);

    // Try to get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        mapInstance.setCenter(userLocation);
        circleInstance.setCenter(userLocation);
        circleInstance.setRadius(1000);

        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          map: mapInstance,
          title: 'Your Location'
        });

        setUserLocationMarker(userMarker);

        const infoWindowInstance = new window.google.maps.InfoWindow();
        setInfoWindow(infoWindowInstance);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const searchNearby = () => {
    const selectedRange = parseInt(document.getElementById('search-range').value) || 1000;
    const userLocation = map.getCenter();
    const request = {
      location: userLocation,
      radius: selectedRange,
      keyword: 'Hospital'
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        clearMarkers();
        const newMarkers = [];

        results.forEach((place) => {
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(userLocation, place.geometry.location);

          if (distance <= selectedRange) {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name
            });

            marker.addListener('click', () => displayPlaceDetails(place, marker));
            newMarkers.push(marker);
          }
        });

        setMarkers(newMarkers);
        circle.setCenter(userLocation);
        circle.setRadius(selectedRange);
      } else {
        alert('No Hospital locations found nearby.');
      }
    });
  };

  const zoomToUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(userLocation);
        map.setZoom(17);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const displayPlaceDetails = (place, marker) => {
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails({ placeId: place.place_id }, (placeDetails, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceDetails({
          name: placeDetails.name,
          address: placeDetails.formatted_address,
          phone: placeDetails.formatted_phone_number || 'N/A'
        });

        infoWindow.setContent(placeDetails.name);
        infoWindow.open(map, marker);
      } else {
        alert('Place details request failed due to ${status}');
      }
    });
  };

  return (
    <div>
      <h1>Google Maps Nearby Places</h1>
      <div id="map" style={{ height: '400px', width: '100%', border: '2px solid #ccc', borderRadius: '5px' }}></div>
      <button onClick={searchNearby}>Find Nearby Hospitals</button>
      <select id="search-range">
        <option value="2000">2km</option>
        <option value="5000">5km</option>
        <option value="10000">10km</option>
        <option value="20000">20km</option>
        <option value="50000">50km</option>
      </select>
      <button onClick={zoomToUserLocation}>Zoom to My Location</button>

      <div className="internal-display-box">
        <h2>Location Information</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{placeDetails.name}</td>
              <td>{placeDetails.address}</td>
              <td>{placeDetails.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoogleMapsNearbyPlaces;
