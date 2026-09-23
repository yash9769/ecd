import React, { useState } from "react";
import { Link } from "react-router";
import { Check } from "@phosphor-icons/react";
import markUrl from "../imports/envista-mark.png";
import DpdpNotice from "../components/DpdpNotice";
import { submitContactForm } from "../lib/api";

const WRAP = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10";

const SERVICES_OPTIONS = [
  "Offensive Security (VAPT & Red Team)",
  "Defensive Security (24/7 SOC & MDR)",
  "Dark Web & Threat Intelligence",
  "Brand Risk Monitoring (BRM)",
  "GRC Solutions & Audit Readiness",
  "DPDPA Consulting & Privacy",
  "Cloud & Zero-Trust Security",
  "AI Security & Model Audits",
  "Security Awareness & Training",
  "Digital Forensics & Incident Response",
  "Virtual CISO & Virtual DPO",
  "Breach & Attack Simulation (BAS)",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    selectedServices: [] as string[],
    message: "",
    heardAbout: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      const updated = exists
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: updated };
    });
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Strictly accept leading '+' for international code, otherwise only digits
    let cleaned = "";
    for (let i = 0; i < raw.length; i++) {
      if (i === 0 && raw[i] === "+") {
        cleaned += "+";
      } else if (/\d/.test(raw[i])) {
        cleaned += raw[i];
      }
    }
    setFormData((prev) => ({ ...prev, phone: cleaned }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Disallow non-numeric keys except control keys and leading '+'
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Enter" ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }
    if (
      e.key === "+" &&
      e.currentTarget.selectionStart === 0 &&
      !e.currentTarget.value.includes("+")
    ) {
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleNameChange = (field: "firstName" | "lastName", val: string) => {
    // Only accept letters, spaces, hyphens, and apostrophes (disallow numbers)
    const cleaned = val.replace(/[^a-zA-Z\s'-]/g, "");
    setFormData((prev) => ({ ...prev, [field]: cleaned }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      newErrors.phone = "Phone number must be between 8 and 15 digits.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required.";
    }

    if (formData.selectedServices.length === 0) {
      newErrors.services = "Please select at least one service.";
    }

    if (!recaptchaChecked) {
      newErrors.recaptcha = "Please verify that you are not a robot.";
    }

    if (!formData.consent) {
      newErrors.consent = "Please agree to our privacy policy to proceed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const result = await submitContactForm({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      selectedServices: formData.selectedServices,
      message: formData.message.trim() || undefined,
      heardAbout: formData.heardAbout || undefined,
      consent: formData.consent,
    });

    setIsSubmitting(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#060212] text-white">
      {/* ========================================================================= */}
      {/* HERO SECTION & CONTACT FORM CARD                                          */}
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
            {/* LEFT COLUMN: HERO HEADLINE & PROCESS ROADMAP                  */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-start pt-1">
              <div>
                {/* High-tech Kicker Pill */}
                <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-violet-950/60 px-4 py-1.5 shadow-[0_0_25px_rgba(168,85,247,0.18)] backdrop-blur-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-violet-200">
                    YOUR COMPLIANCE &amp; DEFENCE PARTNER
                  </span>
                </div>

                {/* Massive Bold Headline with Cyber Gradient Accent */}
                <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[50px] lg:leading-[1.12]">
                  Let&rsquo;s talk security &mdash;{" "}
                  <span className="block mt-1 bg-gradient-to-r from-violet-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(56,189,248,0.25)]">
                    Envista is here to help.
                  </span>
                </h1>

                {/* Subtitle / Helper Paragraph */}
                <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
                  Tell us about your organization and requirements. Our senior cyber defence team will review your objectives and connect with tailored guidance.
                </p>

                {/* Engagement Advisory Roadmap Cards */}
                <div className="mt-8 space-y-4 max-w-lg">
                  <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-violet-400/30">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono text-xs font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Scoping &amp; Needs Discovery</h4>
                      <p className="mt-0.5 text-xs text-slate-300 leading-relaxed">
                        Comprehensive evaluation to map your infrastructure, regulatory scope, and security objectives.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-violet-400/30">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono text-xs font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Architectural Proposal</h4>
                      <p className="mt-0.5 text-xs text-slate-300 leading-relaxed">
                        Tailored statement of work with milestone deliverables, methodologies, and clear timelines.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors hover:border-violet-400/30">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono text-xs font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Direct Advisory Onboarding</h4>
                      <p className="mt-0.5 text-xs text-slate-300 leading-relaxed">
                        Engagement kickoff with certified lead auditors, Red Team operatives, and compliance counsel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT COLUMN: HIGH-TECH FORM CARD WITH ENVISTA LOGO BADGE     */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-7 relative mt-4 lg:mt-0">
              {/* Form Card Container */}
              <div className="relative rounded-3xl border border-sky-400/30 bg-[#090518]/95 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.15)] backdrop-blur-2xl">
                {/* ENVISTA LOGO BADGE MOUNTED AT THE TOP CENTER */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-violet-500/50 bg-[#070314] shadow-[0_10px_25px_rgba(0,0,0,0.9),0_0_25px_rgba(168,85,247,0.35)] transition-transform duration-300 hover:scale-105">
                    <img
                      src={markUrl}
                      alt="Envista Cyber Defence"
                      className="h-9 w-9 sm:h-10 sm:w-10 object-contain filter drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]"
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
                      Thank you for reaching out. An Envista senior security partner will review your enquiry and respond with tailored guidance under standard non-disclosure terms.
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
                          onChange={(e) => handleNameChange("firstName", e.target.value)}
                          className={`w-full rounded-xl border bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all ${
                            errors.firstName
                              ? "border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50"
                              : "border-white/15 focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.firstName}</p>
                        )}
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
                          onChange={(e) => handleNameChange("lastName", e.target.value)}
                          className={`w-full rounded-xl border bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all ${
                            errors.lastName
                              ? "border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50"
                              : "border-white/15 focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone number (2 columns) */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Work Email<span className="text-violet-400">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full rounded-xl border bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all ${
                            errors.email
                              ? "border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50"
                              : "border-white/15 focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                          Phone number<span className="text-violet-400">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          inputMode="numeric"
                          placeholder="+91 9800000000"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          onKeyDown={handlePhoneKeyDown}
                          className={`w-full rounded-xl border bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all ${
                            errors.phone
                              ? "border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50"
                              : "border-white/15 focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.phone}</p>
                        )}
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
                        placeholder="Company Ltd."
                        value={formData.company}
                        onChange={(e) => {
                          setFormData({ ...formData, company: e.target.value });
                          if (errors.company) setErrors({ ...errors, company: "" });
                        }}
                        className={`w-full rounded-xl border bg-[#0e0724] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all ${
                          errors.company
                            ? "border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/50"
                            : "border-white/15 focus:border-sky-400 focus:bg-[#120930] focus:ring-1 focus:ring-sky-400/50"
                        }`}
                      />
                      {errors.company && (
                        <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.company}</p>
                      )}
                    </div>

                    {/* WHAT SERVICE ARE YOU INTERESTED IN? (MANDATORY) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        What service are you interested in?{" "}
                        <span className="text-slate-400 font-normal">(Select all that apply)</span>
                        <span className="text-violet-400 font-bold ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {SERVICES_OPTIONS.map((srv) => {
                          const isSelected = formData.selectedServices.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => toggleService(srv)}
                              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer text-left border ${
                                isSelected
                                  ? "border-violet-400 bg-violet-600/25 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-violet-400/50"
                                  : "border-white/10 bg-[#0e0724] text-slate-300 hover:border-white/25 hover:bg-[#140b33]"
                              }`}
                            >
                              <div
                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                                  isSelected
                                    ? "border-violet-300 bg-violet-500 text-white"
                                    : "border-slate-500 bg-transparent"
                                }`}
                              >
                                {isSelected && <Check size={11} weight="bold" />}
                              </div>
                              <span className="leading-snug">{srv}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && (
                        <p className="mt-1.5 text-[11px] font-medium text-rose-400">{errors.services}</p>
                      )}
                    </div>

                    {/* Your message (Full width) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Your message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Please share details on scope, timelines, or compliance goals..."
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

                    {/* RECAPTCHA BOX */}
                    <div>
                      <div className={`rounded-xl border p-3 sm:p-3.5 flex items-center justify-between shadow-inner transition-colors ${
                        errors.recaptcha ? "border-rose-500/70 bg-rose-950/20" : "border-white/15 bg-[#0b051e]"
                      }`}>
                        <div
                          role="checkbox"
                          aria-checked={recaptchaChecked}
                          tabIndex={0}
                          onClick={() => {
                            const nextVal = !recaptchaChecked;
                            setRecaptchaChecked(nextVal);
                            if (nextVal && errors.recaptcha) {
                              setErrors((prev) => ({ ...prev, recaptcha: "" }));
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              const nextVal = !recaptchaChecked;
                              setRecaptchaChecked(nextVal);
                              if (nextVal && errors.recaptcha) {
                                setErrors((prev) => ({ ...prev, recaptcha: "" }));
                              }
                            }
                          }}
                          className="flex items-center gap-3 cursor-pointer select-none"
                        >
                          <div
                            aria-hidden="true"
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
                        </div>

                        {/* reCAPTCHA Brand Logo / Badge */}
                        <div className="flex flex-col items-center justify-center text-[8.5px] text-slate-400">
                          <svg className="h-7 w-7 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                          </svg>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400">reCAPTCHA</span>
                        </div>
                      </div>
                      {errors.recaptcha && (
                        <p className="mt-1.5 text-[11px] font-medium text-rose-400">{errors.recaptcha}</p>
                      )}
                    </div>

                    {/* DPDP ACT 2023 PROCESSING NOTICE */}
                    <DpdpNotice />

                    {submitError && (
                      <div className="rounded-lg border border-rose-500/40 bg-rose-950/20 px-3.5 py-2.5 text-[12px] font-medium text-rose-300">
                        {submitError}
                      </div>
                    )}

                    {/* PRIVACY POLICY CONSENT & SUBMIT BUTTON ROW */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="max-w-sm">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormData({ ...formData, consent: checked });
                              if (checked && errors.consent) {
                                setErrors((prev) => ({ ...prev, consent: "" }));
                              }
                            }}
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
                        {errors.consent && (
                          <p className="mt-1 text-[11px] font-medium text-rose-400">{errors.consent}</p>
                        )}
                      </div>

                      {/* SUBMIT BUTTON */}
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
    </div>
  );
}
