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
      <section className="relative overflow-hidden bg-[#150a2e] pt-24 pb-12 text-white sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-16 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
        <div className="pointer-events-none absolute -top-40 right-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-[450px] w-[450px] rounded-full bg-indigo-600/25 blur-[120px]" />

        <div className={`${WRAP} relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10`}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-white/10 px-3 py-1 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10.5px] sm:text-xs font-semibold uppercase tracking-widest text-violet-200">Rapid Response & Advisory</span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              <RevealText text="Stop what others miss." stagger={45} />
            </h1>
            <Reveal delay={200}>
              <p className="mt-3 max-w-lg text-xs sm:text-sm leading-relaxed text-[#d8cefa]">
                Protecting enterprises, critical infrastructure, and high-trust entities from sophisticated threat vectors and compliance liabilities. Connect with our principal engineers.
              </p>
              
              <div className="mt-5 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-violet-300">Live Attack Surface Visualizer</span>
                  <span className="font-mono text-[10px] text-emerald-400">● Real-time Telemetry</span>
                </div>
                <div className="mt-3 relative aspect-[880/480] max-w-md opacity-95">
                  <AttackSurface />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-2xl border border-violet-400/30 bg-white/[0.08] p-5 sm:p-6 lg:p-7 shadow-2xl backdrop-blur-2xl">
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl" />
              
              {sent ? (
                <div className="relative py-10 text-center sm:py-12">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xl">
                    ✓
                  </div>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-violet-300">Enquiry Dispatched</div>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white">We'll be in touch.</h2>
                  <p className="mx-auto mt-3 max-w-sm text-xs text-[#d8cefa]">
                    Thank you — an Envista security lead will review your requirements and reach out within 2 business hours under standard NDA.
                  </p>
                </div>
              ) : (
                <form className="relative space-y-3 sm:space-y-3.5" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-violet-200">Secure Engagement Request</span>
                    <span className="font-mono text-[10px] text-violet-300/70">256-Bit SSL Encrypted</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-violet-200">Full Name</span>
                      <input required type="text" placeholder="Jordan Mensah"
                        className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-violet-200">Work Email</span>
                      <input required type="email" placeholder="jordan@enterprise.com"
                        className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-violet-200">Organization & Designation</span>
                    <input required type="text" placeholder="Enterprise Corp — CISO / IT Director"
                      className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                  </label>

                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-violet-200">Practice Area of Interest</span>
                    <div className="mt-1.5 flex flex-wrap gap-1 sm:gap-1.5">
                      {CAPS.map((c) => (
                        <button type="button" key={c} onClick={() => setInterest(c)}
                          className={`rounded-lg border px-2 py-1 font-mono text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.08em] transition-all cursor-pointer ${
                            interest === c ? "border-violet-400 bg-violet-600 text-white shadow-md shadow-violet-600/30" : "border-white/15 bg-white/5 text-violet-200 hover:bg-white/10"
                          }`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-violet-200">Engagement Scope & Concerns</span>
                    <textarea rows={2} placeholder="Briefly describe your systems, timelines, or compliance objectives..."
                      className="mt-1.5 w-full resize-none rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-sm text-white placeholder:text-violet-300/40 outline-none transition-all focus:border-violet-400 focus:bg-white/15 focus:ring-2 focus:ring-violet-400/20" />
                  </label>

                  <button type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-violet-600/30 transition-all hover:brightness-110 hover:shadow-violet-600/50 cursor-pointer active:scale-[0.99]">
                    Dispatch Encrypted Briefing Request →
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Global Locations & SOC Hubs: Deep Purple Glassmorphism */}
      <section className="relative overflow-hidden bg-[#180a33] py-12 sm:py-14 lg:py-16 text-white border-t border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className={`${WRAP} relative`}>
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c4b5fd]">Worldwide Operations</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-3xl">Global Presence & SOC Hubs</h2>
            <p className="mt-2 text-xs sm:text-sm text-[#d8cefa]">
              Direct access to our certified lead auditors, Red Team operatives, and regulatory compliance counsel across key financial districts.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {OFFICES.map((off, idx) => (
              <div key={idx} className="rounded-xl sm:rounded-2xl border border-white/12 bg-white/[0.06] p-5 sm:p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-white/[0.1] hover:shadow-xl hover:shadow-violet-500/10">
                <span className="inline-block rounded-md border border-violet-400/30 bg-violet-500/20 px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-[#c4b5fd]">{off.tag}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">{off.city}</h3>
                <p className="mt-1.5 text-xs text-[#d8cefa]">{off.address}</p>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 font-mono text-[11.5px]">
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


