import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Contact } from "@/components/portfolio/Contact";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tushar Agrawal" },
      {
        name: "description",
        content:
          "Tushar Agrawal — AI Engineer building multi-agent systems, full-stack platforms and performance intelligence tooling. Selected work, experience and contact.",
      },
      { property: "og:title", content: "Tushar Agrawal — AI Engineer & Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Tushar Agrawal — autonomous multi-agent AI frameworks, Tracelens performance intelligence, and production full-stack systems.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useSmoothScroll();
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Toaster position="bottom-right" theme="dark" />
    </main>
  );
}
