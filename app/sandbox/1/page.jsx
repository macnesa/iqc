"use client"
import Image from "next/image";
import React, { Fragment, useLayoutEffect, useRef, useContext, useState, useEffect, useMemo, useId } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Header() {
  const headerRef = useRef(null);

  // =========================
  // SCROLL STATES
  // =========================
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const [hidden, setHidden] = useState(true);
  const [enabled, setEnabled] = useState(false);

  // =========================
  // SCROLL LOGIC
  // =========================
  useEffect(() => {
    const threshold = 8;

    const onScroll = () => {
      const currentY = window.scrollY;
      const triggerY = window.innerHeight * 1.01;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentY >= triggerY) {
            setEnabled(true);
          } else {
            setEnabled(false);
            setHidden(true);
            lastScrollY.current = currentY;
            ticking.current = false;
            return;
          }

          const diff = currentY - lastScrollY.current;

          if (diff > threshold) setHidden(true);
          if (diff < -threshold) setHidden(false);

          lastScrollY.current = currentY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // =========================
  // INTERSECTION → DATA-THEME
  // =========================
  useEffect(() => {
    if (!enabled) return;

    const header = headerRef.current;
    if (!header) return;

    const sections = document.querySelectorAll("[data-theme]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.dataset.theme = entry.target.dataset.theme;
          }
        });
      },
      {
        rootMargin: "-1px 0px -99% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <header
      ref={headerRef}
      data-theme="light"
      className={`
        group
        fixed top-0 left-0 z-50 w-full
        bg-transparent
        transition-transform duration-300 ease-out
        ${!enabled || hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div
        className="
          mx-auto
          flex items-center
          min-h-[64px] md:min-h-[72px]
          px-4 sm:px-6 md:px-15
        "
      >
        {/* LOGO — LEFT */}
        <a href="/" className="block">
          <img
            src="/images/Logo IQC - Black C.png"
            alt="IQC"
            className="
              w-20 sm:w-24 md:w-40
              h-auto
              transition
              group-data-[theme=dark]:invert
            "
          />
        </a>
      </div>
    </header>
  );
}


function Hero() {
  const sectionRef = useRef(null);

  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /**
   * PARALLAX MAPPING
   * --------------------------------------------------
   * Background: slow movement (far depth)
   * Logo: faster movement + subtle scale (near depth)
   */

  // Background moves slightly upward
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // Logo moves more noticeably
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  // Slight scale down to simulate depth-of-field pull
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // Optional opacity softening (very subtle)
  const logoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      {/* ================= BACKGROUND (FAR PLANE) ================= */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/BG - 1.jpg"
          alt="iQC Abstract Green Background"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ================= FOREGROUND CONTENT ================= */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          style={{
            y: logoY,
            scale: logoScale,
            opacity: logoOpacity,
          }}
          className="will-change-transform"
        >
          <div className="w-[180px] md:w-[260px] lg:w-[320px]">
            <Image
              src="/images/Logo IQC - White A.png"
              alt="Iconic Quality Consultants Logo"
              width={640}
              height={240}
              priority
              className="h-auto w-full select-none"
            />
          </div>
        </motion.div>
      </div>

      {/* ================= BOTTOM FADE ================= */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

function About() {
  return (
    <section data-theme="light" className="relative h-screen w-full overflow-hidden bg-neutral-100 text-neutral-900">
 

      {/* Blueprint — left, heavy & grounded */}
      <div className="absolute bottom-0 left-0">
        <Image
          src="/images/image_2026-01-28_15-42-03.png"
          alt="Architectural blueprint illustration"
          width={2000}
          height={1400}
          className="h-[62vh] w-auto max-w-none"
          priority
        />
      </div>

      {/* Text — right, optically aligned */}
      <div className="absolute right-24 top-[30%] max-w-[580px]">
        <h2 className="mb-10 text-[42px] font-semibold tracking-tight">
          ABOUT US
        </h2>

        <div className="space-y-7 text-[15px] leading-[1.7] text-neutral-700">
          <p>
            We are a Bali-based construction and quality control company built on
            international experience and local insight. Our team has delivered
            major projects across the GCC — a region renowned for its demanding
            standards of quality and precision. We bring that same commitment to
            professionalism and on-time delivery to every project in Bali.
          </p>

          <p>
            With years on the island and a deep understanding of the Balinese
            market, we recognize the importance of clear communication,
            dependable supervision, and efficient execution. Our goal is simple
            — to deliver construction that is well-managed, transparent, and
            built to last.
          </p>
        </div>
      </div>
    </section>
  );
}

function VisionMissionPurpose() {
  return (
    <section data-theme="dark" className="relative h-screen w-full overflow-hidden text-white">

      {/* ===== BACKGROUND BASE ===== */}
      <div className="absolute inset-0">
        <Image
          src="/images/BG - 2.jpg"
          alt="iQC Green Panel Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ===== DARK OVERLAY ===== */}
      <div className="absolute inset-0 z-[2] bg-black/30" />
 

      {/* ===== CONTENT (BOTTOM BAND LOCKED) ===== */}
      <div className="absolute inset-x-0 bottom-[21%] z-[3] px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 md:grid-cols-3">

          {/* ===== VISION ===== */}
          <div>
            <h3 className="mb-6 text-[32px] text-center font-bold tracking-[0.08em]">
              VISION
            </h3>
            <p className="max-w-sm text-[13px] leading-[1.9] text-white/80">
              To be a trusted leader in Bali’s construction industry,
              known for delivering projects that reflect high standards,
              on-time performance, and lasting quality.
            </p>
          </div>

          {/* ===== MISSION ===== */}
          <div>
            <h3 className="mb-6 text-[32px]  text-center font-bold tracking-[0.08em]">
              MISSION
            </h3>
            <p className="max-w-sm text-[13px] leading-[1.9] text-white/80">
              We aim to deliver quality construction with transparency,
              professionalism, and clear communication — ensuring
              every project is managed efficiently, completed on time,
              and exceeds expectations.
            </p>
          </div>

          {/* ===== PURPOSE ===== */}
          <div>
            <h3 className="mb-6 text-[32px]  text-center font-bold tracking-[0.08em]">
              PURPOSE
            </h3>
            <p className="max-w-sm text-[13px] leading-[1.9] text-white/80">
              We exist to raise the standard of construction in Bali by delivering projects built on trust, transparency,
              and long-term value. Our goal is not only to build
              structures, but to build confidence in the process —
              through reliability, accountability, and care in every detail.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function ScopeOfServices() {
  return (
    <section data-theme="light" className="relative h-screen w-full overflow-hidden bg-white text-black">

      {/* ===== LEFT CONTENT ===== */}
      <div className="relative z-10 flex h-full w-full">

        {/* ===== LEFT PANEL ===== */}
        <div className="relative flex h-full w-[60%] flex-col px-16 pt-5">
 

          {/* Title */}
          <h2 className="mb-4 text-[56px] font-bold tracking-tight">
            SCOPE OF SERVICES
          </h2>

          {/* Subtitle */}
          <p className="mb-14 max-w-xl text-[16px] text-black/70">
            We provide complete construction and quality control solutions
            from planning to delivery.
          </p>

          {/* ===== SERVICES TABLE ===== */}
          <div className="max-w-2xl space-y-4 text-[14px]">

            {[
              {
                title: "CONSULTATION & FEASIBILITY",
                desc: "Early-stage project assessment, cost estimation, and technical advice.",
              },
              {
                title: "PROJECT MANAGEMENT",
                desc: "Coordination of timelines, resources, and contractors from start to finish.",
              },
              {
                title: "CONSTRUCTION & EXECUTION",
                desc: "Full construction services covering all structural and architectural works.",
              },
              {
                title: "FIT-OUT & FINISHING WORKS",
                desc: "Interior and exterior finishing tailored to project requirements.",
              },
              {
                title: "QUALITY CONTROL & ASSURANCE",
                desc: "Inspection, testing, and verification across all stages of construction.",
              },
              {
                title: "RENOVATION & MAINTENANCE",
                desc: "Structural or aesthetic upgrades and ongoing upkeep.",
              },
              {
                title: "HEALTH, SAFETY & ENVIRONMENT (HSE)",
                desc: "Implementation of safety and environmental compliance standards.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-6 border-b border-black/30 pb-3"
              >
                <div className="w-[260px] font-semibold tracking-wide">
                  {item.title}
                </div>
                <div className="flex-1 text-black/70 italic">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== RIGHT IMAGE ===== */}
        <div className="relative h-full w-[40%]">
          <img
            src="https://i.pinimg.com/1200x/5f/95/b8/5f95b81b97e707a236904c7843862f8d.jpg"
            alt="Modern Green House"
            fill="true"
            className="object-cover"
            priority="true"
          />

          {/* subtle dark edge */}
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/25 to-transparent" />
        </div>

      </div>
    </section>
  );
}

function OurProjectApproach() {
  return (
    <section data-theme="light" className="relative w-full overflow-hidden bg-[#f6f7f5] text-[#2f3b2f]">

      {/* ===== SUBTLE CIRCULAR GRADIENT BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/image_2026-01-28_20-39-35.png"
          alt="Subtle background gradient"
          className="h-full w-full object-cover opacity-[0.25]"
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-16 py-28">

        {/* ===== HEADER ===== */}
        <div className="mb-28 flex items-start justify-between gap-12">
          <h2 className="max-w-3xl text-[64px] font-bold leading-[1.05] tracking-tight">
            OUR PROJECT APPROACH
          </h2>

          <p className="max-w-sm text-right text-[15px] leading-[1.7] text-[#2f3b2f]/70">
            Our process ensures precision, accountability,
            and consistency from start to finish.
          </p>
        </div>

        {/* ===== PROCESS STEPS ===== */}
        <div className="grid grid-cols-5 gap-12">

          {/* STEP 1 */}
          <div>
            <h4 className="text-[15px] font-semibold uppercase tracking-wide">
              Planning &<br />Technical Review
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/70">
              Detailed project assessment and coordination
              to align design, schedule, and resources.
            </p>

            <div className="mt-10 h-[280px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
                alt="Planning and technical review"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* STEP 2 */}
          <div>
            <h4 className="text-[15px] font-semibold uppercase tracking-wide">
              Materials Quality<br />Verification
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/70">
              Careful inspection and approval of materials
              to meet required standards.
            </p>

            <div className="mt-10 h-[280px] w-full overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1674273913289-8123021e022e"
                alt="Materials quality verification"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* STEP 3 */}
          <div>
            <h4 className="text-[15px] font-semibold uppercase tracking-wide">
              Skilled Construction<br />Execution
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/70">
              Professional supervision and workmanship
              throughout every phase of construction.
            </p>

            <div className="mt-10 h-[280px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd"
                alt="Construction execution"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* STEP 4 */}
          <div>
            <h4 className="text-[15px] font-semibold uppercase tracking-wide">
              Regular Site Inspections<br />& Reporting
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/70">
              Ongoing monitoring and transparent communication
              to ensure quality and progress.
            </p>

            <div className="mt-10 h-[280px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1590650153855-d9e808231d41"
                alt="Site inspection and reporting"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* STEP 5 */}
          <div>
            <h4 className="text-[15px] font-semibold uppercase tracking-wide">
              Final Testing,<br />Commissioning & Handover
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/70">
              Comprehensive checks, documentation,
              and client handover upon completion.
            </p>

            <div className="mt-10 h-[280px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Final handover"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section data-theme="light" className="relative w-full bg-white text-[#2f3b2f]">

      <div className="mx-auto max-w-7xl px-16 py-28">

        {/* ===== HEADER (TEXT CENTER ONLY) ===== */}
        <h2 className="text-center text-[48px] font-bold tracking-tight">
          WHY CHOOSE US
        </h2>

        {/* ===== DIVIDER TOP ===== */}
        <div className="mt-10 h-px w-full bg-[#2f3b2f]/30" />

        {/* ===== CONTENT GRID ===== */}
        <div className="mt-12 grid grid-cols-5 gap-10">

          {/* ITEM 1 */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wide">
              We Plan with Precision
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/75">
              Every project starts with clear timelines,
              budgets, and technical coordination.
            </p>
          </div>

          {/* ITEM 2 */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wide">
              We Supervise Daily
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/75">
              Consistent on-site management ensures
              progress and quality.
            </p>
          </div>

          {/* ITEM 3 */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wide">
              We Communicate Clearly
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/75">
              Updates, reporting, and client feedback
              are part of our process.
            </p>
          </div>

          {/* ITEM 4 */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wide">
              We Deliver on Time
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/75">
              Schedules are planned realistically
              and tracked closely.
            </p>
          </div>

          {/* ITEM 5 */}
          <div>
            <h4 className="text-[14px] font-semibold uppercase tracking-wide">
              We Control Quality
            </h4>
            <p className="mt-3 text-[13px] leading-[1.8] text-[#2f3b2f]/75">
              Materials and workmanship are
              inspected at every stage.
            </p>
          </div>

        </div>

        {/* ===== DIVIDER BOTTOM ===== */}
        <div className="mt-14 h-px w-full bg-[#2f3b2f]/30" />

      </div>
    </section>
  );
}
 
const CORE_VALUES = [
  {
    id: "craftsmanship",
    title: "CRAFTSMANSHIP",
    text:
      "We take pride in our work. Every structure we build reflects attention to detail, solid execution, and long-term durability.",
    left: "7%",
    top: "24%",
  },
  {
    id: "transparency",
    title: "TRANSPARENCY",
    text:
      "We believe clear communication builds trust. We keep our clients informed and involved from start to finish.",
    left: "26%",
    top: "36%",
  },
  {
    id: "reliability",
    title: "RELIABILITY",
    text:
      "We deliver on our word. Every project is managed carefully, completed on schedule, and built to the standards we promise.",
    left: "44%",
    top: "48%",
  },
  {
    id: "accountability",
    title: "ACCOUNTABILITY",
    text:
      "We stand by our commitments — to our clients, our team, and the quality of our work.",
    left: "61%",
    top: "60%",
  },
  {
    id: "respect",
    title: "RESPECT",
    text:
      "We value the people, communities, and culture that make Bali unique, and approach every project with that respect in mind.",
    left: "78%",
    top: "72%",
  },
];

 function CoreValues() {
  return (
    <section
      className="relative w-full overflow-hidden text-white"
      style={{
        height: "100vh",            // ⛔ tetap h-screen behavior
        paddingBottom: "220px",     // ✅ buffer aman untuk house image
      }}
    >
      {/* =====================================================
          BACKGROUND BASE
      ====================================================== */}
      <div className="absolute inset-0 z-0 bg-[#2c3627]" />

      {/* =====================================================
          TEXTURE (PASTI DI BAWAH SEMUA KONTEN)
      ====================================================== */}
      <div className="absolute inset-0 z-[5] opacity-10 pointer-events-none">
        <Image
          src="/images/image_2026-01-28_20-39-35.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* =====================================================
          LOGO — VISUAL LOCK
      ====================================================== */}
      <div className="absolute left-12 top-10 z-30 text-[11px] tracking-[0.28em] uppercase text-white/80">
        ICONIC QUALITY CONSULTANTS
      </div>

      {/* =====================================================
          RIGHT TITLE — VISUAL LOCK
      ====================================================== */}
      <div className="absolute right-20 top-[34%] z-30 max-w-md">
        <h2 className="text-[56px] font-bold leading-tight tracking-tight">
          CORE VALUES
        </h2>
        <p className="mt-6 text-[15px] leading-[1.8] text-white/80">
          Our work is guided by values shaped through years of experience abroad
          and a deep understanding of Bali. These principles define how we build,
          how we communicate, and how we deliver every project.
        </p>
      </div>

      {/* =====================================================
          VALUES — VIEWPORT-RELATIVE COORDINATES
      ====================================================== */}
      <div className="absolute inset-0 z-30">
        {CORE_VALUES.map((item) => (
          <Value
            key={item.id}
            left={item.left}
            top={item.top}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>

      {/* =====================================================
          HOUSE IMAGE — DECOR (STRICTLY BELOW CONTENT)
      ====================================================== */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
        <Image
          src="/images/image_2026-01-28_20-39-12.png"
          alt=""
          width={1920}
          height={800}
          priority
          className="w-full object-contain"
        />
      </div>

      {/* =====================================================
          MOBILE GUARD (DESKTOP ONLY SECTION)
      ====================================================== */}
      <div className="fixed inset-0 z-[999] hidden items-center justify-center bg-[#2c3627] text-center text-sm text-white md:hidden">
        <p className="max-w-xs leading-relaxed text-white/70">
          This section is optimized for larger screens to preserve visual
          clarity and composition.
        </p>
      </div>
    </section>
  );
}
 
function Value({ left, top, title, text }) {
  return (
    <div
      className="absolute max-w-[260px]"
      style={{ left, top }}
    >
      <div className="relative pl-6">
        {/* LINE */}
        <span
          className="absolute left-[2px] top-[6px] bg-white/55"
          style={{ height: "3.5rem", width: "1px" }}
        />

        {/* DOT */}
        <span
          className="absolute left-0 top-[6px] rounded-full bg-white"
          style={{ width: "6px", height: "6px" }}
        />

        <h4 className="text-[13px] font-semibold tracking-wide">
          {title}
        </h4>

        <p className="mt-2 text-[12px] leading-[1.7] text-white/80">
          {text}
        </p>
      </div>
    </div>
  );
}

function KataraSection() {
  const clusters = [
    {
      title: "Private Residences",
      images: {
        tall: "/images/capsule/22025364-7853-4189-8c33-093c1c1c085b 2.JPG",
        wide: "/images/capsule/5041364c-14f0-4b1b-ba03-fa23806b3cf8 2.JPG",
        medium: "/images/capsule/ca1a0e38-1775-4b6f-affb-234c1217281b 2.JPG",
      },
    },
    {
      title: "Private Residences",
      images: {
        tall: "/images/house/4b095765-4c75-447b-8121-2b7cf16fe831.JPG",
        wide: "/images/house/8b1b730d-2dbf-4f8d-8e06-61ea6f6506b9 2.JPG",
        medium: "/images/house/67603a1b-259c-4a0b-8e96-7cca103fb89f 2.JPG",
      },
    },
  ];

  return (
    <section className="bg-[#f5efe6] py-40 overflow-x-hidden">
      {clusters.map((cluster, index) => {
        const isEven = index % 2 === 0;

        // ===== refs =====
        const tallRef = useRef(null);
        const wideRef = useRef(null);
        const mediumRef = useRef(null);

        // ===== scroll progress =====
        const tallScroll = useScroll({
          target: tallRef,
          offset: ["start end", "end start"],
        }).scrollYProgress;

        const wideScroll = useScroll({
          target: wideRef,
          offset: ["start end", "end start"],
        }).scrollYProgress;

        const mediumScroll = useScroll({
          target: mediumRef,
          offset: ["start end", "end start"],
        }).scrollYProgress;

        // ===== parallax transforms (BALANCED) =====
        const tallY = useTransform(tallScroll, [0, 1], [-44, 44]);
        const wideY = useTransform(wideScroll, [0, 1], [-28, 28]);
        const mediumY = useTransform(mediumScroll, [0, 1], [-20, 20]);

        return (
          <div key={index} className="mb-56">
            <div className="w-full grid grid-cols-12 gap-x-5 gap-y-10 px-6 md:px-5 lg:px-10">

              {/* EMPTY SPACE — LEFT (ODD) */}
              {!isEven && <div className="col-span-0 md:col-span-3" />}

              {/* CONTENT BLOCK */}
              <div
                className={`
                  col-span-12 md:col-span-9
                  relative
                  grid grid-cols-12 gap-x-5 gap-y-10
                  pt-20
                  ${!isEven ? "[direction:rtl]" : ""}
                `}
              >
                {/* TITLE */}
                <h2 className="absolute top-0 left-0 text-2xl tracking-wide text-neutral-800">
                  {cluster.title}
                </h2>

                {/* TALL IMAGE */}
                <div
                  ref={tallRef}
                  className="col-span-5 row-span-2 relative aspect-[2/3] overflow-hidden"
                >
                  <motion.div
                    style={{ y: tallY }}
                    className="absolute inset-0 scale-[1.1]"
                  >
                    <Image
                      src={cluster.images.tall}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* WIDE IMAGE */}
                <div
                  ref={wideRef}
                  className="col-span-7 relative aspect-[16/10] overflow-hidden"
                >
                  <motion.div
                    style={{ y: wideY }}
                    className="absolute inset-0 scale-[1.08]"
                  >
                    <Image
                      src={cluster.images.wide}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                {/* MEDIUM IMAGE */}
                <div
                  ref={mediumRef}
                  className="col-span-6 -mt-4 relative aspect-[4/3] overflow-hidden"
                >
                  <motion.div
                    style={{ y: mediumY }}
                    className="absolute inset-0 scale-[1.07]"
                  >
                    <Image
                      src={cluster.images.medium}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </div>

              {/* EMPTY SPACE — RIGHT (EVEN) */}
              {isEven && <div className="col-span-0 md:col-span-3" />}
            </div>
          </div>
        );
      })}
    </section>
  );
}
 
function Footer() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/BG - 1.jpg"
          alt="iQC Green Abstract Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-12 lg:px-20">
        
        {/* Top tagline */}
        <div className="text-center">
          <p className="text-[11px] tracking-[0.4em] text-white/80">
            GLOBALLY INSPIRED, LOCALLY ROOTED
          </p>
        </div>

        {/* Center logo */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-[200px] md:w-[260px] lg:w-[300px]">
            <Image
              src="/images/Logo IQC - White C.png"
              alt="Iconic Quality Consultants Logo"
              width={600}
              height={260}
              priority
              className="h-auto w-full select-none"
            />
          </div>
        </div>

        {/* Bottom contact */}
        <div className="flex flex-col gap-6 text-xs md:flex-row md:items-end md:justify-between">
          
          {/* Left */}
          <div className="opacity-80">
            <span className="tracking-wide">CONTACT US</span>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-12">
            <div>
              <p className="mb-1 text-[10px] tracking-widest text-white/60">
                EMAIL
              </p>
              <a
                href="mailto:info@iconicqc.com"
                className="text-sm transition hover:text-white"
              >
                info@iconicqc.com
              </a>
            </div>

            <div>
              <p className="mb-1 text-[10px] tracking-widest text-white/60">
                ADDRESS
              </p>
              <p className="text-sm">Bali, Indonesia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

export default function Page() {
  return (
     <>
     <Header/>
     <Hero/>
     <About/>
     <VisionMissionPurpose/>
     <CoreValues/>
     <ScopeOfServices/>
     <OurProjectApproach/>
     <WhyChooseUs/>
     <KataraSection/>
     <Footer/>
     </>
  );
}
