import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiMaximize2, FiMapPin, FiHeart } from "react-icons/fi";

const PropertyCardList = ({ id = "1", image, title, price, location, beds, area, type, featured, description }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <Link to={`/property/${id}`} className="md:w-80 flex-shrink-0">
          <div className="relative h-64 md:h-full">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {featured && (
                <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  FEATURED
                </span>
              )}
              {type && (
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {type}
                </span>
              )}
            </div>
            
            {/* Favorite button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                console.log("Added to favorites");
              }}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition"
            >
              <FiHeart className="text-gray-600 hover:text-red-500" size={20} />
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Location */}
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FiMapPin size={16} className="mr-1" />
              {location}
            </div>
            
            {/* Title */}
            <Link to={`/property/${id}`}>
              <h3 className="font-bold text-2xl text-gray-900 mb-3 group-hover:text-blue-600 transition">
                {title}
              </h3>
            </Link>

            {/* Description */}
            {description && (
              <p className="text-gray-600 mb-4 line-clamp-2">
                {description}
              </p>
            )}
            
            {/* Features */}
            <div className="flex items-center gap-6 text-gray-600 mb-4">
              {beds && (
                <div className="flex items-center gap-2">
                  <FiHome size={20} />
                  <span>{beds} Beds</span>
                </div>
              )}
              {area && (
                <div className="flex items-center gap-2">
                  <FiMaximize2 size={20} />
                  <span>{area} m²</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Price and action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-3xl font-bold text-blue-600">{price}</p>
            </div>
            <Link 
              to={`/property/${id}`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardList;
