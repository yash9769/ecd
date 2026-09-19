import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import amitUrl from "../imports/amitkumar-clean.jpg";
import markUrl from "../imports/envista-mark.png";

export default function FounderQuote() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden bg-[#150a2e] py-14 transition-colors duration-300 dark:bg-[#0c061e] sm:py-18 lg:py-24 text-white"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[24px] border border-white/15 bg-gradient-to-br from-[#1c0e3b] via-[#24114d] to-[#170c33] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] transition-colors duration-300">
          {/* Ambient atmospheric radial glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-[280px] w-[280px] rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-[280px] w-[280px] rounded-full opacity-35 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
            }}
          />

          {/* Diagonal cyber accent line */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-[45%] opacity-20"
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
            fill="none"
          >
            <line
              x1="380"
              y1="0"
              x2="80"
              y2="400"
              stroke="#a78bfa"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="320"
              y1="0"
              x2="20"
              y2="400"
              stroke="#c4b5fd"
              strokeWidth="1.5"
            />
          </svg>

          {/* Balanced Card Content Grid */}
          <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
            {/* Left Column: Eyebrow, Quote & Founder Info */}
            <div className="flex flex-col justify-center lg:col-span-7">
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">
                  Leadership &amp; Vision
                </span>
              </div>

              {/* Founder Quote */}
              <blockquote className="relative mt-5 sm:mt-6">
                <p className="font-display text-[20px] font-medium leading-[1.42] tracking-[-0.015em] text-white sm:text-[23px] lg:text-[25px]">
                  <span
                    className="mr-1 inline-block select-none font-serif text-[28px] font-bold leading-none text-[#c4b5fd] sm:text-[34px]"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  Technology will continue to change. Threats will continue to evolve. Our commitment to protecting what matters will remain constant.
                  <span
                    className="ml-1 inline-block select-none font-serif text-[28px] font-bold leading-none text-[#c4b5fd] sm:text-[34px]"
                    aria-hidden="true"
                  >
                    ”
                  </span>
                </p>
              </blockquote>

              {/* Founder Meta & Credentials */}
              <div className="mt-6 flex flex-col gap-1 sm:mt-7">
                <h3 className="font-display text-[21px] font-bold tracking-[-0.01em] text-white sm:text-[23px]">
                  Amitkumar More
                </h3>
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#c4b5fd] sm:text-[12.5px]">
                  Founder &amp; CEO
                </p>
              </div>
            </div>

            {/* Right Column: Balanced Founder Portrait */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative w-full max-w-[280px] sm:max-w-[310px] lg:max-w-[320px]">
                {/* Frame Ambient Back-Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-[22px] opacity-30 blur-lg dark:opacity-20"
                  style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(79,70,229,0.12) 70%, transparent 100%)",
                  }}
                />

                {/* Portrait Card */}
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-xl transition-all duration-300 dark:border-violet-500/30 dark:bg-[#15182d]">
                  <img
                    src={amitUrl}
                    alt="Amitkumar More - Founder & CEO, Envista Cyber Defence"
                    className="h-[320px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-[350px] lg:h-[360px]"
                    draggable={false}
                  />

                  {/* Soft bottom vignette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/15 to-transparent"
                  />

                  {/* Corner Brand Seal */}
                  <div
                    className="absolute bottom-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-105"
                    title="Envista Cyber Defence"
                  >
                    <img src={markUrl} alt="" className="h-4 w-auto drop-shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
