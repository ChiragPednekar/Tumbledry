import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await auth();
    
    // Only allow logged in users (admin/staff)
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const lastCheck = searchParams.get('lastCheck');
    const outletId = session.user.outletId;

    if (!lastCheck) {
      return NextResponse.json({ success: false, error: "Missing lastCheck parameter" }, { status: 400 });
    }

    // Prepare query for new orders
    // If user is tied to an outlet, filter by that outlet. Otherwise, they see all orders (super admin).
    const whereClause: any = {
      createdAt: {
        gt: new Date(lastCheck)
      }
    };

    if (outletId) {
      whereClause.outletId = outletId;
    }

    const newOrders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true } },
        outlet: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format them as notifications
    const notifications = newOrders.map(order => ({
      id: `order-${order.id}`,
      title: `New Order: ${order.service} - ₹${order.price}`,
      time: order.createdAt,
      unread: true,
      type: 'order',
      outletName: order.outlet?.name || 'Unknown Outlet'
    }));

    return NextResponse.json({ 
      success: true, 
      notifications,
      checkedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("Fetch notifications error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 });
  }
}
