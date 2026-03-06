import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Wifi, Cloud, Monitor, Radio, Database, Server, BarChart3 } from "lucide-react";

const layers = [
  {
    title: "Hardware Layer",
    color: "glow-border",
    items: [
      { icon: Cpu, label: "STM32 MCU" },
      { icon: Wifi, label: "ESP32 WiFi" },
      { icon: Server, label: "Raspberry Pi AI" },
    ],
  },
  {
    title: "Sensor Network",
    color: "glow-accent-border",
    items: [
      { icon: Radio, label: "Soil Moisture" },
      { icon: Radio, label: "Temperature" },
      { icon: Radio, label: "Humidity" },
      { icon: Radio, label: "Water Flow" },
      { icon: Radio, label: "Solar Monitor" },
    ],
  },
  {
    title: "Communication",
    color: "glow-border",
    items: [
      { icon: Cloud, label: "MQTT Protocol" },
      { icon: Database, label: "FastAPI Backend" },
      { icon: Database, label: "Cloud Database" },
    ],
  },
  {
    title: "Frontend",
    color: "glow-accent-border",
    items: [
      { icon: Monitor, label: "AI Dashboard" },
      { icon: BarChart3, label: "Real-time Monitoring" },
    ],
  },
];

const TechArchitecture = () => {
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
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Architecture</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Technology <span className="text-gradient-accent">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass rounded-xl p-6 ${layer.color}`}
            >
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">{layer.title}</h3>
              <div className="space-y-3">
                {layer.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30">
                    <item.icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechArchitecture;
