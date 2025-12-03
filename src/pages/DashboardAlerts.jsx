import React, { useState, useEffect } from "react";
import { ToastContainer, useToast } from "../components/Toast";
import { FiBell, FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";

const API_BASE = "https://one01elver.onrender.com/api/alerts";

const DashboardAlerts = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const [alertData, setAlertData] = useState({
    name: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    category: "For Sale",
    beds: "",
    frequency: "instant"
  });

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (data.success) setAlerts(data.data);
    } catch (error) {
      addToast("Failed to load alerts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleChange = (e) => {
    setAlertData({ ...alertData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ...alertData,
          minPrice: Number(alertData.minPrice),
          maxPrice: Number(alertData.maxPrice),
          beds: Number(alertData.beds)
        })
      });

      const data = await res.json();
      if (data.success) {
        addToast("Property alert created successfully!", "success");
        setShowAddAlert(false);
        setAlertData({
          name: "",
          location: "",
          minPrice: "",
          maxPrice: "",
          propertyType: "",
          category: "For Sale",
          beds: "",
          frequency: "instant"
        });
        fetchAlerts();
      }
    } catch (error) {
      addToast("Error creating alert", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      if (data.success) {
        addToast("Alert deleted", "info");
        setAlerts(alerts.filter((a) => a._id !== id));
      }
    } catch (error) {
      addToast("Failed to delete alert", "error");
    }
  };

  return (
    <div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Alerts</h1>
          <p className="text-gray-600">Get notified when new properties match your criteria</p>
        </div>

        <button
          onClick={() => setShowAddAlert(!showAddAlert)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          <FiPlus size={20} /> Create Alert
        </button>
      </div>

      {showAddAlert && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Alert</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alert Name *</label>
                <input
                  type="text"
                  name="name"
                  value={alertData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  name="location"
                  value={alertData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Kano">Kano</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price (₦)</label>
                <input
                  type="number"
                  name="minPrice"
                  value={alertData.minPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₦)</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={alertData.maxPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  name="propertyType"
                  value={alertData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  name="beds"
                  value={alertData.beds}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Frequency</label>
              <select
                name="frequency"
                value={alertData.frequency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="instant">Instant</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Create Alert</button>
              <button type="button" onClick={() => setShowAddAlert(false)} className="px-6 py-3 border rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Alerts List */}
      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {alerts.map((alert) => (
            <div key={alert._id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiBell className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{alert.name}</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      {alert.location && <span>📍 {alert.location}</span>}
                      {alert.propertyType && <span>• {alert.propertyType}</span>}
                      {alert.beds && <span>• {alert.beds}+ Beds</span>}
                      {(alert.minPrice || alert.maxPrice) && (
                        <span>• ₦{alert.minPrice || "0"} - ₦{alert.maxPrice || "∞"}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Edit alert">
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(alert._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Frequency: <span className="font-semibold">{alert.frequency}</span>
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {alert.matches} new matches
                  </span>
                </div>
                <button className="text-blue-600 font-semibold text-sm">View Matches →</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <FiBell size={40} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No alerts yet</h3>
          <button
            onClick={() => setShowAddAlert(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            <FiPlus size={20} /> Create Your First Alert
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardAlerts;
