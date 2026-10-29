# JAV Nepal — product showcase website

Marketing and product-showcase site for **JAV Nepal**, supplier and installer
of interactive smart boards for schools, colleges, training centres and
corporate meeting rooms.

This is a **showcase**, not a shop: there is no cart, no pricing and no
checkout anywhere by design. Every page funnels to an enquiry.

## Stack

| Concern  | Choice                                              |
| -------- | --------------------------------------------------- |
| UI       | React 19                                            |
| Build    | Vite 8                                              |
| Styling  | Tailwind CSS v4 via `@tailwindcss/vite`             |
| Routing  | react-router-dom 7 (`BrowserRouter`)                |
| Linting  | ESLint 10, flat config                              |
| Backend  | none — static front end                             |

Tailwind v4 has **no `tailwind.config.js`**. Design tokens (navy/azure
palette, fonts, shadows) are declared in the `@theme` block at the top of
[`src/index.css`](src/index.css) and become utilities automatically, so
`--color-navy-900` is usable as `bg-navy-900`.

## Commands

```bash
npm install      # once
npm run dev      # dev server with HMR  → http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally
npm run lint     # ESLint
```

## Project layout

```
src/
  data/           # all content and configuration — no JSX in here
    siteConfig.js   business details, nav, service/use-case copy, PENDING sentinel
    products.js     catalogue, spec sheets, and the lookup helpers
  components/
    common/         Button, Icon, SectionHeading, CTASection, PendingValue
    layout/         SiteLayout (skip link, scroll/focus handling), Header, Footer
    products/       ProductCard, ProductGrid, ProductVisual, SpecificationTable
    forms/          InquiryForm
  pages/          Home, Products, ProductDetails, AboutUs, Contact, NotFound
  hooks/
    usePageMeta.js  per-route title, description, canonical and Open Graph tags
  App.jsx         route table
  index.css       Tailwind import + design tokens + base layer
```

Content lives in `src/data/`, presentation lives in components. Keep it that
way: it is the seam a future CMS or API would plug into.

## The `PENDING` policy — read before editing content

No official JAV Nepal business facts or product specifications have been
supplied yet. Rather than invent them, every unknown value is set to the
`PENDING` sentinel exported from
[`src/data/siteConfig.js`](src/data/siteConfig.js). The `PendingValue`
component detects it and renders a visible "pending" chip, so a placeholder
cannot be mistaken for real information or quietly reach production.

This covers phone numbers, email addresses, the office address, registration
and PAN numbers, founding year, opening hours, social profiles,
certifications, product model names, every specification value, and all
product photography.

**To go live**, search the codebase for `PENDING` and replace each occurrence
with the official value. Nothing else needs changing — the chips disappear on
their own as real data arrives.

### Per product, to replace a placeholder listing

1. Set `name` to the official model name.
2. Fill in every `PENDING` spec value from the manufacturer datasheet.
3. Drop the product photo into `public/products/` and set
   `image: "/products/<file>.jpg"`.
4. Set `isPlaceholder: false`.

## SEO and metadata

[`src/hooks/usePageMeta.js`](src/hooks/usePageMeta.js) sets the title, meta
description, robots directive, canonical link and Open Graph / Twitter tags
for each route — a single-page app does not update `<head>` on navigation by
itself. `index.html` carries a static copy of the same tags for crawlers that
do not run JavaScript.

Two things are gated on configuration that does not exist yet:

- **Canonical and `og:url`** are emitted only once `siteConfig.siteUrl` is set
  to the real public origin. A wrong canonical is worse than none.
- **`sitemap.xml`** has not been generated, for the same reason. Add it, plus
  a `Sitemap:` line in `public/robots.txt`, once the domain is known.

There is no `og:image`, because no official preview image has been supplied; a
`summary` card degrades to text cleanly, whereas pointing at a missing file
would not.

`public/robots.txt` currently allows crawling. **If the site is deployed
publicly before the pending content is supplied, change it to `Disallow: /`
until launch.**

## The enquiry form is not connected

[`src/components/forms/InquiryForm.jsx`](src/components/forms/InquiryForm.jsx)
validates input, then tells the user plainly that nothing was transmitted and
shows them their details to copy. It does not fake a success message.

To make it live, replace the body of `submitInquiry` with a POST to your
endpoint or a form service (Formspree, Web3Forms, Netlify Forms, EmailJS,
Resend) and set `IS_SUBMISSION_WIRED_UP = true`.

Do not put an API key or secret in this front end — it ships to every
visitor's browser. Use a service that accepts a public form id, or proxy
through your own endpoint.

## Deployment — SPA fallback is required

`BrowserRouter` uses real paths, so the host must serve `index.html` for
unknown paths. Without it, a hard refresh or a shared link to
`/products/interactive-flat-panel-65` returns a server 404.

- **Netlify / Cloudflare Pages** — [`public/_redirects`](public/_redirects) ✅ included
- **Vercel** — [`vercel.json`](vercel.json) ✅ included
- **Apache** — `FallbackResource /index.html`
- **Nginx** — `try_files $uri $uri/ /index.html;`

Note that the 404 page is served with an HTTP 200 under this arrangement,
which is why it carries a `noindex` directive.

## Accessibility notes

Worth preserving if you refactor:

- Skip link and focus move to `<main>` on route change (`SiteLayout`)
- Mobile drawer: `aria-expanded`/`aria-controls`, Escape to close with focus
  returned to the trigger, background scroll lock
- Specification sheets are real `<table>` markup with `scope="row"` headers
- Product cards are a single tab stop each (stretched-link pattern)
- Filter changes are announced via `aria-live`
- `prefers-reduced-motion` is honoured globally in `index.css`
