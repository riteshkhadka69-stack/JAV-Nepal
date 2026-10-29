import { Link } from "react-router-dom";
import { navLinks, siteConfig, isPending } from "../../data/siteConfig";
import { productCategories } from "../../data/products";
import Icon from "../common/Icon";
import PendingValue from "../common/PendingValue";

/** Formats the address block, skipping any line still pending. */
function AddressLines() {
  const { address } = siteConfig;
  const lines = [
    address.line1,
    address.line2,
    [address.city, address.district].filter((p) => !isPending(p)).join(", "),
    address.country,
  ].filter((line) => line && !isPending(line));

  /* Every street-level line is still pending — show one honest chip rather
     than a lone "Nepal". */
  if (lines.length <= 1) {
    return <PendingValue value={undefined} label="Address pending" />;
  }

  return (
    <address className="not-italic">
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </address>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="bg-navy-950 text-navy-300">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Identity */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              aria-label={`${siteConfig.name} — home`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-display text-base font-extrabold text-navy-900">
                {siteConfig.shortName}
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Certifications and partner brands are deliberately not listed
                until documentation is provided — see siteConfig.js. */}
          </div>

          {/* Site navigation */}
          <nav aria-labelledby="footer-nav-heading">
            <h2
              id="footer-nav-heading"
              className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white"
            >
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Product categories */}
          <nav aria-labelledby="footer-products-heading">
            <h2
              id="footer-products-heading"
              className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white"
            >
              Products
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {productCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="transition-colors hover:text-white"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <Icon
                  name="pin"
                  className="mt-0.5 h-4 w-4 shrink-0 text-azure-400"
                />
                <AddressLines />
              </li>
              <li className="flex gap-3">
                <Icon
                  name="phone"
                  className="mt-0.5 h-4 w-4 shrink-0 text-azure-400"
                />
                {isPending(contact.phonePrimary) ? (
                  <PendingValue
                    value={contact.phonePrimary}
                    label="Phone pending"
                  />
                ) : (
                  <a
                    href={`tel:${contact.phonePrimary.replace(/\s+/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {contact.phonePrimary}
                  </a>
                )}
              </li>
              <li className="flex gap-3">
                <Icon
                  name="mail"
                  className="mt-0.5 h-4 w-4 shrink-0 text-azure-400"
                />
                {isPending(contact.email) ? (
                  <PendingValue value={contact.email} label="Email pending" />
                ) : (
                  <a
                    href={`mailto:${contact.email}`}
                    className="break-all transition-colors hover:text-white"
                  >
                    {contact.email}
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year}{" "}
            {isPending(siteConfig.legalName)
              ? siteConfig.name
              : siteConfig.legalName}
            . All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-navy-400">
            <Icon name="info" className="h-3.5 w-3.5" />
            Product specifications and company details shown as “pending” are
            awaiting official confirmation.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
