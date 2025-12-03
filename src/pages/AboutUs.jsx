import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiCheckCircle, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";

const AboutUs = () => {
  const stats = [
    { icon: <FiUsers size={40} />, number: "5,000+", label: "Happy Clients" },
    { icon: <FiCheckCircle size={40} />, number: "10,000+", label: "Properties Listed" },
    { icon: <FiAward size={40} />, number: "15+", label: "Years Experience" },
    { icon: <FiTrendingUp size={40} />, number: "98%", label: "Success Rate" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
      bio: "15+ years in real estate, passionate about connecting people with their dream homes."
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=400",
      bio: "Expert in property management with a focus on client satisfaction."
    },
    {
      name: "Emma Williams",
      role: "Lead Agent",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
      bio: "Top-performing agent specializing in luxury properties across Cyprus."
    },
    {
      name: "David Brown",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400",
      bio: "Digital marketing specialist helping properties reach the right buyers."
    }
  ];

  const values = [
    {
      title: "Transparency",
      description: "We believe in honest communication and clear dealings with all our clients.",
      icon: <FiCheckCircle className="text-blue-600" size={32} />
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every property we list and every client we serve.",
      icon: <FiAward className="text-blue-600" size={32} />
    },
    {
      title: "Innovation",
      description: "Using cutting-edge technology to make property search easier and more efficient.",
      icon: <FiTrendingUp className="text-blue-600" size={32} />
    },
    {
      title: "Community",
      description: "Building lasting relationships with our clients and contributing to local communities.",
      icon: <FiUsers className="text-blue-600" size={32} />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">About 101Elver</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your trusted partner in finding the perfect property in North Cyprus. 
              We're passionate about connecting people with their dream homes.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 -mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="flex justify-center text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 2010, 101Elver began with a simple mission: to make property buying, selling, 
                and renting in North Cyprus easier and more transparent. What started as a small office in 
                Kyrenia has grown into one of the region's most trusted real estate platforms.
              </p>
              <p>
                Over the years, we've helped thousands of families find their perfect homes, investors 
                discover lucrative opportunities, and property owners reach the right buyers. Our success 
                is built on trust, expertise, and a genuine passion for real estate.
              </p>
              <p>
                Today, 101Elver combines traditional real estate expertise with modern technology, offering 
                a seamless experience for all our clients. Whether you're looking for a beachfront villa, 
                a city apartment, or a holiday rental, we're here to guide you every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Find Your Dream Property?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Browse thousands of properties or contact our expert team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/search"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Properties
              </Link>
              <Link 
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
