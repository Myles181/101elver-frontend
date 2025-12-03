import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiHome, FiMaximize2 } from "react-icons/fi";
import { propertyAPI } from "../services";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await propertyAPI.getAllProperties({
        limit: 6,
        sortBy: 'views',
        order: 'desc'
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Placeholder data for coming soon properties
  const placeholderProperties = [
    {
      id: 'placeholder-1',
      title: 'Luxury Villa',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      location: 'Nigeria'
    },
    {
      id: 'placeholder-2',
      title: 'Modern Apartment',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      location: 'Nigeria'
    },
    {
      id: 'placeholder-3',
      title: 'Penthouse Suite',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      location: 'Nigeria'
    }
  ];

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-gray-600">Discover our handpicked selection of premium properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Real properties */}
          {properties.map((property) => (
            <Link
              key={property._id}
              to={`/property/${property._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative">
                <img
                  src={property.images[0] || "/placeholder-property.jpg"}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {property.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <FiMapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.locationDisplay || property.location}</span>
                </div>

                <p className="text-2xl font-bold text-blue-600 mb-3">
                  {formatPrice(property.price)}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  {property.beds > 0 && (
                    <div className="flex items-center">
                      <FiHome className="mr-1" />
                      <span>{property.beds} Beds</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FiMaximize2 className="mr-1" />
                    <span>{property.area} m²</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Placeholder properties if less than 3 */}
          {properties.length < 3 && placeholderProperties.slice(0, 3 - properties.length).map((placeholder) => (
            <Link
              key={placeholder.id}
              to="/properties"
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative">
                <img
                  src={placeholder.image}
                  alt={placeholder.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Coming Soon
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                  {placeholder.title}
                </h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <FiMapPin size={16} className="mr-1" />
                  <span className="text-sm">{placeholder.location}</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  New premium listing arriving soon
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>More details coming</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;