import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Calendar, Package, Clock, LogOut } from "lucide-react"

export default async function UserDashboard() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      appointments: { orderBy: { createdAt: "desc" }, take: 5 },
      orders: { orderBy: { createdAt: "desc" }, take: 5 }
    }
  })

  if (!user) redirect("/login")

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar / Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
              {user.name?.charAt(0) || "U"}
            </div>
            <h2 className="text-xl font-bold text-center text-slate-900">Welcome back, {user.name?.split(' ')[0]}</h2>
            <p className="text-center text-slate-500 text-sm mb-6">{user.email}</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                <span className="text-slate-500">Member Since</span>
                <span className="font-semibold text-slate-900">
                  {user.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                <span className="text-slate-500">Appointments</span>
                <span className="font-semibold text-slate-900">{user.appointments.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-3">
                <span className="text-slate-500">Total Orders</span>
                <span className="font-semibold text-slate-900">{user.orders.length}</span>
              </div>
            </div>
            
            <a href="/api/auth/signout" className="mt-6 flex items-center justify-center gap-2 w-full text-red-600 font-medium hover:bg-red-50 p-2 rounded-lg transition-colors">
              <LogOut size={16} /> Sign Out
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" /> Recent Appointments
            </h3>
            {user.appointments.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
                <p className="text-slate-500">No appointments scheduled yet.</p>
                <a href="/#schedule" className="mt-2 inline-block text-blue-600 font-semibold hover:underline">Schedule a Pickup</a>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {user.appointments.map(apt => (
                  <div key={apt.id} className="p-4 border-b border-slate-100 last:border-0 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">{apt.service}</p>
                      <div className="flex gap-4 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                      </div>
                    </div>
                    <div>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Package size={20} className="text-blue-600" /> Recent Orders
            </h3>
            {user.orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
                <p className="text-slate-500">No active orders found.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {user.orders.map(order => (
                  <div key={order.id} className="p-4 border-b border-slate-100 last:border-0 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-900">{order.service}</p>
                      <p className="text-sm text-slate-500 mt-1">Order #{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">₹{order.price.toLocaleString()}</p>
                      <span className="text-xs text-slate-500 font-medium">
                        {order.deliveryStatus} • {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  )
}
