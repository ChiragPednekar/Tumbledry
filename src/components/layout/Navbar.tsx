"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, LogIn, MapPin, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/AuthContext";
import { Logo } from "@/components/ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-white/90 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-text hover:text-lime-500 transition-colors font-medium">Services</Link>
          <Link href="#process" className="text-text hover:text-lime-500 transition-colors font-medium">How it Works</Link>
          <Link href="#pricing" className="text-text hover:text-lime-500 transition-colors font-medium">Pricing</Link>
          <Link href="#locations" className="text-text hover:text-lime-500 transition-colors font-medium">Stores</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Link 
              href="/login"
              className="flex items-center gap-2 text-text font-medium hover:text-lime-500 transition-colors border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="#track" className="flex items-center gap-1.5 text-lime-500 bg-lime-50 px-3 py-1.5 rounded-full text-sm font-bold hover:bg-lime-100 transition-colors">
                <Package size={16} /> Track Order
              </Link>
              <div className="relative group cursor-pointer">
                <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-lime-500/20" />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-gray-50">
                    <p className="font-bold text-sm text-text">{user.name}</p>
                    <p className="text-xs text-text-light truncate">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={logout} className="w-full text-left text-sm text-red-500 font-medium px-2 py-2 hover:bg-red-50 rounded-lg">Logout</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Link href="#pickup" className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
            Schedule Pickup
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 md:hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {!user ? (
                <a 
                  href="#login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 text-text font-bold"
                >
                  <LogIn size={18} />
                  Login with Email
                </a>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-lime-50 rounded-lg border border-lime-100">
                  <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-sm text-text">{user.name}</p>
                    <p className="text-xs text-text-light">{user.email}</p>
                  </div>
                </div>
              )}

              <Link href="#services" className="p-3 text-lg font-medium text-text hover:bg-background rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link href="#process" className="p-3 text-lg font-medium text-text hover:bg-background rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>How it Works</Link>
              <Link href="#pricing" className="p-3 text-lg font-medium text-text hover:bg-background rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <Link href="#locations" className="p-3 text-lg font-medium text-text hover:bg-background rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Stores</Link>
              
              {user && (
                <Link href="#track" className="p-3 text-lg font-bold text-lime-500 bg-lime-50/50 hover:bg-lime-100 rounded-lg flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Package size={20} /> Track Active Order
                </Link>
              )}

              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <Link href="#pickup" onClick={() => setIsMobileMenuOpen(false)} className="bg-lime-500 text-white p-3 rounded-lg font-medium shadow-sm w-full text-center block">
                  Schedule Pickup
                </Link>
                {user && (
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="p-3 text-red-500 font-bold text-center w-full">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
