"use client";

import { useState, FormEvent } from "react";
import { Mail, Link2, GitFork, MapPin, Terminal, Send, Camera } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";

interface FormData {
  name: string;
  email: string;
  mobile: string;
  scope: string;
  budget: string;
}

export default function ContactTerminal() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", mobile: "", scope: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const budgetOptions = [
    { value: "< ₹25k", label: "< ₹25k" },
    { value: "₹25k–₹75k", label: "₹25k–₹75k" },
    { value: "₹75k–₹2L", label: "₹75k–₹2L" },
    { value: "> ₹2L", label: "> ₹2L" },
    { value: "discuss", label: "let's discuss" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const result = await sendEmail(form);
    setIsPending(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert("Transmission failed. Please check your connection and try again.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "email",
      value: "anilsen3095@gmail.com",
      href: "mailto:anilsen3095@gmail.com",
    },
    {
      icon: Link2,
      label: "linkedin",
      value: "/in/anil-sen-206272122",
      href: "https://www.linkedin.com/in/anil-sen-206272122",
    },
    {
      icon: GitFork,
      label: "github",
      value: "/gitanilsen",
      href: "https://github.com/gitanilsen",
    },
    {
      icon: Camera,
      label: "instagram",
      value: "@codingwithanil",
      href: "https://www.instagram.com/codingwithanil",
    },
    {
      icon: MapPin,
      label: "location",
      value: "India",
      href: null,
    },
  ];

  return (
    <section id="contact" className="px-6 md:px-16 lg:px-24 py-24 pb-32">
      <div className="mb-12">
        <h2 className="font-mono text-2xl md:text-3xl text-text-main mb-2">
          contact_terminal<span className="text-accent"> //</span>
        </h2>
        <p className="font-mono text-sm text-text-muted">
          &gt; open_channel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-border-main">
        {/* Left: Contact Info */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-main">
          <div className="flex items-center gap-2 mb-8">
            <Terminal size={16} className="text-terminal" />
            <span className="font-mono text-xs text-text-muted">contact_info.sh</span>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <Icon size={16} className="text-text-muted mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-mono text-xs text-text-muted mb-1">{item.label}_</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="font-mono text-text-main hover:text-accent transition-colors duration-0 hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-mono text-text-main">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="mt-12 pt-8 border-t border-border-main">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-terminal animate-pulse" />
              <span className="font-mono text-xs text-terminal">available for new deployments</span>
            </div>
          </div>
        </div>

        {/* Right: Terminal Form */}
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-2 mb-8">
            <Terminal size={16} className="text-terminal" />
            <span className="font-mono text-xs text-text-muted">new_project.sh</span>
          </div>

          {submitted ? (
            <div className="space-y-3">
              <p className="font-mono text-terminal text-sm">&gt; transmission successful!</p>
              <p className="font-mono text-text-muted text-sm">&gt; thank you for reaching out. i'll get back to you within 24 hours.</p>
              <p className="font-mono text-text-muted text-sm">&gt; (unless i'm trapped in an infinite loop, in which case, please send help.)</p>
              <p className="font-mono text-accent text-sm pt-2">&gt; standing by_<span className="animate-pulse">▌</span></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="font-mono text-xs text-text-muted block mb-2">
                  <span className="text-terminal">&gt;</span> name_
                </label>
                <input
                  suppressHydrationWarning
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="your_name"
                  className="w-full bg-transparent font-mono text-text-main text-sm px-4 py-3 border outline-none placeholder:text-border-subtle"
                  style={{
                    borderColor: focused === "name" ? "var(--accent-text)" : "var(--border-subtle)",
                    transition: "border-color 0ms",
                  }}
                />
              </div>

              {/* Email & Mobile Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="font-mono text-xs text-text-muted block mb-2">
                    <span className="text-terminal">&gt;</span> email_
                  </label>
                  <input
                    suppressHydrationWarning
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="email@domain.com"
                    className="w-full bg-transparent font-mono text-text-main text-sm px-4 py-3 border outline-none placeholder:text-border-subtle"
                    style={{
                      borderColor: focused === "email" ? "var(--accent-text)" : "var(--border-subtle)",
                      transition: "border-color 0ms",
                    }}
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="font-mono text-xs text-text-muted block mb-2">
                    <span className="text-terminal">&gt;</span> mobile_
                  </label>
                  <input
                    suppressHydrationWarning
                    type="tel"
                    required
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    onFocus={() => setFocused("mobile")}
                    onBlur={() => setFocused(null)}
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent font-mono text-text-main text-sm px-4 py-3 border outline-none placeholder:text-border-subtle"
                    style={{
                      borderColor: focused === "mobile" ? "var(--accent-text)" : "var(--border-subtle)",
                      transition: "border-color 0ms",
                    }}
                  />
                </div>
              </div>

              {/* Scope */}
              <div>
                <label className="font-mono text-xs text-text-muted block mb-2">
                  <span className="text-terminal">&gt;</span> project_scope_
                </label>
                <textarea
                  suppressHydrationWarning
                  required
                  value={form.scope}
                  onChange={(e) => setForm({ ...form, scope: e.target.value })}
                  onFocus={() => setFocused("scope")}
                  onBlur={() => setFocused(null)}
                  placeholder="describe your project..."
                  rows={3}
                  className="w-full bg-transparent font-mono text-text-main text-sm px-4 py-3 border outline-none placeholder:text-border-subtle resize-none"
                  style={{
                    borderColor: focused === "scope" ? "var(--accent-text)" : "var(--border-subtle)",
                    transition: "border-color 0ms",
                  }}
                />
              </div>

              {/* Budget Custom Dropdown */}
              <div className="relative">
                <label className="font-mono text-xs text-text-muted block mb-2">
                  <span className="text-terminal">&gt;</span> budget_
                </label>
                <div
                  className="w-full bg-bg-main font-mono text-text-main text-sm px-4 py-3 border cursor-pointer select-none flex justify-between items-center"
                  style={{
                    borderColor: isDropdownOpen ? "var(--accent-text)" : "var(--border-subtle)",
                    transition: "border-color 0ms",
                  }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={form.budget ? "text-text-main" : "text-border-subtle"}>
                    {form.budget ? budgetOptions.find(o => o.value === form.budget)?.label : "select_range"}
                  </span>
                  <span className="text-text-muted text-xs">▼</span>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-bg-surface border border-border-main shadow-xl">
                    {budgetOptions.map((option) => (
                      <div
                        key={option.value}
                        className="px-4 py-3 font-mono text-sm text-text-main cursor-pointer hover:bg-text-main hover:text-bg-main transition-colors duration-0"
                        onClick={() => {
                          setForm({ ...form, budget: option.value });
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                suppressHydrationWarning
                type="submit"
                disabled={isPending}
                className={`flex items-center gap-3 px-8 py-4 bg-accent text-true-black font-mono font-bold text-sm tracking-wider transition-colors duration-0 border border-accent w-full justify-center ${isPending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-text-main hover:text-bg-main'}`}
              >
                <Send size={16} className={isPending ? "animate-pulse" : ""} />
                {isPending ? "[ transmitting... ]" : "[ transmit_ ]"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
