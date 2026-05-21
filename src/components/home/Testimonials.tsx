"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const initialReviews = [
  {
    name: "Priya Sharma",
    role: "Working Professional, Mumbai",
    content: "Tumbledry has completely removed laundry stress from my weekends. The app is intuitive, pickup is always on time, and clothes come back smelling incredibly fresh.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Apartment Resident, Bangalore",
    content: "I shifted from my local dhobi after some expensive shirts got ruined. Tumbledry's dry cleaning process is extremely professional. The packaging alone shows they care.",
    rating: 5,
  },
  {
    name: "Anjali Gupta",
    role: "Mother of two, Delhi",
    content: "The family monthly plan is a lifesaver. Scheduling pickups takes 10 seconds on WhatsApp, and the delivery boys are very polite. Highly recommend!",
    rating: 5,
  }
];

export default function Testimonials() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Hide success message and form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setShowReviewForm(false);
      setRating(5);
    }, 3000);
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Trusted by Urban Homes</h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Don't just take our word for it. See what thousands of households are saying about the Tumbledry experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {initialReviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative"
            >
              <Quote className="absolute top-6 right-6 text-gray-100 rotate-180" size={48} />
              
              <div className="flex gap-1 text-yellow-400 mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-text-light italic mb-8 relative z-10 line-clamp-4">"{review.content}"</p>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-lime-100 text-lime-500 rounded-full flex items-center justify-center font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-text text-sm">{review.name}</h4>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          {!showReviewForm ? (
            <button 
              onClick={() => setShowReviewForm(true)}
              className="bg-white border-2 border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-white px-8 py-3 rounded-xl font-bold transition-colors inline-flex items-center gap-2"
            >
              Write a Review
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left"
            >
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-2">Thank you!</h3>
                  <p className="text-text-light">Your review has been submitted successfully and will be published after moderation.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-text">Rate Your Experience</h3>
                    <button onClick={() => setShowReviewForm(false)} className="text-sm text-gray-500 hover:text-gray-900 font-medium">Cancel</button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-colors"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          >
                            <Star 
                              size={32} 
                              className={star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">Full Name</label>
                        <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">City / Location</label>
                        <input required type="text" placeholder="e.g. Mumbai" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Your Review</label>
                      <textarea required rows={4} placeholder="Tell us about your laundry experience..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-lime-500/30">
                      Submit Review
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
