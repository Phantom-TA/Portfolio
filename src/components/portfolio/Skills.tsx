import { motion } from "framer-motion";
import { SectionHeader } from "./Experience";

const categories = [
  {
    label: "Languages",
    skills: ["C", "C++", "JavaScript", "Python"],
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

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative rounded-2xl glass p-6 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--glow) 12%, transparent), transparent 50%)",
                }}
              />
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  / 0{i + 1}
                </div>
                <div className="size-1.5 rounded-full bg-[var(--glow)]/60 group-hover:bg-[var(--glow)] transition-colors" />
              </div>
              <h3 className="mt-4 font-display text-2xl">{cat.label}</h3>
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
