"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Sparkles, Shirt, Activity, ArrowRight, X, Check } from "lucide-react";

const services = [
  {
    id: "laundry",
    title: "Premium Laundry",
    description: "Everyday wear, expertly washed, softened, and neatly folded.",
    icon: <Droplets size={28} />,
    turnaround: "48 hours",
    details: "Our premium laundry service is perfect for your everyday wear. We use RO purified water and biodegradable, fabric-safe detergents that clean effectively without damaging fibers.",
    inclusions: [
      "Color-sorted batch washing",
      "Premium fabric softeners applied",
      "Stain pre-treatment (mild stains)",
      "Neat folding and crisp packaging"
    ]
  },
  {
    id: "dryclean",
    title: "Dry Cleaning",
    description: "Careful solvent cleaning for delicate fabrics and suits.",
    icon: <Sparkles size={28} />,
    turnaround: "72 hours",
    details: "Using international standard dry cleaning machines, we gently treat delicate fabrics, heavy embroidered garments, and formal suits using specialized hydrocarbon solvents instead of water.",
    inclusions: [
      "Thorough fabric inspection",
      "Individual spot & stain removal",
      "Solvent-based deep cleaning",
      "Steam pressing & hanger packaging"
    ]
  },
  {
    id: "ironing",
    title: "Steam Ironing",
    description: "Crisp, wrinkle-free finish using industrial steam presses.",
    icon: <Activity size={28} />,
    turnaround: "24 hours",
    details: "We don't use traditional hot plate irons that burn fabric. Our industrial vacuum steam presses ensure a sharp, crisp finish without crushing the fabric threads or leaving shine marks.",
    inclusions: [
      "Vacuum table pressing",
      "Teflon coated steam irons",
      "Starch application (on request)",
      "Crease-perfect folding"
    ]
  },
  {
    id: "shoes",
    title: "Shoe & Bag Spa",
    description: "Deep cleaning and restoration for your favorite accessories.",
    icon: <Shirt size={28} />,
    turnaround: "4-5 days",
    details: "A dedicated spa treatment for your leather, canvas, and suede accessories. We clean, condition, and restore your shoes and bags to bring back their original look and feel.",
    inclusions: [
      "Interior & exterior deep clean",
      "Deodorization & sanitization",
      "Leather conditioning & polishing",
      "Suede/Nubuck brushing"
    ]
  },
];

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Complete Wardrobe Care</h2>
          <p className="text-lg text-text-light">
            We use specialized processes and fabric-safe chemicals to ensure your garments last longer and look better.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group relative overflow-hidden flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="w-14 h-14 bg-lime-50 text-lime-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-lime-500 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-3">{service.title}</h3>
              <p className="text-text-light text-sm mb-6 flex-grow">{service.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <span className="text-xs font-semibold text-lime-500 uppercase tracking-wider">{service.turnaround}</span>
                <button 
                  className="text-text-light group-hover:text-lime-500 transition-colors cursor-pointer"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <div className="bg-lime-50 p-8 text-center relative border-b border-gray-100">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-100 p-2 rounded-full transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
                <div className="w-16 h-16 bg-white text-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {selectedService.icon}
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">{selectedService.title}</h3>
                <span className="inline-block bg-lime-500/10 text-lime-500 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Turnaround: {selectedService.turnaround}
                </span>
              </div>

              <div className="p-8">
                <p className="text-text-light leading-relaxed mb-6">
                  {selectedService.details}
                </p>

                <h4 className="font-bold text-text mb-4 text-sm uppercase tracking-wide">What's Included:</h4>
                <ul className="space-y-3 mb-8">
                  {selectedService.inclusions.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <div className="mt-0.5 text-green-500 bg-green-50 p-1 rounded-full">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-text-light text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="#pickup"
                  onClick={() => setSelectedService(null)}
                  className="w-full block text-center bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-lime-500/30"
                >
                  Book {selectedService.title}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
