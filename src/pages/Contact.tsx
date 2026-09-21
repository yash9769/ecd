import React, { useState } from "react";
import { Link } from "react-router";
import { Reveal, RevealText } from "../components/ui";
import shieldCrestUrl from "../imports/shield_crest_clean.png";
import paulAvatarUrl from "../imports/paul_avatar.png";

const WRAP = "mx-auto max-w-[1320px] px-6 lg:px-10";

const OFFICES = [
  {
    city: "Mumbai (HQ)",
    address: "Unit B-406 to 410, Navkar Chambers, Marol Naka, Andheri (East), Mumbai – 400059",
    email: "india.soc@envistacyber.com",
    phone: "1800 120 1022",
    tag: "Principal Headquarters & SOC",
  },
  {
    city: "Dubai & Global",
    address: "1703, Sheikh Rashid Tower, Dubai World Trade Center, Sheikh Zayed Road, Dubai, U.A.E",
    email: "dubai@envistacyber.com",
    phone: "+971 4348 0046",
    tag: "EMEA & GCC Operations",
  },
  {
    city: "Delhi NCR",
    address: "Unit No. 306, DLF Centre, Savitri Cinema Complex, Greater Kailash II, Delhi – 110048",
    email: "delhi@envistacyber.com",
    phone: "+91 98103 33433",
    tag: "Regulatory & Enterprise Hub",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    heardAbout: "",
    consent: true,
  });

  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaChecked) {
      alert("Please check the 'I'm not a robot' verification box.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#060212] text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & DEDICATED CYBERCREST-STYLE CONTACT FORM CARD            */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
        {/* Deep Atmospheric Background with Purple & Cyan Nebula Highlights */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/15 blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 -right-20 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[150px]"
        />

        {/* Subtle Cyber Hexagon Wireframe in Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32L30 0zm0 104L0 86.68V52.04l30 17.32 30-17.32v34.64L30 104z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 104px",
          }}
        />

        <div className={`${WRAP} relative z-10`}>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* ------------------------------------------------------------- */}
            {/* LEFT COLUMN: HERO HEADLINE, DIRECT CONTACT & TESTIMONIAL      */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col justify-between pt-2">
              <div>
                {/* Small Kicker Pill / Text */}
                <div className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-[13px]">
                  YOUR COMPLIANCE JOURNEY STARTS HERE
                </div>

                {/* Massive Bold Headline matching screenshot */}
                <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[54px] lg:leading-[1.12]">
                  Let&rsquo;s talk compliance &mdash;{" "}
                  <span className="block text-slate-100">
                    Envista is here to help.
                  </span>
                </h1>

                {/* Subtitle / Helper Paragraph */}
                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#c4b5fd]/90">
                  Just fill out our contact form and we&rsquo;ll get back to you within 24 hours. Prefer to speak directly? Schedule a call by phone or via email. We&rsquo;re here when you need us.
                </p>

                {/* Direct Call & Email Contact Blocks */}
                <div className="mt-8 space-y-5 sm:space-y-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Call
                    </div>
                    <a
                      href="tel:+912268009000"
                      className="mt-1 block font-mono text-lg sm:text-xl font-bold text-white transition-colors hover:text-violet-300"
                    >
                      +91 22 6800 9000 / 1800 120 1022
                    </a>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Send Email
                    </div>
                    <a
                      href="mailto:connect@envistacyber.com"
                      className="mt-1 block font-mono text-base sm:text-lg font-bold text-white transition-colors hover:text-violet-300"
                    >
                      connect@envistacyber.com
                    </a>
                  </div>
                </div>
              </div>

              {/* TESTIMONIAL BLOCK AT BOTTOM LEFT (EXACT CYBERCREST MATCH) */}
              <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10">
                {/* Large Quote Mark Glyph */}
                <div className="font-serif text-5xl sm:text-6xl font-black leading-none text-cyan-400/40 select-none">
                  &ldquo;
                </div>

                {/* Quote Text */}
                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#d8cefa]">
                  The Envista Cyber Defence team has consistently produced high quality deliverables at fair prices. We give their client prospects our strongest recommendation.
                </p>

                {/* Author Info with Authentic Avatar */}
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={paulAvatarUrl}
                    alt="Paul Lucidi"
                    className="h-10 w-10 rounded-full border border-white/20 object-cover shadow-md"
                  />
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white">Paul Lucidi</span>{" "}
                    <span className="text-slate-400">&mdash; Founder and President, CyberAge Consulting LLC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT COLUMN: HIGH-TECH FORM CARD WITH 3D SHIELD CREST TOP    */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-6 relative mt-4 lg:mt-0">
              {/* Form Card Container */}
              <div className="relative rounded-3xl border border-sky-400/30 bg-[#090518]/95 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.15)] backdrop-blur-2xl">
                {/* 3D METALLIC SHIELD CREST BADGE MOUNTED AT THE TOP CENTER */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-sky-400/50 bg-[#070314] shadow-[0_10px_25px_rgba(0,0,0,0.9),0_0_20px_rgba(56,189,248,0.35)] transition-transform duration-300 hover:scale-105">
                    <img
                      src={shieldCrestUrl}
                      alt="Metallic Shield Crest"
                      className="h-10 w-10 sm:h-11 sm:w-11 object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]"
                    />
                  </div>
                </div>

                {submitted ? (
                  /* SUCCESS STATE */
                  <div className="py-14 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                      <svg className="h-8 w-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-extrabold text-white sm:text-3xl">
                      Enquiry Dispatched
                    </h3>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#d8cefa]">
                      Thank you for reaching out. An Envista senior security partner will review your enquiry and respond within 24 hours under standard non-disclosure terms.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setRecaptchaChecked(false);
                      }}
                      className="mt-8 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/20 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* THE FORM */
                  <form onSubmit={handleSubmit} className="mt-2 space-y-4 sm:space-y-5">
                    {/* First name & Last name (2 columns) */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          First name<span className="text-violet-400">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Last name<span className="text-violet-400">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                        />
                      </div>
                    </div>

                    {/* Email & Phone number (2 columns) */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Email<span className="text-violet-400">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Phone number<span className="text-violet-400">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+1 (800) 587-1250"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-white/15 bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                        />
                      </div>
                    </div>

                    {/* Company name* (Full width) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Company name<span className="text-violet-400">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl border border-white/15 bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                      />
                    </div>

                    {/* Your message (Full width) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Your message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-white/15 bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                      />
                    </div>

                    {/* How did you hear about us? (Select dropdown) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        How did you hear about us?
                      </label>
                      <div className="relative">
                        <select
                          value={formData.heardAbout}
                          onChange={(e) => setFormData({ ...formData, heardAbout: e.target.value })}
                          className="w-full appearance-none rounded-xl border border-white/15 bg-[#0e0724] px-4 py-3 text-sm text-white outline-none transition-all focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50 cursor-pointer"
                        >
                          <option value="" className="bg-[#0e0724] text-slate-400">Select one...</option>
                          <option value="Google Search" className="bg-[#0e0724]">Google Search</option>
                          <option value="LinkedIn" className="bg-[#0e0724]">LinkedIn</option>
                          <option value="Industry Conference / Event" className="bg-[#0e0724]">Industry Conference / Event</option>
                          <option value="Client Referral" className="bg-[#0e0724]">Client Referral</option>
                          <option value="Direct Outreach" className="bg-[#0e0724]">Direct Outreach</option>
                          <option value="Other" className="bg-[#0e0724]">Other</option>
                        </select>
                        {/* Down Chevron */}
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                          <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* RECAPTCHA BOX (MATCHING SCREENSHOT) */}
                    <div className="rounded-xl border border-white/15 bg-[#0b051e] p-3 sm:p-3.5 flex items-center justify-between shadow-inner">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <div
                          onClick={() => setRecaptchaChecked(!recaptchaChecked)}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-all ${
                            recaptchaChecked
                              ? "border-emerald-400 bg-emerald-500 text-white"
                              : "border-slate-500 bg-[#0e0724] hover:border-sky-400"
                          }`}
                        >
                          {recaptchaChecked && (
                            <svg className="h-4 w-4 fill-none stroke-current stroke-3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs sm:text-[13px] font-medium text-slate-200">
                          I&rsquo;m not a robot
                        </span>
                      </label>

                      {/* reCAPTCHA Brand Logo / Badge */}
                      <div className="flex flex-col items-center justify-center text-[8.5px] text-slate-400">
                        <svg className="h-7 w-7 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                        </svg>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400">reCAPTCHA</span>
                      </div>
                    </div>

                    {/* PRIVACY POLICY CONSENT & SUBMIT BUTTON ROW */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none max-w-sm">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#0e0724] text-sky-400 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-[10px] sm:text-[11px] leading-snug text-slate-400">
                          By submitting this form, you agree to our{" "}
                          <Link to="/about" className="text-sky-300 underline hover:text-white">
                            Privacy Policy
                          </Link>{" "}
                          and consent to the processing of your personal data in accordance with it.
                        </span>
                      </label>

                      {/* SUBMIT BUTTON (SOLID WHITE, BOLD BLACK, AS IN SCREENSHOT) */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-8 py-3.5 font-display text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all duration-200 hover:bg-slate-100 hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent" />
                            SUBMITTING...
                          </span>
                        ) : (
                          "SUBMIT"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WORLDWIDE OPERATIONS & REGIONAL HUBS (BOTTOM SECTION)                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#090518] py-16 sm:py-20 lg:py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_70%)]"
        />
        <div className={`${WRAP} relative z-10`}>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#c4b5fd]">
              Worldwide Operations
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Global Presence &amp; SOC Hubs
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#d8cefa]">
              Direct access to our certified lead auditors, Red Team operatives, and regulatory compliance counsel across key financial capitals.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {OFFICES.map((off, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.06] hover:shadow-[0_15px_30px_rgba(124,58,237,0.15)]"
              >
                <div>
                  <span className="inline-block rounded-md border border-violet-400/30 bg-violet-950/60 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                    {off.tag}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-white group-hover:text-violet-200 transition-colors">
                    {off.city}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                    {off.address}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Phone:</span>
                    <a href={`tel:${off.phone.replace(/\s+/g, "")}`} className="font-bold text-white hover:text-violet-300 transition-colors">
                      {off.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Email:</span>
                    <a href={`mailto:${off.email}`} className="font-bold text-violet-300 hover:text-white transition-colors">
                      {off.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
