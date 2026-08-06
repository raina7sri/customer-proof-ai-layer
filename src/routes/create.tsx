import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { PROCESSING_STEPS } from "@/data/proof-records";
import { useDemo } from "@/components/proof/demo-state";
import { CheckMark, MicroLabel, SampleDisclaimer, SectionHeading } from "@/components/proof/ui";
import { extractProofRecord } from "@/lib/extract.functions";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create Customer Proof Record — Customer Proof AI Layer" },
      {
        name: "description",
        content:
          "Paste rough customer notes, transcript excerpts, or proof material and structure them into a Customer Proof Record.",
      },
      { property: "og:title", content: "Create Customer Proof Record" },
      {
        property: "og:description",
        content:
          "Rough customer material becomes a structured, governable Customer Proof Record.",
      },
      { property: "og:url", content: "https://customer-proof-ai-layer.lovable.app/create" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://customer-proof-ai-layer.lovable.app/create" }],
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
              name: "Create record",
              item: "https://customer-proof-ai-layer.lovable.app/create",
            },
          ],
        }),
      },
    ],
  }),
  component: CreatePage,
});

function CreatePage() {
  const navigate = useNavigate();
  const { record, notes, setNotes, usedOwnNotes, setRecordGenerated, setCustomRecord } =
    useDemo();
  const extract = useServerFn(extractProofRecord);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const doneRef = useRef(false);

  // Sample path: deterministic, no AI call.
  useEffect(() => {
    if (!running || usedOwnNotes) return;
    if (step >= PROCESSING_STEPS.length) {
      setRecordGenerated(true);
      const t = setTimeout(() => navigate({ to: "/record" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 620);
    return () => clearTimeout(t);
  }, [running, usedOwnNotes, step, navigate, setRecordGenerated]);

  // Own-notes path: steps advance while the extraction call is in flight.
  useEffect(() => {
    if (!running || !usedOwnNotes) return;
    if (doneRef.current) return;
    if (step >= PROCESSING_STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [running, usedOwnNotes, step]);

  const start = async () => {
    setError(null);
    setStep(0);
    setRunning(true);
    if (!usedOwnNotes) return;
    doneRef.current = false;
    try {
      const extracted = await extract({ data: { notes: source } });
      doneRef.current = true;
      setCustomRecord(extracted);
      setRecordGenerated(true);
      setStep(PROCESSING_STEPS.length);
      setTimeout(() => navigate({ to: "/record" }), 400);
    } catch (e) {
      doneRef.current = true;
      setRunning(false);
      setStep(-1);
      setError(
        e instanceof Error
          ? e.message
          : "Extraction failed. Check the material and try again.",
      );
    }
  };

  const source = usedOwnNotes ? notes : notes.trim().length > 0 ? notes : record.rawNotes.join("\n");

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Step 1"
        title="Create Customer Proof Record"
        description={
          usedOwnNotes
            ? "Paste rough customer notes, transcript excerpt, or proof material. Your text is read and structured into a Customer Proof Record with conservative governance defaults — no claim is invented or upgraded."
            : "Sample records are pre-structured, so this step replays the extraction sequence without inventing any claim."
        }
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <MicroLabel className="mb-2">
            {usedOwnNotes ? "Your customer material" : `Sample material · ${record.category}`}
          </MicroLabel>
          <textarea
            value={source}
            onChange={(e) => setNotes(e.target.value)}
            rows={16}
            placeholder="Paste customer interview notes, Gong-style call excerpts, QBR notes, event meeting notes, or existing case study material."
            className="w-full border border-hairline bg-card p-4 text-xs leading-relaxed text-plum outline-none placeholder:text-muted-foreground focus:border-violet"
          />
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={start}
              disabled={running || (usedOwnNotes && source.trim().length < 40)}
              className="bg-violet px-5 py-2.5 text-sm font-medium text-violet-foreground transition-colors hover:bg-plum disabled:opacity-50"
            >
              {running ? "Reading your material…" : "Generate proof record"}
            </button>
            <SampleDisclaimer />
          </div>
          {error ? (
            <p className="mt-4 border-l-2 border-destructive pl-3 text-xs leading-relaxed text-destructive">
              {error}
            </p>
          ) : null}
          {usedOwnNotes && !running && source.trim().length < 40 ? (
            <p className="mt-3 text-[0.7rem] text-muted-foreground">
              Paste at least a few lines of customer material to extract a record.
            </p>
          ) : null}
        </div>

        <div className="border border-hairline bg-card p-6">
          <MicroLabel>Processing</MicroLabel>
          <ol className="mt-5 space-y-0">
            {PROCESSING_STEPS.map((label, i) => {
              const done = running && step > i;
              const active = running && step === i;
              return (
                <li key={label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 ${
                        done ? "bg-approve" : active ? "bg-signal" : "bg-hairline"
                      }`}
                      aria-hidden="true"
                    />
                    {i < PROCESSING_STEPS.length - 1 ? (
                      <span
                        className={`w-px flex-1 ${done ? "bg-approve/40" : "bg-hairline"}`}
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <div className="pb-6">
                    <p
                      className={`text-xs ${
                        done || active ? "text-plum" : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </p>
                    {done ? (
                      <span className="mt-1 flex items-center gap-1.5 text-[0.65rem] text-approve">
                        <CheckMark /> complete
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="border-t border-hairline pt-4 text-[0.7rem] leading-relaxed text-muted-foreground">
            AI structures and adapts customer proof. Humans approve what is true, current,
            commercially useful, and safe to use.
          </p>
        </div>
      </div>
    </div>
  );
}