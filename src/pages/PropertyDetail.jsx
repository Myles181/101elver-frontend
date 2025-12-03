import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiMapPin, FiMaximize2, FiCalendar, FiHome, FiHeart, FiShare2, FiPhone, FiMail, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { propertyAPI, favoriteAPI, inquiryAPI } from "../services";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import ShareModal from "../components/ShareModal";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  
  // Inquiry form state
  const [inquiryData, setInquiryData] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    message: "",
    inquiryType: "general",
    preferredDate: "",
    preferredTime: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPropertyDetails();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && property) {
      checkIfFavorite();
    }
  }, [isAuthenticated, property]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    try {
      const response = await propertyAPI.getPropertyById(id);
      setProperty(response.data);
      
      // Fetch similar properties
      const similarResponse = await propertyAPI.getSimilarProperties(id);
      setSimilarProperties(similarResponse.data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Property not found');
      navigate('/properties');
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const response = await favoriteAPI.checkFavorite(id);
      setIsFavorite(response.isFavorite);
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to save favorites');
      return;
    }

    try {
      const response = await favoriteAPI.toggleFavorite(id);
      setIsFavorite(response.isFavorite);
      toast.success(response.isFavorite ? 'Added to favorites' : 'Removed from favorites');
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorite');
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    
    if (!inquiryData.name || !inquiryData.email || !inquiryData.phone || !inquiryData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await inquiryAPI.sendInquiry({
        propertyId: id,
        ...inquiryData
      });
      toast.success('Inquiry sent successfully! The agent will contact you soon.');
      setShowInquiryForm(false);
      setInquiryData({
        name: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        message: "",
        inquiryType: "general",
        preferredDate: "",
        preferredTime: ""
      });
    } catch (error) {
      console.error('Error sending inquiry:', error);
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <ImageGallery images={property.images} />

        {/* Property Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Price */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {property.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mt-2">
                    <FiMapPin className="mr-1" />
                    <span>{property.locationDisplay || property.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleToggleFavorite}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  >
                    <FiHeart
                      className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}
                      size={24}
                    />
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  >
                    <FiShare2 size={24} />
                  </button>
                </div>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                {formatPrice(property.price)}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.beds > 0 && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiHome size={24} />
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-semibold">{property.beds}</p>
                    </div>
                  </div>
                )}
                {property.baths > 0 && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiHome size={24} />
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-semibold">{property.baths}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <FiMaximize2 size={24} />
                  <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold">{property.area} m²</p>
                  </div>
                </div>
                {property.yearBuilt && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <FiCalendar size={24} />
                    <div>
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-semibold">{property.yearBuilt}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500">Property Type</p>
                  <p className="font-semibold">{property.propertyType}</p>
                </div>
                <div>
                  <p className="text-gray-500">Furnished</p>
                  <p className="font-semibold">{property.furnished}</p>
                </div>
                {property.yearBuilt && (
                  <div>
                    <p className="text-gray-500">Year Built</p>
                    <p className="font-semibold">{property.yearBuilt}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-semibold capitalize">{property.status}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            {(property.features?.outdoor?.length > 0 || property.features?.indoor?.length > 0 || property.features?.location?.length > 0) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
                
                {property.features.outdoor?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Outdoor Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {property.features.outdoor.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.features.indoor?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Indoor Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {property.features.indoor.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.features.location?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Location Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {property.features.location.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video Tour */}
            {property.video && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Video Tour</h2>
                <div className="aspect-video">
                  <iframe
                    src={property.video.replace('watch?v=', 'embed/')}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Contact Agent */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
              
              {/* Agent Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                {property.user?.profilePicture ? (
                  <img
                    src={property.user.profilePicture}
                    alt={property.agentName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {property.agentName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{property.agentName}</p>
                  {property.user?.companyName && (
                    <p className="text-sm text-gray-600">{property.user.companyName}</p>
                  )}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                {/* Call Agent */}
                <a
                  href={`tel:${property.agentPhone}`}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  <FiPhone />
                  <span>Call Agent</span>
                </a>

                {/* WhatsApp Agent */}
                {property.agentWhatsapp && (
                  <a
                    href={`https://wa.me/${property.agentWhatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    <FaWhatsapp size={20} />
                    <span>WhatsApp</span>
                  </a>
                )}

                {/* Email Agent */}
                <a
                  href={`mailto:${property.agentEmail}`}
                  className="flex items-center justify-center gap-2 w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  <FiMail />
                  <span>Email Agent</span>
                </a>

                {/* Inquiry Form Button */}
                <button
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  <FiMessageSquare />
                  <span>Send Inquiry</span>
                </button>
              </div>


              {/* Inquiry Form */}
              {showInquiryForm && (
                <form onSubmit={handleInquirySubmit} className="mt-6 pt-6 border-t space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={inquiryData.inquiryType}
                      onChange={(e) => setInquiryData({ ...inquiryData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="tour-request">Schedule Viewing</option>
                      <option value="price-inquiry">Price Negotiation</option>
                    </select>
                  </div>

                  {inquiryData.inquiryType === 'tour-request' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={inquiryData.preferredDate}
                          onChange={(e) => setInquiryData({ ...inquiryData, preferredDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Time
                        </label>
                        <input
                          type="time"
                          value={inquiryData.preferredTime}
                          onChange={(e) => setInquiryData({ ...inquiryData, preferredTime: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      value={inquiryData.message}
                      onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="I'm interested in this property..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <Link
                  key={prop._id}
                  to={`/property/${prop._id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="relative">
                    <img
                      src={prop.images[0] || "/placeholder-property.jpg"}
                      alt={prop.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {prop.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {prop.title}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-2">
                      <FiMapPin size={16} className="mr-1" />
                      <span className="text-sm">{prop.locationDisplay || prop.location}</span>
                    </div>

                    <p className="text-2xl font-bold text-blue-600">
                      {formatPrice(prop.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      {showShareModal && (
        <ShareModal
          url={window.location.href}
          title={property.title}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetail;
