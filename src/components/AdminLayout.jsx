import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { 
  FiHome, FiUsers, FiCheckCircle, FiBarChart2, FiSettings, 
  FiLogOut, FiMenu, FiX, FiMail, FiActivity, FiAlertCircle
} from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Admin navigation items
  const adminNavItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Overview', exact: true },
    { path: '/admin/users', icon: FiUsers, label: 'User Management' },
    { path: '/admin/properties', icon: FiCheckCircle, label: 'Property Approvals', badge: 12 },
    // { path: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
    { path: '/admin/inquiries', icon: FiMail, label: 'All Inquiries' },
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
    { path: '/admin/logs', icon: FiActivity, label: 'Activity Logs' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Check if user is admin
  console.log("User: ", user);
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access the admin dashboard.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
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
            
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">A</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent hidden sm:block">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* User Info */}
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-gray-900">{user?.fullname}</p>
              <p className="text-xs text-red-600 font-semibold uppercase">Admin</p>
            </div>

            {/* Profile Avatar */}
            <div className="relative group">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.fullname}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-red-500"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center ring-2 ring-red-500">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {user?.fullname?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Mobile Tooltip */}
              <div className="md:hidden absolute right-0 top-full mt-2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <div className="font-semibold">{user?.fullname}</div>
                <div className="text-red-400">Admin</div>
                <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </div>
            </div>

            {/* Back to Site Link */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container with proper top spacing */}
      <div className="flex pt-[57px] sm:pt-[73px]">
        {/* Left Sidebar - Admin Navigation */}
        <aside className={`
          fixed top-[57px] sm:top-[73px] left-0 h-[calc(100vh-57px)] sm:h-[calc(100vh-73px)] w-64 bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out z-20
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:sticky
        `}>
          <nav className="p-4 space-y-1 overflow-y-auto h-full">
            {/* Admin Badge */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide">Admin Dashboard</p>
              <p className="text-lg font-bold">Welcome Back!</p>
            </div>

            {/* Navigation Items */}
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all group
                    ${active 
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={active ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  {/* Badge for pending items */}
                  {item.badge && (
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-bold
                      ${active 
                        ? 'bg-white text-red-600' 
                        : 'bg-red-100 text-red-600'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
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
        <main className="flex-1 w-full lg:w-auto p-4 lg:p-8 min-h-[calc(100vh-57px)] sm:min-h-[calc(100vh-73px)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;