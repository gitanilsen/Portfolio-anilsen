import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfUse() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-bg-main text-text-main p-6 md:p-16 lg:p-24 font-mono">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-text-muted hover:text-terminal transition-colors mb-12 w-fit"
      >
        <ArrowLeft size={16} />
        [ Return_To_Terminal ]
      </Link>

      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-border-main pb-4">
          <span className="text-terminal">&gt;</span> Terms_Of_Use
        </h1>

        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-accent mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-muted mb-4">
              By accessing and using this portfolio terminal, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">2. Intellectual Property</h2>
            <p className="text-text-muted mb-4">
              All content on this website, including text, graphics, logos, images, and source code, is the property of Anil Sen unless otherwise stated. Unauthorized use, reproduction, or distribution of this material without explicit permission is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">3. Disclaimer of Warranties</h2>
            <p className="text-text-muted mb-4">
              The information provided on this website is for general informational purposes only. While I strive to keep the information up to date and correct, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information contained on the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">4. Limitation of Liability</h2>
            <p className="text-text-muted mb-4">
              In no event will I be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">5. Governing Law</h2>
            <p className="text-text-muted mb-4">
              These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
