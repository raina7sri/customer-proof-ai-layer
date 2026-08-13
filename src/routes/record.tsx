import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
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
  validateSearch: (search: Record<string, unknown>): { id?: string } =>
    typeof search["id"] === "string" ? { id: search["id"] } : {},
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
      { property: "og:url", content: "https://customer-proof-ai-layer.lovable.app/record" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://customer-proof-ai-layer.lovable.app/record" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Start", item: "https://customer-proof-ai-layer.lovable.app/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Review record",
              item: "https://customer-proof-ai-layer.lovable.app/record",
            },
          ],
        }),
      },
    ],
  }),
  component: RecordPage,
});

function RecordPage() {
  const { record, selectedRecordId, setSelectedRecordId, customRecord, usedOwnNotes, setUsedOwnNotes } =
    useDemo();
  const id = Route.useSearch().id;
  const navigate = useNavigate({ from: "/record" });

  useEffect(() => {
    if (!id) return;
    if (!PROOF_RECORDS.some((r) => r.id === id)) return;
    if (id !== selectedRecordId || usedOwnNotes) setSelectedRecordId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const selectSample = (recordId: string) => {
    setSelectedRecordId(recordId);
    navigate({ search: { id: recordId }, replace: true });
  };

  const selectNotes = () => {
    setUsedOwnNotes(true);
    navigate({ search: () => ({}), replace: true });
  };

  const publicReady = isPublicUseReady(record);
  const fromNotes = record.source === "notes";

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
        {customRecord ? (
          <button
            onClick={selectNotes}
            className={`border px-3 py-1.5 text-xs transition-colors ${
              usedOwnNotes
                ? "border-violet bg-violet/[0.06] text-violet"
                : "border-hairline text-muted-foreground hover:border-violet/40 hover:text-plum"
            }`}
          >
            Your notes
          </button>
        ) : null}
        {PROOF_RECORDS.map((r) => (
          <button
            key={r.id}
            onClick={() => selectSample(r.id)}
            className={`border px-3 py-1.5 text-xs transition-colors ${
              !usedOwnNotes && r.id === selectedRecordId
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
                {f.label === "Approved proof" && record.proofDataPoints?.length ? (
                  <dl className="mt-4 border-t border-hairline">
                    {record.proofDataPoints.map((p) => (
                      <div
                        key={p.label}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline py-2.5"
                      >
                        <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                          {p.label}
                        </dt>
                        <dd className="text-xs font-medium text-plum">
                          <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px bg-signal align-middle" />
                          {p.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            ))}
            <div>
              <MicroLabel className="mb-4">Use controls</MicroLabel>
              <UseControls record={record} />
            </div>
          </dl>
          <p className="mt-7 border-t border-hairline pt-4 text-[0.68rem] text-muted-foreground">
            {fromNotes
              ? "Extracted from the material you pasted. Structured by AI, not human-approved — governance defaults start at internal use and internal review."
              : SAMPLE_DISCLAIMER}
          </p>
        </Panel>

        <div className="space-y-6">
          <div className="bg-plum p-6">
            <MicroLabel className="text-plum-foreground/55">
              {fromNotes ? "Human review · claim scope" : "Human review · claim scope (example)"}
            </MicroLabel>
            <p className="mt-3 text-xs leading-relaxed text-plum-foreground/60">
              {fromNotes
                ? "Derived from your pasted material. The scoped version is the claim ceiling this record carries downstream."
                : `Fixed illustrative example of the human review step. It is not derived from the selected record. ${SAMPLE_DISCLAIMER}`}
            </p>
            <div className="mt-5">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-signal">
                {fromNotes ? "Overreaching claim in the material" : "AI extraction"}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-plum-foreground/70 line-through decoration-signal/70">
                {record.claimReview.ai}
              </p>
            </div>
            <div className="mt-6">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-approve">
                {fromNotes ? "Scoped version for review" : "Human-approved version"}
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
            {fromNotes && (record.excludedClaims?.length ?? 0) > 0 ? (
              <div className="mb-6">
                <MicroLabel>Held out of this record</MicroLabel>
                <ul className="mt-3 space-y-3">
                  {record.excludedClaims!.map((c) => (
                    <li key={c.claim} className="border-l-2 border-signal pl-3 text-xs text-plum">
                      <span className="font-medium">{c.claim}</span>
                      <span className="mt-1 block leading-relaxed text-muted-foreground">
                        {c.reason}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
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