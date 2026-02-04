"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";


export default function CoreValues() {
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
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        const BASE_OFFSET = isMobile ? 110 : 140;
        const REVEAL_RANGE = isMobile ? 160 : 200;
        const HOLD_ZONE = isMobile ? 110 : 140;

        itemsRef.current.forEach((el, i) => {
          if (!el) return;

          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: isDesktop ? 36 : 0,
              filter: isDesktop ? "blur(16px)" : "blur(0px)",
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
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      data-theme="dark"
      ref={sectionRef}
      className="
        relative w-full overflow-hidden text-white
        py-24
        md:min-h-[90vh]
      "
      style={{
        paddingBottom: "260px",
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

      {/* SECTION LABEL */}
      <div className="absolute left-6 md:left-24 top-12 md:top-16 z-30">
        <span className="text-[11px] md:text-[12px] uppercase tracking-[0.3em] text-white/60">
          Core values
        </span>
      </div>

      {/* CONTENT */}
      <div className="relative z-30 grid grid-cols-12 px-6 md:px-24 gap-x-6">
        {/* LEFT — DESCRIPTION */}
        <div className="col-span-12 md:col-span-5 flex flex-col md:mt-5">
          <p className="max-w-xl text-[16px] md:text-[22px] tracking-tight h-20 leading-[1.4] md:leading-[1.2] text-white/90">
            {CORE_VALUES[activeIndex].text}
          </p>

          {/* MOBILE — TITLES */}
          <div className="mt-8 space-y-2 md:hidden">
            {CORE_VALUES.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[i] = el)}
                className={`
                  text-[40px] font-[Canela] tracking-tight transition-colors duration-300
                  ${i === activeIndex ? "text-white" : "text-white/35"}
                `}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP — TITLES */}
        <div className="hidden md:flex col-span-7 items-start justify-end">
          <div className="space-y-3 text-right">
            {CORE_VALUES.map((item, i) => (
              <div
                key={item.id}
                ref={(el) => (itemsRef.current[i] = el)}
                className={`
                  text-[56px] font-[Canela] tracking-tight transition-colors duration-300
                  ${i === activeIndex ? "text-white" : "text-white/35"}
                `}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOUSE IMAGE */}
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
    </section>
  );
}
