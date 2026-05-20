import HeroSection from "@/components/home/HeroSection";
import TrustMetrics from "@/components/home/TrustMetrics";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessFlow from "@/components/home/ProcessFlow";
import CleaningStages from "@/components/home/CleaningStages";
import ComparisonSection from "@/components/home/ComparisonSection";
import StoreFinder from "@/components/home/StoreFinder";
import SubscriptionPlans from "@/components/home/SubscriptionPlans";
import Testimonials from "@/components/home/Testimonials";
import FranchiseExpansion from "@/components/home/FranchiseExpansion";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <HeroSection />
      <TrustMetrics />
      <ServicesGrid />
      <ProcessFlow />
      <CleaningStages />
      <ComparisonSection />
      <StoreFinder />
      <SubscriptionPlans />
      <Testimonials />
      <FranchiseExpansion />
      <FAQ />
    </div>
  );
}
