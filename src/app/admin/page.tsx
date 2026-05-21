"use client";

import { useState, useEffect } from "react";
import { 
  Users, ShoppingBag, DollarSign, Calendar, ArrowUpRight, ArrowDownRight, 
  MoreVertical, CheckCircle2, Activity
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

// Initial empty chart data
const initialChartData = [
  { name: 'Mon', revenue: 0, users: 0, bookings: 0 },
  { name: 'Tue', revenue: 0, users: 0, bookings: 0 },
  { name: 'Wed', revenue: 0, users: 0, bookings: 0 },
  { name: 'Thu', revenue: 0, users: 0, bookings: 0 },
  { name: 'Fri', revenue: 0, users: 0, bookings: 0 },
  { name: 'Sat', revenue: 0, users: 0, bookings: 0 },
  { name: 'Sun', revenue: 0, users: 0, bookings: 0 },
];

export default function AdminDashboard() {
  const [dateMode, setDateMode] = useState("range"); // "range" or "specific"
  const [dateRange, setDateRange] = useState("Today");
  const [specificDate, setSpecificDate] = useState("");
  const [activeChart, setActiveChart] = useState<'revenue'|'users'|'bookings'>('revenue');

  // Dynamic state that will update when real users/bookings are added via backend
  const [kpis, setKpis] = useState({
    totalUsers: 0,
    appointments: 0,
    revenue: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [chartData, setChartData] = useState(initialChartData);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const syncData = async () => {
      try {
        const [usersRes, ordersRes, appointmentsRes, activityRes] = await Promise.all([
          fetch('/api/users').then(r => r.json()),
          fetch('/api/orders').then(r => r.json()),
          fetch('/api/appointments').then(r => r.json()),
          fetch('/api/activity').then(r => r.json())
        ]);

        const users = usersRes.users || [];
        const orders = ordersRes.orders || [];
        const appointments = appointmentsRes.appointments || [];
        const activities = activityRes.activities || [];

        // KPI Calculations
        const totalUsers = users.length;
        const totalAppointments = appointments.length;
        const revenue = orders
          .filter((o: any) => o.paymentStatus === 'Paid')
          .reduce((sum: number, o: any) => sum + o.price, 0);
        const pendingOrders = orders.filter((o: any) => o.deliveryStatus !== 'Delivered' && o.deliveryStatus !== 'Cancelled').length;
        const completedOrders = orders.filter((o: any) => o.deliveryStatus === 'Delivered').length;

        setKpis({
          totalUsers,
          appointments: totalAppointments,
          revenue,
          pendingOrders,
          completedOrders
        });

        // Dynamic Chart Data mapping (by day of week)
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const mappedChartData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(dayName => {
          return { name: dayName, revenue: 0, users: 0, bookings: 0 };
        });

        orders.forEach((o: any) => {
          const date = new Date(o.createdAt);
          const dayName = daysOfWeek[date.getDay()];
          const chartDay = mappedChartData.find(d => d.name === dayName);
          if (chartDay && o.paymentStatus === 'Paid') {
            chartDay.revenue += o.price;
          }
        });

        users.forEach((u: any) => {
          const date = new Date(u.createdAt);
          const dayName = daysOfWeek[date.getDay()];
          const chartDay = mappedChartData.find(d => d.name === dayName);
          if (chartDay) {
            chartDay.users += 1;
          }
        });

        appointments.forEach((a: any) => {
          const date = new Date(a.createdAt);
          const dayName = daysOfWeek[date.getDay()];
          const chartDay = mappedChartData.find(d => d.name === dayName);
          if (chartDay) {
            chartDay.bookings += 1;
          }
        });

        setChartData(mappedChartData);

        setRecentActivity(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(activities)) {
            return activities;
          }
          return prev;
        });
      } catch(e) { 
        console.error("Dashboard synchronization error:", e);
      }
    };

    syncData();
    const interval = setInterval(syncData, 1000); 
    
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { label: "Total Users", value: kpis.totalUsers, change: "0%", isPositive: true, icon: Users },
    { label: "Today's Appointments", value: kpis.appointments, change: "0%", isPositive: true, icon: Calendar },
    { label: "Revenue (MTD)", value: `₹${kpis.revenue}`, change: "0%", isPositive: true, icon: DollarSign },
    { label: "Pending Orders", value: kpis.pendingOrders, change: "0%", isPositive: false, icon: ShoppingBag },
    { label: "Completed Orders", value: kpis.completedOrders, change: "0%", isPositive: true, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back. Here's a snapshot of your business operations today.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <select 
            value={dateMode}
            onChange={(e) => setDateMode(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none border-r border-gray-200 pr-2"
          >
            <option value="range">Date Range</option>
            <option value="specific">Specific Day</option>
          </select>
          
          {dateMode === "range" ? (
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-sm text-gray-700 focus:outline-none pl-2"
            >
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Year to Date</option>
              <option>All Time</option>
            </select>
          ) : (
            <input 
              type="date"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
              className="bg-transparent text-sm text-gray-700 focus:outline-none pl-2"
            />
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                <kpi.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${kpi.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {kpi.change}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1 truncate">{kpi.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Charts Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] lg:col-span-2 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Performance Metrics</h3>
            <div className="flex gap-2">
              {(['revenue', 'users', 'bookings'] as const).map(type => (
                <button 
                  key={type}
                  onClick={() => setActiveChart(type)}
                  className={`text-xs px-3 py-1.5 rounded-md font-bold transition-colors capitalize ${
                    activeChart === type 
                      ? 'bg-slate-900 text-white' 
                      : 'text-gray-500 hover:text-gray-900 bg-gray-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey={activeChart} 
                  stroke={activeChart === 'revenue' ? '#10b981' : activeChart === 'users' ? '#3b82f6' : '#8b5cf6'} 
                  fillOpacity={1} 
                  fill={`url(#color${activeChart.charAt(0).toUpperCase() + activeChart.slice(1)})`} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          {/* Recent Activity Feed */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col h-full min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Live Activity Log</h3>
                <p className="text-xs text-gray-500 mt-1">Updates in real-time as users interact.</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            
            <div className="space-y-4 flex-1">
              {recentActivity.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-3">
                  <Activity size={32} className="opacity-20" />
                  <p className="text-sm font-medium">Waiting for new activity...</p>
                  <p className="text-xs">Incoming user signups, orders, and payments will appear here.</p>
                </div>
              ) : (
                recentActivity.map((activity, i) => (
                  <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0 animate-in slide-in-from-left-2">
                    <div className="w-8 h-8 rounded-full bg-lime-50 text-lime-600 flex items-center justify-center shrink-0">
                      <Activity size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-snug">{activity.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
