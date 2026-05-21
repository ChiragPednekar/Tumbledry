"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, Calendar, ShoppingBag, CreditCard, 
  BarChart3, Settings, LogOut, Menu, Bell, Search, 
  Activity, MessageSquare, Megaphone, FileText, Briefcase
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Appointments", icon: Calendar, href: "/admin/appointments" },
  { label: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { label: "Payments", icon: CreditCard, href: "/admin/payments" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, title: "New booking received", time: "5 mins ago", unread: true },
    { id: 2, title: "Payment ₹1,250 successful", time: "1 hour ago", unread: true },
    { id: 3, title: "Order #ORD-5524 delayed", time: "3 hours ago", unread: false },
    { id: 4, title: "New user signup: Priya Patel", time: "5 hours ago", unread: false },
  ]);
  const [lastCheck, setLastCheck] = useState(() => new Date().toISOString());

  useEffect(() => {
    if (pathname === "/admin/login") return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/admin/notifications?lastCheck=${lastCheck}`);
        if (!res.ok) return;
        const data = await res.json();
        
        if (data.success && data.notifications && data.notifications.length > 0) {
          setNotifications(prev => {
            const newNotifs = data.notifications.map((n: any) => ({
              id: n.id,
              title: n.title,
              time: 'Just now',
              unread: true
            }));
            
            // To prevent duplicates if multiple polls happen closely
            const existingIds = new Set(prev.map(p => p.id));
            const filteredNew = newNotifs.filter((n: any) => !existingIds.has(n.id));
            
            return [...filteredNew, ...prev];
          });
        }
        
        if (data.success && data.checkedAt) {
          setLastCheck(data.checkedAt);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [lastCheck, pathname]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const hasUnread = notifications.some(n => n.unread);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-800`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {sidebarOpen && (
            <div className="flex items-center scale-75 origin-left">
              <Logo isDark={true} />
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <Menu size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="space-y-1 px-2">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive ? "bg-lime-600 text-white font-medium" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  <item.icon size={18} className={isActive ? "text-white" : "text-slate-400"} />
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <Link href="/admin/login" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 hover:text-red-400 rounded-lg transition-colors">
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search orders, customers, or settings (Cmd+K)" 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Bell size={20} />
                {hasUnread && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>}
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                    <button onClick={markAllRead} className="text-xs text-lime-600 hover:underline font-medium">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? 'bg-lime-50/30' : ''}`}>
                        <div className="flex justify-between items-start gap-2">
                          <p className={`text-sm ${notif.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{notif.title}</p>
                          {notif.unread && <span className="w-2 h-2 rounded-full bg-lime-600 shrink-0 mt-1.5"></span>}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
                    <button className="text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900 group-hover:text-lime-600 transition-colors">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
