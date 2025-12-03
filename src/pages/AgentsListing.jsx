import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiPhone, FiMail, FiMapPin, FiHome, FiStar } from "react-icons/fi";

const AgentsListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");

  const agents = [
    {
      id: "1",
      name: "Sarah Johnson",
      company: "Cyprus Dream Homes",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
      location: "Girne (Kyrenia)",
      phone: "+90 533 123 4567",
      email: "sarah@cyprusdream.com",
      activeListings: 45,
      rating: 4.9,
      reviews: 127,
      specialties: ["Luxury Villas", "Beachfront Properties"],
      bio: "Specializing in luxury properties with 10+ years of experience in North Cyprus real estate."
    },
    {
      id: "2",
      name: "Michael Chen",
      company: "Elite Properties Cyprus",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=400",
      location: "Lefkosa (Nicosia)",
      phone: "+90 533 234 5678",
      email: "michael@eliteproperties.com",
      activeListings: 32,
      rating: 4.8,
      reviews: 98,
      specialties: ["Commercial", "Investment Properties"],
      bio: "Expert in commercial real estate and investment opportunities across Cyprus."
    },
    {
      id: "3",
      name: "Emma Williams",
      company: "Mediterranean Realty",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
      location: "Girne (Kyrenia)",
      phone: "+90 533 345 6789",
      email: "emma@medrealty.com",
      activeListings: 58,
      rating: 5.0,
      reviews: 143,
      specialties: ["Holiday Homes", "Apartments"],
      bio: "Top-rated agent specializing in holiday rentals and residential properties."
    },
    {
      id: "4",
      name: "David Brown",
      company: "Coastal Properties Ltd",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
      location: "Iskele",
      phone: "+90 533 456 7890",
      email: "david@coastalproperties.com",
      activeListings: 41,
      rating: 4.7,
      reviews: 89,
      specialties: ["New Developments", "Off-Plan"],
      bio: "Specialist in new development projects and off-plan investment opportunities."
    },
    {
      id: "5",
      name: "Lisa Anderson",
      company: "North Cyprus Homes",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=400",
      location: "Magusa (Famagusta)",
      phone: "+90 533 567 8901",
      email: "lisa@ncyhomes.com",
      activeListings: 28,
      rating: 4.9,
      reviews: 76,
      specialties: ["First-Time Buyers", "Student Accommodation"],
      bio: "Helping first-time buyers and students find perfect properties in Famagusta."
    },
    {
      id: "6",
      name: "James Wilson",
      company: "Premium Estates Cyprus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      location: "Girne (Kyrenia)",
      phone: "+90 533 678 9012",
      email: "james@premiumestates.com",
      activeListings: 52,
      rating: 4.8,
      reviews: 112,
      specialties: ["Luxury Estates", "Waterfront Villas"],
      bio: "Luxury property expert with exclusive access to premium listings in Cyprus."
    }
  ];

  const locations = ["all", "Girne (Kyrenia)", "Lefkosa (Nicosia)", "Iskele", "Magusa (Famagusta)", "Guzelyurt"];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "all" || agent.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Find Your Agent</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Connect with experienced real estate professionals in North Cyprus
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-12">
          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search by name or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredAgents.length}</span> agents found
            </p>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                {/* Image */}
                <div className="relative h-64">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                    <FiStar className="text-yellow-500 fill-current" size={16} />
                    <span className="font-semibold text-gray-900">{agent.rating}</span>
                    <span className="text-gray-500 text-sm">({agent.reviews})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{agent.company}</p>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{agent.bio}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-sm">
                      <FiHome className="text-gray-500" size={16} />
                      <span className="text-gray-700">{agent.activeListings} Listings</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FiMapPin className="text-gray-500" size={16} />
                      <span className="text-gray-700">{agent.location}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <a>
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                    
                      <FiPhone size={16} />
                      Call
                    </a>
                    <Link
                      to={`/agent/${agent.id}`}
                      className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm font-semibold"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentsListing;
