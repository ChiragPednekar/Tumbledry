"use client";

import { motion } from "framer-motion";
import { Calendar, Truck, Shirt, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <Calendar size={24} />,
    title: "Schedule",
    desc: "Book a slot via app or WhatsApp"
  },
  {
    icon: <Truck size={24} />,
    title: "Pickup",
    desc: "Executive collects your garments"
  },
  {
    icon: <Shirt size={24} />,
    title: "Process",
    desc: "Professional cleaning & care"
  },
  {
    icon: <Search size={24} />,
    title: "QC Check",
    desc: "Strict quality inspection"
  },
  {
    icon: <CheckCircle size={24} />,
    title: "Delivery",
    desc: "Delivered fresh & folded"
  }
];

export default function ProcessFlow() {
  return (
    <section id="process" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">How It Works</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            A seamless, technology-driven process designed to remove the friction from your laundry day.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-100 hidden md:block">
            <motion.div 
              className="h-full bg-lime-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center text-text group-hover:text-lime-500 group-hover:scale-110 transition-all duration-300 relative z-10 border-4 border-white mb-6">
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{step.title}</h3>
                <p className="text-sm text-text-light">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
