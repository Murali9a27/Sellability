"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

export interface GlowButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

/**
 * GlowButton — Tailwind version
 *
 * Dark pill with diagonal corner glows (top-right + bottom-left).
 * Two pseudo-element layers: base glow (always on) + boost (fades in on hover).
 *
 * Requires Tailwind CSS v3.3+ (for arbitrary values in pseudo-elements).
 */
const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  function GlowButton({ children, className = "", type = "button", ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={[
          // Layout & shape
          "group relative inline-flex items-center justify-center",
          "px-[38px] py-[18px] rounded-full",
          "text-[20px] text-white font-normal cursor-pointer",
          "isolate",

          // Base surface
          "bg-[#0a0a0a] border border-white/65",
          "transition-[background-color,border-color] duration-200 ease-out",

          // Hover surface
          "hover:bg-[#141414] hover:border-white/90",

          // Active + focus
          "active:bg-[#060606]",
          "focus-visible:outline-none focus-visible:border-[rgba(120,180,255,0.9)]",

          // BASE GLOW (::before) — always visible
          "before:content-['']",
          "before:absolute before:inset-0 before:rounded-[inherit]",
          "before:pointer-events-none before:z-0",
          "before:bg-[radial-gradient(ellipse_70%_90%_at_100%_0%,rgba(255,255,255,0.32),rgba(255,255,255,0.12)_25%,transparent_55%),radial-gradient(ellipse_70%_90%_at_0%_100%,rgba(255,255,255,0.28),rgba(255,255,255,0.10)_25%,transparent_55%)]",

          // BOOST GLOW (::after) — fades in on hover
          "after:content-['']",
          "after:absolute after:inset-0 after:rounded-[inherit]",
          "after:pointer-events-none after:z-0",
          "after:opacity-0 hover:after:opacity-100",
          "after:transition-opacity after:duration-300 after:ease-out",
          "after:bg-[radial-gradient(ellipse_75%_100%_at_100%_0%,rgba(255,255,255,0.45),rgba(255,255,255,0.18)_30%,transparent_60%),radial-gradient(ellipse_75%_100%_at_0%_100%,rgba(255,255,255,0.40),rgba(255,255,255,0.15)_30%,transparent_60%)]",

          className,
        ].join(" ")}
        {...rest}
      >
        <span className="relative z-[1]">{children}</span>
      </button>
    );
  }
);

export default GlowButton;