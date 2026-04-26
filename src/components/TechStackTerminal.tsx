"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";

const stackData = [
  {
    category: "Core_Engineering",
    items: [
      { name: "React.js", status: "OK" },
      { name: "Next.js", status: "OK" },
      { name: "TypeScript", status: "OK" },
      { name: "Tailwind CSS", status: "OK" },
    ],
  },
  {
    category: "Commerce_Infrastructure",
    items: [
      { name: "Shopify", status: "OK" },
      { name: "WordPress / WooCommerce", status: "OK" },
    ],
  },
  {
    category: "AI_&&_Logic",
    items: [
      { name: "n8n", status: "OK" },
      { name: "OpenAI API", status: "OK" },
      { name: "Claude", status: "OK" },
      { name: "Codex", status: "OK" },
      { name: "Antigravity", status: "OK" },
    ],
  },
  {
    category: "Design_&&_Growth",
    items: [
      { name: "Figma", status: "OK" },
      { name: "Canva", status: "OK" },
      { name: "Meta/Google Ads", status: "OK" },
    ],
  },
];

export default function TechStackTerminal() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section id="stack" className="px-6 md:px-16 lg:px-24 py-24">
      <div className="mb-12">
        <h2 className="font-mono text-2xl md:text-3xl text-text-main mb-2">
          tech_stack<span className="text-accent"> //</span>
        </h2>
        <p className="font-mono text-sm text-text-muted">
          &gt; system_dependencies --tree
        </p>
      </div>

      <div className="border border-border-main bg-bg-main p-6 md:p-8 font-mono text-sm md:text-base overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="flex items-center gap-2 mb-6 text-terminal border-b border-border-subtle pb-4">
            <Terminal size={16} />
            <span>root@anilsen-dev:~$ tree ./dependencies</span>
          </div>

          <div className="space-y-4">
            {stackData.map((group, groupIdx) => (
              <div key={group.category}>
                <div className="flex text-text-main mb-1">
                  <span className="text-text-muted mr-2">
                    {groupIdx === stackData.length - 1 ? "└──" : "├──"}
                  </span>
                  <span className="font-bold text-accent">{group.category}</span>
                </div>
                <div className="pl-[26px] space-y-1">
                  {group.items.map((item, itemIdx) => {
                    const isLastItem = itemIdx === group.items.length - 1;
                    const prefix = isLastItem ? "└──" : "├──";
                    const isHovered = hoveredItem === item.name;
                    const groupPrefix = groupIdx === stackData.length - 1 ? "    " : "│   ";

                    return (
                      <div 
                        key={item.name}
                        className="flex items-center cursor-pointer group"
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span className="text-text-muted whitespace-pre mr-2">
                          {groupPrefix}{prefix}
                        </span>
                        <div 
                          className={`flex-1 flex justify-between px-2 py-0.5 transition-none border border-transparent ${
                            isHovered ? "bg-bone text-true-black border-bone" : "text-text-main hover:bg-bg-surface"
                          }`}
                        >
                          <span>{item.name}</span>
                          <span className={`${isHovered ? "text-true-black" : "text-text-muted"}`}>
                            [{item.status}]
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-border-subtle flex justify-between text-xs text-text-muted">
            <span>4 directories, 14 dependencies</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terminal animate-pulse"></span>
              All systems nominal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
