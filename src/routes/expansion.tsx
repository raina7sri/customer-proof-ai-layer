import { createFileRoute, Link } from "@tanstack/react-router";
import {
  EXPANSION_CLOSING,
  EXPANSION_SECTIONS,
  EXPANSION_SUMMARY,
  EXPANSION_WHERE_IT_COULD_GO,
} from "@/data/proof-records";
import { Divider, MicroLabel, SectionHeading } from "@/components/proof/ui";

export const Route = createFileRoute("/expansion")({
  head: () => ({
    meta: [
      { title: "How this could expand — Customer Proof AI Layer" },
      {
        name: "description",
        content:
          "A selective roadmap: source systems integration, objection-led retrieval, and field usage with revenue influence.",
      },
      { property: "og:title", content: "How this could expand" },
      {
        property: "og:description",
        content:
          "How governed customer proof could connect to source systems, live deal moments, and GTM measurement.",
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
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionHeading eyebrow="Roadmap" title="How this could expand" />
        {EXPANSION_SUMMARY.map((p, i) => (
          <p
            key={p}
            className={
              i === 0
                ? "text-base leading-relaxed text-plum"
                : "text-sm leading-relaxed text-muted-foreground"
            }
          >
            {p}
          </p>
        ))}
      </div>

      <Divider />

      <div className="max-w-3xl space-y-4">
        <MicroLabel className="text-violet">Next</MicroLabel>
        <h2 className="text-2xl font-semibold text-plum sm:text-3xl">Where it could go</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {EXPANSION_WHERE_IT_COULD_GO}
        </p>
      </div>

      <div className="grid gap-px border border-hairline bg-hairline lg:grid-cols-3">
        {EXPANSION_SECTIONS.map((section, i) => (
          <article key={section.title} className="flex flex-col bg-card p-6 sm:p-8">
            <span className="font-mono text-[0.7rem] text-violet">
              Path {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-plum">
              {section.title}
            </h2>

            <div className="mt-4 space-y-3">
              {section.body.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>

            {section.example ? (
              <div className="mt-5 border-l-2 border-violet/50 pl-4">
                <MicroLabel className="mb-2">Example</MicroLabel>
                <p className="text-sm italic leading-relaxed text-plum">
                  &ldquo;{section.example}&rdquo;
                </p>
              </div>
            ) : null}

            {section.bullets ? (
              <div className="mt-5">
                {section.bulletsLabel ? (
                  <MicroLabel className="mb-2">{section.bulletsLabel}</MicroLabel>
                ) : null}
                <ul className="space-y-2">
                  {section.bullets.map((bullet, bi) => {
                    const emphasize =
                      section.emphasizeLastBullet && bi === section.bullets!.length - 1;
                    return (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-sm leading-relaxed text-plum"
                      >
                        <span
                          aria-hidden
                          className={
                            emphasize
                              ? "mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-signal"
                              : "mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-violet/50"
                          }
                        />
                        <span className={emphasize ? "text-plum" : undefined}>{bullet}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            <div className="mt-auto pt-6">
              <MicroLabel className="mb-2">Objective</MicroLabel>
              <p className="text-sm leading-relaxed text-plum">{section.objective}</p>
            </div>
          </article>
        ))}
      </div>

      <Divider />

      <div className="max-w-3xl">
        <p className="border-l-2 border-violet pl-4 text-sm leading-relaxed text-plum">
          {EXPANSION_CLOSING}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <MicroLabel className="mr-2">Next</MicroLabel>
        <Link
          to="/"
          className="border border-plum/25 px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:border-violet hover:text-violet"
        >
          Start a proof record
        </Link>
        <Link
          to="/library"
          className="border border-plum/25 px-3 py-1.5 text-xs font-medium text-plum transition-colors hover:border-violet hover:text-violet"
        >
          Browse the proof library
        </Link>
      </div>
    </div>
  );
}