import type { CSSProperties } from "react";

// Shared Tailwind utility-class strings for the /singh personal portfolio.
//
// These are plain arbitrary-value Tailwind classes (hex colours lifted
// straight from the original "ink"/"accent" palette in the standalone
// portfolio's tailwind.config.js). Using arbitrary values here — instead of
// extending the site-wide @theme in app/globals.css — keeps this palette
// scoped to the /singh tree only, with zero risk of it leaking into (or
// colliding with) 24xDev's cyan/blue business design system.

export const containerNarrow = "max-w-5xl mx-auto px-6 md:px-10";

export const section = "py-20 md:py-28 border-t border-[#eeeef0] first:border-t-0";

export const sectionTitle = "text-xs uppercase tracking-[0.2em] text-[#71717f] font-medium mb-3";

export const heading = "text-3xl md:text-4xl font-semibold tracking-tight text-[#1a1a1f]";

export const linkUnderline =
  "relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-current after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300";

export const chip =
  "inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-[#f7f7f8] text-[#494953] border border-[#eeeef0] hover:bg-[#eeeef0] transition-colors";

export const bulletDot = "mt-2 h-1 w-1 rounded-full bg-[#8e8e9c] flex-shrink-0";

// Subtle dot-grid background, matching the original .bg-grid utility.
export const gridBgStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
  backgroundSize: "48px 48px",
};

// Ink colour scale, for spots that need the raw hex value.
export const ink = {
  50: "#f7f7f8",
  100: "#eeeef0",
  200: "#d8d8de",
  300: "#b6b6c0",
  400: "#8e8e9c",
  500: "#71717f",
  600: "#5a5a66",
  700: "#494953",
  800: "#3d3d45",
  900: "#1a1a1f",
} as const;
