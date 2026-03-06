import Navbar from "@/components/Navbar";
import MoroccoMap from "@/components/MoroccoMap";
import AIAssistant from "@/components/AIAssistant";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <MoroccoMap />
      </div>
      <AIAssistant />
    </div>
  );
};

export default MapPage;
