# Rework the "How this could expand" section

Scope: only the expansion page and its data. Everything else on the site stays as-is.

## What changes

Replace the nine-item grid with a selective, roadmap-style layout:

1. **Header** — "How this could expand" with the new summary copy: what the current version already does (structured records, retrieval, cross-team adaptation, preserved claim scope, permission, approval, customer load).
2. **"Where it could go"** intro line about deeper source-system integration, live deal moments, and GTM measurement.
3. **Three stacked expansion sections** (numbered 01–03, hairline-separated cards on warm white, violet numbering and rules, Deep Plum text):
   - **Source systems integration** — pull proof from CRM, Gong/call transcripts, QBR notes, interviews, case studies, webinars, enablement material. Objective: reduce manual input, sit closer to the GTM workflow.
   - **Objection-led retrieval** — seller enters a live buyer concern and gets ranked approved records. Includes the example buyer concern (set apart as a quoted line) and a bulleted list of what the system returns. Objective: retrieve governed evidence in the moment.
   - **Field usage and revenue influence** — track where approved proof is used across Sales, CS, Analyst/PR, Events, launches, deal cycles, plus bullets on most-reused records, proof gaps by buyer problem, and revenue influence. Objective: show how proof supports execution and where evidence is thin.
4. **Final line** — "Today, we make customer proof governed and reusable. Next, we could connect it more deeply to source systems, live deal moments, and GTM measurement." Kept as the closing statement with the existing violet left rule treatment.

Tone: precise product language, no implication that V1 is incomplete, and none of the already-shipped capabilities (search, filters, customer load, proof coverage, claim scope) reappear as future items.

## Color usage

Existing Aurics tokens only: Warm White canvas, Deep Plum text, Strategic Violet for numbering/rules/labels, hairline dividers. Signal Yellow reserved for the single high-attention element — the "excluded evidence and why it was excluded" / limitation emphasis inside Objection-led retrieval. No green needed here.

## Technical notes

- `src/data/proof-records.ts`: replace `EXPANSION_ITEMS` with a typed `EXPANSION_SECTIONS` array (`title`, `body`, `objective`, optional `example`, optional `bullets`), add the summary paragraphs, and update `EXPANSION_CLOSING` to the new final line.
- `src/routes/expansion.tsx`: render the new header copy, the three sections, and the closing line using existing `SectionHeading`, `MicroLabel`, and `Divider` primitives. Route `head()` description updated to match the new content.
- No other routes, components, or logic touched.
