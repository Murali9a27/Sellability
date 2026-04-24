"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import Button from "./Button";
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
      <Image
        src="/images/sellability-wht-logo.png"
        alt="Sellability Logo"
        width={150}
        height={40}
        className="h-10 w-auto"
      />
    </div>
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
          <div className="hidden lg:block">
            <Button
              href="/contact"
              icon={<ArrowRight size={18} />}
              iconPosition="right"
            >
              Unlock Growth
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-white transition-all duration-300 hover:border-[#E94E2B] hover:text-[#E94E2B] lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" strokeWidth={2.2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2.2} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden fixed left-0 right-0 top-20 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Mobile">
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

            <div className="mt-3">
              <Button
                href="#book"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Book a Consultation
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
