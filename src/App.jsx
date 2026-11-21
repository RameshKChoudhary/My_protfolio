import { useEffect, useRef, useState } from "react";
import "./App.css";

/* -------------------------------------------------------------
   PHOTOS: save your two photos in the /public folder as
   photo1.jpg (festive kurta photo) and photo2.jpg (blazer photo)
   ------------------------------------------------------------- */
const PHOTO_1 = "/photo1.jpg";
const PHOTO_2 = "/photo2.jpg";

const LINKS = {
  email: "rameshkchoudhary10@gmail.com",
  phone: "+91 96994 11468",
  linkedin: "https://linkedin.com/in/ramesh-choudhary-397025291",
  github: "https://github.com/RameshKChoudhary",
};

const EXPERIENCE = [
  {
    role: "Web Developer Intern",
    company: "Sunmarg India",
    date: "Mar 2026 – Jun 2026",
    points: [
      "Built and deployed 4 SEO-optimized, fully responsive client websites using React.js, HTML5 and CSS3, ensuring consistent UI across devices and browsers.",
      "Worked in an Agile team (daily stand-ups, Git workflow) with cross-functional members to ship production-ready features and fix UI issues.",
    ],
  },
  {
    role: "AI Intern",
    company: "Blessed IT Solutions",
    date: "Oct 2025 – Dec 2025",
    points: [
      "Integrated AI-powered features into website workflows using LLM APIs to improve user interaction and automate repetitive tasks.",
      "Applied prompt engineering techniques to optimize LLM outputs, improve response accuracy, and align AI-generated content with website requirements.",
    ],
  },
];

const PROJECTS = [
  {
    n: "01",
    title: "Production RAG Assistant",
    tag: "RAG · Agents",
    tech: ["Python", "LangChain", "LangGraph", "FastAPI", "Supabase PGVector", "Pydantic", "LangSmith"],
    points: [
      "Document ingestion, chunking, embeddings and vector similarity search over custom documents.",
      "LangGraph agent behind a FastAPI API returning Pydantic-validated structured responses, with a security layer.",
      "Retrieval and generation traced with LangSmith to debug answer quality and failures.",
    ],
    color: "#ff5a1f",
  },
  {
    n: "02",
    title: "InterviewCoach AI",
    tag: "Voice · LLM",
    tech: ["Python", "Streamlit", "Groq Whisper", "LLaMA 3.3 70B", "Plotly"],
    points: [
      "Voice-based interview trainer: records answers, transcribes with Groq Whisper, returns structured feedback from LLaMA 3.3 70B.",
      "15-question bank with difficulty tiers, a live coding round with AI code review and a Plotly progress dashboard.",
      "Runs on a zero-cost free-tier API stack.",
    ],
    color: "#3b5bfd",
  },
  {
    n: "03",
    title: "Automated Invoice Processing",
    tag: "Automation",
    tech: ["n8n", "API Integration", "Workflow Automation"],
    points: [
      "n8n workflow for invoice extraction, validation and multi-API processing.",
      "Eliminates manual data entry and reduces human error.",
    ],
    color: "#12a37a",
  },
  {
    n: "04",
    title: "CIFAR-10 Image Classifier",
    tag: "Deep Learning",
    tech: ["Python", "PyTorch", "CNN", "GPU Training"],
    points: [
      "ResNet-9 style CNN trained on GPU with augmentation, batch norm, dropout and weight decay.",
      "One-cycle learning-rate schedule with accuracy and loss tracking to tune the model.",
    ],
    color: "#d6336c",
  },
];

const SKILL_RING = [
  "LLM APIs", "RAG", "LangChain", "LangGraph", "Prompt Eng.", "Pydantic",
  "Vector DBs", "LoRA / QLoRA", "PyTorch", "FastAPI", "MCP", "n8n",
];

const SKILL_GROUPS = [
  { title: "AI / LLM", items: ["LLM APIs", "Prompt Engineering", "RAG", "LangChain", "LangGraph", "Pydantic", "Embeddings", "Vector Databases", "MCP", "n8n"] },
  { title: "Fine-Tuning", items: ["LoRA", "QLoRA", "PEFT"] },
  { title: "ML / NLP", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "BERT", "GPT", "LSTM", "RNN", "TF-IDF", "Word2Vec"] },
  { title: "Engineering", items: ["Python", "SQL", "JavaScript (ES6+)", "FastAPI", "React.js", "Streamlit", "Docker", "Git / GitHub"] },
];

const CERTS = [
  "Generative AI & LLM Applications (Distinction), MillionMinds",
  "Open-Source LLMs, Udemy (Feb 2026)",
  "Machine Learning with Scikit-learn, Data School (Mar 2026)",
  "Frontend Web Developer, Udemy (May 2026)",
  "Hackathon Participant, Megahack 4.0",
];

/* ---------------- scroll engine: drives every 3D effect ---------------- */
function useScene() {
  useEffect(() => {
    let raf = 0;
    const root = document.documentElement;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const sy = window.scrollY;
      const max = document.body.scrollHeight - vh;
      root.style.setProperty("--sy", sy.toFixed(1));
      root.style.setProperty("--sp", (max > 0 ? sy / max : 0).toFixed(4));

      // generic depth: -1 (below view) .. 0 (centered) .. 1 (above view)
      document.querySelectorAll(".s3d").forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        el.style.setProperty("--d", d.toFixed(3));
        el.style.setProperty("--ad", Math.abs(d).toFixed(3));
      });

      // pinned horizontal gallery
      const hs = document.querySelector(".hscroll");
      if (hs) {
        const track = hs.querySelector(".h-track");
        if (vw < 900) {
          track.style.transform = "";
          hs.style.height = "";
        } else {
          const dist = Math.max(0, track.scrollWidth - vw);
          const wantH = Math.round(dist + vh);
          if (Math.abs(hs.offsetHeight - wantH) > 2) hs.style.height = `${wantH}px`;
          const r = hs.getBoundingClientRect();
          const total = Math.max(1, r.height - vh);
          const p = Math.max(0, Math.min(1, -r.top / total));
          track.style.transform = `translate3d(${-p * dist}px,0,0)`;
          hs.style.setProperty("--hp", p.toFixed(4));
          hs.querySelectorAll(".pcard").forEach((c) => {
            const cr = c.getBoundingClientRect();
            const k = Math.max(-1.5, Math.min(1.5, (cr.left + cr.width / 2 - vw / 2) / vw));
            c.style.setProperty("--c", k.toFixed(3));
            c.style.setProperty("--ac", Math.abs(k).toFixed(3));
          });
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", onScroll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(onScroll);
    return () => {
      window.removeEventListener("load", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function Photo({ src, alt, initials }) {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img src={src} alt={alt} onError={() => setOk(false)} draggable="false" />
  ) : (
    <div className="photo-fallback">{initials}</div>
  );
}

function Cube({ className }) {
  return (
    <div className={`cube ${className || ""}`}>
      {["f", "b", "r", "l", "t", "bt"].map((f) => (
        <i key={f} className={`face ${f}`} />
      ))}
    </div>
  );
}

function Marquee({ items, reverse }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "rev" : ""}`}>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>
            {t} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function SplitTitle({ text }) {
  return (
    <span className="split" aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ "--i": i }} aria-hidden="true">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function App() {
  useScene();
  const stage = useRef(null);

  const onMove = (e) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(x * 24).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * 24).toFixed(2)}deg`);
  };
  const onLeave = () => {
    const el = stage.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div className="app">
      <div className="progress" />

      {/* floating 3D world behind everything */}
      <div className="world" aria-hidden="true">
        <Cube className="c1" />
        <Cube className="c2" />
        <Cube className="c3" />
        <div className="ring r1" />
        <div className="ring r2" />
        <div className="blob b1" />
        <div className="blob b2" />
      </div>

      <header className="nav">
        <a href="#top" className="logo">
          RC<span>.</span>
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#skills">Stack</a>
          <a href="#contact" className="pill">Let's talk</a>
        </nav>
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="top" className="hero" onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="hero-copy">
          <p className="eyebrow">AI Engineer · GenAI · LLM Applications</p>
          <h1>
            <SplitTitle text="Ramesh" />
            <br />
            <SplitTitle text="Choudhary" />
          </h1>
          <p className="lede">
            I build LLM-powered products end to end: RAG pipelines, LangGraph agents and
            structured-output APIs that actually ship.
          </p>
          <div className="cta">
            <a href="#work" className="btn solid">See my work</a>
            <a href={`mailto:${LINKS.email}`} className="btn ghost">Say hello</a>
          </div>
          <div className="stats">
            <div><b>8.5</b><span>CGPA · B.Tech AI &amp; ML</span></div>
            <div><b>2</b><span>Internships</span></div>
            <div><b>4+</b><span>AI projects shipped</span></div>
          </div>
        </div>

        <div className="stage" ref={stage}>
          <div className="stage-inner">
            <div className="layer plate" />
            <div className="layer card c-back">
              <Photo src={PHOTO_2} alt="Ramesh in a blazer" initials="RC" />
            </div>
            <div className="layer card c-front">
              <Photo src={PHOTO_1} alt="Ramesh in a kurta" initials="RC" />
            </div>
            <div className="layer chip k1">RAG</div>
            <div className="layer chip k2">LangGraph</div>
            <div className="layer chip k3">FastAPI</div>
            <div className="layer chip k4">PyTorch</div>
          </div>
        </div>

        <a href="#about" className="scroll-hint">
          <span>Scroll</span>
          <i />
        </a>
      </section>

      <Marquee items={["LLM Applications", "RAG Pipelines", "LangGraph Agents", "Prompt Engineering", "Fine-tuning", "Vector Search"]} />

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="about">
        <div className="s3d tilt-card about-card">
          <p className="eyebrow">About</p>
          <h2>
            Final-year AI &amp; ML student building <em>LLM applications</em> from prototype to production.
          </h2>
          <p>
            I'm a B.Tech student (AI &amp; ML, SJCEM, Palghar, 2023–2027) with hands-on experience
            from an AI internship using LLM APIs and prompt engineering, plus a web development
            internship shipping React.js sites. My focus is retrieval-augmented generation, agent
            orchestration with LangGraph, and clean structured outputs with Pydantic and FastAPI,
            backed by solid NLP and deep learning foundations.
          </p>
          <p className="seek">Currently seeking AI Engineer / GenAI Engineer roles.</p>
        </div>
        <div className="s3d tilt-photo">
          <div className="photo-frame">
            <Photo src={PHOTO_2} alt="Ramesh Choudhary" initials="RC" />
          </div>
          <div className="photo-tag">Open to work · India</div>
        </div>
      </section>

      {/* ---------------- EXPERIENCE ---------------- */}
      <section id="experience" className="experience">
        <div className="section-head">
          <p className="eyebrow">Experience</p>
          <h2>Where I've put it to work</h2>
        </div>
        <div className="exp-stack">
          {EXPERIENCE.map((e, i) => (
            <article className="s3d exp-card" key={e.company} style={{ "--k": i }}>
              <div className="exp-top">
                <div>
                  <h3>{e.role}</h3>
                  <p className="company">{e.company}</p>
                </div>
                <span className="date">{e.date}</span>
              </div>
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- PROJECTS (pinned horizontal 3D gallery) ---------------- */}
      <section id="work" className="hscroll">
        <div className="h-sticky">
          <div className="h-title">
            <p className="eyebrow">Selected work</p>
            <h2>Projects</h2>
            <p className="hint">Keep scrolling →</p>
          </div>
          <div className="h-track">
            {PROJECTS.map((p) => (
              <article className="pcard" key={p.n} style={{ "--accent": p.color }}>
                <div className="pcard-in">
                  <div className="pcard-top">
                    <span className="num">{p.n}</span>
                    <span className="tag">{p.tag}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <div className="tech">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            <div className="pcard end">
              <div className="pcard-in">
                <h3>More on GitHub</h3>
                <a className="btn solid" href={LINKS.github} target="_blank" rel="noreferrer">
                  github.com/RameshKChoudhary
                </a>
              </div>
            </div>
          </div>
          <div className="h-bar"><i /></div>
        </div>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section id="skills" className="skills">
        <div className="section-head">
          <p className="eyebrow">Stack</p>
          <h2>Tools I think in</h2>
        </div>

        <div className="ring-wrap" aria-hidden="true">
          <div className="skill-ring">
            {SKILL_RING.map((s, i) => (
              <span key={s} style={{ "--a": `${(360 / SKILL_RING.length) * i}deg` }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="skill-grid">
          {SKILL_GROUPS.map((g) => (
            <div className="s3d skill-card" key={g.title}>
              <h4>{g.title}</h4>
              <div className="tech">
                {g.items.map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="s3d certs">
          <h4>Certifications &amp; achievements</h4>
          <ul>
            {CERTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <Marquee reverse items={["Let's build something", "AI Engineer", "GenAI", "Open to work", "Say hello"]} />

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="contact">
        <div className="s3d contact-card">
          <p className="eyebrow">Contact</p>
          <h2>
            Let's build <em>something</em> intelligent.
          </h2>
          <a className="mail" href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          <div className="contact-row">
            <a href={`tel:${LINKS.phone.replace(/\s/g, "")}`}>{LINKS.phone}</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <footer>© {new Date().getFullYear()} Ramesh Choudhary · Built with React</footer>
      </section>
    </div>
  );
}
