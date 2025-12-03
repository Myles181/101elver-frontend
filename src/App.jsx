// App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import SearchResults from "./pages/SearchResults";
import AboutUs from "./pages/AboutUs";
import ContactUsPage from "./pages/ContactUsPage";
import AgentsListing from "./pages/AgentsListing";
import AgentProfile from "./pages/AgentProfile";
import HowItWorks from "./pages/HowItWorks";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
// Admin Pages
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUserManagement from './pages/admin/AdminUserManagement';
import AdminPropertyApproval from './pages/admin/AdminPropertyApproval';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import AdminLogin from "./pages/AdminLogin";

// Visitor Tracking
import { initVisitorTracking } from './utils/visitorTracking';

function App() {
  useEffect(() => {
    initVisitorTracking();
  }, []);

  return (
    <BrowserRouter>
      {/* Wrap everything in BOTH providers */}
      <AuthProvider>
        <AdminAuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/agents" element={<AgentsListing />} />
            <Route path="/agent/:id" element={<AgentProfile />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Admin Login - Public */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Routes - Protected */}
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminOverview />} />
                      <Route path="users" element={<AdminUserManagement />} />
                      <Route path="properties" element={<AdminPropertyApproval />} />
                      <Route path="analytics" element={<AdminAnalytics />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Routes>
                  </AdminLayout>
                </AdminRoute>
              }
            />
          </Routes>
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;