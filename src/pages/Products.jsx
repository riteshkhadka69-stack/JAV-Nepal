import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { products, productCategories, getCategory } from "../data/products";
import Icon from "../components/common/Icon";
import CTASection from "../components/common/CTASection";
import ProductGrid from "../components/products/ProductGrid";
import usePageMeta from "../hooks/usePageMeta";

/**
 * Product catalogue.
 *
 * The active category lives in the URL (`/products?category=accessories`) so
 * a filtered view can be linked, bookmarked and shared, and the browser back
 * button steps through filter changes as the user expects.
 */
function Products() {
  usePageMeta({
    title: "Products",
    path: "/products",
    description:
      "Interactive flat panels in 55, 65, 75 and 86 inch size classes, plus the mounts, stands and PC modules that complete an installation.",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

  const visibleProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => product.categoryId === activeCategory);
  }, [activeCategory]);

  const selectCategory = (categoryId) => {
    const next = new URLSearchParams(searchParams);
    if (categoryId === "all") {
      next.delete("category");
    } else {
      next.set("category", categoryId);
    }
    setSearchParams(next, { replace: false });
  };

  const activeCategoryRecord = getCategory(activeCategory);

  const filters = [
    { id: "all", label: "All products", count: products.length },
    ...productCategories.map((category) => ({
      id: category.id,
      label: category.label,
      count: products.filter((product) => product.categoryId === category.id)
        .length,
    })),
  ];

  return (
    <>
      {/* ----------------------------------------------------- page header */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="bg-grid-navy pointer-events-none absolute inset-0"
        />
        <div className="container-page relative py-14 sm:py-18">
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
                Products
              </li>
            </ol>
          </nav>

          <h1 className="text-balance font-display text-4xl sm:text-5xl">
            Products
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-navy-200">
            Interactive flat panels and the mounts and modules that go with
            them. Select a product to see its full specification sheet.
          </p>

          <p className="mt-8 flex flex-wrap items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-navy-200">
            <Icon name="info" className="h-4 w-4 shrink-0 text-azure-300" />
            <span>
              Listings are organised by product type and size class.
              Manufacturer model names and specification values are pending
              official confirmation.
            </span>
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- catalogue */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-page">
          {/* Filters */}
          <div className="border-b border-navy-100 pb-6">
            <h2 className="sr-only">Filter products by category</h2>
            <div
              role="group"
              aria-label="Product category filters"
              className="flex flex-wrap gap-2.5"
            >
              {filters.map((filter) => {
                const isActive = activeCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => selectCategory(filter.id)}
                    aria-pressed={isActive}
                    className={[
                      "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all",
                      isActive
                        ? "border-navy-900 bg-navy-900 text-white shadow-panel"
                        : "border-navy-200 bg-white text-navy-700 hover:border-navy-400 hover:bg-navy-50",
                    ].join(" ")}
                  >
                    {filter.label}
                    <span
                      className={[
                        "rounded px-1.5 py-0.5 text-xs font-bold",
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-navy-50 text-navy-500",
                      ].join(" ")}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active category description + result count */}
          <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
            {/* A URL can name a category that no longer exists — an old link
                or bookmark. Saying "the complete range" above an empty grid
                would contradict itself, so only describe a real selection and
                let ProductGrid's empty state do the explaining. */}
            <p className="max-w-2xl text-sm text-navy-600">
              {activeCategory === "all"
                ? "The complete range across all categories."
                : activeCategoryRecord?.description}
            </p>
            {/* Announced on filter change for screen-reader users. */}
            <p
              aria-live="polite"
              className="shrink-0 text-sm font-semibold text-navy-900"
            >
              Showing {visibleProducts.length}{" "}
              {visibleProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          <ProductGrid
            products={visibleProducts}
            priorityCount={3}
            emptyMessage="No products in this category yet. Please check another category or get in touch with your requirement."
          />
        </div>
      </section>

      <CTASection
        title="Not sure which size class suits your room?"
        description="Send us the room dimensions and seating layout. We will recommend a size class and tell you what the installation involves."
        secondaryLabel="About us"
        secondaryTo="/about"
      />
    </>
  );
}

export default Products;
