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
    const { name, phone, email, location, service, pickupTime, address } = data;

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "Name and phone are required" }, { status: 400 });
    }

    // Try to find user by phone or email (if provided)
    let user = null;
    if (email) {
      user = await prisma.user.findUnique({
        where: { email }
      });
    }

    if (!user) {
      user = await prisma.user.findFirst({
        where: { phone }
      });
    }

    if (!user) {
      // Create new user
      const uniqueEmail = email || `${name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}-${Date.now()}@example.com`;
      user = await prisma.user.create({
        data: {
          name,
          email: uniqueEmail,
          phone,
          location: location || "Mumbai",
          status: "Active",
          role: "USER"
        }
      });
    }

    // Create Appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        service: service || "Premium Laundry",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: pickupTime || "To be confirmed",
        location: location || address || "Mumbai",
        status: "Pending"
      }
    });

    // Pricing estimation based on service — matches the form's <option> labels exactly
    const PRICE_MAP: Record<string, number> = {
      "Premium Laundry": 450,
      "Dry Cleaning": 1250,
      "Steam Ironing": 300,
      "Shoe & Bag Spa": 850,
    };
    const price = PRICE_MAP[service] ?? 450;

    // Create Order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        service: service || "Premium Laundry",
        price,
        paymentStatus: "Pending",
        deliveryStatus: "Placed",
        invoiceId: `INV-${Math.floor(100000 + Math.random() * 900000)}`
      }
    });

    // Create Activity
    await prisma.activity.create({
      data: {
        userId: user.id,
        actionText: `${name} booked ${service || 'Premium Laundry'} pickup`,
        type: "booking"
      }
    });

    return NextResponse.json({ success: true, user, appointment, order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to add user and booking" }, { status: 500 });
  }
}
