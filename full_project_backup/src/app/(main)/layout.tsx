import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import PickupModal from "@/components/PickupModal";
import TrackOrderModal from "@/components/tracking/TrackOrderModal";
import LoginModal from "@/components/auth/LoginModal";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <StickyMobileCTA />
      <PickupModal />
      <TrackOrderModal />
      <LoginModal />
    </>
  );
}
