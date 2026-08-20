import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PROOF_RECORDS, SAMPLE_DISCLAIMER } from "@/data/proof-records";
import { FAQ } from "@/data/faq";
import { useDemo } from "@/components/proof/demo-state";
import {
  Badge,
  Divider,
  MicroLabel,
  Panel,
  SampleDisclaimer,
  approvalTone,
  permissionTone,
} from "@/components/proof/ui";

const SITE = "https://customer-proof-ai-layer.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Customer Proof AI Layer — Governed proof for GTM" },
      {
        name: "description",
        content:
          "Turn transcripts, call notes, and case studies into governed customer proof GTM teams can search, approve, measure, and reuse.",
      },
      {
        property: "og:title",
        content: "Customer Proof AI Layer — Governed proof for GTM",
      },
      {
        property: "og:description",
        content:
          "Rough customer notes become a governed Customer Proof Record, then reusable proof for Sales, CS, Marketing, Website, and Analyst/PR.",
      },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Customer Proof AI Layer",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: `${SITE}/`,
          description:
            "A governance layer that turns rough customer material into Customer Proof Records GTM teams can search, approve, measure, and reuse.",
          publisher: {
            "@type": "Organization",
            name: "Aurics Lab",
            url: SITE,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const {
    record,
    selectedRecordId,
    setSelectedRecordId,
    notes,
    setNotes,
    setUsedOwnNotes,
    setRecordGenerated,
    setCustomRecord,
  } = useDemo();

  const runSample = () => {
    setUsedOwnNotes(false);
    setNotes(record.rawNotes.join("\n"));
    setRecordGenerated(false);
    navigate({ to: "/create" });
  };

  const runOwn = () => {
    setUsedOwnNotes(true);
    setCustomRecord(null);
    setRecordGenerated(false);
    navigate({ to: "/create" });
  };

  const startBlank = () => {
    setUsedOwnNotes(true);
    setNotes("");
    setCustomRecord(null);
    setRecordGenerated(false);
    navigate({ to: "/create" });
  };

  return (
    <div className="space-y-14">
      <section className="max-w-3xl">
        <MicroLabel className="text-violet">Guided demo</MicroLabel>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-plum sm:text-4xl">
          Customer Proof AI Layer
        </h1>
        <p className="mt-3 text-base text-plum/80">Rebuilding Customer Advocacy & Marketing to be AI-Native.</p>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Customer proof often lives in transcripts, case studies, call notes, and team memory. This
          layer turns that material into governed proof that Product Marketing, Customer Marketing, and broader GTM teams can search, approve, measure,
          and reuse.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={runSample}
            className="bg-violet px-5 py-2.5 text-sm font-medium text-violet-foreground transition-colors hover:bg-plum"
          >
            Run sample workflow
          </button>
          <button
            onClick={startBlank}
            className="border border-plum/25 px-5 py-2.5 text-sm font-medium text-plum transition-colors hover:border-violet hover:text-violet"
          >
            Enter your own notes
          </button>
        </div>
        <SampleDisclaimer className="mt-6" />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="border-l-2 border-violet pl-5">
          <MicroLabel className="text-violet">Why this is AI-native</MicroLabel>
          <p className="mt-3 text-sm leading-relaxed text-plum/85">
            AI-native GTM means redesigning the workflow. Here, AI structures customer proof as a
            layer on top of traditional Customer Advocacy & Marketing to build a governed, retrievable and
            structured set of outputs for use across functions.
          </p>
        </div>
        <div className="border-l-2 border-hairline pl-5">
          <MicroLabel>Ownership</MicroLabel>
          <p className="mt-3 text-sm leading-relaxed text-plum/85">
            Customer Advocacy & Marketing / Product Marketing owns the proof record.
            <br />
            Sales, CS, Marketing, Website, AR/PR, and Events use it.
          </p>
        </div>
      </section>

      <Divider />

      <section className="grid gap-10 lg:grid-cols-2">
        <div>
          <MicroLabel>Sample</MicroLabel>
          <h2 className="mt-2 text-lg font-semibold text-plum">Start with a sample record</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Five equal-weight sample categories. Selecting one loads its raw customer material.
          </p>
          <div className="mt-5 space-y-2">
            {PROOF_RECORDS.map((r, i) => {
              const active = r.id === selectedRecordId;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRecordId(r.id)}
                  className={`flex w-full items-center gap-3 border px-4 py-3 text-left transition-colors ${
                    active
                      ? "border-violet bg-violet/[0.06]"
                      : "border-hairline bg-card hover:border-violet/40"
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 ${active ? "bg-signal" : "bg-hairline"}`}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[0.7rem] text-muted-foreground">{i + 1}</span>
                  <span className="text-sm font-medium text-plum">{r.category}</span>
                </button>
              );
            })}
          </div>

          <Panel className="mt-6 p-5">
            <MicroLabel>Selected sample · raw customer material</MicroLabel>
            <ul className="mt-3 space-y-2">
              {record.rawNotes.map((n) => (
                <li key={n} className="text-xs leading-relaxed text-plum/85">
                  {n}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge tone={approvalTone(record.useControls.approvalStatus)}>
                {record.useControls.approvalStatus}
              </Badge>
              <Badge tone={permissionTone(record.useControls.permission)}>
                {record.useControls.permission}
              </Badge>
              <Badge tone="muted">{record.vertical}</Badge>
            </div>
            <p className="mt-4 text-[0.68rem] text-muted-foreground">{SAMPLE_DISCLAIMER}</p>
          </Panel>
        </div>

        <div>
          <MicroLabel>Your material</MicroLabel>
          <h2 className="mt-2 text-lg font-semibold text-plum">Enter your own customer notes</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Nothing is stored. Your text is read and structured into the same record format, with
            conservative governance defaults: internal use, internal review, and no quantified
            claim unless the material says the customer approved it.
          </p>
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setUsedOwnNotes(true);
            }}
            rows={14}
            placeholder="Paste customer interview notes, Gong-style call excerpts, QBR notes, event meeting notes, or existing case study material."
            className="mt-5 w-full border border-hairline bg-card p-4 text-xs leading-relaxed text-plum outline-none placeholder:text-muted-foreground focus:border-violet"
          />
          <button
            onClick={runOwn}
            disabled={notes.trim().length < 40}
            className="mt-4 border border-plum/25 px-5 py-2.5 text-sm font-medium text-plum transition-colors hover:border-violet hover:text-violet disabled:opacity-40"
          >
            Continue with my notes
          </button>
        </div>
      </section>

      <Divider />

      <section className="max-w-3xl">
        <MicroLabel className="text-violet">Common questions</MicroLabel>
        <h2 className="mt-3 text-xl font-semibold text-plum">
          What this system is, and how it governs proof
        </h2>
        <dl className="mt-8 divide-y divide-hairline border-t border-hairline">
          {FAQ.map((f) => (
            <div key={f.question} className="py-6">
              <dt className="text-sm font-semibold leading-snug text-plum">{f.question}</dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
