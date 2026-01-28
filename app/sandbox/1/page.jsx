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
     <Footer/>
     </>
  );
}
