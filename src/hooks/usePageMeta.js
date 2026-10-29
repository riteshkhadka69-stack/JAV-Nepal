import { useEffect } from "react";
import { siteConfig, isPending } from "../data/siteConfig";

/**
 * Sets the document head for the current page: title, meta description,
 * canonical link and social-preview tags.
 *
 * A single-page app does not update <head> on navigation by itself, so every
 * route would otherwise share the one set of tags baked into index.html.
 * That leaves every tab, bookmark, history entry, search result and shared
 * link describing the homepage. Each page calls this hook with its own values.
 *
 * Supersedes the earlier `useDocumentTitle`, which handled the title alone.
 *
 * Canonical and `og:url` are emitted only when `siteConfig.siteUrl` has been
 * supplied — see the note on that field. Everything else works regardless.
 */

/** Finds or creates a <meta> tag and sets its content. */
function setMetaTag(attribute, key, content) {
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

/** Finds or creates <link rel="canonical"> and points it at `href`. */
function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');

  if (!href) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

/**
 * @param {object}  meta
 * @param {string} [meta.title]        Page title. Omit on the homepage.
 * @param {string} [meta.description]  Falls back to the site description.
 * @param {string} [meta.path]         Route path, e.g. "/products". Required
 *                                     for a canonical URL to be emitted.
 * @param {boolean}[meta.noindex]      True for pages that should stay out of
 *                                     search results, such as 404s.
 */
function usePageMeta({ title, description, path, noindex = false } = {}) {
  const resolvedDescription = description || siteConfig.description;

  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.tagline}`;

    document.title = fullTitle;

    setMetaTag("name", "description", resolvedDescription);
    setMetaTag("name", "robots", noindex ? "noindex, follow" : "index, follow");

    /* Open Graph — used by Facebook, LinkedIn, WhatsApp and most chat apps. */
    setMetaTag("property", "og:site_name", siteConfig.name);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:locale", "en_GB");
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", resolvedDescription);

    /* Twitter/X. No official JAV Nepal preview image has been supplied, so no
       og:image or twitter:image is claimed; a summary card degrades to text
       cleanly, whereas pointing at a missing image would not. */
    setMetaTag("name", "twitter:card", "summary");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", resolvedDescription);

    const canonical =
      isPending(siteConfig.siteUrl) || !path
        ? null
        : `${String(siteConfig.siteUrl).replace(/\/+$/, "")}${path}`;

    setCanonical(canonical);

    if (canonical) {
      setMetaTag("property", "og:url", canonical);
    }
  }, [title, resolvedDescription, path, noindex]);
}

export default usePageMeta;
