"use client";

import { Save, Building, Globe, Calendar, CreditCard, Bell, Users, Shield } from "lucide-react";

export default function SettingsPage() {
  const tabs = [
    { id: "business", label: "Business Details", icon: Building },
    { id: "booking", label: "Booking Rules", icon: Calendar },
    { id: "payment", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Access", icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Configure global business rules, taxes, and integrations.</p>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
              tab.id === 'business' ? 'bg-white shadow-sm border border-gray-200 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}>
              <tab.icon size={18} className={tab.id === 'business' ? 'text-blue-600' : 'text-gray-400'} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Business Profile</h2>
              <p className="text-sm text-gray-500">Update your company photo and details here.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Business Name</label>
                  <input type="text" defaultValue="Tumbledry Services" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Support Email</label>
                  <input type="email" defaultValue="support@tumbledry.in" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contact Number</label>
                  <input type="text" defaultValue="+91 80000 12345" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tax/GST Number</label>
                  <input type="text" defaultValue="27AADCB2230M1Z2" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Registered Address</label>
                <textarea rows={3} defaultValue="123, Laundry Avenue, Andheri West, Mumbai, Maharashtra 400053" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Operational Hours</h2>
              <p className="text-sm text-gray-500">Set your standard operating hours for bookings.</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 last:pb-0">
                    <span className="text-sm font-medium text-gray-700 w-24">{day}</span>
                    <div className="flex items-center gap-4 flex-1 max-w-sm">
                      <input type="time" defaultValue="09:00" className="border border-gray-200 rounded-md px-3 py-1.5 text-sm w-full outline-none" />
                      <span className="text-gray-400">to</span>
                      <input type="time" defaultValue="20:00" className="border border-gray-200 rounded-md px-3 py-1.5 text-sm w-full outline-none" />
                    </div>
                    <div className="w-20 text-right">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
