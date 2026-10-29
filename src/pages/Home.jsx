import { Link } from "react-router-dom";
import {
  siteConfig,
  serviceHighlights,
  useCases,
} from "../data/siteConfig";
import {
  getFeaturedProducts,
  productCategories,
  products,
} from "../data/products";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import SectionHeading from "../components/common/SectionHeading";
import CTASection from "../components/common/CTASection";
import ProductGrid from "../components/products/ProductGrid";
import ProductVisual from "../components/products/ProductVisual";
import usePageMeta from "../hooks/usePageMeta";

/**
 * Homepage.
 *
 * Deliberately contains no performance claims, client names, installation
 * counts or years-in-business figures. The only numbers shown are counts
 * derived from the catalogue itself, which are verifiable from the data file.
 */
function Home() {
  /* No title override — the homepage uses "JAV Nepal — <tagline>". */
  usePageMeta({
    path: "/",
    description:
      "JAV Nepal supplies and installs interactive smart boards and large-format displays for schools, colleges, training centres and corporate meeting rooms across Nepal.",
  });

  const featured = getFeaturedProducts();
  const heroProduct = products.find((product) => product.id === "ifp-75");

  const sizeClassCount = products.filter((p) => p.sizeInches).length;

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div
          aria-hidden="true"
          className="bg-grid-navy pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-azure-600/20 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-navy-500/25 blur-[90px]"
        />

        <div className="container-page relative py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="animate-rise lg:col-span-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-azure-300">
                <Icon name="display" className="h-3.5 w-3.5" />
                {siteConfig.tagline}
              </p>

              <h1 className="mt-6 text-balance font-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">
                Interactive smart boards for{" "}
                <span className="text-azure-400">classrooms</span> and{" "}
                <span className="text-azure-400">boardrooms</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-200">
                {siteConfig.name} supplies and installs interactive flat panels
                across Nepal. We help you match the right display size to your
                room, then handle installation and handover.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to="/products" variant="light" size="lg">
                  Explore products
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Button>
                <Button to="/contact" variant="outlineLight" size="lg">
                  Request a quotation
                </Button>
              </div>

              {/* Catalogue facts only — no invented business metrics. */}
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-navy-400">
                    Size classes
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-white">
                    {sizeClassCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-navy-400">
                    Categories
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-white">
                    {productCategories.length}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-navy-400">
                    Listings
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-white">
                    {products.length}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Hero visual */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-xl">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-azure-500/20 to-transparent blur-2xl"
                />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-panel-lg backdrop-blur-sm">
                  <div className="aspect-4/3 overflow-hidden rounded-xl">
                    {heroProduct ? (
                      <ProductVisual product={heroProduct} priority />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Honest status banner while official content is outstanding. */}
          <p className="mt-14 flex flex-wrap items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-navy-200">
            <Icon
              name="info"
              className="h-4 w-4 shrink-0 text-azure-300"
            />
            <span>
              <strong className="font-semibold text-white">
                Content in preparation:
              </strong>{" "}
              product photography, specifications and company contact details
              marked “pending” are awaiting official confirmation from{" "}
              {siteConfig.name}.
            </span>
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- services */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title="From room survey to handover"
            description="A display is only useful once it is mounted correctly and the people using it know how it works. We cover the whole path, not just the hardware."
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceHighlights.map((service) => (
              <li
                key={service.id}
                className="group rounded-xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-panel"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-navy-900 text-white transition-colors group-hover:bg-azure-500">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-base font-bold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- categories */}
      <section className="border-y border-navy-100 bg-navy-50 py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Product range"
            title="Two ways to equip a room"
            description="Interactive flat panels, or the mounts and modules that complete an installation."
          />

          {/* Two columns, matching the number of categories. */}
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {productCategories.map((category) => {
              const count = products.filter(
                (product) => product.categoryId === category.id,
              ).length;

              return (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.id}`}
                    className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-azure-200 hover:shadow-panel-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-bold text-navy-900 group-hover:text-azure-700">
                        {category.label}
                      </h3>
                      <span className="shrink-0 rounded-md bg-navy-50 px-2 py-1 text-xs font-semibold text-navy-600">
                        {count} {count === 1 ? "listing" : "listings"}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-azure-600">
                      View category
                      <Icon
                        name="arrowRight"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- featured */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured"
              title="Commonly specified configurations"
              description="A starting point for most rooms. Full specifications are listed on each product page."
              className="flex-1"
            />
            <Button to="/products" variant="outline" className="shrink-0">
              All products
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12">
            <ProductGrid products={featured} priorityCount={3} />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- use cases */}
      <section className="bg-navy-900 py-16 text-white sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Where they are used"
                title="Built for rooms where people work together"
                description="The same hardware serves very different rooms. What changes is the size class, the mounting method and the software that has to run on it."
                tone="light"
              />
              <div className="mt-8">
                <Button to="/contact" variant="light">
                  Discuss your room
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {useCases.map((useCase) => (
                <li
                  key={useCase.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20 hover:bg-white/8"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-azure-500/20 text-azure-300">
                    <Icon name="check" className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-200">
                    {useCase.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

export default Home;
