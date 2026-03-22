import React, { useState, useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  :root {
    --bg: #06060a;
    --surface: #0d0d14;
    --card: #111120;
    --border: rgba(120,100,255,0.15);
    --border2: rgba(120,100,255,0.08);
    --purple: #7c5cfc;
    --cyan: #00d4ff;
    --green: #00ff88;
    --text: #e8e8f2;
    --muted: #6b6b8a;
    --font-main: 'Space Grotesk', sans-serif;
    --font-mono: 'Space Mono', monospace;
    --font-display: 'Syne', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-main); overflow-x: hidden; margin: 0; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.3); border-radius: 2px; }

  @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes gridMove { to { background-position: 64px 64px; } }
  @keyframes orb-float { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(40px,30px) scale(1.1)} }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* CURSOR */
  .rc-cur { width:8px; height:8px; background:var(--purple); border-radius:50%; position:fixed; pointer-events:none; z-index:9999; mix-blend-mode:screen; }
  .rc-cur-ring { width:32px; height:32px; border:1px solid rgba(124,92,252,0.5); border-radius:50%; position:fixed; pointer-events:none; z-index:9998; transition:transform 0.25s; }

  /* NAV */
  .rc-nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    padding:0 40px; height:60px;
    display:flex; align-items:center; justify-content:space-between;
    background:rgba(6,6,10,0.85);
    backdrop-filter:blur(20px);
    border-bottom:1px solid var(--border2);
  }
  .rc-nav-logo { font-family:var(--font-mono); font-size:0.85rem; color:var(--purple); letter-spacing:0.05em; }
  .rc-nav-logo span { color:var(--cyan); }
  .rc-nav-pill { display:flex; background:var(--card); border:1px solid var(--border); border-radius:100px; padding:6px 8px; gap:4px; }
  .rc-nav-pill a { padding:6px 16px; border-radius:100px; font-size:0.75rem; letter-spacing:0.06em; color:var(--muted); text-decoration:none; transition:all 0.2s; font-family:var(--font-mono); cursor:pointer; }
  .rc-nav-pill a:hover, .rc-nav-pill a.active { background:rgba(124,92,252,0.15); color:var(--purple); }
  .rc-nav-badge { font-family:var(--font-mono); font-size:0.68rem; color:var(--green); display:flex; align-items:center; gap:6px; letter-spacing:0.06em; }
  .rc-nav-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--green); box-shadow:0 0 8px var(--green); animation:pulse-dot 2s ease-in-out infinite; }

  /* HERO */
  .rc-hero {
    min-height:100vh; padding:120px 60px 80px;
    display:flex; flex-direction:column; justify-content:center;
    position:relative; overflow:hidden;
  }
  .rc-hero-grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(124,92,252,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,252,0.05) 1px, transparent 1px);
    background-size:64px 64px;
    animation:gridMove 30s linear infinite;
    pointer-events:none;
  }
  .rc-orb { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
  .rc-orb1 { width:500px; height:500px; background:radial-gradient(circle, rgba(124,92,252,0.18), transparent); top:-100px; right:-100px; animation:orb-float 10s ease-in-out infinite alternate; }
  .rc-orb2 { width:350px; height:350px; background:radial-gradient(circle, rgba(0,212,255,0.12), transparent); bottom:50px; left:5%; animation:orb-float 13s ease-in-out infinite alternate-reverse; }
  .rc-hero-content { position:relative; z-index:2; max-width:900px; }
  .rc-hero-tag { display:inline-flex; align-items:center; gap:8px; font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.12em; color:var(--purple); background:rgba(124,92,252,0.1); border:1px solid rgba(124,92,252,0.25); padding:6px 14px; border-radius:100px; margin-bottom:32px; animation:fadeUp 0.7s ease both; }
  .rc-hero-tag-dot { width:5px; height:5px; border-radius:50%; background:var(--purple); animation:pulse-dot 1.5s infinite; }
  .rc-hero-greeting { font-family:var(--font-mono); font-size:1rem; color:var(--muted); margin-bottom:12px; animation:fadeUp 0.7s 0.1s ease both; }
  .rc-hero-greeting span { color:var(--cyan); }
  .rc-hero-name { font-family:var(--font-display); font-size:clamp(3.5rem, 9vw, 8rem); font-weight:800; line-height:0.9; letter-spacing:-0.03em; margin-bottom:24px; animation:fadeUp 0.7s 0.15s ease both; }
  .rc-glow-text { background:linear-gradient(135deg, #7c5cfc, #00d4ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .rc-hero-subtitle { font-size:1.1rem; color:var(--muted); max-width:560px; line-height:1.65; margin-bottom:48px; animation:fadeUp 0.7s 0.2s ease both; font-weight:300; }
  .rc-hero-subtitle b { color:var(--text); font-weight:500; }
  .rc-hero-chips { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:48px; animation:fadeUp 0.7s 0.25s ease both; }
  .rc-chip { font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.08em; padding:7px 14px; border-radius:6px; border:1px solid var(--border); color:var(--muted); background:var(--card); transition:all 0.2s; }
  .rc-chip:hover { border-color:var(--purple); color:var(--purple); }
  .rc-chip.active { border-color:rgba(124,92,252,0.5); color:var(--purple); background:rgba(124,92,252,0.08); }
  .rc-hero-ctas { display:flex; gap:14px; animation:fadeUp 0.7s 0.3s ease both; }
  .rc-btn-primary { padding:14px 28px; background:var(--purple); color:#fff; border:none; border-radius:8px; font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.1em; text-decoration:none; transition:all 0.25s; cursor:pointer; display:inline-block; }
  .rc-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(124,92,252,0.35); }
  .rc-btn-ghost { padding:14px 28px; background:transparent; color:var(--muted); border:1px solid var(--border); border-radius:8px; font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.1em; text-decoration:none; transition:all 0.25s; cursor:pointer; display:inline-block; }
  .rc-btn-ghost:hover { border-color:var(--purple); color:var(--purple); }
  .rc-hero-stats { position:absolute; bottom:60px; right:60px; display:flex; gap:32px; animation:fadeUp 0.7s 0.4s ease both; z-index:2; }
  .rc-hstat { text-align:right; }
  .rc-hstat-num { font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--purple); line-height:1; }
  .rc-hstat-label { font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.12em; color:var(--muted); margin-top:4px; }

  /* TICKER */
  .rc-ticker { overflow:hidden; border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:12px 0; background:var(--surface); }
  .rc-ticker-track { display:inline-flex; animation:tick 22s linear infinite; white-space:nowrap; }
  .rc-tick-item { font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.12em; color:var(--muted); padding:0 24px; display:inline-flex; align-items:center; gap:24px; }
  .rc-tick-item::after { content:'◆'; font-size:0.4rem; color:var(--purple); }

  /* SECTION */
  .rc-section { padding:100px 60px; }
  .rc-section-alt { padding:100px 60px; background:var(--surface); border-top:1px solid var(--border2); border-bottom:1px solid var(--border2); }
  .rc-sec-label { font-family:var(--font-mono); font-size:0.68rem; letter-spacing:0.2em; color:var(--purple); margin-bottom:8px; display:flex; align-items:center; gap:10px; }
  .rc-sec-label::before { content:'//'; color:var(--cyan); }
  .rc-sec-title { font-family:var(--font-display); font-size:clamp(2rem, 5vw, 3.5rem); font-weight:800; letter-spacing:-0.03em; margin-bottom:60px; line-height:1; }
  .rc-sec-title span { color:var(--purple); }
  .rc-divider { height:1px; background:linear-gradient(90deg, transparent, var(--border), transparent); margin:0 60px; }

  /* ABOUT */
  .rc-about-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
  .rc-about-text { font-size:1.05rem; color:var(--muted); line-height:1.75; font-weight:300; }
  .rc-about-text b { color:var(--text); font-weight:500; }
  .rc-about-text p+p { margin-top:20px; }
  .rc-about-cards { display:flex; flex-direction:column; gap:16px; }
  .rc-about-card { background:var(--card); border:1px solid var(--border2); border-radius:12px; padding:20px 24px; display:flex; align-items:center; gap:16px; transition:all 0.3s; }
  .rc-about-card:hover { border-color:var(--border); transform:translateX(6px); }
  .rc-about-card-icon { font-size:1.4rem; width:40px; text-align:center; flex-shrink:0; }
  .rc-about-card-text { font-family:var(--font-mono); font-size:0.78rem; color:var(--muted); line-height:1.5; }
  .rc-about-card-text b { color:var(--text); display:block; font-size:0.82rem; margin-bottom:2px; }

  /* SKILLS */
  .rc-skills-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:16px; }
  .rc-skill-card { background:var(--card); border:1px solid var(--border2); border-radius:12px; padding:24px; transition:all 0.3s; position:relative; overflow:hidden; }
  .rc-skill-card:hover { border-color:rgba(124,92,252,0.3); transform:translateY(-4px); }
  .rc-skill-head { display:flex; align-items:center; gap:10px; margin-bottom:16px; }
  .rc-skill-icon { font-size:1.1rem; width:36px; height:36px; border-radius:8px; background:rgba(124,92,252,0.12); display:flex; align-items:center; justify-content:center; }
  .rc-skill-name { font-family:var(--font-mono); font-size:0.7rem; letter-spacing:0.12em; color:var(--muted); }
  .rc-skill-tags { display:flex; flex-wrap:wrap; gap:6px; }
  .rc-stag { font-family:var(--font-mono); font-size:0.67rem; padding:4px 10px; border-radius:4px; letter-spacing:0.04em; }
  .rc-stag-p { background:rgba(124,92,252,0.1); color:#a78bfa; border:1px solid rgba(124,92,252,0.2); }
  .rc-stag-c { background:rgba(0,212,255,0.08); color:#67e8f9; border:1px solid rgba(0,212,255,0.15); }
  .rc-stag-g { background:rgba(0,255,136,0.08); color:#6ee7b7; border:1px solid rgba(0,255,136,0.12); }
  .rc-stag-n { background:rgba(255,255,255,0.04); color:var(--muted); border:1px solid var(--border2); }

  /* EXPERIENCE */
  .rc-exp-list { display:flex; flex-direction:column; gap:16px; max-width:860px; }
  .rc-exp-card { background:var(--card); border:1px solid var(--border2); border-radius:14px; padding:28px 32px; display:grid; grid-template-columns:180px 1fr; gap:24px; transition:all 0.3s; position:relative; overflow:hidden; }
  .rc-exp-card::after { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--purple); opacity:0; transition:opacity 0.3s; }
  .rc-exp-card:hover { border-color:rgba(124,92,252,0.25); }
  .rc-exp-card:hover::after { opacity:1; }
  .rc-exp-date { font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.1em; color:var(--muted); margin-bottom:8px; }
  .rc-exp-co { font-family:var(--font-display); font-size:1.1rem; font-weight:700; color:var(--text); letter-spacing:-0.01em; }
  .rc-exp-role { font-family:var(--font-mono); font-size:0.68rem; color:var(--purple); letter-spacing:0.08em; margin-top:4px; }
  .rc-exp-points { list-style:none; display:flex; flex-direction:column; gap:8px; }
  .rc-exp-points li { font-family:var(--font-mono); font-size:0.76rem; color:var(--muted); line-height:1.6; padding-left:16px; position:relative; }
  .rc-exp-points li::before { content:'▸'; position:absolute; left:0; color:var(--cyan); font-size:0.65rem; top:1px; }

  /* PROJECTS */
  .rc-projects-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:20px; }
  .rc-proj-card { background:var(--card); border:1px solid var(--border2); border-radius:16px; padding:28px; display:flex; flex-direction:column; gap:14px; transition:all 0.35s; position:relative; overflow:hidden; }
  .rc-proj-card:hover { border-color:rgba(124,92,252,0.35); transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,92,252,0.08); }
  .rc-proj-top { display:flex; justify-content:space-between; align-items:flex-start; }
  .rc-proj-num { font-family:var(--font-mono); font-size:0.65rem; color:var(--muted); letter-spacing:0.1em; }
  .rc-proj-tag { font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.08em; padding:4px 10px; border-radius:4px; }
  .rc-tag-ml { background:rgba(124,92,252,0.12); color:#a78bfa; border:1px solid rgba(124,92,252,0.2); }
  .rc-tag-fs { background:rgba(0,212,255,0.08); color:#67e8f9; border:1px solid rgba(0,212,255,0.15); }
  .rc-tag-auto { background:rgba(0,255,136,0.08); color:#6ee7b7; border:1px solid rgba(0,255,136,0.12); }
  .rc-tag-ai { background:rgba(255,60,172,0.08); color:#f9a8d4; border:1px solid rgba(255,60,172,0.12); }
  .rc-proj-title { font-family:var(--font-display); font-size:1.15rem; font-weight:700; color:var(--text); line-height:1.2; letter-spacing:-0.01em; }
  .rc-proj-desc { font-family:var(--font-mono); font-size:0.73rem; color:var(--muted); line-height:1.7; flex:1; }
  .rc-proj-stack { display:flex; flex-wrap:wrap; gap:6px; padding-top:14px; border-top:1px solid var(--border2); }
  .rc-pstack-tag { font-family:var(--font-mono); font-size:0.62rem; color:var(--muted); background:rgba(255,255,255,0.03); border:1px solid var(--border2); padding:3px 9px; border-radius:4px; letter-spacing:0.04em; }
  .rc-proj-links { display:flex; gap:10px; margin-top:4px; }
  .rc-proj-link { font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.08em; color:var(--purple); text-decoration:none; border:1px solid rgba(124,92,252,0.3); padding:5px 12px; border-radius:4px; transition:all 0.2s; }
  .rc-proj-link:hover { background:rgba(124,92,252,0.12); }

  /* ACHIEVEMENTS */
  .rc-ach-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:14px; }
  .rc-ach-card { background:var(--card); border:1px solid var(--border2); border-radius:12px; padding:22px; display:flex; align-items:flex-start; gap:14px; transition:all 0.3s; }
  .rc-ach-card:hover { border-color:rgba(0,212,255,0.25); }
  .rc-ach-icon { font-size:1.3rem; flex-shrink:0; margin-top:1px; }
  .rc-ach-body { display:flex; flex-direction:column; gap:4px; }
  .rc-ach-title { font-family:var(--font-main); font-size:0.85rem; font-weight:600; color:var(--text); }
  .rc-ach-sub { font-family:var(--font-mono); font-size:0.68rem; color:var(--muted); line-height:1.5; }

  /* CONTACT */
  .rc-contact-inner { max-width:720px; margin:0 auto; text-align:center; }
  .rc-contact-inner .rc-sec-label { justify-content:center; }
  .rc-contact-inner .rc-sec-label::before { display:none; }
  .rc-contact-headline { font-family:var(--font-display); font-size:clamp(2.5rem, 6vw, 5rem); font-weight:800; letter-spacing:-0.03em; line-height:1; margin-bottom:20px; }
  .rc-contact-sub { font-family:var(--font-mono); font-size:0.82rem; color:var(--muted); line-height:1.7; margin-bottom:48px; }
  .rc-contact-cards { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; }
  .rc-contact-card { display:flex; align-items:center; gap:12px; background:var(--card); border:1px solid var(--border2); border-radius:10px; padding:14px 20px; text-decoration:none; transition:all 0.25s; min-width:220px; }
  .rc-contact-card:hover { border-color:rgba(124,92,252,0.4); transform:translateY(-2px); }
  .rc-cc-icon { font-size:1.1rem; }
  .rc-cc-label { font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.1em; color:var(--muted); display:block; margin-bottom:2px; }
  .rc-cc-val { font-family:var(--font-mono); font-size:0.75rem; color:var(--text); }

  /* FOOTER */
  .rc-footer { padding:28px 60px; border-top:1px solid var(--border2); display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.1em; color:var(--muted); }
  .rc-footer span { color:var(--purple); }

  /* REVEAL */
  .rc-reveal { opacity:0; transform:translateY(24px); transition:opacity 0.65s ease, transform 0.65s ease; }
  .rc-reveal.visible { opacity:1; transform:translateY(0); }

  @media (max-width: 768px) {
    .rc-nav { padding:0 20px; }
    .rc-nav-pill { display:none; }
    .rc-hero { padding:100px 24px 120px; }
    .rc-hero-stats { position:static; flex-wrap:wrap; margin-top:48px; }
    .rc-section, .rc-section-alt { padding:80px 24px; }
    .rc-about-grid { grid-template-columns:1fr; gap:40px; }
    .rc-exp-card { grid-template-columns:1fr; gap:12px; }
    .rc-footer { flex-direction:column; gap:10px; text-align:center; padding:20px 24px; }
    .rc-divider { margin:0 24px; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const skills = [
  { icon: '⚛️', name: '// frontend', tags: [
    { label: 'react.js', type: 'c' }, { label: 'react native', type: 'c' },
    { label: 'typescript', type: 'n' }, { label: 'javascript es6+', type: 'n' },
    { label: 'html5', type: 'n' }, { label: 'css3', type: 'n' },
  ]},
  { icon: '🧠', name: '// machine learning', tags: [
    { label: 'scikit-learn', type: 'p' }, { label: 'xgboost', type: 'p' },
    { label: 'random forest', type: 'p' }, { label: 'knn · svm', type: 'p' },
    { label: 'nlp', type: 'p' }, { label: 'deep learning', type: 'p' },
  ]},
  { icon: '🐍', name: '// data & backend', tags: [
    { label: 'python', type: 'g' }, { label: 'sql', type: 'g' },
    { label: 'pandas', type: 'n' }, { label: 'numpy', type: 'n' },
    { label: 'matplotlib', type: 'n' }, { label: 'seaborn', type: 'n' },
  ]},
  { icon: '🤖', name: '// ai & automation', tags: [
    { label: 'n8n workflows', type: 'p' }, { label: 'ai agents', type: 'p' },
    { label: 'openai api', type: 'c' }, { label: 'api integration', type: 'n' },
    { label: 'prompt engineering', type: 'n' },
  ]},
  { icon: '📊', name: '// data viz & tools', tags: [
    { label: 'power bi', type: 'g' }, { label: 'excel', type: 'n' },
    { label: 'google colab', type: 'n' }, { label: 'kaggle', type: 'n' },
    { label: 'git · github', type: 'n' }, { label: 'vs code', type: 'n' },
  ]},
  { icon: '🌟', name: '// soft skills', tags: [
    { label: 'problem solving', type: 'n' }, { label: 'team collab', type: 'n' },
    { label: 'agile', type: 'n' }, { label: 'communication', type: 'n' },
    { label: 'prototyping', type: 'n' },
  ]},
];

const experiences = [
  {
    date: 'oct 2025',
    company: 'millionminds',
    role: '// gen ai & llm intern',
    points: [
      'hands-on training in generative ai, llms & prompt engineering — completed with distinction (highest rating)',
      'built real projects using cutting-edge ai tools in practical workflows',
      'learned the actual ins and outs of how modern ai systems work',
    ],
  },
  {
    date: 'nov 2025',
    company: 'blessed it solutions',
    role: '// data analytics intern',
    points: [
      'cleaned, validated & visualised messy data to pull actual business insights',
      'built power bi dashboards that made decision-making way faster',
    ],
  },
  {
    date: 'dec 2024 – jan 2025',
    company: 'infosis',
    role: '// web dev intern',
    points: [
      'built and maintained responsive web pages using html, css, js & react.js',
      'collabed with cross-functional teams on client-facing frontend features',
      'shipped code daily in an agile environment with stand-ups and git',
    ],
  },
];

const projects = [
  { num: '01', tag: 'ml · forecasting', tagClass: 'rc-tag-ml', title: 'store sales prediction', desc: 'end-to-end retail forecasting using time-series regression. full pipeline: eda, feature engineering, outlier handling, rmse eval. ranked top 30% on kaggle — not bad fr', stack: ['python', 'pandas', 'scikit-learn', 'seaborn'], demo: '#', github: '#' },
  { num: '02', tag: 'full-stack', tagClass: 'rc-tag-fs', title: 'healthcare app — web & mobile', desc: 'responsive healthcare portal with ayurvedic home remedies + google maps api for nearby clinics. clean ui that works on every device, built in react.js', stack: ['react.js', 'google maps api', 'css3'], demo: '#', github: 'https://github.com/RameshKChoudhary' },
  { num: '03', tag: 'automation', tagClass: 'rc-tag-auto', title: 'automated invoice processing', desc: 'n8n workflow that handles invoice extraction, validation & processing across multiple apis automatically. basically eliminated manual work entirely', stack: ['n8n', 'api integration', 'workflow automation'], demo: '#', github: '#' },
  { num: '04', tag: 'ml · prediction', tagClass: 'rc-tag-ml', title: 'medical insurance cost prediction', desc: 'regression model predicting annual insurance costs. full ml pipeline: eda, feature engineering, categorical encoding, scaling & model evaluation', stack: ['python', 'regression', 'scikit-learn'], demo: '#', github: '#' },
  { num: '05', tag: 'ml · healthcare', tagClass: 'rc-tag-ml', title: 'breast cancer prediction (knn)', desc: 'knn classifier that detects malignant vs benign cases on real-world data. proper preprocessing, train-test split, and full model evaluation', stack: ['python', 'knn', 'scikit-learn'], demo: '#', github: '#' },
  { num: '06', tag: 'ai app', tagClass: 'rc-tag-ai', title: 'ai chatbot (openai gpt api)', desc: 'context-aware chatbot powered by openai\'s gpt api. responsive chat ui with smooth interactions and accurate real-time responses. actually works', stack: ['openai api', 'javascript', 'react'], demo: 'https://ai-chat-eight-woad.vercel.app/', github: 'https://github.com/RameshKChoudhary/ai-chat' },
];

const achievements = [
  { icon: '🥇', title: 'top 30% on kaggle', sub: 'ranked among top performers in the retail sales prediction competition leaderboard' },
  { icon: '⭐', title: 'completed with distinction', sub: 'generative ai & llm applications at millionminds — highest performance rating' },
  { icon: '⚡', title: 'hackathon participant', sub: 'competed and built under real pressure — love the grind of hackathon mode' },
  { icon: '📊', title: 'excel: beginner to expert', sub: 'certified proficiency in advanced spreadsheet operations and data work' },
  { icon: '📈', title: 'microsoft excel & power bi', sub: 'certified in data visualization and business intelligence tooling' },
  { icon: '🎓', title: 'cgpa 8.5', sub: 'b.tech aiml · st. john college of engineering & management, palghar' },
];

const tickerItems = ['python','react.js','machine learning','n8n automation','data science','power bi','openai api','scikit-learn','xgboost','sql','kaggle top 30%','gen ai'];

// ── REVEAL HOOK ──────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rc-reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── COMPONENTS ───────────────────────────────────────────────
function Cursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = (e.clientX - 4) + 'px';
        curRef.current.style.top = (e.clientY - 4) + 'px';
      }
    };
    document.addEventListener('mousemove', onMove);
    let raf;
    const animate = () => {
      pos.current.rx += (pos.current.mx - pos.current.rx - 16) * 0.12;
      pos.current.ry += (pos.current.my - pos.current.ry - 16) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + 'px';
        ringRef.current.style.top = pos.current.ry + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={curRef} className="rc-cur" />
      <div ref={ringRef} className="rc-cur-ring" />
    </>
  );
}

function Navbar({ activeSection, scrollTo }) {
  const navItems = ['about', 'skills', 'experience', 'projects', 'contact'];
  return (
    <nav className="rc-nav">
      <div className="rc-nav-logo">ramesh<span>.dev</span></div>
      <div className="rc-nav-pill">
        {navItems.map(id => (
          <a key={id} className={activeSection === id ? 'active' : ''} onClick={() => scrollTo(id)}>{id}</a>
        ))}
      </div>
      <div className="rc-nav-badge">open to work</div>
    </nav>
  );
}

function Hero({ scrollTo }) {
  const chips = [
    { label: 'python 🐍', active: true }, { label: 'react.js ⚛️', active: true },
    { label: 'machine learning 🤖', active: true }, { label: 'n8n automation', active: false },
    { label: 'scikit-learn', active: false }, { label: 'power bi', active: false },
    { label: 'openai api', active: false }, { label: 'sql', active: false },
  ];
  return (
    <section id="home" className="rc-hero">
      <div className="rc-hero-grid" />
      <div className="rc-orb rc-orb1" />
      <div className="rc-orb rc-orb2" />
      <div className="rc-hero-content">
        <div className="rc-hero-tag">
          <span className="rc-hero-tag-dot" />
          b.tech aiml · virar, maharashtra · 2025
        </div>
        <p className="rc-hero-greeting">hey, i'm <span>ramesh</span> 👋</p>
        <h1 className="rc-hero-name">
          building<br />
          <span className="rc-glow-text">intelligent</span><br />
          things.
        </h1>
        <p className="rc-hero-subtitle">
          full-stack dev × data scientist × ai automation engineer.<br />
          i turn <b>raw data</b> into predictions, <b>ideas</b> into apps, and <b>workflows</b> into automated machines. lowkey obsessed with ml & n8n rn.
        </p>
        <div className="rc-hero-chips">
          {chips.map((c, i) => (
            <span key={i} className={`rc-chip${c.active ? ' active' : ''}`}>{c.label}</span>
          ))}
        </div>
        <div className="rc-hero-ctas">
          <button className="rc-btn-primary" onClick={() => scrollTo('projects')}>see what i built →</button>
          <button className="rc-btn-ghost" onClick={() => scrollTo('contact')}>let's connect</button>
        </div>
      </div>
      <div className="rc-hero-stats">
        {[['8.5','cgpa'],['6+','projects'],['top 30%','kaggle'],['distinction','gen ai']].map(([n,l]) => (
          <div key={l} className="rc-hstat">
            <div className="rc-hstat-num">{n}</div>
            <div className="rc-hstat-label">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="rc-ticker">
      <div className="rc-ticker-track">
        {doubled.map((item, i) => <span key={i} className="rc-tick-item">{item}</span>)}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="rc-section">
      <div className="rc-sec-label rc-reveal">about me</div>
      <h2 className="rc-sec-title rc-reveal">who am i, <span>fr?</span></h2>
      <div className="rc-about-grid">
        <div className="rc-about-text rc-reveal">
          <p>i'm <b>ramesh choudhary</b> — a b.tech aiml student at st. john college of engineering & management, palghar. i build stuff that actually works: ml models, web apps, and automated workflows that save real time.</p>
          <p>been deep in the <b>data science grind</b> — preprocessing, feature engineering, model training, the whole pipeline. also lowkey love building frontend stuff in react and wiring up automation flows in n8n. basically my brain runs on python and coffee ☕</p>
          <p>currently <b>open for internships</b> in data science, full-stack, or ai automation. if you're building something cool, let's talk.</p>
        </div>
        <div className="rc-about-cards rc-reveal">
          {[
            { icon: '🎓', title: 'b.tech · ai & machine learning', sub: 'st. john college of engineering & management · cgpa 8.5' },
            { icon: '📍', title: 'virar, maharashtra', sub: 'open to remote & on-site opportunities' },
            { icon: '⭐', title: 'completed with distinction', sub: 'generative ai & llm applications · millionminds' },
            { icon: '🏆', title: 'top 30% on kaggle', sub: 'retail sales prediction competition leaderboard' },
          ].map((c, i) => (
            <div key={i} className="rc-about-card">
              <div className="rc-about-card-icon">{c.icon}</div>
              <div className="rc-about-card-text"><b>{c.title}</b>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="rc-section-alt">
      <div className="rc-sec-label rc-reveal">skills & stack</div>
      <h2 className="rc-sec-title rc-reveal">what i <span>vibe</span> with</h2>
      <div className="rc-skills-grid">
        {skills.map((s, i) => (
          <div key={i} className="rc-skill-card rc-reveal">
            <div className="rc-skill-head">
              <div className="rc-skill-icon">{s.icon}</div>
              <div className="rc-skill-name">{s.name}</div>
            </div>
            <div className="rc-skill-tags">
              {s.tags.map((t, j) => (
                <span key={j} className={`rc-stag rc-stag-${t.type}`}>{t.label}</span>
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
    <section id="experience" className="rc-section">
      <div className="rc-sec-label rc-reveal">experience</div>
      <h2 className="rc-sec-title rc-reveal">where i've <span>been</span></h2>
      <div className="rc-exp-list">
        {experiences.map((exp, i) => (
          <div key={i} className="rc-exp-card rc-reveal">
            <div>
              <div className="rc-exp-date">{exp.date}</div>
              <div className="rc-exp-co">{exp.company}</div>
              <div className="rc-exp-role">{exp.role}</div>
            </div>
            <ul className="rc-exp-points">
              {exp.points.map((p, j) => <li key={j}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="rc-section-alt">
      <div className="rc-sec-label rc-reveal">projects</div>
      <h2 className="rc-sec-title rc-reveal">stuff i <span>shipped</span></h2>
      <div className="rc-projects-grid">
        {projects.map((p, i) => (
          <div key={i} className="rc-proj-card rc-reveal">
            <div className="rc-proj-top">
              <span className="rc-proj-num">{p.num}</span>
              <span className={`rc-proj-tag ${p.tagClass}`}>{p.tag}</span>
            </div>
            <h3 className="rc-proj-title">{p.title}</h3>
            <p className="rc-proj-desc">{p.desc}</p>
            <div className="rc-proj-stack">
              {p.stack.map((s, j) => <span key={j} className="rc-pstack-tag">{s}</span>)}
            </div>
            <div className="rc-proj-links">
              {p.demo !== '#' && <a href={p.demo} target="_blank" rel="noreferrer" className="rc-proj-link">live demo ↗</a>}
              {p.github !== '#' && <a href={p.github} target="_blank" rel="noreferrer" className="rc-proj-link">github ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="rc-section">
      <div className="rc-sec-label rc-reveal">achievements</div>
      <h2 className="rc-sec-title rc-reveal">the <span>w's</span> 🏆</h2>
      <div className="rc-ach-grid">
        {achievements.map((a, i) => (
          <div key={i} className="rc-ach-card rc-reveal">
            <div className="rc-ach-icon">{a.icon}</div>
            <div className="rc-ach-body">
              <div className="rc-ach-title">{a.title}</div>
              <div className="rc-ach-sub">{a.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="rc-section-alt">
      <div className="rc-contact-inner">
        <div className="rc-sec-label rc-reveal" style={{ justifyContent: 'center' }}>contact</div>
        <h2 className="rc-contact-headline rc-reveal">let's <span className="rc-glow-text">collab</span>.</h2>
        <p className="rc-contact-sub rc-reveal">
          open to internships, freelance projects & collabs in data science, full-stack or ai automation.<br />
          my dms are always open — i respond fast 🚀
        </p>
        <div className="rc-contact-cards rc-reveal">
          {[
            { icon: '✉️', label: 'email', val: 'rameshkchoudhary10@gmail.com', href: 'mailto:rameshkchoudhary10@gmail.com' },
            { icon: '📱', label: 'phone', val: '+91 96994 11468', href: 'tel:+919699411468' },
            { icon: '🔗', label: 'linkedin', val: 'in/rameshchoudhary', href: 'https://www.linkedin.com/in/ramesh-choudhary-397025291/' },
            { icon: '💻', label: 'github', val: 'github.com/RameshKChoudhary', href: 'https://github.com/RameshKChoudhary' },
          ].map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className="rc-contact-card">
              <span className="rc-cc-icon">{c.icon}</span>
              <div>
                <span className="rc-cc-label">{c.label}</span>
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
    <footer className="rc-footer">
      <div>made with 💜 by ramesh choudhary</div>
      <div>b.tech aiml · <span>st. john college, palghar</span></div>
      <div>virar, maharashtra · 2025</div>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────────────
function App() {
  const [activeSection, setActiveSection] = useState('home');

  // inject styles
  useEffect(() => {
    const tag = document.createElement('style');
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  // scroll spy
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    const onScroll = () => {
      const scrollPos = window.scrollY + 80;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useReveal();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Cursor />
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <Ticker />
      <About />
      <div className="rc-divider" />
      <Skills />
      <div className="rc-divider" />
      <Experience />
      <div className="rc-divider" />
      <Projects />
      <div className="rc-divider" />
      <Achievements />
      <div className="rc-divider" />
      <Contact />
      <Footer />
    </>
  );
}

export default App;