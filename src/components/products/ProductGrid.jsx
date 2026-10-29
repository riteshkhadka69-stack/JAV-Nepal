import ProductCard from "./ProductCard";

/**
 * Responsive product grid: 1 column on phones, 2 on tablets, 3 on desktop.
 * Renders an empty state rather than a blank area when a filter matches
 * nothing.
 */
function ProductGrid({ products, columns = 3, emptyMessage, priorityCount = 0 }) {
  if (!products?.length) {
    return (
      <p className="rounded-xl border border-dashed border-navy-200 bg-navy-50 px-6 py-10 text-center text-sm text-navy-600">
        {emptyMessage ?? "No products match the current selection."}
      </p>
    );
  }

  const columnClasses =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid grid-cols-1 gap-6 ${columnClasses}`}>
      {products.map((product, index) => (
        <li key={product.id} className="flex">
          <ProductCard product={product} priority={index < priorityCount} />
        </li>
      ))}
    </ul>
  );
}

export default ProductGrid;
