import { useState } from "react";
import AttackSurface from "../components/AttackSurface";
import { Kicker, Reveal, RevealText } from "../components/ui";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";
const CAPS = ["Offensive Security", "Defensive Security", "GRC Solutions", "DPDP Consulting", "Training & MRA", "AI Audits"];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState<string>(CAPS[0]);

  return (
    <section className={`${WRAP} grid grid-cols-1 items-center gap-14 pt-36 pb-28 lg:grid-cols-[1fr_1fr] lg:pt-44`}>
      <div>
        <Kicker n="09">Get Protected</Kicker>
        <h1 className="mt-6 display-xl">
          <RevealText text="Stop what others miss." stagger={70} />
        </h1>
        <Reveal delay={300}>
          <p className="mt-8 max-w-md lead">
            Protecting organizations, individuals, and governments from evolving cyber
            threats and data breaches. Tell us where you need cover — we'll scope it from there.
          </p>
          <div className="mt-10 relative aspect-[880/620] max-w-md opacity-90">
            <AttackSurface />
          </div>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div className="relative overflow-hidden border border-line-strong bg-surface/50 p-8 lg:p-10">
          <div className="grain absolute inset-0" />
          {sent ? (
            <div className="relative py-16 text-center">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-purple-bright">Received</div>
              <h2 className="mt-4 font-display text-3xl font-bold">We'll be in touch.</h2>
              <p className="mx-auto mt-4 max-w-xs text-sm text-muted">
                Thank you — a member of the Envista team will respond to your enquiry shortly.
              </p>
            </div>
          ) : (
            <form className="relative space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Secure enquiry</div>
              {[
                ["Full name", "Jordan Mensah", "text"],
                ["Work email", "jordan@organization.gov", "email"],
                ["Organization", "Ministry / Enterprise", "text"],
              ].map(([label, ph, type]) => (
                <label key={label} className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</span>
                  <input required type={type} placeholder={ph}
                    className="mt-2 w-full border border-line bg-ink px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-purple-bright" />
                </label>
              ))}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Area of interest</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CAPS.map((c) => (
                    <button type="button" key={c} onClick={() => setInterest(c)}
                      className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                        interest === c ? "border-purple-bright bg-[rgba(139,92,246,0.12)] text-fg" : "border-line text-faint hover:text-muted"
                      }`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">How can we help?</span>
                <textarea rows={3} placeholder="Briefly describe your environment or concern…"
                  className="mt-2 w-full resize-none border border-line bg-ink px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-purple-bright" />
              </label>
              <button type="submit"
                className="group mt-2 inline-flex items-center gap-2.5 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
                  boxShadow: "0 0 0 1px rgba(196,181,253,0.35) inset, 0 12px 40px -12px rgba(124,58,237,0.8)",
                }}>
                Request Protection
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
