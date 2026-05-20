"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Package, Truck, WashingMachine, Shirt } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

export default function TrackOrderModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#track") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setShowTimeline(false);
        setOrderId("");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const closeModal = () => {
    window.location.hash = "";
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      setShowTimeline(true);
    }, 1500);
  };

  const steps = [
    { icon: <Package size={20} />, title: "Order Placed", time: "Today, 10:30 AM", status: "completed" },
    { icon: <Truck size={20} />, title: "Picked Up", time: "Today, 1:15 PM", status: "completed" },
    { icon: <WashingMachine size={20} />, title: "In Process", time: "Currently processing...", status: "active" },
    { icon: <Shirt size={20} />, title: "Quality Check", time: "Pending", status: "upcoming" },
    { icon: <Check size={20} />, title: "Out for Delivery", time: "Pending", status: "upcoming" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            <div className="bg-primary p-6 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-1">Track Order</h3>
              <p className="text-blue-100 text-sm">
                {showTimeline ? `Order #${orderId.toUpperCase()}` : "Enter your Order ID to track status"}
              </p>
            </div>

            <div className="p-8">
              {!user ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Please log in to track your orders.</p>
                </div>
              ) : !showTimeline ? (
                <form onSubmit={handleTrack} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Order ID</label>
                    <input 
                      required
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g. TD-8921"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition-all uppercase"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isTracking || !orderId.trim()}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isTracking ? "Searching..." : "Track Now"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOrderId("TD-8921"); handleTrack({ preventDefault: () => {} } as React.FormEvent); }}
                    className="w-full text-sm text-primary font-bold hover:underline py-2"
                  >
                    Track Latest Order
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-xs text-text-light font-bold uppercase tracking-wider mb-1">Estimated Delivery</p>
                      <p className="text-lg font-bold text-text">Tomorrow, 4:00 PM</p>
                    </div>
                    <div className="bg-blue-50 text-primary px-3 py-1 rounded-lg text-sm font-bold cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => setShowTimeline(false)}>
                      Change Order
                    </div>
                  </div>

                  <div className="relative border-l-2 border-gray-100 ml-4 space-y-8">
                    {steps.map((step, idx) => (
                      <div key={idx} className="relative pl-8">
                        <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center
                          ${step.status === 'completed' ? 'bg-green-500 text-white' : 
                            step.status === 'active' ? 'bg-primary text-white ring-4 ring-blue-50' : 
                            'bg-gray-200 text-gray-400'}`}
                        >
                          {step.status === 'completed' ? <Check size={14} strokeWidth={3} /> : step.icon}
                        </div>
                        <div>
                          <h4 className={`font-bold ${step.status === 'active' ? 'text-primary' : step.status === 'completed' ? 'text-text' : 'text-gray-400'}`}>
                            {step.title}
                          </h4>
                          <p className="text-xs text-text-light mt-1">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {user && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-sm text-text-light">Need help? <a href="#" className="text-primary font-bold hover:underline">Contact Support</a></p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
