"use client";

import { Search, Filter, Plus, MoreVertical, Edit2, Trash2, Check, X } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { id: "SRV-001", name: "Premium Dry Cleaning", category: "Dry Cleaning", price: "₹250/item", status: "Active", turnaround: "48 hrs" },
    { id: "SRV-002", name: "Wash & Fold Regular", category: "Wash & Fold", price: "₹80/kg", status: "Active", turnaround: "24 hrs" },
    { id: "SRV-003", name: "Steam Ironing", category: "Ironing", price: "₹30/item", status: "Active", turnaround: "12 hrs" },
    { id: "SRV-004", name: "Shoe Deep Clean", category: "Specialty", price: "₹450/pair", status: "Inactive", turnaround: "72 hrs" },
    { id: "SRV-005", name: "Carpet Spa", category: "Specialty", price: "₹120/sqft", status: "Active", turnaround: "5 days" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services & Pricing</h1>
          <p className="text-sm text-gray-500 mt-1">Configure available laundry services, addons, and dynamic pricing.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Filter size={16} />
            Filter
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus size={16} />
            Add Service
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search services by name or ID..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Service Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Base Pricing</th>
                <th className="px-6 py-4">Turnaround</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{service.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                      {service.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{service.price}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{service.turnaround}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      service.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {service.status === 'Active' ? <Check size={12} /> : <X size={12} />}
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
