"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Why We're Different</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Upgrade from the unorganized local dhobi to a reliable, transparent, and hygienic process.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
            <div className="p-6 font-semibold text-text-light hidden md:block">Features</div>
            <div className="p-6 font-semibold text-text-light md:hidden"></div>
            <div className="p-6 font-bold text-center text-gray-500 border-l border-gray-200">Local Laundry</div>
            <div className="p-6 font-bold text-center text-primary bg-blue-50 border-l border-gray-200">Tumbledry</div>
          </div>
          
          {[
            { feature: "Water Quality", local: "Hard/Unfiltered Water", pro: "RO Purified Water" },
            { feature: "Chemicals Used", local: "Harsh Detergents", pro: "Fabric-safe Eco Chemicals" },
            { feature: "Hygiene Standard", local: "Mixed with others", pro: "Individual Processing" },
            { feature: "Pickup & Delivery", local: "Unreliable", pro: "App-tracked, Free" },
            { feature: "Pricing", local: "Variable", pro: "Standardized & Transparent" },
            { feature: "Garment Tracking", local: "Manual/None", pro: "Live App Tracking" },
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <div className="p-4 md:p-6 text-sm md:text-base text-text font-medium flex items-center">{item.feature}</div>
              
              <div className="p-4 md:p-6 border-l border-gray-100 flex flex-col items-center justify-center text-center">
                <X size={20} className="text-red-400 mb-2 md:hidden" />
                <span className="text-sm text-gray-500">{item.local}</span>
              </div>
              
              <div className="p-4 md:p-6 border-l border-gray-100 bg-blue-50/30 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Check size={20} className="text-green-500 mb-2 z-10" />
                <span className="text-sm font-semibold text-text z-10">{item.pro}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
