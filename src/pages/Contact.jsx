import { Link } from "react-router-dom";
import { siteConfig, isPending } from "../data/siteConfig";
import Icon from "../components/common/Icon";
import SectionHeading from "../components/common/SectionHeading";
import PendingValue from "../components/common/PendingValue";
import InquiryForm from "../components/forms/InquiryForm";
import usePageMeta from "../hooks/usePageMeta";

/**
 * Contact page.
 *
 * Every real contact detail lives in `src/data/siteConfig.js` and is still
 * `PENDING`, so this page renders visible "pending" chips rather than any
 * invented phone number, email address or street address.
 */

/** One contact method row — a link when real, a pending chip when not. */
function ContactMethod({ icon, label, value, href, note }) {
  const pending = isPending(value);

  return (
    <li className="flex gap-4 rounded-xl border border-navy-100 bg-white p-5">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-navy-500">
          {label}
        </h3>
        <div className="mt-1.5 font-semibold text-navy-900">
          {pending ? (
            <PendingValue value={value} label={`${label} pending`} />
          ) : (
            <a
              href={href}
              className="break-words text-navy-900 underline decoration-azure-300 decoration-2 underline-offset-4 hover:text-azure-700"
            >
              {value}
            </a>
          )}
        </div>
        {note ? (
          <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{note}</p>
        ) : null}
      </div>
    </li>
  );
}

function Contact() {
  usePageMeta({
    title: "Contact",
    path: "/contact",
    description:
      "Send JAV Nepal your room dimensions, seating layout and intended use, and receive a suitable interactive display configuration with a written quotation.",
  });

  const { contact, address, businessHours } = siteConfig;

  const addressLines = [
    address.line1,
    address.line2,
    [address.city, address.district].filter((p) => !isPending(p)).join(", "),
    address.postalCode,
    address.country,
  ].filter((line) => line && !isPending(line));

  const hasStreetAddress = addressLines.length > 1;
  const hasMap = !isPending(address.mapEmbedUrl);

  return (
    <>
      {/* ----------------------------------------------------- page header */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="bg-grid-navy pointer-events-none absolute inset-0"
        />
        <div className="container-page relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-sm text-navy-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevronRight" className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-white">
                Contact
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl">
            Contact us
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-200">
            Send us your room details and intended use, and we will come back
            with a suitable configuration and a written quotation.
          </p>
        </div>
      </section>

      {/* -------------------------------------------- notice + details + form */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          {/* The honest headline of this page. */}
          <div className="mb-10 flex items-start gap-3.5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
            <Icon
              name="info"
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
            />
            <div className="text-sm leading-relaxed text-navy-800">
              <strong className="font-semibold text-navy-900">
                Contact details are not yet published.
              </strong>{" "}
              This site is in preparation and no official {siteConfig.name}{" "}
              phone number, email address or office address has been supplied
              for publication. Rather than display placeholder digits that
              someone might actually dial, the fields below are marked as
              pending. If you reached this page looking for {siteConfig.name},
              please use a contact route you already trust.
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Details column */}
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Get in touch"
                title="Contact details"
                as="h2"
              />

              <ul className="mt-8 space-y-4">
                <ContactMethod
                  icon="phone"
                  label="Phone"
                  value={contact.phonePrimary}
                  href={
                    isPending(contact.phonePrimary)
                      ? undefined
                      : `tel:${String(contact.phonePrimary).replace(/\s+/g, "")}`
                  }
                  note="Sales and general enquiries."
                />
                <ContactMethod
                  icon="mail"
                  label="Email"
                  value={contact.email}
                  href={
                    isPending(contact.email)
                      ? undefined
                      : `mailto:${contact.email}`
                  }
                  note="For written requirements and tender documents."
                />
                <li className="flex gap-4 rounded-xl border border-navy-100 bg-white p-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-navy-500">
                      Office
                    </h3>
                    <div className="mt-1.5 font-semibold text-navy-900">
                      {hasStreetAddress ? (
                        <address className="not-italic">
                          {addressLines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      ) : (
                        <PendingValue
                          value={undefined}
                          label="Address pending"
                        />
                      )}
                    </div>
                  </div>
                </li>
              </ul>

              {/* Business hours */}
              <div className="mt-8 rounded-xl border border-navy-100 bg-navy-50 p-6">
                <h2 className="flex items-center gap-2.5 font-display text-base font-bold text-navy-900">
                  <Icon name="clock" className="h-4 w-4 text-azure-600" />
                  Business hours
                </h2>
                <dl className="mt-4 divide-y divide-navy-200 border-t border-navy-200 text-sm">
                  {businessHours.map((entry) => (
                    <div
                      key={entry.days}
                      className="flex flex-wrap items-center justify-between gap-2 py-3"
                    >
                      <dt className="font-medium text-navy-600">
                        {entry.days}
                      </dt>
                      <dd className="font-semibold text-navy-900">
                        <PendingValue value={entry.hours} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Map */}
              <div className="mt-8">
                <h2 className="font-display text-base font-bold text-navy-900">
                  Find us
                </h2>
                {hasMap ? (
                  <div className="mt-4 overflow-hidden rounded-xl border border-navy-100">
                    <iframe
                      src={address.mapEmbedUrl}
                      title={`Map showing the ${siteConfig.name} office location`}
                      className="h-72 w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : (
                  <div className="mt-4 flex h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-navy-200 bg-navy-50 px-6 text-center">
                    <Icon name="pin" className="h-7 w-7 text-navy-300" />
                    <p className="text-sm font-medium text-navy-600">
                      Map embed pending
                    </p>
                    <p className="max-w-xs text-xs leading-relaxed text-navy-500">
                      Add the Google Maps embed URL to{" "}
                      <code className="rounded bg-white px-1 py-0.5 font-mono text-[0.7rem] text-navy-700">
                        address.mapEmbedUrl
                      </code>{" "}
                      in{" "}
                      <code className="rounded bg-white px-1 py-0.5 font-mono text-[0.7rem] text-navy-700">
                        src/data/siteConfig.js
                      </code>
                      .
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-7">
              <InquiryForm />

              <p className="mt-6 text-sm leading-relaxed text-navy-600">
                Helpful details to include: room length and width, the distance
                from the board to the back row, whether you need a wall mount
                or a mobile stand, how many units you are considering, and any
                software that has to run on the board.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
