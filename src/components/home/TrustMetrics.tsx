"use client";

import { motion } from "framer-motion";
import { Store, MapPin, Shirt, Users } from "lucide-react";

const metrics = [
  {
    id: 1,
    value: "1000+",
    label: "Live Stores",
    icon: <Store size={24} />,
  },
  {
    id: 2,
    value: "300+",
    label: "Cities Active",
    icon: <MapPin size={24} />,
  },
  {
    id: 3,
    value: "5M+",
    label: "Garments Cleaned",
    icon: <Shirt size={24} />,
  },
  {
    id: 4,
    value: "92%",
    label: "Repeat Customers",
    icon: <Users size={24} />,
  },
];

export default function TrustMetrics() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors border border-gray-100"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-4">
                {metric.icon}
              </div>
              <h3 className="text-3xl font-bold text-text mb-1">{metric.value}</h3>
              <p className="text-sm font-medium text-text-light">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
