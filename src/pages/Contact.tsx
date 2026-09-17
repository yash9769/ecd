import { useState } from "react";
import AttackSurface from "../components/AttackSurface";
import { Reveal, RevealText } from "../components/ui";
import { CtaBand } from "./Home";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";
const CAPS = ["Offensive Security", "Defensive Security", "GRC Solutions", "DPDP Consulting", "Training & MRA", "AI Audits"];

const OFFICES = [
  { city: "Mumbai (HQ)", address: "Envista Tower, BKC, Bandra East", email: "india.soc@envistacyber.com", phone: "+91 22 6800 9000", tag: "Global SOC & Advisory" },
  { city: "London", address: "1 Canada Square, Canary Wharf, London", email: "uk.operations@envistacyber.com", phone: "+44 20 7946 0991", tag: "EMEA Regional Hub" },
  { city: "Singapore", address: "Marina Bay Financial Centre, Tower 2", email: "apac.desk@envistacyber.com", phone: "+65 6812 4500", tag: "APAC Threat Intelligence" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState<string>(CAPS[0]);

  return (
    <div className="bg-[#150a2e] text-white min-h-screen">
      {/* Hero & Contact Form: Deep Royal Purple */}
      <section className="relative overflow-hidden bg-[#150a2e] pt-36 pb-24 text-white lg:pt-44 lg:pb-32">
        <div className="pointer-events-none absolute -top-40 right-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-[450px] w-[450px] rounded-full bg-indigo-600/25 blur-[120px]" />

        <div className={`${WRAP} relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr]`}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-violet-200">Rapid Response & Advisory</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              <RevealText text="Stop what others miss." stagger={45} />
            </h1>
            <Reveal delay={200}>
              <p className="mt-6 max-w-lg text-lg font-normal leading-relaxed text-[#d8cefa]">
                Protecting enterprises, critical infrastructure, and high-trust entities from sophisticated threat vectors and compliance liabilities. Connect with our principal engineers.
              </p>
              
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-violet-300">Live Attack Surface Visualizer</span>
                  <span className="font-mono text-[10px] text-emerald-400">● Real-time Telemetry</span>
                </div>
                <div className="mt-4 relative aspect-[880/520] max-w-md opacity-95">
                  <AttackSurface />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-violet-400/30 bg-white/[0.08] p-8 shadow-2xl backdrop-blur-2xl lg:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
              
              {sent ? (
                <div className="relative py-16 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-2xl">
                    ✓
                  </div>
                  <div className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-300">Enquiry Dispatched</div>
                  <h2 className="mt-2 font-display text-3xl font-bold text-white">We'll be in touch.</h2>
                  <p className="mx-auto mt-4 max-w-sm text-sm text-[#d8cefa]">
                    Thank you — an Envista security lead will review your requirements and reach out within 2 business hours under standard NDA.
                  </p>
                </div>
              ) : (
                <form className="relative space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-200">Secure Engagement Request</span>
                    <span className="font-mono text-[10px] text-violet-300/70">256-Bit SSL Encrypted</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-200">Full Name</span>
                      <input required type="text" placeholder="Jordan Mensah"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-200">Work Email</span>
                      <input required type="email" placeholder="jordan@enterprise.com"
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-200">Organization & Designation</span>
                    <input required type="text" placeholder="Enterprise Corp — CISO / IT Director"
                      className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                  </label>

                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-200">Practice Area of Interest</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {CAPS.map((c) => (
                        <button type="button" key={c} onClick={() => setInterest(c)}
                          className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] transition-all ${
                            interest === c ? "border-violet-400 bg-violet-600 text-white shadow-lg shadow-violet-600/30" : "border-white/15 bg-white/5 text-violet-200 hover:bg-white/10"
                          }`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-violet-200">Engagement Scope & Concerns</span>
                    <textarea rows={3} placeholder="Briefly describe your systems, timelines, or compliance objectives..."
                      className="mt-2 w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                  </label>

                  <button type="submit"
                    className="w-full group mt-4 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-violet-600/40 transition-all duration-300 hover:from-violet-400 hover:to-purple-500 hover:shadow-violet-600/60 active:scale-[0.99] cursor-pointer">
                    Initiate Security Briefing
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Global Locations & SOC Hubs: Deep Purple Glassmorphism */}
      <section className="relative overflow-hidden bg-[#180a33] py-24 text-white border-t border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className={`${WRAP} relative`}>
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">Worldwide Operations</span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">Global Presence & SOC Hubs</h2>
            <p className="mt-4 text-sm text-[#d8cefa]">
              Direct access to our certified lead auditors, Red Team operatives, and regulatory compliance counsel across key financial districts.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {OFFICES.map((off, idx) => (
              <div key={idx} className="rounded-2xl border border-white/12 bg-white/[0.06] p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/[0.1] hover:shadow-xl hover:shadow-violet-500/10">
                <span className="inline-block rounded-md border border-violet-400/30 bg-violet-500/20 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#c4b5fd]">{off.tag}</span>
                <h3 className="mt-4 font-display text-2xl font-bold text-white">{off.city}</h3>
                <p className="mt-2 text-sm text-[#d8cefa]">{off.address}</p>
                <div className="mt-6 pt-6 border-t border-white/10 space-y-2 font-mono text-xs">
                  <div className="text-[#d8cefa]"><span className="text-violet-300/70">Email:</span> <a href={`mailto:${off.email}`} className="text-white font-semibold hover:text-violet-300 hover:underline">{off.email}</a></div>
                  <div className="text-[#d8cefa]"><span className="text-violet-300/70">Phone:</span> <span className="font-semibold text-white">{off.phone}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}


