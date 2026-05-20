"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus, Edit2, Trash2, Shield, Mail, Phone, MapPin, Eye, X, Calendar, Package, CreditCard } from "lucide-react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([
    { id: "USR-891", name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210", location: "Andheri West", joined: "Oct 12, 2023", status: "Active", lastActive: "2 hours ago" },
    { id: "USR-892", name: "Priya Patel", email: "priya.p@example.com", phone: "+91 98765 43211", location: "Bandra Kurla", joined: "Nov 05, 2023", status: "Active", lastActive: "1 day ago" },
  ]);

  useEffect(() => {
    const syncData = async () => {
      try {
        const res = await fetch('/api/users');
        const { users: storedUsers } = await res.json();
        if (storedUsers && storedUsers.length > 0) {
          setUsers(prev => {
            if (prev.length !== storedUsers.length) return storedUsers;
            return prev;
          });
        }
      } catch(e) {}
    };
    syncData();
    const interval = setInterval(syncData, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.phone.includes(searchQuery)
  );

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
          { label: "Active Users", val: users.length.toString() }, 
          { label: "Retention Rate", val: "0%" }, 
          { label: "New This Month", val: `+${users.length}` }
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
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  onClick={() => setSelectedUser(user)}
                  className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600"><Mail size={12} /> {user.email}</div>
                      <div className="flex items-center gap-2 text-gray-600"><Phone size={12} /> {user.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      {user.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.status === 'Premium' ? 'bg-purple-50 text-purple-700' : 
                      user.status === 'Blocked' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 text-xs font-bold hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No users found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedUser(null)}></div>
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                  <p className="text-sm text-gray-500">{selectedUser.id} • Joined {selectedUser.joined}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contact Info</h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm"><Mail size={16} className="text-gray-400"/> <span className="font-medium text-gray-900">{selectedUser.email}</span></div>
                    <div className="flex items-center gap-3 text-sm"><Phone size={16} className="text-gray-400"/> <span className="font-medium text-gray-900">{selectedUser.phone}</span></div>
                    <div className="flex items-center gap-3 text-sm"><MapPin size={16} className="text-gray-400"/> <span className="font-medium text-gray-900">{selectedUser.location}, Mumbai</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Account Stats</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-blue-600">Total Orders</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">14</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-emerald-600">Total Spent</p>
                      <p className="text-xl font-bold text-gray-900 mt-1">₹4,250</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Activity</h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-blue-500" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Booked Appointment (Premium Laundry)</p>
                        <p className="text-xs text-gray-500 mt-0.5">Scheduled for Tomorrow, 10:00 AM</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Upcoming</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <Package size={16} className="text-emerald-500" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Order Delivered (#ORD-5510)</p>
                        <p className="text-xs text-gray-500 mt-0.5">Delivered on Oct 10, 2023</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Completed</span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <CreditCard size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Payment Successful</p>
                        <p className="text-xs text-gray-500 mt-0.5">Paid ₹850 via UPI</p>
                      </div>
                    </div>
                  </div>
                </div>
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
