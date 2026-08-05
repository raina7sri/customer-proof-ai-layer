import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PROCESSING_STEPS } from "@/data/proof-records";
import { useDemo } from "@/components/proof/demo-state";
import { CheckMark, MicroLabel, SampleDisclaimer, SectionHeading } from "@/components/proof/ui";

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
    ],
  }),
  component: CreatePage,
});

function CreatePage() {
  const navigate = useNavigate();
  const { record, notes, setNotes, usedOwnNotes, setRecordGenerated } = useDemo();
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!running) return;
    if (step >= PROCESSING_STEPS.length) {
      setRecordGenerated(true);
      const t = setTimeout(() => navigate({ to: "/record" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 620);
    return () => clearTimeout(t);
  }, [running, step, navigate, setRecordGenerated]);

  const start = () => {
    setStep(0);
    setRunning(true);
  };

  const source = notes.trim().length > 0 ? notes : record.rawNotes.join("\n");

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Step 1"
        title="Create Customer Proof Record"
        description="Paste rough customer notes, transcript excerpt, or proof material. The structure is deterministic in this prototype — no claim is invented."
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
              disabled={running}
              className="bg-violet px-5 py-2.5 text-sm font-medium text-violet-foreground transition-colors hover:bg-plum disabled:opacity-50"
            >
              {running ? "Generating…" : "Generate proof record"}
            </button>
            <SampleDisclaimer />
          </div>
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