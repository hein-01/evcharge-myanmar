import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-electric blur-md opacity-60" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-accent">
              <Zap className="h-5 w-5 text-electric-foreground" strokeWidth={2.5} fill="currentColor" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight">EVCharge</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Myanmar</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#network" className="text-muted-foreground transition hover:text-foreground">Network</a>
          <a href="#pricing" className="text-muted-foreground transition hover:text-foreground">Pricing</a>
          <a href="#how" className="text-muted-foreground transition hover:text-foreground">How it works</a>
          <a href="#stations" className="text-muted-foreground transition hover:text-foreground">Stations</a>
        </nav>
        <button className="inline-flex h-10 items-center justify-center rounded-full bg-electric px-5 text-sm font-semibold text-electric-foreground transition hover:opacity-90">
          Get the app
        </button>
      </div>
    </header>
  );
}
