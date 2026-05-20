"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is the turnaround time for standard laundry?",
    answer: "Our standard turnaround time is 48 hours. However, we also offer an Express Delivery service that delivers within 24 hours for a nominal extra charge."
  },
  {
    question: "Are your cleaning chemicals safe for delicate fabrics?",
    answer: "Absolutely. We use specialized, eco-friendly, fabric-safe chemicals imported directly from certified manufacturers. Every garment is inspected and treated according to its specific fabric care label."
  },
  {
    question: "Do you charge extra for pickup and delivery?",
    answer: "No, pickup and delivery are completely free for all orders above ₹300. Our delivery executives ensure hygienic handling during transit."
  },
  {
    question: "How do you handle tough stains?",
    answer: "We have a dedicated stain treatment stage before the main wash. Our experts use targeted chemicals depending on the type of stain (oil, ink, coffee, etc.). While we cannot guarantee 100% removal for very old stains, our success rate is over 95%."
  },
  {
    question: "Can I track my order status?",
    answer: "Yes, you can track your order in real-time through our mobile app or website. You will also receive automated WhatsApp updates at every major processing stage."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-text-light">
            Everything you need to know about our services, processes, and pricing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-primary bg-blue-50/20 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-text text-lg pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : ''}`} 
                  size={24} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-text-light text-base leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
