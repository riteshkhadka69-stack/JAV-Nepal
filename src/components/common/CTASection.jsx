import Button from "./Button";
import Icon from "./Icon";

/**
 * Closing call-to-action band, reused at the foot of most pages.
 *
 * This is a showcase site with no checkout, so the action is always "start a
 * conversation" — an enquiry or a phone call, never "add to cart".
 */
function CTASection({
  title = "Planning an interactive display installation?",
  description = "Tell us the room size, seating layout and how the board will be used. We will come back with a suitable size class and configuration.",
  primaryLabel = "Request a quotation",
  primaryTo = "/contact",
  secondaryLabel = "Browse products",
  secondaryTo = "/products",
}) {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-navy-800 via-navy-900 to-navy-950 px-6 py-12 sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="bg-grid-navy pointer-events-none absolute inset-0"
          />
          {/* Soft azure glow, decorative only. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-azure-500/20 blur-3xl"
          />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance text-2xl text-white sm:text-3xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-200">
                {description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
              <Button to={primaryTo} variant="light" size="lg">
                {primaryLabel}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Button>
              {secondaryTo ? (
                <Button to={secondaryTo} variant="outlineLight" size="lg">
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
