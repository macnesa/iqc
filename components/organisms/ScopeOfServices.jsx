"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap";

export default function ScopeOfServices() {
  const [activeIndex, setActiveIndex] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  const SERVICES = [
    {
      title: "Consultation & Feasibility",
      desc: "Early-stage project assessment, cost estimation, and technical advice.",
      image:
        "https://i.pinimg.com/736x/54/c9/48/54c9480e739d4ca53af0714e3ec294c0.jpg",
    },
    {
      title: "Project Management",
      desc: "Coordination of timelines, resources, and contractors from start to finish.",
      image:
        "https://i.pinimg.com/1200x/a3/28/ce/a328ce34b6ad66466b7ab9b03ed4a924.jpg",
    },
    {
      title: "Construction & Execution",
      desc: "Full construction services covering all structural and architectural works.",
      image:
        "https://i.pinimg.com/736x/80/50/be/8050bebdb47f4018ac213261d26d9102.jpg",
    },
    {
      title: "Fit-Out & Finishing Works",
      desc: "Interior and exterior finishing tailored to project requirements.",
      image:
        "https://i.pinimg.com/1200x/55/29/82/552982431c45ab8479c50edd7c6575de.jpg",
    },
    {
      title: "Quality Control & Assurance",
      desc: "Inspection, testing, and verification across all stages of construction.",
      image:
        "https://i.pinimg.com/736x/ba/01/ff/ba01ffb8138f41bdf8c22ac18eac67a0.jpg",
    },
    {
      title: "Renovation & Maintenance",
      desc: "Structural or aesthetic upgrades and ongoing upkeep.",
      image:
        "https://i.pinimg.com/736x/89/33/c5/8933c57fdefa2e4a0991020355303f6b.jpg",
    },
    {
      title: "Health, Safety & Environment (HSE)",
      desc: "Implementation of safety and environmental compliance standards.",
      image:
        "https://i.pinimg.com/1200x/07/f1/4d/07f14df3e4807fd4f50918d791e587f0.jpg",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = new SplitText(headerRef.current, { type: "lines" });

      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, { y: 22, opacity: 0 });

      gsap.to(split.lines, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });

      gsap.set(itemsRef.current, { y: 20, opacity: 0 });

      gsap.to(itemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.06,
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
      className="relative w-full overflow-hidden bg-[#fffcf7] text-[#2f3b2f]"
    >
      {/* MIRRORED BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/images/image_2026-01-28_15-42-033.png"
          alt=""
          className="h-full w-full object-cover opacity-[0.05] scale-x-[-1]"
        />
      </div>

      <div className="relative z-10 min-h-screen px-6 sm:px-[6vw] py-20 sm:py-[14vh]">
        <div className="mb-24 sm:mb-28 max-w-full">
          <span className="block sm:hidden mb-6 text-[42px] font-[Canela] leading-[1.1]">
            Scope of Services
          </span>

          <span className="hidden sm:block mb-4 text-[11px] uppercase tracking-[0.25em] text-black/50">
            Scope of services
          </span>

          <h2
            ref={headerRef}
            className="font-normal text-[clamp(18px,1.9vw,23px)] leading-[1.45] tracking-tight max-w-[620px]"
          >
            Our services cover every stage of the construction process, from early
            consultation and planning to execution, quality control, and long-term
            maintenance.
          </h2>
        </div>

        <ul>
          {SERVICES.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <li
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="
                  relative
                  grid
                  grid-cols-[45%_55%]
                  lg:grid-cols-[40%_10%_50%]
                  gap-x-4
                  py-10 sm:py-[3.8vh]
                "
              >
                {/* divider */}
                <div className="absolute top-0 left-0 w-full h-px bg-black/15 z-0" />

                <div className="font-[Canela] text-[clamp(26px,3vw,35px)] leading-[1.15] tracking-[-0.02em]">
                  {item.title}
                </div>

                <div className="hidden lg:block" />

                <div className="relative z-10">
                  <div className="max-w-[340px] text-[clamp(15px,1.25vw,17px)] leading-[1.55] text-black/60">
                    {item.desc}
                  </div>

                  {/* IMAGE */}
                  <div
                    className={`
                      pointer-events-none
                      absolute
                      top-1/2
                      right-0
                      hidden lg:block
                      w-[18vw]
                      h-[32vh]
                      -translate-y-1/2
                      transition-all duration-500 ease-out
                      ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-6"
                      }
                    `}
                  >
                    <div className="h-full w-full bg-[#fffcf7] p-[2px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
