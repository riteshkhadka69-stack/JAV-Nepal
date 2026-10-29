import { Link, useParams } from "react-router-dom";
import {
  getCategory,
  getProductBySlug,
  getRelatedProducts,
} from "../data/products";
import { isPending } from "../data/siteConfig";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import PendingValue from "../components/common/PendingValue";
import SectionHeading from "../components/common/SectionHeading";
import CTASection from "../components/common/CTASection";
import ProductGrid from "../components/products/ProductGrid";
import ProductVisual from "../components/products/ProductVisual";
import SpecificationTable from "../components/products/SpecificationTable";
import NotFound from "./NotFound";
import usePageMeta from "../hooks/usePageMeta";

/* Shared by this page's document head and by the NotFound component it
   renders, so the two agree on what the missing page is called. */
const NOT_FOUND_TITLE = "Product not found";
const NOT_FOUND_MESSAGE =
  "We could not find a product at this address. It may have been renamed or removed from the catalogue.";

/**
 * Product detail page, routed on `/products/:slug`.
 *
 * An unknown slug renders the NotFound page rather than crashing or showing
 * an empty shell, so hand-typed and stale URLs degrade gracefully.
 */
function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  /* Called before the early return so the hook order stays stable. */
  usePageMeta(
    product
      ? {
          title: product.name,
          path: `/products/${product.slug}`,
          description: `${product.summary} Full specification sheet and typical applications for the ${product.name} from JAV Nepal.`,
        }
      : {
          title: NOT_FOUND_TITLE,
          description: NOT_FOUND_MESSAGE,
          noindex: true,
        },
  );

  if (!product) {
    return <NotFound title={NOT_FOUND_TITLE} message={NOT_FOUND_MESSAGE} />;
  }

  const category = getCategory(product.categoryId);
  const related = getRelatedProducts(product.slug, 3);
  const hasRealInBox = product.inTheBox?.some((item) => !isPending(item));

  return (
    <>
      {/* ------------------------------------------------------- hero / intro */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="bg-grid-navy pointer-events-none absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-azure-600/15 blur-[100px]"
        />

        <div className="container-page relative py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-navy-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevronRight" className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              {category ? (
                <>
                  <li aria-hidden="true">
                    <Icon name="chevronRight" className="h-3.5 w-3.5" />
                  </li>
                  <li>
                    <Link
                      to={`/products?category=${category.id}`}
                      className="hover:text-white"
                    >
                      {category.label}
                    </Link>
                  </li>
                </>
              ) : null}
              <li aria-hidden="true">
                <Icon name="chevronRight" className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-white">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Visual */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 shadow-panel-lg">
                <div className="aspect-4/3 overflow-hidden rounded-xl">
                  <ProductVisual product={product} priority />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-6">
              {category ? (
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-azure-300">
                  {category.label}
                </p>
              ) : null}

              <h1 className="mt-3 text-balance font-display text-3xl leading-tight sm:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-navy-200">
                {product.summary}
              </p>

              {product.highlights?.length ? (
                <ul className="mt-7 space-y-3">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-azure-400"
                        strokeWidth={2.4}
                      />
                      <span className="text-sm leading-relaxed text-navy-100">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact" variant="light" size="lg">
                  Request a quotation
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Button>
                <Button to="/products" variant="outlineLight" size="lg">
                  Back to products
                </Button>
              </div>

              {/* Showcase site — state plainly that there is no online sale. */}
              <p className="mt-6 text-xs leading-relaxed text-navy-400">
                Pricing is quoted per installation and depends on size class,
                mounting method and site conditions. This website is a product
                showcase; orders are not placed online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- overview */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Overview"
                title="Where this configuration fits"
                as="h2"
              />
              <p className="mt-5 text-base leading-relaxed text-navy-600">
                {product.overview}
              </p>

              {product.bestFor?.length ? (
                <div className="mt-8">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-900">
                    Typically specified for
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.bestFor.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-navy-100 bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-700"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {/* What's in the box */}
            <aside className="lg:col-span-5">
              <div className="rounded-xl border border-navy-100 bg-navy-50 p-6">
                <h3 className="font-display text-base font-bold text-navy-900">
                  In the box
                </h3>

                {hasRealInBox ? (
                  <ul className="mt-4 space-y-2.5">
                    {product.inTheBox.map((item) => (
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
                  <div className="mt-4">
                    <PendingValue
                      value={undefined}
                      label="Box contents pending"
                    />
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">
                      The packing list will be published once the official
                      datasheet is supplied. Please ask us to confirm included
                      accessories in writing with your quotation.
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- specifications */}
      <section
        id="specifications"
        className="border-y border-navy-100 bg-navy-50 py-14 sm:py-20"
      >
        <div className="container-page">
          <SectionHeading
            eyebrow="Technical data"
            title="Specifications"
            description="Full attribute sheet for this listing."
            as="h2"
          />

          <div className="mt-10">
            <SpecificationTable groups={product.specGroups} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- related */}
      {related.length ? (
        <section className="bg-white py-14 sm:py-20">
          <div className="container-page">
            <SectionHeading
              eyebrow="Also consider"
              title="Related products"
              as="h2"
            />
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        title={`Interested in the ${product.name}?`}
        description="Send us your room details and we will confirm suitability, current specifications and a quotation."
        secondaryLabel="Compare other products"
        secondaryTo="/products"
      />
    </>
  );
}

export default ProductDetails;
