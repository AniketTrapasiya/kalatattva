/** Infinite marquee strip — pure CSS loop, pauses on hover. */
export default function Marquee({
  children,
  slow = false,
  className = "",
}: {
  children: React.ReactNode;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div className={`group overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex w-max items-center ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        } group-hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
