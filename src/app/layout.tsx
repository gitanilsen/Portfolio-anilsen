import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BottomDock from "@/components/BottomDock";
import CommandPalette from "@/components/CommandPalette";
import FloatingWidgets from "@/components/FloatingWidgets";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anil Sen | Full Stack Engineer & Digital Partner",
  description:
    "Portfolio of Anil Sen — Full Stack Engineer & Digital Partner. React, Next.js, Shopify, AI automation, and performance marketing. Available for new deployments.",
  keywords: ["Anil Sen", "Full Stack Developer", "Next.js", "React", "Shopify", "AI Automation", "India"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.setAttribute('data-theme', 'light');
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative selection:bg-accent selection:text-true-black">
        <CommandPalette />
        {children}
        <BottomDock />
        <FloatingWidgets />
      </body>
    </html>
  );
}
