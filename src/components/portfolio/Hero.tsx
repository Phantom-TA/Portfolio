import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import tusharAsset from "@/assets/tushar.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};


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
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass text-[11px] uppercase tracking-[0.22em] text-foreground font-bold border-[var(--glow)]/40 shadow-[0_0_15px_rgba(var(--glow),0.1)]"
          >
            <span className="size-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
            Software Engineer (AI) Intern · Voice Games
          </motion.div>

          <div className="space-y-3">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--glow)] font-bold"
            >
              AI Engineer · Full Stack · Multi-Agent Systems
            </motion.div>

            {/* Name + profile pic */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-5 flex-wrap"
            >
              <div className="relative shrink-0 lg:hidden">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[var(--glow)]/60 via-fuchsia-500/30 to-transparent blur-md" />
                <img
                  src={tusharAsset}
                  alt="Tushar Agrawal"
                  className="relative size-20 md:size-24 rounded-full object-cover border border-white/15 shadow-2xl"
                />
                <span className="absolute -bottom-0.5 -right-0.5 size-4 rounded-full bg-[var(--success)] border-2 border-background animate-pulse-dot" />
              </div>
              <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-tight text-white leading-[0.95]">
                Tushar Agrawal
              </h1>
            </motion.div>
          </div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
             <span className="text-foreground font-semibold">Software Engineer (AI) Intern</span> at <span className="text-foreground font-semibold">Voice Games</span>, building <span className="text-foreground font-semibold">autonomous multi-agent AI systems</span> and <span className="text-foreground font-semibold">full-stack systems</span>. Currently focused on developing intelligent workflows, retrieval pipelines, and developer tools that solve practical real-world problems.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background text-sm font-semibold hover:scale-[1.02] transition-transform"
            >
              View Projects
              <span>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border-none ring-1 ring-white/10 hover:ring-[var(--glow)]/60 hover:bg-black/60 hover:text-[var(--glow)] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_0_15px_color-mix(in_oklab,var(--glow)_25%,transparent)] hover:translate-y-[1px] text-sm font-medium transition-all duration-300 text-white"
            >
              Let's Talk
            </a>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 pt-2 text-sm text-foreground/80"
          >
            <a
              href="https://github.com/Phantom-TA"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border-none ring-1 ring-white/10 hover:ring-[var(--glow)]/60 hover:bg-black/60 hover:text-[var(--glow)] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_0_15px_color-mix(in_oklab,var(--glow)_25%,transparent)] hover:translate-y-[1px] text-sm font-medium transition-all duration-300 text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tushar-agrawal-774885261/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border-none ring-1 ring-white/10 hover:ring-[var(--glow)]/60 hover:bg-black/60 hover:text-[var(--glow)] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_0_15px_color-mix(in_oklab,var(--glow)_25%,transparent)] hover:translate-y-[1px] text-sm font-medium transition-all duration-300 text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/Tushar_ag08/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass border-none ring-1 ring-white/10 hover:ring-[var(--glow)]/60 hover:bg-black/60 hover:text-[var(--glow)] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_0_15px_color-mix(in_oklab,var(--glow)_25%,transparent)] hover:translate-y-[1px] text-sm font-medium transition-all duration-300 text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
              </svg>
              LeetCode
            </a>
          </motion.div>
        </div>

        {/* RIGHT — floating widgets */}
        <div className="relative h-[510px] hidden lg:block">
          <div className="absolute top-10 right-10 size-72 rounded-full bg-[var(--glow)]/20 blur-[80px]" />
          <div className="absolute bottom-10 left-0 size-60 rounded-full bg-fuchsia-500/10 blur-[80px]" />

          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 right-0 w-[340px] h-[390px] rounded-3xl glass overflow-hidden noise"
          >
            <img
              src={tusharAsset}
              alt="Tushar Agrawal"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-end text-[10px] font-mono uppercase tracking-[0.2em] text-white/80">
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
          <motion.a
            href="#echo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-6 left-0 w-[270px] rounded-2xl glass p-4 animate-float block cursor-pointer transition-all duration-300 hover:ring-[var(--glow)]/30 group/building"
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[var(--glow)] animate-pulse-dot" />
                Currently Building
              </span>
              <span className="transition-transform duration-300 group-hover/building:translate-x-0.5 group-hover/building:-translate-y-0.5">↗</span>
            </div>
            <div className="mt-3 font-display text-xl leading-tight">Echo</div>
            <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Autonomous RAG-grounded AI persona that represents you to recruiters over voice and web chat.
            </div>
          </motion.a>



          {/* Time / focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute top-[375px] right-6 w-[280px] rounded-2xl glass p-4 animate-float"
            style={{ animationDelay: "3s" }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              Current Focus
            </div>
            <div className="mt-2 text-sm">
              Multi-agent systems, RAG &amp; performance intelligence
            </div>

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
