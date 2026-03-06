import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Download, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* CTA Section */}
      <section className="py-24 relative" ref={ref}>
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Join the <span className="text-gradient-primary">Green AI</span> Revolution
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Together, we can transform Moroccan agriculture and build a sustainable future.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display gap-2 shadow-glow">
                Request Demo <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 font-display gap-2">
                <Users className="w-4 h-4" /> Partner With Us
              </Button>
              <Button size="lg" variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 font-display gap-2">
                <Download className="w-4 h-4" /> Download Presentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-sm">SMART GUARDIAN</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Smart Guardian — Ramadan AI Hackathon, Casablanca-Settat, Morocco
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
