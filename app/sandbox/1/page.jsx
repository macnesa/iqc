"use client"
import Image from "next/image";




function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/BG - 1.jpg"
          alt="iQC Abstract Green Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Dark overlay for contrast control */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Centered Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Logo */}
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
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

function About() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-100 text-neutral-900">

      {/* Logo — top-left, editorial anchor */}
      <div className="absolute left-12 top-10 z-10">
        <div className="w-[130px]">
          <Image
            src="/images/Logo IQC - Black C.png"
            alt="Iconic Quality Consultants"
            width={360}
            height={140}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>

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
      <div className="absolute right-24 top-[44%] max-w-[580px]">
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
    <section className="relative h-screen w-full overflow-hidden text-white">

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

      {/* ===== LOGO ===== */}
      <div className="absolute left-12 top-10 z-[3]">
        <Image
          src="/images/Logo IQC - White C.png"
          alt="Iconic Quality Consultants"
          width={140}
          height={60}
          priority
        />
      </div>

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
    <section className="relative h-screen w-full overflow-hidden bg-white text-black">

      {/* ===== LEFT CONTENT ===== */}
      <div className="relative z-10 flex h-full w-full">

        {/* ===== LEFT PANEL ===== */}
        <div className="relative flex h-full w-[60%] flex-col px-16 pt-5">

          {/* Logo */}
          <div className="mb-16">
            <Image
              src="/images/Logo IQC - Black C.png"
              alt="Iconic Quality Consultants"
              width={160}
              height={60}
              priority
            />
          </div>

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
    <section className="relative w-full overflow-hidden bg-[#f6f7f5] text-[#2f3b2f]">

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
     <Hero/>
     <About/>
     <VisionMissionPurpose/>
     <ScopeOfServices/>
     <OurProjectApproach/>
     <Footer/>
     </>
  );
}
