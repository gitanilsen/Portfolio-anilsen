"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface CaseStudy {
  id: string;
  name: string;
  scope: string;
  tags: string[];
  description: string;
  color: string;
  href: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "rengen-ai",
    name: "RenGen AI Studio",
    scope: "SaaS Product / Android App",
    tags: ["Next.js", "Gemini AI", "Firebase", "Android"],
    description:
      "Built a fully functional AI image generation SaaS platform with custom pricing tiers, an optimized Gemini + Sharp generation pipeline, and a native Android app deployed to the Play Store.",
    color: "var(--accent-text)",
    href: "https://www.rengenaistudio.xyz/",
  },
  {
    id: "pavya",
    name: "Pavya",
    scope: "E-Commerce Infrastructure",
    tags: ["Product Catalog", "Storefront", "Launch"],
    description:
      "End-to-end e-commerce infrastructure. Designed and deployed a complete product catalog management system with optimized storefront architecture for a seamless market launch.",
    color: "var(--terminal-green)",
    href: "https://pavya.in/",
  },
  {
    id: "rr-interior",
    name: "RR Interior Solutions",
    scope: "Lead Generation Architecture",
    tags: ["Lead-Gen", "Local SEO", "Conversion"],
    description:
      "High-converting lead-generation architecture paired with local business SEO strategy. Focused on capturing and routing qualified leads through an optimized digital funnel.",
    color: "var(--accent-text)",
    href: "https://rrinteriorsolutions.in/",
  },
  {
    id: "nuraa",
    name: "Nuraa",
    scope: "Commerce → Advertising Pipeline",
    tags: ["WooCommerce", "Meta Ads", "Campaign Mgmt"],
    description:
      "From WooCommerce storefront setup to active Meta Ad campaign management. Built the full pipeline from product listing to paid acquisition with tracked ROAS.",
    color: "var(--terminal-green)",
    href: "https://nuraaonline.com/",
  },
  {
    id: "pagidoo",
    name: "Pagidoo",
    scope: "Landing Page Architecture",
    tags: ["Single-Page", "PDF Distribution", "Razorpay"],
    description:
      "Single-page landing experience for digital PDF distribution. Clean, conversion-focused design with integrated payment processing and automated delivery.",
    color: "var(--accent-text)",
    href: "https://www.pagidoo.com/",
  },
  {
    id: "tradegenius",
    name: "TradeGenius AI",
    scope: "Educational Platform",
    tags: ["LMS", "Course Management", "AI Training"],
    description: "Built a comprehensive stock market training platform featuring live market classes, course enrollments, and AI-driven trading strategy modules. Designed for high conversions and student engagement.",
    color: "var(--terminal-green)",
    href: "https://tradegeniusaiacademy.com/",
  },
  {
    id: "piroki",
    name: "Piroki",
    scope: "Custom E-Commerce",
    tags: ["Shopify", "Fashion Retail", "D2C"],
    description: "Developed a high-performance custom Shopify storefront for an Indian fashion brand. Focused on mobile-first navigation, fast checkout flows, and premium brand aesthetics to drive direct-to-consumer sales.",
    color: "var(--accent-text)",
    href: "https://piroki.in/",
  },
  {
    id: "balancemyfrequency",
    name: "Balance My Frequency",
    scope: "Subscription Service",
    tags: ["Web App", "Memberships", "Well-being"],
    description: "Designed and launched a remote frequency program membership site. Implemented a seamless 2-week trial funnel, secure photo upload integration, and recurring billing architecture.",
    color: "var(--terminal-green)",
    href: "https://balancemyfrequency.com/",
  },
  {
    id: "redactshield",
    name: "RedactShield",
    scope: "Web Utility",
    tags: ["Next.js", "Security", "Image Processing"],
    description: "Engineered a secure client-side document and image redacting tool. Built with Next.js for blazing fast performance, ensuring sensitive data is processed locally without server exposure.",
    color: "var(--accent-text)",
    href: "https://redact-shield.vercel.app/",
  },
  {
    id: "sushen",
    name: "Sushen Biopharma",
    scope: "Corporate Identity",
    tags: ["Pharmaceuticals", "Branding", "CMS"],
    description: "Created a professional, trust-building digital presence for a skincare and haircare pharmaceutical leader. Showcased their product lines, scientific research, and corporate identity through a tailored CMS solution.",
    color: "var(--terminal-green)",
    href: "https://sushenbiopharma.com/",
  },
  {
    id: "yt-analyzer",
    name: "YT Comment Analyzer",
    scope: "AI Utility Tool",
    tags: ["LLM", "Sentiment Analysis", "PDF Export"],
    description: "An AI-powered tool that performs deep and normal scans of YouTube comment sections. It accurately detects viewer moods (positive/negative/neutral), extracts the most asked questions, and generates downloadable PDF reports.",
    color: "var(--accent-text)",
    href: "#",
  },
];

export default function ProofOfWork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="work" className="px-6 md:px-16 lg:px-24 py-24">
      <div className="mb-12">
        <h2 className="font-mono text-2xl md:text-3xl text-text-main mb-2">
          proof_of_work<span className="text-accent"> //</span>
        </h2>
        <p className="font-mono text-sm text-text-muted">&gt; deployed_case_studies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-border-main">
        {caseStudies.map((study) => {
          const isHovered = hoveredId === study.id;
          return (
            <a
              key={study.id}
              href={study.href}
              target={study.href !== "#" ? "_blank" : undefined}
              rel={study.href !== "#" ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHoveredId(study.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="border border-border-main relative cursor-pointer overflow-hidden block"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: `linear-gradient(135deg, ${study.color}08 0%, transparent 60%)`,
                  transition: "opacity 0ms",
                }}
              />
              <div className="relative p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="font-mono text-xs text-text-muted mb-1">{study.scope}</p>
                    <h3
                      className="font-mono text-2xl md:text-3xl font-bold"
                      style={{ color: isHovered ? study.color : "var(--text-main)", transition: "color 0ms" }}
                    >
                      {study.name}
                    </h3>
                  </div>
                  <ExternalLink
                    size={18}
                    style={{ color: isHovered ? study.color : "var(--border-subtle)", transition: "color 0ms" }}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-1 border"
                      style={{
                        borderColor: isHovered ? study.color : "var(--border-subtle)",
                        color: isHovered ? study.color : "var(--text-muted)",
                        transition: "color 0ms, border-color 0ms",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    maxHeight: isHovered ? "200px" : "0px",
                    opacity: isHovered ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 200ms, opacity 200ms",
                  }}
                >
                  <p className="font-body text-sm text-text-muted-hover leading-relaxed">{study.description}</p>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{
                    width: isHovered ? "100%" : "0%",
                    backgroundColor: study.color,
                    transition: "width 200ms",
                  }}
                />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
