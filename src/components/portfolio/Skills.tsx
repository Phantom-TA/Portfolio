import { motion } from "framer-motion";
import { SectionHeader } from "./Experience";

const categories = [
  {
    label: "Languages",
    skills: ["C", "C++", "JavaScript", "Python","TypeScript"],
  },
  {
    label: "Frameworks & Libraries",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "FastAPI"],
  },
  {
    label: "Databases & Tools",
    skills: ["MongoDB", "Neo4j", "ChromaDB", "Docker", "Git", "GitHub"],
  },
  {
    label: "AI & Agents",
    skills: ["Agentic Workflows", "Context Engineering", "RAG", "Structured Outputs", "Multi-agent"],
  },
  {
    label: "Backend & APIs",
    skills: ["REST APIs", "JWT", "Auth", "Cloudinary", "Webhooks"],
  },
  {
    label: "CS Foundations",
    skills: ["DSA", "OOP", "DBMS", "OS", "Computer Networks", "DAA"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="03 / Skills" title="The stack I" italic="reach for." />

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative p-8 border-r border-b border-white/10 hover:bg-white/[0.015] transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  / 0{i + 1}
                </div>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">{cat.label}</h3>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/5 text-foreground/80 hover:border-[var(--glow)]/40 hover:text-foreground transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
