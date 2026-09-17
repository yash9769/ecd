import amitUrl from "../imports/amitkumar-clean.jpg";
import markUrl from "../imports/envista-mark.png";

export default function FounderQuote() {
  return (
    <section className="relative overflow-hidden bg-white py-12 transition-colors duration-300 dark:bg-[#090a10] sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[24px] border border-slate-200/90 bg-gradient-to-br from-white via-[#faf8ff] to-[#f4eeff] shadow-[0_16px_40px_-12px_rgba(79,70,229,0.08),0_2px_6px_rgba(79,70,229,0.02)] transition-colors duration-300 dark:border-violet-500/25 dark:bg-gradient-to-br dark:from-[#111425] dark:via-[#13172e] dark:to-[#0e1022] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7),0_0_30px_rgba(124,58,237,0.12)]">
          {/* Ambient atmospheric radial glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-[280px] w-[280px] rounded-full opacity-40 blur-3xl dark:opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-[280px] w-[280px] rounded-full opacity-35 blur-3xl dark:opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
            }}
          />

          {/* Diagonal cyber accent line */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-[45%] opacity-15 dark:opacity-25"
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
            fill="none"
          >
            <line
              x1="380"
              y1="0"
              x2="80"
              y2="400"
              stroke="#6d28d9"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="320"
              y1="0"
              x2="20"
              y2="400"
              stroke="#4f46e5"
              strokeWidth="1.5"
            />
          </svg>

          {/* Balanced Card Content Grid */}
          <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
            {/* Left Column: Eyebrow, Quote & Founder Info */}
            <div className="flex flex-col justify-center lg:col-span-7">
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#4f46e5] dark:bg-[#a78bfa]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#4f46e5] dark:text-[#a78bfa]">
                  Leadership &amp; Vision
                </span>
              </div>

              {/* Founder Quote */}
              <blockquote className="relative mt-5 sm:mt-6">
                <p className="font-display text-[20px] font-medium leading-[1.42] tracking-[-0.015em] text-[#0d1020] transition-colors duration-200 dark:text-white sm:text-[23px] lg:text-[25px]">
                  <span
                    className="mr-1 inline-block select-none font-serif text-[28px] font-bold leading-none text-[#6d28d9] transition-colors duration-200 dark:text-[#a78bfa] sm:text-[34px]"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  Technology will continue to change. Threats will continue to evolve. Our commitment to protecting what matters will remain constant.
                  <span
                    className="ml-1 inline-block select-none font-serif text-[28px] font-bold leading-none text-[#6d28d9] transition-colors duration-200 dark:text-[#a78bfa] sm:text-[34px]"
                    aria-hidden="true"
                  >
                    ”
                  </span>
                </p>
              </blockquote>

              {/* Founder Meta & Credentials */}
              <div className="mt-6 flex flex-col gap-1 sm:mt-7">
                <h3 className="font-display text-[21px] font-bold tracking-[-0.01em] text-[#0d1020] transition-colors duration-200 dark:text-white sm:text-[23px]">
                  Amitkumar More
                </h3>
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-[#4f46e5] dark:text-[#a78bfa] sm:text-[12.5px]">
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
    </section>
  );
}
