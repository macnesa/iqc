"use client";

import { useRef, useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap";

export default function ProjectApproach() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef([]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(headerRef.current, { type: "lines" });

      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, { y: 24, opacity: 0 });

      gsap.to(split.lines, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          once: true,
        },
      });

      gsap.set(stepsRef.current, { y: 24, opacity: 0 });

      gsap.to(stepsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
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
      className="relative w-full overflow-hidden bg-[#fffcf7] text-[#2f3b2f]"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/image_2026-01-28_20-39-35.png"
          alt=""
          className="h-full w-full object-cover opacity-[0.35]"
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 md:px-16 py-20 md:py-28">
        {/* LABEL */}
        <div className="mb-6 md:absolute md:left-16 md:top-28 md:mb-0">
          {/* MOBILE ONLY — CANELA */}
          <span className="block md:hidden text-[42px] font-[Canela] text-[#2f3b2f] leading-[1.1]">
            Our Approach
          </span>

          {/* DESKTOP ONLY — SMALL LABEL */}
          <span className="hidden md:block text-[11px] uppercase tracking-[0.25em] text-[#2f3b2f]/60">
            Our approach
          </span>
        </div>

        <div className="flex w-full flex-col md:flex-row">
          {/* LEFT SPACE (DESKTOP ONLY) */}
          <div className="hidden md:block md:w-[45%]" />

          {/* RIGHT */}
          <div className="w-full md:w-[55%] flex flex-col">
            {/* HEADER */}
            <div className="mb-16 md:mb-24 max-w-[520px]">
              <h2
                ref={headerRef}
                className="
                  font-normal
                  text-[clamp(18px,1.7vw,22px)]
                  leading-[1.45]
                  tracking-tight
                "
              >
                Our approach follows a structured and methodical process from early
                planning and technical review through to final handover, ensuring
                every project is executed with clarity, control, and consistent
                quality.
              </h2>
            </div>

            {/* STEPS */}
            <div className="flex flex-col divide-y divide-[#7d8f7d]/25">
              {STEPS.map((step, i) => (
                <div
                  key={step.index}
                  ref={(el) => (stepsRef.current[i] = el)}
                  className="
                    relative
                    py-10
                    md:py-14
                    md:grid md:grid-cols-[1.4fr_1fr]
                    md:gap-16
                  "
                >
                  {/* MOBILE NUMBER */}
                  <span className="absolute right-0 top-10 text-sm opacity-70 md:hidden">
                    ({step.index})
                  </span>

                  {/* TITLE */}
                  <h3
                    className="
                      font-[Canela]
                      pr-10
                      md:pr-0
                      text-[clamp(22px,5vw,32px)]
                      leading-[1.2]
                      tracking-[-0.015em]
                    "
                  >
                    <span className="hidden md:inline mr-3 align-top text-[clamp(14px,1.1vw,16px)] font-medium tracking-wide">
                      ({step.index})
                    </span>
                    {step.title}
                  </h3>

                  {/* DESC */}
                  <p
                    className="
                      mt-4
                      md:mt-0
                      max-w-[420px]
                      text-[clamp(15px,4vw,17px)]
                      md:text-[clamp(15px,1.25vw,17px)]
                      leading-[1.5]
                      text-[#2f3b2f]/70
                    "
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
