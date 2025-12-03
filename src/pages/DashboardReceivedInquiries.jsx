import React, { useState, useEffect } from 'react';
import { inquiryAPI } from '../services';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiUser, FiMapPin, FiClock, FiCheck, FiX } from 'react-icons/fi';

const DashboardReceivedInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, responded

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const params = filter === 'all' ? {} : { status: filter };
      const response = await inquiryAPI.getReceivedInquiries(params);
      setInquiries(response.data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsResponded = async (id) => {
    try {
      await inquiryAPI.markAsResponded(id);
      toast.success('Marked as responded');
      fetchInquiries();
    } catch (error) {
      console.error('Error marking inquiry:', error);
      toast.error('Failed to update inquiry');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Received Inquiries</h1>
        <p className="text-gray-600">{inquiries.length} total inquiries</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'responded'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : inquiries.length > 0 ? (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser className="text-gray-400" size={18} />
                    <h3 className="text-lg font-bold text-gray-900">{inquiry.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      inquiry.status === 'responded'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiMail className="text-gray-400" size={16} />
                      <a href={`mailto:${inquiry.email}`} className="hover:text-blue-600">
                        {inquiry.email}
                      </a>
                    </div>
                    
                    {inquiry.phone && (
                      <div className="flex items-center gap-2">
                        <FiPhone className="text-gray-400" size={16} />
                        <a href={`tel:${inquiry.phone}`} className="hover:text-blue-600">
                          {inquiry.phone}
                        </a>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <FiClock className="text-gray-400" size={16} />
                      <span>{formatDate(inquiry.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {inquiry.status === 'pending' && (
                  <button
                    onClick={() => handleMarkAsResponded(inquiry._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                  >
                    <FiCheck size={16} />
                    Mark as Responded
                  </button>
                )}
              </div>

              {/* Property Info */}
              {inquiry.property && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="text-gray-400" size={16} />
                    <span className="font-semibold text-gray-900">
                      {inquiry.property.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{inquiry.property.location}</p>
                </div>
              )}

              {/* Message */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Message:</p>
                <p className="text-gray-700">{inquiry.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FiMail size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No inquiries yet</h3>
          <p className="text-gray-600">
            Inquiries from interested buyers will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardReceivedInquiries;
