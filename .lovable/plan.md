# Real extraction for pasted customer notes

Today the "Enter your own notes" path is cosmetic: the 5-step animation runs on timers, your text is never read, and Step 2 shows whichever sample record is selected (Agentic commerce by default). Pasting the CRM QBR test case would produce agentic-commerce fields and the fixed 12%-conversion claim example — the opposite of what a governance tool should demonstrate.

## Which is easiest

Real AI extraction is the easier build, and it's also the honest one. It's a single server function with a schema; the deterministic option means hand-writing brittle regex for quotes, permission language, and claim ceilings, and it will misread most real notes. So: real AI extraction, with conservative governance defaults.

## What gets built

**1. Extraction server function**
A server function takes the pasted text and returns a Customer Proof Record in the app's existing shape:
- Customer context, Proof priority, Buyer problem, Approved proof
- Use controls: evidence strength, approval status, permission, customer load
- A claim-review pair (raw extracted claim vs. conservatively scoped version)
- Vertical / category label
- A list of excluded claims with the reason for exclusion

**2. Conservative governance defaults**
New records from pasted notes always start at the safe end:
- Permission: Internal use
- Approval status: Internal review
- Evidence strength: Sourced, not yet approved
- Customer load: Available unless the notes say otherwise
- Any quantified business outcome (revenue lift, ROI, %) is pulled out of Approved proof and listed under excluded claims unless the notes explicitly approve it

On the CRM test case this yields: internal use only (public needs legal review), no revenue claim, proof priority about lifecycle visibility, the CS leader quote retained as qualitative proof, pilot scope of 40 accounts over eight weeks in customer context.

**3. Step 1 becomes real**
The processing steps advance as the extraction call progresses instead of on fixed timers, with a visible error state if the call fails. Sample records keep their current instant path — no AI call needed.

**4. Step 2 and Step 3 read the extracted record**
Step 2 renders the extracted fields and shows the extracted claim-review pair (labeled as derived from your notes, unlike the sample's fixed example). Step 3 generates outputs from the extracted approved proof only, and the governance verdicts and exclusion note come from the extracted record — so the CRM case would block or condition the Website proof block and External approved proof note on permission.

## Technical notes

- Extraction runs in a `createServerFn` under `src/lib/`, calling Lovable AI through the AI SDK with a structured output schema; prompt and key stay server-side.
- The result is stored in the existing `DemoProvider` context as an extra "custom record" that satisfies the same `ProofRecord` type, so `governance.ts`, `use.tsx`, `record.tsx`, and the output generators work unchanged.
- Post-processing enforces the conservative defaults in code rather than trusting the model to obey them.
- `library.tsx` and `metrics.tsx` continue to reflect the five samples only; the pasted record is session-scoped and not persisted.
- The sample-data disclaimer stays on sample records; the extracted record gets its own note that it is generated from your text and not human-approved.
