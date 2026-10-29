import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, siteConfig, isPending } from "../../data/siteConfig";
import Button from "../common/Button";
import Icon from "../common/Icon";
import PendingValue from "../common/PendingValue";

/**
 * Sticky site header with a responsive navigation drawer.
 *
 * Accessibility behaviour:
 *  - the mobile trigger exposes aria-expanded / aria-controls
 *  - Escape closes the drawer and returns focus to the trigger
 *  - the drawer closes on route change so focus never strands inside it
 *  - active route is marked with aria-current via NavLink
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const triggerRef = useRef(null);
  const { pathname } = useLocation();

  /* Collapse the drawer whenever navigation happens.
     Adjusted during render rather than in an effect: React re-runs this
     component immediately with the corrected state, so the drawer never
     paints open on the new route. An effect would close it one frame late
     and trigger a cascading render. */
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

  /* Swap the header to its condensed, shadowed state once the page scrolls. */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape to close, and lock background scroll while the drawer is open. */
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const navLinkClasses = ({ isActive }) =>
    [
      "relative px-3 py-2 text-sm font-semibold transition-colors",
      "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-all",
      isActive
        ? "text-navy-900 after:bg-azure-500"
        : "text-navy-600 hover:text-navy-900 after:bg-transparent hover:after:bg-navy-200",
    ].join(" ");

  const mobileNavLinkClasses = ({ isActive }) =>
    [
      "flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold transition-colors",
      isActive
        ? "bg-navy-50 text-navy-900"
        : "text-navy-700 hover:bg-navy-50 hover:text-navy-900",
    ].join(" ");

  const phone = siteConfig.contact.phonePrimary;

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-all duration-300",
        isScrolled
          ? "border-navy-100 shadow-panel"
          : "border-transparent shadow-none",
      ].join(" ")}
    >
      {/* Utility strip — hidden on small screens to protect vertical space. */}
      <div className="hidden bg-navy-950 text-navy-200 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p>{siteConfig.description}</p>
          <p className="flex items-center gap-2">
            <Icon name="phone" className="h-3.5 w-3.5 text-azure-400" />
            <span className="font-medium text-navy-300">Sales enquiries:</span>
            {isPending(phone) ? (
              <PendingValue value={phone} label="Phone pending" />
            ) : (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="font-semibold text-white hover:text-azure-300"
              >
                {phone}
              </a>
            )}
          </p>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-18">
        {/* Wordmark. Replace with the official JAV Nepal logo when supplied. */}
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-lg"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 font-display text-base font-extrabold text-white transition-transform duration-200 group-hover:scale-105">
            {siteConfig.shortName}
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-navy-900">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-navy-500">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={navLinkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact" variant="primary" size="sm">
            Request a quotation
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-lg border border-navy-200 p-2.5 text-navy-800 transition-colors hover:bg-navy-50 lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
        >
          <Icon name={isMenuOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-navigation"
        hidden={!isMenuOpen}
        className="border-t border-navy-100 bg-white lg:hidden"
      >
        <nav aria-label="Mobile navigation" className="container-page py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={mobileNavLinkClasses}
                >
                  {link.label}
                  <Icon name="chevronRight" className="h-4 w-4 text-navy-300" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-navy-100 pt-4">
            <Button to="/contact" variant="primary" fullWidth>
              Request a quotation
            </Button>

            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-navy-600">
              <Icon name="phone" className="h-4 w-4 text-azure-500" />
              {isPending(phone) ? (
                <PendingValue value={phone} label="Phone pending" />
              ) : (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="font-semibold text-navy-900"
                >
                  {phone}
                </a>
              )}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
