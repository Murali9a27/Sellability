type PopupFormProps = {
  open: boolean;
  onClose: () => void;
};

export default function PopupForm({
  open,
  onClose,
}: PopupFormProps) {
  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-form"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="popup-form__close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="popup-form__title">
          Book a Consultation
        </h2>

        <p className="popup-form__subtitle">
          Fill in your details and our team will connect.
        </p>

        <form
          className="popup-form__fields"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />
          <textarea
            placeholder="Tell us about your requirement"
            rows={4}
          />

          <button
            type="submit"
            className="popup-form__submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}