import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhavvi.DEV — @Bhavyesh_Bhavvi" },
      {
        name: "description",
        content:
          "Advanced animated developer portfolio landing page for Bhavvi.DEV / @Bhavyesh_Bhavvi.",
      },
      { property: "og:title", content: "Bhavvi.DEV — @Bhavyesh_Bhavvi" },
      {
        property: "og:description",
        content:
          "Advanced animated developer portfolio landing page for Bhavvi.DEV / @Bhavyesh_Bhavvi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const primaryLetters = [
  { char: "B", delay: 100 },
  { char: "H", delay: 150 },
  { char: "A", delay: 200 },
  { char: "V", delay: 250 },
  { char: "V", delay: 300 },
  { char: "I", delay: 350 },
  { char: ".", delay: 400, accent: true },
  { char: "D", delay: 450 },
  { char: "E", delay: 500 },
  { char: "V", delay: 550 },
];

function Index() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(calc(-50% + ${mousePos.x * 60}px), calc(-50% + ${mousePos.y * 60}px)) scale(1)`;
    }
    if (textRef.current) {
      textRef.current.style.transform = `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`;
    }
  }, [mousePos]);

  return (
    <main
      ref={containerRef}
      className="relative w-full h-screen bg-background text-foreground overflow-hidden font-sans select-none"
    >
      {/* Ambient Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] rounded-full bg-primary/20 animate-breathe transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: "translate(-50%, -50%)" }}
        />
        <div className="absolute inset-0 bg-vignette" />
        <div
          className="absolute inset-0 bg-technical-grid opacity-[0.03]"
          aria-hidden="true"
        />
      </div>

      {/* Scanner Line Effect */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 animate-scan z-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Central Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        {/* Primary Animated Text */}
        <h1
          ref={textRef}
          className="flex flex-wrap justify-center gap-[0.02em] font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-tighter uppercase transition-transform duration-300 ease-out will-change-transform"
          aria-label="Bhavvi.DEV"
        >
          {primaryLetters.map(({ char, delay, accent }) => (
            <span
              key={`${char}-${delay}`}
              className={`animate-char inline-block letter-glow ${accent ? "text-primary" : ""}`}
              style={{ animationDelay: `${delay}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Connecting Element */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div
            className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent animate-char"
            style={{ animationDelay: "800ms" }}
          />

          {/* Secondary Handle */}
          <div
            className="flex items-center gap-3 font-mono text-sm md:text-lg tracking-[0.2em] animate-char text-muted-foreground"
            style={{ animationDelay: "1000ms" }}
          >
            <span className="text-primary">@</span>
            <span className="hover:text-foreground transition-colors duration-300">
              BHAVYESH_BHAVVI
            </span>
            <span className="w-2 h-4 bg-primary animate-cursor" />
          </div>
        </div>
      </div>

      {/* UI Frame / Metadata */}
      <nav className="fixed top-0 inset-x-0 p-8 flex justify-between items-start z-20">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
            Status
          </span>
          <span className="font-mono text-xs uppercase text-foreground">
            Available for projects
          </span>
        </div>
        <div className="text-right flex flex-col gap-1">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Location
          </span>
          <span className="font-mono text-xs uppercase text-foreground">
            23.0225° N, 72.5714° E
          </span>
        </div>
      </nav>

      <footer className="fixed bottom-0 inset-x-0 p-8 flex justify-between items-end z-20">
        <div className="flex gap-6">
          <a
            href="https://github.com/Bhavyesh_Bhavvi"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
          >
            Github
          </a>
          <a
            href="https://twitter.com/Bhavyesh_Bhavvi"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
          >
            Twitter
          </a>
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          &copy; 2026 ARCHIVE.SYS
        </div>
      </footer>

      {/* Edge Corner Accents */}
      <div
        className="fixed top-4 left-4 size-4 border-t border-l border-primary/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed top-4 right-4 size-4 border-t border-r border-primary/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-4 left-4 size-4 border-b border-l border-primary/40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-4 right-4 size-4 border-b border-r border-primary/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Load-complete subtle overlay fade */}
      <div
        className={`fixed inset-0 bg-background pointer-events-none z-[60] transition-opacity duration-1000 ${isLoaded ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      />
    </main>
  );
}
