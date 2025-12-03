import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { FiAlertCircle, FiLoader } from 'react-icons/fi';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAdminAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FiLoader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Check if user is admin
  if (user.role !== 'admin') {
    console.log("User: ", user);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin dashboard. This area is restricted to administrators only.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Homepage
            </a>
            <a
              href="/dashboard"
              className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              My Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  // User is admin, render the protected content
  return children;
};

export default AdminRoute;