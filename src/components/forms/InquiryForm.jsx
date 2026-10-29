import { useId, useState } from "react";
import { products } from "../../data/products";
import { siteConfig, isPending } from "../../data/siteConfig";
import Button from "../common/Button";
import Icon from "../common/Icon";

/**
 * Product enquiry form.
 *
 * ---------------------------------------------------------------------------
 * NOT YET CONNECTED
 * ---------------------------------------------------------------------------
 * This project is a static front end with no backend or email service, so
 * nothing is transmitted on submit. The form validates input and then shows
 * the user a clear summary with instructions, instead of pretending the
 * message was sent — a silent no-op would be worse than no form at all.
 *
 * TO MAKE IT LIVE, replace the body of `submitInquiry` below with one of:
 *   - a POST to your own API endpoint
 *   - a form service (Formspree, Web3Forms, Netlify Forms)
 *   - an email service (EmailJS, Resend)
 * and set `IS_SUBMISSION_WIRED_UP = true`.
 */

const IS_SUBMISSION_WIRED_UP = false;

/** Replace with a real network call — see the note above. */
async function submitInquiry(values) {
  if (!IS_SUBMISSION_WIRED_UP) {
    /* Surfaced in the browser console for developers during setup. */
    console.info(
      "[InquiryForm] No submission endpoint configured. Captured values:",
      values,
    );
    return { delivered: false };
  }

  throw new Error("submitInquiry: endpoint not implemented");
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialValues = {
  name: "",
  organisation: "",
  email: "",
  phone: "",
  productSlug: "",
  quantity: "",
  message: "",
};

function InquiryForm() {
  const formId = useId();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | done
  const [submitted, setSubmitted] = useState(null);

  const fieldId = (name) => `${formId}-${name}`;
  const errorId = (name) => `${formId}-${name}-error`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    /* Clear a field's error as soon as the user edits it. */
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!values.email.trim() && !values.phone.trim()) {
      nextErrors.email =
        "Please provide an email address or a phone number so we can reply.";
    } else if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      nextErrors.message =
        "Please describe the room and how the board will be used.";
    } else if (values.message.trim().length < 10) {
      nextErrors.message = "Please add a little more detail (10+ characters).";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      /* Move focus to the first invalid field for keyboard users. */
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(fieldId(firstKey))?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitInquiry(values);
    setSubmitted({ ...values, delivered: result.delivered });
    setStatus("done");
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
    setStatus("idle");
  };

  /* ---------------------------------------------------------------- done */
  if (status === "done" && submitted) {
    const selectedProduct = products.find(
      (product) => product.slug === submitted.productSlug,
    );

    return (
      <div
        className="rounded-xl border border-navy-100 bg-white p-6 shadow-panel sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Icon name="info" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-bold text-navy-900">
              Your enquiry was not sent
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-600">
              This website has no enquiry backend connected yet, so nothing was
              transmitted. We are telling you plainly rather than showing a
              false confirmation. Please copy the details below and send them
              to JAV Nepal directly, or ask the site administrator to connect a
              form endpoint.
            </p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-navy-100 border-y border-navy-100 text-sm">
          {[
            ["Name", submitted.name],
            ["Organisation", submitted.organisation],
            ["Email", submitted.email],
            ["Phone", submitted.phone],
            ["Product of interest", selectedProduct?.name],
            ["Approximate quantity", submitted.quantity],
            ["Requirement", submitted.message],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-3">
                <dt className="font-medium text-navy-500">{label}</dt>
                <dd className="whitespace-pre-wrap text-navy-900 sm:col-span-2">
                  {value}
                </dd>
              </div>
            ))}
        </dl>

        <p className="mt-5 text-sm text-navy-600">
          Direct contact details:{" "}
          {isPending(siteConfig.contact.email) &&
          isPending(siteConfig.contact.phonePrimary) ? (
            <span className="font-medium text-navy-500">
              also pending official confirmation — see the Contact page.
            </span>
          ) : (
            <span className="font-medium text-navy-900">
              see the Contact page.
            </span>
          )}
        </p>

        <div className="mt-6">
          <Button onClick={resetForm} variant="outline">
            Edit and try again
          </Button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- form */
  const inputClasses = (name) =>
    [
      "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-navy-900",
      "transition-colors placeholder:text-navy-400",
      "focus:border-azure-500 focus:outline-none focus:ring-2 focus:ring-azure-500/30",
      errors[name] ? "border-red-400 bg-red-50/40" : "border-navy-200",
    ].join(" ");

  const labelClasses = "mb-1.5 block text-sm font-semibold text-navy-800";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-navy-100 bg-white p-6 shadow-panel sm:p-8"
    >
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-navy-900">
          Request a quotation
        </h3>
        <p className="mt-1.5 text-sm text-navy-600">
          Tell us about the room and we will suggest a suitable size class and
          configuration. Fields marked{" "}
          <span className="text-red-600" aria-hidden="true">
            *
          </span>{" "}
          are required.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor={fieldId("name")} className={labelClasses}>
            Full name{" "}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            className={inputClasses("name")}
            placeholder="Your name"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
          />
          {errors.name ? (
            <p
              id={errorId("name")}
              className="mt-1.5 text-sm font-medium text-red-600"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* Organisation */}
        <div>
          <label htmlFor={fieldId("organisation")} className={labelClasses}>
            School / organisation
          </label>
          <input
            id={fieldId("organisation")}
            name="organisation"
            type="text"
            autoComplete="organization"
            value={values.organisation}
            onChange={handleChange}
            className={inputClasses("organisation")}
            placeholder="Optional"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor={fieldId("email")} className={labelClasses}>
            Email address
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            className={inputClasses("email")}
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
          />
          {errors.email ? (
            <p
              id={errorId("email")}
              className="mt-1.5 text-sm font-medium text-red-600"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={fieldId("phone")} className={labelClasses}>
            Phone number
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            className={inputClasses("phone")}
            placeholder="Mobile or landline"
          />
        </div>

        {/* Product interest */}
        <div>
          <label htmlFor={fieldId("productSlug")} className={labelClasses}>
            Product of interest
          </label>
          <select
            id={fieldId("productSlug")}
            name="productSlug"
            value={values.productSlug}
            onChange={handleChange}
            className={inputClasses("productSlug")}
          >
            <option value="">Not sure yet — please advise</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor={fieldId("quantity")} className={labelClasses}>
            Approximate quantity
          </label>
          <input
            id={fieldId("quantity")}
            name="quantity"
            type="text"
            inputMode="numeric"
            value={values.quantity}
            onChange={handleChange}
            className={inputClasses("quantity")}
            placeholder="e.g. 4 units"
          />
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label htmlFor={fieldId("message")} className={labelClasses}>
            Your requirement{" "}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={handleChange}
            className={`${inputClasses("message")} resize-y`}
            placeholder="Room size, approximate seating distance, whether a wall mount or mobile stand is needed, and any software the board must run."
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? errorId("message") : undefined}
          />
          {errors.message ? (
            <p
              id={errorId("message")}
              className="mt-1.5 text-sm font-medium text-red-600"
            >
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Standing notice — visible before the user invests time typing. */}
      <p className="mt-6 flex items-start gap-2.5 rounded-lg bg-navy-50 px-4 py-3 text-xs leading-relaxed text-navy-600">
        <Icon
          name="info"
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-400"
        />
        <span>
          This form is not connected to an email service yet, so it cannot
          deliver your message. It will show you your details to copy instead.
          Please use the direct contact details on the Contact page.
        </span>
      </p>

      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Checking…" : "Submit enquiry"}
          {status === "submitting" ? null : (
            <Icon name="arrowRight" className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Error summary for screen readers. */}
      <div aria-live="polite" className="sr-only">
        {Object.keys(errors).length > 0
          ? `The form has ${Object.keys(errors).length} error${
              Object.keys(errors).length === 1 ? "" : "s"
            }. Please review the highlighted fields.`
          : ""}
      </div>
    </form>
  );
}

export default InquiryForm;
