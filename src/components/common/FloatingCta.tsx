"use client";

import { useState } from "react";

export default function FloatingCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="floating-cta"
        onClick={() => setOpen(true)}
        aria-label="Open consultation form"
      >
        <span className="floating-cta__icon">✉</span>
      </button>

      {open && (
        <div className="popup-overlay" onClick={() => setOpen(false)}>
          <div
            className="popup-form"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="popup-form__close"
              onClick={() => setOpen(false)}
              aria-label="Close form"
            >
              ×
            </button>

            <h2 className="popup-form__title">Book a Consultation</h2>
            <p className="popup-form__subtitle">
              Fill in your details and our team will get in touch.
            </p>

            <form className="popup-form__fields">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Email Address" />
              <input type="tel" placeholder="Phone Number" />
              <textarea placeholder="Tell us about your requirement" rows={4} />

              <button type="submit" className="popup-form__submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}