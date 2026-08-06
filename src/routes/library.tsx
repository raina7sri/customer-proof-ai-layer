import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  FILTER_GROUPS,
  PROOF_RECORDS,
  RECORD_FILTER_TAGS,
  SAMPLE_DISCLAIMER,
} from "@/data/proof-records";
import { useDemo } from "@/components/proof/demo-state";
import {
  Badge,
  Divider,
  MicroLabel,
  Panel,
  SectionHeading,
  approvalTone,
  loadTone,
  permissionTone,
} from "@/components/proof/ui";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Proof Library — Customer Proof AI Layer" },
      {
        name: "description",
        content:
          "Search and filter customer proof records by proof priority, buyer problem, vertical, approval status, permission, and customer load.",
      },
      { property: "og:title", content: "Proof Library" },
      {
        property: "og:description",
        content: "Governed customer proof records, searchable and filterable for GTM teams.",
      },
      { property: "og:url", content: "https://customer-proof-ai-layer.lovable.app/library" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://customer-proof-ai-layer.lovable.app/library" }],
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
              name: "Proof library",
              item: "https://customer-proof-ai-layer.lovable.app/library",
            },
          ],
        }),
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { setSelectedRecordId } = useDemo();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string[]>([]);

  const toggle = (value: string) =>
    setActive((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROOF_RECORDS.filter((r) => {
      const tags = RECORD_FILTER_TAGS[r.id];
      const haystack = [
        r.category,
        r.vertical,
        r.customerContext,
        r.proofPriority,
        r.buyerProblem,
        r.approvedProof,
      ]
        .join(" ")
        .toLowerCase();
      if (q && !haystack.includes(q)) return false;
      const values = [
        tags?.priority,
        tags?.problem,
        r.vertical,
        r.useControls.approvalStatus,
        r.useControls.permission,
        r.useControls.customerLoad,
      ].filter(Boolean) as string[];
      return active.every((a) => values.includes(a));
    });
  }, [query, active]);

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Library"
        title="Proof Library"
        description="Every record carries its own governance state. Filters reflect how GTM teams actually look for proof."
      />

      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search proof records"
          className="w-full max-w-xl border border-hairline bg-card px-4 py-3 text-sm text-plum outline-none placeholder:text-muted-foreground focus:border-violet"
        />
        <div className="mt-6 space-y-4">
          {FILTER_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-wrap items-center gap-2">
              <MicroLabel className="w-40 shrink-0">{group.label}</MicroLabel>
              {group.options.map((opt) => {
                const on = active.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggle(opt)}
                    className={`border px-2.5 py-1 text-[0.7rem] transition-colors ${
                      on
                        ? "border-violet bg-violet text-violet-foreground"
                        : "border-hairline text-muted-foreground hover:border-violet/40 hover:text-plum"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {active.length > 0 ? (
          <button
            onClick={() => setActive([])}
            className="mt-4 text-xs text-violet underline underline-offset-4"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <Divider />

      <div>
        <MicroLabel className="mb-5">
          {results.length} of {PROOF_RECORDS.length} records
        </MicroLabel>
        <div className="grid gap-5 md:grid-cols-2">
          {results.map((r) => (
            <Panel key={r.id} className="p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-sm font-semibold text-plum">{r.category}</h2>
                <Badge tone="muted">{r.vertical}</Badge>
              </div>
              <Divider className="my-4" />
              <MicroLabel>Proof priority</MicroLabel>
              <p className="mt-1.5 text-xs leading-relaxed text-plum/85">{r.proofPriority}</p>
              <MicroLabel className="mt-4">Buyer problem</MicroLabel>
              <p className="mt-1.5 text-xs leading-relaxed text-plum/85">{r.buyerProblem}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                <Badge tone={approvalTone(r.useControls.approvalStatus)}>
                  {r.useControls.approvalStatus}
                </Badge>
                <Badge tone={permissionTone(r.useControls.permission)}>
                  {r.useControls.permission}
                </Badge>
                <Badge tone={loadTone(r.useControls.customerLoad)}>
                  {r.useControls.customerLoad}
                </Badge>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-[0.65rem] text-muted-foreground">{SAMPLE_DISCLAIMER}</p>
                <button
                  onClick={() => setSelectedRecordId(r.id)}
                  className="shrink-0 border border-plum/25 px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:border-violet hover:text-violet"
                >
                  Open record
                </button>
              </div>
            </Panel>
          ))}
        </div>
        {results.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No records match this combination of search and filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}