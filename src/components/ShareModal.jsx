import React, { useState } from "react";
import { FiX, FiCopy, FiCheck, FiFacebook, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ShareModal = ({ isOpen, onClose, property }) => {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareText = `Check out this property: ${property.title} - ${property.price}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(property.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Share Property</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleShare('facebook')}
            className="w-full flex items-center gap-3 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
              <FiFacebook size={20} />
            </div>
            <span className="font-semibold text-gray-700">Share on Facebook</span>
          </button>

          <button
            onClick={() => handleShare('twitter')}
            className="w-full flex items-center gap-3 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white">
              <FiTwitter size={20} />
            </div>
            <span className="font-semibold text-gray-700">Share on Twitter</span>
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            className="w-full flex items-center gap-3 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white">
              <FiLinkedin size={20} />
            </div>
            <span className="font-semibold text-gray-700">Share on LinkedIn</span>
          </button>

          <button
            onClick={() => handleShare('whatsapp')}
            className="w-full flex items-center gap-3 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
              <FaWhatsapp size={20} />
            </div>
            <span className="font-semibold text-gray-700">Share on WhatsApp</span>
          </button>

          <button
            onClick={() => handleShare('email')}
            className="w-full flex items-center gap-3 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white">
              <FiMail size={20} />
            </div>
            <span className="font-semibold text-gray-700">Share via Email</span>
          </button>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or copy link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              {copied ? (
                <>
                  <FiCheck size={18} />
                  Copied
                </>
              ) : (
                <>
                  <FiCopy size={18} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
