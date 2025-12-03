import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { FiMessageSquare, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

const DashboardInquiries = () => {
  const [filter, setFilter] = useState("all");

  const inquiries = [
    {
      id: 1,
      property: {
        id: "1",
        title: "Luxury Villa with Sea View",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400",
        location: "Girne (Kyrenia)",
        price: "£450,000"
      },
      message: "I'm interested in viewing this property. Is it still available?",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "replied",
      agentResponse: "Yes, it's still available! I'd be happy to schedule a viewing. When would work best for you?"
    },
    {
      id: 2,
      property: {
        id: "2",
        title: "Modern City Apartment",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400",
        location: "Lefkosa (Nicosia)",
        price: "£185,000"
      },
      message: "What are the monthly maintenance fees for this apartment?",
      date: "2024-01-14",
      time: "3:45 PM",
      status: "pending"
    },
    {
      id: 3,
      property: {
        id: "6",
        title: "Penthouse with Terrace",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=400",
        location: "Girne (Kyrenia)",
        price: "£550,000"
      },
      message: "Can you provide more photos of the terrace area?",
      date: "2024-01-12",
      time: "11:20 AM",
      status: "replied",
      agentResponse: "I've just sent additional photos to your email. Let me know if you need anything else!"
    },
    {
      id: 4,
      property: {
        id: "5",
        title: "Spacious Family Home",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=400",
        location: "Guzelyurt",
        price: "£320,000"
      },
      message: "Is the property furnished?",
      date: "2024-01-10",
      time: "2:15 PM",
      status: "closed"
    }
  ];

  const filteredInquiries = filter === "all" 
    ? inquiries 
    : inquiries.filter(inq => inq.status === filter);

  const getStatusIcon = (status) => {
    switch(status) {
      case "replied":
        return <FiCheckCircle className="text-green-500" size={20} />;
      case "pending":
        return <FiClock className="text-yellow-500" size={20} />;
      case "closed":
        return <FiXCircle className="text-gray-400" size={20} />;
      default:
        return <FiMessageSquare className="text-blue-500" size={20} />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      replied: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      closed: "bg-gray-100 text-gray-700"
    };
    return styles[status] || "bg-blue-100 text-blue-700";
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Inquiries</h1>
        <p className="text-gray-600">Track all your property inquiries and responses</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-md p-2 mb-6 inline-flex">
        <button
          onClick={() => setFilter("all")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          All ({inquiries.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            filter === "pending"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Pending ({inquiries.filter(i => i.status === "pending").length})
        </button>
        <button
          onClick={() => setFilter("replied")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            filter === "replied"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Replied ({inquiries.filter(i => i.status === "replied").length})
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            filter === "closed"
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Closed ({inquiries.filter(i => i.status === "closed").length})
        </button>
      </div>

      {/* Inquiries List */}
      {filteredInquiries.length > 0 ? (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                {/* Property Info */}
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-200">
                  <img 
                    src={inquiry.property.image} 
                    alt={inquiry.property.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link 
                      to={`/property/${inquiry.property.id}`}
                      className="text-lg font-bold text-gray-900 hover:text-blue-600 transition"
                    >
                      {inquiry.property.title}
                    </Link>
                    <p className="text-sm text-gray-600">{inquiry.property.location}</p>
                    <p className="text-lg font-bold text-blue-600 mt-1">{inquiry.property.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                    <span className="text-sm text-gray-500">{inquiry.date}</span>
                    <span className="text-xs text-gray-400">{inquiry.time}</span>
                  </div>
                </div>

                {/* Your Message */}
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(inquiry.status)}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">Your Inquiry:</p>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{inquiry.message}</p>
                    </div>
                  </div>
                </div>

                {/* Agent Response */}
                {inquiry.agentResponse && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Agent Response:</p>
                    <p className="text-gray-700">{inquiry.agentResponse}</p>
                  </div>
                )}

                {inquiry.status === "pending" && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <FiClock size={16} />
                    <span>Waiting for agent response...</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <FiMessageSquare size={40} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No inquiries found</h3>
          <p className="text-gray-600 mb-6">
            {filter === "all" 
              ? "You haven't made any property inquiries yet"
              : `No ${filter} inquiries`
            }
          </p>
          <Link
            to="/search"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardInquiries;
