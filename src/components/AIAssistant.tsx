import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = { role: "user" | "assistant"; content: string };

const aiResponses: Record<string, string> = {
  default: "I'm the Smart Guardian AI assistant. I can explain sensor data, irrigation recommendations, and environmental conditions. How can I help you?",
  soil: "🌱 **Soil Moisture Analysis**: Current soil moisture levels are at 42%, which is below the optimal range of 55-70%. AI recommends scheduling irrigation within the next 2 hours to prevent plant stress. The predictive model suggests 15 liters/m² based on current evapotranspiration rates.",
  water: "💧 **Water Usage Report**: Today's consumption is 340 liters across Zone A. This is 28% less than last month's average thanks to AI-optimized scheduling. No leaks detected in the system.",
  energy: "⚡ **Solar Energy Status**: Solar panels are generating 4.2 kWh, meeting 92% of current energy needs. Battery storage is at 78%. The AI recommends shifting pump operations to peak solar hours (11:00-15:00) for maximum efficiency.",
  alert: "🚨 **Active Alerts**: Zone B shows abnormal soil dryness (below 25%). Pump 2 efficiency has dropped by 12% — maintenance recommended. No critical failures detected.",
};

const getAIResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("soil") || lower.includes("moisture")) return aiResponses.soil;
  if (lower.includes("water") || lower.includes("irrigation")) return aiResponses.water;
  if (lower.includes("energy") || lower.includes("solar")) return aiResponses.energy;
  if (lower.includes("alert") || lower.includes("problem")) return aiResponses.alert;
  return aiResponses.default;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Hello! I'm the Smart Guardian AI. Ask me about soil conditions, water usage, energy, or alerts." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: getAIResponse(input) }]);
    }, 800);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow hover:scale-105 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] glass-strong rounded-2xl flex flex-col overflow-hidden border border-border/50"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-sm">Smart Guardian AI</div>
                <div className="text-xs text-muted-foreground">Environmental Assistant</div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div className={`rounded-xl px-3 py-2 text-sm max-w-[80%] ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3 h-3 text-accent" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about soil, water, energy..."
                className="flex-1 bg-muted/30 rounded-lg px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button size="sm" onClick={handleSend} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
