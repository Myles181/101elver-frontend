import api from './api';

export const propertyAPI = {
  // Get all properties with filters
  getAllProperties: async (params = {}) => {
    const response = await api.get('/properties', { params });
    return response.data;
  },

  // Get property by ID
  getPropertyById: async (id) => {
    const response = await api.get(`/properties/${id}`); // ✅ FIXED
    return response.data;
  },

  // Get similar properties
  getSimilarProperties: async (id) => {
    const response = await api.get(`/properties/${id}/similar`); // ✅ FIXED
    return response.data;
  },

  // Get nearby properties
  getNearbyProperties: async (latitude, longitude, radius = 5) => {
    const response = await api.get('/properties/nearby', {
      params: { latitude, longitude, radius }
    });
    return response.data;
  },

  // Get my properties (for agency/construction)
  getMyProperties: async (params = {}) => {
    const response = await api.get('/properties/user/my-properties', { params });
    return response.data;
  },

  // Add property
  addProperty: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  // Update property
  updateProperty: async (id, updates) => {
    const response = await api.put(`/properties/${id}`, updates); // ✅ FIXED
    return response.data;
  },

  // Delete property
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`); // ✅ FIXED
    return response.data;
  },

  // Toggle property status
  togglePropertyStatus: async (id) => {
    const response = await api.patch(`/properties/${id}/toggle-status`); // ✅ FIXED
    return response.data;
  }
};