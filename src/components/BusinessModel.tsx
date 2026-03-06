import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Box, Monitor, Wrench, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    icon: Box,
    title: "Smart Station",
    price: "4,000 – 15,000",
    unit: "MAD",
    desc: "Hardware smart station with sensors, solar panel, and edge AI.",
    features: ["IoT Sensor Suite", "Solar Panel", "Edge AI (Raspberry Pi)", "STM32 + ESP32 Board", "Installation Support"],
    popular: false,
  },
  {
    icon: Monitor,
    title: "AI Software",
    price: "150 – 300",
    unit: "MAD/month",
    desc: "Full AI dashboard, predictive analytics, and mobile alerts.",
    features: ["AI Dashboard Access", "Predictive Irrigation", "Anomaly Detection", "Mobile Alerts", "AI Recommendations"],
    popular: true,
  },
  {
    icon: Wrench,
    title: "Maintenance",
    price: "1,000 – 2,000",
    unit: "MAD/year",
    desc: "Annual maintenance, calibration, and support for smart stations.",
    features: ["Sensor Calibration", "Hardware Inspection", "Software Updates", "Priority Support", "Replacement Parts"],
    popular: false,
  },
];

const BusinessModel = () => {
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
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Business Model</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Scalable <span className="text-gradient-accent">Pricing</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-xl p-8 relative ${plan.popular ? "glow-border" : "border border-border/50"}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                <plan.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-1">{plan.title}</h3>
              <div className="font-display text-2xl font-bold text-primary mb-1">{plan.price}</div>
              <div className="text-sm text-muted-foreground mb-4">{plan.unit}</div>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full font-display ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted text-foreground hover:bg-muted/80"}`}>
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;
