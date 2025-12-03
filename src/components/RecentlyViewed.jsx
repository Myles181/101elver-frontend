import React from "react";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import PropertyCard from "./PropertyCard";

const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {recentlyViewed.slice(0, 4).map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;
