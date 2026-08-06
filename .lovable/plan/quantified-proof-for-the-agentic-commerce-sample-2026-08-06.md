# Quantified proof for the Agentic Commerce sample

Update the Agentic commerce / product intelligence sample so its approved proof carries the quantified pilot result, plus a short set of labelled proof data points.

## Content changes

**Approved proof** (replaces the current qualitative sentence):

"During an eight-week pilot in one product category, attribute completeness increased from 58% to 91% after product records were enriched and structured for AI-assisted discovery. Monitored AI-shopping referrals converted 12% above the site average, but referral volume remained limited, so this should be classified as an early commercial signal, not validated enterprise ROI."

**Use controls** stay as: Sourced · Approved · Quantified · Public use · Ready to use · Available (this already matches the current record, so no change needed).

**Proof data points** — a new short labelled list shown directly under Approved proof on the record view:
- Catalog improvement: 58% → 91% attribute completeness
- AI/channel signal: AI-shopping referrals
- Shopper behavior: 12% higher conversion than site average
- Governance qualifier: limited referral volume, early signal only

## Technical notes

- `src/data/proof-records.ts`: update `approvedProof` for the `agentic-commerce` record; add an optional `proofDataPoints?: { label: string; value: string }[]` field to the `ProofRecord` type and populate it for this record only.
- `src/routes/record.tsx`: render `proofDataPoints` when present as thin-divider label/value rows beneath the Approved proof field, using existing Aurics tokens (Signal Yellow only for the data emphasis, no new colors).
- No changes to governance logic, output generation, or metrics; the record already counts as ready-to-use and public.
