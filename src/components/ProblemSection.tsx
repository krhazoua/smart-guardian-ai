import { motion } from "framer-motion";
import { Droplets, Zap, AlertTriangle, Eye } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const problems = [
  { icon: Droplets, title: "Water Scarcity & Drought", desc: "Morocco faces severe water stress, with annual rainfall declining by 20% over the past decade.", color: "text-primary" },
  { icon: AlertTriangle, title: "20–50% Irrigation Waste", desc: "Outdated irrigation systems waste up to half of all water used in agriculture.", color: "text-destructive" },
  { icon: Zap, title: "High Energy Consumption", desc: "Traditional irrigation pumps consume excessive electricity, increasing operational costs.", color: "text-accent" },
  { icon: Eye, title: "No Real-Time Monitoring", desc: "Lack of environmental data prevents farmers from making informed irrigation decisions.", color: "text-warning" },
];

const chartData = [
  { name: "Water Waste", value: 45, fill: "hsl(152, 65%, 45%)" },
  { name: "Energy Loss", value: 35, fill: "hsl(45, 95%, 55%)" },
  { name: "Crop Loss", value: 25, fill: "hsl(0, 72%, 51%)" },
  { name: "CO₂ Emissions", value: 30, fill: "hsl(30, 90%, 50%)" },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-destructive uppercase tracking-wider">The Challenge</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Environmental Challenges in <span className="text-gradient-accent">Morocco</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Morocco's agricultural sector faces critical environmental challenges that threaten food security and sustainability.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6 flex gap-4 hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <p.icon className={`w-6 h-6 ${p.color}`} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="font-display font-semibold text-lg mb-4 text-center">Annual Resource Loss in Moroccan Agriculture (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 18%)" />
              <XAxis dataKey="name" stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "hsl(210, 25%, 10%)", border: "1px solid hsl(215, 25%, 18%)", borderRadius: "8px" }}
                labelStyle={{ color: "hsl(0, 0%, 95%)" }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
