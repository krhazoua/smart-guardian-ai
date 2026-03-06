import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Droplets, GraduationCap, Users, Landmark } from "lucide-react";

const partners = [
  { icon: Landmark, name: "Ministry of Agriculture", desc: "Government irrigation modernization programs" },
  { icon: Droplets, name: "OCP Green Water", desc: "Sustainable water management initiative" },
  { icon: GraduationCap, name: "Moroccan Universities", desc: "AI research and talent pipeline" },
  { icon: Users, name: "Agricultural Cooperatives", desc: "Farmer adoption and deployment" },
  { icon: Building2, name: "Smart City Initiatives", desc: "Urban green space optimization" },
];

const Partners = () => {
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
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Ecosystem</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Strategic <span className="text-gradient-primary">Partners</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-xl p-5 text-center hover:glow-border transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1">{p.name}</h3>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
