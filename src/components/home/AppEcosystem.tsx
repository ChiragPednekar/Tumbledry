"use client";

import { motion } from "framer-motion";
import { Smartphone, Bell, Clock, CreditCard } from "lucide-react";

export default function AppEcosystem() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative"
          >
            {/* Abstract App Mockup representation */}
            <div className="relative mx-auto w-[280px] h-[580px] bg-gray-900 rounded-[40px] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 z-20 rounded-b-3xl"></div>
              
              <div className="w-full h-full bg-background flex flex-col relative z-10 pt-8 px-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                  <p className="text-xs text-text-light mb-1">Order #TD-8921</p>
                  <p className="font-bold text-text mb-3">Premium Wash & Iron</p>
                  
                  {/* Timeline UI */}
                  <div className="space-y-3 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-gray-200">
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</div>
                      <p className="text-sm font-medium">Picked Up</p>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-lime-500 text-white flex items-center justify-center text-[10px]">⚙</div>
                      <p className="text-sm font-medium">Processing</p>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                      <p className="text-sm text-gray-400">Quality Check</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-lime-500 text-white p-4 rounded-2xl flex items-center justify-between mt-auto mb-4">
                  <div>
                    <p className="text-xs text-lime-200">Total Amount</p>
                    <p className="font-bold">₹450</p>
                  </div>
                  <button className="bg-white text-lime-500 text-sm px-4 py-2 rounded-lg font-bold">Pay Now</button>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-1/4 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-30 hidden md:flex"
            >
              <div className="w-10 h-10 bg-lime-50 text-lime-500 rounded-full flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-xs text-text-light">Notification</p>
                <p className="text-sm font-bold">Clothes ready for delivery!</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-lime-50 text-lime-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                <Smartphone size={16} /> Smart App
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Laundry in your pocket.</h2>
              <p className="text-lg text-text-light">
                Manage your wardrobe care seamlessly. Track orders, schedule pickups, and pay securely—all from our intuitive mobile app.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="mt-1 text-lime-500"><Clock size={24} /></div>
                <div>
                  <h4 className="font-semibold text-text mb-1">Live Tracking</h4>
                  <p className="text-sm text-text-light">Know exactly where your clothes are at every stage.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 text-lime-500"><CreditCard size={24} /></div>
                <div>
                  <h4 className="font-semibold text-text mb-1">Digital Payments</h4>
                  <p className="text-sm text-text-light">One-tap secure payments and wallet features.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button className="bg-text text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:bg-black transition-colors">
                <Smartphone size={20} />
                Download the App
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
