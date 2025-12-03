import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../components/LocationPicker";
import { propertyAPI, userAPI } from "../services";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiUpload, FiX, FiImage } from "react-icons/fi";

const DashboardAddProperty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    category: "For Sale",
    beds: "",
    baths: "",
    area: "",
    yearBuilt: "",
    furnished: "Unfurnished",
    coordinates: {
      latitude: "",
      longitude: ""
    },
    address: {
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      postalCode: ""
    },
    features: {
      outdoor: [],
      indoor: [],
      location: []
    },
    video: "",
    agentName: user?.fullname || "",
    agentPhone: user?.phoneNumber || "",
    agentEmail: user?.email || "",
    agentWhatsapp: user?.whatsappLink || ""
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleLocationChange = (latOrCoords, lng) => {
    console.log('handleLocationChange called with:', latOrCoords, lng);
    
    let latitude, longitude;
    
    // Check if first parameter is an object with lat/lng properties
    if (typeof latOrCoords === 'object' && latOrCoords !== null) {
      latitude = latOrCoords.lat;
      longitude = latOrCoords.lng;
    } else {
      // Otherwise treat as two separate parameters
      latitude = latOrCoords;
      longitude = lng;
    }
    
    // Validate coordinates
    if (typeof latitude === 'undefined' || typeof longitude === 'undefined') {
      console.error('Invalid coordinates received:', { latitude, longitude });
      return;
    }
    
    console.log('Parsed coordinates - lat:', latitude, 'lng:', longitude);
    
    // Use functional update to avoid stale state
    setFormData(prevFormData => ({
      ...prevFormData,
      coordinates: {
        latitude: latitude.toString(),
        longitude: longitude.toString()
      }
    }));
    
    console.log('Coordinates update triggered');
  };

  const handleAddressAutoFill = (addressData) => {
  // Extract data more flexibly from different possible field names
  const extractedAddress = {
    street: addressData.road || 
            addressData.street || 
            addressData.name || 
            "",
    neighborhood: addressData.neighbourhood || 
                  addressData.neighborhood || 
                  addressData.suburb || 
                  addressData.amenity || 
                  addressData.quarter || 
                  addressData.road ||
                  "",
    city: addressData.city || 
          addressData.town || 
          addressData.village || 
          addressData.municipality || 
          addressData.county || 
          "",
    state: addressData.state || 
           addressData.state_district || 
           addressData.region || 
           "",
    postalCode: addressData.postcode || 
                addressData.postal_code || 
                ""
  };

  // Set the general location (prefer city, then fall back to other options)
  const generalLocation = extractedAddress.city || 
                         addressData.suburb || 
                         addressData.county || 
                         formData.location;

  setFormData(prevFormData => ({
    ...prevFormData,
    address: {
      ...prevFormData.address,
      ...extractedAddress
    },
    location: generalLocation || prevFormData.location,
    coordinates: prevFormData.coordinates
  }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    setUploading(true);
    toast.loading('Uploading images...', { id: 'upload' });

    try {
      const uploadPromises = files.map(async (file) => {
        const response = await userAPI.uploadFile(file);
        console.log('📤 Upload response:', response); // DEBUG: See what the API returns
        
        // Check different possible response structures
        const cloudinaryUrl = response.url || response.data?.url || response.secure_url || response.data?.secure_url;
        
        if (!cloudinaryUrl) {
          console.error('No URL in upload response:', response);
          throw new Error('Upload failed - no URL returned');
        }
        
        return {
          id: Date.now() + Math.random(),
          preview: URL.createObjectURL(file),
          cloudinaryUrl: cloudinaryUrl
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      console.log('✅ All files uploaded:', uploadedFiles); // Verify all have cloudinaryUrl
      
      setImages([...images, ...uploadedFiles]);
      
      toast.success(`${files.length} image(s) uploaded successfully`, { id: 'upload' });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images', { id: 'upload' });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
    toast.success('Image removed');
  };

  const handleFeatureToggle = (category, feature) => {
    const currentFeatures = formData.features[category];
    const updated = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [category]: updated
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data:", formData);
    
    // if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
    //   toast.error('Please select a location on the map');
    //   return;
    // }

    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);

    try {
      const imageUrls = images.map(img => img.cloudinaryUrl);
      console.log('Submitting with images:', imageUrls);

      const propertyData = {
        ...formData,
        images: imageUrls,
        price: parseFloat(formData.price),
        beds: parseInt(formData.beds) || 0,
        baths: parseInt(formData.baths) || 0,
        area: parseFloat(formData.area),
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined
      };

      console.log('Property data being sent:', propertyData);

      await propertyAPI.addProperty(propertyData);
      toast.success("Property added successfully! Pending approval.");
      setTimeout(() => navigate("/dashboard/my-listings"), 1500);
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error(error.response?.data?.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  const featureOptions = {
    outdoor: ["Private Pool", "Garden", "Terrace", "Barbecue Area", "Parking", "Security System"],
    indoor: ["Air Conditioning", "Central Heating", "Fitted Kitchen", "Built-in Wardrobes", "Fireplace", "Laundry Room"],
    location: ["Sea View", "Mountain View", "Close to Beach", "Quiet Area", "City Center", "Near Schools"]
  };

  // ✅ NO DASHBOARDLAYOUT WRAPPER - just return the content directly
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Property</h1>
        <p className="text-gray-600">Fill in the details below to list your property</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Luxury Villa with Sea View"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the property in detail..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₦) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50000000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                General Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Auto-filled from map or type manually"
                required
              />
              <p className="text-xs text-gray-500 mt-1">This will be auto-filled when you select a location on the map</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Holiday Rental">Holiday Rental</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Address */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📍 Exact Location *</h2>
          <p className="text-sm text-gray-600 mb-4">
            Search or click on the map to pinpoint the property location. Address fields will auto-fill.
          </p>
          
          <LocationPicker
            coordinates={formData.coordinates}
            onLocationChange={handleLocationChange}
            onAddressChange={handleAddressAutoFill}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Auto-filled from map"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Neighborhood
              </label>
              <input
                type="text"
                name="neighborhood"
                value={formData.address.neighborhood}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Auto-filled from map"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Auto-filled from map"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Auto-filled from map"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="4"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="3"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (m²) *
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="280"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Built
              </label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2023"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Furnished
              </label>
              <select
                name="furnished"
                value={formData.furnished}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Furnished">Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (YouTube)
              </label>
              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
          
          {Object.entries(featureOptions).map(([category, features]) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="font-semibold text-gray-900 mb-3 capitalize">{category} Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {features.map((feature) => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features[category].includes(feature)}
                      onChange={() => handleFeatureToggle(category, feature)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <span className="text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Property Images * 
            {images.length > 0 && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({images.length} image{images.length !== 1 ? 's' : ''} uploaded)
              </span>
            )}
          </h2>
          
          <div className="mb-4">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-gray-600 font-semibold">Uploading...</p>
                  </>
                ) : (
                  <>
                    <FiUpload className="text-gray-400 mb-2" size={40} />
                    <p className="text-gray-600 font-semibold mb-1">Click to upload images</p>
                    <p className="text-gray-500 text-sm">PNG, JPG or WEBP (MAX. 5MB each)</p>
                  </>
                )}
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img 
                    src={image.preview} 
                    alt="Property"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <FiX size={16} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                    ✓ Uploaded
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agent Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Name
              </label>
              <input
                type="text"
                name="agentName"
                value={formData.agentName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Phone
              </label>
              <input
                type="tel"
                name="agentPhone"
                value={formData.agentPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+234..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Agent Email
              </label>
              <input
                type="email"
                name="agentEmail"
                value={formData.agentEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="agent@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="agentWhatsapp"
                value={formData.agentWhatsapp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+234..."
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Property..." : "Add Property"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/my-listings")}
            disabled={loading || uploading}
            className="px-8 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardAddProperty;