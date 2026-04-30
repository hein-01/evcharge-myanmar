import { motion } from "framer-motion";

const connectors = [
  { name: "Type 2 AC", speed: "7–22 kW", use: "Slow / overnight", color: "from-electric to-accent" },
  { name: "CCS2 DC", speed: "50–180 kW", use: "Fast charging", color: "from-accent to-electric" },
  { name: "CHAdeMO", speed: "50 kW", use: "Japanese EVs", color: "from-electric to-accent" },
  { name: "GB/T DC", speed: "60–120 kW", use: "Chinese EVs", color: "from-accent to-electric" },
];

export function Connectors() {
  return (
    <section id="network" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-electric">— Compatibility</div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Every plug. Every car.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether you drive a BYD, Tesla, Nissan Leaf or local import — we've got the right connector.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {connectors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition hover:border-electric/40"
            >
              <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color}`}>
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-electric-foreground" fill="currentColor">
                  <circle cx="8" cy="9" r="1.6" />
                  <circle cx="16" cy="9" r="1.6" />
                  <circle cx="12" cy="15" r="1.6" />
                  <path d="M12 2 a10 10 0 0 0 0 20 a10 10 0 0 0 0 -20 z M12 4 a8 8 0 0 1 0 16 a8 8 0 0 1 0 -16 z" />
                </svg>
              </div>
              <div className="font-display text-lg font-bold">{c.name}</div>
              <div className="text-sm text-electric">{c.speed}</div>
              <div className="mt-1 text-xs text-muted-foreground">{c.use}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
