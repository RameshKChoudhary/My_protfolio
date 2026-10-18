import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

/* ─────────────────────────────────────────────
   DATA  (synced with resume — edit here only)
───────────────────────────────────────────── */
const GITHUB = 'https://github.com/RameshKChoudhary';

const skillsData = [
  { icon: '🐍', name: '// languages', tags: [
    { l: 'python', t: 'g' }, { l: 'sql', t: 'g' }, { l: 'javascript', t: 'c' },
  ] },
  { icon: '🧠', name: '// ml & deep learning', tags: [
    { l: 'pytorch', t: 'p' }, { l: 'scikit-learn', t: 'p' }, { l: 'xgboost', t: 'p' },
    { l: 'random forest', t: 'p' }, { l: 'pandas', t: 'n' }, { l: 'numpy', t: 'n' },
    { l: 'cross-validation', t: 'n' }, { l: 'feature engineering', t: 'n' },
  ] },
  { icon: '🤖', name: '// genai & llms', tags: [
    { l: 'openai · openrouter · groq', t: 'c' }, { l: 'llama 3.3', t: 'p' },
    { l: 'whisper (stt)', t: 'p' }, { l: 'rag', t: 'p' }, { l: 'langchain', t: 'n' },
    { l: 'faiss · chroma', t: 'n' }, { l: 'prompt engineering', t: 'n' }, { l: 'fine-tuning', t: 'n' },
  ] },
  { icon: '🚀', name: '// deployment & tools', tags: [
    { l: 'fastapi', t: 'g' }, { l: 'flask', t: 'g' }, { l: 'streamlit', t: 'g' },
    { l: 'rest apis', t: 'n' }, { l: 'n8n automation', t: 'p' },
    { l: 'git · github', t: 'n' }, { l: 'google colab', t: 'n' }, { l: 'kaggle', t: 'n' },
  ] },
  { icon: '📊', name: '// data & viz', tags: [
    { l: 'matplotlib', t: 'n' }, { l: 'seaborn', t: 'n' }, { l: 'plotly', t: 'n' }, { l: 'power bi', t: 'g' },
  ] },
  { icon: '⚛️', name: '// web', tags: [
    { l: 'react.js', t: 'c' }, { l: 'html5', t: 'n' }, { l: 'css3', t: 'n' },
    { l: 'seo', t: 'n' }, { l: 'responsive ui', t: 'n' }, { l: 'agile', t: 'n' },
  ] },
];

// newest first
const expsData = [
  {
    date: 'may 2026 – jul 2026', company: 'sunmarg india', role: '// web developer intern',
    pts: [
      'developed & deployed 4 seo-optimised client websites with react.js, html5 and css3 — better visibility and search rankings',
      'built fully responsive interfaces in a cross-functional agile team',
      'used git for version control and kept the code clean and maintainable',
    ],
  },
  {
    date: 'nov 2025', company: 'blessed it solutions', role: '// data analytics intern',
    pts: [
      'cleaned, validated & analysed multi-source business datasets in python (pandas)',
      'built power bi dashboards that sped up executive reporting',
    ],
  },
  {
    date: 'oct 2025 – nov 2025 · remote', company: 'millionminds', role: '// generative ai & llm intern',
    pts: [
      'built llm-powered apps with openai / openrouter apis — prompt engineering, fine-tuning and production workflows',
      'graduated with distinction — the top performance rating in the intern cohort',
    ],
  },
];

const featuredProject = {
  title: 'InterviewCoach AI 🎙️',
  sub: 'multi-stage ai pipeline · speech → llm feedback',
  desc: 'a working product, not a notebook: record a voice answer, transcribe it with whisper, score it locally, then get structured feedback from llama 3.3 70b — served through a fastapi backend and running on a 100% free-tier stack.',
  features: [
    { bold: 'practice',      text: '— voice answers → whisper transcription → local scoring → llm feedback' },
    { bold: 'question bank', text: '— 15 generated questions with difficulty tiers' },
    { bold: 'coding round',  text: '— live editor with ai code review' },
    { bold: 'dashboard',     text: '— plotly charts tracking progress across sessions' },
  ],
  stack: ['python', 'fastapi', 'streamlit', 'groq whisper', 'llama 3.3 70b', 'plotly'],
  demo: '#',      // paste live demo url
  github: '#',    // paste repo url
};

const projectsData = [
  {
    num: '01', tag: 'deep learning', tc: 'rc-t-ml', title: 'image classification — cnn & resnet',
    desc: 'cnn + resnet in pytorch on cifar-10 with gpu training and batch norm. boosted generalisation with augmentation, weight decay, gradient clipping and a one-cycle lr schedule; tracked accuracy/loss curves.',
    stack: ['pytorch', 'cnn', 'resnet', 'cifar-10', 'augmentation'], demo: '#', gh: '#',
  },
  {
    num: '02', tag: 'ml · forecasting', tc: 'rc-t-ml', title: 'store sales forecasting',
    desc: 'end-to-end pipeline: cleaning, outlier handling, feature engineering and rmse-driven model selection with cross-validation (random forest, xgboost). top 30% of thousands on kaggle.',
    stack: ['python', 'pandas', 'scikit-learn', 'xgboost', 'time series'], demo: '#', gh: '#',
  },
  {
    num: '03', tag: 'automation', tc: 'rc-t-au', title: 'automated invoice processing',
    desc: 'n8n workflow for invoice extraction, validation and multi-api processing — removed manual data entry entirely.',
    stack: ['n8n', 'api integration', 'workflow automation'], demo: '#', gh: '#',
  },
];

const achData = [
  { ico: '🥇', t: 'top 30% on kaggle',          s: 'store sales forecasting — thousands of participants' },
  { ico: '⭐', t: 'graduated with distinction', s: 'millionminds — top rating in the intern cohort' },
  { ico: '⚡', t: 'megahack 4.0',               s: 'delivered demo-ready projects under tight deadlines' },
  { ico: '📜', t: 'ml with scikit-learn',       s: 'data school · mar 2026' },
  { ico: '📜', t: 'open-source llms',           s: 'udemy · feb 2026' },
  { ico: '📜', t: 'generative ai & llm apps',   s: 'millionminds · oct 2025' },
];

const ticks = [
  'python', 'pytorch', 'deep learning', 'llms', 'rag', 'fastapi', 'scikit-learn', 'xgboost',
  'whisper', 'react.js', 'n8n automation', 'sql', 'power bi', 'kaggle top 30%',
];

const NAV = ['about', 'skills', 'experience', 'projects', 'contact'];
const SECTION_IDS = ['home', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), i * 50);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.06 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []); // run once — content is static
}

function useTypewriter(words, speed = 70, pause = 1400) {
  const [text, setText] = useState('');
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }
    let w = 0, c = 0, del = false, t;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      setText(word.slice(0, c));
      let d = del ? speed / 2 : speed;
      if (!del && c === word.length) { del = true; d = pause; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; d = 300; }
      t = setTimeout(tick, d);
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [words, speed, pause]);
  return text;
}

/* ─────────────────────────────────────────────
   CURSOR (fine pointers only)
───────────────────────────────────────────── */
function Cursor() {
  const cRef = useRef(null);
  const rRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia?.('(pointer: fine)').matches) return;
    const dot = cRef.current;
    const ring = rRef.current;
    if (dot) dot.style.display = 'block';
    if (ring) ring.style.display = 'block';

    const pos = { mx: 0, my: 0, rx: 0, ry: 0 };
    const onMove = (e) => {
      pos.mx = e.clientX;
      pos.my = e.clientY;
      if (dot) { dot.style.left = e.clientX - 4 + 'px'; dot.style.top = e.clientY - 4 + 'px'; }
    };
    document.addEventListener('mousemove', onMove);
    let raf;
    const loop = () => {
      pos.rx += (pos.mx - pos.rx - 15) * 0.12;
      pos.ry += (pos.my - pos.ry - 15) * 0.12;
      if (ring) { ring.style.left = pos.rx + 'px'; ring.style.top = pos.ry + 'px'; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={cRef} aria-hidden="true" style={{ display: 'none', width: 8, height: 8, background: '#5b3df5', borderRadius: '50%', position: 'fixed', pointerEvents: 'none', zIndex: 9999 }} />
      <div ref={rRef} aria-hidden="true" style={{ display: 'none', width: 30, height: 30, border: '1.5px solid rgba(91,61,245,.5)', borderRadius: '50%', position: 'fixed', pointerEvents: 'none', zIndex: 9998 }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ active, go }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handle = (id) => (e) => { e.preventDefault(); go(id); setOpen(false); };

  return (
    <>
      <nav className="rc-nav" aria-label="main">
        <a href="#home" className="rc-nav-logo" onClick={handle('home')}>ramesh<span>.dev</span></a>
        <div className="rc-nav-pill">
          {NAV.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'act' : ''} onClick={handle(id)}>{id}</a>
          ))}
        </div>
        <div className="rc-nav-badge">open to internships</div>
        <button
          className={`rc-hbg${open ? ' open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="toggle menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`rc-drawer${open ? ' open' : ''}`}>
        {NAV.map((id) => (
          <a key={id} href={`#${id}`} className={active === id ? 'act' : ''} onClick={handle(id)}>{id}</a>
        ))}
        <div className="rc-drawer-badge">open to internships</div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const ROLES = ['ai / ml engineer', 'deep learning builder', 'llm app developer', 'full-stack dev'];

function Hero({ go }) {
  const role = useTypewriter(ROLES);
  const chips = [
    { l: 'python 🐍', on: true }, { l: 'pytorch 🔥', on: true }, { l: 'llms & rag 🤖', on: true },
    { l: 'fastapi', on: false }, { l: 'scikit-learn', on: false },
    { l: 'whisper', on: false }, { l: 'react.js', on: false }, { l: 'n8n', on: false },
  ];
  const stats = [['8.5', 'cgpa'], ['3', 'internships'], ['top 30%', 'kaggle'], ['distinction', 'gen ai']];

  return (
    <section id="home" className="rc-hero">
      <div className="rc-hero-grid" />
      <div className="rc-orb rc-orb1" />
      <div className="rc-orb rc-orb2" />

      <div className="rc-hero-inner">
        <div className="rc-hero-tag">
          <span className="rc-tag-dot" />
          final-year b.tech (ai &amp; ml) · virar, maharashtra · class of 2027
        </div>

        <p className="rc-hero-hi">hey, i'm <span>ramesh</span> 👋</p>

        <h1 className="rc-hero-name">
          turning<br />
          <span className="rc-glow">models</span><br />
          into systems.
        </h1>

        <p className="rc-role" aria-live="off">
          <span className="rc-role-pre">&gt;</span> {role}<span className="rc-caret" />
        </p>

        <p className="rc-hero-sub">
          i build and ship ml systems <b>end to end</b> — data cleaning, training in
          <b> pytorch &amp; scikit-learn</b>, evaluation and deployment behind <b>apis</b>.
          looking for an ai/ml engineering internship.
        </p>

        <div className="rc-chips">
          {chips.map((c, i) => (
            <span key={i} className={`rc-chip${c.on ? ' on' : ''}`}>{c.l}</span>
          ))}
        </div>

        <div className="rc-ctas">
          <button className="rc-btn-p" onClick={() => go('projects')}>see what i built →</button>
          <button className="rc-btn-g" onClick={() => go('contact')}>let's connect</button>
          <a className="rc-btn-g" href="/Ramesh_Choudhary_Resume.pdf" target="_blank" rel="noreferrer">resume ↗</a>
        </div>

        <div className="rc-stats">
          {stats.map(([n, l]) => (
            <div key={l} className="rc-stat">
              <div className="rc-stat-n">{n}</div>
              <div className="rc-stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TICKER
───────────────────────────────────────────── */
function Ticker() {
  const doubled = [...ticks, ...ticks];
  return (
    <div className="rc-ticker" aria-hidden="true">
      <div className="rc-ticker-t">
        {doubled.map((t, i) => <span key={i} className="rc-ti">{t}</span>)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  const cards = [
    { ico: '🎓', t: 'b.tech · ai & machine learning', s: "st. john college of engineering & management · 2023–2027 · cgpa 8.5" },
    { ico: '📍', t: 'virar, maharashtra',             s: 'open to mumbai-based, remote & hybrid roles' },
    { ico: '⭐', t: 'graduated with distinction',     s: 'generative ai & llm applications · millionminds' },
    { ico: '🏆', t: 'top 30% on kaggle',              s: 'store sales forecasting competition' },
  ];

  return (
    <section id="about" className="rc-sec">
      <div className="rc-sec-lbl rv">about me</div>
      <h2 className="rc-sec-h rv">who am i, <span>fr?</span></h2>
      <div className="rc-about-wrap">
        <div className="rc-about-txt rv">
          <p>i'm <b>ramesh choudhary</b> — a final-year b.tech ai &amp; ml student who ships ml systems end to end: data cleaning, feature engineering, <b>pytorch</b> &amp; <b>scikit-learn</b> training, evaluation, and deployment behind apis.</p>
          <p>my favourite builds chain several models into one product — like <b>interviewcoach ai</b>, a speech → whisper → llama 3.3 pipeline running on a fully free-tier stack. i also automate workflows in n8n and build clean react frontends.</p>
          <p>currently <b>open for ai/ml engineering internships</b> where i can turn models into reliable, real-world systems.</p>
        </div>
        <div className="rc-about-cards rv">
          {cards.map((c, i) => (
            <div key={i} className="rc-acard">
              <div className="rc-acard-ico">{c.ico}</div>
              <div className="rc-acard-txt"><b>{c.t}</b>{c.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" className="rc-seca">
      <div className="rc-sec-lbl rv">skills &amp; stack</div>
      <h2 className="rc-sec-h rv">what i <span>vibe</span> with</h2>
      <div className="rc-sk-grid">
        {skillsData.map((s, i) => (
          <div key={i} className="rc-skcard rv">
            <div className="rc-sk-head">
              <div className="rc-sk-ico">{s.icon}</div>
              <div className="rc-sk-nm">{s.name}</div>
            </div>
            <div className="rc-sk-tags">
              {s.tags.map((t, j) => (
                <span key={j} className={`rc-st rc-s${t.t}`}>{t.l}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" className="rc-sec">
      <div className="rc-sec-lbl rv">experience</div>
      <h2 className="rc-sec-h rv">where i've <span>been</span></h2>
      <div className="rc-exp-list">
        {expsData.map((e, i) => (
          <div key={i} className="rc-excard rv">
            <div className="rc-ex-inner">
              <div>
                <div className="rc-ex-date">{e.date}</div>
                <div className="rc-ex-co">{e.company}</div>
                <div className="rc-ex-role">{e.role}</div>
              </div>
              <ul className="rc-ex-pts">
                {e.pts.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
function Links({ demo, gh, className = 'rc-p-links' }) {
  if (demo === '#' && gh === '#') return null;
  return (
    <div className={className}>
      {demo !== '#' && <a href={demo} target="_blank" rel="noreferrer" className="rc-p-lnk">live demo ↗</a>}
      {gh !== '#' && <a href={gh} target="_blank" rel="noreferrer" className="rc-p-lnk">github ↗</a>}
    </div>
  );
}

function Projects() {
  const f = featuredProject;
  return (
    <section id="projects" className="rc-seca">
      <div className="rc-sec-lbl rv">projects</div>
      <h2 className="rc-sec-h rv">stuff i <span>shipped</span></h2>

      <div className="rc-feat-banner rv">
        <div className="rc-feat-label">featured project</div>
        <div className="rc-feat-title">{f.title}</div>
        <div className="rc-feat-sub">{f.sub}</div>
        <div className="rc-feat-desc">{f.desc}</div>
        <div className="rc-feat-features">
          {f.features.map((x, i) => (
            <div key={i} className="rc-feat-feat"><b>{x.bold} </b>{x.text}</div>
          ))}
        </div>
        <div className="rc-feat-stack">
          {f.stack.map((s, i) => <span key={i} className="rc-ps">{s}</span>)}
        </div>
        <Links demo={f.demo} gh={f.github} className="rc-feat-links" />
      </div>

      <div className="rc-proj-grid">
        {projectsData.map((p) => (
          <div key={p.num} className="rc-pcard rv">
            <div className="rc-p-top">
              <span className="rc-p-num">{p.num}</span>
              <span className={`rc-p-tag ${p.tc}`}>{p.tag}</span>
            </div>
            <h3 className="rc-p-title">{p.title}</h3>
            <p className="rc-p-desc">{p.desc}</p>
            <div className="rc-p-stack">
              {p.stack.map((s, j) => <span key={j} className="rc-ps">{s}</span>)}
            </div>
            <Links demo={p.demo} gh={p.gh} />
          </div>
        ))}

        <a className="rc-pcard rc-pmore rv" href={GITHUB} target="_blank" rel="noreferrer">
          <span className="rc-pmore-ico">💻</span>
          <h3 className="rc-p-title">more on github</h3>
          <p className="rc-p-desc">notebooks, experiments and smaller builds live here.</p>
          <span className="rc-p-lnk">github.com/RameshKChoudhary ↗</span>
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ACHIEVEMENTS & CERTIFICATIONS
───────────────────────────────────────────── */
function Achievements() {
  return (
    <section id="achievements" className="rc-sec">
      <div className="rc-sec-lbl rv">certifications &amp; achievements</div>
      <h2 className="rc-sec-h rv">the <span>w's</span> 🏆</h2>
      <div className="rc-ach-grid">
        {achData.map((a, i) => (
          <div key={i} className="rc-achcard rv">
            <div className="rc-ach-ico">{a.ico}</div>
            <div>
              <div className="rc-ach-t">{a.t}</div>
              <div className="rc-ach-s">{a.s}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const links = [
    { ico: '✉️', lbl: 'email',    val: 'rameshkchoudhary10@gmail.com', href: 'mailto:rameshkchoudhary10@gmail.com' },
    { ico: '📱', lbl: 'phone',    val: '+91 96994 11468',              href: 'tel:+919699411468' },
    { ico: '🔗', lbl: 'linkedin', val: 'in/ramesh-choudhary',          href: 'https://www.linkedin.com/in/ramesh-choudhary-397025291/' },
    { ico: '💻', lbl: 'github',   val: 'RameshKChoudhary',             href: GITHUB },
  ];

  return (
    <section id="contact" className="rc-seca">
      <div className="rc-con-inner">
        <div className="rc-sec-lbl center rv">contact</div>
        <h2 className="rc-con-h rv">let's <span className="rc-glow">build</span>.</h2>
        <p className="rc-con-sub rv">
          open to ai/ml engineering internships — mumbai-based or remote. if you're shipping
          something with models in it, i'd love to help 🚀
        </p>
        <div className="rc-con-cards rv">
          {links.map((c, i) => {
            const external = c.href.startsWith('http');
            return (
              <a key={i} href={c.href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className="rc-ccard">
                <span className="rc-cc-ico">{c.ico}</span>
                <div className="rc-cc-wrap">
                  <span className="rc-cc-lbl">{c.lbl}</span>
                  <span className="rc-cc-val">{c.val}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="rc-foot">
      <div>made with 💜 by ramesh choudhary</div>
      <div>b.tech ai &amp; ml · <span>st. john college, palghar</span></div>
      <div>virar, maharashtra · {new Date().getFullYear()}</div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState('home');
  const progRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) progRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

      const probe = y + 90;
      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && probe >= el.offsetTop) current = id;
      }
      setActive(current);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useReveal();

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="rc-progress" ref={progRef} aria-hidden="true" />
      <Cursor />
      <Navbar active={active} go={go} />
      <main>
        <Hero go={go} />
        <Ticker />
        <About />
        <div className="rc-div" />
        <Skills />
        <div className="rc-div" />
        <Experience />
        <div className="rc-div" />
        <Projects />
        <div className="rc-div" />
        <Achievements />
        <div className="rc-div" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}