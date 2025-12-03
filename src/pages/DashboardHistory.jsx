import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import PropertyCard from "../components/PropertyCard";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { FiEye, FiTrash2 } from "react-icons/fi";

const DashboardHistory = () => {
  const { recentlyViewed } = useRecentlyViewed();

  const clearHistory = () => {
    localStorage.removeItem("recentlyViewed");
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Viewing History</h1>
          <p className="text-gray-600">
            {recentlyViewed.length} {recentlyViewed.length === 1 ? 'property' : 'properties'} viewed
          </p>
        </div>
        
        {recentlyViewed.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
          >
            <FiTrash2 size={20} />
            Clear History
          </button>
        )}
      </div>

      {recentlyViewed.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentlyViewed.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <FiEye size={40} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No viewing history</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Properties you view will appear here for easy access later
          </p>
          <Link
            to="/search"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardHistory;
