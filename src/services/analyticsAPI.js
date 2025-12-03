import api from './api';

export const analyticsAPI = {
  // Get analytics overview
  getOverview: async (range = '30days') => {
    const response = await api.get(`/analytics/overview`, { 
      params: { range } 
    });
    return response.data;
  },

  // Export analytics data
  exportData: async (range = '30days') => {
    const response = await api.get(`/analytics/export`, {
      params: { range },
      responseType: 'blob'
    });
    return response.data;
  },

  // Get property performance
  getPropertyPerformance: async (propertyId, range = '30days') => {
    const response = await api.get(`/analytics/property/${propertyId}`, {
      params: { range }
    });
    return response.data;
  },

  // Get detailed stats
  getDetailedStats: async (params = {}) => {
    const response = await api.get('/analytics/detailed', { params });
    return response.data;
  }
};