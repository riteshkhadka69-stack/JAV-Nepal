/**
 * Small inline icon set.
 *
 * Inline SVG rather than an icon package: the site needs a dozen glyphs, and
 * these inherit `currentColor` and add no dependency or network request.
 * Icons are decorative by default (`aria-hidden`); pass a `title` only when
 * the icon is the sole carrier of meaning.
 */

const paths = {
  clipboard: (
    <>
      <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1Z" />
      <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 1 0 5 5L21 21l-3 .4-1.2-6.6-8.2 8.2a2.1 2.1 0 0 1-3-3l8.2-8.2L6 4.4 6.4 1.4Z" />
  ),
  users: (
    <>
      <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
      <circle cx="10" cy="8" r="3.2" />
      <path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 5.2a3.2 3.2 0 0 1 0 5.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.2-2.9 7.9-7 9-4.1-1.1-7-4.8-7-9V6l7-3Z" />
      <path d="M9.2 12.2l2 2 3.6-3.8" />
    </>
  ),
  display: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="1.6" />
      <path d="M9.5 20.5h5M12 16.5v4" />
    </>
  ),
  touch: (
    <>
      <path d="M10 10V6a1.8 1.8 0 0 1 3.6 0v6" />
      <path d="M13.6 12v-1a1.7 1.7 0 0 1 3.4 0v1" />
      <path d="M17 12.5a1.7 1.7 0 0 1 3.2 0v2.8A6 6 0 0 1 14.2 21h-1a5 5 0 0 1-3.6-1.5L6 15.8a1.8 1.8 0 0 1 2.6-2.5L10 14.6" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5L20 7" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M6.6 3h3l1.5 4-2 1.4a11 11 0 0 0 5.5 5.5l1.4-2 4 1.5v3A2 2 0 0 1 18 20C10.8 19.5 4.5 13.2 4 6a2 2 0 0 1 2.6-3Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.4" />
    </>
  ),
  chevronRight: <path d="M9 6l6 6-6 6" />,
};

function Icon({ name, className = "h-5 w-5", title, strokeWidth = 1.7 }) {
  const glyph = paths[name];
  if (!glyph) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {glyph}
    </svg>
  );
}

export default Icon;
