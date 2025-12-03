import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ variant = "default" }) => {
  // variant can be "default" or "hero" for different styles
  
  if (variant === "hero") {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Types</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>House</option>
                <option>Land</option>
                <option>Commercial</option>
              </select>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>For Sale</option>
                <option>For Rent</option>
                <option>Holiday Rentals</option>
              </select>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Locations</option>
                <option>Lefkosa (Nicosia)</option>
                <option>Girne (Kyrenia)</option>
                <option>Magusa (Famagusta)</option>
                <option>Iskele</option>
                <option>Guzelyurt</option>
              </select>
            </div>
            
            <div className="md:col-span-1 flex items-end">
              <button className="w-full bg-blue-600 text-white font-semibold rounded-lg p-3 hover:bg-blue-700 transition flex items-center justify-center gap-2">
                <FiSearch size={20} />
                Search
              </button>
            </div>
          </div>
          
          {/* Advanced search link */}
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Advanced Search →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default compact search bar
  return (
    <div className="w-full bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        <input
          type="text"
          placeholder="Keyword (e.g. Apartment)"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Locations</option>
          <option>Lefkosa</option>
          <option>Girne</option>
          <option>Magusa</option>
        </select>
        <select className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Property Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
        </select>
        <button className="bg-blue-600 text-white font-semibold rounded-lg p-3 hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <FiSearch size={18} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
