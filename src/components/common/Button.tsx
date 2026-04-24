import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  transparent?: boolean;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  icon,
  transparent = false,
  iconPosition = "left",
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `
    mag-btn
    inline-flex
    items-center
    justify-center
    px-6
    py-4
    text-sm
    font-semibold
    uppercase
    tracking-wide
    border
    border-[#E25C2D]
    text-white
    ${transparent ? "mag-btn--transparent" : ""}
    ${className}
  `;

  const iconElement = icon ? (
    <span className="mag-btn__icon shrink-0">{icon}</span>
  ) : null;

  const content = (
    <span className="mag-btn__content inline-flex items-center gap-2">
      {iconPosition === "left" && iconElement}
      <span className="mag-btn__text">{children}</span>
      {iconPosition === "right" && iconElement}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}