import Image from "next/image";

export default function Footer() {
  return (
    <section className="relative min-h-[55vh] w-full overflow-hidden bg-black text-white">
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
      <div className="relative z-10 flex min-h-[55vh] flex-col justify-between px-6 py-8 md:px-12 lg:px-20">
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
