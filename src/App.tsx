import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Projects", "Experience", "Skills", "Contact"];

const PROJECTS = [
  {
    id: "01",
    title: "Yeast Life Support Rocket Payload",
    category: "Aerospace",
    org: "Space Technologies and Rocketry",
    tags: ["SolidWorks", "Python", "Fluid Systems"],
    description:
      "Designed a life support payload providing proof-of-concept for organ viability in deep space. System diffuses CO₂ out of fluid during rocket travel and sustains yeast metabolism. Components include a peristaltic pump (cardiovascular), PDMS gas exchanger (pulmonary), and thermos reaction chamber (respiration).",
    specs: { membrane: "100μm PDMS", pump: "Peristaltic", method: "SLA print" },
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=520&fit=crop&auto=format",
    year: "2024–2026",
  },
  {
    id: "02",
    title: "Wind Turbine",
    category: "Energy",
    org: "3D Design Project",
    tags: ["SolidWorks FEA", "Topology Opt.", "GD&T"],
    description:
      "Radially symmetric wind tower designed to resist aerodynamic forces from all directions. Low angle of attack, 3-blade airfoil design for stable lift. Von Mises FEA stress analysis and topology optimization yielded a structure optimized for minimal deflection. Achieved 12.8% efficiency vs. 15.6 W available wind power.",
    specs: { efficiency: "12.8%", analysis: "Von Mises", blades: "3-blade" },
    image: "https://images.unsplash.com/photo-1563289969-fc4d8598e048?w=800&h=520&fit=crop&auto=format",
    year: "2024",
  },
  {
    id: "03",
    title: "Automatic Dog Pill Dispenser",
    category: "Mechatronics",
    org: "Product Design Project",
    tags: ["Onshape", "Arduino", "C++"],
    description:
      "Automated pill dispenser that evenly coats flavor around a dog pill to aid medication compliance. Prototype automatically coats 1.37 mL average dog pill using a lead screw, motor, and syringe. Included hand calculations for fluid flow, power transmission, and electrical component specification.",
    specs: { dose: "1.37 mL", actuation: "Lead screw", UI: "LCD + buttons" },
    image: "https://images.unsplash.com/photo-1638959492386-f9a68d55c374?w=800&h=520&fit=crop&auto=format",
    year: "2024",
  },
  {
    id: "04",
    title: "IoT Drumstick Tutor",
    category: "Electronics",
    org: "Electronic Design Project",
    tags: ["ESP-32", "Python", "PID Control"],
    description:
      "Tactile IoT drumming system that trains timing, technique, and form. Three ESP-32 microcontrollers coordinate: IMU/FSR force sensing on the drumstick, ultrasonic sensor for drum-center alignment, and a brush motor that holds a demonstrating drumstick at precise angles. PID-tuned motor achieves precise angle matching.",
    specs: { MCUs: "3× ESP-32", sensors: "IMU + FSR", tempo: "Custom BPM" },
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&h=520&fit=crop&auto=format",
    year: "2025",
  },
];

const EXPERIENCE = [
  {
    role: "Lab Systems Test Engineering Intern",
    company: "The Boeing Company",
    location: "Long Beach, CA",
    period: "Summer 2026",
    bullets: [
      "Engineered a C/C++ software GUI application to manage 30+ discrete signals, utilizing shared memory for synchronized read/write buffers and circular queue implementation",
      "Modernized desktop simulation software by building a C/C++ monitoring window for ARINC 429 bus protocol to streamline signal conversion",
      "Executed test procedures on VMEbus chassis by analyzing bus addresses and probing test points to verify card initialization",
    ],
  },
  {
    role: "Product Quality Engineering Intern",
    company: "Wisk Aero — Boeing Subsidiary",
    location: "Mountain View, CA",
    period: "Summer 2025",
    bullets: [
      "Spearheaded an automated dashboard of Non-conformance Reports (NCRs) to categorize 1,200+ manufacturing defects, summarize design changes, and identify proactive measures to improve production flows",
      "Executed a Python NLP pipeline to sort defect reports by key terms, expanding defect coverage by 140%",
      "Led a cross-functional initiative with 15+ engineers to publish standardized firmware logging processes for 10+ components",
    ],
  },
  {
    role: "Embedded Systems Intern",
    company: "CITRIS Banatao Institute — UC Berkeley",
    location: "Berkeley, CA",
    period: "Summer 2024",
    bullets: [
      "Refined PCB designs for manufacturability in KiCAD, integrating IMUs, thermal cameras, and Bluetooth sensors",
      "Trained and designed TensorFlow algorithms for real-time wildfire hazard detection on an IoT-powered drone and power grid safety system",
    ],
  },
  {
    role: "Dynamics Engineer",
    company: "CalSol — UC Berkeley Formula Solar Car",
    location: "Berkeley, CA",
    period: "Jan 2026 – Present",
    bullets: [
      "Coded a MATLAB program to tune pedal ratios, optimizing brake requirements and reducing forward bias",
      "Designed and manufactured a custom caliper mount to reduce stress concentrations and increase safety factors by 200%",
      "Machined and tested 10+ carbon fiber A-arms via destructive Instron tests and epoxy injection",
    ],
  },
];

const SKILLS = [
  { name: "SolidWorks / Siemens NX / Onshape", level: 92, category: "CAD" },
  { name: "ANSYS CFD / SolidWorks FEA", level: 85, category: "Simulation" },
  { name: "Python / MATLAB / C++", level: 88, category: "Coding" },
  { name: "CNC / Mill / Lathe Machining", level: 80, category: "Machining" },
  { name: "FDM / SLA 3D Printing", level: 90, category: "Prototyping" },
  { name: "PCB Design (KiCAD)", level: 75, category: "Electronics" },
  { name: "GD&T / DFM", level: 87, category: "Standards" },
  { name: "LabView / Oscilloscope / FMEA", level: 82, category: "Testing" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SkillBar({ name, level, category }: { name: string; level: number; category: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs" style={{ color: "var(--primary)" }}>{category}</span>
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{name}</span>
        </div>
        <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>{level}%</span>
      </div>
      <div className="h-px w-full" style={{ background: "var(--muted)" }}>
        <div
          className="h-px transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${level}%` : "0%",
            background: "linear-gradient(90deg, var(--primary), rgba(0,212,255,0.4))",
          }}
        />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <article
      className="project-card flex flex-col"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 200, background: "#0a0e1a" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scanline-overlay"
          style={{ opacity: 0.7, filter: "grayscale(20%) contrast(1.1)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--card) 0%, transparent 50%)" }}
        />
        <div className="absolute top-3 left-3">
          <span
            className="font-mono text-xs px-2 py-1"
            style={{
              background: "rgba(0,212,255,0.15)",
              color: "var(--primary)",
              border: "1px solid rgba(0,212,255,0.3)",
            }}
          >
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
          {project.year}
        </div>
        <div
          className="absolute bottom-3 left-3 font-mono text-2xl font-medium"
          style={{ color: "rgba(0,212,255,0.2)" }}
        >
          {project.id}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-wide" style={{ color: "var(--foreground)" }}>
            {project.title}
          </h3>
          <div className="font-mono text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
            {project.org}
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5"
              style={{
                background: "var(--muted)",
                color: "var(--secondary-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="mt-auto pt-4 grid grid-cols-3 gap-2 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {Object.entries(project.specs).map(([k, v]) => (
            <div key={k} className="text-center">
              <div className="font-mono text-xs font-medium" style={{ color: "var(--primary)" }}>{v}</div>
              <div className="font-mono text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{k}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeJob, setActiveJob] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const s of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(s.toLowerCase());
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(10,14,26,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center font-mono text-xs font-medium"
              style={{ border: "1px solid var(--primary)", color: "var(--primary)" }}
            >
              AW
            </div>
            <div>
              <div className="font-display text-base font-semibold tracking-widest uppercase">
                Allison Wang
              </div>
              <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                Mechanical Engineer · UC Berkeley
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`nav-link font-mono text-xs uppercase tracking-widest ${activeSection === link ? "active" : ""}`}
                style={{
                  color: activeSection === link ? "var(--primary)" : "var(--muted-foreground)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
              >
                {link}
              </button>
            ))}
            <a
              href="mailto:alwsanjose@gmail.com"
              className="font-mono text-xs uppercase tracking-widest px-4 py-2"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-6 transition-all duration-200"
                style={{
                  background: "var(--foreground)",
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(3px, 3px)"
                      : menuOpen && i === 2
                      ? "rotate(-45deg) translate(3px, -3px)"
                      : menuOpen && i === 1
                      ? "scaleX(0)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col px-6 pb-4" style={{ borderTop: "1px solid var(--border)" }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="font-mono text-xs uppercase tracking-widest text-left py-3 w-full"
                style={{
                  color: activeSection === link ? "var(--primary)" : "var(--muted-foreground)",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center blueprint-grid"
        style={{ paddingTop: 64 }}
      >
        {["top-20 left-6", "top-20 right-6", "bottom-12 left-6", "bottom-12 right-6"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} hidden lg:block`} style={{ opacity: 0.4 }}>
            <div
              className="w-6 h-6"
              style={{
                borderTop: i < 2 ? "1px solid var(--primary)" : "none",
                borderBottom: i >= 2 ? "1px solid var(--primary)" : "none",
                borderLeft: i % 2 === 0 ? "1px solid var(--primary)" : "none",
                borderRight: i % 2 === 1 ? "1px solid var(--primary)" : "none",
              }}
            />
          </div>
        ))}

        <div className="max-w-7xl mx-auto px-6 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px" style={{ background: "var(--primary)" }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                  Engineering Portfolio · 2026
                </span>
              </div>

              <h1 className="font-display font-black leading-none mb-3" style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
                <span className="block" style={{ color: "var(--foreground)" }}>ALLISON</span>
                <span className="block" style={{ color: "var(--primary)" }}>WANG</span>
              </h1>

              <div className="font-mono text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
                B.S. Mechanical Engineering · UC Berkeley · GPA 3.8 · May 2027
              </div>

              <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: "var(--muted-foreground)" }}>
                I'm a motivated engineer looking to use my <strong style={{ color: "var(--foreground)" }}>mechanical design</strong>, <strong style={{ color: "var(--foreground)" }}>testing</strong>, and <strong style={{ color: "var(--foreground)" }}>coding</strong> skills to tackle tough, impactful problems.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("Projects")}
                  className="font-mono text-sm uppercase tracking-widest px-6 py-3"
                  style={{
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  View Projects
                </button>
               <a
                href="https://raw.githubusercontent.com/alliwang73/portfolio/src/imports/Allison_Wang_Resume.pdf"
                className="font-mono text-sm uppercase tracking-widest px-6 py-3 transition-colors"
                style={{
                  background: "transparent",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                Resume
              </a>

              </div>

              <div className="grid grid-cols-3 gap-4 mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
                {[
                  { value: "4", label: "Projects" },
                  { value: "3.8", label: "GPA" },
                  { value: "3×", label: "Internships" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-bold" style={{ color: "var(--primary)" }}>{s.value}</div>
                    <div className="font-mono text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="relative hidden lg:block">
              <div
                className="relative overflow-hidden"
                style={{ border: "1px solid var(--border)", height: 500, background: "#0a0e1a" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=900&h=600&fit=crop&auto=format"
                  alt="Rocket launch — aerospace engineering inspiration"
                  className="w-full h-full object-cover scanline-overlay"
                  style={{ opacity: 0.65, filter: "grayscale(20%) contrast(1.15)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,212,255,0.07) 0%, transparent 60%), linear-gradient(to bottom, transparent 60%, var(--background) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className="font-mono text-xs p-3"
                    style={{
                      background: "rgba(10,14,26,0.88)",
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <span style={{ color: "var(--primary)" }}>FIG 1.1</span> — Space Technologies and Rocketry · Yeast Life Support Payload
                  </div>
                </div>
                <div className="absolute top-3 right-3 font-mono text-xs" style={{ color: "rgba(0,212,255,0.4)" }}>
                  UC Berkeley · 2026
                </div>
              </div>
              <div
                className="absolute -bottom-3 -right-3 w-full h-full -z-10"
                style={{ border: "1px solid rgba(0,212,255,0.1)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24" style={{ background: "var(--secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest section-rule" style={{ color: "var(--primary)" }}>
                Selected Work
              </span>
            </div>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}>
              ENGINEERING<br />
              <span style={{ color: "var(--primary)" }}>PROJECTS</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 blueprint-dots">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-widest section-rule" style={{ color: "var(--primary)" }}>
                Work History
              </span>
            </div>
            <h2 className="font-display font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}>
              RELEVANT<br />
              <span style={{ color: "var(--primary)" }}>EXPERIENCE</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tab sidebar */}
            <div className="flex flex-col gap-1">
              {EXPERIENCE.map((job, i) => (
                <button
                  key={i}
                  onClick={() => setActiveJob(i)}
                  className="text-left px-4 py-4 transition-all"
                  style={{
                    background: activeJob === i ? "var(--card)" : "transparent",
                    borderLeft: `2px solid ${activeJob === i ? "var(--primary)" : "var(--border)"}`,
                    border: activeJob === i ? "1px solid var(--border)" : "1px solid transparent",
                    borderLeftWidth: 2,
                    cursor: "pointer",
                  }}
                >
                  <div className="font-mono text-xs uppercase tracking-widest" style={{ color: activeJob === i ? "var(--primary)" : "var(--muted-foreground)" }}>
                    {job.period}
                  </div>
                  <div className="text-sm font-medium mt-1" style={{ color: activeJob === i ? "var(--foreground)" : "var(--muted-foreground)" }}>
                    {job.company}
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div
              className="lg:col-span-2 p-6"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="mb-4">
                <h3 className="font-display text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                  {EXPERIENCE[activeJob].role}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="font-mono text-sm" style={{ color: "var(--primary)" }}>
                    {EXPERIENCE[activeJob].company}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {EXPERIENCE[activeJob].location}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {EXPERIENCE[activeJob].period}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {EXPERIENCE[activeJob].bullets.map((b, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div
                      className="w-1.5 h-1.5 flex-shrink-0 mt-1.5"
                      style={{ background: "var(--primary)" }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{b}</p>
                  </div>
                ))}
              </div>

              {/* Education note at bottom of Boeing */}
              {activeJob === 0 && (
                <div
                  className="mt-6 pt-5 flex gap-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--primary)" }}>
                      Education
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      University of California, Berkeley
                    </div>
                    <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                      B.S. Mechanical Engineering · GPA 3.8 · Fall 2023 – Spring 2027
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24" style={{ background: "var(--secondary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest section-rule" style={{ color: "var(--primary)" }}>
                  Capabilities
                </span>
              </div>
              <h2 className="font-display font-black mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}>
                TECHNICAL<br />
                <span style={{ color: "var(--primary)" }}>SKILLS</span>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted-foreground)" }}>
                Hands-on proficiency across simulation, mechanical design, rapid prototyping, embedded electronics, and software. Bilingual in English and Chinese.
              </p>

              <div
                className="p-5"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--primary)" }}>
                  Tools & Technologies
                </div>
                {[
                  ["Simulation", "ANSYS CFD, SolidWorks FEA"],
                  ["Prototyping", "Injection molding, CNC, Metal 3D print, Laser cut"],
                  ["Electronics", "KiCAD, Arduino, ESP-32, LabView, Oscilloscope"],
                  ["Software", "Python, MATLAB, Arduino, Java, C++"],
                  ["Standards", "GD&T, Root Cause Analysis, FMEA"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex gap-3 py-2.5"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <div className="w-1.5 h-1.5 flex-shrink-0 mt-1.5" style={{ background: "var(--primary)" }} />
                    <div>
                      <span className="font-mono text-xs font-medium" style={{ color: "var(--foreground)" }}>{label}: </span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {SKILLS.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 blueprint-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest section-rule" style={{ color: "var(--primary)" }}>
                  Get In Touch
                </span>
              </div>
              <h2 className="font-display font-black mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1 }}>
                LET'S<br />
                <span style={{ color: "var(--primary)" }}>CONNECT</span>
              </h2>
              <p className="text-sm leading-relaxed mb-10" style={{ color: "var(--muted-foreground)" }}>
                Currently seeking internship and full-time opportunities in mechanical engineering, mechatronics, and embedded systems. Open to roles in aerospace, robotics, and product development.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { label: "Email", value: "alwsanjose@gmail.com", href: "mailto:alwsanjose@gmail.com" },
                  { label: "Academic", value: "alliwang@berkeley.edu", href: "mailto:alliwang@berkeley.edu" },
                  { label: "LinkedIn", value: "linkedin.com/in/alli-wang", href: "https://www.linkedin.com/in/alli-wang/" },
                  { label: "Location", value: "San Jose, CA · Berkeley, CA" },
                  { label: "Phone", value: "(408) 265-8088" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 items-start pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                    <div className="font-mono text-xs pt-0.5 flex-shrink-0" style={{ color: "var(--primary)", minWidth: 80 }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm transition-colors"
                        style={{ color: "var(--foreground)", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm" style={{ color: "var(--foreground)" }}>{item.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {submitted ? (
                <div
                  className="flex flex-col items-center justify-center h-full text-center p-12"
                  style={{ border: "1px solid var(--border)", background: "var(--card)", minHeight: 340 }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-4 font-mono text-xl"
                    style={{ border: "1px solid var(--primary)", color: "var(--primary)" }}
                  >
                    ✓
                  </div>
                  <div className="font-display text-2xl font-bold mb-2">Message Sent</div>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                    Thanks for reaching out. I'll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {[
                    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  ].map((field) => (
                    <div key={field.id} className="flex flex-col gap-1.5">
                      <label className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formState[field.id as keyof typeof formState]}
                        onChange={(e) => setFormState({ ...formState, [field.id]: e.target.value })}
                        required
                        className="text-sm px-4 py-3 outline-none"
                        style={{
                          background: "var(--card)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about the opportunity or project..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      className="text-sm px-4 py-3 outline-none resize-none"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--foreground)",
                        fontFamily: "inherit",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-mono text-sm uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
                    style={{
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 600,
                    }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            © 2026 Allison Wang · San Jose, CA
          </div>
          <div className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            B.S. Mechanical Engineering · UC Berkeley · GPA 3.8
          </div>
          <div className="flex gap-6">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/alli-wang/" },
              { label: "WordPress", href: "https://alliwang.wordpress.com" },
              { label: "Email", href: "mailto:alwsanjose@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs transition-colors"
                style={{ color: "var(--muted-foreground)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
