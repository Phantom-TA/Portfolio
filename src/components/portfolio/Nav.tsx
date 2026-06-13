import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled ? "glass" : ""
          }`}
        >
          <a href="#" className="flex items-center gap-2 font-mono text-sm tracking-tight">
            <span className="inline-block size-2 rounded-full bg-[var(--glow)] animate-pulse-dot" />
            <span className="text-foreground/90">tushar<span className="text-[var(--glow)]">.dev</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="text-xs font-medium uppercase tracking-[0.18em] px-4 py-2 rounded-full border border-white/10 hover:border-[var(--glow)]/50 hover:bg-white/5 transition-all"
          >
            Let's talk
          </a>
        </div>
      </div>
    </motion.header>
  );
}
