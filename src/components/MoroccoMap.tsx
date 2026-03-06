import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin } from "lucide-react";

const regions = [
  { name: "Casablanca-Settat", x: 28, y: 42, savings: "45%", hectares: "12,000" },
  { name: "Marrakech-Safi", x: 32, y: 58, savings: "50%", hectares: "18,000" },
  { name: "Souss-Massa", x: 25, y: 72, savings: "55%", hectares: "25,000" },
  { name: "Fes-Meknes", x: 42, y: 30, savings: "40%", hectares: "15,000" },
];

const MoroccoMap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Deployment</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Morocco <span className="text-gradient-primary">Coverage</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto glass rounded-2xl p-8">
          <div className="relative aspect-[4/3] bg-muted/30 rounded-xl overflow-hidden">
            {/* Simplified Morocco shape */}
            <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 15 20 L 30 15 L 55 18 L 65 22 L 70 30 L 60 35 L 55 45 L 50 50 L 45 55 L 40 65 L 35 75 L 25 85 L 15 80 L 10 65 L 12 50 L 10 35 Z"
                fill="hsl(215, 25%, 15%)"
                stroke="hsl(152, 65%, 45%)"
                strokeWidth="0.5"
                opacity="0.6"
              />
              {regions.map((r, i) => (
                <g key={i}>
                  <circle
                    cx={r.x} cy={r.y} r={active === i ? 4 : 2.5}
                    fill={active === i ? "hsl(45, 95%, 55%)" : "hsl(152, 65%, 45%)"}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                  />
                  {active === i && (
                    <circle cx={r.x} cy={r.y} r="6" fill="none" stroke="hsl(152, 65%, 45%)" strokeWidth="0.5" opacity="0.5">
                      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}
            </svg>

            {/* Info panel */}
            {active !== null && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-4 right-4 glass-strong rounded-xl p-4 min-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-display font-bold text-sm">{regions[active].name}</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Water Savings: <span className="text-primary font-semibold">{regions[active].savings}</span></div>
                  <div>Target Area: <span className="text-accent font-semibold">{regions[active].hectares} ha</span></div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {regions.map((r, i) => (
              <button
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`p-3 rounded-lg text-left transition-all ${active === i ? "glow-border" : "bg-muted/30"}`}
              >
                <div className="font-display text-xs font-bold">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-1">Savings: {r.savings}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoroccoMap;
