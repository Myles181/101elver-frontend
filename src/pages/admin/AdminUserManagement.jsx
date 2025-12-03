import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiUsers, FiSearch, FiFilter, FiRefreshCw, FiTrash2, 
  FiLock, FiUnlock, FiDownload, FiEye, FiX
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const API_BASE = 'https://one01elver.onrender.com/api/admin/users';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const adtoken = localStorage.getItem('adtoken');
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.role !== 'all' && { role: filters.role }),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`${API_BASE}?${params}`, {
        headers: { Authorization: `Bearer ${adtoken}` }
      });

      const data = await response.json();
      
      if (data.success) {
        // Handle the response structure: { data: { users, pagination }, ... }
        const responseData = data.data || {};
        const usersData = responseData.users || [];
        const paginationData = responseData.pagination || {};

        setUsers(usersData);
        setPagination(prev => ({
          ...prev,
          total: paginationData.total || 0,
          totalPages: paginationData.totalPages || 0
        }));
      } else {
        toast.error(data.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters, searchTerm]);

  // Initial fetch only
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPagination(prev => ({ ...prev, page: 1 }));
    // Trigger fetch after state updates
    setTimeout(() => fetchUsers(), 0);
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    setTimeout(() => fetchUsers(), 0);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({ role: 'all', status: 'all' });
    setSearchTerm('');
    setSearchInput('');
    setPagination(prev => ({ ...prev, page: 1 }));
    setTimeout(() => fetchUsers(), 0);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    setTimeout(() => fetchUsers(), 0);
  };

  const handleSuspendUser = async (userId, username, isSuspended) => {
    const action = isSuspended ? 'unsuspend' : 'suspend';
    if (!window.confirm(`Are you sure you want to ${action} ${username}?`)) return;

    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/${userId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adtoken}` 
        },
        body: JSON.stringify({ isSuspended: !isSuspended })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`User ${username} ${action}ed`);
        fetchUsers();
      } else {
        toast.error(data.message || `Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to DELETE ${username}? This action cannot be undone.`)) return;

    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adtoken}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`User ${username} deleted`);
        fetchUsers();
      } else {
        toast.error(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      toast.error('No users selected');
      return;
    }

    if (!window.confirm(`Are you sure you want to ${action} ${selectedUsers.length} user(s)?`)) return;

    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/bulk-${action}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adtoken}` 
        },
        body: JSON.stringify({ userIds: selectedUsers })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`${selectedUsers.length} user(s) ${action}ed`);
        setSelectedUsers([]);
        fetchUsers();
      } else {
        toast.error(data.message || `Failed to ${action} users`);
      }
    } catch (error) {
      console.error(`Error ${action}ing users:`, error);
      toast.error(`Failed to ${action} users`);
    }
  };

  const handleExportUsers = async () => {
    try {
      const adtoken = localStorage.getItem('adtoken');
      const response = await fetch(`${API_BASE}/export`, {
        headers: { Authorization: `Bearer ${adtoken}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Users exported successfully');
      } else {
        toast.error('Failed to export users');
      }
    } catch (error) {
      console.error('Error exporting users:', error);
      toast.error('Failed to export users');
    }
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(u => u._id));
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-700',
      'super-admin': 'bg-purple-100 text-purple-700',
      agency: 'bg-blue-100 text-blue-700',
      agent: 'bg-blue-100 text-blue-700',
      construction: 'bg-green-100 text-green-700',
      buyer: 'bg-gray-100 text-gray-700',
      user: 'bg-gray-100 text-gray-700'
    };
    return colors[role] || colors.user;
  };

  const getStatusBadge = (user) => {
    if (user.isSuspended) {
      return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Suspended</span>;
    }
    if (!user.emailVerified) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Unverified</span>;
    }
    return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>;
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">{pagination.total} total users</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Reload
          </button>
          <button
            onClick={handleExportUsers}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiDownload size={18} />
            Export Users
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <FiFilter size={18} />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t items-center">
            <select
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="buyer">Buyer</option>
              <option value="agent">Agent</option>
              <option value="agency">Agency</option>
              <option value="construction">Construction</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>

            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <span className="text-sm font-semibold text-blue-900">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('suspend')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm"
              >
                Suspend Selected
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedUsers([])}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading users...</p>
        </div>
      ) : users.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === users.length && users.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Properties</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Last Login</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => toggleSelectUser(user._id)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.fullname}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {user.fullname?.charAt(0)?.toUpperCase() || '?'}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{user.fullname || 'N/A'}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {getStatusBadge(user)}
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900 font-semibold">
                        {user.propertiesCount || 0}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">{formatDate(user.createdAt)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setViewUserModal(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View details"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => handleSuspendUser(user._id, user.fullname, user.isSuspended)}
                          className={`p-2 rounded-lg transition ${
                            user.isSuspended 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-orange-600 hover:bg-orange-50'
                          }`}
                          title={user.isSuspended ? 'Unsuspend user' : 'Suspend user'}
                        >
                          {user.isSuspended ? <FiUnlock size={18} /> : <FiLock size={18} />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id, user.fullname)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete user"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-gray-600">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} users
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FiUsers size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* View User Modal */}
      {viewUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">User Details</h3>
              <button
                onClick={() => setViewUserModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-6">
                {viewUserModal.profilePicture ? (
                  <img
                    src={viewUserModal.profilePicture}
                    alt={viewUserModal.fullname}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-2xl">
                      {viewUserModal.fullname?.charAt(0)?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{viewUserModal.fullname}</h4>
                  <p className="text-gray-600">@{viewUserModal.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold">{viewUserModal.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-semibold">{viewUserModal.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Role</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleBadgeColor(viewUserModal.role)}`}>
                    {viewUserModal.role}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  {getStatusBadge(viewUserModal)}
                </div>
                {viewUserModal.companyName && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Company</p>
                    <p className="font-semibold">{viewUserModal.companyName}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Joined</p>
                  <p className="font-semibold">{formatDate(viewUserModal.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Login</p>
                  <p className="font-semibold">
                    {viewUserModal.lastLogin ? formatDate(viewUserModal.lastLogin) : 'Never'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Properties</p>
                  <p className="font-semibold">{viewUserModal.propertiesCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email Verified</p>
                  <p className="font-semibold">{viewUserModal.emailVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;