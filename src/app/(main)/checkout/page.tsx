"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Smartphone, Building2, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [outletId, setOutletId] = useState("");
  const [outlets, setOutlets] = useState<{id: string, name: string}[]>([]);

  useEffect(() => {
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
  }, []);

  const planName = searchParams.get("plan") || "Selected Plan";
  const planPrice = searchParams.get("price") || "₹0";

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: planName,
          price: planPrice.replace(/[^0-9.]/g, ''),
          paymentMethod,
          outletId
        })
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 4000);
      } else {
        console.error("Payment failed");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">Payment Successful!</h2>
          <p className="text-text-light mb-6">
            Your subscription for <strong>{planName}</strong> is now active. We've sent the details to your registered number.
          </p>
          <div className="bg-gray-50 p-4 rounded-xl mb-6 flex justify-between items-center text-sm">
            <span className="text-gray-500">Amount Paid</span>
            <span className="font-bold text-lg">{planPrice}</span>
          </div>
          <p className="text-xs text-gray-400">Redirecting to homepage...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <Link href="/" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 font-medium">
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold leading-none">T</span>
          </div>
          <span className="font-bold text-lime-600">tumbledry Secure Checkout</span>
        </div>
        <div className="w-[70px]"></div> {/* Spacer for centering */}
      </header>

      <div className="flex-grow max-w-5xl mx-auto w-full px-4 py-8 lg:py-12 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Payment Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-text">Select Payment Method</h2>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex-1 py-4 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === "upi" ? 'border-lime-500 bg-lime-50/50 text-lime-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >
                <Smartphone size={24} />
                <span className="font-semibold text-sm">UPI / QR</span>
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-4 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === "card" ? 'border-lime-500 bg-lime-50/50 text-lime-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >
                <CreditCard size={24} />
                <span className="font-semibold text-sm">Cards</span>
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMethod("netbanking")}
                className={`flex-1 py-4 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === "netbanking" ? 'border-lime-500 bg-lime-50/50 text-lime-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >
                <Building2 size={24} />
                <span className="font-semibold text-sm">Net Banking</span>
              </button>
            </div>

            <form onSubmit={handlePayment}>
              {paymentMethod === "upi" && (
                <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter UPI ID</label>
                    <input 
                      type="text" 
                      required
                      placeholder="username@bank" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all"
                    />
                  </div>
                  <div className="text-center py-4">
                    <span className="text-sm text-gray-400 font-medium">OR</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center border-dashed">
                    <div className="w-40 h-40 bg-white border border-gray-200 p-2 rounded-lg mb-4 shadow-sm flex items-center justify-center">
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center">
                        Scan QR Code<br/>(Simulated)
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Scan with any UPI App</p>
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input type="text" required placeholder="0000 0000 0000 0000" maxLength={19} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input type="text" required placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="password" required placeholder="•••" maxLength={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-lime-500 transition-all" />
                  </div>
                </div>
              )}
              
              {paymentMethod === "netbanking" && (
                <div className="animate-in fade-in zoom-in duration-300 py-8 text-center text-gray-500">
                  <Building2 size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Net Banking interface will open securely on the next step.</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 px-3 py-1.5 rounded-lg">
                  <ShieldCheck size={16} /> 100% Secure Encrypted Payment
                </div>
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-lime-500/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${planPrice}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full lg:w-1/3 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sticky top-24"
        >
          <h3 className="font-bold text-lg mb-6 pb-4 border-b border-gray-100">Order Summary</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Outlet</label>
            <select
              value={outletId}
              onChange={(e) => setOutletId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-lime-500"
              required
            >
              <option value="" disabled>Select an outlet near you</option>
              {outlets.map(outlet => (
                <option key={outlet.id} value={outlet.id}>{outlet.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-text">{planName}</p>
                <p className="text-sm text-gray-500 mt-1">Subscription Plan</p>
              </div>
              <p className="font-medium text-text">{planPrice}</p>
            </div>
            
            <div className="flex justify-between items-center text-sm text-green-600">
              <span>Platform Fee</span>
              <span>Free</span>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Taxes & GST (18%)</span>
              <span>Included</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Amount</span>
              <span className="font-bold text-2xl text-gray-900">{planPrice}</span>
            </div>
          </div>

          <div className="bg-lime-50 rounded-xl p-4 text-sm text-lime-600 flex items-start gap-3">
            <ShieldCheck size={20} className="shrink-0 text-lime-500 mt-0.5" />
            <p>Your subscription can be modified or paused anytime from the Tumbledry App.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Loader2 size={40} className="animate-spin text-lime-500 mb-2" />
        <p className="text-sm font-medium text-gray-500">Loading Checkout...</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
