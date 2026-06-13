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
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
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
            from_name: parsed.data.name,
            from_email: parsed.data.email,
            message: parsed.data.message,
            to_email: "tushar08032005@gmail.com",
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
            className="mt-6 font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-gradient"
          >
            Let's build intelligent
            <br />
            <span className="italic text-foreground/60">systems together.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-muted-foreground max-w-xl mx-auto"
          >
            Working on something ambitious in AI, devtools or infrastructure?
            Drop a message — or book a slot directly on my calendar.
          </motion.p>
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
              className="mt-auto group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[var(--glow)]/40 hover:border-[var(--glow)]/80 hover:bg-[var(--glow)]/5 text-sm font-medium transition-all"
            >
              <span className="size-1.5 rounded-full bg-[var(--glow)] animate-pulse-dot" />
              Book a meeting
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>

            <div className="mt-4 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              <span>powered by</span>
              <span className="text-foreground/70">cal.com</span>
            </div>
          </div>
        </motion.div>

        {/* quick contacts */}
        <div className="mt-14 flex flex-wrap gap-3 justify-center">
          <a
            href="mailto:tushar08032005@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-xs font-mono uppercase tracking-[0.18em] transition-all"
          >
            tushar08032005@gmail.com
          </a>
          <a
            href="tel:+916306263607"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-xs font-mono uppercase tracking-[0.18em] transition-all"
          >
            +91 63062 63607
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
          <a href="https://github.com/Phantom-TA" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub ↗</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn ↗</a>
          <a href="#" className="hover:text-foreground transition-colors">LeetCode ↗</a>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
          <span>© 2026 · Tushar Agrawal</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--success)] animate-pulse-dot" />
            All systems operational
          </span>
          <span>Crafted in Jaipur, IN</span>
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
