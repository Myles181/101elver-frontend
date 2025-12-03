import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Component to handle map clicks and display marker
function LocationMarker({ position, setPosition }) {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e) => {
      setPosition(e.latlng);
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, setPosition]);

  return position === null ? null : <Marker position={position} />;
}

const LocationPicker = ({ coordinates, onLocationChange, onAddressChange }) => {
  // Default to Lagos, Nigeria center
  const defaultPosition = { lat: 6.5244, lng: 3.3792 };
  
  const [position, setPosition] = useState(
    coordinates.latitude && coordinates.longitude
      ? { lat: parseFloat(coordinates.latitude), lng: parseFloat(coordinates.longitude) }
      : defaultPosition
  );

  const [mapCenter, setMapCenter] = useState(position);
  const [mapZoom, setMapZoom] = useState(13);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (position) {
      onLocationChange(position.lat, position.lng);
      reverseGeocode(position.lat, position.lng);
    }
  }, [position]);

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      console.log('Reverse geocode result:', data);
      
      if (data.address) {
        const addr = data.address;
        
        // Build address parts for display
        const addressParts = [
          addr.suburb || addr.neighbourhood || addr.hamlet,
          addr.city || addr.town || addr.village,
          addr.state,
          addr.country
        ].filter(Boolean);
        
        setAddress(addressParts.join(', '));

        // Auto-fill form fields if callback provided
        if (onAddressChange) {
          const addressData = {
            street: addr.road || '',
            neighborhood: addr.suburb || addr.neighbourhood || addr.hamlet || '',
            city: addr.city || addr.town || addr.village || '',
            state: addr.state || '',
            postalCode: addr.postcode || ''
          };
          
          console.log('Auto-filling address:', addressData);
          onAddressChange(addressData);
        }
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  // Search for location by name
  const searchLocation = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a location to search');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}, Nigeria&limit=5&addressdetails=1`
      );
      const data = await response.json();
      
      console.log('Search results:', data);
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };
        
        console.log('Moving to:', display_name, newPosition);
        
        // Update position and center map
        setPosition(newPosition);
        setMapCenter(newPosition);
        setMapZoom(15); // Zoom in when searching
      } else {
        alert(`No results found for "${searchQuery}". Try a more specific search (e.g., "Lekki, Lagos")`);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Error searching for location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location
  const handleCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          console.log('Current location:', newPosition);
          setPosition(newPosition);
          setMapCenter(newPosition);
          setMapZoom(16);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Could not get your current location. Make sure location permissions are enabled.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              searchLocation();
            }
          }}
          placeholder="Search for a location in Nigeria (e.g., Victoria Island, Lagos)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={searchLocation}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 whitespace-nowrap"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button
          type="button"
          onClick={handleCurrentLocation}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 whitespace-nowrap"
          title="Use my current location"
        >
          📍 My Location
        </button>
      </div>

      {/* Current Location Display */}
      {address && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">📍 Selected Location:</span> {address}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Coordinates: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </p>
          <p className="text-xs text-green-600 mt-1">
            ✓ Address fields auto-filled below
          </p>
        </div>
      )}

      {/* Map */}
      <div className="relative rounded-lg overflow-hidden border border-gray-300" style={{ height: '400px' }}>
        <MapContainer
          center={defaultPosition}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </div>

      <div className="flex items-start gap-2">
        <span className="text-xl">💡</span>
        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-1">How to use:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Search for a location or use "📍 My Location"</li>
            <li><strong>Click on the map</strong> to pinpoint the exact property location</li>
            <li>Address fields below will auto-fill when you click the map</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
