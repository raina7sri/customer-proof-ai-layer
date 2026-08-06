import { createFileRoute } from "@tanstack/react-router";
import { EXPANSION_CLOSING, EXPANSION_ITEMS } from "@/data/proof-records";
import { Divider, MicroLabel, SectionHeading } from "@/components/proof/ui";

export const Route = createFileRoute("/expansion")({
  head: () => ({
    meta: [
      { title: "How this could expand — Customer Proof AI Layer" },
      {
        name: "description",
        content:
          "Source integrations, approval routing, semantic search, proof gap analysis, usage tracking, and revenue influence attribution.",
      },
      { property: "og:title", content: "How this could expand" },
      {
        property: "og:description",
        content:
          "Connecting governed customer proof to the systems where GTM teams already work.",
      },
      { property: "og:url", content: "https://customer-proof-ai-layer.lovable.app/expansion" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://customer-proof-ai-layer.lovable.app/expansion" }],
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
              name: "Expansion",
              item: "https://customer-proof-ai-layer.lovable.app/expansion",
            },
          ],
        }),
      },
    ],
  }),
  component: ExpansionPage,
});

function ExpansionPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Roadmap"
        title="How this could expand"
        description="V1 governs the record. The next layers connect that record to source systems, workflow, and revenue measurement."
      />

      <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {EXPANSION_ITEMS.map((item, i) => (
          <div key={item} className="bg-card p-6">
            <span className="font-mono text-[0.7rem] text-violet">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-plum">{item}</p>
          </div>
        ))}
      </div>

      <Divider />

      <div className="max-w-3xl">
        <MicroLabel className="mb-3">Closing</MicroLabel>
        <p className="border-l-2 border-violet pl-4 text-sm leading-relaxed text-plum">
          {EXPANSION_CLOSING}
        </p>
      </div>
    </div>
  );
}