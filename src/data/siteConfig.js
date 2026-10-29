/**
 * Business / contact configuration for the JAV Nepal showcase site.
 *
 * ---------------------------------------------------------------------------
 * PLACEHOLDER POLICY
 * ---------------------------------------------------------------------------
 * Nothing in this file is a verified JAV Nepal business fact unless it is
 * plain text below. Every value that must come from the business — phone
 * numbers, email addresses, street address, registration numbers, founding
 * year, certifications, partner names, social profiles — is set to the
 * `PENDING` sentinel.
 *
 * The UI detects `PENDING` and renders a visible "pending" chip instead of
 * fake data, so no placeholder can be mistaken for real information or ship
 * to production unnoticed.
 *
 * TO GO LIVE: replace each `PENDING` with the official value. Search the
 * codebase for `PENDING` to find every remaining gap.
 */

/** Sentinel marking a value that must be supplied by JAV Nepal. */
export const PENDING = "__PENDING_OFFICIAL_INFORMATION__";

/** True when a value has not yet been supplied by the business. */
export const isPending = (value) =>
  value === PENDING || value === undefined || value === null || value === "";

export const siteConfig = {
  /* Descriptive, non-factual copy. Safe to edit for tone; contains no claims
     about company size, history, awards or certifications. */
  name: "JAV Nepal",
  shortName: "JAV",
  tagline: "Interactive smart board solutions",
  description:
    "Interactive smart boards and large-format displays for classrooms, training rooms and boardrooms.",

  /* Public origin of the deployed site, with no trailing slash, e.g.
     "https://javnepal.com". Canonical links and Open Graph URLs are emitted
     only once this is supplied, because a wrong canonical is worse for search
     visibility than none at all. */
  siteUrl: PENDING,

  /* --- Verified business details: all pending --------------------------- */
  legalName: PENDING,
  foundedYear: PENDING, // Do not guess — affects "years in business" claims.
  registrationNumber: PENDING,
  panNumber: PENDING,

  contact: {
    phonePrimary: PENDING,
    phoneSecondary: PENDING,
    whatsapp: PENDING,
    email: PENDING,
    salesEmail: PENDING,
    supportEmail: PENDING,
  },

  address: {
    line1: PENDING,
    line2: PENDING,
    city: PENDING,
    district: PENDING,
    country: "Nepal",
    postalCode: PENDING,
    /* Paste the Google Maps "Embed a map" iframe src here. */
    mapEmbedUrl: PENDING,
  },

  /* Opening hours — pending confirmation. Shape kept so the UI can render a
     table as soon as real hours arrive. */
  businessHours: [
    { days: "Sunday – Friday", hours: PENDING },
    { days: "Saturday", hours: PENDING },
  ],

  social: {
    facebook: PENDING,
    instagram: PENDING,
    linkedin: PENDING,
    youtube: PENDING,
    tiktok: PENDING,
  },

  /* Certifications, authorised-dealer status and partner brands are legal
     claims. Leave empty until documentation is provided. */
  certifications: [],
  partnerBrands: [],
};

/** Primary navigation. Order here drives header and footer nav. */
export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/**
 * Service propositions shown on the homepage.
 * Generic capability statements only — no guarantees, SLAs, turnaround times
 * or coverage areas, since those would be unverified commitments.
 */
export const serviceHighlights = [
  {
    id: "consultation",
    title: "Requirement consultation",
    description:
      "We review room size, seating distance and intended use to shortlist a suitable display size and configuration.",
    icon: "clipboard",
  },
  {
    id: "installation",
    title: "Supply and installation",
    description:
      "Wall-mount or mobile-stand setup, cable management and on-site commissioning of the display.",
    icon: "wrench",
  },
  {
    id: "training",
    title: "Handover and training",
    description:
      "Walkthrough of annotation, screen sharing and everyday classroom or meeting-room workflows for your team.",
    icon: "users",
  },
  {
    id: "support",
    title: "After-sales support",
    description:
      "Assistance with configuration questions and coordination of warranty service for supplied hardware.",
    icon: "shield",
  },
];

/**
 * Where these displays are typically deployed. Describes use cases, not
 * client references — no named customers or deployment counts.
 */
export const useCases = [
  {
    id: "schools",
    title: "Schools and colleges",
    description:
      "Replace projector-and-whiteboard setups with a single touch display for lessons, digital content and recorded notes.",
  },
  {
    id: "training",
    title: "Training centres",
    description:
      "Annotate over live material, save sessions and share them with participants after the class.",
  },
  {
    id: "corporate",
    title: "Corporate meeting rooms",
    description:
      "Wireless presentation and video-conference support for hybrid meetings and client reviews.",
  },
  {
    id: "government",
    title: "Government and NGO offices",
    description:
      "Briefing rooms and situation rooms that need reliable large-format display with shared annotation.",
  },
];

export default siteConfig;
