import React, { useState, useEffect } from "react";
import { ToastContainer, useToast } from "../components/Toast";
import { FiUser, FiMail, FiPhone, FiLock, FiGlobe, FiBriefcase } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const DashboardSettings = () => {
  const { toasts, addToast, removeToast } = useToast();
  const { user: authUser } = useAuth(); // Get user from auth context
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    username: "",
    companyName: "",
    bio: "",
    language: "en",
  });

  const [notifications, setNotifications] = useState({
    propertyMatches: true,
    priceChanges: true,
    marketing: false,
    newsletter: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load Profile From Backend
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://one01elver.onrender.com/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Profile API Response:", data);

      if (data.success) {
        const user = data.data;
        
        setProfileData({
          fullname: user.fullname || "",
          email: user.email || "",
          username: user.username || "",
          companyName: user.companyName || "",
          bio: user.bio || "",
          language: user.languages?.[0] || "en",
        });

        setNotifications(user.emailNotifications || {
          propertyMatches: true,
          priceChanges: true,
          marketing: false,
          newsletter: true
        });

        addToast("Profile loaded successfully!", "success");
      } else {
        addToast(data.message || "Failed to load profile", "error");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      addToast("Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Profile Form
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://one01elver.onrender.com/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        addToast("Profile updated successfully!", "success");
        // Update local storage if needed
        const localUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...localUser, ...profileData }));
      } else {
        addToast(data.message || "Failed to update profile", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      addToast("Failed to update profile", "error");
    }
  };

  // Handle Password Form
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast("Passwords don't match!", "error");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      addToast("Password must be at least 6 characters", "error");
      return;
    }

    try {
      const response = await fetch("https://one01elver.onrender.com/api/users/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        addToast("Password changed successfully!", "success");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        addToast(data.message || "Failed to change password", "error");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      addToast("Failed to change password", "error");
    }
  };

  // Handle notification changes
  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePreferencesSubmit = async () => {
    try {
      const response = await fetch("https://one01elver.onrender.com/api/users/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          language: profileData.language,
          emailNotifications: notifications
        }),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        addToast("Preferences saved!", "success");
      } else {
        addToast(data.message || "Failed to save preferences", "error");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      addToast("Failed to save preferences", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 font-semibold border-b-2 transition ${
                  activeTab === "profile"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`px-6 py-4 font-semibold border-b-2 transition ${
                  activeTab === "password"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Password & Security
              </button>
              <button
                onClick={() => setActiveTab("preferences")}
                className={`px-6 py-4 font-semibold border-b-2 transition ${
                  activeTab === "preferences"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Preferences
              </button>
            </nav>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullname"
                    value={profileData.fullname}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    disabled
                    title="Email cannot be changed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {(authUser?.role === "agency" || authUser?.role === "construction") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="companyName"
                      value={profileData.companyName}
                      onChange={handleProfileChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Password Requirements:</strong> At least 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Change Password
              </button>
            </form>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    name="language"
                    value={profileData.language}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="tr">Turkish</option>
                    <option value="ru">Russian</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.propertyMatches}
                    onChange={() => handleNotificationChange('propertyMatches')}
                    className="w-5 h-5 text-blue-600 rounded" 
                  />
                  <span className="text-gray-700">New property matches</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.priceChanges}
                    onChange={() => handleNotificationChange('priceChanges')}
                    className="w-5 h-5 text-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Price changes on saved properties</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                    className="w-5 h-5 text-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Marketing emails</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.newsletter}
                    onChange={() => handleNotificationChange('newsletter')}
                    className="w-5 h-5 text-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Weekly newsletter</span>
                </label>
              </div>

              <button
                onClick={handlePreferencesSubmit}
                type="button"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;