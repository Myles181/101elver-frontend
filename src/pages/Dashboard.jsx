import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import DashboardOverview from './DashboardOverview';
import DashboardFavorites from './DashboardFavorites';
import DashboardAlerts from './DashboardAlerts';
import DashboardSettings from './DashboardSettings';
import DashboardMyListings from './DashboardMyListings';
import DashboardAddProperty from './DashboardAddProperty';
import DashboardReceivedInquiries from './DashboardReceivedInquiries';
import DashboardAnalytics from './DashboardAnalytics';

const Dashboard = () => {
  const { isAgency, isConstruction } = useAuth();

  return (
    <DashboardLayout>
      <Routes>
        {/* Dashboard home */}
        <Route index element={<DashboardOverview />} />

        {/* Common routes for all users */}
        <Route path="favorites" element={<DashboardFavorites />} />
        <Route path="alerts" element={<DashboardAlerts />} />
        <Route path="settings" element={<DashboardSettings />} />

        {/* Agency/Construction only routes */}
        {(isAgency || isConstruction) && (
          <>
            <Route path="my-listings" element={<DashboardMyListings />} />
            <Route path="add-property" element={<DashboardAddProperty />} />
            <Route path="received-inquiries" element={<DashboardReceivedInquiries />} />
            <Route path="analytics" element={<DashboardAnalytics />} />
          </>
        )}
        
        {/* Redirect unknown routes to dashboard home */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
