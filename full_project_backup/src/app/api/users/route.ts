import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create User, Activity, Order, and Appointment simultaneously (simplified for prototype)
    const newUser = await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        status: data.status,
      }
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to add user" }, { status: 400 });
  }
}
