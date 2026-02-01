"use client"
import Image from "next/image";
import React, { Fragment, useLayoutEffect, useRef, useContext, useState, useEffect, useMemo, useId } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);


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
  const [opened, setOpened] = useState(false);
  const sectionRef = useRef(null);

  // =========================
  // AUTO OPENING SEQUENCE
  // =========================
  useEffect(() => {
    const t = setTimeout(() => {
      setOpened(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // =========================
  // SLICE CONFIG (LOCKED)
  // =========================
  const SLICE_COUNT = 10;
  const SLICE_HEIGHT = 100 / SLICE_COUNT;
  const SLICE_DURATION = 1.9;
  const SLICE_STAGGER = 0.11;

  const SLICE_CLEAN_TIME =
    (SLICE_COUNT - 1) * SLICE_STAGGER + SLICE_DURATION;

  // =========================
  // SCROLL PARALLAX (LOGO)
  // =========================
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // =========================
  // BG ZOOM (AFTER SLICE CLEAN)
  // =========================
  const bgControls = {
    scale: opened ? 1.045 : 1,
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ================= HERO BACKGROUND ================= */}
      <motion.div
        initial={{ scale: 1 }}
        animate={bgControls}
        transition={{
          duration: 7,
          delay: opened ? SLICE_CLEAN_TIME : 0,
          ease: [0.22, 0.0, 0.2, 1],
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/BG - 1.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* ================= HERO CONTENT (LOGO PARALLAX PRESERVED) ================= */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div
          style={{
            y: logoY,
            scale: logoScale,
          }}
          className="will-change-transform"
        >
          <div className="w-[180px] md:w-[260px] lg:w-[320px]">
            <Image
              src="/images/Logo IQC - White A.png"
              alt="IQC Logo"
              width={640}
              height={240}
              priority
              className="h-auto w-full select-none"
            />
          </div>
        </motion.div>
      </div>

      {/* ================= OPENING SHUTTER ================= */}
      <AnimatePresence>
        {!opened && (
          <div className="pointer-events-none absolute inset-0 z-50">
            {Array.from({ length: SLICE_COUNT }).map((_, i) => {
              const reverseIndex = SLICE_COUNT - i - 1;

              return (
                <motion.div
                  key={i}
                  initial={{ height: "100%" }}
                  animate={{ height: "0%" }}
                  exit={{ height: "0%" }}
                  transition={{
                    duration: SLICE_DURATION,
                    delay: reverseIndex * SLICE_STAGGER,
                    ease: [0.45, 0.0, 0.55, 1],
                  }}
                  className="absolute left-0 w-full bg-white"
                  style={{
                    top: `${i * SLICE_HEIGHT}%`,
                    height: `${SLICE_HEIGHT}%`,
                    transformOrigin: "top",
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function About() {
  const sectionRef = useRef(null);
  const leadRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ================= LEAD SPLIT ================= */
      const leadSplit = new SplitText(leadRef.current, { type: "lines" });

      leadSplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(leadSplit.lines, {
        y: 32,          // ⬆️ lebih tegas
        opacity: 0.15,  // jelas belum hadir
      });

      gsap.to(leadSplit.lines, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.07, // ⬅️ rhythm lebih hidup
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 52%",
          once: true,
        },
      });

      /* ================= BODY SPLIT ================= */
      const bodySplit = new SplitText(bodyRef.current, { type: "lines" });

      bodySplit.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(bodySplit.lines, {
        y: 22,
        opacity: 0.2,
      });

      gsap.to(bodySplit.lines, {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.055,
        delay: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#F3F4F5] text-neutral-900"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <Image
          src="/images/image_2026-01-28_15-42-033.png"
          alt="Architectural blueprint background"
          fill
          priority
          className="object-cover opacity-[0.08]"
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-[820px] px-10 text-left">
        {/* LEAD */}
        <p
          ref={leadRef}
          className="mb-14 text-[30px] leading-[1.25] tracking-tight text-neutral-900"
        >
          We are a Bali-based construction and quality control company built on
          international experience and local insight. Our team has delivered
          major projects across the GCC — a region renowned for its demanding
          standards of quality and precision. We bring that same commitment to
          professionalism and on-time delivery to every project in Bali.
        </p>

        {/* BODY */}
        <p
          ref={bodyRef}
          className="max-w-[640px] text-[17px] leading-[1.7] text-neutral-700"
        >
          With years on the island and a deep understanding of the Balinese
          market, we recognize the importance of clear communication, dependable
          supervision, and efficient execution. Our goal is simple — to deliver
          construction that is well-managed, transparent, and built to last.
        </p>
      </div>
    </section>
  );
}

function VisionMissionPurpose() {
  const ITEMS = [
    {
      title: "VISION",
      body:
        "To be a trusted leader in Bali’s construction industry, delivering projects with high standards, on-time performance, and lasting quality.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "MISSION",
      body:
        "To deliver quality construction through transparency, professionalism, and clear communication, ensuring every project is managed efficiently and completed on schedule.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    },
    {
      title: "PURPOSE",
      body:
        "To raise the standard of construction in Bali by building trust, accountability, and long-term value — not only in structures, but in the entire construction process.",
      image:
        "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  return (
    <section
      data-theme="light"
      className="relative flex h-screen w-full items-center bg-[#F3F4F5] text-neutral-900"
    >
      <div className="mx-auto w-full max-w-7xl px-12">
        <div className="grid h-[480px] grid-cols-1 md:grid-cols-3">
          {ITEMS.map((item, index) => {
            const isLast = index === ITEMS.length - 1;

            return (
              <div
                key={item.title}
                className={`group relative overflow-hidden ${
                  !isLast ? "border-r border-neutral-300" : ""
                }`}
              >
                {/* ===== IMAGE (HOVER ONLY) ===== */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* ===== DARK OVERLAY ===== */}
                <div className="absolute inset-0 bg-neutral-900 opacity-0 transition-opacity duration-500 group-hover:opacity-80" />

                {/* ===== TITLE (FIXED CENTER) ===== */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <h3 className="text-[33px] font-semibold tracking-tight  transition-colors duration-500 group-hover:text-white">
                    {item.title}
                  </h3>
                </div>

                {/* ===== BODY (REVEAL, LEFT-ALIGNED, SAFE WIDTH) ===== */}
                <div className="absolute inset-x-0 top-[60%] z-10 px-10">
                  <p className="max-w-[360px] text-left text-[14px] leading-[1.8] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function ScopeOfServices() {
  const [activeIndex, setActiveIndex] = useState(null);

  const SERVICES = [
    {
      title: "Consultation & Feasibility",
      desc: "Early-stage project assessment, cost estimation, and technical advice.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600",
    },
    {
      title: "Project Management",
      desc: "Coordination of timelines, resources, and contractors from start to finish.",
      image:
        "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?q=80&w=1600",
    },
    {
      title: "Construction & Execution",
      desc: "Full construction services covering all structural and architectural works.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600",
    },
    {
      title: "Fit-Out & Finishing Works",
      desc: "Interior and exterior finishing tailored to project requirements.",
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600",
    },
    {
      title: "Quality Control & Assurance",
      desc: "Inspection, testing, and verification across all stages of construction.",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600",
    },
    {
      title: "Renovation & Maintenance",
      desc: "Structural or aesthetic upgrades and ongoing upkeep.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    },
    {
      title: "Health, Safety & Environment (HSE)",
      desc: "Implementation of safety and environmental compliance standards.",
      image:
        "https://i.pinimg.com/1200x/cc/8f/aa/cc8faa35350040544fa3c0429b828087.jpg",
    },
  ];
  

  return (
    <section className="relative min-h-screen bg-[#F3F4F5] text-black px-4 sm:px-[6vw] py-16 sm:py-[14vh]">
      <ul>
        {SERVICES.map((item, i) => {
          const isFirst = i === 0;
          const isLast = i === SERVICES.length - 1;
          const isActive = activeIndex === i;

          return (
            <li
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className={`
                relative
                grid
                grid-cols-[45%_55%]
                lg:grid-cols-[40%_10%_50%]
                gap-x-4
                py-6 sm:py-[3.5vh]
                border-black/15
                ${isFirst ? "border-t" : "border-t"}
                ${isLast ? "border-b" : ""}
              `}
            >
              {/* TITLE */}
              <div
                className="
                  text-[clamp(18px,4vw,30px)]
                  font-base
                  lg:whitespace-nowrap
                  tracking-[-1.05]
                "
              >
                {item.title}
              </div>

              {/* GAP — DESKTOP ONLY */}
              <div className="hidden lg:block" />

              {/* DESC */}
              <div className="relative">
                <div
                  className="
                    text-[14px]
                    sm:text-[15px]
                    leading-[1.8]
                    opacity-60
                    max-w-[320px]
                  "
                >
                  {item.desc}
                </div>

                {/* IMAGE — DESKTOP ONLY */}
                <div
                  className={`
                    pointer-events-none
                    absolute
                    top-1/2
                    right-0
                    z-2
                    hidden lg:block
                    w-[23vw]
                    h-[22vh]
                    -translate-y-1/2
                    transition-all duration-500 ease-out
                    ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-6"
                    }
                  `}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}


function OurProjectApproach() {
  const STEPS = [
    {
      index: "01",
      title: "Planning & Technical Review",
      desc:
        "Detailed project assessment and coordination to align design, schedule, and resources.",
    },
    {
      index: "02",
      title: "Materials Quality Verification",
      desc:
        "Careful inspection and approval of materials to meet required standards.",
    },
    {
      index: "03",
      title: "Skilled Construction Execution",
      desc:
        "Professional supervision and workmanship throughout every phase of construction.",
    },
    {
      index: "04",
      title: "Regular Site Inspections & Reporting",
      desc:
        "Ongoing monitoring and transparent communication to ensure quality and progress.",
    },
    {
      index: "05",
      title: "Final Testing, Commissioning & Handover",
      desc:
        "Comprehensive checks, documentation, and client handover upon completion.",
    },
  ];

  return (
    <section
      data-theme="light"
      className="relative w-full overflow-hidden bg-[#F3F4F5] text-[#2f3b2f]"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/image_2026-01-28_20-39-35.png"
          alt=""
          className="h-full w-full object-cover opacity-[0.25]"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full px-16 py-28">
        <div className="flex w-full">
          {/* LEFT EMPTY SPACE — 45% */}
          <div className="w-[45%]" />

          {/* RIGHT CONTENT — 55% */}
          <div className="w-[55%] flex flex-col divide-y divide-[#7d8f7d]/25">
            {STEPS.map((step) => (
              <div
                key={step.index}
                className="grid grid-cols-[1.4fr_1fr] gap-16 py-20 items-start"
              >
                {/* INDEX + TITLE */}
                <h3 className="text-[32px] font-base leading-[1.15] tracking-tight">
                  <span className="mr-3 text-[14px] font-medium tracking-wide align-top">
                    ({step.index})
                  </span>
                  {step.title}
                </h3>

                {/* DESC — TETAP SEJAJAR */}
                <p className="max-w-[420px] text-[15px] leading-[1.9] text-[#2f3b2f]/70">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const ITEMS = [
    {
      title: "We Plan with Precision",
      desc:
        "Every project starts with clear timelines, budgets, and technical coordination.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      title: "We Supervise Daily",
      desc:
        "Consistent on-site management ensures progress and quality.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 11h18M5 7h14M7 15h10" />
        </svg>
      ),
    },
    {
      title: "We Communicate Clearly",
      desc:
        "Updates, reporting, and client feedback are part of our process.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
      ),
    },
    {
      title: "We Deliver on Time",
      desc:
        "Schedules are planned realistically and tracked closely.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      title: "We Control Quality",
      desc:
        "Materials and workmanship are inspected at every stage.",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3l8 4v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      data-theme="light"
      className="relative w-screen bg-[#2c3627] text-white"
    >
      <div className="mx-auto max-w-none px-6 sm:px-10 lg:px-24 py-24">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-20">

          {ITEMS.map((item, i) => (
            <div key={i} className="relative px-6">

              {/* vertical divider (desktop only) */}
              {i !== ITEMS.length - 1 && (
                <div className="hidden lg:block absolute top-0 right-0 h-full w-px bg-white/20" />
              )}

              {/* icon */}
              <div className="mb-6 text-white/80">
                {item.icon}
              </div>

              {/* title */}
              <h4 className="text-[15px] font-semibold mb-4">
                {item.title}
              </h4>

              {/* description */}
              <p className="text-[14px] leading-[1.8] text-white/70 max-w-[40ch]">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

function CoreValues() {
  const CORE_VALUES = [
    {
      id: "Craftsmanship",
      title: "Craftsmanship",
      text:
        "We take pride in our work. Every structure we build reflects attention to detail, solid execution, and long-term durability.",
    },
    {
      id: "Transparency",
      title: "Transparency",
      text:
        "We believe clear communication builds trust. We keep our clients informed and involved from start to finish.",
    },
    {
      id: "Reliability",
      title: "Reliability",
      text:
        "We deliver on our word. Every project is managed carefully, completed on schedule, and built to the standards we promise.",
    },
    {
      id: "Accountability",
      title: "Accountability",
      text:
        "We stand by our commitments — to our clients, our team, and the quality of our work.",
    },
    {
      id: "Respect",
      title: "Respect",
      text:
        "We value the people, communities, and culture that make Bali unique, and approach every project with that respect in mind.",
    },
  ];

  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const BASE_OFFSET = 140;
      const REVEAL_RANGE = 200;
      const HOLD_ZONE = 140;

      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: 36,
            filter: "blur(16px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${i * BASE_OFFSET} bottom-=20%`,
              end: `top+=${i * BASE_OFFSET + REVEAL_RANGE} bottom-=20%`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `top+=${i * BASE_OFFSET + HOLD_ZONE} bottom-=20%`,
          end: `top+=${i * BASE_OFFSET + HOLD_ZONE + BASE_OFFSET} bottom-=20%`,
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
          invalidateOnRefresh: true,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden text-white py-24"
      style={{
        paddingBottom: "260px", // buffer aman untuk house image
      }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#2c3627]" />

      {/* TEXTURE */}
      <div className="absolute inset-0 z-[5] opacity-10 pointer-events-none">
        <Image
          src="/images/image_2026-01-28_20-39-35.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-30 grid grid-cols-12 px-24">
        {/* LEFT — DESCRIPTION */}
        <div className="col-span-5 flex items-start">
          <p className="max-w-xl text-[22px] tracking-tight leading-[1.2] text-white/90 transition-opacity duration-300">
            {CORE_VALUES[activeIndex].text}
          </p>
        </div>

        {/* RIGHT — TITLES */}
        <div className="col-span-7 flex items-start justify-end">
          <div className="space-y-3 text-right">
            {CORE_VALUES.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[i] = el)}
                className={`text-[56px] font-base tracking-tight transition-colors duration-300 ${
                  i === activeIndex ? "text-white" : "text-white/35"
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOUSE IMAGE — DECOR */}
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

      {/* MOBILE BLOCK */}
      <div className="fixed inset-0 z-[999] hidden items-center justify-center bg-[#2c3627] text-center text-sm text-white md:hidden">
        Desktop only section.
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
    <section className="bg-[#F3F4F5] py-40 overflow-x-hidden">
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
                  pt-14
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
     <OurProjectApproach/>
     <ScopeOfServices/>
     <WhyChooseUs/>
     <KataraSection/>
     <Footer/>
     </>
  );
}
