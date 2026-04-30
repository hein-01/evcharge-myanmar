import { motion } from "framer-motion";
import { Smartphone, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-electric/30 bg-surface p-12 md:p-16"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-electric/30 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-[100px]" />

          <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
                Drive the<br />future of <span className="text-gradient-electric">Myanmar</span>.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Download the EVCharge app today and join thousands of EV drivers across the country.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="inline-flex h-12 items-center gap-2 rounded-full bg-electric px-6 text-sm font-semibold text-electric-foreground transition hover:opacity-90">
                  <Smartphone className="h-4 w-4" /> App Store
                </button>
                <button className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 text-sm font-semibold transition hover:bg-muted">
                  <Smartphone className="h-4 w-4" /> Google Play
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto aspect-[9/16] w-56 rounded-[2.2rem] border-4 border-border bg-background p-2 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-surface to-background p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Now charging</div>
                  <div className="mt-1 font-display text-2xl font-bold text-electric">62%</div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "62%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-electric to-accent"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
                    <div className="rounded-lg bg-surface-elevated p-2">
                      <div className="text-muted-foreground">Power</div>
                      <div className="font-semibold">82 kW</div>
                    </div>
                    <div className="rounded-lg bg-surface-elevated p-2">
                      <div className="text-muted-foreground">Time left</div>
                      <div className="font-semibold">14 min</div>
                    </div>
                    <div className="rounded-lg bg-surface-elevated p-2">
                      <div className="text-muted-foreground">Cost</div>
                      <div className="font-semibold">12,250 Ks</div>
                    </div>
                    <div className="rounded-lg bg-surface-elevated p-2">
                      <div className="text-muted-foreground">Energy</div>
                      <div className="font-semibold">35 kWh</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-electric/10 p-2 text-[10px]">
                    <span>Junction City · Yangon</span>
                    <ArrowRight className="h-3 w-3 text-electric" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
