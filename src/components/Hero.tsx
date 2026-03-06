import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Smart agriculture field with solar sensors" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(hsl(152,65%,45%) 1px, transparent 1px), linear-gradient(90deg, hsl(152,65%,45%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-border mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm text-primary font-medium">Ramadan AI Hackathon 2025 – Casablanca-Settat</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-gradient-primary">SMART GUARDIAN</span>
            <br />
            <span className="text-foreground">AI for Sustainable</span>
            <br />
            <span className="text-foreground">Irrigation in </span>
            <span className="text-gradient-accent">Morocco</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Solar-powered intelligent stations that monitor environmental conditions
            and optimize irrigation using Artificial Intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2 shadow-glow">
              Explore the AI Technology <ArrowRight className="w-4 h-4" />
            </Button>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-display gap-2">
                <BarChart3 className="w-4 h-4" /> View Live Dashboard
              </Button>
            </Link>
            <Link to="/simulation">
              <Button size="lg" variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 font-display gap-2">
                <Play className="w-4 h-4" /> Start Simulation
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50%", label: "Water Saved", color: "text-primary" },
            { value: "40%", label: "Energy Saved", color: "text-accent" },
            { value: "35%", label: "CO₂ Reduced", color: "text-primary" },
            { value: "24/7", label: "AI Monitoring", color: "text-accent" },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-5 text-center glow-border">
              <div className={`font-display text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
