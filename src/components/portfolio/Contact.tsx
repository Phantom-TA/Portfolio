import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { getCalApi } from "@calcom/embed-react";

const CAL_LINK = (import.meta.env.VITE_CAL_LINK as string) || "tushar-agrawal/intro";

const EJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EJS_PUBLIC = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(2, "Message is too short").max(2000),
});

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi({ namespace: "intro" });
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: {
            light: { "cal-brand": "#22d3ee" },
            dark: { "cal-brand": "#22d3ee" },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch {
        /* cal unavailable */
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check your inputs");
      return;
    }
    setLoading(true);
    try {
      if (EJS_SERVICE && EJS_TEMPLATE && EJS_PUBLIC) {
        await emailjs.send(
          EJS_SERVICE,
          EJS_TEMPLATE,
          {
            name: parsed.data.name,
            email: parsed.data.email,
            message: parsed.data.message,
            title: "Portfolio Inquiry",
          },
          { publicKey: EJS_PUBLIC },
        );
        toast.success("Message sent — I'll reply shortly.");
        setForm({ name: "", email: "", message: "" });
      } else {
        // graceful fallback while keys aren't configured
        const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`);
        window.location.href = `mailto:tushar08032005@gmail.com?subject=${encodeURIComponent("Portfolio inquiry")}&body=${body}`;
        toast.message("Opening your email client…", {
          description: "Add VITE_EMAILJS_* env vars to enable direct sending.",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send — please try again or email directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-[var(--glow)]/8 blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
          >
            04 / Contact
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-6 font-display text-[clamp(2.5rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          >
            Let's build intelligent
            <br />
            <span className="text-white/60 font-medium">systems together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-muted-foreground max-w-xl mx-auto"
          >
            Working on something ambitious in AI, devtools or infrastructure?
            Drop a message or book a slot directly on my calendar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="mailto:tushar08032005@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-none ring-1 ring-white/10 hover:ring-white/30 hover:bg-white/5 text-sm font-medium transition-all text-white"
            >
              tushar08032005@gmail.com
            </a>
            <a
              href="tel:+916306263607"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-none ring-1 ring-white/10 hover:ring-white/30 hover:bg-white/5 text-sm font-medium transition-all text-white"
            >
              +91 63062 63607
            </a>
          </motion.div>
        </div>

        {/* form + cal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 grid lg:grid-cols-[1.4fr_1fr] gap-6"
        >
          <form
            onSubmit={onSubmit}
            className="relative rounded-3xl glass noise p-6 md:p-8 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={100}
                  placeholder="Ada Lovelace"
                  className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground/60 text-sm"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  maxLength={255}
                  placeholder="you@company.com"
                  className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground/60 text-sm"
                />
              </Field>
            </div>
            <Field label="Message">
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={2000}
                rows={5}
                placeholder="Tell me about what you're building…"
                className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground/60 text-sm resize-none"
              />
            </Field>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                {form.message.length}/2000
              </span>
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:scale-[1.03] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="size-3 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="rounded-3xl glass p-6 md:p-8 flex flex-col">
            <div className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
              Or skip the back-and-forth
            </div>
            <h3 className="mt-3 font-display text-3xl leading-tight">
              Book a meeting<br /><span className="italic text-foreground/60">directly.</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Pick a slot that works for you. Cal.com handles the timezone math.
            </p>

            <button
              type="button"
              data-cal-namespace="intro"
              data-cal-link={CAL_LINK}
              data-cal-config='{"layout":"month_view","theme":"dark"}'
              className="mt-auto group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border-none ring-1 ring-[var(--glow)]/40 hover:ring-[var(--glow)]/80 hover:bg-[var(--glow)]/5 text-sm font-medium transition-all"
            >
              Book a meeting
              <span>→</span>
            </button>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          / Socials
          </span>
          <div className="flex flex-wrap gap-3 justify-center">
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
        </div>
      </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          <span>© 2026 · Tushar Agrawal</span>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block group">
      <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-2">
        {label}
      </div>
      <div className="rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 transition-all focus-within:border-[var(--glow)]/50 focus-within:bg-white/[0.05]">
        {children}
      </div>
    </label>
  );
}
