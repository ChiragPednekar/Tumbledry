"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Droplets, ShieldCheck, User } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  const [isAdminPortal, setIsAdminPortal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [outletId, setOutletId] = useState("");
  const [outlets, setOutlets] = useState<{id: string, name: string}[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAdminPortal && !isLogin) {
      fetch('/api/outlets')
        .then(res => res.json())
        .then(data => {
          if (data.outlets) {
            setOutlets(data.outlets);
            if (data.outlets.length > 0) {
              setOutletId(data.outlets[0].id);
            }
          }
        })
        .catch(err => console.error("Failed to fetch outlets", err));
    }
  }, [isAdminPortal, isLogin]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin) {
      // Handle Signup
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            name, 
            email, 
            password, 
            role: isAdminPortal ? "ADMIN" : "USER",
            outletId: isAdminPortal ? outletId : undefined
          })
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to create account");
        }
      } catch (err: any) {
        setError(err.message || "Account creation failed");
        return;
      }
    }

    // After signup (or if logging in), sign in
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      // Check session to determine role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      
      const role = session?.user?.role;
      
      if (isAdminPortal) {
        if (role === "ADMIN" || role === "STAFF") {
          router.push("/admin");
        } else {
          setError("Unauthorized access. Admin privileges required.");
        }
      } else {
        if (role === "ADMIN" || role === "STAFF") {
          router.push("/admin");
        } else {
          router.push("/dashboard"); 
        }
      }
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Portal Toggle Tabs */}
      <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 mb-6 flex gap-1 w-full max-w-md">
        <button 
          onClick={() => { setIsAdminPortal(false); setIsLogin(true); setError(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${!isAdminPortal ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <User size={16} /> User Portal
        </button>
        <button 
          onClick={() => { setIsAdminPortal(true); setIsLogin(true); setError(""); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${isAdminPortal ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ShieldCheck size={16} /> Admin Portal
        </button>
      </div>

      <div className={`p-8 rounded-2xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] w-full max-w-md transition-colors ${isAdminPortal ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6 scale-90 origin-center">
            <Logo isDark={isAdminPortal} />
          </div>
          <h1 className={`text-2xl font-bold ${isAdminPortal ? 'text-white' : 'text-gray-900'}`}>
            {isAdminPortal ? (isLogin ? "Admin Login" : "Create Admin") : (isLogin ? "Welcome Back" : "Create Account")}
          </h1>
          <p className={`text-sm mt-1 text-center ${isAdminPortal ? 'text-slate-400' : 'text-gray-500'}`}>
            {isAdminPortal ? (isLogin ? "Secure access to Tumbledry OS" : "Register a new administrator account") : (isLogin ? "Sign in to your Tumbledry account" : "Join Tumbledry for premium care")}
          </p>
        </div>

        {error && (
          <div className="bg-red-50/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm mb-6 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-1 ${isAdminPortal ? 'text-slate-300' : 'text-gray-700'}`}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${isAdminPortal ? 'bg-slate-800 border-slate-700 text-white focus:ring-slate-500/20 focus:border-slate-500' : 'bg-slate-50 border-slate-200 focus:ring-lime-500/20 focus:border-lime-500'}`}
                required={!isLogin}
              />
            </div>
          )}
          {isAdminPortal && !isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-1 text-slate-300`}>Select Outlet</label>
              <select
                value={outletId}
                onChange={(e) => setOutletId(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-slate-800 border-slate-700 text-white focus:ring-slate-500/20 focus:border-slate-500`}
                required
              >
                {outlets.map(outlet => (
                  <option key={outlet.id} value={outlet.id}>{outlet.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className={`block text-sm font-medium mb-1 ${isAdminPortal ? 'text-slate-300' : 'text-gray-700'}`}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${isAdminPortal ? 'bg-slate-800 border-slate-700 text-white focus:ring-slate-500/20 focus:border-slate-500' : 'bg-slate-50 border-slate-200 focus:ring-lime-500/20 focus:border-lime-500'}`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${isAdminPortal ? 'text-slate-300' : 'text-gray-700'}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${isAdminPortal ? 'bg-slate-800 border-slate-700 text-white focus:ring-slate-500/20 focus:border-slate-500' : 'bg-slate-50 border-slate-200 focus:ring-lime-500/20 focus:border-lime-500'}`}
              required
            />
          </div>
          

          <button
            type="submit"
            className={`w-full font-bold py-2.5 rounded-xl transition-colors mt-2 ${isAdminPortal ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-lime-600 hover:bg-lime-700 text-white'}`}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${isAdminPortal ? 'text-slate-400' : 'text-slate-500'}`}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            type="button"
            className={`font-semibold ml-1 hover:underline focus:outline-none ${isAdminPortal ? 'text-white' : 'text-lime-600'}`}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
