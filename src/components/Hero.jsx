import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    search: '',
    location: '',
    category: 'For Sale'
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images array
  const backgroundImages = [
    'https://res.cloudinary.com/dkvj3fbg9/image/upload/v1764631331/istockphoto-537241730-612x612_f7zqir.jpg',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80', // Modern house
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80', // Luxury interior
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80'  // Modern living room
  ];

  // Auto-change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchData.search) params.set('search', searchData.search);
    if (searchData.location) params.set('location', searchData.location);
    if (searchData.category) params.set('category', searchData.category);
    
    navigate(`/search?${params.toString()}`);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative text-white overflow-hidden">
      {/* Background Images with Fade Animation */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition"
        aria-label="Previous image"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition"
        aria-label="Next image"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Find Your Dream Property in Nigeria
          </h1>
          <p className="text-xl text-gray-100 animate-fade-in-delay">
            Discover the perfect home, land, or commercial space
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-6 animate-slide-up">
            {/* Category Tabs */}
            <div className="flex gap-2 mb-6">
              {['For Sale', 'For Rent', 'Holiday Rental'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSearchData({ ...searchData, category: cat })}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    searchData.category === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by property name, type..."
                  value={searchData.search}
                  onChange={(e) => setSearchData({ ...searchData, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Location"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Search Properties
            </button>
          </form>

          {/* Quick Links */}
          <div className="flex justify-center gap-4 mt-6 text-sm">
            <button
              onClick={() => navigate('/search?category=For+Sale')}
              className="text-white hover:underline"
            >
              Buy
            </button>
            <span className="text-white">•</span>
            <button
              onClick={() => navigate('/search?category=For+Rent')}
              className="text-white hover:underline"
            >
              Rent
            </button>
            <span className="text-white">•</span>
            <button
              onClick={() => navigate('/search?category=Holiday+Rental')}
              className="text-white hover:underline"
            >
              Holiday Rentals
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.2s backwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.4s backwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;