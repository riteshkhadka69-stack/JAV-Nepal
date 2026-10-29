import { useId } from "react";

/**
 * Product imagery.
 *
 * No official JAV Nepal product photography has been supplied yet, so this
 * draws a clearly-labelled schematic placeholder instead of shipping a stock
 * photo that could be mistaken for the real product.
 *
 * WHEN REAL IMAGES ARRIVE: drop the file into `public/products/` and set
 * `image: "/products/<file>.jpg"` on the product in `src/data/products.js`.
 * This component then renders the photo and the placeholder disappears.
 */
function ProductVisual({ product, className = "", priority = false }) {
  const { image, name, sizeInches, categoryId } = product;

  /* SVG <pattern> and <linearGradient> are referenced by id, so the ids must
     be unique per rendered instance — not per product. The homepage shows the
     same product twice (hero and featured grid), which with product-derived
     ids produced duplicate DOM ids pointing at the first instance. */
  const instanceId = useId();
  /* useId() wraps its value in punctuation that is legal in an id attribute
     but awkward inside url(#…) and CSS selectors, so strip it. */
  const uid = instanceId.replace(/[^a-zA-Z0-9]/g, "");
  const gridId = `grid-${uid}`;
  const screenId = `screen-${uid}`;

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`h-full w-full object-cover ${className}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  /* Accessory listings get a simpler frame than a display panel. */
  const isAccessory = categoryId === "accessories";

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-navy-50 via-white to-navy-100 ${className}`}
    >
      {/* Faint blueprint grid behind the schematic. */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-navy-200"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={gridId}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0v28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.45"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      <svg
        viewBox="0 0 320 210"
        className="relative w-[78%] max-w-[320px] drop-shadow-sm"
        role="img"
        aria-label={`Schematic placeholder illustration for ${name}. Official product photography is pending.`}
      >
        <defs>
          <linearGradient
            id={screenId}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#1b3260" />
            <stop offset="55%" stopColor="#112142" />
            <stop offset="100%" stopColor="#09142a" />
          </linearGradient>
        </defs>

        {isAccessory ? (
          /* Mount / stand / module: upright post with a mounting plate. */
          <g
            fill="none"
            stroke="#26457b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="118"
              y="24"
              width="84"
              height="58"
              rx="4"
              fill={`url(#${screenId})`}
              stroke="none"
            />
            <path d="M160 82v76" />
            <path d="M112 158h96" />
            <path d="M126 178h68" strokeWidth="6" stroke="#4070b4" />
            <circle cx="126" cy="186" r="6" fill="#97b8e0" stroke="none" />
            <circle cx="194" cy="186" r="6" fill="#97b8e0" stroke="none" />
            <path d="M136 46h48M136 58h30" stroke="#6392cd" strokeWidth="3" />
          </g>
        ) : (
          /* Interactive display: bezel, screen, annotation marks, wall plate. */
          <g>
            {/* Bezel */}
            <rect
              x="18"
              y="14"
              width="284"
              height="166"
              rx="8"
              fill="#09142a"
            />
            {/* Screen */}
            <rect
              x="26"
              y="22"
              width="268"
              height="142"
              rx="3"
              fill={`url(#${screenId})`}
            />

            {/* Suggested on-screen annotation — purely decorative. */}
            <g
              fill="none"
              stroke="#4f9bf5"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.9"
            >
              <path d="M52 132c22-44 40 14 58-24s30 30 48-16 28 26 46-10" />
            </g>
            <g fill="none" stroke="#c4d7ef" strokeWidth="2.5" opacity="0.5">
              <path d="M52 48h86M52 62h58M52 76h72" strokeLinecap="round" />
            </g>

            {/* Camera / sensor bar */}
            <rect
              x="148"
              y="16.5"
              width="24"
              height="4"
              rx="2"
              fill="#26457b"
            />

            {/* Wall plate */}
            <path
              d="M160 180v12"
              stroke="#26457b"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M118 196h84"
              stroke="#4070b4"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>

      {/* Size class badge, when the listing has one. */}
      {sizeInches ? (
        <span className="absolute left-3 top-3 rounded-md bg-navy-900/90 px-2 py-1 font-display text-[0.7rem] font-bold tracking-wide text-white">
          {sizeInches}&quot;
        </span>
      ) : null}

      {/* The honest label: this is not the product. */}
      <span className="absolute bottom-3 right-3 rounded-md border border-dashed border-navy-300 bg-white/85 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-navy-500 backdrop-blur-sm">
        Image pending
      </span>
    </div>
  );
}

export default ProductVisual;
