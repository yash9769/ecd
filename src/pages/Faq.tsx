import { useState } from "react";
import { Reveal, RevealText } from "../components/ui";
import { FAQS } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* Hero Section: Deep Royal Purple */}
      <section className="relative overflow-hidden bg-[#150a2e] pt-28 pb-16 text-white sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 dark:bg-[#0c061e] transition-colors duration-200">
        <div className="pointer-events-none absolute -top-40 right-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-600/15 blur-[120px]" />
        
        <div className={WRAP}>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-violet-200">Knowledge Base</span>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
            <RevealText text="Questions & Advisory Insights." stagger={45} />
          </h1>
          <Reveal delay={200}>
            <p className="mt-5 max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-[#d8cefa]">
              Clear answers on our engagement models, DPDP 2023 compliance auditing, automated recon pipelines, and Red Teaming methodology.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ Accordions Section: Adaptive Light/Dark Theme */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 text-slate-900 border-y border-slate-100 dark:bg-[#0c0e1a] dark:text-white dark:border-white/10 transition-colors duration-200">
        <div className={WRAP}>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9] dark:text-[#c4b5fd]">Frequently Asked Questions</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#150c2e] dark:text-white md:text-4xl">
                Everything you need to know before initiating an audit
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Have a specialized compliance mandate or require an urgent Red Team assessment under NDA? Our team is available 24/7.
              </p>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#14182b]">
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">Need a custom NDA or RFP response?</h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Download our Standard Security Assurance Pack or contact our solutions desk.</p>
                <a href="mailto:advisory@envistacyber.com" className="mt-4 inline-block font-mono text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-[#c4b5fd] hover:underline">
                  Contact Advisory Desk →
                </a>
              </div>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/10">
              {FAQS.map(([q, a], i) => (
                <div key={i} className="py-5">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-2 text-left group cursor-pointer">
                    <span className="font-display text-lg font-bold text-[#150c2e] dark:text-white transition-colors group-hover:text-violet-700 dark:group-hover:text-[#c4b5fd]">{q}</span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-50 dark:bg-violet-950/60 font-mono text-lg font-bold text-violet-700 dark:text-[#c4b5fd] transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white"
                      style={{ transform: open === i ? "rotate(45deg)" : "none" }}>
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: open === i ? "1fr" : "0fr", opacity: open === i ? 1 : 0 }}>
                    <div className="overflow-hidden">
                      <p className="pt-3 pb-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

