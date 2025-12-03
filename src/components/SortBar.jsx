import React from "react";
import { FiGrid, FiList, FiSliders } from "react-icons/fi";

const SortBar = ({ 
  totalResults, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onFilterToggle 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Results Count */}
        <div className="text-gray-700">
          <span className="font-semibold text-gray-900">{totalResults}</span> properties found
        </div>

        {/* Right Side - Sort and View Options */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={onFilterToggle}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <FiSliders size={18} />
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 flex-1 md:flex-initial">
            <label className="text-gray-600 text-sm whitespace-nowrap">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-asc">Area: Small to Large</option>
              <option value="area-desc">Area: Large to Small</option>
              <option value="beds-asc">Bedrooms: Low to High</option>
              <option value="beds-desc">Bedrooms: High to Low</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded transition ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Grid View"
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded transition ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="List View"
            >
              <FiList size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
