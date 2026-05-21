"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-background pt-8 pb-16 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-lime-50/50 -z-10 rounded-bl-[100px] hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-lime-50 text-lime-600 px-4 py-2 rounded-full text-sm font-medium border border-lime-100">
              <span className="flex h-2 w-2 rounded-full bg-lime-500 animate-pulse"></span>
              India's #1 Laundry & Dry Cleaning Network
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-[1.15] tracking-tight">
              Laundry that works like <span className="text-lime-500">modern infrastructure.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-light max-w-lg leading-relaxed">
              Professional garment care designed for modern urban life. Pickup. Clean. Deliver. Done.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#pickup" className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-lime-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                Schedule Pickup
                <ArrowRight size={20} />
              </a>
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={40} height={40} />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-sm text-text-light mt-1"><span className="font-semibold text-text">4.8/5</span> from 50,000+ users</p>
              </div>
            </div>
          </motion.div>
          
          {/* Image/Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square bg-gray-100">
              {/* Using a placeholder for the hero image representing clean folded clothes or premium delivery */}
              <img 
                src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=1000" 
                alt="Premium Garment Care" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              {/* Floating UI Element 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-10 left-[-20px] bg-white rounded-xl p-3 shadow-lg flex items-center gap-3 border border-gray-100"
              >
                <div className="bg-lime-100 text-lime-500 rounded-lg p-2">
                  <span className="font-bold text-lg">24h</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-text">Express Delivery</p>
                  <p className="text-xs text-text-light">Available now</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
