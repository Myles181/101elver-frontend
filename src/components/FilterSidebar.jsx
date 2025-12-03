import React, { useState } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";

const FilterSidebar = ({ onFilterChange, onClose, isMobile = false }) => {
  const [filters, setFilters] = useState({
    category: "all",
    propertyType: [],
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    areaMin: "",
    areaMax: "",
    furnishing: "all",
    features: []
  });

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    propertyType: true,
    price: true,
    rooms: true,
    area: true,
    furnishing: true,
    features: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleArrayFilterToggle = (key, value) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: "all",
      propertyType: [],
      priceMin: "",
      priceMax: "",
      bedrooms: "",
      bathrooms: "",
      areaMin: "",
      areaMax: "",
      furnishing: "all",
      features: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
      >
        {title}
        {expandedSections[sectionKey] ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  return (
    <div className={`bg-white ${isMobile ? 'fixed inset-0 z-50 overflow-y-auto' : 'rounded-xl shadow-md'} p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear All
          </button>
          {isMobile && (
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <FiX size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <FilterSection title="Category" sectionKey="category">
        <div className="space-y-2">
          {["all", "sale", "rent", "holiday"].map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => handleFilterChange("category", cat)}
                className="mr-2 w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700 capitalize">
                {cat === "all" ? "All Properties" : cat === "sale" ? "For Sale" : cat === "rent" ? "For Rent" : "Holiday Rentals"}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Property Type */}
      <FilterSection title="Property Type" sectionKey="propertyType">
        <div className="space-y-2">
          {["Apartment", "Villa", "House", "Penthouse", "Land", "Commercial"].map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.propertyType.includes(type)}
                onChange={() => handleArrayFilterToggle("propertyType", type)}
                className="mr-2 w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min Price (£)</label>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange("priceMin", e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max Price (£)</label>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange("priceMax", e.target.value)}
              placeholder="1,000,000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </FilterSection>

      {/* Bedrooms & Bathrooms */}
      <FilterSection title="Rooms" sectionKey="rooms">
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Bedrooms</label>
            <div className="flex gap-2 flex-wrap">
              {["Any", "1", "2", "3", "4", "5+"].map((bed) => (
                <button
                  key={bed}
                  onClick={() => handleFilterChange("bedrooms", bed)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    filters.bedrooms === bed
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                  }`}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Bathrooms</label>
            <div className="flex gap-2 flex-wrap">
              {["Any", "1", "2", "3", "4+"].map((bath) => (
                <button
                  key={bath}
                  onClick={() => handleFilterChange("bathrooms", bath)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    filters.bathrooms === bath
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                  }`}
                >
                  {bath}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Area */}
      <FilterSection title="Area (m²)" sectionKey="area">
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min Area</label>
            <input
              type="number"
              value={filters.areaMin}
              onChange={(e) => handleFilterChange("areaMin", e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max Area</label>
            <input
              type="number"
              value={filters.areaMax}
              onChange={(e) => handleFilterChange("areaMax", e.target.value)}
              placeholder="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </FilterSection>

      {/* Furnishing */}
      <FilterSection title="Furnishing" sectionKey="furnishing">
        <div className="space-y-2">
          {["all", "furnished", "unfurnished", "semi-furnished"].map((furn) => (
            <label key={furn} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="furnishing"
                checked={filters.furnishing === furn}
                onChange={() => handleFilterChange("furnishing", furn)}
                className="mr-2 w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700 capitalize">
                {furn === "all" ? "All" : furn.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Features */}
      <FilterSection title="Features" sectionKey="features">
        <div className="space-y-2">
          {["Pool", "Garden", "Parking", "Sea View", "Gym", "Security"].map((feature) => (
            <label key={feature} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.features.includes(feature)}
                onChange={() => handleArrayFilterToggle("features", feature)}
                className="mr-2 w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Apply Button (Mobile) */}
      {isMobile && (
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold mt-6"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
