import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeader } from "./Experience";
import { projects, type Project, type ProjectPreview } from "./projects-data";

const INITIAL = 4;
const STEP = 3;

export function Projects() {
  const [visible, setVisible] = useState(INITIAL);
  const shown = projects.slice(0, visible);
  const hasMore = visible < projects.length;

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[700px] rounded-full bg-[var(--glow)]/8 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="02 / Projects" title="Things built" italic="with intent." />

        <div className="mt-24 space-y-32">
          <AnimatePresence initial={false}>
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={i >= INITIAL ? { opacity: 0, y: 40 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectShowcase project={p} flipped={i % 2 === 1} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <div className="mt-24 flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setVisible((v) => Math.min(projects.length, v + STEP))}
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full glass border border-white/10 hover:border-[var(--glow)]/50 text-sm font-mono uppercase tracking-[0.22em] transition-all overflow-hidden"
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--glow)_22%,transparent),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative size-1.5 rounded-full bg-[var(--glow)] animate-pulse-dot" />
              <span className="relative">Load more projects</span>
              <span className="relative text-muted-foreground">
                {projects.length - visible} more
              </span>
              <span className="relative transition-transform group-hover:translate-y-0.5">↓</span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectShowcase({ project, flipped }: { project: Project; flipped: boolean }) {
  return (
    <div
      className={`grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center ${
        flipped ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* MEDIA */}
      <div className="relative group">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--glow)]/20 via-transparent to-fuchsia-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass noise glow-ring">
          <MediaPanel preview={project.preview} />
        </div>
      </div>

      {/* INFO */}
      <div className="space-y-6">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          / {project.index}
        </div>
        <h3 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-tight">
          {project.title}
        </h3>
        <p className="text-lg text-foreground/80">{project.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          {project.description}
        </p>

        <ul className="space-y-2 pt-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-foreground/80">
              <span className="mt-2 size-1 rounded-full bg-[var(--glow)] shrink-0" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-[0.14em] bg-white/5 border border-white/5 text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        {(project.links.github || project.links.live) && (
          <div className="flex gap-3 pt-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-xs font-mono uppercase tracking-[0.18em] transition-all"
              >
                GitHub ↗
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-xs font-mono uppercase tracking-[0.18em] hover:scale-[1.03] transition-transform"
              >
                Live demo →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   MediaPanel — swap-friendly (image/video/iframe + mockups)
   ============================================================ */
function MediaPanel({ preview }: { preview: ProjectPreview }) {
  switch (preview.kind) {
    case "image":
      return (
        <img
          src={preview.src}
          alt={preview.alt ?? ""}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    case "video":
      return (
        <video
          src={preview.src}
          poster={preview.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    case "iframe":
      return (
        <iframe
          src={preview.src}
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
          title="preview"
        />
      );
    case "dashboard": return <DashboardPreview />;
    case "terminal": return <TerminalPreview />;
    case "graph": return <GraphPreview />;
    case "voice": return <VoicePreview />;
    case "code": return <CodePreview />;
    case "edu": return <EduPreview />;
    case "ticket": return <TicketPreview />;
    case "grid": return <GridPreview />;
    case "typing": return <TypingPreview />;
  }
}

/* ---------- mockup previews ---------- */

function WindowChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-4">
      <span className="size-2.5 rounded-full bg-red-500/70" />
      <span className="size-2.5 rounded-full bg-yellow-500/70" />
      <span className="size-2.5 rounded-full bg-green-500/70" />
      <span className="ml-3 text-[10px] font-mono text-muted-foreground">{label}</span>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0d1117] to-[#0a0f1a]">
      <WindowChrome label="tracelens · live" />
      <div className="grid grid-cols-3 gap-2 h-[calc(100%-2rem)]">
        <div className="col-span-1 rounded-lg bg-white/5 border border-white/5 p-3 space-y-2">
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Audits</div>
          {["lcp", "tbt", "cls", "hydration"].map((a, i) => (
            <div key={a} className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-foreground/80">{a}</span>
              <span className="flex items-center gap-1 text-[var(--success)]">
                <span className="size-1 rounded-full bg-[var(--success)] animate-pulse-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                ok
              </span>
            </div>
          ))}
        </div>
        <div className="col-span-2 rounded-lg bg-white/5 border border-white/5 p-3 relative overflow-hidden">
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mb-2">
            pipeline · run #4821
          </div>
          <svg viewBox="0 0 200 100" className="w-full h-auto">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="oklch(0.78 0.16 200)" stopOpacity="0" />
                <stop offset="0.5" stopColor="oklch(0.78 0.16 200)" stopOpacity="1" />
                <stop offset="1" stopColor="oklch(0.78 0.16 200)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[20, 35, 28, 50, 42, 62, 55, 75, 68, 88, 80].map((v, i) => (
              <line
                key={i}
                x1={i * 18 + 10} y1="90"
                x2={i * 18 + 10} y2={90 - v}
                stroke="oklch(0.78 0.16 200)"
                strokeWidth="2"
                opacity={0.3 + (i / 11) * 0.7}
              />
            ))}
            <path d="M 10 70 Q 60 30 110 50 T 200 20" fill="none" stroke="url(#g1)" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-3 right-3 text-[20px] font-display text-foreground">
            42 <span className="text-[10px] font-mono text-muted-foreground">runs/min</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GraphPreview() {
  const nodes = [
    { x: 50, y: 50 }, { x: 120, y: 30 }, { x: 180, y: 70 },
    { x: 80, y: 100 }, { x: 150, y: 120 }, { x: 220, y: 110 },
    { x: 110, y: 160 }, { x: 200, y: 170 },
  ];
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0a0a14] to-[#0f0a18]">
      <div className="text-[10px] font-mono text-muted-foreground mb-3">// graph.intentsync</div>
      <svg viewBox="0 0 260 200" className="w-full h-[calc(100%-1.5rem)]">
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => {
            const d = Math.hypot(n.x - m.x, n.y - m.y);
            if (d > 90) return null;
            return (
              <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                stroke="oklch(0.78 0.16 200)" strokeWidth="0.5" opacity={0.4} />
            );
          })
        )}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="8" fill="oklch(0.78 0.16 200)" opacity="0.15" />
            <circle cx={n.x} cy={n.y} r="3" fill="oklch(0.78 0.16 200)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[9px] font-mono text-muted-foreground">
        <span>1,284 nodes</span>
        <span>confidence · 86%</span>
        <span>p50 · 28ms</span>
      </div>
    </div>
  );
}

function TerminalPreview() {
  const lines = [
    { type: "cmd", text: "npm run dev — blogsmith" },
    { type: "log", text: "→ connecting to mongodb atlas" },
    { type: "log", text: "→ mounting /api/auth (jwt + bcrypt)" },
    { type: "log", text: "→ wiring cloudinary uploader" },
    { type: "ok", text: "✓ server ready on :4000" },
    { type: "cmd", text: "curl -X POST /api/posts" },
    { type: "log", text: "→ verifying access token" },
    { type: "log", text: "→ uploading cover → cloudinary" },
    { type: "ok", text: "✓ post created · id 64f…a21" },
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) {
      const t = setTimeout(() => setShown(0), 3000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 400 : 600);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#08090d] to-[#0c0a14] font-mono text-[12px]">
      <WindowChrome label="~/projects/blogsmith — zsh" />
      <div className="space-y-1.5">
        {lines.slice(0, shown).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="leading-relaxed">
            {l.type === "cmd" && (<><span className="text-[var(--glow)]">$</span> <span className="text-foreground">{l.text}</span></>)}
            {l.type === "log" && <span className="text-muted-foreground">{l.text}</span>}
            {l.type === "ok" && <span className="text-[var(--success)]">{l.text}</span>}
          </motion.div>
        ))}
        {shown < lines.length && (
          <span className="inline-block w-2 h-3.5 bg-[var(--glow)] animate-blink align-middle" />
        )}
      </div>
    </div>
  );
}

function VoicePreview() {
  const bars = Array.from({ length: 28 });
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0a0d14] to-[#0a0f1e]">
      <WindowChrome label="echo · live call · vapi" />
      <div className="flex flex-col h-[calc(100%-2rem)]">
        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
            connected · 00:42
          </span>
          <span>p95 · 1.85s</span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-[3px]">
          {bars.map((_, i) => {
            const h = 12 + Math.sin(i * 0.6) * 18 + (i % 4) * 8;
            return (
              <span
                key={i}
                className="w-[3px] rounded-full bg-[var(--glow)]/80"
                style={{
                  height: `${h}px`,
                  animation: `pulse-dot 1.${i % 9 + 1}s ease-in-out infinite`,
                  animationDelay: `${i * 0.04}s`,
                  boxShadow: "0 0 8px color-mix(in oklab, var(--glow) 50%, transparent)",
                }}
              />
            );
          })}
        </div>

        <div className="space-y-2 text-[11px] font-mono">
          <div className="text-muted-foreground"><span className="text-[var(--glow)]/80">recruiter</span> · "tell me about your RAG work"</div>
          <div className="text-foreground/90"><span className="text-[var(--success)]">echo</span> · "Built Echo — a dual-channel agent grounded on a 33-pair golden set, 98.2%…"</div>
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0a0b12] to-[#0d0a18] font-mono text-[11px] leading-relaxed">
      <WindowChrome label="codonova · planner.agent.py" />
      <div className="space-y-1">
        <div><span className="text-muted-foreground">01</span>  <span className="text-[var(--glow)]">async def</span> <span className="text-foreground">plan</span>(spec):</div>
        <div><span className="text-muted-foreground">02</span>    graph = build_dependency_graph(spec)</div>
        <div><span className="text-muted-foreground">03</span>    <span className="text-[var(--glow)]">for</span> task <span className="text-[var(--glow)]">in</span> graph.topo():</div>
        <div><span className="text-muted-foreground">04</span>      code = <span className="text-[var(--success)]">await</span> coder.generate(task)</div>
        <div><span className="text-muted-foreground">05</span>      tests = critic.run(code)</div>
        <div><span className="text-muted-foreground">06</span>      <span className="text-[var(--glow)]">if not</span> tests.passed:</div>
        <div><span className="text-muted-foreground">07</span>        code = repair_loop(code, tests)  <span className="text-muted-foreground">{`# 76→96%`}</span></div>
        <div><span className="text-muted-foreground">08</span>    <span className="text-[var(--glow)]">return</span> ship(graph)</div>
      </div>
      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[9px] font-mono text-muted-foreground">
        <span className="text-[var(--success)]">● tests · 96% pass</span>
        <span>retries · 2/5</span>
        <span>agents · 4 active</span>
      </div>
    </div>
  );
}

function EduPreview() {
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0b0d18] to-[#100a1c]">
      <WindowChrome label="edigo · course builder" />
      <div className="grid grid-cols-2 gap-2 h-[calc(100%-2rem)]">
        <div className="rounded-lg bg-white/5 border border-white/5 p-3">
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">prompt</div>
          <div className="mt-2 text-[11px] text-foreground/80 font-mono">"DSA in 12h"</div>
          <div className="mt-3 text-[9px] font-mono text-muted-foreground">groq · llama 3.3 70b</div>
          <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[var(--glow)] animate-[shimmer_2s_linear_infinite]" style={{ width: "78%" }} />
          </div>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/5 p-3 space-y-1.5">
          <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">modules</div>
          {["Arrays · 2h", "LinkedList · 1.5h", "Trees · 3h", "DP · 4h", "Graphs · 1.5h"].map((m, i) => (
            <div key={m} className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-foreground/80">{m}</span>
              <span className="text-[var(--glow)]/80">{i < 3 ? "✓" : "··"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TicketPreview() {
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0c0a18] to-[#120a1a]">
      <WindowChrome label="plinth · checkout" />
      <div className="grid grid-cols-2 gap-3 h-[calc(100%-2rem)]">
        <div className="rounded-lg bg-white/5 border border-white/5 p-3 space-y-2 text-[10px] font-mono">
          <div className="text-muted-foreground uppercase tracking-wider text-[9px]">cart · 3 members</div>
          <Row3 k="base pass × 3" v="₹897" />
          <Row3 k="events × 5" v="₹745" />
          <Row3 k="referral · −10%" v="−₹164" />
          <Row3 k="GST · 18%" v="₹266" />
          <div className="border-t border-white/10 my-1" />
          <Row3 k="total" v="₹1,744" accent />
        </div>
        <div className="rounded-lg bg-white/5 border border-white/5 p-3 flex flex-col items-center justify-center">
          <div className="size-20 rounded-md bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%)] bg-white" style={{ backgroundSize: "6px 6px", backgroundPosition: "0 0, 3px 3px" }} />
          <div className="mt-2 text-[9px] font-mono text-muted-foreground">UPI · bookingId 7c2…d1</div>
          <div className="mt-1 text-[9px] text-[var(--success)] font-mono">● committed</div>
        </div>
      </div>
    </div>
  );
}

function Row3({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={accent ? "text-[var(--glow)]" : "text-foreground/85"}>{v}</span>
    </div>
  );
}

function GridPreview() {
  const cells = ["X", "", "O", "", "X", "", "O", "", "X"];
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0a0a14] to-[#0c0a18] flex flex-col">
      <WindowChrome label="impossiblexo · O(1)" />
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2 w-[55%] aspect-square">
          {cells.map((c, i) => (
            <div key={i} className="rounded-lg glass flex items-center justify-center font-display text-3xl">
              <span className={c === "X" ? "text-[var(--glow)]" : c === "O" ? "text-fuchsia-400/90" : ""}>{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground">
        <span>states · 362,880 → 1</span>
        <span className="text-[var(--success)]">● unbeatable</span>
      </div>
    </div>
  );
}

function TypingPreview() {
  const text = "the quick brown fox jumps over the lazy dog";
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPos((p) => (p >= text.length ? 0 : p + 1)), 90);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#0a0b12] to-[#0e0a14] font-mono">
      <WindowChrome label="typeblitz · run" />
      <div className="flex flex-col h-[calc(100%-2rem)]">
        <div className="flex-1 flex items-center">
          <div className="text-[18px] leading-relaxed">
            <span className="text-[var(--success)]">{text.slice(0, pos)}</span>
            <span className="bg-[var(--glow)]/30 text-foreground">{text[pos] ?? ""}</span>
            <span className="text-muted-foreground">{text.slice(pos + 1)}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[10px] font-mono">
          {[
            ["wpm", "142"],
            ["acc", "98%"],
            ["correct", String(pos)],
            ["extra", "0"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md bg-white/5 border border-white/5 p-2">
              <div className="text-muted-foreground uppercase tracking-wider text-[8px]">{k}</div>
              <div className="text-[var(--glow)] text-base">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
