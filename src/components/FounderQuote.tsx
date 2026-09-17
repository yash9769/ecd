import amitUrl from "../imports/amitkumar-clean.jpg";
import markUrl from "../imports/envista-mark.png";

export default function FounderQuote() {
  return (
    <section className="relative overflow-hidden bg-white py-14 transition-colors duration-300 dark:bg-[#090a10] lg:py-20">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div
          className="relative overflow-hidden rounded-[26px] border border-slate-200/90 bg-gradient-to-br from-white via-[#faf8ff] to-[#f4eeff] shadow-[0_20px_50px_-15px_rgba(79,70,229,0.09),0_2px_8px_rgba(79,70,229,0.03)] transition-colors duration-300 dark:border-violet-500/25 dark:bg-gradient-to-br dark:from-[#111425] dark:via-[#13172e] dark:to-[#0e1022] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7),0_0_30px_rgba(124,58,237,0.12)]"
        >
          {/* Soft ambient atmospheric glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full opacity-40 blur-3xl dark:opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full opacity-35 blur-3xl dark:opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(79,70,229,0.25) 0%, transparent 70%)",
            }}
          />

          {/* Diagonal cyber accent line matching reference */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-[45%] opacity-20 dark:opacity-30"
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

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
            {/* Left Column: Quote & Bio */}
            <div className="flex flex-col justify-between lg:col-span-7">
              {/* Category Eyebrow */}
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#4f46e5] dark:text-[#a78bfa]">
                LEADERSHIP & VISION
              </div>

              {/* Founder Quote */}
              <blockquote className="relative mt-5">
                <p className="font-display text-[20px] font-medium leading-[1.38] tracking-[-0.02em] text-[#0d1020] transition-colors duration-200 dark:text-white sm:text-[23px] lg:text-[26px]">
                  <span
                    className="mr-2 inline-block select-none font-serif text-[32px] font-bold leading-none text-[#6d28d9] transition-colors duration-200 dark:text-[#a78bfa] sm:text-[38px]"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  Cyber threats don&rsquo;t stand still. Neither do we. We protect
                  organizations across the globe through cutting-edge defence, deep
                  threat intelligence, and an unwavering commitment to keeping data
                  and the people behind it safe.
                  <span
                    className="ml-2 inline-block select-none font-serif text-[32px] font-bold leading-none text-[#6d28d9] transition-colors duration-200 dark:text-[#a78bfa] sm:text-[38px]"
                    aria-hidden="true"
                  >
                    ”
                  </span>
                </p>
              </blockquote>

              {/* Founder Meta & Credentials */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6 transition-colors duration-200 dark:border-white/10">
                <div>
                  <h3 className="font-display text-[21px] font-bold tracking-[-0.01em] text-[#0d1020] transition-colors duration-200 dark:text-white">
                    Amitkumar More
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-[#4f46e5] dark:text-[#a78bfa]">
                      Founder & CEO
                    </span>
                    <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
                      •
                    </span>
                    <span className="text-[13px] font-medium text-[#575f75] dark:text-slate-400">
                      Envista Cyber Defence
                    </span>
                  </div>
                </div>

                {/* Verified Executive Pill */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/70 bg-violet-50/80 px-3.5 py-1 text-[11.5px] font-semibold text-[#5b21b6] dark:border-violet-500/30 dark:bg-violet-950/40 dark:text-[#c4b5fd]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed] animate-pulse" />
                  Executive Leadership
                </div>
              </div>
            </div>

            {/* Right Column: Founder Portrait Photo */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px]">
                {/* Frame Drop Shadow & Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 rounded-[22px] opacity-35 blur-lg dark:opacity-25"
                  style={{
                    background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(79,70,229,0.15) 70%, transparent 100%)",
                  }}
                />

                {/* Portrait Card */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-xl transition-all duration-300 dark:border-violet-500/30 dark:bg-[#15182d]">
                  <img
                    src={amitUrl}
                    alt="Amitkumar More - Founder & CEO, Envista Cyber Defence"
                    className="h-[360px] w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02] sm:h-[400px] lg:h-[415px]"
                    draggable={false}
                  />

                  {/* Gradient Lighting overlay at the base */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                  />

                  {/* Integrated Founder Tagline at the base of the photo */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <p className="font-display text-[15px] font-bold leading-tight drop-shadow-md">
                        Amitkumar More
                      </p>
                      <p className="text-[11.5px] font-medium text-white/85 drop-shadow">
                        Founder & CEO
                      </p>
                    </div>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/20 backdrop-blur-md drop-shadow"
                      title="Envista Cyber Defence"
                    >
                      <img src={markUrl} alt="" className="h-4.5 w-auto" />
                    </div>
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
