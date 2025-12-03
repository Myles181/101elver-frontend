import api from './api';

export const alertAPI = {
  // Create alert
  createAlert: async (alertData) => {
    const response = await api.post('/alerts', alertData);
    return response.data;
  },

  // Get user alerts
  getUserAlerts: async () => {
    const response = await api.get('/alerts');
    return response.data;
  },

  // Get alert matches
  getAlertMatches: async (id, params = {}) => {
    const response = await api.get(`/alerts/${id}/matches`, { params });
    return response.data;
  },

  // Update alert
  updateAlert: async (id, updates) => {
    const response = await api.put(`/alerts/${id}`, updates);
    return response.data;
  },

  // Delete alert
  deleteAlert: async (id) => {
    const response = await api.delete(`/alerts/${id}`);
    return response.data;
  },

  // Toggle alert status
  toggleAlertStatus: async (id) => {
    const response = await api.patch(`/alerts/${id}/toggle`);
    return response.data;
  }
};
