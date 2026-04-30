import { motion } from "framer-motion";
import { Search, Plug, CreditCard } from "lucide-react";

const steps = [
  { icon: Search, title: "Find", desc: "Locate the nearest available charger on the live map. Filter by speed, connector & price." },
  { icon: Plug, title: "Plug in", desc: "Scan the QR code on the station. We support Type 2, CCS2 and CHAdeMO connectors." },
  { icon: CreditCard, title: "Pay in MMK", desc: "Pay via KBZPay, WavePay or card. Per-kWh pricing with no hidden fees." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-electric">— How it works</div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Three steps. Done.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition hover:border-electric/40"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-electric/10 blur-3xl transition group-hover:bg-electric/20" />
              <div className="relative">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-accent text-electric-foreground">
                  <s.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <div className="mb-2 font-mono text-xs text-muted-foreground">0{i + 1}</div>
                <h3 className="mb-2 font-display text-2xl font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
