import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const tiers = [
  {
    name: "Pay as you go",
    price: "350",
    unit: "MMK / kWh",
    desc: "Perfect for occasional drivers. No subscription required.",
    features: ["Access to all 127 stations", "Standard charging speed", "App support in EN & MM", "Pay via KBZPay or WavePay"],
    cta: "Start charging",
  },
  {
    name: "EV+ Member",
    price: "29,000",
    unit: "MMK / month",
    desc: "Unlimited monthly charging for daily commuters.",
    features: ["280 MMK/kWh discounted rate", "Priority access to fast chargers", "Free reservation up to 30 min", "Family account (up to 3 EVs)", "Roadside assistance"],
    cta: "Become a member",
    featured: true,
  },
  {
    name: "Fleet & Business",
    price: "Custom",
    unit: "Volume pricing",
    desc: "For taxi fleets, logistics & corporate EV programs.",
    features: ["Centralized billing in MMK", "Dedicated account manager", "Custom installation at your site", "Fleet analytics dashboard", "API access"],
    cta: "Contact sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-electric">— Pricing</div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Transparent. In Kyat.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">No hidden fees, no surge pricing. Pay only for what you charge.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border p-8 ${
                t.featured
                  ? "border-electric/60 bg-gradient-to-b from-electric/10 to-surface"
                  : "border-border bg-surface"
              }`}
              style={t.featured ? { boxShadow: "var(--shadow-glow)" } : { boxShadow: "var(--shadow-card)" }}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-electric px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-electric-foreground">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-xl font-bold">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              <div className="my-6 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.unit}</span>
              </div>
              <ul className="space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                  t.featured
                    ? "bg-electric text-electric-foreground hover:opacity-90"
                    : "border border-border bg-surface-elevated text-foreground hover:bg-muted"
                }`}
              >
                <Zap className="h-4 w-4" /> {t.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
