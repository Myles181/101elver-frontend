import api from './api';

export const inquiryAPI = {
  // Send inquiry
  sendInquiry: async (inquiryData) => {
    const response = await api.post('/inquiries', inquiryData);
    return response.data;
  },

  // Get my inquiries (sent)
  getMyInquiries: async (email) => {
    const response = await api.get('/inquiries/my-inquiries', {
      params: { email }
    });
    return response.data;
  },

  // Get received inquiries (for agency/construction)
  getReceivedInquiries: async (params = {}) => {
    const response = await api.get('/inquiries/received', { params });
    return response.data;
  },

  // Mark inquiry as replied
  markAsReplied: async (id, responseText) => {
    const response = await api.patch(`/inquiries/${id}/reply`, {
      response: responseText
    });
    return response.data;
  },

  // Archive inquiry
  archiveInquiry: async (id) => {
    const response = await api.patch(`/inquiries/${id}/archive`);
    return response.data;
  }
};
