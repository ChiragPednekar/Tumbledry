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

    const activities = await prisma.activity.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    const formatted = activities.map(act => ({
      text: act.actionText,
      time: formatRelativeTime(act.createdAt),
      type: act.type
    }));

    return NextResponse.json({ activities: formatted });
  } catch (error) {
    console.error("Fetch activities error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch activities" }, { status: 500 });
  }
}

function formatRelativeTime(date: Date) {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return new Date(date).toLocaleDateString();
}
