import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Thermometer, Brain, AlertCircle, Droplets } from "lucide-react";

const steps = [
  { icon: Thermometer, title: "Measure", desc: "IoT sensors collect soil moisture, temperature, humidity, and solar data in real-time.", color: "bg-primary/20 text-primary" },
  { icon: Brain, title: "Analyze", desc: "AI models process environmental data using predictive algorithms and machine learning.", color: "bg-accent/20 text-accent" },
  { icon: AlertCircle, title: "Detect", desc: "Anomaly detection identifies water leaks, pump failures, and abnormal soil conditions.", color: "bg-warning/20 text-warning" },
  { icon: Droplets, title: "Act", desc: "Automated irrigation triggers optimize water usage based on AI recommendations.", color: "bg-primary/20 text-primary" },
];

const AISolution = () => {
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
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Solution</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            AI-Powered <span className="text-gradient-primary">Smart Irrigation</span> System
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An intelligent cycle that transforms raw environmental data into actionable irrigation decisions.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="glass rounded-xl p-6 glow-border relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="font-display text-xs font-bold text-muted-foreground mb-1">STEP {i + 1}</div>
                  <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-20 w-6 h-6 rounded-full bg-primary/20 items-center justify-center -translate-y-1/2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISolution;
