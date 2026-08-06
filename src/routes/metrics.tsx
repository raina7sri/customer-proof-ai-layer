import { createFileRoute } from "@tanstack/react-router";
import { METRICS, PROOF_RECORDS, SAMPLE_DISCLAIMER_GLOBAL } from "@/data/proof-records";
import { isPublicUseReady } from "@/lib/governance";
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

export const Route = createFileRoute("/metrics")({
  head: () => ({
    meta: [
      { title: "Proof system health — Customer Proof AI Layer" },
      {
        name: "description",
        content:
          "Ready-to-use proof, source coverage, proof coverage, reuse count, and customer load across the proof library.",
      },
      { property: "og:title", content: "Proof system health" },
      {
        property: "og:description",
        content: "Measure whether customer proof is governed, covered, and actually being reused.",
      },
      { property: "og:url", content: "https://customer-proof-ai-layer.lovable.app/metrics" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://customer-proof-ai-layer.lovable.app/metrics" }],
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
              name: "Metrics",
              item: "https://customer-proof-ai-layer.lovable.app/metrics",
            },
          ],
        }),
      },
    ],
  }),
  component: MetricsPage,
});

function MetricsPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Measurement"
        title="Proof system health"
        description="Proof is a system, not a content backlog. These five measures show whether it is governed, covered, and reused."
      />

      <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-card p-6">
            <MicroLabel>{m.label}</MicroLabel>
            <p className="mt-3 font-display text-xl font-semibold text-plum">{m.value}</p>
            <p className="mt-3 text-[0.7rem] leading-relaxed text-muted-foreground">
              {m.definition}
            </p>
          </div>
        ))}
        <div className="bg-plum p-6">
          <MicroLabel className="text-plum-foreground/55">Governing principle</MicroLabel>
          <p className="mt-3 text-xs leading-relaxed text-plum-foreground/85">
            Customer proof is ready for public use only when approval supports it, permission
            supports it, proof strength supports it, and no update flag is active.
          </p>
        </div>
      </div>

      <Divider />

      <div>
        <MicroLabel className="mb-5">Record-level state</MicroLabel>
        <Panel className="divide-y divide-hairline">
          {PROOF_RECORDS.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
            >
              <p className="text-sm text-plum">{r.category}</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge tone={approvalTone(r.useControls.approvalStatus)}>
                  {r.useControls.approvalStatus}
                </Badge>
                <Badge tone={permissionTone(r.useControls.permission)}>
                  {r.useControls.permission}
                </Badge>
                <Badge tone={loadTone(r.useControls.customerLoad)}>
                  {r.useControls.customerLoad}
                </Badge>
                <Badge tone={isPublicUseReady(r) ? "approve" : "muted"}>
                  {isPublicUseReady(r) ? "Public use ready" : "Internal only"}
                </Badge>
              </div>
            </div>
          ))}
        </Panel>
        <p className="mt-4 text-[0.7rem] text-muted-foreground">{SAMPLE_DISCLAIMER_GLOBAL}</p>
      </div>
    </div>
  );
}