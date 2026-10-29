/**
 * Section header: optional eyebrow label, heading, optional supporting text.
 *
 * `as` keeps the heading level correct for the page outline — a section
 * nested under an <h1> should normally render <h2>.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  tone = "dark",
  className = "",
  id,
}) {
  const isCentered = align === "center";
  const onNavy = tone === "light";

  return (
    <div
      className={[
        "max-w-3xl",
        isCentered ? "mx-auto text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p
          className={[
            "mb-3 flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.14em]",
            isCentered ? "justify-center" : "",
            onNavy ? "text-azure-300" : "text-azure-600",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span
            aria-hidden="true"
            className={[
              "h-px w-7",
              onNavy ? "bg-azure-300/60" : "bg-azure-500/50",
            ].join(" ")}
          />
          {eyebrow}
        </p>
      ) : null}

      <Heading
        id={id}
        className={[
          "text-balance text-3xl leading-tight sm:text-4xl",
          onNavy ? "text-white" : "text-navy-900",
        ].join(" ")}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={[
            "mt-4 text-base leading-relaxed sm:text-lg",
            onNavy ? "text-navy-200" : "text-navy-600",
          ].join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
