import { createFileRoute, Link } from "@tanstack/react-router";
import { PROOF_RECORDS, SAMPLE_DISCLAIMER } from "@/data/proof-records";
import { useDemo } from "@/components/proof/demo-state";
import {
  isPublicUseReady,
  readinessLabel,
  readinessReason,
  UPDATE_TRIGGERS,
} from "@/lib/governance";
import {
  Badge,
  Divider,
  MicroLabel,
  Panel,
  SectionHeading,
  UseControls,
} from "@/components/proof/ui";

export const Route = createFileRoute("/record")({
  head: () => ({
    meta: [
      { title: "Review Customer Proof Record — Customer Proof AI Layer" },
      {
        name: "description",
        content:
          "Review customer context, proof priority, buyer problem, approved proof, and use controls before any GTM reuse.",
      },
      { property: "og:title", content: "Review Customer Proof Record" },
      {
        property: "og:description",
        content:
          "A human decides claim scope. The record carries evidence strength, approval, permission, and customer load.",
      },
    ],
  }),
  component: RecordPage,
});

function RecordPage() {
  const { record, selectedRecordId, setSelectedRecordId } = useDemo();
  const publicReady = isPublicUseReady(record);

  const fields = [
    { label: "Customer context", value: record.customerContext },
    { label: "Proof priority", value: record.proofPriority },
    { label: "Buyer problem", value: record.buyerProblem },
    { label: "Approved proof", value: record.approvedProof },
  ];

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Step 2"
        title="Review Customer Proof Record"
        description="The record is the governed unit. Nothing downstream is generated from raw notes — only from approved proof."
      />

      <div className="flex flex-wrap gap-2">
        {PROOF_RECORDS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRecordId(r.id)}
            className={`border px-3 py-1.5 text-xs transition-colors ${
              r.id === selectedRecordId
                ? "border-violet bg-violet/[0.06] text-violet"
                : "border-hairline text-muted-foreground hover:border-violet/40 hover:text-plum"
            }`}
          >
            {r.category}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Panel className="p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold text-plum">{record.category}</h2>
            <Badge tone={publicReady ? "approve" : "signal"}>
              {publicReady ? "Public use ready" : readinessLabel(record)}
            </Badge>
          </div>
          {publicReady ? null : (
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {readinessReason(record)}
            </p>
          )}
          <Divider className="my-6" />
          <dl className="space-y-6">
            {fields.map((f) => (
              <div key={f.label}>
                <MicroLabel>{f.label}</MicroLabel>
                <dd className="mt-2 text-sm leading-relaxed text-plum">{f.value}</dd>
              </div>
            ))}
            <div>
              <MicroLabel className="mb-4">Use controls</MicroLabel>
              <UseControls record={record} />
            </div>
          </dl>
          <p className="mt-7 border-t border-hairline pt-4 text-[0.68rem] text-muted-foreground">
            {SAMPLE_DISCLAIMER}
          </p>
        </Panel>

        <div className="space-y-6">
          <div className="bg-plum p-6">
            <MicroLabel className="text-plum-foreground/55">
              Human review · claim scope (example)
            </MicroLabel>
            <p className="mt-3 text-xs leading-relaxed text-plum-foreground/60">
              Fixed illustrative example of the human review step. It is not derived from the
              selected record. {SAMPLE_DISCLAIMER}
            </p>
            <div className="mt-5">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-signal">
                AI extraction
              </span>
              <p className="mt-2 text-sm leading-relaxed text-plum-foreground/70 line-through decoration-signal/70">
                {record.claimReview.ai}
              </p>
            </div>
            <div className="mt-6">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-approve">
                Human-approved version
              </span>
              <p className="mt-2 text-sm leading-relaxed text-plum-foreground">
                {record.claimReview.approved}
              </p>
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs text-plum-foreground/70">
              AI can surface evidence. Humans decide the claim scope.
            </p>
          </div>

          <Panel className="p-6">
            <MicroLabel>Update triggers</MicroLabel>
            <ul className="mt-3 space-y-2">
              {UPDATE_TRIGGERS.map((t) => (
                <li key={t} className="flex items-start gap-2 text-xs text-plum">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-signal" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
              Any trigger moves the record to Needs update and pauses external reuse.
            </p>
          </Panel>

          <Link
            to="/use"
            className="inline-block bg-violet px-5 py-2.5 text-sm font-medium text-violet-foreground transition-colors hover:bg-plum"
          >
            Use this proof
          </Link>
        </div>
      </div>
    </div>
  );
}