"use client";

import { motion } from "framer-motion";
import { TrendingUp, Settings, Users, ShieldCheck, ArrowRight } from "lucide-react";

export default function FranchiseExpansion() {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <TrendingUp size={16} /> Partner with us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Build a scalable business with India's fastest-growing laundry brand.
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Join the Tumbledry network. We provide end-to-end operational setup, machinery, staff training, and marketing support to ensure your store's success.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex gap-3 items-start">
                <Settings className="text-blue-300 mt-1" size={20} />
                <div>
                  <h4 className="font-bold">Standardized SOPs</h4>
                  <p className="text-sm text-blue-200">Plug & play model</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Users className="text-blue-300 mt-1" size={20} />
                <div>
                  <h4 className="font-bold">Hiring & Training</h4>
                  <p className="text-sm text-blue-200">Skilled workforce</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <ShieldCheck className="text-blue-300 mt-1" size={20} />
                <div>
                  <h4 className="font-bold">Brand Trust</h4>
                  <p className="text-sm text-blue-200">Instant local demand</p>
                </div>
              </div>
            </div>

            <a href="mailto:franchise@tumbledry.in" className="bg-white text-primary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg w-max">
              Explore Franchise Options
              <ArrowRight size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-text">
              <h3 className="text-2xl font-bold mb-6">Growth Trajectory</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Store Network</span>
                    <span className="text-primary">1000+ Stores</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>Cities Covered</span>
                    <span className="text-primary">300+ Cities</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span>ROI Timeline</span>
                    <span className="text-primary">18-24 Months</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold shadow-sm">
                  100%
                </div>
                <div>
                  <p className="font-bold text-sm">Franchise Success Rate</p>
                  <p className="text-xs text-text-light">Based on operations since 2019</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
