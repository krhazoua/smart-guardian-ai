import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import AISolution from "@/components/AISolution";
import TechArchitecture from "@/components/TechArchitecture";
import AIFeatures from "@/components/AIFeatures";
import ImpactSection from "@/components/ImpactSection";
import MoroccoMap from "@/components/MoroccoMap";
import BusinessModel from "@/components/BusinessModel";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ProblemSection />
      <AISolution />
      <TechArchitecture />
      <AIFeatures />
      <ImpactSection />
      <MoroccoMap />
      <BusinessModel />
      <Partners />
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
