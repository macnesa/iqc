"use client";

import { useRef, useEffect } from "react";
import { gsap, SplitText } from "@/lib/gsap";

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);
  const imageRefs = useRef([]); // 👈 NEW

  /* =========================
     DATA ASLI (TIDAK DIUBAH)
  ========================= */
  const SERVICES = [
    {
      title: "Consultation & Feasibility",
      image:
        "https://i.pinimg.com/736x/54/c9/48/54c9480e739d4ca53af0714e3ec294c0.jpg",
    },
    {
      title: "Project Management",
      image:
        "https://i.pinimg.com/1200x/a3/28/ce/a328ce34b6ad66466b7ab9b03ed4a924.jpg",
    },
    {
      title: "Construction & Execution",
      image:
        "https://i.pinimg.com/736x/80/50/be/8050bebdb47f4018ac213261d26d9102.jpg",
    },
    {
      title: "Fit-Out & Finishing Works",
      image:
        "https://i.pinimg.com/1200x/55/29/82/552982431c45ab8479c50edd7c6575de.jpg",
    },
    {
      title: "Quality Control & Assurance",
      image:
        "https://i.pinimg.com/736x/ba/01/ff/ba01ffb8138f41bdf8c22ac18eac67a0.jpg",
    },
    {
      title: "Renovation & Maintenance",
      image:
        "https://i.pinimg.com/736x/89/33/c5/8933c57fdefa2e4a0991020355303f6b.jpg",
    },
    {
      title: "Health, Safety & Environment (HSE)",
      image:
        "https://i.pinimg.com/1200x/07/f1/4d/07f14df3e4807fd4f50918d791e587f0.jpg",
    },
  ];

  /* =========================
     LAYOUT PRESETS (TIDAK DIUBAH)
  ========================= */
  const LAYOUTS = [
    {
      grid: "1fr 1fr 1fr 1fr 1fr",
      imageCol: "1 / span 1",
      imageAlign: "start",
      imageWidth: "16vw",
      textCol: "3 / span 2",
      textAlign: "center",
      padding: "36px",
    },
    {
      grid: "1fr 1fr 1fr 1fr 1fr",
      imageCol: "5 / span 1",
      imageAlign: "end",
      imageWidth: "16vw",
      textCol: "2 / span 2",
      textAlign: "start",
      padding: "44px",
    },
    {
      grid: "1fr 1fr 1fr 1fr 1fr",
      imageCol: "3 / span 1",
      imageAlign: "end",
      imageWidth: "16vw",
      textCol: "1 / span 2",
      textAlign: "start",
      padding: "50px",
    },
    {
      grid: "1fr 1fr 1fr 1fr 1fr",
      imageCol: "2 / span 1",
      imageAlign: "start",
      imageWidth: "16vw",
      textCol: "4 / span 2",
      textAlign: "end",
      padding: "40px",
    },
    {
      grid: "1fr 1fr 1fr 1fr 1fr",
      imageCol: "1 / span 2",
      imageAlign: "start",
      imageWidth: "16vw",
      textCol: "4 / span 2",
      textAlign: "center",
      padding: "48px",
    },
    {
      grid: "1fr 1fr 1fr 1fr 1fr",
      imageCol: "4 / span 1",
      imageAlign: "end",
      imageWidth: "16vw",
      textCol: "2 / span 2",
      textAlign: "start",
      padding: "34px",
    },
    {
      grid: "1fr 1fr 1fr 1fr 1fr",
      imageCol: "5 / span 1",
      imageAlign: "end",
      imageWidth: "16vw",
      textCol: "1 / span 3",
      textAlign: "center",
      padding: "46px",
    },
  ];

  /* =========================
     GSAP (REVEAL + PARALLAX)
  ========================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // HEADER SPLIT
      const split = new SplitText(headerRef.current, { type: "lines" });

      gsap.from(split.lines, {
        y: 18,
        opacity: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      // ITEM REVEAL
      gsap.from(itemsRef.current, {
        y: 16,
        opacity: 0,
        stagger: 0.05,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });

      // IMAGE PARALLAX 👇
      imageRefs.current.forEach((img, i) => {
        if (!img) return;

        gsap.fromTo(
          img,
          { y: -20 },
          {
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =========================
     RENDER
  ========================= */
  return (
    <section
      ref={sectionRef}
      className="bg-[#fffcf7] text-[#2f3b2f] px-6 sm:px-[6vw] py-24"
    >
      <div className="mb-24 max-w-[620px]">
        <span className="block mb-4 text-[11px] uppercase tracking-[0.25em] text-black/50">
          Scope of Services
        </span>
        <h2
          ref={headerRef}
          className="text-[clamp(18px,1.8vw,22px)] leading-[1.45]"
        >
          Our services cover every stage of the construction process, from early
          consultation and planning to execution, quality control, and long-term
          maintenance.
        </h2>
      </div>

      <ul>
        {SERVICES.map((item, i) => {
          const layout = LAYOUTS[i];

          return (
            <li
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
              style={{
                display: "grid",
                gridTemplateColumns: layout.grid,
                paddingBlock: layout.padding,
                alignItems: "center",
              }}
              className="relative"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-black/15" />

              {/* IMAGE */}
              <div
                className="hidden lg:block overflow-hidden"
                style={{
                  gridColumn: layout.imageCol,
                  gridRow: 1,
                  justifySelf: layout.imageAlign,
                  width: layout.imageWidth,
                }}
              >
                <div className="aspect-[16/9] p-[2px] bg-[#fffcf7] overflow-hidden">
                  <img
                    ref={(el) => (imageRefs.current[i] = el)}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover will-change-transform"
                  />
                </div>
              </div>

              {/* TITLE */}
              <div
                style={{
                  gridColumn: layout.textCol,
                  gridRow: 1,
                  textAlign: layout.textAlign,
                }}
              >
                <h3 className="font-[Canela] text-[clamp(34px,3.0vw,52px)] leading-[1.05] text-[#2f3b2f]/80">
                  {item.title}
                </h3>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
