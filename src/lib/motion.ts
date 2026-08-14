/** Shared animation tokens — one ease, consistent timings sitewide. */
export const easeLuxe = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeLuxe, delay },
  }),
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

export const maskLine = {
  hidden: { y: "110%" },
  visible: (delay = 0) => ({
    y: "0%",
    transition: { duration: 1.1, ease: easeLuxe, delay },
  }),
};
