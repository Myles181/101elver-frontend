import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyAPI } from '../services';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiEye, FiEyeOff, FiMapPin, FiHome, FiMaximize2, FiAlertCircle } from 'react-icons/fi';

const DashboardMyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProperties();
  }, [filter, page]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
        ...(filter !== 'all' && { status: filter })
      };
      const response = await propertyAPI.getMyProperties(params);
      setProperties(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error(error.response?.data?.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await propertyAPI.togglePropertyStatus(id);
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      toast.success(`Property ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      fetchProperties();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    try {
      await propertyAPI.deleteProperty(id);
      toast.success('Property deleted successfully');
      
      // If we're on a page with only one item and it's not page 1, go back a page
      if (properties.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchProperties();
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error(error.response?.data?.message || 'Failed to delete property');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status, approved) => {
    if (!approved) {
      return (
        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <FiAlertCircle size={12} />
          Pending Approval
        </span>
      );
    }

    const styles = {
      active: 'bg-green-500 text-white',
      inactive: 'bg-gray-500 text-white',
      pending: 'bg-yellow-500 text-white',
      sold: 'bg-blue-500 text-white'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.active}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
          <p className="text-gray-600">
            {pagination?.total || properties.length} total {pagination?.total === 1 ? 'property' : 'properties'}
          </p>
        </div>
        <Link
          to="/dashboard/add-property"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          + Add Property
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['all', 'active', 'pending', 'inactive', 'sold'].map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilter(status);
              setPage(1); // Reset to page 1 when changing filters
            }}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="relative">
                  <img
                    src={property.images?.[0] || '/placeholder-property.jpg'}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-property.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(property.status, property.approved)}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {property.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" title={property.title}>
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{property.location}</span>
                  </div>

                  <p className="text-xl font-bold text-blue-600 mb-3">
                    {formatPrice(property.price)}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4 border-t pt-3">
                    {property.beds > 0 && (
                      <div className="flex items-center gap-1">
                        <FiHome size={14} />
                        <span>{property.beds} Beds</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <FiMaximize2 size={14} />
                      <span>{property.area} m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiEye size={14} />
                      <span>{property.views || 0} views</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      to={`/property/${property._id}`}
                      className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleToggleStatus(property._id, property.status)}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                      title={property.status === 'active' ? 'Deactivate' : 'Activate'}
                      disabled={!property.approved}
                    >
                      {property.status === 'active' ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                    <button
                      onClick={() => handleDelete(property._id, property.title)}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      title="Delete property"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg transition ${
                          page === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return <span key={pageNum} className="px-2 py-2">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pagination.totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FiHome size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {filter === 'all' ? 'No properties yet' : `No ${filter} properties`}
          </h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all'
              ? 'Start adding properties to showcase them to potential buyers'
              : `You don't have any ${filter} properties. Try changing the filter.`}
          </p>
          {filter === 'all' ? (
            <Link
              to="/dashboard/add-property"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add Your First Property
            </Link>
          ) : (
            <button
              onClick={() => setFilter('all')}
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              View All Properties
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardMyListings;