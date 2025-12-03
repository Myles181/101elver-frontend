import api from './api';

export const favoriteAPI = {
  // Toggle favorite
  toggleFavorite: async (propertyId) => {
    const response = await api.post('/favorites/toggle', { propertyId });
    return response.data;
  },

  // Get favorites
  getFavorites: async (params = {}) => {
    const response = await api.get('/favorites', { params });
    return response.data;
  },

  // Check if property is favorited
  checkFavorite: async (propertyId) => {
    const response = await api.get(`/favorites/check/${propertyId}`);
    return response.data;
  }
};