import React from "react";
import { FiMapPin } from "react-icons/fi";

const PropertyMap = ({ location, coordinates }) => {
  // For now, we'll use a placeholder. You can integrate Google Maps API later
  const mapUrl = coordinates 
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${coordinates.lat},${coordinates.lng}`
    : `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location)}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-blue-600" size={20} />
          <h3 className="font-bold text-gray-900">{location}</h3>
        </div>
      </div>
      
      {/* Placeholder Map */}
      <div className="h-80 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
        <div className="text-center">
          <FiMapPin className="text-blue-600 mx-auto mb-2" size={48} />
          <p className="text-gray-700 font-semibold">{location}</p>
          <p className="text-sm text-gray-600 mt-2">Google Maps integration coming soon</p>
        </div>
        
        {/* For actual implementation, use iframe */}
        {/* <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}
      </div>

      <div className="p-4 bg-gray-50 flex justify-between items-center">
       <a> 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
        {/* > */}
          View on Google Maps →
        </a>
        <a>
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
        {/* > */}
          Get Directions →
        </a>
      </div>
    </div>
  );
};

export default PropertyMap;
