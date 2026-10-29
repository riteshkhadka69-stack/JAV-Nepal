/**
 * JAV Nepal product catalogue.
 *
 * ---------------------------------------------------------------------------
 * PLACEHOLDER POLICY — READ BEFORE EDITING
 * ---------------------------------------------------------------------------
 * These are PLACEHOLDER LISTINGS. They exist so the catalogue, routing and
 * specification tables can be built and reviewed before official JAV Nepal
 * product data arrives.
 *
 *  - Listings are named by product *type and size class* only. No model
 *    numbers, brand names or SKUs are invented.
 *  - Every specification VALUE is the `PENDING` sentinel. Only the
 *    specification LABELS are filled in, because those are standard industry
 *    attribute names, not claims about a product.
 *  - The one exception is "Screen size", which simply restates the size class
 *    in the listing's own title.
 *  - `isPlaceholder: true` makes the UI render a visible notice on every card
 *    and detail page. Set it to `false` only once a listing holds real,
 *    supplied data.
 *
 * TO GO LIVE, per product: replace the title with the official model name,
 * fill in every `PENDING` value from the manufacturer datasheet, add the
 * official image to `public/products/`, set `image`, and clear
 * `isPlaceholder`.
 */

import { PENDING } from "./siteConfig";

/**
 * Builds a spec row list.
 * Pass a string for a pending value, or a `[label, value]` pair when the
 * value is genuinely known.
 */
const specs = (entries) =>
  entries.map((entry) =>
    Array.isArray(entry)
      ? { label: entry[0], value: entry[1] }
      : { label: entry, value: PENDING },
  );

/** Specification sheet shared by every interactive flat panel listing. */
const flatPanelSpecGroups = (sizeInches) => [
  {
    title: "Display",
    specs: specs([
      ["Screen size", `${sizeInches}" diagonal (size class of this listing)`],
      "Panel type",
      "Native resolution",
      "Brightness",
      "Contrast ratio",
      "Viewing angle",
      "Surface glass and hardness",
      "Anti-glare treatment",
      "Rated panel lifetime",
    ]),
  },
  {
    title: "Touch and interaction",
    specs: specs([
      "Touch technology",
      "Simultaneous touch points",
      "Writing input",
      "Touch accuracy",
      "Touch response time",
      "Included stylus / pens",
      "Palm erase support",
      "Supported gestures",
    ]),
  },
  {
    title: "Computing and software",
    specs: specs([
      "Built-in operating system",
      "Processor",
      "RAM",
      "Internal storage",
      "Bundled whiteboard software",
      "Screen-sharing application",
      "Optional OPS PC module",
      "Supported external operating systems",
    ]),
  },
  {
    title: "Connectivity",
    specs: specs([
      "HDMI inputs",
      "HDMI output",
      "USB ports",
      "USB touch-out ports",
      "VGA / audio input",
      "RJ45 Ethernet",
      "Wi-Fi standard",
      "Bluetooth version",
      "RS232 control port",
      "Microphone / headphone jack",
    ]),
  },
  {
    title: "Audio",
    specs: specs([
      "Built-in speakers",
      "Rated audio output",
      "Built-in microphone array",
      "Built-in camera",
    ]),
  },
  {
    title: "Physical and power",
    specs: specs([
      "Dimensions with bezel",
      "Net weight",
      "Shipping weight",
      "VESA mount pattern",
      "Bezel material and finish",
      "Operating voltage",
      "Rated power consumption",
      "Standby power consumption",
      "Operating temperature and humidity",
    ]),
  },
  {
    title: "Warranty and support",
    specs: specs([
      "Manufacturer warranty period",
      "Warranty coverage scope",
      "On-site service availability",
      "Spare-parts availability",
    ]),
  },
];

export const productCategories = [
  {
    id: "interactive-flat-panel",
    label: "Interactive flat panels",
    description:
      "All-in-one touch displays that replace a projector, screen and whiteboard with a single unit.",
  },
  {
    id: "projector-board",
    label: "Projector-based boards",
    description:
      "Interactive whiteboard surfaces paired with an ultra-short-throw projector.",
  },
  {
    id: "accessories",
    label: "Mounts and accessories",
    description:
      "Stands, mounts and add-on modules that complete an installation.",
  },
];

export const products = [
  {
    id: "ifp-55",
    slug: "interactive-flat-panel-55",
    name: '55" Interactive Flat Panel',
    categoryId: "interactive-flat-panel",
    sizeInches: 55,
    /* Descriptive positioning copy — no performance or spec claims. */
    summary:
      "Entry size class, suited to smaller classrooms, tutorial rooms and compact huddle spaces.",
    overview:
      "The 55-inch size class suits rooms where the furthest viewer sits roughly three to four metres from the board. It covers the same interactive workflows as the larger panels in a smaller footprint, which also makes it a common choice for single-room pilots before a wider rollout.",
    bestFor: ["Tutorial rooms", "Huddle spaces", "Small classrooms"],
    highlights: [
      "Compact footprint for rooms under roughly 20 m²",
      "Single-unit replacement for projector, screen and whiteboard",
      "Wall-mount or mobile-stand installation",
    ],
    specGroups: flatPanelSpecGroups(55),
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
  {
    id: "ifp-65",
    slug: "interactive-flat-panel-65",
    name: '65" Interactive Flat Panel',
    categoryId: "interactive-flat-panel",
    sizeInches: 65,
    summary:
      "The most widely specified size class for standard classrooms and medium meeting rooms.",
    overview:
      "The 65-inch size class is the usual starting point for a standard classroom or a meeting room seating eight to twelve people. It generally balances legibility from the back row against wall space and budget, which is why most rollouts standardise on this size.",
    bestFor: ["Standard classrooms", "Medium meeting rooms", "Training rooms"],
    highlights: [
      "Common standard for classroom rollouts",
      "Fits most existing whiteboard wall positions",
      "Suits rooms seating roughly 8–12 people",
    ],
    specGroups: flatPanelSpecGroups(65),
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
  {
    id: "ifp-75",
    slug: "interactive-flat-panel-75",
    name: '75" Interactive Flat Panel',
    categoryId: "interactive-flat-panel",
    sizeInches: 75,
    summary:
      "Larger size class for wide classrooms, lecture rooms and boardrooms with longer sightlines.",
    overview:
      "The 75-inch size class is specified where the back row sits beyond about six metres, or where detailed material such as spreadsheets, CAD drawings and site plans has to stay readable across the room. It needs more clear wall width than the 65-inch class, so confirm the mounting position before ordering.",
    bestFor: ["Lecture rooms", "Boardrooms", "Wide classrooms"],
    highlights: [
      "Keeps fine detail legible from the back of the room",
      "Suited to boardroom and lecture-room sightlines",
      "Requires additional clear wall width — confirm before install",
    ],
    specGroups: flatPanelSpecGroups(75),
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
  {
    id: "ifp-86",
    slug: "interactive-flat-panel-86",
    name: '86" Interactive Flat Panel',
    categoryId: "interactive-flat-panel",
    sizeInches: 86,
    summary:
      "Large-format size class for auditoriums, halls and main briefing rooms.",
    overview:
      "The 86-inch size class is used in halls, auditoriums and primary briefing rooms where the viewing distance makes smaller panels impractical. Units in this class are heavy, so the wall structure, mount rating and delivery access all need to be checked as part of the site survey.",
    bestFor: ["Auditoriums", "Assembly halls", "Main briefing rooms"],
    highlights: [
      "Largest size class for long viewing distances",
      "Requires a structural wall check and rated mount",
      "Delivery access should be confirmed during the site survey",
    ],
    specGroups: flatPanelSpecGroups(86),
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
  {
    id: "iwb-ust",
    slug: "interactive-whiteboard-ust-projector",
    name: "Interactive Whiteboard with Ultra-Short-Throw Projector",
    categoryId: "projector-board",
    sizeInches: null,
    summary:
      "Projector-and-surface configuration, typically specified where a very large image is needed at lower cost per inch.",
    overview:
      "This configuration pairs a touch-sensitive board surface with an ultra-short-throw projector mounted directly above it. It produces a larger image for a given budget than a flat panel of equivalent size, with the trade-offs common to projection: the lamp or laser light source is a consumable, ambient light affects the image, and the projector needs periodic alignment.",
    bestFor: [
      "Very large image sizes",
      "Budget-constrained rollouts",
      "Rooms with controlled lighting",
    ],
    highlights: [
      "Larger image size for a given budget than a flat panel",
      "Ultra-short-throw mounting reduces presenter shadow and glare",
      "Light source is a consumable — factor replacement into running costs",
    ],
    specGroups: [
      {
        title: "Board surface",
        specs: specs([
          "Active board area",
          "Aspect ratio",
          "Touch technology",
          "Simultaneous touch points",
          "Surface material and finish",
          "Included pens",
        ]),
      },
      {
        title: "Projector",
        specs: specs([
          "Projection technology",
          "Light source type",
          "Rated light-source life",
          "Brightness",
          "Native resolution",
          "Contrast ratio",
          "Throw ratio",
          "Keystone correction range",
          "Rated fan noise",
        ]),
      },
      {
        title: "Connectivity",
        specs: specs([
          "HDMI inputs",
          "VGA input",
          "USB ports",
          "Audio input / output",
          "RS232 control port",
          "Network control support",
        ]),
      },
      {
        title: "Physical and power",
        specs: specs([
          "Board dimensions",
          "Projector dimensions",
          "Combined net weight",
          "Mounting arm type",
          "Operating voltage",
          "Rated power consumption",
        ]),
      },
      {
        title: "Warranty and support",
        specs: specs([
          "Board warranty period",
          "Projector warranty period",
          "Light-source warranty period",
          "Consumable and spare-parts availability",
        ]),
      },
    ],
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
  {
    id: "acc-mobile-stand",
    slug: "mobile-floor-stand",
    name: "Mobile Floor Stand",
    categoryId: "accessories",
    sizeInches: null,
    summary:
      "Wheeled stand for moving a panel between rooms, or where wall mounting is not possible.",
    overview:
      "A mobile stand suits shared displays, rented premises and heritage or partition walls that cannot take the load of a mounted panel. Check the stand's rated load and supported VESA pattern against the specific panel it will carry.",
    bestFor: [
      "Shared displays across rooms",
      "Rented premises",
      "Walls that cannot be drilled",
    ],
    highlights: [
      "Moves a display between rooms without re-installation",
      "Avoids wall modification in rented or heritage buildings",
      "Confirm rated load against the chosen panel size",
    ],
    specGroups: [
      {
        title: "Compatibility",
        specs: specs([
          "Supported panel size range",
          "Supported VESA patterns",
          "Maximum rated load",
        ]),
      },
      {
        title: "Construction",
        specs: specs([
          "Frame material and finish",
          "Height adjustment range",
          "Tilt adjustment range",
          "Castor type and locking",
          "Cable management",
          "Shelf or camera-mount provision",
        ]),
      },
      {
        title: "Physical",
        specs: specs([
          "Assembled dimensions",
          "Base footprint",
          "Net weight",
          "Assembly requirement",
        ]),
      },
      {
        title: "Warranty",
        specs: specs(["Warranty period", "Warranty coverage scope"]),
      },
    ],
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
  {
    id: "acc-ops-pc",
    slug: "ops-pc-module",
    name: "OPS PC Module",
    categoryId: "accessories",
    sizeInches: null,
    summary:
      "Slot-in Windows PC module for panels that need full desktop software rather than the built-in system.",
    overview:
      "An OPS module slides into the expansion slot on the back of a compatible panel and turns it into a full Windows PC, with no external box or trailing cables. It is the usual answer when teaching software, domain login or school management systems have to run directly on the board. Confirm slot compatibility with the specific panel before ordering.",
    bestFor: [
      "Full desktop software on the board",
      "Domain or managed-device login",
      "Avoiding an external PC and cabling",
    ],
    highlights: [
      "Runs full desktop applications directly on the panel",
      "No external PC enclosure or trailing cables",
      "Confirm OPS slot compatibility with the chosen panel",
    ],
    specGroups: [
      {
        title: "Computing",
        specs: specs([
          "Processor",
          "RAM and expansion",
          "Storage type and capacity",
          "Pre-installed operating system",
          "Licensing arrangement",
        ]),
      },
      {
        title: "Connectivity",
        specs: specs([
          "OPS connector standard",
          "USB ports",
          "HDMI output",
          "RJ45 Ethernet",
          "Wi-Fi and Bluetooth",
        ]),
      },
      {
        title: "Physical and power",
        specs: specs([
          "Module dimensions",
          "Net weight",
          "Cooling method",
          "Rated power draw",
        ]),
      },
      {
        title: "Warranty",
        specs: specs(["Warranty period", "Warranty coverage scope"]),
      },
    ],
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
  {
    id: "acc-wall-mount",
    slug: "wall-mount-bracket",
    name: "Wall Mount Bracket",
    categoryId: "accessories",
    sizeInches: null,
    summary:
      "Fixed or height-adjustable wall bracket rated for large-format interactive panels.",
    overview:
      "Interactive panels are pressed against during use, so the bracket and the wall behind it carry more than static weight. Height-adjustable brackets are worth specifying for schools, where the writing surface needs to suit both younger students and adults. Match the bracket's rated load and VESA pattern to the panel.",
    bestFor: [
      "Permanent single-room installation",
      "Schools needing adjustable board height",
      "Installations with a solid structural wall",
    ],
    highlights: [
      "Rated for the weight and push-force of large interactive panels",
      "Height-adjustable options suit mixed-age users",
      "Requires a verified structural wall",
    ],
    specGroups: [
      {
        title: "Compatibility",
        specs: specs([
          "Supported panel size range",
          "Supported VESA patterns",
          "Maximum rated load",
        ]),
      },
      {
        title: "Construction",
        specs: specs([
          "Mount type",
          "Height adjustment range",
          "Tilt adjustment range",
          "Wall clearance / depth",
          "Material and finish",
          "Included fixings",
        ]),
      },
      {
        title: "Warranty",
        specs: specs(["Warranty period", "Warranty coverage scope"]),
      },
    ],
    inTheBox: [PENDING],
    image: null,
    isPlaceholder: true,
  },
];

/** Look up one product by its URL slug. */
export const getProductBySlug = (slug) =>
  products.find((product) => product.slug === slug);

/** Products in a given category id. */
export const getProductsByCategory = (categoryId) =>
  products.filter((product) => product.categoryId === categoryId);

/** Category record for a given id. */
export const getCategory = (categoryId) =>
  productCategories.find((category) => category.id === categoryId);

/**
 * Up to `limit` other products, preferring the same category.
 * Used by the "related products" strip on the detail page.
 */
export const getRelatedProducts = (slug, limit = 3) => {
  const current = getProductBySlug(slug);
  if (!current) return [];

  const sameCategory = products.filter(
    (p) => p.slug !== slug && p.categoryId === current.categoryId,
  );
  const others = products.filter(
    (p) => p.slug !== slug && p.categoryId !== current.categoryId,
  );

  return [...sameCategory, ...others].slice(0, limit);
};

/** Products chosen for the homepage strip. */
export const getFeaturedProducts = () =>
  ["ifp-65", "ifp-75", "iwb-ust"]
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

export default products;
