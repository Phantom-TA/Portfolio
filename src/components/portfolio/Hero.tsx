import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import tusharAsset from "@/assets/tushar.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "Asia/Kolkata",
      });
      setTime(t + " IST");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums">{time}</span>;
}

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-[var(--glow)]/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
            Software Engineer (AI) Intern · Voice Games
          </motion.div>

          <div className="space-y-3">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
            >
              AI Engineer · Full Stack · Multi-Agent Systems
            </motion.div>

            {/* Name + profile pic */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-5 flex-wrap"
            >
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--glow)]/60 via-fuchsia-500/30 to-transparent blur-md" />
                <img
                  src={tusharAsset}
                  alt="Tushar Agrawal"
                  className="relative size-20 md:size-24 rounded-full object-cover border border-white/15 shadow-2xl"
                />
                <span className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full bg-[var(--success)] border-2 border-background animate-pulse-dot" />
              </div>
              <h1 className="font-display text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.92] tracking-tight text-gradient">
                Tushar <span className="italic text-foreground/70">Agrawal</span>
              </h1>
            </motion.div>
          </div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            CS undergrad at LNMIIT building{" "}
            <span className="text-foreground">autonomous multi-agent AI systems</span> and{" "}
            <span className="text-foreground">full-stack platforms</span>. Currently engineering{" "}
            <span className="text-foreground">Tracelens</span> — an AI-assisted frontend performance
            intelligence platform — at Voice Games.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:scale-[1.02] transition-transform"
            >
              View Projects
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="https://github.com/Phantom-TA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-sm transition-all"
            >
              GitHub <span className="text-muted-foreground">↗</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-5 pt-2 text-xs text-muted-foreground font-mono uppercase tracking-[0.18em]"
          >
            <a href="https://github.com/Phantom-TA" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub ↗</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn ↗</a>
            <a href="#" className="hover:text-foreground transition-colors">LeetCode ↗</a>
            <span className="ml-auto md:ml-0 flex items-center gap-2">
              <span className="size-1 rounded-full bg-[var(--success)]" />
              Jaipur, IN
            </span>
          </motion.div>
        </div>

        {/* RIGHT — floating widgets */}
        <div className="relative h-[560px] hidden lg:block">
          <div className="absolute top-10 right-10 size-72 rounded-full bg-[var(--glow)]/20 blur-[80px]" />
          <div className="absolute bottom-10 left-0 size-60 rounded-full bg-fuchsia-500/10 blur-[80px]" />

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 right-0 w-[340px] h-[420px] rounded-3xl glass overflow-hidden noise"
          >
            <img
              src={tusharAsset}
              alt="Tushar Agrawal"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">
              <span>// engineer.profile</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
                live
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-display text-3xl leading-tight text-white">Tushar Agrawal</div>
              <div className="mt-1 text-xs text-white/70 font-mono">
                LNMIIT · B.Tech CSE · Class of 2027
              </div>
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--glow)]/60 to-transparent"
                style={{ animation: "scan 4s ease-in-out infinite" }}
              />
            </div>
          </motion.div>

          {/* Currently building */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-6 left-0 w-[270px] rounded-2xl glass p-4 animate-float"
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[var(--glow)] animate-pulse-dot" />
                Currently Building
              </span>
              <span>↗</span>
            </div>
            <div className="mt-3 font-display text-xl leading-tight">Tracelens</div>
            <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
              AI-assisted frontend performance intelligence @ Voice Games
            </div>
          </motion.div>

          {/* System status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute bottom-32 left-4 w-[230px] rounded-2xl glass p-4 animate-float"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              Codonova · Run #481
            </div>
            <div className="mt-3 space-y-1.5 text-xs font-mono">
              <Row label="agents" value="active" ok />
              <Row label="tests" value="96% pass" ok />
              <Row label="retries" value="2 / 5" ok />
            </div>
          </motion.div>

          {/* Time / focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute bottom-0 right-4 w-[280px] rounded-2xl glass p-4 animate-float"
            style={{ animationDelay: "3s" }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              Current Focus
            </div>
            <div className="mt-2 text-sm">
              Multi-agent systems, RAG &amp; performance intelligence
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Local</span>
              <LiveClock />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="absolute top-44 left-6 rounded-full glass px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] animate-float"
            style={{ animationDelay: "2s" }}
          >
            Gen. Secretary · Tech Council
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`flex items-center gap-1.5 ${ok ? "text-[var(--success)]" : ""}`}>
        {ok && <span className="size-1 rounded-full bg-[var(--success)]" />}
        {value}
      </span>
    </div>
  );
}
