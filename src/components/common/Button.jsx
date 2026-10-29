import { Link } from "react-router-dom";

/**
 * One button surface for the whole site.
 *
 * Renders the correct element for the job so keyboard and screen-reader
 * behaviour stays correct:
 *   `to`    -> react-router <Link>   (internal navigation)
 *   `href`  -> <a>                   (external / tel: / mailto:)
 *   neither -> <button>              (in-page actions, form submit)
 */

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold " +
  "transition-all duration-200 ease-out disabled:cursor-not-allowed " +
  "disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  /* Primary action on light backgrounds. */
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 " +
    "shadow-panel hover:shadow-panel-lg hover:-translate-y-0.5 " +
    "focus-visible:outline-navy-900",
  /* Accent action — used sparingly, one per view. */
  accent:
    "bg-azure-500 text-white hover:bg-azure-600 active:bg-azure-700 " +
    "shadow-panel hover:shadow-panel-lg hover:-translate-y-0.5 " +
    "focus-visible:outline-azure-600",
  /* Secondary action on light backgrounds. */
  outline:
    "border border-navy-200 bg-white text-navy-900 hover:border-navy-400 " +
    "hover:bg-navy-50 active:bg-navy-100 focus-visible:outline-navy-900",
  /* Primary action on dark navy backgrounds. */
  light:
    "bg-white text-navy-900 hover:bg-navy-50 active:bg-navy-100 " +
    "shadow-panel hover:shadow-panel-lg hover:-translate-y-0.5 " +
    "focus-visible:outline-white",
  /* Secondary action on dark navy backgrounds. */
  outlineLight:
    "border border-white/30 text-white hover:border-white/70 " +
    "hover:bg-white/10 active:bg-white/15 focus-visible:outline-white",
  /* Lowest-emphasis action. */
  ghost:
    "text-navy-700 hover:bg-navy-50 hover:text-navy-900 " +
    "focus-visible:outline-navy-900",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-6 py-3 text-base",
};

function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  ...rest
}) {
  const classes = [
    base,
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
