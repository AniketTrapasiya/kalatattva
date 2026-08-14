import Reveal from "@/components/ui/Reveal";
import HeadlineReveal from "@/components/ui/HeadlineReveal";

/** Mono micro-label + oversized serif heading — the editorial section opener. */
export default function SectionHeading({
  label,
  lines,
  align = "left",
  dark = false,
  as = "h2",
}: {
  label: string;
  lines: string[];
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal y={16}>
        <p className={`micro-label mb-5 ${dark ? "text-gold" : "text-gold"}`}>{label}</p>
      </Reveal>
      <HeadlineReveal
        inView
        as={as}
        lines={lines}
        className={`display-md ${dark ? "text-paper" : "text-charcoal"}`}
      />
    </div>
  );
}
