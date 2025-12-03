import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiEye, FiHome, FiMail, FiTrendingUp, 
  FiDownload, FiMonitor, FiSmartphone, FiTablet 
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const API_BASE = 'https://one01elver.onrender.com/api/admin/analytics';

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');
  const [analytics, setAnalytics] = useState({
    visitors: {
      total: 0,
      today: 0,
      week: 0,
      month: 0,
      unique: 0,
      returning: 0,
      trend: []
    },
    users: {
      total: 0,
      newThisWeek: 0,
      newThisMonth: 0,
      byRole: { buyer: 0, agency: 0, construction: 0 },
      active: 0,
      inactive: 0,
      growth: []
    },
    properties: {
      total: 0,
      byStatus: { active: 0, pending: 0, sold: 0 },
      byType: {},
      byLocation: [],
      growth: []
    },
    engagement: {
      totalInquiries: 0,
      inquiryRate: 0,
      totalFavorites: 0,
      avgViewsPerProperty: 0,
      topProperties: []
    },
    devices: {
      mobile: 0,
      desktop: 0,
      tablet: 0
    },
    traffic: {
      sources: [],
      topPages: []
    }
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/overview?range=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setAnalytics(data.data);
      } else {
        toast.error(data.message || 'Failed to load analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/export?range=${timeRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Analytics exported successfully');
      } else {
        toast.error('Failed to export analytics');
      }
    } catch (error) {
      console.error('Error exporting analytics:', error);
      toast.error('Failed to export analytics');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Analytics</h1>
          <p className="text-gray-600">Comprehensive platform insights and metrics</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FiDownload size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Visitors Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🌐 Visitors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiEye className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.visitors.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Visitors</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FiTrendingUp className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.visitors.today.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Visitors Today</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FiUsers className="text-blue-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.visitors.week.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">This Week</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <FiEye className="text-orange-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.visitors.month.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
        </div>

        {/* Visitor Trend Chart */}
        {analytics.visitors.trend.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Visitor Trend</h3>
            <div className="space-y-3">
              {analytics.visitors.trend.map((day, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{day.date}</span>
                    <span className="text-sm font-bold text-gray-900">{day.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(day.count / Math.max(...analytics.visitors.trend.map(d => d.count))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Device Breakdown */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📱 Device Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiMonitor className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.devices.desktop}%</p>
                <p className="text-sm text-gray-600">Desktop</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiSmartphone className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.devices.mobile}%</p>
                <p className="text-sm text-gray-600">Mobile</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FiTablet className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analytics.devices.tablet}%</p>
                <p className="text-sm text-gray-600">Tablet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">👥 Registered Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.users.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.users.newThisWeek.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">New This Week</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.users.active.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {((analytics.users.active / analytics.users.total) * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Engagement Rate</p>
          </div>
        </div>

        {/* Users by Role */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Users by Role</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Buyers</span>
                <span className="text-sm font-bold text-gray-900">{analytics.users.byRole.buyer}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${(analytics.users.byRole.buyer / analytics.users.total) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Agencies</span>
                <span className="text-sm font-bold text-gray-900">{analytics.users.byRole.agency}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${(analytics.users.byRole.agency / analytics.users.total) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Construction</span>
                <span className="text-sm font-bold text-gray-900">{analytics.users.byRole.construction}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-purple-600 h-3 rounded-full"
                  style={{ width: `${(analytics.users.byRole.construction / analytics.users.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🏠 Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.properties.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Properties</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-green-600 mb-1">
              {analytics.properties.byStatus.active.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-yellow-600 mb-1">
              {analytics.properties.byStatus.pending.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-blue-600 mb-1">
              {analytics.properties.byStatus.sold.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Sold</p>
          </div>
        </div>

        {/* Top Locations */}
        {analytics.properties.byLocation.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Locations</h3>
            <div className="space-y-3">
              {analytics.properties.byLocation.slice(0, 5).map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{loc.location}</span>
                  <span className="text-sm font-bold text-gray-900">{loc.count} properties</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Engagement Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FiMail className="text-green-600" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.engagement.totalInquiries.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Inquiries</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.engagement.inquiryRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-600">Inquiry Rate</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.engagement.totalFavorites.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Favorites</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {analytics.engagement.avgViewsPerProperty.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Avg Views/Property</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;