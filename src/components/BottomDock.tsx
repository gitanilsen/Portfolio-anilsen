"use client";

import { Home, Layers, Briefcase, Cpu, Mail, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "services", icon: Layers, label: "Services" },
  { id: "work", icon: Briefcase, label: "Work" },
  { id: "stack", icon: Cpu, label: "Stack" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export default function BottomDock() {
  const [active, setActive] = useState("hero");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check initial theme on mount
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      setTheme("light");
    }
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div 
        className="flex items-center gap-2 px-4 py-2 bg-bg-main/90 backdrop-blur-md border border-border-subtle"
        style={{ borderRadius: "9999px" }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              suppressHydrationWarning
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`p-3 transition-colors duration-0 ${
                isActive 
                  ? "bg-text-main text-bg-main" 
                  : "text-text-main hover:bg-text-main hover:text-bg-main"
              }`}
              style={{ borderRadius: "9999px" }}
              aria-label={item.label}
              title={item.label}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}

        <div className="w-[1px] h-8 bg-border-main mx-1" />

        <button
          suppressHydrationWarning
          onClick={toggleTheme}
          className="p-3 text-text-main hover:bg-text-main hover:text-bg-main transition-colors duration-0"
          style={{ borderRadius: "9999px" }}
          aria-label="Toggle Theme"
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <Sun size={20} strokeWidth={2} />
          ) : (
            <Moon size={20} strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
