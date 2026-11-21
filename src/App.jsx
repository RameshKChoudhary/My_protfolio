import { useEffect, useRef, useState } from 'react';
import './App.css';

// ── Animated background particles ──────────────────────────────────────────
function BgCanvas() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 20}s`,
    duration: `${10 + Math.random() * 20}s`,
    size: Math.random() > 0.5 ? '3px' : '2px',
    opacity: 0.3 + Math.random() * 0.5,
  }));

  return (
    <div className="bg-canvas">
      <div className="bg-grid" />
      <div className="bg-orb" />
      <div className="bg-orb" />
      <div className="bg-orb" />
      <div className="particles">
        {particles.map(p => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Scroll-reveal hook ─────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Typing animation hook ──────────────────────────────────────────────────
function useTyping(words) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const speed = deleting ? 50 : 100;
    const pause = deleting ? 400 : 1800;

    const timeout = setTimeout(() => {
      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), pause);
      } else if (deleting && text === '') {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      } else {
        setText(prev => deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1));
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);

  return text;
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#hero" className="nav-logo">RC.</a>
          <ul className="nav-links">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map(s => (
              <li key={s}><a href={`#${s.toLowerCase()}`}>{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const roles = ['AI Engineer', 'ML Engineer', 'LLM Developer', 'Full-Stack Builder'];
  const typedRole = useTyping(roles);

  return (
    <section className="hero" id="hero">
      <div className="container" style={{ position: 'relative' }}>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="dot" />
              Available for Internships
            </div>

            <h1 className="hero-name">
              Hi, I'm{' '}
              <span className="gradient-text">Ramesh Choudhary</span>
            </h1>

            <p className="hero-role">
              <span className="typing">{typedRole}</span>
            </p>

            <p className="hero-desc">
              Final-year B.Tech AI/ML student at SJCEM (CGPA 8.5) building
              intelligent systems — from RAG pipelines and LLM integrations to
              end-to-end ML models. Currently seeking AI/ML internships in Mumbai or remote.
            </p>

            <div className="hero-cta">
              <a
                href="https://github.com/RameshKChoudhary"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⚡ View GitHub
              </a>
              <a href="#contact" className="btn btn-outline">Get in Touch →</a>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div className="hero-photo-ring-2" />
            <div className="hero-photo-ring" />
            <img
              src="/photo-formal.jpg"
              alt="Ramesh Choudhary"
              className="hero-photo"
              onError={e => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=Ramesh+Choudhary&background=7c5cfc&color=fff&size=240&bold=true`;
              }}
            />
            <div className="hero-badges">
              <div className="hero-badge"><span className="badge-icon">🤖</span> LLM / RAG</div>
              <div className="hero-badge"><span className="badge-icon">🧠</span> ML / DL</div>
              <div className="hero-badge"><span className="badge-icon">⚛️</span> React</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-photo-wrap reveal-left">
            <div className="about-photo-deco" />
            <img
              src="/photo-casual.jpg"
              alt="Ramesh at a cultural event"
              className="about-photo"
              onError={e => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=RC&background=12121a&color=7c5cfc&size=380&bold=true`;
              }}
            />
            <div className="about-stat-row">
              <div className="about-stat">
                <span className="stat-num">8.5</span>
                <span className="stat-label">CGPA</span>
              </div>
              <div className="about-stat">
                <span className="stat-num">2+</span>
                <span className="stat-label">Internships</span>
              </div>
              <div className="about-stat">
                <span className="stat-num">Top 30%</span>
                <span className="stat-label">Kaggle</span>
              </div>
            </div>
          </div>

          <div className="about-text reveal-right">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <span className="section-label">About Me</span>
              <h2 className="section-title">Building AI that<br />actually works</h2>
            </div>
            <p>
              I'm a final-year B.Tech student in AI & Machine Learning at SJCEM, Palghar —
              passionate about bridging the gap between cutting-edge research and real-world
              applications. Based in Virar, Maharashtra, I focus on the western railway corridor
              for onsite roles, but I'm equally comfortable remote.
            </p>
            <p>
              My work spans LLM integrations, RAG pipelines, predictive ML models, and
              full-stack web applications. I've shipped production features as an AI Intern at
              Blessed IT Solutions and built client websites at Sunmarg India. When not coding,
              I'm competing on Kaggle or exploring Indic NLP.
            </p>
            <a href="mailto:rameshkchoudhary10@gmail.com" className="btn btn-primary">
              📩 Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────
const skillsData = [
  {
    icon: '🤖',
    category: 'Core Focus',
    title: 'Generative AI & LLMs',
    tags: ['LLM APIs', 'Prompt Engineering', 'RAG', 'LangChain', 'LangGraph', 'FastAPI', 'Vector DBs', 'LoRA / QLoRA'],
  },
  {
    icon: '🧠',
    category: 'Machine Learning',
    title: 'ML & Deep Learning',
    tags: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'XGBoost', 'CNNs', 'Transformers', 'BERT', 'Time-Series'],
  },
  {
    icon: '📊',
    category: 'Data Science',
    title: 'Data Analysis & NLP',
    tags: ['Pandas', 'NumPy', 'EDA', 'Feature Engineering', 'TF-IDF', 'Word2Vec', 'Plotly', 'Streamlit'],
  },
  {
    icon: '⚛️',
    category: 'Development',
    title: 'Full-Stack Web',
    tags: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'FastAPI', 'Docker', 'Git', 'GitHub'],
  },
  {
    icon: '🗄️',
    category: 'Databases',
    title: 'Data & Infra',
    tags: ['SQL', 'Vector Databases', 'Google Colab', 'VS Code', 'Docker'],
  },
  {
    icon: '📈',
    category: 'Visualization',
    title: 'Analytics & Dashboards',
    tags: ['Plotly', 'Matplotlib', 'Streamlit', 'Pandas Profiling'],
  },
];

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">What I Know</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Specialized in AI/ML engineering with practical full-stack development experience.
          </p>
        </div>
        <div className="skills-grid">
          {skillsData.map((s, i) => (
            <div
              className="skill-card reveal"
              key={s.title}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className="skill-icon">{s.icon}</span>
              <span className="skill-category">{s.category}</span>
              <h3>{s.title}</h3>
              <div className="skill-tags">
                {s.tags.map(t => <span className="skill-tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────
const expData = [
  {
    emoji: '💼',
    role: 'Web Developer Intern',
    company: 'Sunmarg India',
    period: 'Mar 2026 – Jun 2026',
    bullets: [
      'Built and deployed 4 SEO-optimized, fully responsive client websites using React.js, HTML5 and CSS3, ensuring consistent UI across devices and browsers.',
      'Worked in an Agile team (daily stand-ups, Git workflow) with cross-functional members to ship production-ready features and fix UI issues.',
    ],
  },
  {
    emoji: '🤖',
    role: 'AI Intern',
    company: 'Blessed IT Solutions',
    period: 'Oct 2025 – Dec 2025',
    bullets: [
      'Integrated AI-powered features into website workflows using LLM APIs to improve user interaction and automate repetitive tasks.',
      'Applied prompt engineering techniques to optimize LLM outputs, improve response accuracy, and align AI-generated content with website requirements.',
    ],
  },
];

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Work History</span>
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="timeline">
          {expData.map((e, i) => (
            <div className="timeline-item reveal" key={e.role} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="timeline-dot">{e.emoji}</div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-company">{e.company}</span>
                  <span className="timeline-period">{e.period}</span>
                </div>
                <h3 className="timeline-role">{e.role}</h3>
                <ul className="timeline-bullets">
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

// ── Projects ───────────────────────────────────────────────────────────────
const projectsData = [
  {
    emoji: '🏪',
    title: 'Store Sales Forecasting',
    desc: 'End-to-end time-series pipeline covering data cleaning, outlier handling, EDA and feature engineering. Trained XGBoost models with cross-validated RMSE — ranked Top 30% on Kaggle.',
    tags: ['Python', 'XGBoost', 'Pandas', 'Scikit-learn', 'Time-Series'],
    github: 'https://github.com/RameshKChoudhary',
  },
  {
    emoji: '🎬',
    title: 'Movie Recommendation System',
    desc: 'Hybrid recommender blending collaborative filtering (user-item rating similarity) with content-based filtering (TF-IDF, cosine similarity) into one ranked list.',
    tags: ['Python', 'Scikit-learn', 'TF-IDF', 'Collaborative Filtering'],
    github: 'https://github.com/RameshKChoudhary',
  },
  {
    emoji: '🖼️',
    title: 'CIFAR-10 Image Classifier',
    desc: 'ResNet-9 style CNN trained with data augmentation, batch normalization, dropout, and a one-cycle learning-rate schedule. Tracked accuracy and loss curves to tune the model.',
    tags: ['PyTorch', 'CNN', 'ResNet', 'GPU Training', 'Deep Learning'],
    github: 'https://github.com/RameshKChoudhary',
  },
  {
    emoji: '🎙️',
    title: 'InterviewCoach AI',
    desc: 'Voice-based AI interview trainer using Groq Whisper for STT and LLaMA 3.3 70B for structured feedback. 15-question bank with an interactive Plotly analytics dashboard.',
    tags: ['LLaMA 3.3', 'Groq Whisper', 'Streamlit', 'Plotly', 'LLM'],
    github: 'https://github.com/RameshKChoudhary',
  },
];

function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">What I've Built</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            From Kaggle competitions to AI-powered tools — here's a selection of my work.
          </p>
        </div>
        <div className="projects-grid">
          {projectsData.map((p, i) => (
            <div
              className="project-card reveal"
              key={p.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="project-top">
                <span className="project-emoji">{p.emoji}</span>
                <div className="project-links">
                  <a href={p.github} className="project-link" target="_blank" rel="noopener noreferrer" title="GitHub">⌨</a>
                </div>
              </div>
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Certifications ─────────────────────────────────────────────────────────
const certsData = [
  { icon: '🎓', name: 'Machine Learning with Scikit-learn', issuer: 'Data School · Mar 2026' },
  { icon: '🤖', name: 'Open-Source LLMs', issuer: 'Udemy · Feb 2026' },
  { icon: '✨', name: 'Generative AI & LLM Applications (Distinction)', issuer: 'MillionMinds' },
  { icon: '⚛️', name: 'Frontend Web Developer', issuer: 'Udemy · May 2026' },
  { icon: '🏆', name: 'Kaggle Top 30%', issuer: 'Retail Sales Forecasting' },
  { icon: '⚡', name: 'Hackathon Participant', issuer: 'Megahack 4.0' },
];

function Certifications() {
  return (
    <section className="certs" id="certifications">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Certifications & Achievements</h2>
        </div>
        <div className="certs-grid">
          {certsData.map((c, i) => (
            <div
              className="cert-card reveal"
              key={c.name}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className="cert-icon">{c.icon}</span>
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

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-inner reveal">
          <span className="section-label">Let's Talk</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Looking for AI/ML internships in Mumbai or remote. Open to data science,
            ML engineering, and full-stack AI roles. Minimum ₹8k/month stipend.
          </p>

          <span className="contact-email">rameshkchoudhary10@gmail.com</span>

          <div className="contact-links">
            <a href="https://github.com/RameshKChoudhary" className="contact-link" target="_blank" rel="noopener noreferrer">
              ⌨ GitHub
            </a>
            <a href="https://linkedin.com/in/ramesh-choudhary-397025291" className="contact-link" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
            <a href="https://my-protfolio-two-chi.vercel.app/" className="contact-link" target="_blank" rel="noopener noreferrer">
              🌐 Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="container">
        <p>Built with <span>♥</span> by Ramesh Choudhary · 2026</p>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal();

  return (
    <div className="app">
      <BgCanvas />
      <Navbar />
      <Hero />
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
