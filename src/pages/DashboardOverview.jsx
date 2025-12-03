import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { propertyAPI, inquiryAPI } from '../services';
import { FiHome, FiEye, FiHeart, FiMail, FiTrendingUp, FiPlus } from 'react-icons/fi';

const DashboardOverview = () => {
  const { user, isAgency, isConstruction } = useAuth();
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalInquiries: 0,
    favorites: 0
  });
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      if (isAgency || isConstruction) {
        // Fetch listings for professionals
        const propertiesRes = await propertyAPI.getMyProperties({ limit: 5 });
        setRecentProperties(propertiesRes.data);
        
        // Calculate stats
        const total = propertiesRes.pagination.total;
        const active = propertiesRes.data.filter(p => p.status === 'active').length;
        const views = propertiesRes.data.reduce((sum, p) => sum + (p.views || 0), 0);
        
        setStats({
          totalListings: total,
          activeListings: active,
          totalViews: views,
          totalInquiries: 0, // Will implement later
          favorites: 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.fullname}! 👋
        </h1>
        <p className="text-gray-600">
          {isAgency || isConstruction 
            ? 'Manage your property listings and track performance'
            : 'Find your dream property in Nigeria'
          }
        </p>
      </div>

      {/* Stats Grid */}
      {(isAgency || isConstruction) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiHome className="text-blue-600" size={24} />
              </div>
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalListings}</p>
            <p className="text-sm text-gray-600">Property Listings</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-green-600" size={24} />
              </div>
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.activeListings}</p>
            <p className="text-sm text-gray-600">Active Listings</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiEye className="text-purple-600" size={24} />
              </div>
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalViews}</p>
            <p className="text-sm text-gray-600">Property Views</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FiMail className="text-orange-600" size={24} />
              </div>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stats.totalInquiries}</p>
            <p className="text-sm text-gray-600">Inquiries</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {(isAgency || isConstruction) && (
          <Link
            to="/dashboard/add-property"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 hover:from-blue-700 hover:to-blue-800 transition shadow-md"
          >
            <FiPlus size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Add New Property</h3>
            <p className="text-blue-100">List a new property for sale or rent</p>
          </Link>
        )}

        <Link
          to="/dashboard/favorites"
          className="bg-white rounded-lg p-6 hover:shadow-lg transition border border-gray-200"
        >
          <FiHeart size={32} className="text-red-500 mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">My Favorites</h3>
          <p className="text-gray-600">View your saved properties</p>
        </Link>

        <Link
          to="/properties"
          className="bg-white rounded-lg p-6 hover:shadow-lg transition border border-gray-200"
        >
          <FiHome size={32} className="text-green-500 mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Browse Properties</h3>
          <p className="text-gray-600">Explore available properties</p>
        </Link>
      </div>

      {/* Recent Listings (for professionals) */}
      {(isAgency || isConstruction) && recentProperties.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Listings</h2>
            <Link
              to="/dashboard/my-listings"
              className="text-blue-600 hover:underline text-sm"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentProperties.map((property) => (
              <div key={property._id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                <img
                  src={property.images[0] || '/placeholder-property.jpg'}
                  alt={property.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{property.location}</p>
                  <p className="text-lg font-bold text-blue-600">{formatPrice(property.price)}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    property.status === 'active' 
                      ? 'bg-green-100 text-green-700'
                      : property.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {property.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">{property.views || 0} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
            <p className="text-lg font-semibold text-gray-900">{user?.phoneNumber || 'Not set'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
