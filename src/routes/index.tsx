import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ArticlesGrid } from "@/components/ArticlesGrid";
import { JoinCTA } from "@/components/JoinCTA";
import { useEffect } from "react";

export default function IndexPage() {
  useEffect(() => {
    document.title = "EVCharge Myanmar — The independent EV hub";
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ArticlesGrid />
        <JoinCTA />
      </main>
      <Footer />
    </div>
  );
}
