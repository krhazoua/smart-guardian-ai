import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Droplets, Zap, TreePine, TrendingUp } from "lucide-react";

const impacts = [
  { icon: Droplets, value: 50, suffix: "%", label: "Water Savings", desc: "30–50% reduction", color: "text-primary" },
  { icon: Zap, value: 40, suffix: "%", label: "Energy Savings", desc: "20–40% reduction", color: "text-accent" },
  { icon: TreePine, value: 35, suffix: "%", label: "CO₂ Reduced", desc: "Carbon footprint", color: "text-primary" },
  { icon: TrendingUp, value: 25, suffix: "%", label: "Crop Productivity", desc: "Yield improvement", color: "text-accent" },
];

const AnimatedCounter = ({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= target) { clearInterval(timer); setCount(target); }
      else setCount(current);
    }, 30);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return <span>{count}{suffix}</span>;
};

const ImpactSection = () => {
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
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Measurable Impact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Real <span className="text-gradient-primary">Results</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-8 text-center glow-border"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <div className={`font-display text-4xl font-bold ${item.color} mb-1`}>
                <AnimatedCounter target={item.value} suffix={item.suffix} isVisible={isInView} />
              </div>
              <div className="font-display font-semibold mb-1">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
