import React from "react";
import { FiArrowRight } from "react-icons/fi";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Are You a Property Owner or Agent?
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          List your properties with us and reach thousands of potential buyers and renters
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition flex items-center gap-2 text-lg">
            Post a Property
            <FiArrowRight size={20} />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition text-lg">
            Contact Us
          </button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-white">
            <div className="text-4xl font-bold">98%</div>
            <div className="text-white/80 mt-2">Success Rate</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold">24/7</div>
            <div className="text-white/80 mt-2">Customer Support</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold">Free</div>
            <div className="text-white/80 mt-2">Property Listing</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;