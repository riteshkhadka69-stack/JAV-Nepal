import { isPending } from "../../data/siteConfig";
import Icon from "../common/Icon";
import PendingValue from "../common/PendingValue";

/**
 * Grouped specification sheet.
 *
 * Real <table> markup with scoped row headers, so assistive technology can
 * announce "label: value" pairs correctly. Values that have not been supplied
 * render as a visible "Pending" chip via PendingValue — never as blank cells
 * or invented numbers.
 */
function SpecificationTable({ groups, className = "" }) {
  if (!groups?.length) return null;

  /* Count the gaps so the reader knows how complete the sheet is. */
  const allSpecs = groups.flatMap((group) => group.specs);
  const pendingCount = allSpecs.filter((spec) => isPending(spec.value)).length;

  return (
    <div className={className}>
      {pendingCount > 0 ? (
        <p className="mb-6 flex items-start gap-3 rounded-lg border border-azure-200 bg-azure-50 px-4 py-3.5 text-sm text-navy-700">
          <Icon
            name="info"
            className="mt-0.5 h-4 w-4 shrink-0 text-azure-600"
          />
          <span>
            <strong className="font-semibold text-navy-900">
              {pendingCount} of {allSpecs.length} specifications are pending.
            </strong>{" "}
            The attribute list below reflects what will be published; the
            values are awaiting the official JAV Nepal datasheet. Please
            request written confirmation before relying on any figure for a
            tender or purchase decision.
          </span>
        </p>
      ) : null}

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.title}>
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-navy-900">
              {group.title}
            </h3>

            <div className="overflow-hidden rounded-xl border border-navy-100">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">
                  {group.title} specifications
                </caption>
                <tbody>
                  {group.specs.map((spec, index) => (
                    <tr
                      key={spec.label}
                      className={
                        index % 2 === 1 ? "bg-navy-50/60" : "bg-white"
                      }
                    >
                      <th
                        scope="row"
                        className="w-1/2 border-b border-navy-100 px-4 py-3 text-left align-top font-medium text-navy-700 sm:w-2/5"
                      >
                        {spec.label}
                      </th>
                      <td className="border-b border-navy-100 px-4 py-3 align-top text-navy-900">
                        <PendingValue value={spec.value} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SpecificationTable;
