import React, { useState, useEffect, useRef } from 'react';
import './App.css';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const skillsData = [
  { icon:'⚛️', name:'// frontend',         tags:[{l:'react.js',t:'c'},{l:'react native',t:'c'},{l:'typescript',t:'n'},{l:'javascript es6+',t:'n'},{l:'html5',t:'n'},{l:'css3',t:'n'}] },
  { icon:'🧠', name:'// machine learning', tags:[{l:'scikit-learn',t:'p'},{l:'xgboost',t:'p'},{l:'random forest',t:'p'},{l:'knn · svm',t:'p'},{l:'nlp',t:'p'},{l:'deep learning',t:'p'}] },
  { icon:'🐍', name:'// data & backend',   tags:[{l:'python',t:'g'},{l:'sql',t:'g'},{l:'pandas',t:'n'},{l:'numpy',t:'n'},{l:'matplotlib',t:'n'},{l:'seaborn',t:'n'}] },
  { icon:'🤖', name:'// ai & automation',  tags:[{l:'n8n workflows',t:'p'},{l:'ai agents',t:'p'},{l:'openai api',t:'c'},{l:'api integration',t:'n'},{l:'prompt engineering',t:'n'}] },
  { icon:'📊', name:'// data viz & tools', tags:[{l:'power bi',t:'g'},{l:'excel',t:'n'},{l:'google colab',t:'n'},{l:'kaggle',t:'n'},{l:'git · github',t:'n'},{l:'vs code',t:'n'}] },
  { icon:'🌟', name:'// soft skills',      tags:[{l:'problem solving',t:'n'},{l:'team collab',t:'n'},{l:'agile',t:'n'},{l:'communication',t:'n'},{l:'prototyping',t:'n'}] },
];

const expsData = [
  {
    date:'oct 2025', company:'millionminds', role:'// gen ai & llm intern',
    pts:[
      'hands-on training in generative ai, llms & prompt engineering — completed with distinction (highest rating)',
      'built real projects using cutting-edge ai tools in practical workflows',
      'learned the actual ins and outs of how modern ai systems work',
    ],
  },
  {
    date:'nov 2025', company:'blessed it solutions', role:'// data analytics intern',
    pts:[
      'cleaned, validated & visualised messy data to pull actual business insights',
      'built power bi dashboards that made decision-making way faster',
    ],
  },
  {
    date:'dec 2024 – jan 2025', company:'infosis', role:'// web dev intern',
    pts:[
      'built and maintained responsive web pages using html, css, js & react.js',
      'collabed with cross-functional teams on client-facing frontend features',
      'shipped code daily in an agile environment with stand-ups and git',
    ],
  },
];

const featuredProject = {
  title: 'InterviewCoach AI 🎙️',
  sub: 'ai-powered interview prep app',
  desc: 'a full-stack ai app built with streamlit where you practice voice answers, get them transcribed via groq whisper, scored locally, then reviewed by llama 3.3 70b — all for free. think of it as your personal interview trainer that never sleeps.',
  features: [
    { bold: 'practice page', text: '— record voice, transcribe via groq whisper, get local scoring + ai feedback' },
    { bold: 'question bank', text: '— generate 15 personalised questions with categories, difficulty & why-asked explanations' },
    { bold: 'coding round', text: '— ai-generated coding problems, live code editor, test runner & full ai code review' },
    { bold: 'dashboard', text: '— progress charts: score over time, by category, filler words, session history' },
  ],
  stack: ['streamlit','groq whisper','openrouter','llama 3.3 70b','plotly','python','bcrypt','local json'],
  demo: '#',
  github: '#',
};

const projectsData = [
  { num:'01', tag:'ml · forecasting', tc:'rc-t-ml', title:'store sales prediction',           desc:'end-to-end retail forecasting using time-series regression. full pipeline: eda, feature engineering, outlier handling, rmse eval. ranked top 30% on kaggle — not bad fr',  stack:['python','pandas','scikit-learn','seaborn'],       demo:'#', gh:'#' },
  { num:'02', tag:'full-stack',        tc:'rc-t-fs', title:'healthcare app — web & mobile',    desc:'responsive healthcare portal with ayurvedic home remedies + google maps api for nearby clinics. clean ui that works on every device, built in react.js',                   stack:['react.js','google maps api','css3'],               demo:'#', gh:'https://github.com/RameshKChoudhary' },
  { num:'03', tag:'automation',        tc:'rc-t-au', title:'automated invoice processing',      desc:'n8n workflow that handles invoice extraction, validation & processing across multiple apis automatically. basically eliminated manual work entirely',                        stack:['n8n','api integration','workflow automation'],     demo:'#', gh:'#' },
  { num:'04', tag:'ml · prediction',   tc:'rc-t-ml', title:'medical insurance cost prediction', desc:'regression model predicting annual insurance costs. full ml pipeline: eda, feature engineering, categorical encoding, scaling & model evaluation',                          stack:['python','regression','scikit-learn'],              demo:'#', gh:'#' },
  { num:'05', tag:'ml · healthcare',   tc:'rc-t-ml', title:'breast cancer prediction (knn)',   desc:'knn classifier that detects malignant vs benign cases on real-world data. proper preprocessing, train-test split, and full model evaluation',                               stack:['python','knn','scikit-learn'],                     demo:'#', gh:'#' },
  { num:'06', tag:'ai app',            tc:'rc-t-ai', title:'ai chatbot (openai gpt api)',      desc:"context-aware chatbot powered by openai's gpt api. responsive chat ui with smooth interactions and accurate real-time responses. actually works",                           stack:['openai api','javascript','react'],                 demo:'https://ai-chat-eight-woad.vercel.app/', gh:'https://github.com/RameshKChoudhary/ai-chat' },
];

const achData = [
  { ico:'🥇', t:'top 30% on kaggle',         s:'ranked among top performers in the retail sales prediction competition leaderboard' },
  { ico:'⭐', t:'completed with distinction', s:'generative ai & llm applications at millionminds — highest performance rating' },
  { ico:'⚡', t:'hackathon participant',       s:'competed and built under real pressure — love the grind of hackathon mode' },
  { ico:'📊', t:'excel: beginner to expert',  s:'certified proficiency in advanced spreadsheet operations and data work' },
  { ico:'📈', t:'microsoft excel & power bi', s:'certified in data visualization and business intelligence tooling' },
  { ico:'🎓', t:'cgpa 8.5',                   s:'b.tech aiml · st. john college of engineering & management, palghar' },
];

const ticks = ['python','react.js','machine learning','n8n automation','data science','power bi','openai api','scikit-learn','xgboost','sql','kaggle top 30%','streamlit','groq whisper'];

/* ─────────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), i * 55);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.06 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

function Cursor() {
  const c = useRef(null), r = useRef(null);
  const p = useRef({ mx:0, my:0, rx:0, ry:0 });
  useEffect(() => {
    // Only run on non-touch devices
    if ('ontouchstart' in window) return;
    if (c.current) c.current.style.display = 'block';
    if (r.current) r.current.style.display = 'block';
    const mv = (e) => {
      p.current.mx = e.clientX; p.current.my = e.clientY;
      if (c.current) { c.current.style.left=(e.clientX-4)+'px'; c.current.style.top=(e.clientY-4)+'px'; }
    };
    document.addEventListener('mousemove', mv);
    let raf;
    const loop = () => {
      p.current.rx += (p.current.mx - p.current.rx - 15) * 0.12;
      p.current.ry += (p.current.my - p.current.ry - 15) * 0.12;
      if (r.current) { r.current.style.left=p.current.rx+'px'; r.current.style.top=p.current.ry+'px'; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { document.removeEventListener('mousemove', mv); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={c} className="cur" style={{display:'none',width:'8px',height:'8px',background:'#7c5cfc',borderRadius:'50%',position:'fixed',pointerEvents:'none',zIndex:9999,mixBlendMode:'screen'}} />
      <div ref={r} className="cur-rng" style={{display:'none',width:'30px',height:'30px',border:'1px solid rgba(124,92,252,.45)',borderRadius:'50%',position:'fixed',pointerEvents:'none',zIndex:9998}} />
    </>
  );
}

function Navbar({ active, go }) {
  const [open, setOpen] = useState(false);
  const nav = ['about','skills','experience','projects','contact'];
  const tap = (id) => { go(id); setOpen(false); };
  return (
    <>
      <nav className="rc-nav">
        <div className="rc-nav-logo">ramesh<span>.dev</span></div>
        <div className="rc-nav-pill">
          {nav.map(id => (
            <a key={id} className={active===id?'act':''} onClick={() => go(id)}>{id}</a>
          ))}
        </div>
        <div className="rc-nav-badge">open to work</div>
        <button
          className={`rc-hbg${open?' open':''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="toggle menu"
        >
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`rc-drawer${open?' open':''}`}>
        {nav.map(id => (
          <a key={id} className={active===id?'act':''} onClick={() => tap(id)}>{id}</a>
        ))}
        <div className="rc-drawer-badge">open to work</div>
      </div>
    </>
  );
}

function Hero({ go }) {
  const chips = [
    {l:'python 🐍',on:true},{l:'react.js ⚛️',on:true},{l:'machine learning 🤖',on:true},
    {l:'n8n automation',on:false},{l:'scikit-learn',on:false},
    {l:'groq whisper',on:false},{l:'openai api',on:false},{l:'sql',on:false},
  ];
  const stats = [['8.5','cgpa'],['6+','projects'],['top 30%','kaggle'],['distinction','gen ai']];
  return (
    <section id="home" className="rc-hero">
      <div className="rc-hero-grid" />
      <div className="rc-orb rc-orb1" />
      <div className="rc-orb rc-orb2" />
      <div className="rc-hero-inner">
        <div className="rc-hero-tag">
          <span className="rc-tag-dot" />
          b.tech aiml · virar, maharashtra · 2026
        </div>
        <p className="rc-hero-hi">hey, i'm <span>ramesh</span> 👋</p>
        <h1 className="rc-hero-name">
          building<br/>
          <span className="rc-glow">intelligent</span><br/>
          things.
        </h1>
        <p className="rc-hero-sub">
          full-stack dev × data scientist × ai automation engineer.<br/>
          i turn <b>raw data</b> into predictions, <b>ideas</b> into apps,
          and <b>workflows</b> into automated machines.
        </p>
        <div className="rc-chips">
          {chips.map((c,i) => (
            <span key={i} className={`rc-chip${c.on?' on':''}`}>{c.l}</span>
          ))}
        </div>
        <div className="rc-ctas">
          <button className="rc-btn-p" onClick={() => go('projects')}>see what i built →</button>
          <button className="rc-btn-g" onClick={() => go('contact')}>let's connect</button>
        </div>
        <div className="rc-stats">
          {stats.map(([n,l]) => (
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

function Ticker() {
  const all = [...ticks, ...ticks];
  return (
    <div className="rc-ticker">
      <div className="rc-ticker-t">
        {all.map((t,i) => <span key={i} className="rc-ti">{t}</span>)}
      </div>
    </div>
  );
}

function About() {
  const cards = [
    {ico:'🎓', t:'b.tech · ai & machine learning',  s:'st. john college of engineering & management · cgpa 8.5'},
    {ico:'📍', t:'virar, maharashtra',               s:'open to remote & on-site opportunities'},
    {ico:'⭐', t:'completed with distinction',       s:'generative ai & llm applications · millionminds'},
    {ico:'🏆', t:'top 30% on kaggle',                s:'retail sales prediction competition leaderboard'},
  ];
  return (
    <section id="about" className="rc-sec">
      <div className="rc-sec-lbl rv">about me</div>
      <h2 className="rc-sec-h rv">who am i, <span>fr?</span></h2>
      <div className="rc-about-wrap">
        <div className="rc-about-txt rv">
          <p>i'm <b>ramesh choudhary</b> — a b.tech aiml student at st. john college of engineering &amp; management, palghar. i build stuff that actually works: ml models, web apps, and automated workflows that save real time.</p>
          <p>been deep in the <b>data science grind</b> — preprocessing, feature engineering, model training, the whole pipeline. also lowkey love building frontend stuff in react and wiring up automation flows in n8n. basically my brain runs on python and coffee ☕</p>
          <p>currently <b>open for internships</b> in data science, full-stack, or ai automation. if you're building something cool, let's talk.</p>
        </div>
        <div className="rc-about-cards rv">
          {cards.map((c,i) => (
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

function Skills() {
  return (
    <section id="skills" className="rc-seca">
      <div className="rc-sec-lbl rv">skills &amp; stack</div>
      <h2 className="rc-sec-h rv">what i <span>vibe</span> with</h2>
      <div className="rc-sk-grid">
        {skillsData.map((s,i) => (
          <div key={i} className="rc-skcard rv">
            <div className="rc-sk-head">
              <div className="rc-sk-ico">{s.icon}</div>
              <div className="rc-sk-nm">{s.name}</div>
            </div>
            <div className="rc-sk-tags">
              {s.tags.map((t,j) => (
                <span key={j} className={`rc-st rc-s${t.t}`}>{t.l}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="rc-sec">
      <div className="rc-sec-lbl rv">experience</div>
      <h2 className="rc-sec-h rv">where i've <span>been</span></h2>
      <div className="rc-exp-list">
        {expsData.map((e,i) => (
          <div key={i} className="rc-excard rv">
            <div className="rc-ex-inner">
              <div>
                <div className="rc-ex-date">{e.date}</div>
                <div className="rc-ex-co">{e.company}</div>
                <div className="rc-ex-role">{e.role}</div>
              </div>
              <ul className="rc-ex-pts">
                {e.pts.map((pt,j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="rc-seca">
      <div className="rc-sec-lbl rv">projects</div>
      <h2 className="rc-sec-h rv">stuff i <span>shipped</span></h2>

      {/* ── FEATURED ── */}
      <div className="rc-feat-banner rv">
        <div className="rc-feat-label">featured project</div>
        <div className="rc-feat-title">{featuredProject.title}</div>
        <div className="rc-feat-sub">{featuredProject.sub}</div>
        <div className="rc-feat-desc">{featuredProject.desc}</div>
        <div className="rc-feat-features">
          {featuredProject.features.map((f,i) => (
            <div key={i} className="rc-feat-feat"><b>{f.bold}</b>{f.text}</div>
          ))}
        </div>
        <div className="rc-feat-stack">
          {featuredProject.stack.map((s,i) => <span key={i} className="rc-ps">{s}</span>)}
        </div>
        <div className="rc-feat-links">
          {featuredProject.demo !== '#' && (
            <a href={featuredProject.demo} target="_blank" rel="noreferrer" className="rc-p-lnk">live demo ↗</a>
          )}
          {featuredProject.github !== '#' && (
            <a href={featuredProject.github} target="_blank" rel="noreferrer" className="rc-p-lnk">github ↗</a>
          )}
        </div>
      </div>

      {/* ── GRID ── */}
      <div className="rc-proj-grid">
        {projectsData.map((p,i) => (
          <div key={i} className="rc-pcard rv">
            <div className="rc-p-top">
              <span className="rc-p-num">{p.num}</span>
              <span className={`rc-p-tag ${p.tc}`}>{p.tag}</span>
            </div>
            <h3 className="rc-p-title">{p.title}</h3>
            <p className="rc-p-desc">{p.desc}</p>
            <div className="rc-p-stack">
              {p.stack.map((s,j) => <span key={j} className="rc-ps">{s}</span>)}
            </div>
            {(p.demo !== '#' || p.gh !== '#') && (
              <div className="rc-p-links">
                {p.demo !== '#' && <a href={p.demo} target="_blank" rel="noreferrer" className="rc-p-lnk">live demo ↗</a>}
                {p.gh !== '#' && <a href={p.gh} target="_blank" rel="noreferrer" className="rc-p-lnk">github ↗</a>}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="rc-sec">
      <div className="rc-sec-lbl rv">achievements</div>
      <h2 className="rc-sec-h rv">the <span>w's</span> 🏆</h2>
      <div className="rc-ach-grid">
        {achData.map((a,i) => (
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

function Contact() {
  const links = [
    {ico:'✉️', lbl:'email',    val:'rameshkchoudhary10@gmail.com', href:'mailto:rameshkchoudhary10@gmail.com'},
    {ico:'📱', lbl:'phone',    val:'+91 96994 11468',              href:'tel:+919699411468'},
    {ico:'🔗', lbl:'linkedin', val:'in/ramesh-choudhary',          href:'https://www.linkedin.com/in/ramesh-choudhary-397025291/'},
    {ico:'💻', lbl:'github',   val:'RameshKChoudhary',             href:'https://github.com/RameshKChoudhary'},
  ];
  return (
    <section id="contact" className="rc-seca">
      <div className="rc-con-inner">
        <div className="rc-sec-lbl center rv">contact</div>
        <h2 className="rc-con-h rv">let's <span className="rc-glow">collab</span>.</h2>
        <p className="rc-con-sub rv">
          open to internships, freelance projects &amp; collabs in data science,
          full-stack or ai automation. my dms are always open — i respond fast 🚀
        </p>
        <div className="rc-con-cards rv">
          {links.map((c,i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className="rc-ccard">
              <span className="rc-cc-ico">{c.ico}</span>
              <div>
                <span className="rc-cc-lbl">{c.lbl}</span>
                <span className="rc-cc-val">{c.val}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="rc-foot">
      <div>made with 💜 by ramesh choudhary</div>
      <div>b.tech aiml · <span>st. john college, palghar</span></div>
      <div>virar, maharashtra · 2026</div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState('home');

  // scroll spy
  useEffect(() => {
    const ids = ['home','about','skills','experience','projects','contact'];
    const onScroll = () => {
      const y = window.scrollY + 70;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useReveal();

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Cursor />
      <Navbar active={active} go={go} />
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
      <Footer />
    </>
  );
}
