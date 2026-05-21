import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const outlets = await prisma.outlet.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json({ outlets });
  } catch (error) {
    console.error("Fetch outlets error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch outlets" }, { status: 500 });
  }
}
