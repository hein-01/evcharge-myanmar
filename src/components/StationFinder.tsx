import { motion } from "framer-motion";
import { MapPin, Zap, Clock } from "lucide-react";

const stations = [
  { name: "Junction City", city: "Yangon", available: 4, total: 6, kw: 120, status: "available", x: 28, y: 70 },
  { name: "Myanmar Plaza", city: "Yangon", available: 2, total: 4, kw: 60, status: "available", x: 32, y: 75 },
  { name: "Inya Lake Hotel", city: "Yangon", available: 0, total: 3, kw: 50, status: "busy", x: 30, y: 65 },
  { name: "Mandalay Hill Resort", city: "Mandalay", available: 3, total: 4, kw: 150, status: "available", x: 45, y: 35 },
  { name: "Yadanabon Mall", city: "Mandalay", available: 1, total: 2, kw: 50, status: "available", x: 48, y: 40 },
  { name: "Capital Hyper", city: "Naypyidaw", available: 5, total: 6, kw: 180, status: "available", x: 42, y: 52 },
  { name: "Bagan Junction", city: "Bagan", available: 2, total: 2, kw: 50, status: "available", x: 38, y: 45 },
  { name: "Taunggyi Center", city: "Shan State", available: 1, total: 3, kw: 60, status: "available", x: 58, y: 48 },
];

export function StationFinder() {
  return (
    <section id="stations" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-electric">— The Network</div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Stations across the country</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            From the Shwedagon to Mandalay Hill, recharge wherever the road takes you. New stations added monthly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Map visualization */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 50%, oklch(0.86 0.20 170 / 0.15), transparent 60%)" }} />

            {/* Stylized Myanmar outline using SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <path
                d="M 35 8 Q 50 12 52 25 L 58 38 Q 62 48 55 55 L 50 65 Q 48 78 38 85 L 30 92 Q 22 88 25 78 L 22 65 Q 18 55 25 48 L 28 35 Q 30 20 35 8 Z"
                fill="oklch(0.20 0.025 240)"
                stroke="oklch(0.86 0.20 170 / 0.4)"
                strokeWidth="0.3"
              />
            </svg>

            {stations.map((s, i) => (
              <motion.button
                key={s.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring" }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <div className={`relative flex h-3 w-3 items-center justify-center rounded-full ${s.status === "available" ? "bg-electric" : "bg-ruby"}`}>
                  <div className={`absolute inset-0 rounded-full ${s.status === "available" ? "bg-electric" : "bg-ruby"} glow-pulse`} />
                </div>
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-[10px] font-medium opacity-0 transition group-hover:opacity-100">
                  {s.name}
                </div>
              </motion.button>
            ))}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-2 text-xs backdrop-blur">
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-electric" /> Available</div>
              <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ruby" /> Busy</div>
              <div className="text-muted-foreground">Live · updated 2 min ago</div>
            </div>
          </div>

          {/* Station list */}
          <div className="space-y-3">
            {stations.slice(0, 6).map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-electric/50 hover:bg-surface-elevated"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-electric/10">
                  <MapPin className="h-5 w-5 text-electric" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.city}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-sm font-semibold">
                    <Zap className="h-3.5 w-3.5 text-electric" /> {s.kw} kW
                  </div>
                  <div className={`text-xs ${s.available > 0 ? "text-electric" : "text-ruby"}`}>
                    {s.available}/{s.total} free
                  </div>
                </div>
              </motion.div>
            ))}
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-4 text-sm text-muted-foreground transition hover:border-electric hover:text-electric">
              <Clock className="h-4 w-4" /> View all 127 stations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
