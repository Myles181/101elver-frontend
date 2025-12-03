import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative h-[500px] rounded-xl overflow-hidden">
          <img
            src={images[selectedImage]}
            alt={`Property ${selectedImage + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowLightbox(true)}
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
            {selectedImage + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="grid grid-cols-6 gap-2 mt-4">
          {images.slice(0, 6).map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                selectedImage === index ? "border-blue-600" : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-80 transition"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <FiX size={32} />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition"
          >
            <FiChevronLeft size={48} />
          </button>
          
          <img
            src={images[selectedImage]}
            alt={`Property ${selectedImage + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition"
          >
            <FiChevronRight size={48} />
          </button>

          <div className="absolute bottom-4 text-white text-lg font-medium">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
