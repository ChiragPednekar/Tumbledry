"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const stages = [
  { title: "Garment Inspection", desc: "Every item is checked for existing damage and stain types." },
  { title: "Targeted Stain Treatment", desc: "Specialized chemicals applied manually to stubborn stains." },
  { title: "Precision Machine Wash", desc: "Sorted by fabric and color, washed in international machines." },
  { title: "Fabric Conditioning", desc: "Softeners and fabric care agents applied for longevity." },
  { title: "Steam Ironing & QC", desc: "Industrial steam pressing followed by strict quality check." },
  { title: "Hygienic Packaging", desc: "Individually packed in breathable covers for safe transit." },
];

export default function CleaningStages() {
  return (
    <section className="py-24 bg-lime-600 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              The 6-Stage <br/><span className="text-lime-300">Premium Care Process</span>
            </h2>
            <p className="text-lime-100 text-lg mb-8 max-w-md">
              We don't just wash clothes. We follow a rigorous scientific process to ensure hygiene, fabric safety, and a crisp finish.
            </p>
            
            <div className="space-y-6">
              {stages.map((stage, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 shrink-0 text-lime-300">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{stage.title}</h4>
                    <p className="text-lime-200 text-sm">{stage.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Visual representing clean modern laundry facility */}
            <img 
              src="https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=1000" 
              alt="Modern Laundry Process" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
              <p className="text-white font-medium text-lg mb-2">"Extends garment life by 2x"</p>
              <p className="text-lime-200 text-sm">Certified fabric care process</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
