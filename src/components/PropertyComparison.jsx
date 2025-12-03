import React from "react";
import { Link } from "react-router-dom";
import { FiX, FiHome, FiMaximize2, FiMapPin } from "react-icons/fi";

const PropertyComparison = ({ properties, onRemove, onClose }) => {
  if (properties.length === 0) return null;

  const features = [
    { key: "price", label: "Price", icon: "£" },
    { key: "location", label: "Location", icon: <FiMapPin size={16} /> },
    { key: "beds", label: "Bedrooms", icon: <FiHome size={16} /> },
    { key: "baths", label: "Bathrooms", icon: <FiHome size={16} /> },
    { key: "area", label: "Area", icon: <FiMaximize2 size={16} />, suffix: " m²" },
    { key: "type", label: "Property Type", icon: <FiHome size={16} /> }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-2xl font-bold text-gray-900">Compare Properties</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="relative">
                <button
                  onClick={() => onRemove(property.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition z-10"
                >
                  <FiX size={16} />
                </button>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {property.title}
                    </h4>
                    
                    <div className="space-y-3">
                      {features.map((feature) => (
                        <div key={feature.key} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            {feature.icon}
                            <span>{feature.label}</span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {property[feature.key]}{feature.suffix || ""}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/property/${property.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition font-semibold mt-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {[...Array(3 - properties.length)].map((_, idx) => (
              <div key={`empty-${idx}`} className="border-2 border-dashed border-gray-300 rounded-xl h-full min-h-[400px] flex items-center justify-center">
                <p className="text-gray-400">Add property to compare</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyComparison;
