"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { ALL_AREAS } from "@/components/home/StoreFinder";

export default function PickupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#pickup") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
        // Reset form state when closed
        setTimeout(() => setIsSubmitted(false), 300);
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const closeModal = () => {
    window.location.hash = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('fullName') as string || "Guest User";
    const phone = formData.get('phone') as string || "";
    const outlet = formData.get('outlet') as string || "";
    const service = formData.get('service') as string || "Premium Laundry";
    const pickupTime = formData.get('pickupTime') as string || "";
    const address = formData.get('address') as string || "";
    
    // Generate a unique dummy email if email is not in the form
    const email = `${fullName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}-${Date.now()}@example.com`;

    const bookingData = {
      name: fullName,
      phone,
      email,
      location: outlet || address || "Mumbai",
      service,
      pickupTime,
      address
    };

    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
    } catch (err) {
      console.error("Booking submission error:", err);
    }

    setTimeout(() => {
      closeModal();
    }, 3000);
  };

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
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-2">Pickup Scheduled!</h3>
                  <p className="text-text-light">
                    Our executive will call you shortly to confirm the exact time.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-text mb-2">Schedule Pickup</h3>
                    <p className="text-text-light text-sm">
                      Enter your details and we'll collect your garments from your doorstep.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        name="fullName"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Mobile Number</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white"
                        placeholder="9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Preferred Outlet (Nearest to you)</label>
                      <select name="outlet" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white text-text">
                        <option value="">Auto-assign nearest outlet</option>
                        {ALL_AREAS.map((area, idx) => (
                          <option key={idx} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Service Required</label>
                      <select name="service" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white text-text">
                        <option>Premium Laundry</option>
                        <option>Dry Cleaning</option>
                        <option>Steam Ironing</option>
                        <option>Shoe & Bag Spa</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">Pickup Time</label>
                        <select name="pickupTime" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white text-text text-sm">
                          <option>Today, 10 AM - 1PM</option>
                          <option>Today, 2 PM - 5 PM</option>
                          <option>Today, 6 PM - 9 PM</option>
                          <option>Tomorrow Morning</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">Delivery Time</label>
                        <select name="deliveryTime" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white text-text text-sm">
                          <option>Standard (48-72 hrs)</option>
                          <option>Express (Next Day)</option>
                          <option>Super Express (Same Day)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Pickup Address</label>
                      <textarea 
                        required
                        name="address"
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white resize-none"
                        placeholder="House no, Building, Area..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-lime-500/30 mt-2"
                    >
                      Confirm Booking
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
