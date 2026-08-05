import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PROOF_RECORDS, SAMPLE_DISCLAIMER } from "@/data/proof-records";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Customer Proof AI Layer — Governed customer proof for GTM teams" },
      {
        name: "description",
        content:
          "Turn rough customer conversations into governed proof GTM teams can search, approve, measure, and reuse.",
      },
      {
        property: "og:title",
        content: "Customer Proof AI Layer — Governed customer proof for GTM teams",
      },
      {
        property: "og:description",
        content:
          "Rough customer notes become a governed Customer Proof Record, then reusable proof for Sales, CS, Marketing, Website, and Analyst/PR.",
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
  } = useDemo();

  const runSample = () => {
    setUsedOwnNotes(false);
    setNotes(record.rawNotes.join("\n"));
    setRecordGenerated(false);
    navigate({ to: "/create" });
  };

  const runOwn = () => {
    setUsedOwnNotes(true);
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
        <p className="mt-3 text-base text-plum/80">Rebuilding customer marketing to be AI-native.</p>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Turn rough customer conversations into governed proof GTM teams can search, approve,
          measure, and reuse.
        </p>
        <p className="mt-4 border-l-2 border-violet pl-3 text-sm leading-relaxed text-plum">
          Make customer proof searchable, approved, measurable, and reusable across GTM teams.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={runSample}
            className="bg-violet px-5 py-2.5 text-sm font-medium text-violet-foreground transition-colors hover:bg-plum"
          >
            Run sample workflow
          </button>
          <button
            onClick={runOwn}
            className="border border-plum/25 px-5 py-2.5 text-sm font-medium text-plum transition-colors hover:border-violet hover:text-violet"
          >
            Enter your own notes
          </button>
        </div>
        <SampleDisclaimer className="mt-6" />
      </section>

      <Divider />

      <section className="grid gap-10 lg:grid-cols-2">
        <div>
          <MicroLabel>Left · Sample</MicroLabel>
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
          <MicroLabel>Right · Your material</MicroLabel>
          <h2 className="mt-2 text-lg font-semibold text-plum">Enter your own customer notes</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Nothing is stored. This prototype structures your text into the same record format.
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
            className="mt-4 border border-plum/25 px-5 py-2.5 text-sm font-medium text-plum transition-colors hover:border-violet hover:text-violet"
          >
            Continue with my notes
          </button>
        </div>
      </section>
    </div>
  );
}
