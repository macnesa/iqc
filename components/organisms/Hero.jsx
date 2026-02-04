"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({ opened }) {
  const sectionRef = useRef(null);

  // =========================
  // SLICE CONFIG (LOCKED)
  // =========================
  const SLICE_COUNT = 10;
  const SLICE_STAGGER = 0.11;
  const SLICE_DURATION = 1.9;

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

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.div
          style={{
            y: logoY,
            scale: logoScale,
          }}
          className="will-change-transform"
        >
          <div className="w-[200px] md:w-[260px] lg:w-[320px]">
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
    </section>
  );
}
