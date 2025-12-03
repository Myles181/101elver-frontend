import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, FiHeart, FiBell, FiSettings, FiLogOut, FiMenu, FiX,
  FiList, FiPlus, FiMail, FiBarChart2, FiUser
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAgency, isConstruction } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items for all users
  const commonNavItems = [
    { path: '/dashboard', icon: FiHome, label: 'Overview', exact: true },
    { path: '/dashboard/favorites', icon: FiHeart, label: 'Favorites' },
    { path: '/dashboard/alerts', icon: FiBell, label: 'Alerts' },
    { path: '/dashboard/settings', icon: FiSettings, label: 'Settings' },
  ];

  // Additional items for agency/construction
  const professionalNavItems = [
    { path: '/dashboard/my-listings', icon: FiList, label: 'My Listings' },
    { path: '/dashboard/add-property', icon: FiPlus, label: 'Add Property' },
    { path: '/dashboard/received-inquiries', icon: FiMail, label: 'Inquiries' },
    { path: '/dashboard/analytics', icon: FiBarChart2, label: 'Analytics' },
  ];

  const navItems = (isAgency || isConstruction) 
    ? [...commonNavItems.slice(0, 1), ...professionalNavItems, ...commonNavItems.slice(1)]
    : commonNavItems;

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header - Mobile Friendly */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">101</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                Elver
              </span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* User Info - Hidden on Mobile */}
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">
                {user?.fullname}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>

            {/* Profile Picture/Avatar */}
            <div className="relative group">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullname}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {user?.fullname?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Mobile Tooltip - Shows on hover/tap */}
              <div className="md:hidden absolute right-0 top-full mt-2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <div className="font-semibold">{user?.fullname}</div>
                <div className="text-gray-300 capitalize">{user?.role}</div>
                <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Main Navigation */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-20 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:top-[73px] lg:h-[calc(100vh-73px)]
        `}>
          <nav className="p-4 space-y-2 overflow-y-auto h-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${active 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-8"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Right Sidebar - Quick Stats (Optional) */}
        {(isAgency || isConstruction) && (
          <aside className="hidden xl:block w-80 bg-white shadow-lg sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Listings</p>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Active Listings</p>
                  <p className="text-2xl font-bold text-green-600">0</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">0</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Inquiries</p>
                  <p className="text-2xl font-bold text-orange-600">0</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Link
                    to="/dashboard/add-property"
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    + Add New Property
                  </Link>
                  <Link
                    to="/properties"
                    className="block text-center border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
                  >
                    Browse Properties
                  </Link>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Account</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-900 truncate">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{user?.phoneNumber || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Member Since</p>
                    <p className="text-sm text-gray-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
