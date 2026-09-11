import logoUrl from "../imports/Envista_Cyber_Defence_Logo-Gradient__1_.png";

// Full Envista Cyber Defence lockup (shield + wordmark).
// A faint white halo keeps the navy "Cyber Defence" tagline legible on dark.
export default function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Envista Cyber Defence"
      className={`w-auto select-none ${className}`}
      draggable={false}
      style={{
        filter: "drop-shadow(0 0 1px rgba(255,255,255,0.55)) drop-shadow(0 0 2px rgba(255,255,255,0.35))",
      }}
    />
  );
}
