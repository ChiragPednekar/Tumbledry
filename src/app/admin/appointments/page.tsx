"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus, Calendar as CalendarIcon, Clock, MapPin, CheckCircle2 } from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const syncData = async () => {
      try {
        const res = await fetch('/api/users');
        const { users } = await res.json();
        
        const originalApts: Record<string, any> = {
          "USR-891": { service: "Premium Dry Cleaning", date: "Today", time: "10:30 AM - 11:30 AM", staff: "Rajesh K.", status: "Confirmed" },
          "USR-892": { service: "Wash & Fold", date: "Today", time: "1:00 PM - 2:00 PM", staff: "Unassigned", status: "Pending" },
          "USR-893": { service: "Shoe Deep Clean", date: "Today", time: "3:30 PM - 4:30 PM", staff: "Suresh M.", status: "In Progress" },
          "USR-894": { service: "Steam Ironing", date: "Tomorrow", time: "09:00 AM - 10:00 AM", staff: "Rajesh K.", status: "Confirmed" },
          "USR-895": { service: "Carpet Spa", date: "Yesterday", time: "2:00 PM - 3:00 PM", staff: "Amit B.", status: "Completed" }
        };

        const mappedApts = users.map((u: any, idx: number) => {
          const original = originalApts[u.id];
          return {
            id: `APT-${1000 + users.length - idx}`,
            customer: u.name,
            service: original ? original.service : "Premium Laundry",
            date: original ? original.date : (u.lastActive === "Just now" ? "Today" : "Yesterday"),
            time: original ? original.time : "To be confirmed",
            location: u.location,
            staff: original ? original.staff : (u.lastActive === "Just now" ? "Unassigned" : "Rajesh K."),
            status: original ? original.status : (u.lastActive === "Just now" ? "Pending" : "Confirmed")
          };
        });

        setAppointments(prev => {
          if (prev.length !== mappedApts.length) return mappedApts;
          return prev;
        });
      } catch(e) {}
    };
    
    syncData();
    const interval = setInterval(syncData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments & Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage scheduled pickups, deliveries, and service timelines.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-white border border-gray-200 rounded-lg flex p-1 shadow-sm">
            <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-800 rounded-md">List</button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">Calendar</button>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus size={16} />
            New Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: "Pending", count: appointments.filter(a => a.status === "Pending").length },
          { label: "Confirmed", count: appointments.filter(a => a.status === "Confirmed").length },
          { label: "In Progress", count: appointments.filter(a => a.status === "In Progress").length },
          { label: "Completed", count: appointments.filter(a => a.status === "Completed").length },
          { label: "Cancelled", count: appointments.filter(a => a.status === "Cancelled").length },
        ].map(stat => (
            <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-blue-500 transition-colors">
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stat.count}</p>
            </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, Customer or Location..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <CalendarIcon size={16} /> Today
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Appointment</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Staff Assigned</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{apt.id}</p>
                    <p className="text-xs text-blue-600 font-medium mt-0.5">{apt.service}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{apt.customer}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-900 font-medium"><CalendarIcon size={12} className="text-gray-400" /> {apt.date}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs"><Clock size={12} /> {apt.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      {apt.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {apt.staff === 'Unassigned' ? (
                      <button className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md border border-blue-100 hover:bg-blue-100 transition-colors">
                        Assign Staff
                      </button>
                    ) : (
                      <span className="font-medium text-gray-700">{apt.staff}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      apt.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 
                      apt.status === 'Pending' ? 'bg-orange-50 text-orange-700' :
                      apt.status === 'Confirmed' ? 'bg-blue-50 text-blue-700' :
                      'bg-purple-50 text-purple-700'
                    }`}>
                      {apt.status === 'Completed' && <CheckCircle2 size={12} />}
                      {apt.status}
                    </span>
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
