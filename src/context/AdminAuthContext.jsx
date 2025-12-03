// context/AdminAuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services';

const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('aduser');
    const token = localStorage.getItem('adtoken');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored admin user:', error);
        localStorage.removeItem('aduser');
        localStorage.removeItem('adtoken');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authAPI.adlogin(email, password);
    setUser(response.user);
    localStorage.setItem('aduser', JSON.stringify(response.user));
    localStorage.setItem('adtoken', response.token);
    return response;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aduser');
    localStorage.removeItem('adtoken');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('aduser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}