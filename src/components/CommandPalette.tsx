"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Monitor, Terminal, Briefcase, Mail, Code } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-50 pointer-events-none hidden md:block">
        <p className="font-mono text-sm text-terminal/60 flex items-center gap-2 bg-bg-main/80 px-3 py-1 border border-border-subtle">
          <Terminal size={14} />
          Press [Ctrl K] (Windows) or ⌘K (macOS) to execute
        </p>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] bg-true-black/80 flex items-start justify-center pt-[20vh]">
          <div className="w-full max-w-2xl bg-bg-main border-2 border-accent shadow-[0_0_20px_rgba(228,255,0,0.2)]">
            <Command
              loop
              className="flex flex-col w-full h-full"
            >
              <div className="flex items-center border-b border-border-subtle px-4 font-mono">
                <Search size={18} className="text-terminal" />
                <Command.Input 
                  autoFocus
                  placeholder="Enter command..." 
                  className="w-full bg-transparent border-none outline-none px-4 py-4 text-text-main font-mono placeholder:text-text-muted"
                />
              </div>

              <Command.List className="max-h-[300px] overflow-y-auto p-2 font-mono scrollbar-hide">
                <Command.Empty className="py-6 text-center text-text-muted">No results found.</Command.Empty>

                <Command.Group heading="Navigation" className="text-text-muted px-2 py-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-xs">
                  <Command.Item 
                    onSelect={() => handleSelect("hero")}
                    className="flex items-center gap-3 px-3 py-3 text-text-main cursor-pointer hover:bg-text-main hover:text-bg-main aria-selected:bg-bone aria-selected:text-charcoal transition-colors duration-0"
                  >
                    <Monitor size={16} />
                    <span>Home</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleSelect("services")}
                    className="flex items-center gap-3 px-3 py-3 text-text-main cursor-pointer hover:bg-text-main hover:text-bg-main aria-selected:bg-bone aria-selected:text-charcoal transition-colors duration-0"
                  >
                    <Code size={16} />
                    <span>Services</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleSelect("work")}
                    className="flex items-center gap-3 px-3 py-3 text-text-main cursor-pointer hover:bg-text-main hover:text-bg-main aria-selected:bg-bone aria-selected:text-charcoal transition-colors duration-0"
                  >
                    <Briefcase size={16} />
                    <span>Proof of Work</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleSelect("stack")}
                    className="flex items-center gap-3 px-3 py-3 text-text-main cursor-pointer hover:bg-text-main hover:text-bg-main aria-selected:bg-bone aria-selected:text-charcoal transition-colors duration-0"
                  >
                    <Terminal size={16} />
                    <span>Tech Stack Sandbox</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => handleSelect("contact")}
                    className="flex items-center gap-3 px-3 py-3 text-text-main cursor-pointer hover:bg-text-main hover:text-bg-main aria-selected:bg-bone aria-selected:text-charcoal transition-colors duration-0"
                  >
                    <Mail size={16} />
                    <span>Contact Terminal</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </>
  );
}
