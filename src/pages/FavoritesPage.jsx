import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { useFavorites } from "../hooks/useFavorites";
import { FiHeart } from "react-icons/fi";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  // Mock properties - replace with actual data fetch
  const allProperties = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
      title: "Luxury Villa with Sea View",
      price: "£450,000",
      location: "Girne (Kyrenia)",
      beds: "4",
      area: "280",
      type: "For Sale"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      title: "Modern City Apartment",
      price: "£185,000",
      location: "Lefkosa (Nicosia)",
      beds: "2",
      area: "120",
      type: "For Sale"
    }
  ];

  const favoriteProperties = allProperties.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
              <FiHeart size={40} />
            </div>
            <h1 className="text-5xl font-bold mb-4">My Favorites</h1>
            <p className="text-xl text-blue-100">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-12">
          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {favoriteProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FiHeart size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-600 mb-6">
                Start exploring properties and save your favorites for quick access
              </p>
              <Link
                to="/search"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Browse Properties
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
