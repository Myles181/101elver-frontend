import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import ContactForm from "../components/ContactForm";
import PropertyCard from "../components/PropertyCard";
import AuthModal from "../components/AuthModal";
import ShareModal from "../components/ShareModal";
import TourRequestModal from "../components/TourRequestModal";
import PropertyMap from "../components/PropertyMap";
import PrintPropertyButton from "../components/PrintPropertyButton";
import { ToastContainer, useToast } from "../components/Toast";
import { useFavorites } from "../hooks/useFavorites";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { 
  FiHome, FiMaximize2, FiMapPin, FiCheckCircle, 
  FiArrowLeft, FiShare2, FiHeart, FiCalendar 
} from "react-icons/fi";

const PropertyDetails = () => {
  const { id } = useParams();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const { toasts, addToast, removeToast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const property = {
    id: id,
    title: "Luxury Villa with Sea View",
    price: "£450,000",
    location: "Girne (Kyrenia), North Cyprus",
    type: "Villa",
    category: "For Sale",
    beds: 4,
    baths: 3,
    area: 280,
    description: `This stunning luxury villa offers breathtaking sea views and modern amenities. Located in the prestigious area of Girne, this property features spacious living areas, high-quality finishes, and a beautiful garden with a private pool.

The villa is perfect for those seeking a peaceful lifestyle while being close to all amenities. The property comes with a large terrace, perfect for entertaining guests while enjoying the Mediterranean sunset.`,
    features: {
      outdoor: ["Private Pool", "Garden", "Terrace", "Barbecue Area", "Parking", "Security System"],
      indoor: ["Air Conditioning", "Central Heating", "Fitted Kitchen", "Built-in Wardrobes", "Fireplace", "Laundry Room"],
      location: ["Sea View", "Mountain View", "Close to Beach", "Quiet Area"]
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200"
    ],
    agent: {
      name: "Cyprus Dream Homes",
      phone: "+90 533 123 4567",
      email: "agent@cyprusdreamhomes.com",
      whatsappTemplate: `Hi! 👋 I'm interested in your *Luxury Villa with Sea View* property in Girne (Kyrenia), North Cyprus. Price: £450,000. Can we schedule a viewing?`,
      responseTime: "under 1 hour"
    },
    propertyId: "#290203",
    yearBuilt: 2023,
    furnished: "Unfurnished"
  };

  const similarProperties = [
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
      title: "Modern City Apartment",
      price: "£185,000",
      location: "Lefkosa (Nicosia)",
      beds: "2",
      baths: "2",
      area: "120",
      type: "For Sale"
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=800",
      title: "Spacious Family Home",
      price: "£320,000",
      location: "Guzelyurt",
      beds: "5",
      baths: "3",
      area: "250",
      type: "For Sale"
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
      title: "Penthouse with Terrace",
      price: "£550,000",
      location: "Girne (Kyrenia)",
      beds: "3",
      baths: "2",
      area: "200",
      type: "For Sale"
    }
  ];

  // Add to recently viewed on mount
  useEffect(() => {
    addToRecentlyViewed({
      id: property.id,
      title: property.title,
      price: property.price,
      location: property.location,
      image: property.images[0],
      beds: property.beds,
      area: property.area,
      type: property.type
    });
  }, [id]);

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    addToast("Successfully signed in!", "success");
  };

  const handleFormSuccess = (message) => {
    addToast(message, "success");
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleFavoriteToggle = () => {
    const isNowFavorite = toggleFavorite(id);
    addToast(
      isNowFavorite ? "Added to favorites!" : "Removed from favorites",
      isNowFavorite ? "success" : "info"
    );
  };

  const handleTourRequest = () => {
    setShowTourModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        property={property}
      />

      <TourRequestModal
        isOpen={showTourModal}
        onClose={() => setShowTourModal(false)}
        property={property}
        onSuccess={handleFormSuccess}
        onAuthRequired={handleAuthRequired}
      />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
          >
            <FiArrowLeft size={20} />
            Back to listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ImageGallery images={property.images} />

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                        {property.category}
                      </span>
                      <span className="text-gray-500 text-sm">{property.propertyId}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600">
                      <FiMapPin size={18} className="mr-2" />
                      {property.location}
                    </div>
                  </div>
                </div>

                <p className="text-4xl font-bold text-blue-600 mb-6">{property.price}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={handleTourRequest}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    <FiCalendar size={20} />
                    Schedule Viewing
                  </button>
                  
                  <button 
                    onClick={handleFavoriteToggle}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition font-semibold ${
                      isFavorite(id)
                        ? "bg-red-50 text-red-600 border-2 border-red-600"
                        : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <FiHeart size={20} className={isFavorite(id) ? "fill-current" : ""} />
                    {isFavorite(id) ? "Saved" : "Save"}
                  </button>

                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 transition font-semibold"
                  >
                    <FiShare2 size={20} />
                    Share
                  </button>

                  <PrintPropertyButton property={property} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <FiHome size={24} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-semibold text-gray-900">{property.beds}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiHome size={24} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-semibold text-gray-900">{property.baths}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMaximize2 size={24} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-semibold text-gray-900">{property.area} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiHome size={24} className="text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-semibold text-gray-900">{property.type}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Features</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Outdoor Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.features.outdoor.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiCheckCircle className="text-green-500" size={18} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Indoor Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.features.indoor.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiCheckCircle className="text-green-500" size={18} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Location Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.features.location.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FiCheckCircle className="text-green-500" size={18} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <PropertyMap location={property.location} />
            </div>

            <div className="lg:col-span-1">
              <ContactForm 
                propertyTitle={property.title}
                propertyId={property.id}
                propertyPrice={property.price}
                propertyLocation={property.location}
                agentName={property.agent.name}
                agentPhone={property.agent.phone}
                agentEmail={property.agent.email}
                agentWhatsappTemplate={property.agent.whatsappTemplate}
                agentResponseTime={property.agent.responseTime}
                onAuthRequired={handleAuthRequired}
                onSubmitSuccess={handleFormSuccess}
              />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;
