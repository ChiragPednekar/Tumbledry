Project Overview
Tumbledry is a comprehensive laundry and dry-cleaning management application. It provides a platform to manage users, outlets, appointments, orders, and activities. The application is built with modern web technologies to ensure a fast, responsive, and secure experience for users, staff, and administrators.

Features
User Authentication & Role Management: Secure login and registration with distinct roles for Users, Admins, and Staff.
Outlet Management: Admins can manage multiple outlets and associate users and orders with specific locations.
Appointment Scheduling: Users can book services, specifying dates, times, and locations, while staff can be assigned to handle them.
Order Tracking: Track the status of laundry orders, including pricing, payment status, and delivery progress.
Activity Logging: Comprehensive logging of user and system activities for auditing and monitoring.
Tech Stack
Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Recharts
Backend: Next.js API Routes, NextAuth.js
Database: PostgreSQL with Prisma ORM
Installation Steps
Clone the repository:

bash


git clone https://github.com/ChiragPednekar/Tumbledry.git
cd Tumbledry
Install dependencies:

bash


npm install
Set up environment variables: Create a .env file in the root directory and add the following variables:

env


DATABASE_URL="your_postgresql_database_url"
AUTH_SECRET="your_nextauth_secret"
Set up the database:

bash


npx prisma generate
npx prisma db push
Run the development server:

bash


npm run dev
Open http://localhost:3000 with your browser to see the result.

Screenshots
(Add screenshots of the application here to showcase the UI and features)

Folder Structure
text


Tumbledry/
├── prisma/             # Database schema and configuration
├── src/
│   ├── app/            # Next.js App Router (Pages & API routes)
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions and library configurations
│   └── auth.ts         # Authentication setup
├── types/              # TypeScript type definitions
├── scripts/            # Helper scripts
├── package.json        # Project dependencies and scripts
└── ...
Future Improvements
Payment Gateway Integration: Integrate third-party payment gateways (e.g., Stripe, PayPal) for seamless online payments.
Real-time Notifications: Implement WebSockets or push notifications for real-time order and appointment updates.
Advanced Analytics: Provide detailed analytics dashboards for admins to track revenue and outlet performance.
Mobile Application: Develop a React Native application for mobile users.
Customer Feedback System: Allow users to rate and review services.
