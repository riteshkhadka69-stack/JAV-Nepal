import { isPending } from "../../data/siteConfig";

/**
 * Renders a value, or a visible "pending" chip when the business has not
 * supplied it yet.
 *
 * This is the guard that keeps placeholder data honest: a missing phone
 * number or specification is shown as an obvious gap rather than silently
 * rendering a sentinel string, an empty cell, or invented filler.
 */
function PendingValue({ value, label = "Pending", className = "" }) {
  if (!isPending(value)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-md border border-dashed " +
        "border-navy-300 bg-navy-50 px-2 py-0.5 text-xs font-medium " +
        "text-navy-500 " +
        className
      }
      /* Spells out the gap for screen readers, which cannot see the styling. */
      title="Awaiting official JAV Nepal information"
    >
      <span aria-hidden="true" className="text-navy-400">
        —
      </span>
      {label}
      <span className="sr-only"> — awaiting official information</span>
    </span>
  );
}

export default PendingValue;
