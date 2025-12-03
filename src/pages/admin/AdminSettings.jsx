import React, { useState, useEffect } from 'react';
import { 
  FiGlobe, FiMail, FiSettings, FiShield, FiDatabase, 
  FiZap, FiAlertCircle, FiCheckCircle 
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const API_BASE = 'https://one01elver.onrender.com/api/admin/settings';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('site');
  
  const [settings, setSettings] = useState({
    // Site Settings
    site: {
      name: '101Elver',
      tagline: 'Find Your Dream Property',
      description: 'Nigeria\'s premier real estate platform',
      contactEmail: 'contact@101elver.com',
      supportEmail: 'support@101elver.com',
      supportPhone: '+234 XXX XXX XXXX',
      address: 'Lagos, Nigeria'
    },
    
    // Property Settings
    property: {
      autoApprove: false,
      requireAdminApproval: true,
      maxPropertiesPerAgency: 50,
      propertyExpiryDays: 90,
      allowDuplicates: false,
      minImages: 3,
      maxImages: 20,
      minPrice: 100000,
      maxPrice: 10000000000
    },
    
    // User Settings
    user: {
      emailVerificationRequired: true,
      phoneVerificationRequired: false,
      maxLoginAttempts: 5,
      sessionTimeout: 30, // minutes
      allowGoogleLogin: true,
      allowFacebookLogin: false,
      newUserAutoApprove: true
    },
    
    // Email Settings
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@101elver.com',
      fromName: '101Elver',
      enableNotifications: true
    },
    
    // System Settings
    system: {
      maintenanceMode: false,
      maintenanceMessage: 'We\'re currently performing scheduled maintenance. We\'ll be back soon!',
      debugMode: false,
      cacheEnabled: true,
      cacheDuration: 3600, // seconds
      maxUploadSize: 5, // MB
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'webp', 'pdf']
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(API_BASE, {
        headers: { Authorization: `Bearer ${adtoken}` }
      });

      const data = await response.json();
      if (data.success) {
        setSettings(data.data);
      } else {
        toast.error(data.message || 'Failed to load settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(API_BASE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adtoken}`
        },
        body: JSON.stringify(settings)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error(data.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleToggle = (section, field) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences</p>
        </div>
        
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <FiCheckCircle size={18} />
              Save All Changes
            </>
          )}
        </button>
      </div>

      {/* Maintenance Mode Alert */}
      {settings.system.maintenanceMode && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <div className="flex items-center">
            <FiAlertCircle className="text-yellow-500 mr-3" size={24} />
            <div>
              <p className="font-bold text-yellow-800">Maintenance Mode Active</p>
              <p className="text-yellow-700 text-sm">The site is currently in maintenance mode. Users cannot access the platform.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'site', label: 'Site Settings', icon: FiGlobe },
              { id: 'property', label: 'Property Settings', icon: FiSettings },
              { id: 'user', label: 'User Settings', icon: FiShield },
              { id: 'email', label: 'Email Settings', icon: FiMail },
              { id: 'system', label: 'System', icon: FiDatabase }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Site Settings */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Site Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.site.name}
                  onChange={(e) => handleChange('site', 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={settings.site.tagline}
                  onChange={(e) => handleChange('site', 'tagline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={settings.site.description}
                  onChange={(e) => handleChange('site', 'description', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.site.contactEmail}
                    onChange={(e) => handleChange('site', 'contactEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    value={settings.site.supportEmail}
                    onChange={(e) => handleChange('site', 'supportEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                  <input
                    type="tel"
                    value={settings.site.supportPhone}
                    onChange={(e) => handleChange('site', 'supportPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={settings.site.address}
                    onChange={(e) => handleChange('site', 'address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Property Settings */}
          {activeTab === 'property' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Management</h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Auto-Approve Properties</p>
                    <p className="text-sm text-gray-600">Automatically approve new property listings without admin review</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.property.autoApprove}
                    onChange={() => handleToggle('property', 'autoApprove')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Require Admin Approval</p>
                    <p className="text-sm text-gray-600">All properties must be approved by an admin before going live</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.property.requireAdminApproval}
                    onChange={() => handleToggle('property', 'requireAdminApproval')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Allow Duplicate Properties</p>
                    <p className="text-sm text-gray-600">Allow users to list properties with similar addresses</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.property.allowDuplicates}
                    onChange={() => handleToggle('property', 'allowDuplicates')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Properties Per Agency</label>
                  <input
                    type="number"
                    value={settings.property.maxPropertiesPerAgency}
                    onChange={(e) => handleChange('property', 'maxPropertiesPerAgency', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Expiry (Days)</label>
                  <input
                    type="number"
                    value={settings.property.propertyExpiryDays}
                    onChange={(e) => handleChange('property', 'propertyExpiryDays', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Images Required</label>
                  <input
                    type="number"
                    value={settings.property.minImages}
                    onChange={(e) => handleChange('property', 'minImages', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Images Allowed</label>
                  <input
                    type="number"
                    value={settings.property.maxImages}
                    onChange={(e) => handleChange('property', 'maxImages', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Price (₦)</label>
                  <input
                    type="number"
                    value={settings.property.minPrice}
                    onChange={(e) => handleChange('property', 'minPrice', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Price (₦)</label>
                  <input
                    type="number"
                    value={settings.property.maxPrice}
                    onChange={(e) => handleChange('property', 'maxPrice', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* User Settings */}
          {activeTab === 'user' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">User Management</h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Email Verification Required</p>
                    <p className="text-sm text-gray-600">Users must verify their email before accessing the platform</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.user.emailVerificationRequired}
                    onChange={() => handleToggle('user', 'emailVerificationRequired')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Phone Verification Required</p>
                    <p className="text-sm text-gray-600">Users must verify their phone number</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.user.phoneVerificationRequired}
                    onChange={() => handleToggle('user', 'phoneVerificationRequired')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Allow Google Login</p>
                    <p className="text-sm text-gray-600">Enable Google OAuth authentication</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.user.allowGoogleLogin}
                    onChange={() => handleToggle('user', 'allowGoogleLogin')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Auto-Approve New Users</p>
                    <p className="text-sm text-gray-600">Automatically activate new user accounts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.user.newUserAutoApprove}
                    onChange={() => handleToggle('user', 'newUserAutoApprove')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.user.maxLoginAttempts}
                    onChange={(e) => handleChange('user', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Account will be locked after this many failed attempts</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.user.sessionTimeout}
                    onChange={(e) => handleChange('user', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Configuration</h3>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Email settings are sensitive. Ensure SMTP credentials are correct.
                </p>
              </div>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold text-gray-900">Enable Email Notifications</p>
                  <p className="text-sm text-gray-600">Send automated emails for important events</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.email.enableNotifications}
                  onChange={() => handleToggle('email', 'enableNotifications')}
                  className="w-5 h-5 text-red-600 rounded"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                  <input
                    type="text"
                    value={settings.email.smtpHost}
                    onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                  <input
                    type="number"
                    value={settings.email.smtpPort}
                    onChange={(e) => handleChange('email', 'smtpPort', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                  <input
                    type="text"
                    value={settings.email.smtpUser}
                    onChange={(e) => handleChange('email', 'smtpUser', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                  <input
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) => handleChange('email', 'smtpPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                  <input
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => handleChange('email', 'fromEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                  <input
                    type="text"
                    value={settings.email.fromName}
                    onChange={(e) => handleChange('email', 'fromName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">System Configuration</h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition">
                  <div>
                    <p className="font-semibold text-red-900">⚠️ Maintenance Mode</p>
                    <p className="text-sm text-red-700">Temporarily disable public access to the platform</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.system.maintenanceMode}
                    onChange={() => handleToggle('system', 'maintenanceMode')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>

                {settings.system.maintenanceMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Message</label>
                    <textarea
                      value={settings.system.maintenanceMessage}
                      onChange={(e) => handleChange('system', 'maintenanceMessage', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )}

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Debug Mode</p>
                    <p className="text-sm text-gray-600">Enable detailed error logging (development only)</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.system.debugMode}
                    onChange={() => handleToggle('system', 'debugMode')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <div>
                    <p className="font-semibold text-gray-900">Enable Caching</p>
                    <p className="text-sm text-gray-600">Cache frequently accessed data for better performance</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.system.cacheEnabled}
                    onChange={() => handleToggle('system', 'cacheEnabled')}
                    className="w-5 h-5 text-red-600 rounded"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cache Duration (seconds)</label>
                  <input
                    type="number"
                    value={settings.system.cacheDuration}
                    onChange={(e) => handleChange('system', 'cacheDuration', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Upload Size (MB)</label>
                  <input
                    type="number"
                    value={settings.system.maxUploadSize}
                    onChange={(e) => handleChange('system', 'maxUploadSize', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
                <input
                  type="text"
                  value={settings.system.allowedFileTypes.join(', ')}
                  onChange={(e) => handleChange('system', 'allowedFileTypes', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="jpg, png, pdf"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated list of allowed file extensions</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button at Bottom */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">Save Changes</p>
          <p className="text-sm text-gray-600">Make sure to save your changes before leaving this page</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <FiCheckCircle size={18} />
              Save All Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;