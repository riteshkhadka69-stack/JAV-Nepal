import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Shared chrome for every route: skip link, header, routed main, footer.
 *
 * Also handles two things a single-page app has to do by hand:
 *  - reset scroll position on navigation
 *  - move focus to <main> so keyboard and screen-reader users land on the new
 *    page content instead of staying at the top of the old document
 */
function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    /* Skip the focus move on first paint — stealing focus on load is
       disorienting and would announce the page twice. */
    const main = document.getElementById("main-content");
    if (main && window.scrollY === 0 && pathname !== "/") {
      main.focus({ preventScroll: true });
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#main-content"
        className="sr-only z-[60] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default SiteLayout;
