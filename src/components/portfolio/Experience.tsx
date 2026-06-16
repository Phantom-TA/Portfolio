import { motion } from "framer-motion";

const experiences = [
  {
    company: "Voice Games",
    role: "Software Engineer (AI) Intern",
    duration: "May 2026 — Present",
    location: "Remote",
    description:
      "Engineered TraceLens, an AI-assisted frontend intelligence platform for browser audits, trace analysis, and bottleneck detection.Contributing to UI systems, debugging workflows, and gameplay performance optimization for live production games on Jest.com.",
    stack: ["Playwright", "Lighthouse", "TypeScript", "Node.js", "CLI", "Perf Eng"],
  },
  {
    company: "LNMIIT · Technology Council",
    role: "General Secretary",
    duration: "Aug 2025 — Present",
    location: "Jaipur, India",
    description:
      "Leading 7+ science & technology clubs and overseeing PLINTH, LNMIIT's 3-day national tech fest. Heading a team of 100+ members driving strategy, execution and cross-team collaboration for 40+ events and 1,000+ participants.",
    stack: ["Leadership", "Event Ops", "Cross-team", "Public Speaking"],
  },
  {
    company: "The LNM Institute of Information Technology",
    role: "B.Tech, Computer Science",
    duration: "July 2023 — June 2027",
    location: "Jaipur, India",
    description:
      "Coursework across OOP, DSA, DAA, DBMS, OS, Computer Networks and Computer Organization.",
    stack: ["DSA", "OS", "DBMS", "Networks", "OOP", "Python"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="01 / Experience" title="A track record" italic="of building." />

        <div className="mt-20 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:-translate-x-1/2" />

          <div className="space-y-20">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid md:grid-cols-2 gap-6 md:gap-16"
              >
                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 size-3 rounded-full bg-[var(--glow)] glow-ring z-10" />

                <div className="pl-12 md:pl-0 md:text-right md:pr-12">
                  <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                    {exp.duration}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{exp.location}</div>
                </div>

                <div className="pl-12 md:pl-0 group">
                  <div className="text-xs font-mono uppercase tracking-[0.22em] text-[var(--glow)]/80">
                    {exp.company === "Voice Games" ? (
                      <a href="https://www.voicegames.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--glow)] transition-colors">
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </div>
                  <h3 className="mt-1 font-display text-3xl">{exp.role}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-[0.14em] bg-white/5 border border-white/5 text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  italic,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
}) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white"
      >
        {title}
        {italic && <> <span className="text-white/60 font-medium">{italic}</span></>}
      </motion.h2>
    </div>
  );
}
