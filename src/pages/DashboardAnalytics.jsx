import React, { useState, useEffect } from "react";
import { FiTrendingUp, FiEye, FiMessageSquare, FiHeart, FiDownload } from "react-icons/fi";
import toast from "react-hot-toast";

const API_BASE = "https://one01elver.onrender.com/api/analytics";

const DashboardAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalInquiries: 0,
    totalFavorites: 0,
    avgResponseTime: "0 hours",
    viewsChange: "0%",
    inquiriesChange: "0%",
    favoritesChange: "0%"
  });
  const [weeklyData, setWeeklyData] = useState([]);
  const [topProperties, setTopProperties] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/overview?range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setStats({
          totalViews: data.data.totalViews || 0,
          totalInquiries: data.data.totalInquiries || 0,
          totalFavorites: data.data.totalFavorites || 0,
          avgResponseTime: data.data.avgResponseTime || "0 hours",
          viewsChange: data.data.viewsChange || "0%",
          inquiriesChange: data.data.inquiriesChange || "0%",
          favoritesChange: data.data.favoritesChange || "0%"
        });
        setWeeklyData(data.data.weeklyData || []);
        setTopProperties(data.data.topProperties || []);
      } else {
        toast.error(data.message || "Failed to load analytics");
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics");
      // Set default empty data on error
      setStats({
        totalViews: 0,
        totalInquiries: 0,
        totalFavorites: 0,
        avgResponseTime: "N/A",
        viewsChange: "0%",
        inquiriesChange: "0%",
        favoritesChange: "0%"
      });
      setWeeklyData([]);
      setTopProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/export?range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("Analytics exported successfully");
      } else {
        toast.error("Failed to export analytics");
      }
    } catch (error) {
      console.error("Error exporting analytics:", error);
      toast.error("Failed to export analytics");
    }
  };

  const maxViews = Math.max(...weeklyData.map(d => d.views || 0), 1);
  const maxInquiries = Math.max(...weeklyData.map(d => d.inquiries || 0), 1);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your property performance and insights</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <FiDownload size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiEye className="text-blue-600" size={24} />
            </div>
            <span className={`text-sm font-semibold ${
              stats.viewsChange.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.viewsChange}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.totalViews.toLocaleString()}
          </p>
          <p className="text-gray-600">Total Views</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiMessageSquare className="text-green-600" size={24} />
            </div>
            <span className={`text-sm font-semibold ${
              stats.inquiriesChange.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.inquiriesChange}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.totalInquiries.toLocaleString()}
          </p>
          <p className="text-gray-600">Total Inquiries</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiHeart className="text-red-600" size={24} />
            </div>
            <span className={`text-sm font-semibold ${
              stats.favoritesChange.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.favoritesChange}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.totalFavorites.toLocaleString()}
          </p>
          <p className="text-gray-600">Total Favorites</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{stats.avgResponseTime}</p>
          <p className="text-gray-600">Avg Response Time</p>
        </div>
      </div>

      {/* Charts */}
      {weeklyData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Views</h3>
            <div className="space-y-4">
              {weeklyData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">{data.day}</span>
                    <span className="text-sm font-bold text-gray-900">{data.views || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${((data.views || 0) / maxViews) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiries Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Inquiries</h3>
            <div className="space-y-4">
              {weeklyData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-600">{data.day}</span>
                    <span className="text-sm font-bold text-gray-900">{data.inquiries || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all"
                      style={{ width: `${((data.inquiries || 0) / maxInquiries) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center mb-8">
          <p className="text-gray-500">No weekly data available for the selected period</p>
        </div>
      )}

      {/* Top Performing Properties */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Properties</h3>
        {topProperties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Property</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Views</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Inquiries</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Favorites</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topProperties.map((property, idx) => (
                  <tr key={property._id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-400">#{idx + 1}</span>
                        <img 
                          src={property.images?.[0] || property.image || '/placeholder-property.jpg'} 
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-property.jpg';
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{property.title}</span>
                          <span className="text-sm text-gray-500">{formatPrice(property.price)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">{property.views || 0}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">{property.inquiries || 0}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-gray-900">{property.favorites || 0}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-green-600">
                        {property.views > 0 
                          ? ((property.inquiries / property.views) * 100).toFixed(1) 
                          : '0.0'}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No property data available yet</p>
            <p className="text-sm text-gray-400 mt-2">Add properties to start tracking performance</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;