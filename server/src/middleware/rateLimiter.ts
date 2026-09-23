import rateLimit from "express-rate-limit";

/* Contact-form submissions are the only endpoint worth throttling hard —
   it's the one that sends email and writes durable records per request.
   Consent writes are cheap and fire on ordinary page loads, so they get a
   much looser limit purely as an abuse backstop. */
export const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions from this address. Please try again later." },
});

export const consentLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});
