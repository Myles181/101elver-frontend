import React, { useState } from "react";
import { FiPhone, FiMail, FiUser } from "react-icons/fi";
import ContactActions from "./ContactActions";

const ContactForm = ({ 
  propertyTitle, 
  propertyId,
  propertyPrice,
  propertyLocation,
  agentName, 
  agentPhone,
  agentEmail,
  agentWhatsappTemplate,
  agentResponseTime,
  onSubmitSuccess,
  onAuthRequired
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in ${propertyTitle}`
  });
  const [loading, setLoading] = useState(false);

  const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoggedIn()) {
      onAuthRequired && onAuthRequired();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("Form submitted:", formData);
      
      onSubmitSuccess && onSubmitSuccess("Message sent successfully! The agent will contact you soon.");
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: `I'm interested in ${propertyTitle}`
      });
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const property = {
    id: propertyId,
    title: propertyTitle,
    price: propertyPrice,
    location: propertyLocation
  };

  const agent = {
    name: agentName,
    phone: agentPhone,
    email: agentEmail || "agent@101elver.com",
    whatsappTemplate: agentWhatsappTemplate,
    responseTime: agentResponseTime
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Agent</h3>
      
      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">{agentName}</p>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FiPhone size={16} className="mr-2" />
          {agentPhone}
        </div>
        {agentEmail && (
          <div className="flex items-center text-gray-600 text-sm">
            <FiMail size={16} className="mr-2" />
            {agentEmail}
          </div>
        )}
      </div>

      <div className="mb-6">
        <ContactActions
          property={property}
          agent={agent}
          requireAuth={false}
          onAuthRequired={onAuthRequired}
        />
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-900 mb-4">Send a Message</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+90 123 456 7890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="I'm interested in this property..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          {!isLoggedIn() && "Sign in required to send messages. "}
          By submitting, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
