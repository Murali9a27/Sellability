"use client";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Careers", href: "#careers" },
  { label: "We Care", href: "#we-care" },
  { label: "Contact", href: "#contact" },
];

// Logo component — "SELLABILITY" with the "ILI" replaced by stylized orange/white bars
const Logo = () => (
  <Link
    href="/"
    className="flex flex-col leading-none select-none"
    aria-label="Sellability home"
  >
    <div className="flex items-end">
      <span className="text-white font-extrabold tracking-tight text-2xl md:text-[26px]">
        SELLAB
      </span>
      {/* Stylized bar chart replacing "ILI" */}
      <span
        className="flex items-end gap-[3px] mx-[3px] pb-[3px]"
        aria-hidden="true"
      >
        <span className="block w-[4px] h-[14px] bg-white rounded-[1px]" />
        <span className="block w-[4px] h-[22px] bg-[#E94E2B] rounded-[1px]" />
        <span className="block w-[4px] h-[18px] bg-white rounded-[1px]" />
      </span>
      <span className="text-white font-extrabold tracking-tight text-2xl md:text-[26px]">
        TY
      </span>
      <sup className="text-white text-[10px] md:text-xs font-semibold ml-0.5 mt-1">
        TM
      </sup>
    </div>
    <span className="text-white text-[9px] md:text-[10px] font-bold tracking-[0.28em] mt-1">
      UNLOCKING GROWTH
    </span>
    <img src="/images/sellability-wht-logo.png" alt="Sellability Logo" />
  </Link>
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-black border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 md:h-24 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-10"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white text-base font-medium hover:text-[#E94E2B] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#book"
            className="hidden lg:inline-flex items-center justify-center bg-[#E94E2B] hover:bg-[#d43e1d] transition-colors duration-200 text-white text-sm font-semibold tracking-wide px-6 py-4 whitespace-nowrap"
          >
            BOOK A CONSULTATION
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center p-2 text-white hover:text-[#E94E2B] transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              // Close (X) icon
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white text-base font-medium py-3 px-2 hover:text-[#E94E2B] hover:bg-white/5 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex items-center justify-center bg-[#E94E2B] hover:bg-[#d43e1d] transition-colors text-white text-sm font-semibold tracking-wide px-6 py-4"
            >
              BOOK A CONSULTATION
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
