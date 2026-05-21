"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus, Truck, Package, Download } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const syncData = async () => {
      try {
        const res = await fetch('/api/orders');
        const { orders: dbOrders } = await res.json();
        
        if (dbOrders) {
          const mappedOrders = dbOrders.map((o: any) => {
            const dateObj = new Date(o.createdAt);
            const dateStr = dateObj.toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return {
              id: o.invoiceId || `ORD-${o.id.slice(0, 5).toUpperCase()}`,
              customer: o.user?.name || "Guest User",
              service: o.service,
              price: `₹${o.price.toLocaleString('en-IN')}`,
              payment: o.paymentStatus,
              delivery: o.deliveryStatus,
              date: dateStr
            };
          });

          setOrders(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(mappedOrders)) return mappedOrders;
            return prev;
          });
        }
      } catch(e) {
        console.error("Sync orders page error:", e);
      }
    };
    
    syncData();
    const interval = setInterval(syncData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Active Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Track laundry orders from pickup through to delivery.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Filter size={16} />
            Filters
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus size={16} />
            Create Order
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { label: "Placed", count: orders.filter(o => o.delivery === "Placed").length, color: "bg-gray-100 text-gray-800" },
          { label: "Confirmed", count: orders.filter(o => o.delivery === "Confirmed").length, color: "bg-lime-50 text-lime-700" },
          { label: "Processing", count: orders.filter(o => o.delivery === "Processing").length, color: "bg-purple-50 text-purple-700" },
          { label: "Out for Delivery", count: orders.filter(o => o.delivery === "Out for Delivery").length, color: "bg-orange-50 text-orange-700" },
          { label: "Delivered", count: orders.filter(o => o.delivery === "Delivered").length, color: "bg-emerald-50 text-emerald-700" },
          { label: "Cancelled", count: orders.filter(o => o.delivery === "Cancelled").length, color: "bg-red-50 text-red-700" }
        ].map(status => (
          <div key={status.label} className="bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm flex-shrink-0 min-w-[140px]">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${status.color}`}>
              {status.label === 'Delivered' ? <Package size={16} /> : <Truck size={16} />}
            </div>
            <p className="text-xl font-bold text-gray-900">{status.count}</p>
            <p className="text-xs text-gray-500 font-medium">{status.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Order ID, Customer..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
            />
          </div>
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer & Service</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.service}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{order.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${
                      order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 
                      order.payment === 'Pending' ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      order.delivery === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                      order.delivery === 'Processing' ? 'bg-purple-100 text-purple-800' :
                      order.delivery === 'Out for Delivery' ? 'bg-lime-100 text-lime-800' :
                      order.delivery === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.delivery}
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
