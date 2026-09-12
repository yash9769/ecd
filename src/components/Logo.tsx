import logoUrl from "../imports/envista-logo.png";

/* Full Envista lockup (shield + wordmark + tagline).

   The supplied master has one limitation on this site: the "Cyber Defence"
   tagline is dark navy, which sits far too close to the dark ground to read
   on its own. Until a reversed/light variant of the mark exists, a single
   soft light halo separates it from the background — one shadow, tuned, not
   a stack of them fuzzing the edges. */
export default function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Envista Cyber Defence"
      width={1695}
      height={516}
      className={`w-auto select-none ${className}`}
      draggable={false}
      style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.55))" }}
    />
  );
}
