import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, FiHome, FiMail, FiTrendingUp, FiClock, 
  FiCheckCircle, FiAlertCircle, FiEye, FiUserPlus 
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const API_BASE = 'https://one01elver.onrender.com/api/admin';

const AdminOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalInquiries: 0,
    pendingApprovals: 0,
    newVisitorsToday: 0,
    newVisitorsWeek: 0,
    activeUsers: 0,
    usersByRole: { buyer: 0, agency: 0, construction: 0 },
    propertiesByStatus: { active: 0, pending: 0, rejected: 0 }
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/overview`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
        setRecentActivity(data.data.recentActivity || []);
      } else {
        toast.error(data.message || 'Failed to load overview');
      }
    } catch (error) {
      console.error('Error fetching admin overview:', error);
      toast.error('Failed to load admin overview');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiUsers className="text-blue-600" size={24} />
            </div>
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.totalUsers.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Registered Users</p>
          <div className="flex gap-2 mt-3 text-xs">
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
              Buyers: {stats.usersByRole?.buyer || 0}
            </span>
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
              Agencies: {stats.usersByRole?.agency || 0}
            </span>
          </div>
        </div>

        {/* Total Properties */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiHome className="text-green-600" size={24} />
            </div>
            <span className="text-xs text-gray-500">Properties</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.totalProperties.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Total Listed</p>
          <div className="flex gap-2 mt-3 text-xs">
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
              Active: {stats.propertiesByStatus?.active || 0}
            </span>
            <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
              Pending: {stats.propertiesByStatus?.pending || 0}
            </span>
          </div>
        </div>

        {/* New Visitors */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiEye className="text-purple-600" size={24} />
            </div>
            <span className="text-xs text-gray-500">Visitors</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.newVisitorsToday.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Today's Visitors</p>
          <div className="mt-3 text-xs text-gray-500">
            This week: <span className="font-semibold text-gray-900">
              {stats.newVisitorsWeek.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Pending Approvals */}
        <Link 
          to="/admin/properties?status=pending"
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-md p-6 hover:shadow-lg transition text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FiAlertCircle className="text-white" size={24} />
            </div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
              Action Required
            </span>
          </div>
          <p className="text-4xl font-bold mb-1">{stats.pendingApprovals}</p>
          <p className="text-white/90">Pending Approvals</p>
          <p className="text-sm text-white/80 mt-2">Click to review →</p>
        </Link>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiMail className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalInquiries.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Inquiries</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiUserPlus className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.activeUsers.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Active Users (7 days)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">User Engagement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Link
          to="/admin/properties?status=pending"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <FiCheckCircle className="text-orange-600" size={24} />
            </div>
            {stats.pendingApprovals > 0 && (
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                {stats.pendingApprovals}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Approve Properties</h3>
          <p className="text-gray-600 text-sm">Review and approve pending listings</p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <FiUsers className="text-blue-600" size={24} />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Manage Users</h3>
          <p className="text-gray-600 text-sm">View and manage all registered users</p>
        </Link>

        <Link
          to="/admin/analytics"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <FiTrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">View Analytics</h3>
          <p className="text-gray-600 text-sm">Detailed insights and reports</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <Link to="/admin/logs" className="text-blue-600 hover:underline text-sm">
            View All
          </Link>
        </div>

        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'user_registered' ? 'bg-blue-100' :
                  activity.type === 'property_submitted' ? 'bg-green-100' :
                  activity.type === 'property_approved' ? 'bg-green-100' :
                  activity.type === 'inquiry_received' ? 'bg-purple-100' :
                  'bg-gray-100'
                }`}>
                  {activity.type === 'user_registered' && <FiUserPlus className="text-blue-600" size={20} />}
                  {activity.type === 'property_submitted' && <FiHome className="text-green-600" size={20} />}
                  {activity.type === 'property_approved' && <FiCheckCircle className="text-green-600" size={20} />}
                  {activity.type === 'inquiry_received' && <FiMail className="text-purple-600" size={20} />}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <FiClock size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <FiClock size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;