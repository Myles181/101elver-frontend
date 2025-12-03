import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { FiPhone, FiMail, FiMapPin, FiStar, FiAward, FiCheckCircle, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const AgentProfile = () => {
  const { id } = useParams();

  const agent = {
    id: id,
    name: "Sarah Johnson",
    company: "Cyprus Dream Homes",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
    location: "Girne (Kyrenia)",
    phone: "+90 533 123 4567",
    email: "sarah@cyprusdream.com",
    whatsapp: "+905331234567",
    activeListings: 45,
    rating: 4.9,
    reviews: 127,
    yearsExperience: 10,
    propertiesSold: 250,
    specialties: ["Luxury Villas", "Beachfront Properties", "Investment Properties"],
    languages: ["English", "Turkish", "Russian"],
    bio: "Sarah Johnson is a leading real estate agent in North Cyprus with over 10 years of experience. She specializes in luxury properties and has helped hundreds of clients find their dream homes. Known for her professionalism, market knowledge, and dedication to client satisfaction.",
    achievements: [
      "Top Agent 2023",
      "Customer Choice Award",
      "100+ Five Star Reviews",
      "Certified Property Consultant"
    ]
  };

  const agentListings = [
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
      location: "Girne (Kyrenia)",
      beds: "2",
      area: "120",
      type: "For Sale"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
      title: "Penthouse with Terrace",
      price: "£550,000",
      location: "Girne (Kyrenia)",
      beds: "3",
      area: "200",
      type: "For Sale"
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      rating: 5,
      date: "2 weeks ago",
      comment: "Sarah helped us find our dream villa! Professional, knowledgeable, and always available. Highly recommended!"
    },
    {
      name: "Maria Lopez",
      rating: 5,
      date: "1 month ago",
      comment: "Excellent service from start to finish. Sarah made the buying process smooth and stress-free."
    },
    {
      name: "David Chen",
      rating: 5,
      date: "2 months ago",
      comment: "Best agent in Cyprus! Very responsive and helped us get a great deal on our property."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Agent Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Image */}
              <div className="h-80 md:h-auto">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="md:col-span-2 p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{agent.name}</h1>
                    <p className="text-xl text-blue-600 font-semibold mb-3">{agent.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <FiMapPin size={16} />
                        {agent.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiStar className="text-yellow-500 fill-current" size={16} />
                        {agent.rating} ({agent.reviews} reviews)
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{agent.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">{agent.activeListings}</p>
                    <p className="text-sm text-gray-600">Active Listings</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">{agent.yearsExperience}+</p>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">{agent.propertiesSold}+</p>
                    <p className="text-sm text-gray-600">Properties Sold</p>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <a>
                    href={`tel:${agent.phone}`}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    <FiPhone size={18} />
                    Call
                  </a>
                  
                  <a>
                    href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  
                    <FaWhatsapp size={18} />
                    WhatsApp
                  </a>
                  <a>
                    href={`mailto:${agent.email}`}
                    className="flex items-center justify-center gap-2 bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
                  
                    <FiMail size={18} />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Specialties */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Specialties</h3>
              <div className="space-y-2">
                {agent.specialties.map((specialty, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FiCheckCircle className="text-blue-600" size={18} />
                    <span className="text-gray-700">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Languages</h3>
              <div className="space-y-2">
                {agent.languages.map((language, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FiMessageCircle className="text-blue-600" size={18} />
                    <span className="text-gray-700">{language}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-2">
                {agent.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FiAward className="text-yellow-500" size={18} />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Listings */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {agentListings.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link 
                to="/search"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                View All {agent.activeListings} Listings
              </Link>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((review, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FiStar key={i} className="text-yellow-500 fill-current" size={16} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{review.comment}</p>
                  <p className="text-gray-400 text-xs">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentProfile;
