import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            location: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { service, price, paymentMethod, outletId } = await req.json();

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        outletId: outletId || null,
        service: service || "Custom Plan",
        price: parseFloat(price) || 0,
        paymentMethod: paymentMethod || "Unknown",
        paymentStatus: "Paid",
      }
    });

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        outletId: outletId || null,
        actionText: `Purchased subscription: ${service}`,
        type: "booking"
      }
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
  }
}
