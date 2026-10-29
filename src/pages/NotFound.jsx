import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import usePageMeta from "../hooks/usePageMeta";

/**
 * 404 page.
 *
 * Also reused by ProductDetails for an unknown product slug, which is why the
 * copy is overridable via props. When it is reused that way both components
 * write the document head, so ProductDetails passes the same title and
 * message it gives this component and the two writers agree.
 *
 * Marked noindex: an SPA serves this page with an HTTP 200, so without the
 * tag a search engine would happily index every mistyped URL.
 */
function NotFound({
  title = "Page not found",
  message = "The page you were looking for does not exist, or it may have moved.",
}) {
  usePageMeta({ title, description: message, noindex: true });

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 text-navy-400">
            <Icon name="info" className="h-7 w-7" />
          </span>

          <p className="mt-6 font-display text-sm font-bold uppercase tracking-[0.14em] text-azure-600">
            Error 404
          </p>

          <h1 className="mt-3 text-balance font-display text-3xl text-navy-900 sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-navy-600">
            {message}
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/products" variant="primary" size="lg">
              Browse products
              <Icon name="arrowRight" className="h-4 w-4" />
            </Button>
            <Button to="/" variant="outline" size="lg">
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
