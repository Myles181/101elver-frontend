import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiMaximize2, FiMapPin, FiHeart } from "react-icons/fi";
import { MdCompareArrows } from "react-icons/md";
import { useFavorites } from "../hooks/useFavorites";

const PropertyCard = ({ id, image, title, price, location, beds, area, type, onAddToCompare }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showCompareAdded, setShowCompareAdded] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(id);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (onAddToCompare) {
      onAddToCompare({ id, image, title, price, location, beds, area, type, baths: "2" });
      setShowCompareAdded(true);
      setTimeout(() => setShowCompareAdded(false), 2000);
    }
  };

  return (
    <Link to={`/property/${id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {type}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-full backdrop-blur-sm transition ${
                isFavorite(id)
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
              }`}
              title={isFavorite(id) ? "Remove from favorites" : "Add to favorites"}
            >
              <FiHeart size={18} className={isFavorite(id) ? "fill-current" : ""} />
            </button>
            
            {onAddToCompare && (
              <button
                onClick={handleCompare}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-blue-600 hover:text-white transition"
                title="Add to compare"
              >
                <MdCompareArrows size={18} />
              </button>
            )}
          </div>

          {showCompareAdded && (
            <div className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-fadeIn">
              Added to compare
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-1">
            {title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <FiMapPin size={16} className="mr-2" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center justify-between text-gray-600 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FiHome size={16} />
              <span>{beds} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <FiMaximize2 size={16} />
              <span>{area} m²</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-2xl font-bold text-blue-600">{price}</span>
            <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
