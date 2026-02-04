"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function VisionMissionPurpose() {
  const sectionRef = useRef(null);
  const maskRefs = useRef([]);

  const ITEMS = [
    {
      title: "Vision",
      body:
        "To be a trusted leader in Bali’s construction industry, delivering projects with high standards, on-time performance, and lasting quality.",
      image:
        "https://i.pinimg.com/1200x/6b/de/06/6bde060e5c6ac48fe399a9d795ba3a07.jpg",
    },
    {
      title: "Mission",
      body:
        "To deliver quality construction through transparency, professionalism, and clear communication, ensuring every project is managed efficiently and completed on schedule.",
      image:
        "https://i.pinimg.com/1200x/1d/cb/b4/1dcbb4f7b926a21b08b130980328390f.jpg",
    },
    {
      title: "Purpose",
      body:
        "To raise the standard of construction in Bali by building trust, accountability, and long-term value — not only in structures, but in the entire construction process.",
      image:
        "https://i.pinimg.com/1200x/a8/0b/0d/a80b0df3a68f32ac3951b757145df6ac.jpg",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      maskRefs.current.forEach((mask) => {
        if (!mask) return;

        gsap.set(mask, { width: 0 });

        gsap.to(mask, {
          width: "100%",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mask,
            start: "top bottom",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-theme="light"
      ref={sectionRef}
      className="
        relative w-full bg-[#fffcf7]
        py-20
        md:min-h-[80vh]
      "
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <div
          className="
            grid grid-cols-1 md:grid-cols-3
            md:min-h-[60vh]
          "
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="
                group relative overflow-hidden
                bg-[#fffcf7]
                h-[420px]
                md:h-auto
              "
            >
              {/* ================= FRAME / MASK (WIDTH REVEAL) ================= */}
              <div
                ref={(el) => (maskRefs.current[i] = el)}
                className="absolute inset-y-0 left-0 overflow-hidden"
              >
                {/* IMAGE — DIAM TOTAL */}
                <div
                  className="absolute inset-0 bg-cover bg-left bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>

              {/* OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-neutral-900/70
                  transition-colors duration-500
                  md:bg-neutral-900/0
                  md:group-hover:bg-neutral-900/80
                "
              />

              {/* ================= DESKTOP TEXT (ASLI, TIDAK DISENTUH) ================= */}
              <div className="hidden md:block">
                <div className="absolute bottom-8 left-0 z-20 border-l-4 border-white px-8">
                  <h3
                    className="
                      uppercase font-semibold text-white
                      text-[clamp(20px,1.9vw,30px)]
                      tracking-[0.08em]
                    "
                  >
                    {item.title}
                  </h3>
                </div>

                <div
                  className="
                    absolute bottom-0 left-0 right-0 z-10
                    translate-y-[72px]
                    transition-transform duration-500 ease-out
                    group-hover:-translate-y-[60px]
                  "
                >
                  <div className="px-8 pb-8 pt-24">
                    <p
                      className="
                        max-w-[360px]
                        text-white
                        opacity-0
                        transition-opacity duration-300 delay-200
                        group-hover:opacity-100
                        text-[clamp(13.5px,1vw,15px)]
                        leading-[1.45]
                      "
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= MOBILE TEXT (FLOW AMAN) ================= */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 z-20 px-8 pb-8">
                <h3 className="mb-3 uppercase font-semibold text-white tracking-[0.08em]">
                  {item.title}
                </h3>
                <p className="max-w-[360px] text-white text-sm leading-[1.45]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
