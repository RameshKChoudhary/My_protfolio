import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   STYLES  (mobile-first, then up)
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
  body { background: #06060a; color: #e8e8f2; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }

  :root {
    --bg:     #06060a;
    --surf:   #0d0d14;
    --card:   #111120;
    --b1:     rgba(120,100,255,0.15);
    --b2:     rgba(120,100,255,0.08);
    --pu:     #7c5cfc;
    --cy:     #00d4ff;
    --gr:     #00ff88;
    --tx:     #e8e8f2;
    --mu:     #6b6b8a;
    --fm:     'Space Grotesk', sans-serif;
    --fmo:    'Space Mono', monospace;
    --fd:     'Syne', sans-serif;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.35); border-radius: 2px; }

  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes grid   { to{ background-position:48px 48px } }
  @keyframes orb    { 0%{transform:translate(0,0)scale(1)} 100%{transform:translate(30px,20px)scale(1.08)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes tick   { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ── cursor (desktop only) ── */
  .cur     { width:8px;height:8px;background:var(--pu);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;mix-blend-mode:screen;transition:transform .1s; }
  .cur-rng { width:30px;height:30px;border:1px solid rgba(124,92,252,.45);border-radius:50%;position:fixed;pointer-events:none;z-index:9998; }

  /* ── nav ── */
  .nav {
    position:fixed;top:0;left:0;right:0;z-index:200;
    height:56px;padding:0 16px;
    display:flex;align-items:center;justify-content:space-between;
    background:rgba(6,6,10,.92);
    backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    border-bottom:1px solid var(--b2);
  }
  .nav-logo { font-family:var(--fmo);font-size:.82rem;color:var(--pu);letter-spacing:.05em; }
  .nav-logo span { color:var(--cy); }
  .nav-pill { display:none; }
  .nav-badge { display:none; }

  /* hamburger */
  .hbg { display:flex;flex-direction:column;gap:5px;cursor:pointer;padding:8px 4px;background:none;border:none;-webkit-tap-highlight-color:transparent; }
  .hbg span { display:block;width:22px;height:2px;background:var(--mu);border-radius:2px;transition:all .28s; }
  .hbg.open span:nth-child(1) { transform:translateY(7px)rotate(45deg);background:var(--pu); }
  .hbg.open span:nth-child(2) { opacity:0; }
  .hbg.open span:nth-child(3) { transform:translateY(-7px)rotate(-45deg);background:var(--pu); }

  /* mobile drawer */
  .drawer {
    position:fixed;top:56px;left:0;right:0;z-index:199;
    background:rgba(10,10,18,.97);
    backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    border-bottom:1px solid var(--b1);
    max-height:0;overflow:hidden;
    transition:max-height .32s cubic-bezier(.4,0,.2,1);
  }
  .drawer.open { max-height:380px; }
  .drawer a {
    display:block;padding:15px 24px;
    font-family:var(--fmo);font-size:.8rem;letter-spacing:.1em;
    color:var(--mu);text-decoration:none;cursor:pointer;
    border-left:3px solid transparent;
    transition:all .18s;-webkit-tap-highlight-color:transparent;
  }
  .drawer a:hover, .drawer a.act { color:var(--pu);border-left-color:var(--pu);background:rgba(124,92,252,.07); }
  .drawer-badge { padding:14px 24px;font-family:var(--fmo);font-size:.7rem;color:var(--gr);display:flex;align-items:center;gap:8px; }
  .drawer-badge::before { content:'';width:6px;height:6px;border-radius:50%;background:var(--gr);box-shadow:0 0 8px var(--gr);animation:pulse 2s infinite; }

  /* ── hero ── */
  .hero {
    min-height:100svh;
    padding:80px 20px 140px;
    display:flex;flex-direction:column;justify-content:center;
    position:relative;overflow:hidden;
  }
  .hero-grid {
    position:absolute;inset:0;pointer-events:none;
    background-image:linear-gradient(rgba(124,92,252,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,92,252,.04) 1px,transparent 1px);
    background-size:48px 48px;
    animation:grid 35s linear infinite;
  }
  .orb { position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none; }
  .orb1 { width:300px;height:300px;background:radial-gradient(circle,rgba(124,92,252,.18),transparent);top:-80px;right:-80px;animation:orb 10s ease-in-out infinite alternate; }
  .orb2 { width:220px;height:220px;background:radial-gradient(circle,rgba(0,212,255,.12),transparent);bottom:60px;left:-40px;animation:orb 14s ease-in-out infinite alternate-reverse; }

  .hero-inner { position:relative;z-index:2; }

  .hero-tag {
    display:inline-flex;align-items:center;gap:8px;
    font-family:var(--fmo);font-size:.62rem;letter-spacing:.14em;
    color:var(--pu);background:rgba(124,92,252,.1);
    border:1px solid rgba(124,92,252,.25);
    padding:6px 12px;border-radius:100px;
    margin-bottom:20px;
    animation:fadeUp .6s ease both;
  }
  .tag-dot { width:5px;height:5px;border-radius:50%;background:var(--pu);animation:pulse 1.5s infinite; }

  .hero-hi { font-family:var(--fmo);font-size:.88rem;color:var(--mu);margin-bottom:8px;animation:fadeUp .6s .08s ease both; }
  .hero-hi span { color:var(--cy); }

  .hero-name {
    font-family:var(--fd);
    font-size:clamp(2.8rem,13vw,8rem);
    font-weight:800;line-height:.88;letter-spacing:-.03em;
    margin-bottom:18px;
    animation:fadeUp .6s .13s ease both;
  }
  .glow { background:linear-gradient(135deg,#7c5cfc,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

  .hero-sub {
    font-size:clamp(.85rem,3.5vw,1.05rem);
    color:var(--mu);line-height:1.65;
    margin-bottom:28px;
    animation:fadeUp .6s .18s ease both;
  }
  .hero-sub b { color:var(--tx);font-weight:500; }

  .chips { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;animation:fadeUp .6s .22s ease both; }
  .chip {
    font-family:var(--fmo);font-size:.62rem;letter-spacing:.07em;
    padding:6px 11px;border-radius:6px;
    border:1px solid var(--b1);color:var(--mu);background:var(--card);
    transition:all .2s;white-space:nowrap;
  }
  .chip.on { border-color:rgba(124,92,252,.5);color:var(--pu);background:rgba(124,92,252,.08); }

  .ctas { display:flex;flex-direction:column;gap:10px;animation:fadeUp .6s .26s ease both; }
  .btn-p {
    display:block;text-align:center;
    padding:14px 20px;background:var(--pu);color:#fff;
    border:none;border-radius:8px;
    font-family:var(--fmo);font-size:.75rem;letter-spacing:.1em;
    text-decoration:none;cursor:pointer;transition:all .22s;
  }
  .btn-p:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,92,252,.4); }
  .btn-g {
    display:block;text-align:center;
    padding:14px 20px;background:transparent;color:var(--mu);
    border:1px solid var(--b1);border-radius:8px;
    font-family:var(--fmo);font-size:.75rem;letter-spacing:.1em;
    text-decoration:none;cursor:pointer;transition:all .22s;
  }
  .btn-g:hover { border-color:var(--pu);color:var(--pu); }

  /* hero stats grid */
  .stats {
    display:grid;grid-template-columns:1fr 1fr;gap:12px;
    margin-top:36px;
    animation:fadeUp .6s .3s ease both;
  }
  .stat {
    background:var(--card);border:1px solid var(--b2);
    border-radius:10px;padding:14px 16px;
  }
  .stat-n { font-family:var(--fd);font-size:1.5rem;font-weight:800;color:var(--pu);line-height:1; }
  .stat-l { font-family:var(--fmo);font-size:.58rem;letter-spacing:.12em;color:var(--mu);margin-top:4px; }

  /* ── ticker ── */
  .ticker { overflow:hidden;border-top:1px solid var(--b1);border-bottom:1px solid var(--b1);padding:10px 0;background:var(--surf); }
  .ticker-t { display:inline-flex;animation:tick 20s linear infinite;white-space:nowrap; }
  .ti { font-family:var(--fmo);font-size:.65rem;letter-spacing:.1em;color:var(--mu);padding:0 18px;display:inline-flex;align-items:center;gap:18px; }
  .ti::after { content:'◆';font-size:.38rem;color:var(--pu); }

  /* ── section base ── */
  .sec  { padding:60px 20px; }
  .seca { padding:60px 20px;background:var(--surf);border-top:1px solid var(--b2);border-bottom:1px solid var(--b2); }
  .div  { height:1px;background:linear-gradient(90deg,transparent,var(--b1),transparent);margin:0 20px; }

  .sec-lbl { font-family:var(--fmo);font-size:.65rem;letter-spacing:.2em;color:var(--pu);margin-bottom:8px;display:flex;align-items:center;gap:8px; }
  .sec-lbl::before { content:'//';color:var(--cy); }
  .sec-lbl.center { justify-content:center; }
  .sec-lbl.center::before { display:none; }

  .sec-h { font-family:var(--fd);font-size:clamp(1.8rem,7vw,3rem);font-weight:800;letter-spacing:-.03em;line-height:1;margin-bottom:36px; }
  .sec-h span { color:var(--pu); }

  /* reveal */
  .rv { opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease; }
  .rv.in { opacity:1;transform:translateY(0); }

  /* ── about ── */
  .about-txt { font-size:.95rem;color:var(--mu);line-height:1.75;font-weight:300;margin-bottom:28px; }
  .about-txt b { color:var(--tx);font-weight:500; }
  .about-txt p+p { margin-top:16px; }
  .about-cards { display:flex;flex-direction:column;gap:12px; }
  .acard { background:var(--card);border:1px solid var(--b2);border-radius:12px;padding:16px 18px;display:flex;align-items:center;gap:14px;transition:all .3s; }
  .acard:hover { border-color:var(--b1);transform:translateX(4px); }
  .acard-ico { font-size:1.3rem;width:36px;text-align:center;flex-shrink:0; }
  .acard-txt { font-family:var(--fmo);font-size:.72rem;color:var(--mu);line-height:1.5; }
  .acard-txt b { color:var(--tx);display:block;font-size:.76rem;margin-bottom:2px; }

  /* ── skills ── */
  .sk-grid { display:grid;grid-template-columns:1fr;gap:12px; }
  .skcard { background:var(--card);border:1px solid var(--b2);border-radius:12px;padding:18px;transition:all .3s; }
  .skcard:hover { border-color:rgba(124,92,252,.3);transform:translateY(-3px); }
  .sk-head { display:flex;align-items:center;gap:10px;margin-bottom:14px; }
  .sk-ico { font-size:1rem;width:32px;height:32px;border-radius:7px;background:rgba(124,92,252,.12);display:flex;align-items:center;justify-content:center; }
  .sk-nm { font-family:var(--fmo);font-size:.65rem;letter-spacing:.1em;color:var(--mu); }
  .sk-tags { display:flex;flex-wrap:wrap;gap:6px; }
  .st { font-family:var(--fmo);font-size:.62rem;padding:3px 9px;border-radius:4px;letter-spacing:.03em; }
  .sp { background:rgba(124,92,252,.1);color:#a78bfa;border:1px solid rgba(124,92,252,.2); }
  .sc { background:rgba(0,212,255,.08);color:#67e8f9;border:1px solid rgba(0,212,255,.15); }
  .sg { background:rgba(0,255,136,.07);color:#6ee7b7;border:1px solid rgba(0,255,136,.12); }
  .sn { background:rgba(255,255,255,.03);color:var(--mu);border:1px solid var(--b2); }

  /* ── experience ── */
  .exp-list { display:flex;flex-direction:column;gap:12px; }
  .excard {
    background:var(--card);border:1px solid var(--b2);border-radius:12px;
    padding:20px;transition:all .3s;position:relative;overflow:hidden;
  }
  .excard::before { content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--pu);opacity:0;transition:opacity .3s; }
  .excard:hover { border-color:rgba(124,92,252,.25); }
  .excard:hover::before { opacity:1; }
  .ex-date { font-family:var(--fmo);font-size:.6rem;letter-spacing:.1em;color:var(--mu);margin-bottom:6px; }
  .ex-co { font-family:var(--fd);font-size:1rem;font-weight:700;color:var(--tx); }
  .ex-role { font-family:var(--fmo);font-size:.65rem;color:var(--pu);letter-spacing:.07em;margin-top:3px;margin-bottom:14px; }
  .ex-pts { list-style:none;display:flex;flex-direction:column;gap:8px; }
  .ex-pts li { font-family:var(--fmo);font-size:.72rem;color:var(--mu);line-height:1.6;padding-left:16px;position:relative; }
  .ex-pts li::before { content:'▸';position:absolute;left:0;color:var(--cy);font-size:.6rem;top:2px; }

  /* ── projects ── */
  .proj-grid { display:grid;grid-template-columns:1fr;gap:14px; }

  /* featured badge */
  .feat-banner {
    background:linear-gradient(135deg,rgba(124,92,252,.15),rgba(0,212,255,.08));
    border:1px solid rgba(124,92,252,.3);
    border-radius:14px;padding:20px;
    margin-bottom:20px;position:relative;overflow:hidden;
  }
  .feat-banner::before { content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,92,252,.05),transparent);pointer-events:none; }
  .feat-label { font-family:var(--fmo);font-size:.6rem;letter-spacing:.16em;color:var(--cy);margin-bottom:10px;display:flex;align-items:center;gap:6px; }
  .feat-label::before { content:'★';font-size:.55rem; }
  .feat-title { font-family:var(--fd);font-size:1.15rem;font-weight:800;color:var(--tx);margin-bottom:6px;line-height:1.15; }
  .feat-sub { font-family:var(--fmo);font-size:.68rem;color:var(--pu);letter-spacing:.06em;margin-bottom:12px; }
  .feat-desc { font-family:var(--fmo);font-size:.72rem;color:var(--mu);line-height:1.72;margin-bottom:16px; }
  .feat-features { display:flex;flex-direction:column;gap:6px;margin-bottom:16px; }
  .feat-feat { font-family:var(--fmo);font-size:.68rem;color:var(--mu);line-height:1.55;padding-left:14px;position:relative; }
  .feat-feat::before { content:'→';position:absolute;left:0;color:var(--pu);font-size:.62rem;top:1px; }
  .feat-feat b { color:var(--tx);font-weight:500; }
  .feat-stack { display:flex;flex-wrap:wrap;gap:6px;padding-top:14px;border-top:1px solid var(--b2);margin-bottom:14px; }
  .feat-links { display:flex;gap:10px; }

  .pcard { background:var(--card);border:1px solid var(--b2);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:12px;transition:all .32s; }
  .pcard:hover { border-color:rgba(124,92,252,.35);transform:translateY(-4px);box-shadow:0 16px 36px rgba(0,0,0,.4); }
  .p-top { display:flex;justify-content:space-between;align-items:flex-start; }
  .p-num { font-family:var(--fmo);font-size:.62rem;color:var(--mu);letter-spacing:.1em; }
  .p-tag { font-family:var(--fmo);font-size:.58rem;letter-spacing:.07em;padding:3px 9px;border-radius:4px; }
  .t-ml  { background:rgba(124,92,252,.12);color:#a78bfa;border:1px solid rgba(124,92,252,.2); }
  .t-fs  { background:rgba(0,212,255,.08);color:#67e8f9;border:1px solid rgba(0,212,255,.15); }
  .t-au  { background:rgba(0,255,136,.07);color:#6ee7b7;border:1px solid rgba(0,255,136,.12); }
  .t-ai  { background:rgba(255,60,172,.08);color:#f9a8d4;border:1px solid rgba(255,60,172,.12); }
  .p-title { font-family:var(--fd);font-size:1rem;font-weight:700;color:var(--tx);line-height:1.2;letter-spacing:-.01em; }
  .p-desc { font-family:var(--fmo);font-size:.7rem;color:var(--mu);line-height:1.7;flex:1; }
  .p-stack { display:flex;flex-wrap:wrap;gap:5px;padding-top:12px;border-top:1px solid var(--b2); }
  .ps { font-family:var(--fmo);font-size:.58rem;color:var(--mu);background:rgba(255,255,255,.03);border:1px solid var(--b2);padding:3px 8px;border-radius:4px;letter-spacing:.03em; }
  .p-links { display:flex;gap:8px; }
  .p-lnk { font-family:var(--fmo);font-size:.62rem;letter-spacing:.07em;color:var(--pu);text-decoration:none;border:1px solid rgba(124,92,252,.3);padding:5px 11px;border-radius:4px;transition:all .2s;white-space:nowrap; }
  .p-lnk:hover { background:rgba(124,92,252,.12); }

  /* ── achievements ── */
  .ach-grid { display:grid;grid-template-columns:1fr;gap:10px; }
  .achcard { background:var(--card);border:1px solid var(--b2);border-radius:12px;padding:18px;display:flex;align-items:flex-start;gap:12px;transition:all .3s; }
  .achcard:hover { border-color:rgba(0,212,255,.25); }
  .ach-ico { font-size:1.2rem;flex-shrink:0;margin-top:1px; }
  .ach-t { font-family:var(--fm);font-size:.82rem;font-weight:600;color:var(--tx);margin-bottom:3px; }
  .ach-s { font-family:var(--fmo);font-size:.65rem;color:var(--mu);line-height:1.5; }

  /* ── contact ── */
  .con-inner { max-width:600px;margin:0 auto;text-align:center; }
  .con-h { font-family:var(--fd);font-size:clamp(2.2rem,9vw,4.5rem);font-weight:800;letter-spacing:-.03em;line-height:1;margin-bottom:16px; }
  .con-sub { font-family:var(--fmo);font-size:.76rem;color:var(--mu);line-height:1.7;margin-bottom:36px; }
  .con-cards { display:flex;flex-direction:column;gap:10px; }
  .ccard { display:flex;align-items:center;gap:12px;background:var(--card);border:1px solid var(--b2);border-radius:10px;padding:14px 18px;text-decoration:none;transition:all .22s; }
  .ccard:hover { border-color:rgba(124,92,252,.4);transform:translateY(-2px); }
  .cc-ico { font-size:1rem;flex-shrink:0; }
  .cc-lbl { font-family:var(--fmo);font-size:.58rem;letter-spacing:.1em;color:var(--mu);display:block;margin-bottom:2px; }
  .cc-val { font-family:var(--fmo);font-size:.72rem;color:var(--tx);word-break:break-all; }

  /* ── footer ── */
  .foot { padding:20px;border-top:1px solid var(--b2);text-align:center;font-family:var(--fmo);font-size:.6rem;letter-spacing:.08em;color:var(--mu);display:flex;flex-direction:column;gap:6px;line-height:1.6; }
  .foot span { color:var(--pu); }

  /* ══════════════════════════════════════════
     TABLET  ≥ 640px
  ══════════════════════════════════════════ */
  @media (min-width: 640px) {
    .nav { padding:0 32px;height:60px; }
    .hero { padding:100px 40px 120px; }
    .orb1 { width:380px;height:380px; }
    .orb2 { width:280px;height:280px; }
    .ctas { flex-direction:row; }
    .btn-p, .btn-g { width:auto; }
    .stats { grid-template-columns:repeat(4,1fr);gap:14px; }
    .sec, .seca { padding:80px 40px; }
    .div { margin:0 40px; }
    .sk-grid { grid-template-columns:repeat(2,1fr); }
    .proj-grid { grid-template-columns:repeat(2,1fr); }
    .ach-grid { grid-template-columns:repeat(2,1fr); }
    .con-cards { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
    .foot { flex-direction:row;justify-content:space-between;padding:20px 40px; }
    .feat-features { display:grid;grid-template-columns:1fr 1fr;gap:6px; }
  }

  /* ══════════════════════════════════════════
     DESKTOP  ≥ 1024px
  ══════════════════════════════════════════ */
  @media (min-width: 1024px) {
    .cur, .cur-rng { display:block; }
    .nav { padding:0 48px;height:60px; }
    .nav-pill { display:flex;background:var(--card);border:1px solid var(--b1);border-radius:100px;padding:6px 8px;gap:4px; }
    .nav-pill a { padding:6px 16px;border-radius:100px;font-size:.75rem;letter-spacing:.06em;color:var(--mu);text-decoration:none;transition:all .2s;font-family:var(--fmo);cursor:pointer; }
    .nav-pill a:hover, .nav-pill a.act { background:rgba(124,92,252,.15);color:var(--pu); }
    .nav-badge { display:flex;font-family:var(--fmo);font-size:.68rem;color:var(--gr);align-items:center;gap:6px;letter-spacing:.06em; }
    .nav-badge::before { content:'';width:6px;height:6px;border-radius:50%;background:var(--gr);box-shadow:0 0 8px var(--gr);animation:pulse 2s infinite; }
    .hbg { display:none; }
    .hero { padding:120px 80px 100px; }
    .hero-name { font-size:clamp(5rem,9vw,8rem); }
    .hero-sub { max-width:580px; }
    .stats { display:flex;gap:0;margin-top:0;position:absolute;bottom:60px;right:80px;width:auto;background:none; }
    .stat { background:none;border:none;border-right:1px solid var(--b1);padding-right:24px;margin-right:24px;border-radius:0; }
    .stat:last-child { border-right:none;margin-right:0;padding-right:0; }
    .stat-n { font-size:2rem; }
    .sec, .seca { padding:100px 80px; }
    .div { margin:0 80px; }
    .about-wrap { display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center; }
    .sk-grid { grid-template-columns:repeat(3,1fr); }
    .excard { padding:28px 32px; }
    .ex-inner { display:grid;grid-template-columns:180px 1fr;gap:24px; }
    .ex-co { font-size:1.1rem; }
    .ex-pts li { font-size:.76rem; }
    .proj-grid { grid-template-columns:repeat(2,1fr);gap:20px; }
    .ach-grid { grid-template-columns:repeat(3,1fr); }
    .con-cards { display:flex;flex-wrap:wrap;justify-content:center; }
    .ccard { min-width:220px; }
    .foot { padding:24px 80px; }
    .feat-features { grid-template-columns:1fr 1fr; }
  }

  /* ══════════════════════════════════════════
     WIDE  ≥ 1280px
  ══════════════════════════════════════════ */
  @media (min-width: 1280px) {
    .nav { padding:0 60px; }
    .hero { padding:130px 100px 100px; }
    .sec, .seca { padding:110px 100px; }
    .div { margin:0 100px; }
    .stats { right:100px; }
    .proj-grid { grid-template-columns:repeat(3,1fr); }
  }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const skillsData = [
  { icon:'⚛️', name:'// frontend',          tags:[{l:'react.js',t:'c'},{l:'react native',t:'c'},{l:'typescript',t:'n'},{l:'javascript es6+',t:'n'},{l:'html5',t:'n'},{l:'css3',t:'n'}] },
  { icon:'🧠', name:'// machine learning',  tags:[{l:'scikit-learn',t:'p'},{l:'xgboost',t:'p'},{l:'random forest',t:'p'},{l:'knn · svm',t:'p'},{l:'nlp',t:'p'},{l:'deep learning',t:'p'}] },
  { icon:'🐍', name:'// data & backend',    tags:[{l:'python',t:'g'},{l:'sql',t:'g'},{l:'pandas',t:'n'},{l:'numpy',t:'n'},{l:'matplotlib',t:'n'},{l:'seaborn',t:'n'}] },
  { icon:'🤖', name:'// ai & automation',   tags:[{l:'n8n workflows',t:'p'},{l:'ai agents',t:'p'},{l:'openai api',t:'c'},{l:'api integration',t:'n'},{l:'prompt engineering',t:'n'}] },
  { icon:'📊', name:'// data viz & tools',  tags:[{l:'power bi',t:'g'},{l:'excel',t:'n'},{l:'google colab',t:'n'},{l:'kaggle',t:'n'},{l:'git · github',t:'n'},{l:'vs code',t:'n'}] },
  { icon:'🌟', name:'// soft skills',       tags:[{l:'problem solving',t:'n'},{l:'team collab',t:'n'},{l:'agile',t:'n'},{l:'communication',t:'n'},{l:'prototyping',t:'n'}] },
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
  stack: ['streamlit', 'groq whisper', 'openrouter', 'llama 3.3 70b', 'plotly', 'python', 'bcrypt', 'local json'],
  demo: '#',
  github: '#',
};

const projectsData = [
  { num:'01', tag:'ml · forecasting', tc:'t-ml', title:'store sales prediction',           desc:'end-to-end retail forecasting using time-series regression. full pipeline: eda, feature engineering, outlier handling, rmse eval. ranked top 30% on kaggle — not bad fr',  stack:['python','pandas','scikit-learn','seaborn'],        demo:'#', gh:'#' },
  { num:'02', tag:'full-stack',        tc:'t-fs', title:'healthcare app — web & mobile',     desc:'responsive healthcare portal with ayurvedic home remedies + google maps api for nearby clinics. clean ui that works on every device, built in react.js',                    stack:['react.js','google maps api','css3'],                demo:'#', gh:'https://github.com/RameshKChoudhary' },
  { num:'03', tag:'automation',        tc:'t-au', title:'automated invoice processing',       desc:'n8n workflow that handles invoice extraction, validation & processing across multiple apis automatically. basically eliminated manual work entirely',                         stack:['n8n','api integration','workflow automation'],      demo:'#', gh:'#' },
  { num:'04', tag:'ml · prediction',   tc:'t-ml', title:'medical insurance cost prediction', desc:'regression model predicting annual insurance costs. full ml pipeline: eda, feature engineering, categorical encoding, scaling & model evaluation',                           stack:['python','regression','scikit-learn'],               demo:'#', gh:'#' },
  { num:'05', tag:'ml · healthcare',   tc:'t-ml', title:'breast cancer prediction (knn)',    desc:'knn classifier that detects malignant vs benign cases on real-world data. proper preprocessing, train-test split, and full model evaluation',                                stack:['python','knn','scikit-learn'],                      demo:'#', gh:'#' },
  { num:'06', tag:'ai app',            tc:'t-ai', title:'ai chatbot (openai gpt api)',       desc:"context-aware chatbot powered by openai's gpt api. responsive chat ui with smooth interactions and accurate real-time responses. actually works",                            stack:['openai api','javascript','react'],                  demo:'https://ai-chat-eight-woad.vercel.app/', gh:'https://github.com/RameshKChoudhary/ai-chat' },
];

const achData = [
  { ico:'🥇', t:'top 30% on kaggle',          s:'ranked among top performers in the retail sales prediction competition leaderboard' },
  { ico:'⭐', t:'completed with distinction',  s:'generative ai & llm applications at millionminds — highest performance rating' },
  { ico:'⚡', t:'hackathon participant',        s:'competed and built under real pressure — love the grind of hackathon mode' },
  { ico:'📊', t:'excel: beginner to expert',   s:'certified proficiency in advanced spreadsheet operations and data work' },
  { ico:'📈', t:'microsoft excel & power bi',  s:'certified in data visualization and business intelligence tooling' },
  { ico:'🎓', t:'cgpa 8.5',                    s:'b.tech aiml · st. john college of engineering & management, palghar' },
];

const ticks = ['python','react.js','machine learning','n8n automation','data science','power bi','openai api','scikit-learn','xgboost','sql','kaggle top 30%','streamlit','groq whisper'];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add('in'), i * 55); io.unobserve(e.target); }
      });
    }, { threshold: 0.07 });
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
  return <><div ref={c} className="cur" style={{display:'none'}} /><div ref={r} className="cur-rng" style={{display:'none'}} /></>;
}

function Navbar({ active, go }) {
  const [open, setOpen] = useState(false);
  const nav = ['about','skills','experience','projects','contact'];
  const tap = (id) => { go(id); setOpen(false); };
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">ramesh<span>.dev</span></div>
        <div className="nav-pill">
          {nav.map(id => <a key={id} className={active===id?'act':''} onClick={() => go(id)}>{id}</a>)}
        </div>
        <div className="nav-badge">open to work</div>
        <button className={`hbg${open?' open':''}`} onClick={() => setOpen(o=>!o)} aria-label="menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`drawer${open?' open':''}`}>
        {nav.map(id => <a key={id} className={active===id?'act':''} onClick={() => tap(id)}>{id}</a>)}
        <div className="drawer-badge">open to work</div>
      </div>
    </>
  );
}

function Hero({ go }) {
  const chipList = [
    {l:'python 🐍',on:true},{l:'react.js ⚛️',on:true},{l:'machine learning 🤖',on:true},
    {l:'n8n automation',on:false},{l:'scikit-learn',on:false},{l:'groq whisper',on:false},{l:'openai api',on:false},{l:'sql',on:false},
  ];
  return (
    <section id="home" className="hero">
      <div className="hero-grid"/>
      <div className="orb orb1"/><div className="orb orb2"/>
      <div className="hero-inner">
        <div className="hero-tag"><span className="tag-dot"/>B.tech(aiml) - Virar, Maharashtra, India - 2026</div>
        <p className="hero-hi">hey, i'm <span>ramesh</span> 👋</p>
        <h1 className="hero-name">building<br/><span className="glow">intelligent</span><br/>things.</h1>
        <p className="hero-sub">
          full-stack dev × data scientist × ai automation engineer.<br/>
          i turn <b>raw data</b> into predictions, <b>ideas</b> into apps, and <b>workflows</b> into automated machines. lowkey obsessed with ml & ai rn.
        </p>
        <div className="chips">
          {chipList.map((c,i) => <span key={i} className={`chip${c.on?' on':''}`}>{c.l}</span>)}
        </div>
        <div className="ctas">
          <button className="btn-p" onClick={() => go('projects')}>see what i built →</button>
          <button className="btn-g" onClick={() => go('contact')}>let's connect</button>
        </div>
        <div className="stats">
          {[['8.5','cgpa'],['6+','projects'],['top 30%','kaggle'],['distinction','gen ai']].map(([n,l]) => (
            <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const all = [...ticks, ...ticks];
  return (
    <div className="ticker">
      <div className="ticker-t">
        {all.map((t,i) => <span key={i} className="ti">{t}</span>)}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="sec">
      <div className="sec-lbl rv">about me</div>
      <h2 className="sec-h rv">who am i, <span>fr?</span></h2>
      <div className="about-wrap">
        <div className="about-txt rv">
          <p>i'm <b>ramesh choudhary</b> — a b.tech aiml student at st. john college of engineering & management, palghar. i build stuff that actually works: ml models, web apps, and automated workflows that save real time.</p>
          <p>been deep in the <b>data science grind</b> — preprocessing, feature engineering, model training, the whole pipeline. also lowkey love building frontend stuff in react and wiring up automation flows in n8n. basically my brain runs on python and coffee ☕</p>
          <p>currently <b>open for internships</b> in data science, full-stack, or ai automation. if you're building something cool, let's talk.</p>
        </div>
        <div className="about-cards rv">
          {[
            {ico:'🎓', t:'b.tech · ai & machine learning',   s:'st. john college of engineering & management · cgpa 8.5'},
            {ico:'📍', t:'virar, maharashtra',                s:'open to remote & on-site opportunities'},
            {ico:'⭐', t:'completed with distinction',        s:'generative ai & llm applications · millionminds'},
            {ico:'🏆', t:'top 30% on kaggle',                 s:'retail sales prediction competition leaderboard'},
          ].map((c,i) => (
            <div key={i} className="acard">
              <div className="acard-ico">{c.ico}</div>
              <div className="acard-txt"><b>{c.t}</b>{c.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="seca">
      <div className="sec-lbl rv">skills & stack</div>
      <h2 className="sec-h rv">what i <span>vibe</span> with</h2>
      <div className="sk-grid">
        {skillsData.map((s,i) => (
          <div key={i} className="skcard rv">
            <div className="sk-head">
              <div className="sk-ico">{s.icon}</div>
              <div className="sk-nm">{s.name}</div>
            </div>
            <div className="sk-tags">
              {s.tags.map((t,j) => <span key={j} className={`st s${t.t}`}>{t.l}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="sec">
      <div className="sec-lbl rv">experience</div>
      <h2 className="sec-h rv">where i've <span>been</span></h2>
      <div className="exp-list">
        {expsData.map((e,i) => (
          <div key={i} className="excard rv">
            <div className="ex-inner">
              <div>
                <div className="ex-date">{e.date}</div>
                <div className="ex-co">{e.company}</div>
                <div className="ex-role">{e.role}</div>
              </div>
              <ul className="ex-pts">
                {e.pts.map((p,j) => <li key={j}>{p}</li>)}
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
    <section id="projects" className="seca">
      <div className="sec-lbl rv">projects</div>
      <h2 className="sec-h rv">stuff i <span>shipped</span></h2>

      {/* ── FEATURED: InterviewCoach AI ── */}
      <div className="feat-banner rv">
        <div className="feat-label">featured project</div>
        <div className="feat-title">{featuredProject.title}</div>
        <div className="feat-sub">{featuredProject.sub}</div>
        <div className="feat-desc">{featuredProject.desc}</div>
        <div className="feat-features">
          {featuredProject.features.map((f,i) => (
            <div key={i} className="feat-feat"><b>{f.bold}</b>{f.text}</div>
          ))}
        </div>
        <div className="feat-stack">
          {featuredProject.stack.map((s,i) => <span key={i} className="ps">{s}</span>)}
        </div>
        <div className="feat-links">
          {featuredProject.demo !== '#' && <a href={featuredProject.demo} target="_blank" rel="noreferrer" className="p-lnk">live demo ↗</a>}
          {featuredProject.github !== '#' && <a href={featuredProject.github} target="_blank" rel="noreferrer" className="p-lnk">github ↗</a>}
        </div>
      </div>

      {/* ── OTHER PROJECTS ── */}
      <div className="proj-grid">
        {projectsData.map((p,i) => (
          <div key={i} className="pcard rv">
            <div className="p-top">
              <span className="p-num">{p.num}</span>
              <span className={`p-tag ${p.tc}`}>{p.tag}</span>
            </div>
            <h3 className="p-title">{p.title}</h3>
            <p className="p-desc">{p.desc}</p>
            <div className="p-stack">{p.stack.map((s,j) => <span key={j} className="ps">{s}</span>)}</div>
            {(p.demo !== '#' || p.gh !== '#') && (
              <div className="p-links">
                {p.demo !== '#' && <a href={p.demo} target="_blank" rel="noreferrer" className="p-lnk">live demo ↗</a>}
                {p.gh !== '#' && <a href={p.gh} target="_blank" rel="noreferrer" className="p-lnk">github ↗</a>}
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
    <section className="sec">
      <div className="sec-lbl rv">achievements</div>
      <h2 className="sec-h rv">the <span>w's</span> 🏆</h2>
      <div className="ach-grid">
        {achData.map((a,i) => (
          <div key={i} className="achcard rv">
            <div className="ach-ico">{a.ico}</div>
            <div><div className="ach-t">{a.t}</div><div className="ach-s">{a.s}</div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="seca">
      <div className="con-inner">
        <div className="sec-lbl center rv">contact</div>
        <h2 className="con-h rv">let's <span className="glow">collab</span>.</h2>
        <p className="con-sub rv">open to internships, freelance projects & collabs in data science, full-stack or ai automation. my dms are always open — i respond fast 🚀</p>
        <div className="con-cards rv">
          {[
            {ico:'✉️', lbl:'email',    val:'rameshkchoudhary10@gmail.com', href:'mailto:rameshkchoudhary10@gmail.com'},
            {ico:'📱', lbl:'phone',    val:'+91 96994 11468',              href:'tel:+919699411468'},
            {ico:'🔗', lbl:'linkedin', val:'in/ramesh-choudhary',          href:'https://www.linkedin.com/in/ramesh-choudhary-397025291/'},
            {ico:'💻', lbl:'github',   val:'RameshKChoudhary',             href:'https://github.com/RameshKChoudhary'},
          ].map((c,i) => (
            <a key={i} href={c.href} target="_blank" rel="noreferrer" className="ccard">
              <span className="cc-ico">{c.ico}</span>
              <div><span className="cc-lbl">{c.lbl}</span><span className="cc-val">{c.val}</span></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div>made with 💜 by ramesh choudhary</div>
      <div>b.tech aiml · <span>st. john college, palghar</span></div>
      <div>virar, maharashtra · 2025</div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState('home');

  // inject styles once
  useEffect(() => {
    const tag = document.createElement('style');
    tag.id = 'rc-styles';
    tag.innerHTML = styles;
    if (!document.getElementById('rc-styles')) document.head.appendChild(tag);
    return () => { const t = document.getElementById('rc-styles'); if(t) t.remove(); };
  }, []);

  // scroll spy
  useEffect(() => {
    const ids = ['home','about','skills','experience','projects','contact'];
    const onScroll = () => {
      const y = window.scrollY + 70;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useReveal();

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <>
      <Cursor />
      <Navbar active={active} go={go} />
      <Hero go={go} />
      <Ticker />
      <About />
      <div className="div" />
      <Skills />
      <div className="div" />
      <Experience />
      <div className="div" />
      <Projects />
      <div className="div" />
      <Achievements />
      <div className="div" />
      <Contact />
      <Footer />
    </>
  );
}
