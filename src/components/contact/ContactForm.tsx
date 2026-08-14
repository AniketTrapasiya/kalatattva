"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { easeLuxe } from "@/lib/motion";

const EVENT_TYPES = [
  "Wedding",
  "Pre-Wedding",
  "Shrimant & Baby Shower",
  "Garba & Sangeet",
  "Home Function",
  "Celebrity & Event",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

const labelClass = "micro-label mb-3 block text-ink-soft";
const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-charcoal outline-none transition-colors duration-500 placeholder:text-ink-soft/50 focus:border-gold";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The enquiry form — editorial underlined fields, honeypot, animated states. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      eventType: String(fd.get("eventType") ?? ""),
      eventDate: String(fd.get("eventDate") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setError(data.error ?? "Something went wrong. Please try WhatsApp or call us instead.");
        setStatus("error");
      }
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeLuxe }}
          className="flex min-h-[26rem] flex-col justify-center"
        >
          <svg viewBox="0 0 64 64" className="h-16 w-16 text-gold" aria-hidden="true">
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: easeLuxe }}
            />
            <motion.path
              d="M20 33.5l8.5 8.5L44 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: easeLuxe }}
            />
          </svg>
          <motion.h3
            className="display-md mt-8 text-charcoal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeLuxe }}
          >
            Message sent — we&rsquo;ll reply within 24 hours.
          </motion.h3>
          <motion.p
            className="mt-5 max-w-md leading-relaxed text-ink-soft"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: easeLuxe }}
          >
            Thank you for writing to us. Keep your function list handy — we&rsquo;ll call to
            check your dates and build a plan around them.
          </motion.p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -16, transition: { duration: 0.5, ease: easeLuxe } }}
          className="relative"
          noValidate={false}
        >
          {/* Honeypot — hidden from humans, tempting for bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Your name *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Full name"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className={labelClass}>
                Phone *
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="+91 …"
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="contact-event-type" className={labelClass}>
                Event type *
              </label>
              <div className="relative">
                <select
                  id="contact-event-type"
                  name="eventType"
                  required
                  defaultValue=""
                  className={`${fieldClass} appearance-none pr-8`}
                >
                  <option value="" disabled>
                    Choose your function
                  </option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-event-date" className={labelClass}>
                Event date
              </label>
              <input
                id="contact-event-date"
                name="eventDate"
                type="date"
                className={`${fieldClass} [color-scheme:light]`}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className={labelClass}>
                Your message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Tell us the functions, city and venue…"
                className={`${fieldClass} resize-none`}
              />
            </div>
          </div>

          {status === "error" && error && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeLuxe }}
              className="mt-8 text-sm text-sindoor"
            >
              {error}
            </motion.p>
          )}

          <div className="mt-12 text-center">
            <Magnetic strength={0.3}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="micro-label group inline-flex items-center gap-3 rounded-full bg-gold px-10 py-4 text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-paper disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  <>
                    Send enquiry
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </Magnetic>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
