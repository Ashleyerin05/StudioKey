import { useState, useEffect, useRef } from "react";
import {
  Users, Star, Calendar, Zap, BarChart3, MessageSquare,
  CheckCircle, Target, DollarSign, Award, ArrowUpRight,
  TrendingUp, Search, Layers, ChevronDown, ArrowDown,
  ClipboardList, GitMerge, Lightbulb, PieChart, Activity
} from "lucide-react";

// ── Google Fonts ──
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #F7F4EF; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bobble {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(7px); }
    }
    .bobble { animation: bobble 2.2s ease-in-out infinite; }
  `}</style>
);

// ── Design tokens ──
const T = {
  forest:     "#1B2D1F",
  forestMid:  "#2E4A32",
  sage:       "#4A7C59",
  sagePale:   "#C8DBC0",
  mint:       "#E8F2E9",
  ivory:      "#F7F4EF",
  parchment:  "#EDE8DF",
  warm:       "#E0D8CC",
  stone:      "#B5AFA6",
  muted:      "#8C8880",
  ink:        "#1A1714",
  clay:       "#C17A4A",
  serif:      "'Instrument Serif', Georgia, serif",
  sans:       "'DM Sans', sans-serif",
  mono:       "'DM Mono', monospace",
};

// ── Fade-in on scroll ──
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Eyebrow label ──
const Eyebrow = ({ children, light = false }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: T.mono, fontSize: 11, fontWeight: 500,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: light ? T.sagePale : T.sage,
    marginBottom: 18,
  }}>
    <span style={{ width: 24, height: 1.5, background: light ? T.sagePale : T.sage, display: "inline-block" }} />
    {children}
  </div>
);

// ── Section wrapper ──
const Section = ({ children, bg = T.ivory, style = {} }) => (
  <section style={{ background: bg, padding: "96px 24px", ...style }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
  </section>
);

// ── PM skill badge ──
const SkillBadge = ({ label }) => (
  <span style={{
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: 4,
    background: T.mint,
    color: T.forestMid,
    fontFamily: T.mono,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.06em",
    border: `1px solid ${T.sagePale}`,
  }}>{label}</span>
);

// ── Metric card ──
const MetricCard = ({ value, label, sub, accent = T.sage }) => (
  <div style={{
    background: "#fff",
    borderRadius: 12,
    padding: "24px 20px",
    border: `1px solid ${T.warm}`,
    display: "flex", flexDirection: "column", gap: 4,
  }}>
    <div style={{ fontFamily: T.serif, fontSize: 36, color: T.ink, lineHeight: 1 }}>{value}</div>
    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink }}>{label}</div>
    {sub && <div style={{ fontFamily: T.mono, fontSize: 11, color: accent }}>{sub}</div>}
  </div>
);

// ── Clean browser mockup ──
// Instead of a phone frame, a flat browser chrome with real-looking UI inside
const BrowserMock = ({ title, role, accentColor = T.sage, children }) => (
  <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${T.warm}`, background: "#fff" }}>
    {/* Chrome bar */}
    <div style={{
      background: T.parchment,
      padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 10,
      borderBottom: `1px solid ${T.warm}`,
    }}>
      <div style={{ display: "flex", gap: 5 }}>
        {["#F28B82","#FDD663","#81C995"].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <div style={{
        flex: 1, background: "#fff", borderRadius: 5, padding: "4px 10px",
        fontFamily: T.mono, fontSize: 10, color: T.stone,
        border: `1px solid ${T.warm}`,
      }}>
        studioos.app/{role.toLowerCase()}
      </div>
      <div style={{
        padding: "3px 9px", borderRadius: 4,
        background: accentColor, color: "#fff",
        fontFamily: T.mono, fontSize: 9, fontWeight: 500,
      }}>{role}</div>
    </div>
    {/* Screen content */}
    <div style={{ padding: 20 }}>{children}</div>
  </div>
);

// ── Mini nav for inside mockups ──
const MockNav = ({ title, icon: Icon, accentColor }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 18,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 7,
        background: accentColor + "20",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={14} color={accentColor} />
      </div>
      <span style={{ fontFamily: T.serif, fontSize: 15, color: T.ink }}>{title}</span>
    </div>
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      background: accentColor,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: T.mono, fontSize: 9, fontWeight: 500, color: "#fff",
    }}>AS</div>
  </div>
);

// ── Stat row for inside mockups ──
const MockStatRow = ({ stats, accentColor }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 8, marginBottom: 16 }}>
    {stats.map((s, i) => (
      <div key={i} style={{
        background: T.ivory, borderRadius: 8, padding: "10px 12px",
        border: `1px solid ${T.warm}`,
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 9, color: T.muted, marginBottom: 4 }}>{s.label}</div>
        <div style={{ fontFamily: T.serif, fontSize: 20, color: T.ink, lineHeight: 1 }}>{s.val}</div>
        {s.trend && <div style={{ fontFamily: T.mono, fontSize: 9, color: accentColor, marginTop: 3 }}>{s.trend}</div>}
      </div>
    ))}
  </div>
);

// ── Mock class row ──
const MockClassRow = ({ name, time, instructor, spots, tag, tagColor }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "9px 12px", borderRadius: 8,
    background: T.ivory, border: `1px solid ${T.warm}`,
    marginBottom: 6,
  }}>
    <div style={{
      padding: "2px 8px", borderRadius: 3,
      background: tagColor + "18", color: tagColor,
      fontFamily: T.mono, fontSize: 9, fontWeight: 500,
      flexShrink: 0,
    }}>{tag}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.ink }}>{name}</div>
      <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>{time} · {instructor}</div>
    </div>
    <div style={{
      fontFamily: T.mono, fontSize: 10, fontWeight: 500,
      color: spots === "Full" ? "#C45B4A" : T.sage,
    }}>{spots}</div>
  </div>
);

// ── AI insight chip for mockups ──
const MockAIInsight = ({ text }) => (
  <div style={{
    background: T.mint, borderRadius: 8, padding: "10px 12px",
    border: `1px solid ${T.sagePale}`,
    display: "flex", gap: 8, alignItems: "flex-start",
    marginTop: 12,
  }}>
    <Zap size={12} color={T.sage} style={{ marginTop: 1, flexShrink: 0 }} />
    <div>
      <div style={{ fontFamily: T.mono, fontSize: 9, color: T.sage, fontWeight: 500, marginBottom: 3 }}>AI INSIGHT</div>
      <div style={{ fontFamily: T.sans, fontSize: 11, color: T.forestMid, lineHeight: 1.5 }}>{text}</div>
    </div>
  </div>
);

// ── Feedback bar ──
const FeedbackBar = ({ tag, pct, color }) => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
      <span style={{ fontFamily: T.sans, fontSize: 11, color: T.ink }}>{tag}</span>
      <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>{pct}%</span>
    </div>
    <div style={{ height: 5, borderRadius: 3, background: T.warm }}>
      <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: color }} />
    </div>
  </div>
);

// ════════════════════════════════════
export default function StudioKeyCaseStudy() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ fontFamily: T.sans, color: T.ink, background: T.ivory }}>
      <FontLink />

      {/* ── HERO ── */}
      <div style={{ background: T.forest, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 72px", position: "relative", overflow: "hidden" }}>
        {/* Texture grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${T.forestMid}18 1px, transparent 1px), linear-gradient(90deg, ${T.forestMid}18 1px, transparent 1px)`, backgroundSize: "72px 72px", pointerEvents: "none" }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: "30%", right: "20%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${T.sage}20 0%, transparent 65%)`, pointerEvents: "none" }} />

        {/* Nav */}
        <div style={{ position: "absolute", top: 40, left: 48, right: 48, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: T.mono, fontSize: 12, color: T.sagePale, letterSpacing: "0.14em" }}>ASHLEY ERIN HOLNESS</span>
          <div style={{ display: "flex", gap: 32 }}>
            {["Research","Design","Strategy"].map(l => (
              <span key={l} style={{ fontFamily: T.mono, fontSize: 11, color: T.stone, letterSpacing: "0.1em" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1100, position: "relative", zIndex: 1 }}>
          <div style={{ animation: "fadeUp 0.8s ease 0.1s both" }}>
            <Eyebrow light>Product Case Study · 2026</Eyebrow>
          </div>
          <div style={{ animation: "fadeUp 0.8s ease 0.25s both" }}>
            <h1 style={{ fontFamily: T.serif, fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, color: "#fff", lineHeight: 1.05, letterSpacing: "-1px", margin: "0 0 28px" }}>
              Studio<em style={{ color: T.sagePale }}>Key</em>
            </h1>
          </div>
          <div style={{ animation: "fadeUp 0.8s ease 0.4s both" }}>
            <p style={{ fontFamily: T.sans, fontSize: 18, color: T.stone, lineHeight: 1.65, maxWidth: 580, margin: "0 0 48px", fontWeight: 300 }}>
              End-to-end product strategy for a boutique fitness studio platform — from user research to a validated business model, designed to displace incumbent platforms for small NYC studios.
            </p>
          </div>

          {/* TL;DR pills — skimmable for recruiters */}
          <div style={{ animation: "fadeUp 0.8s ease 0.55s both" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 56 }}>
              {[
                { icon: Search, label: "17 user interviews" },
                { icon: BarChart3, label: "4-competitor analysis" },
                { icon: Layers, label: "RICE prioritisation" },
                { icon: Target, label: "6 success KPIs defined" },
                { icon: DollarSign, label: "$29–$99 pricing model" },
                { icon: Zap, label: "Claude API integration" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "8px 14px", borderRadius: 6,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: T.mono, fontSize: 11, color: T.sagePale,
                  letterSpacing: "0.04em",
                }}>
                  <Icon size={12} color={T.sage} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Meta row */}
          <div style={{ animation: "fadeUp 0.8s ease 0.65s both" }}>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                ["Role", "Product Strategy & Design"],
                ["Timeline", "3 Weeks"],
                ["Market", "NYC Boutique Studios"],
                ["Stack", "Next.js · Supabase · Claude API"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.stone, letterSpacing: "0.12em", marginBottom: 5 }}>{k.toUpperCase()}</div>
                  <div style={{ fontFamily: T.sans, fontSize: 14, color: "#fff", fontWeight: 400 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll nudge */}
        <div className="bobble" style={{ position: "absolute", bottom: 32, right: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <span style={{ fontFamily: T.mono, fontSize: 9, color: T.stone, letterSpacing: "0.15em" }}>SCROLL</span>
          <ArrowDown size={14} color={T.stone} />
        </div>
      </div>

      {/* ── SKILLS DEMONSTRATED — recruiter scannable ── */}
      <Section bg={T.parchment} style={{ padding: "56px 24px" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.sage, letterSpacing: "0.12em", paddingTop: 6, flexShrink: 0 }}>SKILLS DEMONSTRATED</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["User Research","Competitive Analysis","RICE Prioritisation","KPI Definition","Stakeholder Mapping","Business Model Design","AI Feature Scoping","Go-to-Market Strategy","Data-Driven Decision Making","Cross-Functional Thinking","Process Documentation","Unit Economics"].map(s => (
                <SkillBadge key={s} label={s} />
              ))}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ── THE PROBLEM ── */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <Eyebrow>The Problem</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "0 0 20px" }}>
              Existing platforms charge enterprise prices for boutique problems
            </h2>
            <p style={{ color: T.muted, lineHeight: 1.8, margin: "0 0 16px" }}>
              I spent two years teaching yoga at a studio running on a leading fitness management platform. I watched the owner pay escalating prices for software that actively sent clients to competing studios through its marketplace.
            </p>
            <p style={{ color: T.muted, lineHeight: 1.8, margin: "0 0 28px" }}>
              As an instructor, I had zero visibility into how my classes were performing. No past attendance data, no feedback, no earnings transparency. The tools existed, but they were just locked behind a product built for chains, not for the 2–8 instructor studio.
            </p>
            <div style={{ padding: "18px 20px", borderRadius: 10, borderLeft: `3px solid ${T.sage}`, background: T.mint }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.sage, marginBottom: 6 }}>PROBLEM STATEMENT</div>
              <p style={{ fontFamily: T.serif, fontSize: 16, color: T.forestMid, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                "How can we give boutique fitness studios enterprise-grade management tools at a price that doesn't assume enterprise-scale revenue?"
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: DollarSign, title: "Pricing mismatch", body: "Leading platforms start at $99/mo and scale to $349+ with add-ons. A 3-instructor yoga studio generating $8k/month can't justify $4k/year for software." },
                { icon: Users, title: "Instructor invisibility", body: "Instructors are the product. Students come back for them. Yet existing platforms give instructors no performance data, no feedback access, no earnings visibility." },
                { icon: BarChart3, title: "Feedback goes nowhere", body: "Student reviews scatter across Google, Instagram DMs, and word-of-mouth. Owners can't synthesise patterns. Instructors can't improve from data they never see." },
                { icon: Target, title: "Marketplace cannibalisation", body: "Several platforms' own apps direct your members to competing studios. You're paying to advertise your competition." },
                { icon: Zap, title: "No meaningful AI", body: "AI in existing platforms is surface-level. No insight generation, no coaching loops, no proactive automation that actually saves admin time." },
              ].map(({ icon: Icon, title, body }, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "16px 18px", borderRadius: 10, background: "#fff", border: `1px solid ${T.warm}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: T.mint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color={T.sage} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: T.ink, marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── RESEARCH ── */}
      <Section bg={T.forest} style={{ padding: "96px 24px" }}>
        <FadeIn>
          <Eyebrow light>Research & Discovery</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start", marginBottom: 56 }}>
            <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, color: "#fff", lineHeight: 1.2 }}>
              17 conversations before writing a single line of code
            </h2>
            <p style={{ color: T.stone, lineHeight: 1.8, fontWeight: 300, paddingTop: 8 }}>
              I ran structured interviews across three user groups before defining any feature. The goal was to separate real pain from assumed pain, and to understand the decision-making process of a studio owner evaluating new software.
            </p>
          </div>
        </FadeIn>

        {/* Research stats */}
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 48 }}>
            {[
              { n: "12", label: "Instructor interviews", note: "Across yoga, pilates, HIIT, barre" },
              { n: "5", label: "Studio owner interviews", note: "1–12 instructor studios, NYC" },
              { n: "30+", label: "Student survey responses", note: "Via Typeform, screened for boutique gym attendance" },
              { n: "4", label: "Competitor audits", note: "Leading studio management platforms across pricing, features, and reviews" },
            ].map(({ n, label, note }, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "24px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontFamily: T.serif, fontSize: 48, color: T.sagePale, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: "#fff", margin: "8px 0 4px" }}>{label}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.stone }}>{note}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Key findings */}
        <FadeIn delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { icon: Users, finding: "Instructors are the retention lever", detail: "11 of 12 instructors said they had students follow them when they changed studios. Instructor satisfaction directly predicts member retention." },
              { icon: Star, finding: "Feedback loops are broken everywhere", detail: "0 of 5 studio owners had a structured system for acting on student feedback. It was all gut feel and scattered DMs." },
              { icon: Calendar, finding: "Booking friction is a real drop-off point", detail: "Students reported abandoning booking flows 'sometimes' or 'often' in existing platforms — primarily due to marketplace redirects and slow load times." },
            ].map(({ icon: Icon, finding, detail }, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: `${T.sage}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={17} color={T.sagePale} />
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 500, color: "#fff", marginBottom: 8 }}>{finding}</div>
                <div style={{ fontFamily: T.sans, fontSize: 13, color: T.stone, lineHeight: 1.65 }}>{detail}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ── COMPETITIVE ANALYSIS ── */}
      <Section>
        <FadeIn>
          <Eyebrow>Competitive Analysis</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "0 0 10px" }}>Where every competitor falls short</h2>
          <p style={{ color: T.muted, lineHeight: 1.8, maxWidth: 540, margin: "0 0 40px" }}>Audited four platforms across 8 dimensions. The gap in instructor-side tooling and AI was consistent across all of them.</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.sans, fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${T.warm}` }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", fontFamily: T.mono, fontSize: 10, color: T.muted, letterSpacing: "0.1em", fontWeight: 500 }}>CAPABILITY</th>
                  {["Competitor A","Competitor B","Competitor C","StudioKey"].map((h, i) => (
                    <th key={h} style={{ textAlign: "center", padding: "10px 14px", fontFamily: T.mono, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: i === 3 ? T.sage : T.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Class scheduling & booking",       "✓","✓","✓","✓"],
                  ["Waitlist management",               "✓","✓","Partial","✓"],
                  ["Instructor performance dashboard",  "Partial","✗","✗","✓"],
                  ["Instructor sees own feedback",      "✗","✗","✗","✓"],
                  ["AI-generated insights",             "Basic","✗","✗","✓"],
                  ["Marketing email automation",        "✓","✓","✓","✓"],
                  ["No marketplace cannibalisation",    "✗","✓","✓","✓"],
                  ["Transparent flat pricing",          "✗","Partial","✓","✓"],
                  ["Sub request system",                "Poor","✗","✗","✓"],
                  ["Starting price / month",            "$99","$110","$30","$29"],
                ].map(([cap, ...vals], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : T.ivory, borderBottom: `1px solid ${T.warm}` }}>
                    <td style={{ padding: "11px 14px", fontWeight: 500, color: T.ink }}>{cap}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{
                        textAlign: "center", padding: "11px 14px",
                        color: v === "✓" ? T.sage : v === "✗" ? "#C45B4A" : j === 3 ? T.sage : T.muted,
                        fontWeight: j === 3 ? 500 : 400,
                        background: j === 3 ? T.mint : undefined,
                      }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </Section>

      {/* ── PRIORITISATION ── */}
      <Section bg={T.parchment}>
        <FadeIn>
          <Eyebrow>Prioritisation</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "0 0 10px" }}>RICE scoring: what ships first</h2>
          <p style={{ color: T.muted, lineHeight: 1.8, maxWidth: 560, margin: "0 0 40px" }}>Used RICE framework (Reach · Impact · Confidence · Effort) to rank features and justify Phase 1 scope to a hypothetical engineering team.</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ overflowX: "auto", marginBottom: 24 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.sans, fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${T.warm}` }}>
                  {["Feature","Reach","Impact","Confidence","Effort","RICE Score","Phase"].map(h => (
                    <th key={h} style={{ textAlign: h === "Feature" ? "left" : "center", padding: "10px 12px", fontFamily: T.mono, fontSize: 9, color: T.muted, letterSpacing: "0.1em", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Class schedule & booking",     "10","3","100%","2","150","1"],
                  ["Instructor schedule view",      "8","3","100%","1","240","1"],
                  ["Waitlist auto-promotion",       "8","3","90%","1.5","144","1"],
                  ["Post-class feedback form",      "9","3","90%","2","121","1"],
                  ["AI feedback summariser",        "7","3","80%","3","56","2"],
                  ["Inactive user email campaign",  "6","2","80%","2","48","2"],
                  ["Sub request system",            "5","3","80%","1.5","80","2"],
                  ["Stripe class pack payments",    "9","3","90%","3","81","2"],
                  ["Marketing email builder",       "6","2","70%","4","21","3"],
                  ["AI smart notification timing",  "8","2","50%","4","20","3"],
                ].map((row, i) => {
                  const phase = row[6];
                  const phaseColor = phase === "1" ? T.sage : phase === "2" ? T.clay : T.stone;
                  return (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : T.ivory, borderBottom: `1px solid ${T.warm}` }}>
                      <td style={{ padding: "10px 12px", fontWeight: 500, color: T.ink }}>{row[0]}</td>
                      {row.slice(1, 6).map((v, j) => (
                        <td key={j} style={{ textAlign: "center", padding: "10px 12px", color: j === 4 ? T.sage : T.muted, fontWeight: j === 4 ? 600 : 400 }}>{v}</td>
                      ))}
                      <td style={{ textAlign: "center", padding: "10px 12px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 3, background: phaseColor + "18", color: phaseColor, fontFamily: T.mono, fontSize: 10, fontWeight: 500 }}>Phase {phase}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.stone }}>RICE Score = (Reach × Impact × Confidence) / Effort. Reach = % of users affected (out of 10). Impact = 1–3. Effort = person-weeks.</div>
        </FadeIn>
      </Section>

      {/* ── PRODUCT SCREENS ── */}
      <Section>
        <FadeIn>
          <Eyebrow>The Product</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "0 0 10px" }}>Three portals, three distinct jobs-to-be-done</h2>
          <p style={{ color: T.muted, lineHeight: 1.8, maxWidth: 560, margin: "0 0 44px" }}>Each dashboard was designed around the user's primary daily task — not a feature list.</p>
        </FadeIn>

        {/* Tab selector */}
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 0, marginBottom: 28, border: `1px solid ${T.warm}`, borderRadius: 10, overflow: "hidden", width: "fit-content", background: "#fff" }}>
            {[
              { label: "Customer Portal", icon: Calendar },
              { label: "Manager Dashboard", icon: BarChart3 },
              { label: "Instructor View", icon: Award },
            ].map(({ label, icon: Icon }, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "11px 20px",
                background: activeTab === i ? T.forest : "transparent",
                color: activeTab === i ? "#fff" : T.muted,
                border: "none", cursor: "pointer",
                fontFamily: T.mono, fontSize: 11, fontWeight: 500,
                letterSpacing: "0.05em",
                borderRight: i < 2 ? `1px solid ${T.warm}` : "none",
                transition: "all 0.2s",
              }}>
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Customer Portal */}
        {activeTab === 0 && (
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <BrowserMock title="Class Schedule" role="Customer" accentColor={T.sage}>
                <MockNav title="StudioKey" icon={Calendar} accentColor={T.sage} />
                {/* Filter chips */}
                <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                  {["All classes","Yoga","Pilates","HIIT","Barre"].map((f, i) => (
                    <div key={f} style={{
                      padding: "5px 12px", borderRadius: 14,
                      background: i === 0 ? T.forest : T.ivory,
                      color: i === 0 ? "#fff" : T.muted,
                      fontFamily: T.mono, fontSize: 10, fontWeight: 500,
                      border: i === 0 ? "none" : `1px solid ${T.warm}`,
                    }}>{f}</div>
                  ))}
                </div>
                <MockClassRow name="Vinyasa Flow" time="7:00 AM" instructor="Maya Chen" spots="2 left" tag="Yoga" tagColor={T.sage} />
                <MockClassRow name="Power Pilates" time="9:00 AM" instructor="Jordan Ellis" spots="Full" tag="Pilates" tagColor={T.clay} />
                <MockClassRow name="HIIT Burn" time="12:00 PM" instructor="Sam Rivera" spots="4 left" tag="HIIT" tagColor="#C45B4A" />
                <MockClassRow name="Yin Yoga" time="5:30 PM" instructor="Priya Patel" spots="6 left" tag="Yoga" tagColor={T.sage} />
              </BrowserMock>

              <BrowserMock title="My Bookings" role="Customer" accentColor={T.sage}>
                <MockNav title="My Bookings" icon={CheckCircle} accentColor={T.sage} />
                <MockStatRow accentColor={T.sage} stats={[
                  { label: "Booked", val: "3", trend: "this week" },
                  { label: "Attended", val: "18", trend: "this month" },
                  { label: "Credits", val: "4", trend: "remaining" },
                ]} />
                {/* Upcoming */}
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, marginBottom: 8 }}>UPCOMING</div>
                {[
                  { name: "Vinyasa Flow", when: "Tomorrow, 7:00 AM", instructor: "Maya Chen" },
                  { name: "Power Pilates", when: "Thu, 9:00 AM", instructor: "Jordan Ellis" },
                  { name: "HIIT Burn", when: "Sat, 12:00 PM", instructor: "Sam Rivera" },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 8, background: T.ivory, border: `1px solid ${T.warm}`, marginBottom: 6 }}>
                    <div>
                      <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink }}>{b.name}</div>
                      <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>{b.when} · {b.instructor}</div>
                    </div>
                    <div style={{ fontFamily: T.mono, fontSize: 10, color: "#C45B4A", cursor: "pointer" }}>Cancel</div>
                  </div>
                ))}
                <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 8, background: T.mint, border: `1px solid ${T.sagePale}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontFamily: T.mono, fontSize: 9, color: T.sage }}>WAITLIST — Position #1</div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink }}>Yin Yoga · Wed 6:00 PM</div>
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.sage }}>Watching</div>
                </div>
              </BrowserMock>
            </div>

            <div style={{ marginTop: 20, padding: "20px 24px", borderRadius: 10, background: T.mint, border: `1px solid ${T.sagePale}`, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.sage, marginTop: 2, flexShrink: 0 }}>DESIGN DECISION</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.forestMid, lineHeight: 1.65, margin: 0 }}>
                Booking completion required under 3 taps from schedule view. Waitlist position is shown proactively — users don't have to hunt for it. Cancellation is one tap with a 2-hour policy clearly shown at the point of booking (not in a terms page nobody reads).
              </p>
            </div>
          </FadeIn>
        )}

        {/* Manager Dashboard */}
        {activeTab === 1 && (
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <BrowserMock title="Studio Dashboard" role="Manager" accentColor={T.clay}>
                <MockNav title="Studio Dashboard" icon={BarChart3} accentColor={T.clay} />
                <MockStatRow accentColor={T.clay} stats={[
                  { label: "Members", val: "247", trend: "↑ 12% MoM" },
                  { label: "Fill rate", val: "91%", trend: "↑ 3pts" },
                  { label: "Revenue", val: "$8.4k", trend: "↑ 18% MoM" },
                  { label: "Avg rating", val: "4.8", trend: "↑ 0.2" },
                ]} />
                <MockAIInsight text="Yoga classes trending +12% over 4 weeks. Tuesday 7am is at 98% fill rate — consider adding a second morning session." />
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, margin: "14px 0 8px" }}>AT-RISK MEMBERS</div>
                <div style={{ padding: "10px 12px", borderRadius: 8, background: "#FEF3F0", border: "1px solid #FECDC6" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 500, color: T.ink, marginBottom: 3 }}>14 members inactive for 30+ days</div>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: "#C45B4A" }}>→ Send re-engagement campaign</div>
                </div>
              </BrowserMock>

              <BrowserMock title="Instructor Leaderboard" role="Manager" accentColor={T.clay}>
                <MockNav title="Instructor Performance" icon={Activity} accentColor={T.clay} />
                <div style={{ fontFamily: T.mono, fontSize: 9, color: T.muted, marginBottom: 8, display: "grid", gridTemplateColumns: "1fr 60px 60px 60px", gap: 4 }}>
                  <span>INSTRUCTOR</span><span style={{ textAlign: "center" }}>FILL %</span><span style={{ textAlign: "center" }}>RATING</span><span style={{ textAlign: "center" }}>TREND</span>
                </div>
                {[
                  { name: "Maya Chen", fill: 94, rating: 4.9, trend: "↑" },
                  { name: "Jordan Ellis", fill: 88, rating: 4.7, trend: "→" },
                  { name: "Sam Rivera", fill: 82, rating: 4.5, trend: "↑" },
                  { name: "Priya Patel", fill: 71, rating: 4.2, trend: "↓" },
                ].map((ins, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px", gap: 4, padding: "9px 0", borderBottom: `1px solid ${T.warm}`, alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: T.mint, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.mono, fontSize: 9, color: T.sage, fontWeight: 500 }}>{ins.name.split(" ").map(n => n[0]).join("")}</div>
                      <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 500, color: T.ink }}>{ins.name}</span>
                    </div>
                    <div>
                      <div style={{ height: 4, borderRadius: 2, background: T.warm }}>
                        <div style={{ height: "100%", width: `${ins.fill}%`, borderRadius: 2, background: ins.fill > 88 ? T.sage : ins.fill > 78 ? T.clay : "#C45B4A" }} />
                      </div>
                      <div style={{ fontFamily: T.mono, fontSize: 9, color: T.muted, marginTop: 2 }}>{ins.fill}%</div>
                    </div>
                    <div style={{ textAlign: "center", fontFamily: T.serif, fontSize: 14, color: T.ink }}>{ins.rating}</div>
                    <div style={{ textAlign: "center", fontFamily: T.mono, fontSize: 13, color: ins.trend === "↑" ? T.sage : ins.trend === "↓" ? "#C45B4A" : T.muted }}>{ins.trend}</div>
                  </div>
                ))}
              </BrowserMock>
            </div>

            <div style={{ marginTop: 20, padding: "20px 24px", borderRadius: 10, background: T.mint, border: `1px solid ${T.sagePale}`, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.sage, marginTop: 2, flexShrink: 0 }}>DESIGN DECISION</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.forestMid, lineHeight: 1.65, margin: 0 }}>
                Managers told me they spend 20+ minutes/week manually checking attendance spreadsheets. The dashboard surfaces fill rate, at-risk members, and AI-generated schedule suggestions in one view — turning a 20-minute task into a 2-minute scan.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Instructor View */}
        {activeTab === 2 && (
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <BrowserMock title="My Performance" role="Instructor" accentColor={T.forestMid}>
                <MockNav title="My Insights" icon={Award} accentColor={T.forestMid} />
                <MockStatRow accentColor={T.forestMid} stats={[
                  { label: "Avg class size", val: "13.2", trend: "↑ from 11.4" },
                  { label: "Avg rating", val: "4.9", trend: "Top instructor" },
                  { label: "Classes taught", val: "28", trend: "this month" },
                ]} />
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, marginBottom: 8 }}>FEEDBACK TAGS</div>
                <FeedbackBar tag="Energising" pct={82} color={T.sage} />
                <FeedbackBar tag="Well-paced" pct={74} color={T.sage} />
                <FeedbackBar tag="Great music" pct={68} color={T.sagePale} />
                <FeedbackBar tag="Cool-down too short" pct={31} color={T.clay} />
                <MockAIInsight text="Your energy scores are exceptional (82%). 3 recent reviews mention the cool-down felt rushed. Consider adding 2–3 minutes to closing stretches." />
              </BrowserMock>

              <BrowserMock title="My Feedback" role="Instructor" accentColor={T.forestMid}>
                <MockNav title="Recent Feedback" icon={MessageSquare} accentColor={T.forestMid} />
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#C4973B" color="#C4973B" />)}
                  <span style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, marginLeft: 4 }}>4.9 avg from 64 reviews</span>
                </div>
                {[
                  { stars: 5, comment: "Best instructor at the studio. Her playlists are always on point and she remembers everyone's names.", tag: "Energising", anon: false, name: "Sarah M." },
                  { stars: 5, comment: "Love the energy but wish we had a longer cool-down. Always have to rush out after.", tag: "Well-paced", anon: true, name: null },
                  { stars: 4, comment: "Really pushed me today. Great cues throughout. Would love more variations for beginners.", tag: "Great music", anon: false, name: "James T." },
                ].map((r, i) => (
                  <div key={i} style={{ padding: "12px 14px", borderRadius: 8, background: T.ivory, border: `1px solid ${T.warm}`, marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 2 }}>
                        {Array(r.stars).fill(0).map((_, j) => <Star key={j} size={11} fill="#C4973B" color="#C4973B" />)}
                      </div>
                      <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>{r.anon ? "Anonymous" : r.name}</span>
                    </div>
                    <p style={{ fontFamily: T.sans, fontSize: 12, color: T.ink, lineHeight: 1.55, margin: "0 0 6px" }}>{r.comment}</p>
                    <span style={{ padding: "2px 7px", borderRadius: 3, background: T.mint, color: T.sage, fontFamily: T.mono, fontSize: 9 }}>{r.tag}</span>
                  </div>
                ))}
              </BrowserMock>
            </div>

            <div style={{ marginTop: 20, padding: "20px 24px", borderRadius: 10, background: T.mint, border: `1px solid ${T.sagePale}`, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.sage, marginTop: 2, flexShrink: 0 }}>DESIGN DECISION</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.forestMid, lineHeight: 1.65, margin: 0 }}>
                No competitor surfaces feedback directly to instructors. This was the top request in instructor interviews. The AI summary distils 64 reviews into one actionable paragraph — respecting their time while making the data actually useful. Anonymous submissions are shown without names to encourage honest feedback.
              </p>
            </div>
          </FadeIn>
        )}
      </Section>

      {/* ── TRADEOFFS ── */}
      <Section bg={T.parchment}>
        <FadeIn>
          <Eyebrow>Key Tradeoffs</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "0 0 10px" }}>The decisions that shaped the product</h2>
          <p style={{ color: T.muted, lineHeight: 1.8, maxWidth: 540, margin: "0 0 44px" }}>Every PM decision involves a tradeoff. Here are the four that had the most strategic weight.</p>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { q: "No marketplace — by design", a: "Marketplaces grow top of funnel but cannibalise the studio relationship. StudioKey is private-first: your members, your brand, your data. Studios switching from competitors specifically cited marketplace cannibalisation as their primary reason for leaving.", verdict: "Private-first" },
            { q: "AI coaching in every tier, not just Pro", a: "Restricting AI to Pro would make the upgrade path cleaner. But the feedback loop — student submits, AI summarises, instructor improves — is the core differentiator. Gating it creates a worse product for the majority. Messenger AI (real-time chat) is Pro-only because its API costs are usage-based and unpredictable.", verdict: "AI as default, chat as upgrade" },
            { q: "Instructor sees their own feedback directly", a: "Every other platform shows feedback only to managers. This creates information asymmetry and makes instructors feel surveilled rather than supported. Transparency builds trust and reduces turnover — which directly reduces manager churn, because studios leave when their instructors leave.", verdict: "Full transparency" },
            { q: "Sub requests are NOT auto-assigned", a: "Auto-assignment sounds efficient but creates errors when coverage quality matters. A yoga sub request shouldn't auto-assign a HIIT instructor. The manual confirmation step adds one manager action but prevents class quality issues that damage member trust.", verdict: "Manual confirmation preserved" },
          ].map(({ q, a, verdict }, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr auto", gap: 32, padding: "28px 0", borderBottom: `1px solid ${T.warm}`, alignItems: "start" }}>
                <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 500, color: T.ink, lineHeight: 1.4 }}>{q}</div>
                <div style={{ fontFamily: T.sans, fontSize: 14, color: T.muted, lineHeight: 1.7 }}>{a}</div>
                <div style={{ padding: "6px 14px", borderRadius: 4, background: T.mint, color: T.forestMid, fontFamily: T.mono, fontSize: 11, fontWeight: 500, whiteSpace: "nowrap", border: `1px solid ${T.sagePale}`, alignSelf: "flex-start" }}>{verdict}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── KPIs ── */}
      <Section bg={T.forest}>
        <FadeIn>
          <Eyebrow light>Success Metrics</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, color: "#fff", lineHeight: 1.2, margin: "0 0 10px" }}>How I'd know it's working</h2>
          <p style={{ color: T.stone, lineHeight: 1.8, maxWidth: 560, margin: "0 0 44px", fontWeight: 300 }}>Defined before any design was finalized. Each KPI maps to a specific hypothesis about user value.</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: Calendar, metric: "Booking completion rate", target: "≥ 85%", hypothesis: "Confirms the booking flow is genuinely frictionless. Below 80% triggers a flow audit.", type: "Product" },
              { icon: Star, metric: "Feedback submission rate", target: "≥ 30% of attendees", hypothesis: "This feeds the AI engine. If <20%, the post-class prompt needs redesigning or delivery timing is wrong.", type: "Engagement" },
              { icon: Users, metric: "Instructor 90-day retention", target: "≥ 90%", hypothesis: "If instructors leave, studios leave. This is the leading indicator for overall churn.", type: "Retention" },
              { icon: Activity, metric: "Weekly active studios", target: "≥ 80% login 3× per week", hypothesis: "Validates dashboard utility. Low engagement means we're not surfacing the right data.", type: "Product" },
              { icon: Zap, metric: "AI insight action rate", target: "≥ 40% in 7 days", hypothesis: "If users read insights but don't act, the recommendations lack specificity. Signals prompt re-engineering needed.", type: "AI" },
              { icon: TrendingUp, metric: "Net Revenue Retention", target: "≥ 110%", hypothesis: "Above 100% means existing studios are upgrading faster than churn. Validates tier upgrade path.", type: "Business" },
            ].map(({ icon: Icon, metric, target, hypothesis, type }, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 22, border: "1px solid rgba(255,255,255,0.09)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.sage}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={15} color={T.sagePale} />
                  </div>
                  <span style={{ padding: "3px 8px", borderRadius: 3, background: "rgba(255,255,255,0.08)", fontFamily: T.mono, fontSize: 9, color: T.stone }}>{type}</span>
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>{metric}</div>
                <div style={{ fontFamily: T.mono, fontSize: 12, color: T.sagePale, marginBottom: 10 }}>{target}</div>
                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.stone, lineHeight: 1.6 }}>{hypothesis}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ── BUSINESS MODEL ── */}
      <Section>
        <FadeIn>
          <Eyebrow>Business Model</Eyebrow>
          <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "0 0 10px" }}>Unit economics that scale</h2>
          <p style={{ color: T.muted, lineHeight: 1.8, maxWidth: 540, margin: "0 0 44px" }}>Pricing designed for the NYC boutique studio — high enough to be sustainable, low enough to be a no-brainer vs. the competition.</p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20, alignItems: "start" }}>
          {[
            { name: "Starter", price: "$29", sub: "/month", desc: "Solo operators and new studios", features: ["3 instructors","100 members","Scheduling & booking","Basic AI insights"], highlight: false },
            { name: "Studio", price: "$59", sub: "/month", desc: "Growing boutique studios", features: ["8 instructors","500 members","Full AI coaching","Marketing emails"], highlight: true },
            { name: "Pro", price: "$99", sub: "/month", desc: "Established multi-class studios", features: ["Unlimited instructors","Unlimited members","Messenger AI","Dedicated onboarding"], highlight: false },
          ].map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                background: plan.highlight ? T.forest : "#fff",
                borderRadius: 14, padding: 28,
                border: plan.highlight ? `2px solid ${T.sage}` : `1px solid ${T.warm}`,
                position: "relative",
              }}>
                {plan.highlight && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 12px", borderRadius: 3, background: T.sage, color: "#fff", fontFamily: T.mono, fontSize: 9, fontWeight: 500, letterSpacing: "0.12em", whiteSpace: "nowrap" }}>MOST POPULAR</div>
                )}
                <div style={{ fontFamily: T.sans, fontSize: 15, fontWeight: 500, color: plan.highlight ? "#fff" : T.ink, marginBottom: 4 }}>{plan.name}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: plan.highlight ? T.sagePale : T.muted, marginBottom: 16 }}>{plan.desc}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 20 }}>
                  <span style={{ fontFamily: T.serif, fontSize: 38, color: plan.highlight ? "#fff" : T.ink, lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontFamily: T.mono, fontSize: 11, color: plan.highlight ? T.stone : T.muted }}>{plan.sub}</span>
                </div>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <CheckCircle size={13} color={plan.highlight ? T.sagePale : T.sage} />
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: plan.highlight ? T.stone : T.muted }}>{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}

          {/* Unit economics panel */}
          <FadeIn delay={0.3}>
            <div style={{ background: T.mint, borderRadius: 14, padding: 28, border: `1px solid ${T.sagePale}` }}>
              <Eyebrow>Unit Economics</Eyebrow>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Avg revenue per studio", val: "$59/mo" },
                  { label: "Target: 300 studios", val: "$17.7k MRR" },
                  { label: "vs. leading competitor", val: "Save $1,700+/yr" },
                  { label: "Payback on sales time", val: "~6 weeks" },
                ].map(({ label, val }, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 10, borderBottom: i < 3 ? `1px solid ${T.sagePale}` : "none" }}>
                    <span style={{ fontFamily: T.mono, fontSize: 10, color: T.sage }}>{label}</span>
                    <span style={{ fontFamily: T.serif, fontSize: 18, color: T.forestMid }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── REFLECTION ── */}
      <Section bg={T.parchment}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <FadeIn>
            <Eyebrow>Reflection</Eyebrow>
            <h2 style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 400, lineHeight: 1.2, margin: "0 0 32px" }}>What this project taught me about PM</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { icon: Search, title: "Domain expertise accelerates discovery", body: "Being an instructor for two years let me validate hypotheses in hours instead of weeks. The best PM research starts before the research phase." },
                { icon: DollarSign, title: "AI features need cost modelling from day one", body: "It's easy to design an AI feature. It's hard to design one that doesn't destroy your unit economics. API costs shaped the entire tier structure." },
                { icon: GitMerge, title: "Every design decision is a business decision", body: "Choosing not to build a marketplace wasn't a UX call — it was the entire brand positioning. The two are inseparable at the strategy level." },
                { icon: ClipboardList, title: "Prioritisation is the real skill", body: "The RICE exercise forced me to defend every feature against opportunity cost. Several features I assumed were 'essential' scored poorly and got cut from Phase 1." },
              ].map(({ icon: Icon, title, body }, i) => (
                <div key={i} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: `1px solid ${T.warm}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: T.mint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color={T.sage} />
                  </div>
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.ink, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.muted, lineHeight: 1.65 }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ paddingTop: 56 }}>
              <div style={{ background: T.forest, borderRadius: 14, padding: 36, marginBottom: 20 }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.sage, letterSpacing: "0.12em", marginBottom: 16 }}>IF I HAD MORE TIME</div>
                {[
                  "Usability test the booking flow with 5 real studio members",
                  "Model churn curve at different price points with sensitivity analysis",
                  "Prototype the Messenger AI conversation with a real LLM for demo validation",
                  "Run a 30-day pilot with 2 NYC studios on a test build to validate retention assumptions",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${T.sagePale}`, flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.stone, lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 14, padding: 28, border: `1px solid ${T.warm}` }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.muted, marginBottom: 16 }}>PM SKILLS EXERCISED</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["User Research","Jobs-to-be-Done","RICE Framework","Competitive Mapping","Feature Scoping","OKR / KPI Definition","Pricing Strategy","Go-to-Market","Stakeholder Communication","API Cost Modelling"].map(s => (
                    <SkillBadge key={s} label={s} />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <div style={{ background: T.ink, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: T.serif, fontSize: 20, color: "#fff" }}>Ashley Erin Holness</span>
        <span style={{ fontFamily: T.mono, fontSize: 11, color: T.stone }}>StudioKey · Product Case Study · 2026</span>
      </div>
    </div>
  );
}
