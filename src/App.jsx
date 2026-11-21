import { useEffect, useRef, useState } from 'react';
import './App.css';

/* ─── Custom Cursor ─────────────────────────────────────── */
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const ring_pos = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    const loop = () => {
      if (dot.current)  { dot.current.style.left = pos.current.x + 'px'; dot.current.style.top = pos.current.y + 'px'; }
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.12;
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.12;
      if (ring.current) { ring.current.style.left = ring_pos.current.x + 'px'; ring.current.style.top = ring_pos.current.y + 'px'; }
      raf.current = requestAnimationFrame(loop);
    };

    const onEnter = () => { dot.current?.classList.add('hovering');  ring.current?.classList.add('hovering'); };
    const onLeave = () => { dot.current?.classList.remove('hovering'); ring.current?.classList.remove('hovering'); };

    window.addEventListener('mousemove', onMove);

    // Delay so all elements are mounted before we query them
    const tid = setTimeout(() => {
      document.querySelectorAll('a, button, .project-card, .skill-cell, .cert-item, .about-tag')
        .forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });
    }, 500);

    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
      clearTimeout(tid);
    };
  }, []);

  return (
    <>
      <div className="cursor"      ref={dot}  />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}

/* ─── Scroll Reveal Hook ────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv, .rv-stagger');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Navbar ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">RC<span>.</span></a>
          <ul className="nav-links">
            {['About','Skills','Experience','Projects','Contact'].map(s => (
              <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
            ))}
          </ul>
          <a href="mailto:rameshkchoudhary10@gmail.com" className="nav-cta">Hire me</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-mesh">
        <div className="mesh-blob" /><div className="mesh-blob" /><div className="mesh-blob" />
      </div>
      <div className="hero-grid" />

      <div className="container">
        <div className="hero-eyebrow">AI Engineer · ML Engineer · Mumbai / Remote</div>

        <h1 className="hero-headline">
          <span className="hero-line">Building</span>
          <span className="hero-line">Intelligent</span>
          <span className="hero-line"><span className="outline-text">Systems.</span></span>
        </h1>

        <div className="hero-bottom">
          <p className="hero-desc">
            Final-year B.Tech AI/ML student at SJCEM (CGPA 8.5).
            I build LLM pipelines, RAG systems, ML models and AI-powered
            automation workflows that go from prototype to production fast.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn-hero btn-hero-primary">View Work ↓</a>
            <a href="https://github.com/RameshKChoudhary" className="btn-hero btn-hero-ghost"
               target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ─── Marquee ───────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'LLM Engineering', 'RAG Pipelines', 'PyTorch', 'LangChain',
  'n8n Automation', 'Prompt Engineering', 'FastAPI', 'React.js',
  'Scikit-learn', 'Vector Databases', 'Groq Whisper', 'Streamlit',
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span className="marquee-dot" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── About ─────────────────────────────────────────────── */
function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-wrap">
          <div className="about-photo-col rv">
            <div className="about-img-frame">
              <img
                src="/photo-casual.jpeg"
                alt="Ramesh Choudhary"
                className="about-img"
                onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=RC&background=0e0e1a&color=9b7fff&size=600&bold=true&font-size=0.3`; }}
              />
              <div className="about-img-badge">
                <span className="badge-num">8.5</span>
                <span className="badge-label">CGPA / 10</span>
              </div>
            </div>
          </div>

          <div className="about-text-col rv">
            <div>
              <div className="s-label">About me</div>
              <h2 className="s-title">AI/ML Engineer<br />from Virar, Mumbai</h2>
            </div>
            <p>
              I'm a final-year B.Tech student in Artificial Intelligence &amp; Machine
              Learning at SJCEM, Palghar — building things at the intersection of
              LLMs, automation and intelligent applications. I move fast from
              prototype to working tool and I document what I build.
            </p>
            <p>
              Interned at Blessed IT Solutions (AI) and Sunmarg India (web). Currently
              seeking AI/ML internships along Mumbai's western railway corridor or remote,
              with a minimum stipend of ₹8,000/month.
            </p>
            <div className="about-tags rv-stagger">
              {['LLM APIs','RAG','n8n','Prompt Eng.','PyTorch','FastAPI','React.js','Kaggle Top 30%'].map(t => (
                <span className="about-tag" key={t}>{t}</span>
              ))}
            </div>
            <div>
              <a href="#contact" className="btn-hero btn-hero-primary" style={{ display:'inline-flex' }}>
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ────────────────────────────────────────────── */
const SKILLS = [
  { icon:'🤖', name:'Generative AI & LLMs', pills:['LLM APIs','Prompt Eng.','RAG','LangChain','LangGraph','LoRA/QLoRA'] },
  { icon:'🔄', name:'AI Automation', pills:['n8n','API Integration','Workflow Design','Firecrawl API','FastAPI'] },
  { icon:'🧠', name:'Machine Learning', pills:['Scikit-learn','XGBoost','Time-Series','Cross-Validation','Feature Eng.'] },
  { icon:'🔬', name:'Deep Learning & NLP', pills:['PyTorch','TensorFlow','CNN','Transformers','BERT','LSTM'] },
  { icon:'📊', name:'Data & Analytics', pills:['Pandas','NumPy','EDA','Plotly','Matplotlib','SQL'] },
  { icon:'⚛️', name:'Full-Stack Dev', pills:['React.js','FastAPI','Django','Streamlit','Docker','Git'] },
];

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="skills-header rv">
          <div>
            <div className="s-label">What I work with</div>
            <h2 className="s-title">Technical Skills</h2>
          </div>
          <p className="s-sub">
            Specialized in AI/ML engineering with practical automation and
            full-stack development. Comfortable going from raw data to deployed AI feature.
          </p>
        </div>

        <div className="skills-grid rv-stagger">
          {SKILLS.map(s => (
            <div className="skill-cell" key={s.name}>
              <div className="skill-cell-icon">{s.icon}</div>
              <div className="skill-cell-name">{s.name}</div>
              <div className="skill-pills">
                {s.pills.map(p => <span className="skill-pill" key={p}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience ────────────────────────────────────────── */
const EXP = [
  {
    company: 'Sunmarg India',
    period: 'Mar 2026 – Jun 2026',
    role: 'Web Developer Intern',
    bullets: [
      'Built and deployed 4 SEO-optimized, fully responsive client websites using React.js, HTML5 and CSS3, ensuring consistent UI across devices and browsers.',
      'Worked in an Agile team (daily stand-ups, Git workflow) with cross-functional members to ship production-ready features and fix UI issues.',
    ],
  },
  {
    company: 'Blessed IT Solutions',
    period: 'Oct 2025 – Dec 2025',
    role: 'AI Intern',
    bullets: [
      'Built AI-powered workflows into website operations by integrating LLM APIs, automating repetitive tasks and improving user interaction.',
      'Applied prompt engineering to improve LLM output accuracy and keep AI-generated content aligned with business requirements.',
    ],
  },
];

function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <div className="rv" style={{ marginBottom: 64 }}>
          <div className="s-label">Work history</div>
          <h2 className="s-title">Experience</h2>
        </div>

        <div className="exp-list">
          {EXP.map((e, i) => (
            <div className="exp-item rv" key={e.role} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="exp-left">
                <div className="exp-company">{e.company}</div>
                <div className="exp-period">{e.period}</div>
              </div>
              <div className="exp-right">
                <h3 className="exp-role">{e.role}</h3>
                <ul className="exp-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ──────────────────────────────────────────── */
const PROJECTS = [
  {
    emoji: '🎙️',
    name: 'InterviewCoach AI',
    desc: 'Voice-based AI interview trainer using Groq Whisper for STT and LLaMA 3.3 70B for structured feedback. 15-question bank with difficulty tiers, live coding round with AI code review, and a Plotly progress dashboard.',
    tags: ['LLaMA 3.3','Groq Whisper','Streamlit','Plotly','FastAPI'],
    featured: true,
    num: '01',
  },
  {
    emoji: '📄',
    name: 'Automated Invoice Processing',
    desc: 'n8n workflow that extracts and validates invoice data automatically, routes it across APIs, and eliminates manual data entry and human error.',
    tags: ['n8n','API Integration','Workflow Automation'],
    num: '02',
  },
  {
    emoji: '🏪',
    name: 'Store Sales Forecasting',
    desc: 'End-to-end time-series pipeline with XGBoost. Covered data cleaning, EDA, feature engineering, cross-validated RMSE. Ranked Top 30% on Kaggle.',
    tags: ['XGBoost','Pandas','Scikit-learn','Time-Series'],
    num: '03',
  },
  {
    emoji: '🌐',
    name: 'Web Data Extraction',
    desc: 'Configured Firecrawl API to scrape websites and turn pages into structured data for LLM workflows — zero manual copy-paste.',
    tags: ['Firecrawl API','LLM Workflows','Python'],
    num: '04',
  },
  {
    emoji: '🎬',
    name: 'Movie Recommendation System',
    desc: 'Hybrid recommender blending collaborative filtering (user-item ratings) with content-based filtering (TF-IDF, cosine similarity) into one ranked list.',
    tags: ['Scikit-learn','TF-IDF','Collaborative Filtering'],
    num: '05',
  },
  {
    emoji: '🖼️',
    name: 'CIFAR-10 Classifier',
    desc: 'ResNet-9 style CNN trained with data augmentation, batch norm, dropout, and a one-cycle LR schedule in PyTorch. Tracked accuracy/loss curves.',
    tags: ['PyTorch','CNN','ResNet','GPU Training'],
    num: '06',
  },
];

function Projects() {
  const GH = 'https://github.com/RameshKChoudhary';
  const featured = PROJECTS.find(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="projects-header rv">
          <div>
            <div className="s-label">What I've built</div>
            <h2 className="s-title">Projects</h2>
          </div>
          <p className="s-sub" style={{ maxWidth: 360 }}>
            From Kaggle competitions to production AI tools and automation pipelines.
          </p>
        </div>

        <div className="projects-grid rv-stagger">
          {/* Featured */}
          <div className="project-card featured">
            <div className="project-visual">
              <div className="project-visual-glow" />
              <span style={{ fontSize:'6rem', zIndex:1 }}>{featured.emoji}</span>
            </div>
            <div className="project-body">
              <span className="project-num">{featured.num}</span>
              <h3 className="project-name">{featured.name}</h3>
              <p className="project-desc">{featured.desc}</p>
              <div className="project-footer">
                <div className="project-tags">
                  {featured.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
                </div>
                <a href={GH} className="project-arrow" target="_blank" rel="noopener noreferrer">↗</a>
              </div>
            </div>
          </div>

          {/* Rest */}
          {rest.map(p => (
            <div className="project-card" key={p.name}>
              <div className="project-visual" style={{ minHeight:160 }}>
                <div className="project-visual-glow" />
                <span style={{ zIndex:1 }}>{p.emoji}</span>
              </div>
              <div className="project-body">
                <span className="project-num">{p.num}</span>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-footer">
                  <div className="project-tags">
                    {p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
                  </div>
                  <a href={GH} className="project-arrow" target="_blank" rel="noopener noreferrer">↗</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Certifications ────────────────────────────────────── */
const CERTS = [
  { icon:'🤖', name:'Generative AI & LLM Applications', issuer:'MillionMinds — Distinction' },
  { icon:'📚', name:'Open-Source LLMs', issuer:'Udemy · Feb 2026' },
  { icon:'🧪', name:'Machine Learning with Scikit-learn', issuer:'Data School · Mar 2026' },
  { icon:'⚛️', name:'Frontend Web Developer', issuer:'Udemy · May 2026' },
  { icon:'🏆', name:'Kaggle Top 30%', issuer:'Retail Sales Forecasting' },
  { icon:'⚡', name:'Hackathon Participant', issuer:'Megahack 4.0' },
];

function Certifications() {
  return (
    <section id="certifications" className="certs-section">
      <div className="container">
        <div className="rv" style={{ marginBottom:64 }}>
          <div className="s-label">Credentials</div>
          <h2 className="s-title">Certifications &amp; Achievements</h2>
        </div>
        <div className="certs-grid rv-stagger">
          {CERTS.map(c => (
            <div className="cert-item" key={c.name}>
              <div className="cert-icon-wrap">{c.icon}</div>
              <div className="cert-info">
                <div className="cert-name">{c.name}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ───────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg-text">HELLO</div>
      <div className="container">
        <div className="contact-inner">
          <div className="contact-text rv">
            <div>
              <div className="s-label">Let's work together</div>
              <h2 className="s-title">Got an<br />opportunity?</h2>
            </div>
            <p>
              I'm actively looking for AI/ML internships in Mumbai (western railway)
              or remote. Open to data science, ML engineering, AI automation, and
              full-stack AI roles.
            </p>
            <a href="mailto:rameshkchoudhary10@gmail.com" className="contact-email-link">
              rameshkchoudhary10@gmail.com
            </a>
            <div className="contact-note">
              <span>● Available now</span> · Minimum ₹8,000/month · Virar, Maharashtra
            </div>
          </div>

          <div className="contact-links-col rv">
            <div className="s-label" style={{ marginBottom:0 }}>Find me online</div>
            <div className="social-row">
              {[
                { icon:'⌨️', label:'GitHub',    href:'https://github.com/RameshKChoudhary' },
                { icon:'💼', label:'LinkedIn',  href:'https://linkedin.com/in/ramesh-choudhary-397025291' },
                { icon:'🌐', label:'Portfolio', href:'https://my-protfolio-two-chi.vercel.app/' },
              ].map(s => (
                <a key={s.label} href={s.href} className="social-link"
                   target="_blank" rel="noopener noreferrer">
                  <span style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span className="social-link-icon">{s.icon}</span>
                    {s.label}
                  </span>
                  <span className="social-link-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-inner">
          <a href="#hero" className="foot-logo">RC.</a>
          <span className="foot-copy">© 2026 Ramesh Choudhary</span>
          <a href="#hero" className="foot-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────── */
export default function App() {
  useReveal();
  return (
    <div className="app">
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
