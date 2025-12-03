import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHome, FiSearch, FiFilter, FiCheckCircle, FiXCircle, 
  FiEye, FiMapPin, FiCalendar, FiUser, FiDownload, FiX
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const API_BASE = 'https://one01elver.onrender.com/api/admin/properties';

const AdminPropertyApproval = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: new URLSearchParams(window.location.search).get('status') || 'pending',
    propertyType: 'all'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewPropertyModal, setViewPropertyModal] = useState(null);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchProperties();
  }, [pagination.page, filters, searchTerm]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const adtoken = localStorage.getItem('adtoken');
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status,
        ...(filters.propertyType !== 'all' && { propertyType: filters.propertyType }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`${API_BASE}?${params}`, {
        headers: { Authorization: `Bearer ${adtoken}` }
      });

      const data = await response.json();
      if (data.success) {
        setProperties(data.data.properties);
        setPagination(prev => ({
          ...prev,
          total: data.data.pagination.total,
          totalPages: data.data.pagination.totalPages
        }));
      } else {
        toast.error(data.message || 'Failed to load properties');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProperty = async (propertyId, title) => {
    if (!window.confirm(`Approve property: "${title}"?`)) return;

    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/${propertyId}/approve`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${adtoken}` },
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Property "${title}" approved!`);
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to approve property');
      }
    } catch (error) {
      console.error('Error approving property:', error);
      toast.error('Failed to approve property');
    }
  };

  const handleRejectProperty = async () => {
    if (!rejectReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/${rejectModal._id}/reject`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adtoken}` 
        },
        body: JSON.stringify({ reason: rejectReason })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Property "${rejectModal.title}" rejected`);
        setRejectModal(null);
        setRejectReason('');
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to reject property');
      }
    } catch (error) {
      console.error('Error rejecting property:', error);
      toast.error('Failed to reject property');
    }
  };

  const handleDeleteProperty = async (propertyId, title) => {
    if (!window.confirm(`DELETE property: "${title}"? This action cannot be undone.`)) return;

    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/${propertyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adtoken}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Property "${title}" deleted`);
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const handleBulkApprove = async () => {
    if (selectedProperties.length === 0) {
      toast.error('No properties selected');
      return;
    }

    if (!window.confirm(`Approve ${selectedProperties.length} properties?`)) return;

    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/bulk-approve`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adtoken}` 
        },
        body: JSON.stringify({ propertyIds: selectedProperties })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`${selectedProperties.length} properties approved!`);
        setSelectedProperties([]);
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to approve properties');
      }
    } catch (error) {
      console.error('Error approving properties:', error);
      toast.error('Failed to approve properties');
    }
  };

  const toggleSelectProperty = (propertyId) => {
    setSelectedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status, approved) => {
    if (!approved && status === 'pending') {
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Pending Approval</span>;
    }
    if (status === 'rejected') {
      return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Rejected</span>;
    }
    if (status === 'active' && approved) {
      return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Approved</span>;
    }
    return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold capitalize">{status}</span>;
  };

  const getPendingCount = () => {
    return properties.filter(p => !p.approved && p.status === 'pending').length;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Approvals</h1>
          <p className="text-gray-600">
            {pagination.total} total properties
            {filters.status === 'pending' && ` • ${getPendingCount()} awaiting approval`}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by title, location, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-2">
            {['pending', 'approved', 'rejected', 'all'].map((status) => (
              <button
                key={status}
                onClick={() => setFilters({ ...filters, status })}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filters.status === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'pending' ? 'Pending' :
                 status === 'approved' ? 'Approved' :
                 status === 'rejected' ? 'Rejected' : 'All'}
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <FiFilter size={18} />
            More Filters
          </button>
        </div>

        {/* Additional Filters */}
        {showFilters && (
          <div className="flex gap-4 mt-4 pt-4 border-t">
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Property Types</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Land">Land</option>
              <option value="Commercial">Commercial</option>
            </select>

            <button
              onClick={() => {
                setFilters({ status: 'pending', propertyType: 'all' });
                setSearchTerm('');
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedProperties.length > 0 && filters.status === 'pending' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-900">
              {selectedProperties.length} property(ies) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleBulkApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
              >
                <FiCheckCircle className="inline mr-2" size={16} />
                Approve Selected
              </button>
              <button
                onClick={() => setSelectedProperties([])}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                {/* Checkbox for pending properties */}
                {filters.status === 'pending' && (
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property._id)}
                      onChange={() => toggleSelectProperty(property._id)}
                      className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                )}

                {/* Property Image */}
                <div className="relative">
                  <img
                    src={property.images?.[0] || '/placeholder-property.jpg'}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-property.jpg';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(property.status, property.approved)}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {property.category}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2 text-sm">
                    <FiMapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <p className="text-xl font-bold text-blue-600 mb-3">
                    {formatPrice(property.price)}
                  </p>

                  {/* Owner Info */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b">
                    <FiUser size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {property.user?.companyName || property.user?.fullname || 'Unknown'}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FiCalendar size={12} />
                      <span>{formatDate(property.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {property.beds > 0 && <span>{property.beds} beds</span>}
                      <span>{property.area} m²</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewPropertyModal(property)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                      <FiEye size={16} />
                      View
                    </button>

                    {!property.approved && property.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveProperty(property._id, property.title)}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium"
                        >
                          <FiCheckCircle size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => setRejectModal(property)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          title="Reject"
                        >
                          <FiXCircle size={16} />
                        </button>
                      </>
                    )}

                    {(property.approved || property.status === 'rejected') && (
                      <button
                        onClick={() => handleDeleteProperty(property._id, property.title)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <FiXCircle size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <p className="text-sm text-gray-600">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} properties
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FiHome size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600">
            {filters.status === 'pending' 
              ? 'No properties awaiting approval' 
              : 'Try adjusting your filters'}
          </p>
        </div>
      )}

      {/* View Property Modal */}
      {viewPropertyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-4xl w-full my-8">
            <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Property Details</h3>
              <button
                onClick={() => setViewPropertyModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Images */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {viewPropertyModal.images?.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Property ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{viewPropertyModal.title}</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-4">
                    {formatPrice(viewPropertyModal.price)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{viewPropertyModal.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property Type</p>
                    <p className="font-semibold">{viewPropertyModal.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold">{viewPropertyModal.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="font-semibold">{viewPropertyModal.area} m²</p>
                  </div>
                  {viewPropertyModal.beds > 0 && (
                    <div>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                      <p className="font-semibold">{viewPropertyModal.beds}</p>
                    </div>
                  )}
                  {viewPropertyModal.baths > 0 && (
                    <div>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                      <p className="font-semibold">{viewPropertyModal.baths}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900">{viewPropertyModal.description}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Listed By</p>
                  <p className="font-semibold">
                    {viewPropertyModal.user?.companyName || viewPropertyModal.user?.fullname}
                  </p>
                  <p className="text-sm text-gray-600">{viewPropertyModal.user?.email}</p>
                </div>
              </div>

              {/* Actions */}
              {!viewPropertyModal.approved && viewPropertyModal.status === 'pending' && (
                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => {
                      handleApproveProperty(viewPropertyModal._id, viewPropertyModal.title);
                      setViewPropertyModal(null);
                    }}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    <FiCheckCircle className="inline mr-2" size={18} />
                    Approve Property
                  </button>
                  <button
                    onClick={() => {
                      setRejectModal(viewPropertyModal);
                      setViewPropertyModal(null);
                    }}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    <FiXCircle className="inline mr-2" size={18} />
                    Reject Property
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reject Property</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting "{rejectModal.title}"
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="4"
              placeholder="e.g., Property does not meet our standards, missing required information, etc."
              required
            />
            <div className="flex gap-3">
              <button
                onClick={handleRejectProperty}
                disabled={!rejectReason.trim()}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Property
              </button>
              <button
                onClick={() => {
                  setRejectModal(null);
                  setRejectReason('');
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPropertyApproval;