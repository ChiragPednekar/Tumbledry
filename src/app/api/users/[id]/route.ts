import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const orders = await prisma.order.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' }
    });

    const appointments = await prisma.appointment.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' }
    });

    const activities = await prisma.activity.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    const totalSpent = orders
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, o) => sum + o.price, 0);

    return NextResponse.json({
      orders,
      appointments,
      activities,
      stats: {
        totalOrders: orders.length,
        totalSpent
      }
    });
  } catch (error) {
    console.error('Fetch user detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
