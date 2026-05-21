"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus, Mail, Phone, MapPin, X, Calendar, Package, CreditCard, RefreshCw } from "lucide-react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // Poll users list every second
  useEffect(() => {
    const syncData = async () => {
      try {
        const res = await fetch('/api/users');
        const { users: storedUsers } = await res.json();
        if (storedUsers) {
          const formatted = storedUsers
            .filter((u: any) => u.role !== 'ADMIN')
            .map((u: any) => {
              const date = new Date(u.createdAt);
              const joined = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              const diffMs = Date.now() - date.getTime();
              const diffMins = Math.floor(diffMs / 60000);
              let lastActive = "Just now";
              if (diffMins >= 1 && diffMins < 60) lastActive = `${diffMins}m ago`;
              else if (diffMins >= 60) {
                const diffHours = Math.floor(diffMins / 60);
                if (diffHours < 24) lastActive = `${diffHours}h ago`;
                else lastActive = date.toLocaleDateString();
              }
              return { ...u, joined, lastActive };
            });

          setUsers(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(formatted)) return formatted;
            return prev;
          });
        }
      } catch (e) {
        console.error("Sync users error:", e);
      }
    };
    syncData();
    const interval = setInterval(syncData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load per-user detail when a row is clicked
  const openUserDetail = async (user: any) => {
    setSelectedUser(user);
    setLoadingDetail(true);
    setUserDetail(null);
    try {
      const res = await fetch(`/api/users/${user.id}`);
      const data = await res.json();
      setUserDetail(data);
    } catch (e) {
      console.error("Load user detail error:", e);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredUsers = users.filter(user =>
    (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.phone || '').includes(searchQuery)
  );

  const statusColor = (s: string) =>
    s === 'Premium' ? 'bg-purple-50 text-purple-700' :
    s === 'Blocked' ? 'bg-red-50 text-red-700' :
    'bg-emerald-50 text-emerald-700';

  const deliveryColor = (s: string) =>
    s === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
    s === 'Placed' ? 'bg-gray-100 text-gray-700' :
    s === 'Cancelled' ? 'bg-red-50 text-red-700' :
    'bg-blue-50 text-blue-700';

  const paymentColor = (s: string) =>
    s === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
    s === 'Pending' ? 'bg-orange-50 text-orange-700' :
    'bg-red-50 text-red-700';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customers, view history, and edit profiles.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Filter size={16} />
            Filter Users
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", val: users.length.toString() },
          { label: "Active Users", val: users.filter(u => u.status === 'Active').length.toString() },
          { label: "New This Month", val: users.filter(u => {
            const d = new Date(u.createdAt);
            const now = new Date();
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          }).length.toString() },
          { label: "Retention Rate", val: "—" }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Email, or Phone..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => openUserDetail(user)}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {(user.name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name || '—'}</p>
                        <p className="text-xs text-gray-400 font-mono">{user.id.slice(0, 12)}…</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600"><Mail size={12} /> {user.email || '—'}</div>
                      <div className="flex items-center gap-2 text-gray-600"><Phone size={12} /> {user.phone || '—'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      {user.location || 'Mumbai'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${statusColor(user.status)}`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 text-xs font-bold hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    {users.length === 0
                      ? "No customers yet. Bookings from the website will appear here automatically."
                      : `No users matching "${searchQuery}"`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── User Detail Modal ── */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setSelectedUser(null); setUserDetail(null); }} />
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {(selectedUser.name || '?').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500 font-mono">{selectedUser.id} • Joined {selectedUser.joined}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedUser(null); setUserDetail(null); }} className="text-gray-400 hover:text-gray-600 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">

              {/* Contact + Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contact Info</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm"><Mail size={16} className="text-gray-400" /> <span className="font-medium text-gray-900">{selectedUser.email || '—'}</span></div>
                    <div className="flex items-center gap-3 text-sm"><Phone size={16} className="text-gray-400" /> <span className="font-medium text-gray-900">{selectedUser.phone || '—'}</span></div>
                    <div className="flex items-center gap-3 text-sm"><MapPin size={16} className="text-gray-400" /> <span className="font-medium text-gray-900">{selectedUser.location || 'Mumbai'}</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Account Stats</h3>
                  {loadingDetail ? (
                    <div className="flex items-center justify-center h-20 text-gray-400 gap-2">
                      <RefreshCw size={16} className="animate-spin" /> Loading…
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-xs font-medium text-blue-600">Total Orders</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{userDetail?.stats?.totalOrders ?? 0}</p>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-4">
                        <p className="text-xs font-medium text-emerald-600">Total Spent</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">₹{(userDetail?.stats?.totalSpent ?? 0).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Orders */}
              <div className="space-y-4 mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Orders</h3>
                {loadingDetail ? (
                  <div className="flex items-center justify-center h-16 text-gray-400 gap-2">
                    <RefreshCw size={16} className="animate-spin" /> Loading orders…
                  </div>
                ) : userDetail?.orders?.length > 0 ? (
                  <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                    {userDetail.orders.map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Package size={16} className="text-blue-500 shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{order.service}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {order.invoiceId || `#${order.id.slice(0, 8).toUpperCase()}`} · ₹{order.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded ${paymentColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${deliveryColor(order.deliveryStatus)}`}>
                            {order.deliveryStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-6 text-sm bg-gray-50 rounded-xl">
                    No orders yet for this customer.
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Activity</h3>
                {loadingDetail ? (
                  <div className="flex items-center justify-center h-16 text-gray-400 gap-2">
                    <RefreshCw size={16} className="animate-spin" /> Loading…
                  </div>
                ) : userDetail?.activities?.length > 0 ? (
                  <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                    {userDetail.activities.map((act: any) => (
                      <div key={act.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Calendar size={16} className="text-blue-500 shrink-0" />
                          <p className="text-sm font-medium text-gray-900">{act.actionText}</p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {new Date(act.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-6 text-sm bg-gray-50 rounded-xl">
                    No activity recorded yet.
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                Block User
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
