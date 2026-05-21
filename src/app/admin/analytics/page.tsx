"use client";

import { Search, Filter, Plus, MoreVertical } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Deep dive into your operational metrics and revenue trends.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Filter size={16} />
            Filter
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus size={16} />
            Create New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search in business analytics..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center mb-4 text-lime-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No data available</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">This module is currently in prototype mode. Data tables and specific workflows will be integrated here.</p>
        </div>
      </div>
    </div>
  );
}
