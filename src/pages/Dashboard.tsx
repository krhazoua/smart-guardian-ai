import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
import { Droplets, Thermometer, Wind, Sun, Gauge, Power, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const generateData = (base: number, variance: number, points = 24) =>
  Array.from({ length: points }, (_, i) => ({
    time: `${i}:00`,
    value: +(base + (Math.random() - 0.5) * variance).toFixed(1),
  }));

type Alert = { type: "critical" | "warning" | "optimal"; message: string; icon: typeof AlertTriangle };

const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    soilMoisture: 58,
    temperature: 28,
    humidity: 45,
    solarEnergy: 3.8,
    waterConsumption: 280,
    pumpStatus: true,
  });

  const [moistureHistory] = useState(generateData(55, 20));
  const [tempHistory] = useState(generateData(28, 10));
  const [solarHistory] = useState(generateData(3.5, 2));
  const [autoMode, setAutoMode] = useState(true);
  const [irrigating, setIrrigating] = useState(false);

  const alerts: Alert[] = [
    { type: "optimal", message: "Zone A: Soil moisture optimal at 58%", icon: CheckCircle },
    { type: "warning", message: "Zone B: Temperature rising above 35°C", icon: AlertCircle },
    { type: "critical", message: "Pump 3: Efficiency dropped by 15%", icon: AlertTriangle },
    { type: "optimal", message: "Solar panels: Output at 92% capacity", icon: CheckCircle },
  ];

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        soilMoisture: Math.max(20, Math.min(80, prev.soilMoisture + (Math.random() - 0.5) * 4)),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 1).toFixed(1),
        humidity: Math.max(20, Math.min(80, prev.humidity + (Math.random() - 0.5) * 3)),
        solarEnergy: +(Math.max(0, prev.solarEnergy + (Math.random() - 0.5) * 0.5)).toFixed(1),
        waterConsumption: Math.max(100, prev.waterConsumption + Math.floor((Math.random() - 0.3) * 10)),
        pumpStatus: prev.pumpStatus,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sensorCards = [
    { icon: Droplets, label: "Soil Moisture", value: `${Math.round(sensorData.soilMoisture)}%`, color: "text-primary", chart: moistureHistory },
    { icon: Thermometer, label: "Temperature", value: `${sensorData.temperature}°C`, color: "text-accent", chart: tempHistory },
    { icon: Wind, label: "Humidity", value: `${Math.round(sensorData.humidity)}%`, color: "text-primary", chart: null },
    { icon: Sun, label: "Solar Energy", value: `${sensorData.solarEnergy} kWh`, color: "text-accent", chart: solarHistory },
    { icon: Gauge, label: "Water Used", value: `${sensorData.waterConsumption}L`, color: "text-primary", chart: null },
    { icon: Power, label: "Pump Status", value: sensorData.pumpStatus ? "Active" : "Off", color: sensorData.pumpStatus ? "text-primary" : "text-destructive", chart: null },
  ];

  const alertColors = {
    critical: "border-destructive/50 bg-destructive/5",
    warning: "border-warning/50 bg-warning/5",
    optimal: "border-primary/50 bg-primary/5",
  };

  const alertTextColors = {
    critical: "text-destructive",
    warning: "text-warning",
    optimal: "text-primary",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl font-bold">AI <span className="text-gradient-primary">Dashboard</span></h1>
            <p className="text-muted-foreground mt-1">Real-time smart agriculture monitoring</p>
          </motion.div>

          {/* Sensor Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {sensorCards.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-4 glow-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <div className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4">Soil Moisture (24h)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={moistureHistory}>
                  <defs>
                    <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(152, 65%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(152, 65%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 18%)" />
                  <XAxis dataKey="time" stroke="hsl(215, 15%, 55%)" fontSize={10} />
                  <YAxis stroke="hsl(215, 15%, 55%)" fontSize={10} />
                  <Tooltip contentStyle={{ background: "hsl(210, 25%, 10%)", border: "1px solid hsl(215, 25%, 18%)", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="value" stroke="hsl(152, 65%, 45%)" fill="url(#moistGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4">Solar Energy Production (24h)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={solarHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 18%)" />
                  <XAxis dataKey="time" stroke="hsl(215, 15%, 55%)" fontSize={10} />
                  <YAxis stroke="hsl(215, 15%, 55%)" fontSize={10} />
                  <Tooltip contentStyle={{ background: "hsl(210, 25%, 10%)", border: "1px solid hsl(215, 25%, 18%)", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(45, 95%, 55%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Alerts & Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4">AI Alert System</h3>
              <div className="space-y-3">
                {alerts.map((a, i) => (
                  <div key={i} className={`rounded-lg p-3 border ${alertColors[a.type]} flex items-start gap-3`}>
                    <a.icon className={`w-5 h-5 shrink-0 mt-0.5 ${alertTextColors[a.type]}`} />
                    <span className="text-sm">{a.message}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass rounded-xl p-6">
              <h3 className="font-display font-semibold mb-4">AI Irrigation Control</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Auto Mode (AI Controlled)</span>
                  <Switch checked={autoMode} onCheckedChange={setAutoMode} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium">Irrigation Active</span>
                  <div className={`w-3 h-3 rounded-full ${irrigating ? "bg-primary animate-pulse-glow" : "bg-muted-foreground"}`} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => setIrrigating(true)}
                    disabled={autoMode}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-display"
                  >
                    Start Irrigation
                  </Button>
                  <Button
                    onClick={() => setIrrigating(false)}
                    disabled={autoMode}
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 font-display"
                  >
                    Stop Irrigation
                  </Button>
                </div>
                {autoMode && (
                  <p className="text-xs text-muted-foreground text-center">
                    AI is managing irrigation automatically based on sensor data
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default Dashboard;
