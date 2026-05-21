"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [revenueStats, setRevenueStats] = useState({ total: 0, aov: 0, refundRate: 0 });

  useEffect(() => {
    const syncData = async () => {
      try {
        const res = await fetch('/api/orders');
        const { orders: dbOrders } = await res.json();
        
        if (dbOrders) {
          let totalRev = 0;
          let paidCount = 0;
          let refundCount = 0;
          let totalCount = dbOrders.length;

          const mappedPayments = dbOrders.map((o: any, idx: number) => {
            if (o.paymentStatus === "Paid") {
              totalRev += o.price;
              paidCount++;
            } else if (o.paymentStatus === "Refunded") {
              refundCount++;
            }

            const dateObj = new Date(o.createdAt);
            const dateStr = dateObj.toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return {
              id: `TXN-${o.id.slice(0, 5).toUpperCase()}`,
              customer: o.user?.name || "Guest User",
              amount: `₹${o.price.toLocaleString('en-IN')}`,
              method: o.paymentStatus === "Paid" ? "UPI" : "Pending",
              status: o.paymentStatus,
              date: dateStr,
              invoice: o.invoiceId || `INV-${o.id.slice(0, 4).toUpperCase()}`
            };
          });

          setRevenueStats({
            total: totalRev,
            aov: paidCount > 0 ? Math.round(totalRev / paidCount) : 0,
            refundRate: totalCount > 0 ? Number(((refundCount / totalCount) * 100).toFixed(1)) : 0
          });

          setPayments(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(mappedPayments)) return mappedPayments;
            return prev;
          });
        }
      } catch(e) {
        console.error("Sync payments page error:", e);
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
          <h1 className="text-2xl font-bold text-gray-900">Payments & Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor transactions, issue refunds, and track revenue.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Filter size={16} />
            Filter
          </button>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-lime-50 flex items-center justify-center text-lime-600">
              <CreditCard size={20} />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              <ArrowUpRight size={14} /> +12.5%
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Monthly Revenue</p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">₹{revenueStats.total.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <CreditCard size={20} />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
              <ArrowUpRight size={14} /> +8.2%
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Average Order Value</p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">₹{revenueStats.aov.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <CreditCard size={20} />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700">
              <ArrowDownRight size={14} /> -2.4%
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium mb-1">Refund Rate</p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{revenueStats.refundRate}%</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Transaction ID, Invoice..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
            />
          </div>
          <select className="w-full sm:w-auto bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500/20">
            <option>All Transactions</option>
            <option>Successful</option>
            <option>Pending</option>
            <option>Refunded</option>
            <option>Failed</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{payment.id}</td>
                  <td className="px-6 py-4 text-gray-700">{payment.customer}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{payment.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${
                      payment.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 
                      payment.status === 'Pending' ? 'bg-orange-50 text-orange-700' : 
                      payment.status === 'Refunded' ? 'bg-purple-50 text-purple-700' : 
                      'bg-red-50 text-red-700'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{payment.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-lime-600 font-medium hover:underline">{payment.invoice}</button>
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
