import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-accent">
                <Zap className="h-5 w-5 text-electric-foreground" fill="currentColor" />
              </div>
              <span className="font-display text-base font-bold">EVCharge Myanmar</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Powering Myanmar's transition to electric mobility, one station at a time.
            </p>
            <p className="mt-2 font-burmese text-xs text-muted-foreground">
              အီလက်ထရစ်ယာဉ် အားသွင်းကွန်ရက်
            </p>
          </div>
          {[
            { title: "Network", links: ["Find a station", "Coverage map", "Add a station", "Pricing"] },
            { title: "Company", links: ["About us", "Sustainability", "Careers", "Press"] },
            { title: "Support", links: ["Help center", "Contact us", "Driver app", "Partner login"] },
          ].map((c) => (
            <div key={c.title}>
              <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">{c.title}</div>
              <ul className="space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-muted-foreground transition hover:text-electric">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© 2026 EVCharge Myanmar. Yangon · Mandalay · Naypyidaw.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
