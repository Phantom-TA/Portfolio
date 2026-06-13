import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // desktop / fine-pointer only
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my;     // dot (fast)
    let rx = mx, ry = my;     // ring (trailing)
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const isInteractive = (el: EventTarget | null): boolean => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        const t = node.tagName;
        if (t === "A" || t === "BUTTON" || t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "LABEL") return true;
        if (node.getAttribute && node.getAttribute("role") === "button") return true;
        if (node.dataset && node.dataset.cursor === "hover") return true;
        node = node.parentElement;
      }
      return false;
    };

    const onOver = (e: MouseEvent) => {
      hovering = isInteractive(e.target);
      if (ringRef.current) {
        ringRef.current.dataset.hover = hovering ? "1" : "0";
      }
    };

    const tick = () => {
      // dot — snappy
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      // ring — smooth trailing (liquid)
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    // hide native cursor
    document.documentElement.style.cursor = "none";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        a, button, [role="button"], input, textarea, select, label { cursor: none !important; }
      `}</style>
      <div
        ref={ringRef}
        data-hover="0"
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-9 rounded-full border border-[var(--glow)]/60 backdrop-blur-[2px] transition-[width,height,background-color,border-color] duration-300 ease-out mix-blend-difference"
        style={{
          willChange: "transform",
          boxShadow: "0 0 18px 0 color-mix(in oklab, var(--glow) 35%, transparent), inset 0 0 8px color-mix(in oklab, var(--glow) 20%, transparent)",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] size-1.5 rounded-full bg-[var(--glow)]"
        style={{ willChange: "transform", boxShadow: "0 0 10px var(--glow)" }}
      />
    </>
  );
}
