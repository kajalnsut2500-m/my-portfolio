import { useEffect, useRef, useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const resumeData = {
  name: { first: "KAJAL", last: "MAURYA" },
  tagline: "// PORTFOLIO · V1.0 · 2026",
  status: "AVAILABLE · PLACEMENTS · 2026",
  bio: "B.Tech IT student at NSUT Delhi, passionate about IoT network simulation, cybersecurity, and full-stack development. Currently researching performance-aware smart home systems with OLSR routing and multi-layer security in OMNeT++. IEEE conference paper co-author. Hackathon finalist.",
  meta: [
    { label: "ROLE", value: "B.TECH IT · NSUT" },
    { label: "FOCUS", value: "IOT · SECURITY · FS WEB" },
    { label: "STATUS", value: "RESEARCHING", accent: true },
    { label: "BASE", value: "NEW DELHI, IN" },
  ],
  contact: {
    email: "kajal.maurya.ug23@nsut.ac.in",
    phone: "+91 72178 91531",
    github: "github.com/kajalnsut2500-m",
    linkedin: "www.linkedin.com/in/kajal-maurya-603114381",
    address: "Najafgarh, New Delhi – 110043",
  },
  about: {
    heading: "ENGINEER\nIN TRAINING.",
    stats: [
      { num: "1", label: "PAPERS", sub: "IEEE co-author" },
      { num: "2", label: "PROJECTS", sub: "shipped & sim." },
      { num: "3", label: "YEARS", sub: "into CS" },
    ],
    body: [
      `I'm Kajal — a third-year B.Tech IT student at NSUT Delhi. My work sits at the intersection of IoT network simulation, cybersecurity and full-stack engineering.`,
      `I co-authored an IEEE conference paper on a performance-aware, secure smart-home network simulated in OMNeT++ — modelling OLSR multi-hop routing, AES encryption, intrusion detection, and router-failover. On the web side, I build pragmatic full-stack tools — like Smart Route, a multi-mode planner that cut Google Maps API calls by 60% through Floyd-Warshall caching.`,
    ],
    highlights: ["IoT network simulation", "cybersecurity", "full-stack engineering"],
  },
  skills: [
    { icon: "</>", num: "01", title: "LANGUAGES", tags: ["Python", "C++", "JavaScript", "HTML5", "CSS3"] },
    { icon: "⊡", num: "02", title: "WEB DEV", tags: ["Flask", "React", "REST API", "Responsive UI"] },
    { icon: "▣", num: "03", title: "DATABASES", tags: ["MySQL", "SQLite"] },
    { icon: "◈", num: "04", title: "NETWORKING", tags: ["OMNeT++", "INET", "OLSR", "IEEE 802.15.4"] },
    { icon: ">_", num: "05", title: "CORE CS", tags: ["OS", "CN", "DBMS", "DSA"] },
    { icon: "⊞", num: "06", title: "TOOLS", tags: ["Git", "GitHub", "Wireshark", "Cisco PT"] },
  ],
  experience: [
    {
      role: "COMMUNITY INTERN",
      org: "FARMER, Ghaziabad",
      orgFull: "Foundation for Agricultural Resources Management and Environmental Remediation",
      date: "JUN 2024",
      location: "Ghaziabad, India",
      bullets: [
        "Completed 128-hour internship (exceeding the 80-hour requirement) at a non-profit NGO.",
        "Contributed to soil testing, organic cultivation, and bio-agent multiplication.",
        "Reared Galleria mellonella and performed in vivo multiplication of Entomopathogenic Nematodes.",
        "Conducted training programmes promoting sustainable agricultural practices.",
      ],
    },
  ],
  recognition: [
    "IEEE conference paper co-author (IoT Smart Home Network).",
    "Hackathon finalist — Road Safety Hackathon (NHAI & HOAI).",
    "Selected for CodeForge'25 (WebForge).",
  ],
  projects: [
    {
      num: "P/01",
      title: "PERFORMANCE-AWARE & SECURE IOT SMART HOME NETWORK",
      desc: "Star-topology smart-home IoT simulation with OLSR multi-hop routing, multi-layer security, and failover — co-authored as an IEEE conference paper.",
      image: "/images/project1.jpeg",
      bullets: [
        "Designed star-topology smart-home IoT network; connected sensors, actuators & a centralized gateway.",
        "Implemented OLSR routing for multi-hop communication; evaluated throughput, latency, PDR & jitter.",
        "Integrated multi-layer security: authentication, AES encryption & IDS against cyber-attacks.",
        "Built failover mechanism using secondary router, eliminating single point of failure.",
        "Co-authored IEEE paper with Versha Nishad & Chahat Yadav, NSUT Delhi.",
      ],
      tags: ["OMNET++ 6.0.2", "INET 4.5", "OLSR", "IEEE 802.15.4", "WI-FI"],
    },
    {
      num: "P/02",
      title: "SMART ROUTE — INTELLIGENT TOLL & ROUTE PLANNER",
      desc: "Full-stack route planner with three modes (shortest distance, minimum toll, fastest time), Floyd-Warshall + caching, and live Google Maps traffic.",
      image: "/images/project2.jpeg",
      bullets: [
        "Built route planner with 3 modes: shortest distance, minimum toll, and fastest time.",
        "Implemented Floyd-Warshall algorithm + caching, reducing API calls by 60%.",
        "Integrated Google Maps API for real-time traffic; achieved ~200 ms response time.",
        "Designed responsive UI/UX with animations; supported 100+ concurrent users.",
      ],
      tags: ["FLASK", "PYTHON", "SQLITE", "GOOGLE MAPS API", "JS"],
    },
  ],
  education: [
    { degree: "B.TECH, INFORMATION TECHNOLOGY", school: "NSUT Delhi (Netaji Subhas University of Technology)", period: "2023 – 2027", grade: "CGPA 6.66" },
    { degree: "CLASS XII — CBSE", school: "Rao Man Singh SSS", period: "2022", grade: "90%" },
    { degree: "CLASS X — CBSE", school: "Rao Man Singh SSS", period: "2020", grade: "89%" },
  ],
  certifications: [
    { id: "C/01", title: "ETHICAL HACKING", issuer: "UDEMY" },
    { id: "C/02", title: "DESIGN THINKING", issuer: "NPTEL" },
    { id: "C/03", title: "SOFT SKILLS", issuer: "NPTEL" },
    { id: "C/04", title: "CODEFORGE'25", issuer: "WEBFORGE" },
    { id: "C/05", title: "ROAD SAFETY HACKATHON", issuer: "NHAI & HOAI" },
  ],
  marquee: ["CYBERSECURITY", "OMNET++", "OLSR ROUTING", "IEEE AUTHOR", "HACKATHON FINALIST", "FLASK", "IOT SYSTEMS", "PYTHON", "FULL-STACK"],
};

// ── THEME — Feminine but Professional ─────────────────────────────────────────
// Same dark brutalist bones, but accent swapped from neon-yellow → dusty rose/mauve
// and a blush tint used as secondary highlight
const ACCENT = "#D4A5A5";        // dusty rose (replaces #CBFF00)
const ACCENT2 = "#C98B8B";       // deeper rose for hover states
const ACCENT_TEXT = "#0D0D0D";   // text on accent buttons
const MARQUEE_BG = "#1A1010";    // slightly warm dark for marquee strip

// ── STYLES ────────────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0D0D0D;
    --bg2: #141414;
    --bg3: #1C1C1C;
    --accent: ${ACCENT};
    --accent2: ${ACCENT2};
    --accent-text: ${ACCENT_TEXT};
    --white: #FFFFFF;
    --grey: #888888;
    --border: #2A2A2A;
    --border2: #383838;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'Space Grotesk', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent2); }

  .section-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    color: var(--grey);
    margin-bottom: 2.5rem;
  }
  .section-label .num { color: var(--accent); }
  .section-label .line { flex: 0 0 2rem; height: 1px; background: var(--border2); }

  .display-heading {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 5.5rem);
    line-height: 1.0;
    letter-spacing: 0.02em;
    white-space: pre-line;
  }

  .accent { color: var(--accent); }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-up { animation: fadeUp 0.7s ease both; }

  .tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--border2);
    color: var(--white);
    background: transparent;
    transition: border-color 0.2s, color 0.2s;
  }
  .tag:hover { border-color: var(--accent); color: var(--accent); }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    padding: 0.9rem 1.8rem;
    background: var(--accent);
    color: var(--accent-text);
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s;
    text-decoration: none;
  }
  .btn-primary:hover { background: var(--accent2); color: var(--white); }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    padding: 0.9rem 1.8rem;
    background: transparent;
    color: var(--white);
    border: 1px solid var(--border2);
    cursor: pointer;
    transition: border-color 0.2s;
    text-decoration: none;
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    padding: 0.9rem 0;
    background: transparent;
    color: var(--grey);
    border: none;
    cursor: pointer;
    transition: color 0.2s;
    text-decoration: none;
  }
  .btn-ghost:hover { color: var(--white); }
`;

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [active, setActive] = useState("about");
  const sections = ["about", "skills", "experience", "projects", "education", "certifications", "contact"];

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => { const el = document.getElementById(s); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem", height: "56px",
      background: "rgba(13,13,13,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div style={{
          width: "32px", height: "32px", border: `1px solid ${ACCENT}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontSize: "0.9rem", color: ACCENT,
        }}>KM</div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.08em" }}>KAJAL</span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: "2rem" }}>
        {sections.map((s) => (
          <a key={s} href={`#${s}`} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            letterSpacing: "0.12em", textDecoration: "none",
            color: active === s ? ACCENT : "var(--grey)",
            transition: "color 0.2s", textTransform: "uppercase",
          }}>{s.toUpperCase()}</a>
        ))}
      </div>

      {/* CTA */}
      <a href={`mailto:${resumeData.contact.email}`} className="btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.65rem" }}>
        ↓ RESUME
      </a>
    </nav>
  );
}

// ── MARQUEE ───────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...resumeData.marquee, ...resumeData.marquee];
  return (
    <div style={{
      overflow: "hidden", background: MARQUEE_BG,
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      padding: "0.75rem 0",
    }}>
      <div style={{
        display: "flex", gap: "3rem", width: "max-content",
        animation: "marquee 28s linear infinite",
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-mono)", fontSize: "0.72rem",
            letterSpacing: "0.2em", color: "var(--grey)",
            display: "flex", alignItems: "center", gap: "3rem",
          }}>
            <span style={{ color: ACCENT, fontSize: "0.5rem" }}>■</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const full = resumeData.name.last;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "7rem 2.5rem 0" }}>
      {/* Status badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "0.6rem",
        fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em",
        border: "1px solid var(--border2)", padding: "0.4rem 0.8rem",
        color: "var(--grey)", alignSelf: "flex-start", marginBottom: "2rem",
      }}>
        <span style={{ width: "6px", height: "6px", background: ACCENT, display: "inline-block" }}></span>
        {resumeData.status}
      </div>

      {/* Tag */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--grey)", letterSpacing: "0.15em", marginBottom: "1rem" }}>
        {resumeData.tagline}
      </p>

      {/* Name */}
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5rem, 14vw, 13rem)", lineHeight: 0.9, letterSpacing: "0.02em", marginBottom: "2.5rem" }}>
        {resumeData.name.first}
        <br />
        <span style={{ color: ACCENT }}>
          {typed}
          <span style={{ animation: "blink 1s step-end infinite", color: ACCENT }}>|</span>
        </span>
      </h1>

      {/* Bio + meta row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--grey)", lineHeight: 1.8, maxWidth: "520px" }}>
          {resumeData.bio}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {resumeData.meta.map((m) => (
            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--grey)" }}>{m.label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.1em", color: m.accent ? ACCENT : "var(--white)" }}>{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "2rem 0", flexWrap: "wrap" }}>
        <a href="#contact" className="btn-primary">&gt;_ GET IN TOUCH</a>
        <a href="#" className="btn-outline">↓ DOWNLOAD CV</a>
        <a href="#projects" className="btn-ghost">VIEW PROJECTS ↗</a>
      </div>

      <Marquee />
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div className="section-label">
        <span className="num">01</span>
        <span className="line"></span>
        <span>ABOUT</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <h2 className="display-heading" style={{ whiteSpace: "pre-line" }}>
            {resumeData.about.heading.split("\n").map((line, i) =>
              i === 1 ? <span key={i} style={{ color: ACCENT }}>{line}<br /></span> : <span key={i}>{line}<br /></span>
            )}
          </h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--grey)", marginTop: "1rem" }}>
            CURRENTLY · YEAR 3 OF 4
          </p>
        </div>
        <div>
          {resumeData.about.body.map((para, i) => (
            <p key={i} style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: i === 0 ? "var(--white)" : "var(--grey)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
              {i === 0 ? (
                para.split(/(IoT network simulation|cybersecurity|full-stack engineering)/).map((part, j) =>
                  ["IoT network simulation", "cybersecurity", "full-stack engineering"].includes(part)
                    ? <span key={j} style={{ color: ACCENT }}>{part}</span>
                    : part
                )
              ) : para}
            </p>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", display: "flex", gap: "3rem" }}>
            {resumeData.about.stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", color: "var(--white)", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--grey)", marginTop: "0.3rem" }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: ACCENT, marginTop: "0.2rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="skills" style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div className="section-label">
        <span className="num">02</span>
        <span className="line"></span>
        <span>STACK</span>
      </div>
      <h2 className="display-heading" style={{ marginBottom: "0.75rem" }}>TOOLS OF THE TRADE.</h2>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--grey)", marginBottom: "3.5rem", maxWidth: "560px" }}>
        What I reach for when shipping research simulations, web tools, and everything between.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
        {resumeData.skills.map((sk) => (
          <div key={sk.num} style={{
            padding: "2rem", borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
            transition: "background 0.2s, box-shadow 0.2s", cursor: "pointer",
            boxShadow: selected === sk.num ? `inset 0 0 0 1px ${ACCENT}` : "none",
            background: selected === sk.num ? "var(--bg2)" : "transparent",
          }}
            onClick={() => setSelected(selected === sk.num ? null : sk.num)}
            onMouseEnter={e => { if (selected !== sk.num) e.currentTarget.style.background = "var(--bg2)"; }}
            onMouseLeave={e => { if (selected !== sk.num) e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: ACCENT, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>{sk.icon}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--grey)", letterSpacing: "0.1em" }}>{sk.num}</span>
              </div>
              <span style={{ color: "var(--grey)", fontSize: "0.7rem" }}>↗</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.06em", marginBottom: "1rem" }}>{sk.title}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {sk.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div className="section-label">
        <span className="num">03</span>
        <span className="line"></span>
        <span>EXPERIENCE</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
        <h2 className="display-heading">WHERE I'VE<br /><span style={{ color: ACCENT }}>WORKED.</span></h2>
        <div>
          {resumeData.experience.map((exp) => (
            <div key={exp.role} style={{ borderLeft: `2px solid ${ACCENT}`, paddingLeft: "2rem", marginBottom: "3rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ width: "8px", height: "8px", background: ACCENT, display: "inline-block", flexShrink: 0 }}></span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", letterSpacing: "0.06em" }}>{exp.role}</h3>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: ACCENT, letterSpacing: "0.15em" }}>{exp.date}</span>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--grey)", marginBottom: "0.25rem" }}>
                {exp.org} · {exp.location}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--grey)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                {exp.orgFull}
              </p>
              {exp.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ color: ACCENT, fontFamily: "var(--font-mono)", fontSize: "0.8rem", flexShrink: 0 }}>—</span>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--grey)", lineHeight: 1.7 }}>{b}</p>
                </div>
              ))}
            </div>
          ))}
          {/* Recognition box */}
          <div style={{ border: "1px solid var(--border2)", padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ color: ACCENT }}>◈</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: ACCENT }}>RECOGNITION</span>
            </div>
            {resumeData.recognition.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--grey)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>—</span>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--grey)" }}>{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────────────────────
function Projects() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="projects" style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div className="section-label">
        <span className="num">04</span>
        <span className="line"></span>
        <span>PROJECTS</span>
      </div>
      <h2 className="display-heading" style={{ marginBottom: "3.5rem" }}>
        PROJECTS, PAPERS<br /><span style={{ color: ACCENT }}>&amp; PLAYGROUNDS.</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
        {resumeData.projects.map((p) => (
          <div key={p.num} style={{
            border: `1px solid ${selected === p.num ? ACCENT : "var(--border)"}`,
            transition: "border-color 0.25s", cursor: "pointer",
            boxShadow: selected === p.num ? `0 0 0 1px ${ACCENT}` : "none",
          }}
            onClick={() => setSelected(selected === p.num ? null : p.num)}
            onMouseEnter={e => { if (selected !== p.num) e.currentTarget.style.borderColor = ACCENT; }}
            onMouseLeave={e => { if (selected !== p.num) e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ position: "relative", overflow: "hidden", height: "280px" }}>
              <span style={{
                position: "absolute", top: "1rem", left: "1rem", zIndex: 2,
                fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em",
                background: ACCENT, color: ACCENT_TEXT, padding: "0.3rem 0.7rem",
              }}>{p.num}</span>
              <img src={p.image} alt={p.title} style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "none", transition: "filter 0.4s",
                display: "block",
              }}
                onMouseEnter={e => e.target.style.filter = "none"}
                onMouseLeave={e => e.target.style.filter = "none"}
              />
            </div>
            <div style={{ padding: "1.75rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", letterSpacing: "0.04em", marginBottom: "0.75rem", lineHeight: 1.15 }}>{p.title}</h3>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--grey)", marginBottom: "1.25rem", lineHeight: 1.75 }}>{p.desc}</p>
              {p.bullets.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.5rem" }}>
                  <span style={{ color: ACCENT, fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0 }}>—</span>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--grey)", lineHeight: 1.65 }}>{b}</p>
                </div>
              ))}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1.5rem" }}>
                {p.tags.map((t) => (
                  <span key={t} className="tag" style={{ fontSize: "0.6rem" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── EDUCATION ─────────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div className="section-label">
        <span className="num">05</span>
        <span className="line"></span>
        <span>EDUCATION</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <h2 className="display-heading">SCHOOLING<br /><span style={{ color: ACCENT }}>&amp; STUDY.</span></h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--grey)", marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ color: ACCENT }}>◈</span> CURRENTLY · YEAR 3 OF 4
          </p>
        </div>
        <div>
          {resumeData.education.map((ed, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto",
              gap: "1rem", alignItems: "baseline",
              padding: "1.5rem 0", borderBottom: "1px solid var(--border)",
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", letterSpacing: "0.04em" }}>{ed.degree}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--grey)", marginTop: "0.25rem" }}>{ed.school}</div>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--grey)", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>{ed.period}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: ACCENT, fontWeight: 500, whiteSpace: "nowrap" }}>{ed.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CERTIFICATIONS ────────────────────────────────────────────────────────────
function Certifications() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="certifications" style={{ padding: "7rem 2.5rem", borderBottom: "1px solid var(--border)" }}>
      <div className="section-label">
        <span className="num">06</span>
        <span className="line"></span>
        <span>CREDENTIALS</span>
      </div>
      <h2 className="display-heading" style={{ marginBottom: "3.5rem" }}>CERTIFICATIONS.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
        {resumeData.certifications.map((c) => (
          <div key={c.id} style={{
            borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
            padding: "2rem", transition: "background 0.2s, box-shadow 0.2s", cursor: "pointer",
            boxShadow: selected === c.id ? `inset 0 0 0 1px ${ACCENT}` : "none",
            background: selected === c.id ? "var(--bg2)" : "transparent",
          }}
            onClick={() => setSelected(selected === c.id ? null : c.id)}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg2)"; e.currentTarget.querySelector(".cert-icon").style.color = ACCENT; }}
            onMouseLeave={e => { if (selected !== c.id) e.currentTarget.style.background = "transparent"; e.currentTarget.querySelector(".cert-icon").style.color = selected === c.id ? ACCENT : "var(--grey)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--grey)", letterSpacing: "0.1em" }}>{c.id}</span>
              <span className="cert-icon" style={{ color: "var(--grey)", fontSize: "1rem", transition: "color 0.2s" }}>◈</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", letterSpacing: "0.04em", marginBottom: "0.5rem" }}>{c.title}</h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--grey)", letterSpacing: "0.1em" }}>— {c.issuer}</p>
          </div>
        ))}
        {/* Empty cell to fill grid */}
        <div style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}></div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const { email, phone, github, linkedin, address } = resumeData.contact;
  const links = [
    { label: "EMAIL", value: email, href: `mailto:${email}` },
    { label: "PHONE", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { label: "LINKEDIN", value: linkedin, href: `https://${linkedin}` },
    { label: "GITHUB", value: github, href: `https://${github}` },
  ];

  return (
    <section id="contact" style={{ padding: "7rem 2.5rem 4rem" }}>
      <div className="section-label">
        <span className="num">07</span>
        <span className="line"></span>
        <span>CONTACT</span>
      </div>
      <h2 className="display-heading" style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)", marginBottom: "1rem", lineHeight: 0.95 }}>
        LET'S<br /><span style={{ color: ACCENT }}>BUILD.</span>
      </h2>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--grey)", maxWidth: "500px", lineHeight: 1.8, marginBottom: "3.5rem" }}>
        Open to internships, research collabs, and side-projects in IoT systems, network security, or full-stack web. The fastest way to reach me is email.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", border: "1px solid var(--border)" }}>
        {links.map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1.75rem 2rem", borderBottom: "1px solid var(--border)",
              borderRight: "1px solid var(--border)", textDecoration: "none",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--bg2)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            onMouseDown={e => e.currentTarget.style.boxShadow = `inset 0 0 0 1px ${ACCENT}`}
            onMouseUp={e => e.currentTarget.style.boxShadow = "none"}
          >
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--grey)", marginBottom: "0.4rem" }}>{l.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--white)" }}>{l.value}</div>
            </div>
            <span style={{ color: ACCENT, fontSize: "1rem" }}>↗</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
        <a href="#" className="btn-primary">↓ DOWNLOAD RESUME (PDF)</a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--grey)", letterSpacing: "0.1em" }}>
          <span style={{ fontSize: "0.5rem" }}>◈</span> {address.toUpperCase()}
        </div>
      </div>
    </section>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Resume() {
  return (
    <>
      <style>{globalCSS}</style>
      <Nav />
      <main style={{ paddingTop: "56px" }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}