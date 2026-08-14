import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

/**
 * Contact form endpoint — sends an email via SMTP.
 *
 * Configure credentials in `.env.local` (see `.env.example`):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
 */

const required = ["name", "phone", "eventType", "message"] as const;

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field — real users never fill this; bots do.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  for (const field of required) {
    if (!body[field]?.trim()) {
      return NextResponse.json(
        { error: `Please fill in your ${field === "eventType" ? "event type" : field}.` },
        { status: 400 }
      );
    }
  }

  const { name, email = "", phone, eventType, eventDate = "", message } = body;

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP is not configured — set SMTP_HOST/SMTP_USER/SMTP_PASS in .env.local");
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please call or WhatsApp us instead." },
      { status: 503 }
    );
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;border:1px solid #e5ddd0;border-radius:12px;overflow:hidden">
      <div style="background:#1a1410;color:#f5efe6;padding:24px 28px">
        <h2 style="margin:0;font-weight:normal;letter-spacing:1px">New Enquiry — ${esc(site.name)}</h2>
      </div>
      <div style="padding:28px;background:#faf7f2;color:#2a2118;line-height:1.7">
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Phone:</strong> <a href="tel:${esc(phone)}">${esc(phone)}</a></p>
        ${email ? `<p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>` : ""}
        <p><strong>Event:</strong> ${esc(eventType)}</p>
        ${eventDate ? `<p><strong>Event date:</strong> ${esc(eventDate)}</p>` : ""}
        <p style="margin-top:16px;padding:16px;background:#fff;border-left:3px solid #c9962e;border-radius:6px">${esc(message)}</p>
      </div>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL || SMTP_USER,
      replyTo: email || undefined,
      subject: `New enquiry: ${eventType} — ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nEvent: ${eventType}\nDate: ${eventDate}\n\n${message}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try WhatsApp or call us." },
      { status: 500 }
    );
  }
}
