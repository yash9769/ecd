import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

/* DPDP Act 2023 processing notice, shown above the contact form's submit
   button. This stage covers the notice itself, not a self-service Data
   Subject Request portal — see server/README.md "What's intentionally
   not here yet". Grievance officer details below are placeholders and
   MUST be replaced with real contact information before this notice is
   relied on in production; DPDP requires a genuine grievance officer
   contact. */
const GRIEVANCE_OFFICER = {
  name: "[Grievance Officer Name — TODO: replace]",
  email: "[grievance-officer@envistacyberdefence.com — TODO: replace]",
  address: "[Registered office address — TODO: replace]",
};

const RETENTION_PERIOD = "12 months from the date of submission";

export default function DpdpNotice() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-white/15 bg-[#0b051e] p-3.5 text-[11px] leading-relaxed text-slate-400 sm:p-4">
      <p>
        <span className="font-semibold text-slate-200">Data processing notice.</span> Under the Digital
        Personal Data Protection Act, 2023, we collect the personal data you provide in this form (name,
        email, phone, company, and your message) solely to respond to your enquiry and provide the
        services you request. We retain this data for {RETENTION_PERIOD}, after which it is deleted. You
        may withdraw consent, or request access to, correction of, or erasure of your data, at any time.
      </p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 inline-flex items-center gap-1.5 font-semibold text-sky-300 hover:text-white"
        aria-expanded={expanded}
      >
        {expanded ? "Hide full notice" : "Read full notice"}
        <CaretDown size={11} weight="bold" className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="mt-3 space-y-2.5 border-t border-white/10 pt-3">
          <div>
            <p className="font-semibold text-slate-200">Data items collected</p>
            <p>First and last name, email address, phone number, company name, the service(s) you select, any message you write, and how you heard about us.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-200">Purpose</p>
            <p>To respond to your enquiry, assess and deliver the cybersecurity services you request, and (only with your separate consent below) send you related communications.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-200">Retention</p>
            <p>{RETENTION_PERIOD}. Data is deleted or anonymized after this period unless a longer retention is required by law or an active engagement.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-200">Your rights</p>
            <p>You have the right to withdraw consent, access the personal data we hold about you, request correction of inaccurate data, and request erasure, subject to applicable law.</p>
          </div>
          <div>
            <p className="font-semibold text-slate-200">Grievance officer</p>
            <p>
              {GRIEVANCE_OFFICER.name} · {GRIEVANCE_OFFICER.email}
              <br />
              {GRIEVANCE_OFFICER.address}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
