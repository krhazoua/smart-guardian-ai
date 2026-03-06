import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Brain, AlertTriangle, Leaf, Award, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Predictive Irrigation",
    desc: "Predict irrigation needs using environmental data and weather forecasts with machine learning models.",
    tag: "Prediction",
    color: "text-primary",
  },
  {
    icon: AlertTriangle,
    title: "AI Anomaly Detection",
    desc: "Detect water leaks, pump malfunction, and abnormal soil dryness in real-time.",
    tag: "Detection",
    color: "text-destructive",
  },
  {
    icon: Leaf,
    title: "Crop Health Prediction",
    desc: "Predict plant stress and crop productivity risk based on environmental conditions.",
    tag: "Health",
    color: "text-primary",
  },
  {
    icon: Award,
    title: "AI Sustainability Score",
    desc: "Dynamic environmental performance score based on water savings, energy efficiency and CO₂ reduction.",
    tag: "Score",
    color: "text-accent",
  },
  {
    icon: MessageSquare,
    title: "AI Recommendations",
    desc: '"Irrigation recommended in 2 hours due to predicted soil dryness."',
    tag: "Smart Alerts",
    color: "text-accent",
  },
];

const SustainabilityScore = () => {
  const [score, setScore] = useState(0);
  const targetScore = 87;
  
  useEffect(() => {
    const timer = setInterval(() => {
      setScore(prev => {
        if (prev >= targetScore) { clearInterval(timer); return targetScore; }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width="120" height="120" className="transform -rotate-90">
        <circle cx="60" cy="60" r="45" fill="none" stroke="hsl(215, 25%, 18%)" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="45" fill="none"
          stroke="hsl(152, 65%, 45%)" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-100"
        />
      </svg>
      <div className="absolute font-display font-bold text-2xl text-primary">{score}</div>
    </div>
  );
};

const AIFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">AI Modules</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Hackathon-Winning <span className="text-gradient-primary">AI Features</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-xl p-6 hover:glow-border transition-all duration-300 ${i === 3 ? "relative" : ""}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{f.tag}</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
              {i === 3 && (
                <div className="mt-4 relative flex items-center justify-center">
                  <SustainabilityScore />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
