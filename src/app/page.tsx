import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ProofOfWork from "@/components/ProofOfWork";
import ContactTerminal from "@/components/ContactTerminal";
import TechStackTerminal from "@/components/TechStackTerminal";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <div className="w-full h-px bg-border-main" />

      <Hero />

      <div className="w-full h-px bg-border-main" />
      <ServicesGrid />

      <div className="w-full h-px bg-border-main" />
      <ProofOfWork />

      <div className="w-full h-px bg-border-main" />
      <TechStackTerminal />

      <div className="w-full h-px bg-border-main" />
      <ContactTerminal />

      {/* Footer */}
      <footer className="border-t border-border-main px-6 md:px-16 lg:px-24 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-text-muted text-center md:text-left">
            <span>© 2026 Anil Sen. All rights reserved.</span>
            <div className="mt-2 md:mt-0 md:inline-block">
              <a href="/privacy" className="hover:text-terminal transition-colors md:ml-4">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="/terms" className="hover:text-terminal transition-colors">Terms of Use</a>
            </div>
          </div>
          <p className="font-mono text-xs text-text-muted">
            <span className="text-accent">Status: Online</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
