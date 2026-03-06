import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import { Play, Pause, RotateCcw, Droplets, Zap, TreePine, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Simulation = () => {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [metrics, setMetrics] = useState({
    waterSaved: 0, energySaved: 0, co2Reduced: 0, cropHealth: 72,
  });

  const steps = [
    { title: "Sensors Collecting Data", desc: "IoT sensors measure soil moisture (42%), temperature (32°C), humidity (38%)." },
    { title: "AI Analyzing Conditions", desc: "Machine learning model detects low soil moisture and high evapotranspiration." },
    { title: "Anomaly Check", desc: "No anomalies detected. All systems operating within normal parameters." },
    { title: "Irrigation Activated", desc: "AI triggers drip irrigation in Zone A with optimized water flow of 12 L/min." },
    { title: "Optimization Complete", desc: "Soil moisture restored to 62%. Energy sourced from solar panels at 94% efficiency." },
  ];

  const simulate = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
      setMetrics(prev => ({
        waterSaved: Math.min(50, prev.waterSaved + 10 + Math.random() * 5),
        energySaved: Math.min(40, prev.energySaved + 8 + Math.random() * 4),
        co2Reduced: Math.min(35, prev.co2Reduced + 7 + Math.random() * 3),
        cropHealth: Math.min(95, prev.cropHealth + 5 + Math.random() * 2),
      }));
    } else {
      setRunning(false);
    }
  }, [step, steps.length]);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(simulate, 2000);
    return () => clearTimeout(timer);
  }, [running, simulate]);

  const reset = () => {
    setRunning(false);
    setStep(0);
    setMetrics({ waterSaved: 0, energySaved: 0, co2Reduced: 0, cropHealth: 72 });
  };

  const metricCards = [
    { icon: Droplets, label: "Water Saved", value: `${metrics.waterSaved.toFixed(0)}%`, color: "text-primary" },
    { icon: Zap, label: "Energy Saved", value: `${metrics.energySaved.toFixed(0)}%`, color: "text-accent" },
    { icon: TreePine, label: "CO₂ Reduced", value: `${metrics.co2Reduced.toFixed(0)}%`, color: "text-primary" },
    { icon: Leaf, label: "Crop Health", value: `${metrics.cropHealth.toFixed(0)}%`, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl font-bold">AI <span className="text-gradient-accent">Simulation</span></h1>
            <p className="text-muted-foreground mt-1">Interactive smart irrigation demo</p>
          </motion.div>

          {/* Controls */}
          <div className="flex gap-3 mb-8">
            <Button
              onClick={() => setRunning(!running)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2"
            >
              {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {running ? "Pause" : "Start"} Simulation
            </Button>
            <Button onClick={reset} variant="outline" className="border-border text-foreground font-display gap-2">
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {metricCards.map((m, i) => (
              <motion.div key={i} className="glass rounded-xl p-5 text-center glow-border">
                <m.icon className={`w-6 h-6 ${m.color} mx-auto mb-2`} />
                <div className={`font-display text-2xl font-bold ${m.color}`}>{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Steps */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold mb-6">AI Decision Pipeline</h3>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: i <= step ? 1 : 0.3 }}
                  className={`flex gap-4 p-4 rounded-lg transition-all ${
                    i === step ? "glow-border" : i < step ? "bg-primary/5 border border-primary/20" : "bg-muted/20 border border-transparent"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display text-sm font-bold ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-display font-semibold">{s.title}</div>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                  {i === step && running && (
                    <div className="ml-auto flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default Simulation;
