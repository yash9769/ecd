import logoUrl from "../imports/envista-logo.png";

/* Full Envista lockup (shield + wordmark + tagline), rendered exactly as
   supplied — no glow, no recolouring. */
export default function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Envista Cyber Defence"
      width={1695}
      height={516}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
