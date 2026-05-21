"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Loader2, User } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#login") {
        setIsOpen(true);
        setIsSignUp(false);
      } else if (window.location.hash === "#signup") {
        setIsOpen(true);
        setIsSignUp(true);
      } else {
        setIsOpen(false);
        resetForm();
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsSignUp(false);
  };

  const closeModal = () => {
    window.location.hash = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API Call for both Login and Sign Up
    setTimeout(() => {
      login(email, isSignUp ? name : undefined);
      setIsProcessing(false);
      closeModal();
    }, 1500);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Keep email and password if user already typed them, but clear name
    if (!isSignUp) setName("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-lime-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl leading-none">T</span>
                </div>
                <h3 className="text-2xl font-bold text-text mb-2">
                  {isSignUp ? "Create an Account" : "Welcome Back"}
                </h3>
                <p className="text-text-light text-sm">
                  {isSignUp ? "Join Tumbledry to automate your wardrobe care." : "Sign in to track your orders and manage subscriptions."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-text mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input 
                        required={isSignUp}
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white text-text"
                        placeholder="John Doe"
                      />
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input 
                      required 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white text-text"
                      placeholder="you@example.com"
                      autoComplete="email"
                      name="email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1 flex justify-between">
                    <span>Password</span>
                    {!isSignUp && <a href="#" className="text-lime-500 hover:underline text-xs">Forgot?</a>}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input 
                      required 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all bg-gray-50 focus:bg-white text-text"
                      placeholder="••••••••"
                      minLength={8}
                      autoComplete={isSignUp ? "new-password" : "current-password"}
                      name="password"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-lime-500/30 mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {isSignUp ? "Creating Account..." : "Signing in..."}
                    </>
                  ) : (
                    isSignUp ? "Create Account" : "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-text-light flex flex-col gap-3">
                <div>
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button type="button" onClick={toggleMode} className="text-lime-500 font-bold hover:underline">
                    {isSignUp ? "Sign In" : "Sign up"}
                  </button>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <a href="/admin/login" className="text-xs text-gray-400 hover:text-lime-500 transition-colors font-medium">
                    Staff & Admin Portal
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
