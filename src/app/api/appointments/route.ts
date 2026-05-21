import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { outletId, role } = session.user;
    let whereClause = {};

    if (role !== 'SUPERADMIN' && outletId) {
      whereClause = { outletId };
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
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
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Fetch appointments error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 });
  }
}
