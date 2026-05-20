import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

let activities: any[] = [];

export async function GET() {
  return NextResponse.json({ activities });
}

export async function POST(request: Request) {
  try {
    const newActivity = await request.json();
    activities = [newActivity, ...activities];
    return NextResponse.json({ success: true, activity: newActivity });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add activity" }, { status: 400 });
  }
}
