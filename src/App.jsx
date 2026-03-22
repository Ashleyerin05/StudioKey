import { useState, useEffect } from "react";
import { ArrowRight, ArrowDown, Users, Star, Calendar, Zap, BarChart3, MessageSquare, ChevronRight, CheckCircle, Search, Clock, MapPin, Heart, BookOpen, Target, DollarSign, Award, Mail, Eye, Filter } from "lucide-react";

// ─── Palette (earthy, editorial) ───
const P = {
  dark: "#1C1917",
  darkMuted: "#292524",
  warmBlack: "#0C0A09",
  cream: "#FAFAF5",
  parchment: "#F5F0E8",
  sand: "#E7E0D5",
  stone: "#D6CFC4",
  warmGray: "#78716C",
  mutedText: "#A8A29E",
  sage: "#9DAF90",
  sageDark: "#7A8E6C",
  olive: "#D0DBBF",
  bark: "#7A6B5D",
  white: "#FFFFFF",
  accent: "#B8A088",
};

// ─── Smooth scroll-triggered fade-in ───
const FadeIn = ({ children, delay = 0, style = {} }) => {
  const [visible, setVisible] = useState(false);
  const [ref, setRef] = useState(null);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);
  return (
    <div ref={setRef} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};

// ─── Section wrapper ───
const Section = ({ children, bg = P.cream, style = {} }) => (
  <div style={{ background: bg, padding: "100px 24px", ...style }}>
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>{children}</div>
  </div>
);

// ─── Label chip ───
const Label = ({ children }) => (
  <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 4, background: P.sand, color: P.warmGray, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>{children}</div>
);

// ─── Stat block ───
const Stat = ({ value, label, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 48, fontWeight: 300, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: P.warmGray, marginTop: 8, letterSpacing: 0.5 }}>{label}</div>
    </div>
  </FadeIn>
);

// ─── Process step ───
const ProcessStep = ({ number, title, duration, description, items, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div style={{ display: "flex", gap: 32, marginBottom: 64 }}>
      <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: "50%", border: `1.5px solid ${P.warmGray}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 300, color: P.stone, fontFamily: "'Georgia', serif" }}>{number}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: P.cream, margin: 0 }}>{title}</h3>
          {duration && <span style={{ fontSize: 12, color: P.mutedText, fontWeight: 500 }}>{duration}</span>}
        </div>
        <p style={{ fontSize: 15, color: P.stone, lineHeight: 1.7, margin: "0 0 16px" }}>{description}</p>
        {items && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {items.map((item, i) => (
              <span key={i} style={{ padding: "6px 14px", borderRadius: 4, background: `${P.sage}15`, color: P.stone, fontSize: 12, fontWeight: 600, border: `1px solid ${P.warmGray}30` }}>{item}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  </FadeIn>
);

// ─── Insight card ───
const InsightCard = ({ icon: Icon, title, insight, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div style={{ background: P.white, borderRadius: 12, padding: 28, border: `1px solid ${P.sand}`, height: "100%" }}>
      <Icon size={20} color={P.sageDark} style={{ marginBottom: 16 }} />
      <h4 style={{ fontSize: 16, fontWeight: 600, color: P.dark, margin: "0 0 8px" }}>{title}</h4>
      <p style={{ fontSize: 14, color: P.warmGray, lineHeight: 1.6, margin: 0 }}>{insight}</p>
    </div>
  </FadeIn>
);

// ─── Mock UI: Schedule Card ───
const MockClassCard = ({ name, time, teacher, spots, color, style = {} }) => (
  <div style={{ background: P.white, borderRadius: 12, padding: 16, border: `1px solid ${P.sand}`, ...style }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <span style={{ padding: "3px 10px", borderRadius: 4, background: `${color}18`, fontSize: 11, fontWeight: 700, color }}>{name}</span>
      <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(s => <Star key={s} size={10} fill="#C4973B" color="#C4973B" />)}</div>
    </div>
    <div style={{ fontSize: 16, fontWeight: 700, color: P.dark }}>{time}</div>
    <div style={{ fontSize: 12, color: P.warmGray, marginTop: 3 }}>{teacher} · 60 min</div>
    <div style={{ fontSize: 12, fontWeight: 600, color: spots === "Full" ? "#C45B4A" : P.sageDark, marginTop: 8 }}>{spots}</div>
  </div>
);

// ─── Phone Mockup Frame ───
const PhoneMockup = ({ children, label, style = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ...style }}>
    <div style={{ width: 280, background: P.dark, borderRadius: 32, padding: "12px 10px", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
      {/* Notch */}
      <div style={{ width: 100, height: 24, borderRadius: 12, background: P.warmBlack, margin: "0 auto 8px" }} />
      {/* Screen */}
      <div style={{ background: P.cream, borderRadius: 22, overflow: "hidden", minHeight: 440 }}>
        {children}
      </div>
      {/* Home bar */}
      <div style={{ width: 100, height: 4, borderRadius: 2, background: P.warmGray, margin: "10px auto 4px", opacity: 0.4 }} />
    </div>
    {label && <div style={{ fontSize: 12, color: P.mutedText, marginTop: 14, fontWeight: 500, letterSpacing: 0.5 }}>{label}</div>}
  </div>
);

// ─── Mini phone screen content helpers ───
const PhoneNav = ({ title }) => (
  <div style={{ padding: "14px 16px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <BookOpen size={14} color={P.sageDark} />
      <span style={{ fontSize: 13, fontWeight: 700, color: P.dark, fontFamily: "'Georgia', serif" }}>{title}</span>
    </div>
    <div style={{ width: 22, height: 22, borderRadius: "50%", background: P.sageDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: P.white }}>SM</div>
  </div>
);

// ════════════════════════════════════════
// ─── MAIN COMPONENT ───
// ════════════════════════════════════════
export default function StudioKeyCaseStudy() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "-apple-system, 'Segoe UI', sans-serif", color: P.dark, background: P.cream }}>

      {/* ════ HERO ════ */}
      <div style={{ background: P.warmBlack, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Parallax grain */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

        {/* Subtle gradient orbs */}
        <div style={{ position: "absolute", top: "10%", right: "15%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${P.sage}08 0%, transparent 70%)`, filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${P.accent}06 0%, transparent 70%)`, filter: "blur(80px)" }} />

        {/* Top nav */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
          <span style={{ fontSize: 13, color: P.mutedText, letterSpacing: 1.5, fontWeight: 500 }}>ASHLEY</span>
          <span style={{ fontSize: 13, color: P.mutedText, letterSpacing: 1.5, fontWeight: 500 }}>PROJECT CASE STUDY</span>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 2 }}>
          <FadeIn delay={0.1}>
            <div style={{ fontSize: 13, color: P.sage, letterSpacing: 2, fontWeight: 600, marginBottom: 32, textTransform: "uppercase" }}>Case Study</div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h1 style={{ fontSize: 80, fontWeight: 400, color: P.white, lineHeight: 1.08, fontFamily: "'Georgia', serif", margin: "0 0 28px", letterSpacing: -1 }}>
              StudioKey
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p style={{ fontSize: 22, color: P.stone, lineHeight: 1.6, maxWidth: 600, margin: "0 0 48px", fontWeight: 300 }}>
              Designing an instructor-first boutique fitness platform, from personal frustration to a full product vision.
            </p>
          </FadeIn>
          <FadeIn delay={0.55}>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[
                { label: "Role", value: "Product Design & Strategy" },
                { label: "Timeline", value: "3 Weeks" },
                { label: "Type", value: "End-to-End Product" },
                { label: "Tools", value: "Figma, React, Supabase" },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: 11, color: P.mutedText, letterSpacing: 1.5, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: P.cream, fontWeight: 400 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <FadeIn delay={0.8} style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, color: P.mutedText, letterSpacing: 1.5 }}>SCROLL</span>
            <ArrowDown size={16} color={P.mutedText} style={{ animation: "bounce 2s ease infinite" }} />
          </div>
        </FadeIn>

        <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }`}</style>
      </div>

      {/* ════ THE ORIGIN STORY ════ */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <FadeIn>
            <div>
              <Label>The Origin</Label>
              <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 20px" }}>I was a yoga instructor.<br />I saw the problem firsthand.</h2>
              <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, margin: "0 0 16px" }}>
                For two years, I taught yoga at a boutique studio that used MindBody. Every week I dealt with the same frustrations: a clunky booking system that confused my students, no way to see how my classes were actually performing, and zero visibility into what I was earning until payday. The platform felt like it was built for large chains, not for studios like ours.
              </p>
              <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, margin: "0 0 16px" }}>
                The studio owner felt it too. She was paying for MindBody and watching the price climb every year, while the features she actually needed never improved. The platform pushed her own students toward competing studios through its marketplace. The feedback she got from students was scattered across Google reviews, DMs, and word-of-mouth.
              </p>
              <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, margin: 0 }}>
                I knew there had to be a better way. So I started building one.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: P.parchment, borderRadius: 16, padding: 40, border: `1px solid ${P.sand}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: P.sageDark, letterSpacing: 1, marginBottom: 24, textTransform: "uppercase" }}>Pain Points Identified</div>
              {[
                { icon: Eye, pain: "Instructors are the revenue drivers, but have no visibility into their own performance or pay" },
                { icon: DollarSign, pain: "Small studios overpay for bloated platforms built for large chains, and the prices keep climbing" },
                { icon: Star, pain: "Student feedback is scattered and never turns into actionable insights" },
                { icon: Calendar, pain: "Booking experiences feel dated with too many taps and too much friction" },
                { icon: Zap, pain: "No studio tools use AI meaningfully. It's all manual busywork" },
              ].map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 4 ? 20 : 0, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: `${P.sageDark}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <p.icon size={14} color={P.sageDark} />
                  </div>
                  <span style={{ fontSize: 14, color: P.dark, lineHeight: 1.6 }}>{p.pain}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ════ RESEARCH & DISCOVERY ════ */}
      <Section bg={P.parchment}>
        <FadeIn>
          <Label>Research & Discovery</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 20px" }}>Understanding the landscape</h2>
          <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, maxWidth: 640, margin: "0 0 56px" }}>
            Before designing anything, I spent time talking to studio owners, instructors, and regular students. I also audited the top competitors to understand what worked, what didn't, and where the real gaps were.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 64 }}>
          <Stat value="12" label="Instructor interviews" delay={0.1} />
          <Stat value="5" label="Studio owner conversations" delay={0.2} />
          <Stat value="30+" label="Student survey responses" delay={0.3} />
          <Stat value="4" label="Competitor audits" delay={0.4} />
        </div>

        <FadeIn delay={0.2}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            <InsightCard icon={Users} title="Instructors drive revenue" insight="Instructors are building communities and personal brands. They're what keeps students coming back. But they have no data to improve. Maximizing instructor feedback is directly tied to maximizing retention and revenue." delay={0.1} />
            <InsightCard icon={Star} title="Feedback never gets used" insight="Studios collect Google reviews and DMs, but it never gets synthesized. Instructors don't see patterns. Owners can't coach effectively. The data exists, but it just goes nowhere." delay={0.2} />
            <InsightCard icon={Calendar} title="Booking should be invisible" insight="Students want to book in seconds, not navigate a marketplace. Every extra tap is friction. The best booking experience is one you barely notice." delay={0.3} />
          </div>
        </FadeIn>
      </Section>

      {/* ════ DEFINING THE PRODUCT ════ */}
      <Section>
        <FadeIn>
          <Label>Product Definition</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 20px" }}>Three users, one platform</h2>
          <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, maxWidth: 640, margin: "0 0 56px" }}>
            The key insight was that a fitness studio has three distinct user types with very different needs, and the product needed to serve all of them equally well.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { icon: Heart, role: "Customer", color: P.sage, needs: ["Book classes in under 3 taps", "Get real insight into classes before booking", "Share feedback that actually gets heard", "See schedule filtered by type and instructor"], quote: "I just want to book and go. And know my feedback actually matters." },
            { icon: BarChart3, role: "Manager", color: P.bark, needs: ["Real-time fill rates and revenue", "Member CRM with engagement data", "AI-summarized feedback trends", "Marketing tools built in"], quote: "I need to see the health of my studio at a glance." },
            { icon: Award, role: "Instructor", color: P.dark, needs: ["See their own performance data", "Read student feedback directly", "Track earnings per class", "Get AI coaching suggestions"], quote: "I want to know if I'm improving, and what to work on." },
          ].map((user, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ background: P.white, borderRadius: 12, padding: 32, border: `1px solid ${P.sand}`, height: "100%" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${user.color}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <user.icon size={22} color={user.color} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: P.dark, margin: "0 0 16px" }}>{user.role}</h3>
                {user.needs.map((need, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <CheckCircle size={14} color={P.sage} />
                    <span style={{ fontSize: 14, color: P.warmGray }}>{need}</span>
                  </div>
                ))}
                <div style={{ marginTop: 20, padding: "14px 18px", borderRadius: 8, background: P.parchment, borderLeft: `3px solid ${user.color}` }}>
                  <p style={{ fontSize: 13, color: P.dark, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>"{user.quote}"</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════ DESIGN PROCESS ════ */}
      <Section bg={P.warmBlack} style={{ padding: "100px 24px" }}>
        <FadeIn>
          <Label>Design Process</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.cream, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 56px" }}>From sketches to screens</h2>
        </FadeIn>

        <div style={{ maxWidth: 700 }}>
          <ProcessStep number="01" title="Competitive Analysis" duration="Week 1" description="Audited MindBody, Vagaro, Glofox, and Wellness Living. Mapped feature sets, pricing tiers, and user complaints from app store reviews. Identified the core gap: none of them treated instructors as a first-class user." items={["Feature matrix", "Pricing comparison", "Review analysis", "Gap identification"]} delay={0.1} />
          <ProcessStep number="02" title="User Journey Mapping" duration="Week 1" description="Mapped the end-to-end experience for each user role. Identified the critical moments: booking (customer), checking fill rates (manager), and reviewing feedback (instructor). Designed around reducing friction at each of these touchpoints." items={["3 user flows", "12 journey maps", "Friction audit", "Priority matrix"]} delay={0.2} />
          <ProcessStep number="03" title="Wireframing & Iteration" duration="Week 2" description="Started with low-fidelity wireframes for all three portals. Ran informal critiques with 4 instructor friends and 2 studio owners. Key feedback: the schedule view needed to be simpler, and instructors wanted earnings front and center." items={["Low-fi wireframes", "3 critique rounds", "Information architecture", "Component library"]} delay={0.3} />
          <ProcessStep number="04" title="Visual Design & Prototyping" duration="Week 2-3" description="Defined an earthy, warm color palette inspired by the boutique studios themselves: sage greens, parchment creams, and natural textures. Built a fully interactive prototype covering all three portals with realistic mock data." items={["Color system", "Typography scale", "Interactive prototype", "Motion design"]} delay={0.4} />
          <ProcessStep number="05" title="AI Feature Design" duration="Week 3" description="Designed the AI coaching feature that synthesizes student feedback into actionable insights for instructors. Also designed Messenger AI, an always-on assistant that handles cancellations, rebookings, and FAQs without staff intervention." items={["AI coaching UX", "Messenger AI flows", "Prompt engineering", "Cost modeling"]} delay={0.5} />
        </div>
      </Section>

      {/* ════ THE SOLUTION ════ */}
      <Section>
        <FadeIn>
          <Label>The Solution</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 16px" }}>A platform that respects every user</h2>
          <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, maxWidth: 640, margin: "0 0 56px" }}>
            StudioKey gives customers a frictionless booking experience, managers real-time visibility, and instructors the performance data they've never had access to.
          </p>
        </FadeIn>

        {/* Phone Mockups Row */}
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 64, padding: "20px 0" }}>
            {/* Customer: Schedule */}
            <PhoneMockup label="Customer: Browse & Book">
              <PhoneNav title="StudioKey" />
              <div style={{ padding: "0 14px 14px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: P.dark, marginBottom: 10 }}>Class Schedule</div>
                <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
                  {["All", "Yoga", "HIIT"].map((t, i) => (
                    <div key={t} style={{ padding: "4px 12px", borderRadius: 14, background: i === 0 ? P.sageDark : P.white, color: i === 0 ? P.white : P.warmGray, fontSize: 11, fontWeight: 600, border: i === 0 ? "none" : `1px solid ${P.sand}` }}>{t}</div>
                  ))}
                </div>
                {[
                  { name: "Vinyasa Flow", time: "7:00 AM", teacher: "Maya C.", spots: "2 left", c: P.sageDark },
                  { name: "Power Pilates", time: "9:00 AM", teacher: "Jordan E.", spots: "Full", c: P.bark },
                  { name: "HIIT Burn", time: "12:00 PM", teacher: "Sam R.", spots: "4 left", c: "#C45B4A" },
                ].map((cls, i) => (
                  <div key={i} style={{ background: P.white, borderRadius: 10, padding: 12, marginBottom: 8, border: `1px solid ${P.sand}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: cls.c }}>{cls.name}</span>
                      <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(s => <Star key={s} size={8} fill="#C4973B" color="#C4973B" />)}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: P.dark }}>{cls.time}</div>
                    <div style={{ fontSize: 11, color: P.warmGray }}>{cls.teacher} · 60 min</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: cls.spots === "Full" ? "#C45B4A" : P.sageDark, marginTop: 4 }}>{cls.spots}</div>
                  </div>
                ))}
              </div>
            </PhoneMockup>

            {/* Instructor: Earnings */}
            <PhoneMockup label="Instructor: Earnings" style={{ marginTop: 40 }}>
              <PhoneNav title="My Earnings" />
              <div style={{ padding: "0 14px 14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 14 }}>
                  {[{ v: "$660", l: "This Month" }, { v: "$55", l: "Per Class" }, { v: "$1,870", l: "YTD" }].map((s, i) => (
                    <div key={i} style={{ background: P.white, borderRadius: 8, padding: 10, textAlign: "center", border: `1px solid ${P.sand}` }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: P.dark, fontFamily: "'Georgia', serif" }}>{s.v}</div>
                      <div style={{ fontSize: 9, color: P.mutedText, marginTop: 2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: P.dark, marginBottom: 8 }}>Recent</div>
                {[
                  { cls: "Vinyasa Flow (7am)", pay: "$76", detail: "$50 + $26" },
                  { cls: "Power Yoga", pay: "$72", detail: "$50 + $22" },
                  { cls: "Vinyasa Flow (10am)", pay: "$78", detail: "$50 + $28" },
                  { cls: "Sub: Yin Yoga", pay: "$40", detail: "Flat rate" },
                ].map((c, i) => (
                  <div key={i} style={{ background: P.white, borderRadius: 8, padding: "8px 10px", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${P.sand}` }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: P.dark }}>{c.cls}</div>
                      <div style={{ fontSize: 10, color: P.mutedText }}>{c.detail}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: P.sageDark }}>{c.pay}</div>
                  </div>
                ))}
              </div>
            </PhoneMockup>

            {/* Manager: Dashboard */}
            <PhoneMockup label="Manager: Dashboard">
              <PhoneNav title="Dashboard" />
              <div style={{ padding: "0 14px 14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
                  {[
                    { icon: Users, v: "247", l: "Members", t: "+12%" },
                    { icon: Target, v: "91%", l: "Fill Rate", t: "+3%" },
                    { icon: DollarSign, v: "$8,420", l: "Revenue", t: "+18%" },
                    { icon: Star, v: "4.8", l: "Avg Rating", t: "+0.2" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: P.white, borderRadius: 8, padding: 10, border: `1px solid ${P.sand}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                        <s.icon size={10} color={P.warmGray} />
                        <span style={{ fontSize: 9, color: P.mutedText }}>{s.l}</span>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: P.dark, fontFamily: "'Georgia', serif" }}>{s.v}</div>
                      <div style={{ fontSize: 9, color: P.sageDark, fontWeight: 600 }}>↑ {s.t}</div>
                    </div>
                  ))}
                </div>
                {/* AI Insight mini */}
                <div style={{ background: P.white, borderRadius: 8, padding: 10, border: `1px solid ${P.sage}30` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                    <Zap size={10} color={P.sageDark} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: P.sageDark, letterSpacing: 0.5 }}>AI INSIGHT</span>
                  </div>
                  <p style={{ fontSize: 11, color: P.dark, lineHeight: 1.5, margin: 0 }}>Yoga classes trending up 12%. Consider adding a Thursday evening slot.</p>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </FadeIn>

        {/* Desktop Mockups - Modern Dark Layout */}
        <FadeIn delay={0.1}>
          <div style={{ background: P.warmBlack, borderRadius: 24, padding: "48px 40px", marginBottom: 0, position: "relative", overflow: "hidden" }}>
            {/* Subtle gradient accent */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${P.sage}10 0%, transparent 70%)`, filter: "blur(80px)" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36, position: "relative", zIndex: 1 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: P.sage, letterSpacing: 1.5, marginBottom: 8, textTransform: "uppercase" }}>Desktop Experience</div>
                <h3 style={{ fontSize: 26, fontWeight: 400, color: P.cream, margin: 0, fontFamily: "'Georgia', serif" }}>Every view, designed with purpose</h3>
              </div>
            </div>

            {/* Three-column desktop mockup grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 20, position: "relative", zIndex: 1 }}>
              {/* Customer: Schedule */}
              <div style={{ background: `${P.cream}08`, borderRadius: 16, padding: 24, border: `1px solid ${P.warmGray}20`, backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${P.sage}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Heart size={14} color={P.sage} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: P.cream }}>Class Schedule</div>
                    <div style={{ fontSize: 10, color: P.mutedText }}>Customer View</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                  {["All", "Yoga", "Pilates", "HIIT", "Barre"].map((t, i) => (
                    <div key={t} style={{ padding: "5px 12px", borderRadius: 14, background: i === 0 ? P.sageDark : "transparent", color: i === 0 ? P.white : P.mutedText, fontSize: 11, fontWeight: 600, border: i === 0 ? "none" : `1px solid ${P.warmGray}30` }}>{t}</div>
                  ))}
                </div>
                {[
                  { name: "Vinyasa Flow", time: "7:00 AM", teacher: "Maya Chen", spots: "2 spots left", color: P.sage },
                  { name: "Power Pilates", time: "9:00 AM", teacher: "Jordan Ellis", spots: "Full", color: P.accent },
                  { name: "HIIT Burn", time: "12:00 PM", teacher: "Sam Rivera", spots: "4 spots left", color: "#C45B4A" },
                  { name: "Yin Yoga", time: "5:30 PM", teacher: "Priya Patel", spots: "6 spots left", color: P.stone },
                ].map((cls, i) => (
                  <div key={i} style={{ background: `${P.cream}06`, borderRadius: 10, padding: 12, marginBottom: 8, border: `1px solid ${P.warmGray}15` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: cls.color }}>{cls.name}</span>
                      <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map(s => <Star key={s} size={8} fill="#C4973B" color="#C4973B" />)}</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: P.cream }}>{cls.time}</div>
                    <div style={{ fontSize: 11, color: P.mutedText }}>{cls.teacher} · 60 min</div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: cls.spots === "Full" ? "#C45B4A" : P.sage, marginTop: 4 }}>{cls.spots}</div>
                  </div>
                ))}
              </div>

              {/* Manager: Dashboard */}
              <div style={{ background: `${P.cream}08`, borderRadius: 16, padding: 24, border: `1px solid ${P.warmGray}20` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${P.accent}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BarChart3 size={14} color={P.accent} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: P.cream }}>Studio Dashboard</div>
                    <div style={{ fontSize: 10, color: P.mutedText }}>Manager View</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {[
                    { icon: Users, label: "Members", val: "247", trend: "+12%" },
                    { icon: Target, label: "Fill Rate", val: "91%", trend: "+3%" },
                    { icon: DollarSign, label: "Revenue", val: "$8,420", trend: "+18%" },
                    { icon: Star, label: "Rating", val: "4.8", trend: "+0.2" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: `${P.cream}06`, borderRadius: 10, padding: 12, border: `1px solid ${P.warmGray}15` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                        <s.icon size={10} color={P.mutedText} />
                        <span style={{ fontSize: 9, color: P.mutedText }}>{s.label}</span>
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: P.cream, fontFamily: "'Georgia', serif" }}>{s.val}</div>
                      <div style={{ fontSize: 9, color: P.sage, fontWeight: 600 }}>↑ {s.trend}</div>
                    </div>
                  ))}
                </div>
                {/* AI Insight */}
                <div style={{ background: `${P.sage}12`, borderRadius: 10, padding: 12, border: `1px solid ${P.sage}20` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                    <Zap size={10} color={P.sage} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: P.sage, letterSpacing: 0.5 }}>AI INSIGHT</span>
                  </div>
                  <p style={{ fontSize: 11, color: P.stone, lineHeight: 1.5, margin: 0 }}>Yoga classes trending up 12%. Consider adding a Thursday evening slot.</p>
                </div>
              </div>

              {/* Instructor: Earnings */}
              <div style={{ background: `${P.cream}08`, borderRadius: 16, padding: 24, border: `1px solid ${P.warmGray}20` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${P.dark}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award size={14} color={P.stone} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: P.cream }}>My Earnings</div>
                    <div style={{ fontSize: 10, color: P.mutedText }}>Instructor View</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 14 }}>
                  {[{ label: "This Month", val: "$660" }, { label: "Per Class", val: "$55" }, { label: "YTD", val: "$1,870" }].map((s, i) => (
                    <div key={i} style={{ background: `${P.cream}06`, borderRadius: 8, padding: 10, textAlign: "center", border: `1px solid ${P.warmGray}15` }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: P.cream, fontFamily: "'Georgia', serif" }}>{s.val}</div>
                      <div style={{ fontSize: 9, color: P.mutedText, marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {[
                  { cls: "Vinyasa Flow (7am)", earned: "$76", detail: "$50 + $26" },
                  { cls: "Power Yoga", earned: "$72", detail: "$50 + $22" },
                  { cls: "Vinyasa Flow (10am)", earned: "$78", detail: "$50 + $28" },
                  { cls: "Sub: Yin Yoga", earned: "$40", detail: "Flat rate" },
                ].map((c, i) => (
                  <div key={i} style={{ background: `${P.cream}06`, borderRadius: 8, padding: "8px 12px", marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1px solid ${P.warmGray}15` }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: P.cream }}>{c.cls}</div>
                      <div style={{ fontSize: 9, color: P.mutedText }}>{c.detail}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: P.sage }}>{c.earned}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ════ AI FEATURES ════ */}
      <Section bg={P.parchment}>
        <FadeIn>
          <Label>AI-Powered Features</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 16px" }}>Intelligence built into every layer</h2>
          <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, maxWidth: 640, margin: "0 0 56px" }}>
            StudioKey uses AI not as a gimmick, but as infrastructure. Two core features transform how studios operate.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* AI Coaching */}
          <FadeIn delay={0.1}>
            <div style={{ background: P.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${P.sand}` }}>
              <div style={{ padding: 32 }}>
                <Zap size={20} color={P.sageDark} style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 20, fontWeight: 600, color: P.dark, margin: "0 0 8px" }}>AI Coaching Insights</h3>
                <p style={{ fontSize: 14, color: P.warmGray, lineHeight: 1.6, margin: "0 0 20px" }}>Synthesizes student feedback into personalized coaching for each instructor, highlighting strengths and specific areas to improve.</p>
                <div style={{ background: P.parchment, borderRadius: 12, padding: 20, border: `1px solid ${P.sand}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <Zap size={12} color={P.sageDark} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: P.sageDark, letterSpacing: 1 }}>AI INSIGHT</span>
                  </div>
                  <p style={{ fontSize: 13, color: P.dark, lineHeight: 1.6, margin: 0 }}>Students praise your <strong>energy and music</strong> (82% of reviews). Consider adding 3 min to cool-down. 3 recent reviews mentioned it felt rushed.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Messenger AI */}
          <FadeIn delay={0.2}>
            <div style={{ background: P.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${P.sand}` }}>
              <div style={{ padding: 32 }}>
                <MessageSquare size={20} color={P.sageDark} style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: 20, fontWeight: 600, color: P.dark, margin: "0 0 8px" }}>Messenger AI</h3>
                <p style={{ fontSize: 14, color: P.warmGray, lineHeight: 1.6, margin: "0 0 20px" }}>Handles cancellations, rebookings, policy questions, and FAQs 24/7 so studios never lose a customer to a missed call.</p>
                <div style={{ background: P.darkMuted, borderRadius: 12, padding: 16 }}>
                  <div style={{ background: `${P.cream}15`, borderRadius: "10px 10px 4px 10px", padding: "8px 12px", marginBottom: 8, maxWidth: "85%", marginLeft: "auto" }}>
                    <div style={{ fontSize: 12, color: P.cream }}>I need to cancel tomorrow, will I be charged?</div>
                  </div>
                  <div style={{ background: `${P.sage}20`, borderRadius: "10px 10px 10px 4px", padding: "8px 12px", maxWidth: "85%" }}>
                    <div style={{ fontSize: 12, color: P.cream }}>No charge! Your studio allows free cancellation 12 hours before class. Cancelled your 9am Pilates. Want me to rebook Thursday?</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ════ KEY DECISIONS ════ */}
      <Section>
        <FadeIn>
          <Label>Key Decisions</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 16px" }}>Thinking through the tradeoffs</h2>
          <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, maxWidth: 640, margin: "0 0 56px" }}>
            Every product has moments where you have to weigh competing priorities. Here are the ones that shaped StudioKey.
          </p>
        </FadeIn>

        {[
          { q: "Why not include a marketplace?", a: "Marketplaces drive discovery, but they also push your students to competitors. For boutique studios, the brand relationship is everything. StudioKey is a private platform for your community, not a directory.", decision: "Private-first, no marketplace" },
          { q: "Why restrict Messenger AI to the Pro tier?", a: "AI API costs scale with usage, roughly $15-75/month per studio. Including it in lower tiers would either eat margins or force a price increase that hurts small studios. Pro tier lets us offer it sustainably while keeping Starter and Studio affordable.", decision: "Pro-only with custom quoting" },
          { q: "Why show instructors their earnings?", a: "Transparency builds trust. When instructors can see exactly what they're earning per class ($50 flat + $2/head), they feel invested. Studios that share this data have lower instructor turnover. It also eliminates end-of-month pay disputes.", decision: "Full earnings transparency" },
          { q: "Why AI coaching instead of manual reports?", a: "Studio owners don't have time to read 50 reviews and synthesize them. AI can identify patterns across hundreds of feedback entries and surface the two things an instructor should actually work on. It turns raw data into growth.", decision: "AI-first feedback loop" },
        ].map((item, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 32, padding: "32px 0", borderBottom: `1px solid ${P.sand}`, alignItems: "start" }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: P.dark, margin: 0, lineHeight: 1.5 }}>{item.q}</h4>
              <p style={{ fontSize: 14, color: P.warmGray, lineHeight: 1.7, margin: 0 }}>{item.a}</p>
              <span style={{ padding: "6px 14px", borderRadius: 4, background: P.parchment, color: P.bark, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", border: `1px solid ${P.sand}` }}>{item.decision}</span>
            </div>
          </FadeIn>
        ))}
      </Section>

      {/* ════ SUCCESS METRICS ════ */}
      <Section bg={P.warmBlack}>
        <FadeIn>
          <Label>Measuring Success</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.cream, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 20px" }}>How I would know it's working</h2>
          <p style={{ fontSize: 15, color: P.stone, lineHeight: 1.8, maxWidth: 640, margin: "0 0 56px" }}>
            Designing the product is only half the job. I also defined the key metrics I would track post-launch to validate that StudioKey is actually solving the problems it set out to solve.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: Calendar, metric: "Booking Completion Rate", target: "Target: 85%+", description: "Percentage of users who start the booking flow and finish it. A high rate means the experience is frictionless. If it drops, something in the flow is creating hesitation.", color: P.sage },
            { icon: Star, metric: "Feedback Submission Rate", target: "Target: 30%+ of attendees", description: "How many students leave feedback after class. This is the engine behind AI coaching. If students aren't submitting, the whole feedback loop breaks down.", color: P.accent },
            { icon: Users, metric: "Instructor Retention (90-day)", target: "Target: 90%+", description: "Are instructors staying on the platform? If they're leaving, it means we're not delivering enough value through earnings visibility and coaching insights.", color: P.stone },
            { icon: BarChart3, metric: "Monthly Active Studio Rate", target: "Target: 80%+", description: "Studios that log in and use the platform at least 3x per week. Low engagement signals that the dashboard isn't surfacing useful enough information.", color: P.sage },
            { icon: Zap, metric: "AI Insight Action Rate", target: "Target: 40%+", description: "How often managers or instructors act on an AI recommendation within 7 days. If insights are being ignored, the AI needs to get smarter or more specific.", color: P.accent },
            { icon: DollarSign, metric: "Net Revenue Retention", target: "Target: 110%+", description: "Revenue from existing customers over time, including upgrades. Above 100% means studios are growing with us and moving up tiers, which validates the pricing model.", color: P.stone },
          ].map((kpi, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ background: `${P.cream}06`, borderRadius: 14, padding: 24, border: `1px solid ${P.warmGray}20`, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${kpi.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <kpi.icon size={16} color={kpi.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: P.cream }}>{kpi.metric}</div>
                    <div style={{ fontSize: 11, color: P.sage, fontWeight: 500 }}>{kpi.target}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: P.mutedText, lineHeight: 1.6, margin: 0 }}>{kpi.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════ PRICING STRATEGY ════ */}
      <Section bg={P.parchment}>
        <FadeIn>
          <Label>Business Model</Label>
          <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 20px" }}>Pricing designed to scale with you</h2>
          <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, maxWidth: 640, margin: "0 0 56px" }}>
            StudioKey is built for smaller studios that want enterprise-level tools without the enterprise price tag. Our tiers are designed so you can start small and grow with the platform. As your business scales, we scale with you.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { name: "Starter", price: "$29", desc: "For small studios ready to grow", features: ["Up to 3 instructors", "Up to 100 members", "Scheduling & booking", "Basic AI insights", "Reporting & analytics"], popular: false },
            { name: "Studio", price: "$59", desc: "For growing boutique studios", features: ["Up to 8 instructors", "Up to 500 members", "Full AI insights", "Marketing emails", "Priority support"], popular: true },
            { name: "Pro", price: "From $120", desc: "For established multi-room studios", features: ["Unlimited instructors", "Unlimited members", "Messenger AI (24/7)", "Dedicated onboarding", "Custom quote"], popular: false },
          ].map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ background: P.white, borderRadius: 16, padding: 32, border: plan.popular ? `2px solid ${P.sageDark}` : `1px solid ${P.sand}`, position: "relative", height: "100%" }}>
                {plan.popular && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", borderRadius: 4, background: P.sageDark, color: P.white, fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: 18, fontWeight: 600, color: P.dark, margin: "0 0 4px" }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: P.mutedText, margin: "0 0 16px" }}>{plan.desc}</p>
                <div style={{ fontSize: 36, fontWeight: 300, color: P.dark, fontFamily: "'Georgia', serif", marginBottom: 4 }}>{plan.price}</div>
                <div style={{ fontSize: 13, color: P.mutedText, marginBottom: 24 }}>/month</div>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <CheckCircle size={14} color={P.sage} />
                    <span style={{ fontSize: 14, color: P.warmGray }}>{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ════ REFLECTION ════ */}
      <Section>
        <div style={{ maxWidth: 640 }}>
          <FadeIn>
            <Label>Reflection</Label>
            <h2 style={{ fontSize: 38, fontWeight: 400, color: P.dark, fontFamily: "'Georgia', serif", lineHeight: 1.25, margin: "0 0 24px" }}>What I learned</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, margin: "0 0 16px" }}>
              <strong style={{ color: P.dark }}>Domain expertise is a design superpower.</strong> Being an instructor didn't just help me empathize with users. It gave me intuition about what features mattered and what was noise. I could skip weeks of discovery because I'd already lived the problem.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, margin: "0 0 16px" }}>
              <strong style={{ color: P.dark }}>AI features need cost modeling from day one.</strong> It's easy to design an AI feature. It's hard to design one that doesn't destroy your margins. The Messenger AI cost analysis ($15-75/studio/month) directly shaped the pricing strategy and tier structure.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, margin: "0 0 16px" }}>
              <strong style={{ color: P.dark }}>The best product decisions are also business decisions.</strong> Choosing not to build a marketplace wasn't just a UX call. It was the entire brand positioning. Every design decision in StudioKey maps back to a strategic reason.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p style={{ fontSize: 15, color: P.warmGray, lineHeight: 1.8, margin: 0 }}>
              <strong style={{ color: P.dark }}>Prototyping builds conviction.</strong> Building an interactive prototype with real data, not just static mockups, made the product feel real. It's the difference between showing someone a drawing of a house and walking them through the front door.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ════ FOOTER ════ */}
      <div style={{ background: P.warmBlack, padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: P.mutedText, margin: 0 }}>StudioKey / Case Study by Ashley / 2026</p>
      </div>
    </div>
  );
}
