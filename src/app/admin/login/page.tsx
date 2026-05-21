"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, Store } from "lucide-react";
import { signIn } from "next-auth/react";
import { Logo } from "@/components/ui/Logo";

export default function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [outletId, setOutletId] = useState("");
  const [outlets, setOutlets] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/outlets")
      .then((res) => res.json())
      .then((data) => {
        if (data.outlets) {
          setOutlets(data.outlets);
        }
      })
      .catch((err) => console.error("Failed to fetch outlets", err));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        outletId,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else {
        // Check session to determine role
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        
        const role = session?.user?.role;
        
        if (role === "ADMIN" || role === "STAFF") {
          router.push("/admin");
          router.refresh();
        } else {
          setError("Unauthorized access. Admin privileges required.");
          setIsLoading(false);
        }
      }
    } catch (err) {
      setError("An error occurred during login");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          
          <div className="px-8 pt-10 pb-8 text-center border-b border-slate-50 flex flex-col items-center">
            <div className="mb-4">
              <Logo />
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-2">OS Access</h2>
            <p className="text-slate-500 text-sm mt-2">Secure access for authorized personnel only.</p>
          </div>

          <div className="px-8 py-8 bg-slate-50/50">
            {error && (
              <div className="mb-4 bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100 font-medium">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Work Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all text-sm font-medium"
                    placeholder="admin@tumbledry.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex justify-between">
                  <span>Password</span>
                  <a href="#" className="text-lime-600 hover:text-lime-700 font-medium text-xs">Forgot password?</a>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all text-sm font-medium"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Outlet (Optional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Store className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    value={outletId}
                    onChange={(e) => setOutletId(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all text-sm font-medium appearance-none"
                  >
                    <option value="">Default assigned outlet</option>
                    {outlets.map((outlet) => (
                      <option key={outlet.id} value={outlet.id}>
                        {outlet.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center pt-2">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-lime-600 focus:ring-lime-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                  Remember this device for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  "Authenticating..."
                ) : (
                  <>Sign in to Dashboard <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
          
          <div className="px-8 py-4 bg-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Protected by Enterprise-grade Security
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} Tumbledry Operations System. All rights reserved.
        </div>
      </div>
    </div>
  );
}
