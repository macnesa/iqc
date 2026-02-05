"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

import Header from "@/components/molecules/Header";
import Hero from "@/components/organisms/Hero";
import About from "@/components/organisms/About";
import VisionMissionPurpose from "@/components/organisms/VisionMissionPurpose";
import CoreValues from "@/components/organisms/CoreValues";
import ProjectApproach from "@/components/organisms/ProjectApproach";
import WhatWeDo from "@/components/organisms/WhatWeDo";
import WhyChooseUs from "@/components/organisms/WhyChooseUs";
import Projects from "@/components/organisms/Projects";
import Footer from "@/components/organisms/Footer";

/* ======================================================
   INTERNAL COMPONENT — OPENING SHUTTER
   (COPY 100% DARI HERO, TIDAK DIUBAH)
====================================================== */
function OpeningShutter({ opened }) {
  // =========================
  // SLICE CONFIG (LOCKED)
  // =========================
  const SLICE_COUNT = 10;
  const SLICE_HEIGHT = 100 / SLICE_COUNT;
  const SLICE_DURATION = 1.9;
  const SLICE_STAGGER = 0.11;

  return (
    <AnimatePresence>
      {!opened && (
        <div className="pointer-events-none fixed inset-0 z-[999]">
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
  );
}

function ParallaxImageSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax movement (halus, dewasa)
  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[45vh] md:h-[75vh] w-full overflow-hidden bg-neutral-200"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-[1.08]"
      >
        <Image
          src="https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          // ganti dengan path gambar lo
          alt=""
          fill
          priority
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}

/* ======================================================
   PAGE
====================================================== */
export default function Page() {
  const pageRef = useRef(null);
  const [opened, setOpened] = useState(false);

  // =========================
  // AUTO OPENING SEQUENCE
  // (COPY 100% DARI HERO)
  // =========================
  useEffect(() => {
    const t = setTimeout(() => {
      setOpened(true);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  // =========================
  // PINNED SCROLL (UNCHANGED)
  // =========================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinnedSections = gsap.utils.toArray("[data-pin]");

      pinnedSections.forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(section, { y: 0 }, { y: -40, ease: "none" });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative">
      {/* OPENING SHUTTER — DIPINDAHKAN */}
      <OpeningShutter opened={opened} />

      {/* PAGE CONTENT */}
      <Header />
      
      <Hero opened={opened} />

      {/* <About /> */}
      {/* <ParallaxImageSection/> */}
      {/* <VisionMissionPurpose /> */}
      {/* <CoreValues /> */}

     
      {/* <ProjectApproach /> */}

      <WhatWeDo />
      {/* <WhyChooseUs /> */}
      <Projects />
      <Footer />
      <section data-pin>
        
      </section>
    </div>
  );
}
