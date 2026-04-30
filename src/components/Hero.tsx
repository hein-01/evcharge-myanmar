import { motion } from "framer-motion";
import { ArrowRight, MapPin, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Floating glow orbs */}
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-electric/30 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-4 py-1.5 text-xs font-medium text-electric">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
            </span>
            Now live in Yangon, Mandalay & Naypyidaw
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Power your journey<br />
            across <span className="text-gradient-electric">Myanmar</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            The country's first nationwide EV fast-charging network. Find a station, plug in, pay in Kyat — all from one app.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-electric px-7 text-sm font-semibold text-electric-foreground transition hover:opacity-90" style={{ boxShadow: "var(--shadow-glow)" }}>
              <MapPin className="h-4 w-4" />
              Find a station
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-7 text-sm font-semibold text-foreground transition hover:bg-surface-elevated">
              <Zap className="h-4 w-4 text-electric" />
              For business
            </button>
          </div>

          <p className="mt-4 font-burmese text-xs text-muted-foreground">
            မြန်မာနိုင်ငံ၏ EV အားသွင်းကွန်ရက်
          </p>
        </motion.div>

        {/* Live stats card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-20 grid max-w-4xl grid-cols-2 divide-x divide-border rounded-2xl border border-border bg-surface/60 backdrop-blur md:grid-cols-4"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {[
            { v: "127", l: "Stations live" },
            { v: "412", l: "Charging points" },
            { v: "24/7", l: "Support" },
            { v: "≤30 min", l: "Fast charge" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-6 text-center">
              <div className="font-display text-3xl font-bold text-gradient-electric md:text-4xl">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
