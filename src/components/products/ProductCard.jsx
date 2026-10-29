import { Link } from "react-router-dom";
import { getCategory } from "../../data/products";
import Icon from "../common/Icon";
import ProductVisual from "./ProductVisual";

/**
 * Catalogue card for one product.
 *
 * Showcase site, so the card leads to a specification page — there is no
 * price, stock state or add-to-cart control anywhere by design.
 *
 * The whole card is one link (stretched pseudo-element over the article)
 * rather than several competing links, which keeps the tab order to a single
 * stop per card.
 */
function ProductCard({ product, priority = false }) {
  const category = getCategory(product.categoryId);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-panel-lg focus-within:ring-2 focus-within:ring-azure-500 focus-within:ring-offset-2">
      {/* Visual */}
      <div className="relative aspect-4/3 overflow-hidden border-b border-navy-100">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <ProductVisual product={product} priority={priority} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {category ? (
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-azure-600">
            {category.label}
          </p>
        ) : null}

        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy-900">
          {/* Stretched link: makes the full card clickable, one tab stop. */}
          <Link
            to={`/products/${product.slug}`}
            className="before:absolute before:inset-0 before:content-[''] focus:outline-none"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy-600">
          {product.summary}
        </p>

        {product.bestFor?.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {product.bestFor.slice(0, 3).map((item) => (
              <li
                key={item}
                className="rounded-md bg-navy-50 px-2 py-1 text-[0.7rem] font-medium text-navy-600"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex items-center justify-between border-t border-navy-100 pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 transition-colors group-hover:text-azure-600">
            View specifications
            <Icon
              name="arrowRight"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>

          {product.isPlaceholder ? (
            <span
              className="rounded-md border border-dashed border-navy-300 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-navy-500"
              title="Placeholder listing — official specifications pending"
            >
              Specs pending
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
