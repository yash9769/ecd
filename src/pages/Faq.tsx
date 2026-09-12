import { useState } from "react";
import { Kicker, Reveal, RevealText } from "../components/ui";
import { FAQS } from "../data";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <section className={`${WRAP} pt-36 pb-24 lg:pt-44`}>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Kicker n="08">FAQ</Kicker>
            <h1 className="mt-6 display-xl">
              <RevealText text="Questions, answered." stagger={60} />
            </h1>
          </div>
          <div className="border-t border-line">
            {FAQS.map(([q, a], i) => (
              <div key={i} className="border-b border-line">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left">
                  <span className="font-display text-lg font-semibold">{q}</span>
                  <span className="font-mono text-xl text-purple-bright transition-transform duration-300"
                    style={{ transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <div className="grid transition-all duration-300"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr", opacity: open === i ? 1 : 0 }}>
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-muted">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
