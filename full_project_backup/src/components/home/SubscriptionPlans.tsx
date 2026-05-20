"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Express Trial",
    price: "₹499",
    desc: "Perfect for testing our premium quality.",
    features: ["Upto 5 Garments", "Free Pickup & Delivery", "Standard Wash & Iron", "48hr Turnaround"],
    popular: false,
  },
  {
    name: "Family Monthly",
    price: "₹2,499",
    desc: "Automate laundry for the entire household.",
    features: ["Upto 40 Garments/month", "4 Free Pickups", "Premium Wash & Iron", "24hr Express Delivery", "Priority Support"],
    popular: true,
  },
  {
    name: "Corporate Pro",
    price: "₹1,499",
    desc: "For the professional wardrobe.",
    features: ["10 Suits / Dresses", "Specialized Dry Cleaning", "Stain Removal Included", "Hygienic Covers", "Flexible Scheduling"],
    popular: false,
  }
];

export default function SubscriptionPlans() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Household Convenience Plans</h2>
          <p className="text-lg text-text-light">
            Stop worrying about laundry day. Choose a subscription and put your wardrobe care on autopilot.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-primary shadow-xl shadow-blue-500/10' : 'border-gray-200 shadow-sm'} flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
                <p className="text-text-light text-sm h-10">{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text">{plan.price}</span>
                  <span className="text-text-light font-medium">/plan</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <Check size={20} className="text-green-500 shrink-0" />
                    <span className="text-sm text-text font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={`/checkout?plan=${encodeURIComponent(plan.name)}&price=${encodeURIComponent(plan.price)}`}
                className={`w-full py-4 rounded-xl font-bold transition-all text-center block ${plan.popular ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-gray-50 text-text hover:bg-gray-100 border border-gray-200'}`}
              >
                Choose Plan
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
