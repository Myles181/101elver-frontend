import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiSearch, FiHome, FiFileText, FiKey, FiDollarSign, FiShield, FiHelpCircle } from "react-icons/fi";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("buyers");

  const buyerSteps = [
    {
      icon: <FiSearch size={40} />,
      title: "Browse Properties",
      description: "Search through thousands of verified listings. Use our advanced filters to find properties that match your exact requirements - location, price, size, and features."
    },
    {
      icon: <FiHome size={40} />,
      title: "Schedule Viewings",
      description: "Found something you like? Contact the agent directly via phone, WhatsApp, or email to schedule a viewing. Most agents respond within 1 hour."
    },
    {
      icon: <FiFileText size={40} />,
      title: "Make an Offer",
      description: "Ready to buy? Your agent will help you negotiate the best price and guide you through the paperwork. All legal documents are handled professionally."
    },
    {
      icon: <FiKey size={40} />,
      title: "Get the Keys",
      description: "Once everything is finalized, complete the payment and get your keys! Your agent will help with property handover and any post-purchase support."
    }
  ];

  const sellerSteps = [
    {
      icon: <FiFileText size={40} />,
      title: "Create Account",
      description: "Sign up as an agency or construction company. Provide your business details and verify your account to start listing properties."
    },
    {
      icon: <FiHome size={40} />,
      title: "List Your Property",
      description: "Add property details, upload high-quality photos, set your price, and customize your contact preferences including WhatsApp messages."
    },
    {
      icon: <FiDollarSign size={40} />,
      title: "Receive Inquiries",
      description: "Potential buyers will contact you directly via your preferred method. Manage all inquiries from your dashboard and respond quickly."
    },
    {
      icon: <FiKey size={40} />,
      title: "Close the Deal",
      description: "Negotiate with buyers, finalize the sale, and hand over the property. Update your listing status to keep your portfolio current."
    }
  ];

  const renterSteps = [
    {
      icon: <FiSearch size={40} />,
      title: "Find Rentals",
      description: "Browse available rental properties including long-term rentals and holiday homes. Filter by budget, location, and rental duration."
    },
    {
      icon: <FiHome size={40} />,
      title: "Contact Landlord",
      description: "Reach out to property owners directly. Discuss terms, rental period, and any specific requirements you may have."
    },
    {
      icon: <FiFileText size={40} />,
      title: "Sign Agreement",
      description: "Review and sign the rental agreement. Ensure all terms are clear including deposit, monthly rent, and contract duration."
    },
    {
      icon: <FiKey size={40} />,
      title: "Move In",
      description: "Pay the deposit and first month's rent, collect your keys, and move into your new home. Enjoy your stay in Cyprus!"
    }
  ];

  const faqs = [
    {
      question: "Is 101Elver free to use?",
      answer: "Yes! Browsing properties and contacting agents is completely free for buyers and renters. Agents pay a subscription fee to list properties."
    },
    {
      question: "How do I know if a listing is legitimate?",
      answer: "All agents and companies are verified before they can list properties. Look for the verified badge on agent profiles. We also encourage users to report suspicious listings."
    },
    {
      question: "Can I negotiate the price?",
      answer: "Absolutely! Prices listed are asking prices. You can negotiate directly with the agent or seller. Most agents are open to reasonable offers."
    },
    {
      question: "What documents do I need to buy property in Cyprus?",
      answer: "You'll need a valid passport, proof of funds, and potentially a tax identification number. Your agent will guide you through all legal requirements."
    },
    {
      question: "How long does the buying process take?",
      answer: "Typically 4-8 weeks from offer acceptance to completion. This includes property inspection, legal checks, and paperwork. Rush purchases can be faster."
    },
    {
      question: "Do you offer property management services?",
      answer: "Many of our partner agencies offer property management for rentals and holiday homes. Contact them directly to discuss management services."
    },
    {
      question: "Can foreigners buy property in North Cyprus?",
      answer: "Yes! Foreigners can purchase property in North Cyprus. Some restrictions may apply to certain areas. Your agent will clarify eligibility."
    },
    {
      question: "What payment methods are accepted?",
      answer: "Most sellers accept bank transfers and cash. Some accept cryptocurrency. Payment terms are negotiated directly with the seller or agent."
    }
  ];

  const getCurrentSteps = () => {
    switch(activeTab) {
      case "buyers": return buyerSteps;
      case "sellers": return sellerSteps;
      case "renters": return renterSteps;
      default: return buyerSteps;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Your complete guide to buying, selling, and renting property in North Cyprus
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-12">
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-2 mb-8 inline-flex">
            <button
              onClick={() => setActiveTab("buyers")}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                activeTab === "buyers"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              For Buyers
            </button>
            <button
              onClick={() => setActiveTab("sellers")}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                activeTab === "sellers"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              For Sellers
            </button>
            <button
              onClick={() => setActiveTab("renters")}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                activeTab === "renters"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              For Renters
            </button>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {getCurrentSteps().map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <div className="text-blue-600 mb-4 mt-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose 101Elver?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <FiShield size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Listings</h3>
                <p className="text-gray-600">All properties and agents are verified to ensure legitimate and secure transactions.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <FiSearch size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Search</h3>
                <p className="text-gray-600">Advanced filters and search tools help you find exactly what you're looking for quickly.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4">
                  <FiDollarSign size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">No Hidden Fees</h3>
                <p className="text-gray-600">Transparent pricing with no surprise charges. What you see is what you get.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <FiHelpCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                  </div>
                  <p className="text-gray-600 ml-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-12 text-center text-white mt-16">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who found their perfect property with 101Elver
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
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
