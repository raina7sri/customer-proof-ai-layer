import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { OUTPUTS, PROOF_RECORDS, SAMPLE_DISCLAIMER } from "@/data/proof-records";
import { useDemo } from "@/components/proof/demo-state";
import { evaluateReuse, generateOutput } from "@/lib/governance";
import {
  Badge,
  Divider,
  ExclusionNote,
  GovernanceCheck,
  MicroLabel,
  Panel,
  SectionHeading,
  VerdictNote,
} from "@/components/proof/ui";

export const Route = createFileRoute("/use")({
  head: () => ({
    meta: [
      { title: "Use this proof — Customer Proof AI Layer" },
      {
        name: "description",
        content:
          "Generate role-specific outputs for Sales, CS, Marketing, Website, and Analyst/PR using only approved proof.",
      },
      { property: "og:title", content: "Use this proof" },
      {
        property: "og:description",
        content:
          "Every generated output carries a governance check and an explicit record of what was excluded.",
      },
      { property: "og:url", content: "https://customer-proof-ai-layer.lovable.app/use" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://customer-proof-ai-layer.lovable.app/use" }],
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
              name: "Use this proof",
              item: "https://customer-proof-ai-layer.lovable.app/use",
            },
          ],
        }),
      },
    ],
  }),
  component: UsePage,
});

function UsePage() {
  const { record, selectedRecordId, setSelectedRecordId, selectedOutputId, setSelectedOutputId, customRecord, usedOwnNotes, setUsedOwnNotes } =
    useDemo();

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Step 3"
        title="Use this proof"
        description="Five equal-weight outputs. Each one is generated from the approved record only, and each one is checked against permission, approval, and customer load."
      />

      <div className="flex flex-wrap gap-2">
        {customRecord ? (
          <button
            onClick={() => setUsedOwnNotes(true)}
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
            onClick={() => setSelectedRecordId(r.id)}
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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {OUTPUTS.map((output) => {
          const verdict = evaluateReuse(record, output);
          const selected = selectedOutputId === output.id;
          return (
            <Panel
              key={output.id}
              className={`flex flex-col p-6 transition-colors ${
                selected ? "border-violet" : ""
              }`}
            >
              <MicroLabel>{output.team}</MicroLabel>
              <h2 className="mt-2 text-sm font-semibold leading-snug text-plum">
                {output.label}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {output.purpose}
              </p>
              {selected ? (
                <>
                  <Divider className="my-5" />
                  <MicroLabel className="mb-2">Generated output</MicroLabel>
                  <p className="text-xs leading-relaxed text-plum/85">
                    {record.source !== "notes" && output.id === record.primaryOutput
                      ? record.primaryOutputCopy
                      : generateOutput(record, output)}
                  </p>
                </>
              ) : null}
              <div className="mt-5 space-y-4">
                <VerdictNote verdict={verdict} />
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    tone={
                      verdict.level === "allow"
                        ? "approve"
                        : verdict.level === "warn"
                          ? "signal"
                          : "muted"
                    }
                  >
                    {verdict.level === "allow"
                      ? "Cleared for use"
                      : verdict.level === "warn"
                        ? "Use with conditions"
                        : "Blocked"}
                  </Badge>
                  <button
                    onClick={() => setSelectedOutputId(selected ? null : output.id)}
                    disabled={verdict.level === "block"}
                    className="border border-plum/25 px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:border-violet hover:text-violet disabled:opacity-40"
                  >
                    {selected ? "Hide output" : "Generate output"}
                  </button>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      {selectedOutputId ? <GeneratedOutput /> : null}

      <p className="text-[0.68rem] text-muted-foreground">
        {record.source === "notes"
          ? "Generated from the record extracted from your material. Not human-approved."
          : SAMPLE_DISCLAIMER}
      </p>
    </div>
  );
}

function GeneratedOutput() {
  const { record, selectedOutputId } = useDemo();
  const ref = useRef<HTMLDivElement>(null);
  const output = OUTPUTS.find((o) => o.id === selectedOutputId);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedOutputId]);
  if (!output) return null;
  const verdict = evaluateReuse(record, output);

  return (
    <Panel className="p-7">
      <div ref={ref} />
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <MicroLabel>Generated for {output.team}</MicroLabel>
          <h2 className="mt-2 text-lg font-semibold text-plum">{output.label}</h2>
        </div>
        <Badge tone="muted">{record.category}</Badge>
      </div>
      <Divider className="my-6" />
      <p className="max-w-3xl text-sm leading-relaxed text-plum">
        {generateOutput(record, output)}
      </p>
      <Divider className="my-6" />
      <div className="grid gap-6 md:grid-cols-2">
        <GovernanceCheck />
        <div className="space-y-4">
          <ExclusionNote record={record} />
          <VerdictNote verdict={verdict} />
        </div>
      </div>
    </Panel>
  );
}