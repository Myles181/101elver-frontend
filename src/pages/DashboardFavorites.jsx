import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiMapPin, FiHome, FiMaximize2, FiX } from "react-icons/fi";
import { favoriteAPI, propertyAPI } from "../services";
import toast from "react-hot-toast";

const DashboardFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await favoriteAPI.getFavorites({ limit: 100 });
      setFavorites(response.data);
      
      if (response.data.length > 0) {
        fetchSimilarProperties(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProperties = async (propertyId) => {
    setLoadingSimilar(true);
    try {
      const response = await propertyAPI.getSimilarProperties(propertyId);
      setSimilarProperties(response.data);
    } catch (error) {
      console.error('Error fetching similar properties:', error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await favoriteAPI.toggleFavorite(propertyId);
      setFavorites(favorites.filter(prop => prop._id !== propertyId));
      toast.success('Removed from favorites');
      
      if (favorites.length > 1 && favorites[0]._id === propertyId) {
        fetchSimilarProperties(favorites[1]._id);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Favorites ❤️</h1>
        <p className="text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>

      {/* Favorites Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {favorites.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <Link to={`/property/${property._id}`} className="block relative">
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
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFavorite(property._id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-red-50 transition"
                  >
                    <FiX className="text-red-500" size={20} />
                  </button>
                </Link>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin size={14} className="mr-1" />
                    <span className="text-sm">{property.locationDisplay || property.location}</span>
                  </div>

                  <p className="text-xl font-bold text-blue-600 mb-3">
                    {formatPrice(property.price)}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                    {property.beds > 0 && (
                      <div className="flex items-center">
                        <FiHome className="mr-1" size={14} />
                        <span>{property.beds} Beds</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <FiMaximize2 className="mr-1" size={14} />
                      <span>{property.area} m²</span>
                    </div>
                  </div>

                  <Link
                    to={`/property/${property._id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  You Might Also Like
                </h2>
                <Link
                  to="/properties"
                  className="text-blue-600 hover:underline"
                >
                  View All Properties
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((property) => (
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
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {property.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {property.title}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-2">
                        <FiMapPin size={14} className="mr-1" />
                        <span className="text-sm">{property.locationDisplay || property.location}</span>
                      </div>

                      <p className="text-xl font-bold text-blue-600">
                        {formatPrice(property.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FiHeart size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">
            Start exploring properties and save your favorites for quick access
          </p>
          <Link
            to="/properties"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardFavorites;
