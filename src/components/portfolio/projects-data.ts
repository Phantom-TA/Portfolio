export type ProjectPreview =
  | { kind: "dashboard" }
  | { kind: "terminal" }
  | { kind: "graph" }
  | { kind: "voice" }
  | { kind: "code" }
  | { kind: "edu" }
  | { kind: "ticket" }
  | { kind: "grid" }
  | { kind: "typing" }
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "iframe"; src: string };

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: { github?: string; live?: string };
  preview: ProjectPreview;
};

export const projects: Project[] = [
  {
    id: "echo",
    index: "01",
    title: "Echo",
    tagline: "Autonomous AI persona that represents you to recruiters.",
    description:
      "A dual-channel AI agent, live voice telephony & web chat ,that represents a developer's full professional profile to recruiters in real time. Embeds resume and GitHub data as 3072-dim vectors into Pinecone, orchestrates GPT-4o Mini across a Vapi voice pipeline (Deepgram Nova-3 STT → ElevenLabs Turbo TTS), and closes the loop with autonomous Cal.com interview booking, all within a sub-1.3s conversational response cycle.",
    highlights: [
      "RAG pipeline with 3072-dim OpenAI embeddings indexed in Pinecone, achieving 95.5% groundedness on a 33-pair golden Q&A set scored by a GPT-4o judge.",
      "Voice pipeline via Vapi · Deepgram Nova-3 STT at 99.1% accuracy · GPT-4o Mini at ~390ms latency · P95 response 1.85s",
      "End-to-end Cal.com booking with 6/6 confirmed test bookings, which is hardened against timezone offset, slot-starvation and webhook routing failures.",
    ],
    stack: ["Next.js 15", "Vapi", "Pinecone", "Deepgram", "ElevenLabs", "GPT-4o Mini", "Cal.com", "TypeScript"],
    links: { github: "https://github.com/Phantom-TA/Echo" },
    preview: { kind: "voice" },
  },
  {
    id: "intentsync",
    index: "02",
    title: "IntentSync",
    tagline: "GraphRAG-powered repository intelligence engine for engineering teams.",
    description:
      "A local-first CLI tool that indexes a repository's commit history, PRs, issues, and file relationships into a multi-store GraphRAG knowledge base, then answers natural language queries against it. TypeScript monorepo with 6 isolated packages, backed by a BullMQ async worker pipeline.",
    highlights: [
      "Triple-store retrieval — ChromaDB (vector), PostgreSQL (structured), Neo4j (co-change graph) fan-out for richer grounding than single-store RAG.",
      "File co-change coupling via Neo4j surfaces non-obvious architectural dependencies that static analysis tools miss entirely.",
      "Answer Confidence Scoring combines Gemini 2.5 Flash's self-assessed groundedness with computed vector similarity scores to output a verified confidence percentage (e.g. 86% HIGH) per response, making retrieval quality auditable rather than opaque",
    ],
    stack: ["TypeScript", "Neo4j", "ChromaDB", "PostgreSQL", "Redis", "BullMQ", "Gemini 2.5", "Docker"],
    links: { github: "https://github.com/Phantom-TA/IntentSync" },
    preview: { kind: "graph" },
  },
  {
    id: "tracelens",
    index: "03",
    title: "Tracelens",
    tagline: "AI-assisted frontend performance intelligence.",
    description:
      "Built at Voice Games to automate browser audits, trace analysis and bottleneck detection for the core engineering team. Powers live latency optimisation on the Jest.com platform.",
    highlights: [
      "Automated analysis pipeline integrating Playwright, Lighthouse, hydration & bundle intel.",
      "CLI-driven workflow for multi-run audits, regression compare and consolidated reports.",
      "Standardised the team's pre-release performance evaluation harness.",
    ],
    stack: ["TypeScript", "Playwright", "Lighthouse", "Node.js", "CLI"],
    links: { github: "https://github.com/Phantom-TA/TraceLens" },
    preview: { kind: "dashboard" },
  },
  {
    id: "codonova",
    index: "04",
    title: "Codonova",
    tagline: "Autonomous AI development framework.",
    description:
      "A multi-agent AI framework that autonomously plans, generates, tests, debugs and self-corrects production-ready software codebases orchestrated over a graph-driven pipeline with persistent contextual memory.",
    highlights: [
      "Graph-driven orchestration with Neo4j + ChromaDB for dependency-aware task execution.",
      "Automated TDD self-correction loop (Pytest/Jest) that lifted generation success from 76% → 96%.",
      "Fault-tolerant LLM layer: key rotation, exponential backoff, provider fallback.",
    ],
    stack: ["FastAPI", "React", "Neo4j", "ChromaDB", "Docker", "LLMs"],
    links: { github: "https://github.com/Phantom-TA/Codonova" },
    preview: { kind: "code" },
  },
  {
    id: "blogsmith",
    index: "05",
    title: "BlogSmith",
    tagline: "Full-stack blogging platform, end-to-end.",
    description:
      "A production-grade blogging platform with end-to-end CRUD, secure JWT auth, image storage via Cloudinary and clean REST APIs flowing across frontend, backend and database.",
    highlights: [
      "JWT access/refresh tokens + bcrypt with protected routes and dynamic UI.",
      "RESTful APIs over MongoDB with seamless data flow across all layers.",
      "Cloudinary integration for efficient image storage & delivery.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    links: { github: "https://github.com/Phantom-TA/BlogSmith" },
    preview: { kind: "terminal" },
  },
  {
    id: "edigo",
    index: "06",
    title: "Edigo",
    tagline: "Unified AI learning platform for course generation and personalized study.",
    description:
      "A full-stack EdTech platform that unifies course creation, video curation, quizzes, and real-time chat. Teachers generate full curricula from a single prompt via Llama 3.3 70B; students get hour-budgeted roadmaps, backed by a dual-persistence database layer built for network resilience.",
    highlights: [
      "AI course generation via Groq SDK (Llama 3.3 70B) to generate structured JSON lessons, summaries and 5-question MCQs, auto-embedding top YouTube resources per module.",
      "Dual-persistence DB — Drizzle/Postgres (5432) with automatic Supabase HTTP Data API (443) fallback for firewall-restricted institutional networks.",
      "Context-aware PDF doubt assistant + real-time Socket.IO classrooms on a standalone Node server (3002) decoupled from the Next.js serverless layer.",
    ],
    stack: ["Next.js", "Groq", "Llama 3.3 70B", "Socket.IO", "PostgreSQL", "Drizzle ORM", "Supabase", "Clerk", "YouTube API"],
    links: { github: "https://github.com/Phantom-TA/Edigo" },
    preview: { kind: "edu" },
  },
  {
    id: "plinth-2025",
    index: "07",
    title: "Plinth 2025",
    tagline: "Full-stack event registration portal with transactional payment integrity.",
    description:
      "A custom-engineered registration and ticketing platform for Plinth, LNMIIT's annual national techno-cultural festival. Multi-member group registrations, real-time GST-inclusive pricing, referral discounts, UPI payments and Cloudinary-backed proof uploads, utilizing a two-stage transactional commit architecture that prevents orphaned payments.",
    highlights: [
      "Two-stage transactional commit, persisting bookings with a unique bookingId before payment begins, guaranteeing reconcilability even if the browser closes mid-upload.",
      "Client-side real-time pricing engine calculating base passes, per-member event add-ons, multi-day pass rates, referral deductions and 18% GST live before the UPI QR renders.",
      "Cloudinary direct-upload pipeline where payment proof bypasses the Express backend, storing only the CDN URL in MongoDB to dodge Vercel payload limits.",
    ],
    stack: ["React 18", "Express.js", "MongoDB", "Mongoose", "Cloudinary", "Tailwind CSS", "Vercel", "Node.js"],
    links: { github: "https://github.com/Phantom-TA/PLINTH--Registration" },
    preview: { kind: "ticket" },
  },
  {
    id: "impossiblexo",
    index: "08",
    title: "ImpossibleXO",
    tagline: "Mathematically unbeatable Tic-Tac-Toe with an O(1) AI decision engine.",
    description:
      "A React 19 + Vite 7 web app that replaces standard Minimax (evaluating up to 362,880 board states recursively) with a custom deterministic heuristic decision tree that resolves every move in true O(1) time.",
    highlights: [
      "O(1) deterministic AI covering diagonal forks, double-edge traps and corner-opening counters, guaranteeing a win or forced draw across every game state.",
      "Derived-state architecture: entire game state computed from a single source-of-truth selections array.",
      "Responsive glassmorphic UI with pop-in animations, deployed on Vercel and optimised for low-power devices.",
    ],
    stack: ["React 19", "Vite 7", "JavaScript", "CSS3", "Vercel"],
    links: { github: "https://github.com/Phantom-TA/Unbeatable-TicTacToe" },
    preview: { kind: "grid" },
  },
  {
    id: "typeblitz",
    index: "09",
    title: "TypeBlitz",
    tagline: "Zero-latency typing speed engine with direct DOM ref architecture.",
    description:
      "A high-performance typing test app that bypasses React's re-render cycle by manipulating character classes directly via dynamic refs, eliminating keystroke lag and enabling highly accurate typing analytics.",
    highlights: [
      "Near-zero keystroke latency via direct DOM manipulation without React re-render dependency.",
      "4-dimensional accuracy model tracking Correct, Incorrect, Skipped and Extra characters.",
      "Viewport-aware autoscroll engine with zero external UI dependencies beyond the React ecosystem.",
    ],
    stack: ["React 19", "Vite 7", "React Router 7", "JavaScript", "CSS3", "Vercel"],
    links: { github: "https://github.com/Phantom-TA/TypeBlitz" },
    preview: { kind: "typing" },
  },
];
