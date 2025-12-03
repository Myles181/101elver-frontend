import React, { useState } from "react";
import { FiPhone, FiMail, FiMessageCircle, FiCopy, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ContactActions = ({ 
  property, 
  agent, 
  requireAuth = false, 
  onAuthRequired 
}) => {
  const [copied, setCopied] = useState(false);

  const isLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const handleAction = (action) => {
    if (requireAuth && !isLoggedIn()) {
      onAuthRequired && onAuthRequired();
      return false;
    }
    return true;
  };

  const handleEmail = () => {
    if (!handleAction("email")) return;

    const subject = encodeURIComponent(`Inquiry about ${property.title}`);
    const body = encodeURIComponent(
      `Hello ${agent.name},\n\n` +
      `I am interested in the following property:\n\n` +
      `Property: ${property.title}\n` +
      `Location: ${property.location}\n` +
      `Price: ${property.price}\n` +
      `Property ID: ${property.id}\n\n` +
      `Please provide me with more information and schedule a viewing.\n\n` +
      `Best regards`
    );

    window.location.href = `mailto:${agent.email}?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = () => {
    if (!handleAction("whatsapp")) return;

    const message = agent.whatsappTemplate || 
      `Hi! I'm interested in *${property.title}* located in ${property.location}. ` +
      `Price: ${property.price}. Property ID: ${property.id}. ` +
      `Can you provide more details and arrange a viewing?`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = agent.phone.replace(/[^0-9]/g, '');
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const handleCall = () => {
    if (!handleAction("call")) return;
    window.location.href = `tel:${agent.phone}`;
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(agent.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleCall}
          className="flex flex-col items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition group"
        >
          <FiPhone size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold">Call</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center gap-2 bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition group"
        >
          <FaWhatsapp size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold">WhatsApp</span>
        </button>

        <button
          onClick={handleEmail}
          className="flex flex-col items-center justify-center gap-2 bg-gray-700 text-white p-4 rounded-xl hover:bg-gray-800 transition group"
        >
          <FiMail size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-semibold">Email</span>
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiPhone className="text-gray-600" size={20} />
          <span className="font-semibold text-gray-900">{agent.phone}</span>
        </div>
        <button
          onClick={handleCopyPhone}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
        >
          {copied ? (
            <>
              <FiCheck size={18} />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={18} />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>

      {agent.responseTime && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiMessageCircle size={16} />
          <span>Typically responds in {agent.responseTime}</span>
        </div>
      )}
    </div>
  );
};

export default ContactActions;
