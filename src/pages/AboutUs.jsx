import { Link } from "react-router-dom";
import { siteConfig, serviceHighlights } from "../data/siteConfig";
import Icon from "../components/common/Icon";
import SectionHeading from "../components/common/SectionHeading";
import CTASection from "../components/common/CTASection";
import PendingValue from "../components/common/PendingValue";
import usePageMeta from "../hooks/usePageMeta";

/**
 * About Us.
 *
 * This page describes HOW the business works — a process that can be stated
 * without documentation — and explicitly marks everything that cannot:
 * founding year, legal entity, registration numbers, certifications, team
 * size, client names and project counts. None of those are invented here.
 */

/* Process steps. Describes a standard supply-and-install sequence; makes no
   promises about timescales, pricing or coverage. */
const processSteps = [
  {
    step: "01",
    title: "Requirement discussion",
    description:
      "We start with the room: its dimensions, seating layout, lighting, and who will be using the board day to day.",
  },
  {
    step: "02",
    title: "Site survey",
    description:
      "We check the mounting wall, available power and network points, and how the unit will be brought into the building.",
  },
  {
    step: "03",
    title: "Recommendation and quotation",
    description:
      "You receive a written proposal covering the size class, mounting method, accessories and the full scope of work.",
  },
  {
    step: "04",
    title: "Supply and installation",
    description:
      "Delivery, mounting, cable management and commissioning, carried out at a time that suits the site.",
  },
  {
    step: "05",
    title: "Handover and training",
    description:
      "A walkthrough of annotation, screen sharing and everyday workflows, so the board is usable from the first session.",
  },
  {
    step: "06",
    title: "After-sales support",
    description:
      "Help with configuration questions and coordination of warranty service for the hardware we supply.",
  },
];

/* Working principles — statements of intent, not measurable guarantees. */
const principles = [
  {
    title: "Right-sized, not over-sold",
    description:
      "The largest panel is not always the right one. We recommend the size class that suits your room and budget, even when that is a smaller unit.",
    icon: "display",
  },
  {
    title: "Specifications in writing",
    description:
      "Quotations state the exact model, specification and warranty terms, so you can compare offers on equal footing.",
    icon: "clipboard",
  },
  {
    title: "Installed properly",
    description:
      "Interactive panels are pushed against in daily use. Mounting is matched to the wall structure and the rated load of the unit.",
    icon: "wrench",
  },
  {
    title: "Usable after handover",
    description:
      "Hardware that nobody has been shown how to use goes unused. Training is part of the installation, not an extra.",
    icon: "users",
  },
];

function AboutUs() {
  usePageMeta({
    title: "About Us",
    path: "/about",
    description:
      "How JAV Nepal works: requirement discussion, site survey, written recommendation, supply and installation, handover training and after-sales support for interactive display systems.",
  });

  const { legalName, foundedYear, registrationNumber, panNumber } = siteConfig;

  return (
    <>
      {/* ----------------------------------------------------- page header */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="bg-grid-navy pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-azure-600/15 blur-[100px]"
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
                About Us
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl">
            About {siteConfig.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-200">
            We supply, install and support interactive display systems for
            schools, training centres and offices in Nepal.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- what we do / facts */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="What we do"
                title="Display systems, end to end"
                as="h2"
              />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-navy-600">
                <p>
                  {siteConfig.name} works with interactive flat panels,
                  projector-based boards and the mounts, stands and PC modules
                  that complete an installation. Most of our work involves
                  replacing projector-and-whiteboard setups with a single touch
                  display.
                </p>
                <p>
                  A display project is rarely just a hardware purchase. The
                  wall has to carry the load, the room has to suit the screen
                  size, the software people already use has to run on it, and
                  the staff have to be shown how it works. We handle that
                  sequence rather than delivering a box.
                </p>
                <p>
                  If a smaller or cheaper configuration fits your room better,
                  we will tell you so. Getting the size class wrong is the most
                  common and most expensive mistake in this category.
                </p>
              </div>
            </div>

            {/* Company facts — openly incomplete. */}
            <aside className="lg:col-span-5">
              <div className="rounded-xl border border-navy-100 bg-navy-50 p-6">
                <h2 className="font-display text-base font-bold text-navy-900">
                  Company details
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  Registration and company history are published here once
                  documentation is confirmed. We would rather leave these blank
                  than state something we cannot evidence.
                </p>

                <dl className="mt-5 divide-y divide-navy-200 border-t border-navy-200 text-sm">
                  {[
                    ["Registered name", legalName],
                    ["Established", foundedYear],
                    ["Company registration no.", registrationNumber],
                    ["PAN / VAT no.", panNumber],
                    ["Country of operation", siteConfig.address.country],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-wrap items-center justify-between gap-2 py-3"
                    >
                      <dt className="font-medium text-navy-500">{label}</dt>
                      <dd className="text-right font-semibold text-navy-900">
                        <PendingValue value={value} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Certifications: listed only when evidenced. */}
              <div className="mt-6 rounded-xl border border-dashed border-navy-200 p-6">
                <h2 className="font-display text-base font-bold text-navy-900">
                  Certifications and authorisations
                </h2>
                {siteConfig.certifications.length > 0 ? (
                  <ul className="mt-4 space-y-2.5">
                    {siteConfig.certifications.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-navy-700"
                      >
                        <Icon
                          name="check"
                          className="mt-0.5 h-4 w-4 shrink-0 text-azure-600"
                          strokeWidth={2.2}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    No certifications or authorised-dealer claims are published
                    on this site yet. Any such claim will appear here only with
                    supporting documentation, and we are happy to provide
                    copies on request.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ process */}
      <section className="border-y border-navy-100 bg-navy-50 py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we work"
            title="From first conversation to working board"
            description="The sequence below is how a typical installation runs. Steps can be adjusted to suit your procurement process."
            as="h2"
          />

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((item) => (
              <li
                key={item.step}
                className="relative rounded-xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-panel"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-3xl font-extrabold text-navy-100"
                >
                  {item.step}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- principles */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we approach it"
            title="What you can expect from us"
            as="h2"
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <li
                key={principle.title}
                className="flex gap-5 rounded-xl border border-navy-100 p-6"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white">
                  <Icon name={principle.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-navy-900">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {principle.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- services */}
      <section className="bg-navy-900 py-14 text-white sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="What is included"
            tone="light"
            as="h2"
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceHighlights.map((service) => (
              <li
                key={service.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-azure-500/20 text-azure-300">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Have a room that needs equipping?"
        description="Tell us the dimensions and how the space is used. We will come back with a size class, a mounting approach and a written quotation."
      />
    </>
  );
}

export default AboutUs;
