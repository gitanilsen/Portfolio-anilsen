"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ShoppingCart, Bot, TrendingUp } from "lucide-react";

interface ServiceModule {
  id: string;
  icon: React.ElementType;
  title: string;
  tag: string;
  tags: string[];
  description: string;
  details: string[];
}

const modules: ServiceModule[] = [
  {
    id: "engineering",
    icon: Code,
    title: "Engineering",
    tag: "module_01",
    tags: ["React.js", "Next.js", "SaaS MVP", "App Dev"],
    description:
      "Full-cycle product engineering from architecture to deployment. Specializing in React/Next.js applications, SaaS MVPs, and scalable web platforms.",
    details: [
      "Component-driven architecture with React & Next.js",
      "End-to-end SaaS MVP development & iteration",
      "REST & GraphQL API design and integration",
      "Performance optimization & Core Web Vitals",
      "CI/CD pipeline setup & deployment automation",
    ],
  },
  {
    id: "commerce",
    icon: ShoppingCart,
    title: "Commerce",
    tag: "module_02",
    tags: ["Shopify", "WordPress", "WooCommerce", "Performance"],
    description:
      "E-commerce infrastructure that converts. From Shopify storefronts to WooCommerce ecosystems, built for speed and revenue.",
    details: [
      "Shopify theme development & custom apps",
      "WooCommerce architecture & plugin development",
      "Payment gateway integration & optimization",
      "Inventory management system design",
      "Conversion rate optimization & A/B testing",
    ],
  },
  {
    id: "ai-logic",
    icon: Bot,
    title: "AI & Logic",
    tag: "module_03",
    tags: ["Custom Chatbots", "n8n", "Make", "OpenAI"],
    description:
      "Intelligent automation that removes bottlenecks. Custom chatbots, workflow automation with n8n/Make, and OpenAI integrations.",
    details: [
      "Custom AI chatbot development & training",
      "n8n & Make workflow automation pipelines",
      "OpenAI API integration for business logic",
      "Data processing & ETL automation",
      "Intelligent lead scoring & routing systems",
    ],
  },
  {
    id: "growth",
    icon: TrendingUp,
    title: "Growth",
    tag: "module_04",
    tags: ["Meta Ads", "Google Ads", "Funnels", "Figma UI/UX"],
    description:
      "Performance marketing and design that drives measurable results. Full-funnel strategy from creative to conversion.",
    details: [
      "Meta & Google Ads campaign architecture",
      "Conversion funnel design & optimization",
      "Figma UI/UX design & prototyping",
      "Landing page design & CRO strategy",
      "Analytics setup & attribution modeling",
    ],
  },
];

export default function ServicesGrid() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section id="services" className="px-6 md:px-16 lg:px-24 py-24">
      <div className="mb-12">
        <h2 className="font-mono text-2xl md:text-3xl text-text-main mb-2">
          services<span className="text-accent"> //</span>
        </h2>
        <p className="font-mono text-sm text-text-muted">
          &gt; grouped_execution_modules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-border-main">
        {modules.map((mod) => {
          const Icon = mod.icon;
          const isExpanded = expanded === mod.id;

          return (
            <motion.div
              key={mod.id}
              layout
              onClick={() => handleToggle(mod.id)}
              className={`border border-border-main p-6 md:p-8 cursor-pointer transition-colors duration-0 ${
                isExpanded
                  ? "bg-bg-surface md:col-span-2"
                  : "hover:bg-bg-surface"
              }`}
            >
              <motion.div layout="position" className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon size={20} className={isExpanded ? "text-accent" : "text-text-muted"} />
                  <div>
                    <p className="font-mono text-xs text-text-muted">{mod.tag}</p>
                    <h3 className="font-mono text-xl text-text-main">{mod.title}</h3>
                  </div>
                </div>
                <span className="font-mono text-accent text-sm">
                  {isExpanded ? "[-]" : "[+]"}
                </span>
              </motion.div>

              <motion.div layout="position" className="flex flex-wrap gap-2 mb-4">
                {mod.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-1 border border-border-subtle text-text-muted-hover"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="font-body text-text-muted-hover mb-6 leading-relaxed">
                      {mod.description}
                    </p>
                    <ul className="space-y-2">
                      {mod.details.map((detail, i) => (
                        <li key={i} className="font-mono text-sm text-text-main flex items-start gap-2">
                          <span className="text-terminal mt-0.5">→</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
