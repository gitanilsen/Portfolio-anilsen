import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
          <span className="text-terminal">&gt;</span> Privacy_Policy
        </h1>

        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-accent mb-4">1. Information Collection</h2>
            <p className="text-text-muted mb-4">
              When you use this portfolio terminal, certain information may be collected automatically, such as your IP address, browser type, and operating system. If you choose to contact me via the "Initialize Call" or "Book A Call" modules, I collect the personal data you voluntarily provide, including your name, email address, and project details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">2. Use of Information</h2>
            <p className="text-text-muted mb-4">
              The information collected is used strictly for communication purposes, to evaluate potential project collaborations, and to improve the overall functionality of this site. Your data will never be sold, rented, or shared with third-party marketers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">3. Data Security</h2>
            <p className="text-text-muted mb-4">
              I implement industry-standard security measures to protect your personal information. Transmission of data through the contact modules is secured, and backend processing is handled securely without exposing sensitive credentials to the client side.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">4. Cookies and Tracking</h2>
            <p className="text-text-muted mb-4">
              This site may use minimal cookies to enhance user experience (such as remembering your theme preference). You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-accent mb-4">5. Contact Information</h2>
            <p className="text-text-muted mb-4">
              If you have any questions about this Privacy Policy, please contact me directly at: <a href="mailto:anilsen3095@gmail.com" className="text-terminal hover:underline">anilsen3095@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
