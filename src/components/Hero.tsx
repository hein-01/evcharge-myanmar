import { motion } from "framer-motion";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-eco" />
            The independent EV hub for Myanmar
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Everything <span className="text-gradient-electric">electric</span>,<br />
            in one place.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Find chargers, browse EVs, discover workshops, compare insurance and stay on top of the news — Myanmar's growing EV ecosystem under one roof.
          </p>

          {/* Universal search */}
          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-sm" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="flex flex-1 items-center gap-2 px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search stations, EVs, workshops…"
                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="inline-flex h-10 items-center gap-1.5 rounded-full bg-electric px-5 text-sm font-semibold text-electric-foreground transition hover:opacity-90">
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Try:</span>
            {["BYD Atto 3", "fast charger Yangon", "EV insurance", "Mandalay workshop"].map((t) => (
              <Link key={t} to="/stations" className="rounded-full bg-secondary px-3 py-1 transition hover:bg-muted">
                {t}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Pillar shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { to: "/stations", label: "Charging stations", count: "127 live", emoji: "⚡", grad: "from-electric/15 to-electric/5" },
            { to: "/marketplace", label: "Cars & accessories", count: "Coming soon", emoji: "🚗", grad: "from-eco/15 to-eco/5" },
            { to: "/services", label: "Workshops & repair", count: "48 verified", emoji: "🔧", grad: "from-accent/15 to-accent/5" },
            { to: "/news", label: "EV news & guides", count: "New daily", emoji: "📰", grad: "from-ruby/10 to-ruby/0" },
          ].map((p) => (
            <Link
              key={p.to}
              to={p.to as "/stations"}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${p.grad} p-5 transition hover:border-electric/40 hover:-translate-y-0.5`}
            >
              <div className="text-2xl">{p.emoji}</div>
              <div className="mt-3 font-semibold">{p.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{p.count}</div>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
