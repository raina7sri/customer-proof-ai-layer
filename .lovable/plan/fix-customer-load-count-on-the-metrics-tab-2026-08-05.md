# Fix customer load count on the Metrics tab

## What's happening

The "Customer load" metric on `/metrics` is a hardcoded string: `3 Available · 1 Reuse only · 0 Paused` — which totals 4, not 5. It was taken verbatim from the original spec, so it never matched the actual sample records.

The real record data is:

```text
Enterprise payments platform   Available
Agentic commerce               Available
AI infrastructure              Available
CRM platform                   Reuse only
Enterprise AI platform         Available
```

That is 4 Available, 1 Reuse only, 0 Paused — 5 total.

## Fix

Derive the customer load metric from the record list instead of hardcoding it, so it always sums to the number of records:

- Compute the counts by scanning `useControls.customerLoad` across the proof records.
- Render as `4 Available · 1 Reuse only · 0 Paused`.

While in there, do the same for the two other counting metrics so they can't drift either:

- **Source coverage** — count records with source material (`5 of 5`).
- **Ready-to-use proof** — count records passing the public-use-ready / governed check (currently `4 of 5`, which does match the data).

"Proof coverage" (5 categories) and "Reuse count" (5 outputs generated) stay as-is.

## Technical notes

- Replace the static `METRICS` array values in `src/data/proof-records.ts` with a small helper that builds the metric values from `PROOF_RECORDS` (labels and definitions unchanged).
- `src/routes/metrics.tsx` keeps rendering the same shape, so no layout change.
- No visual or copy changes beyond the corrected numbers.
