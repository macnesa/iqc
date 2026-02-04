"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";

export default function About() {
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
        y: 32,
        opacity: 0.15,
      });

      gsap.to(leadSplit.lines, {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.065,
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
        y: 20,
        opacity: 0.2,
      });

      gsap.to(bodySplit.lines, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.08,
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
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#fffcf7] text-[#2f3b2f]"
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
          className="
            mb-14
            text-[clamp(20px,2.2vw,28px)]
            leading-[1.3]
            tracking-[-0.005em]
          "
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
          className="
            max-w-[640px]
            text-[clamp(14.5px,1.05vw,16px)]
            leading-[1.75]
            text-neutral-700
          "
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
