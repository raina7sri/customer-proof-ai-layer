# Fix Step 3 generation, claim-scope framing, and the "own notes" path

## What's wrong today (confirmed in code)

1. **"Generate output" appears to do nothing.** Each output card already prints its sample output above the button, and clicking only toggles an expanded panel appended at the bottom of the page — often below the fold. Nothing visibly changes near the click.
2. **Human review / claim scope looks unattributed.** All five records share one hardcoded claim-review example (the "12% conversion" text), so on four of five records it doesn't match the record's own proof — and it isn't labeled as an illustration.
3. **Enterprise AI platform: "Not public-use ready" vs "Public use".** Permission is Public use, but approval status is Internal review, so the readiness rule fails. The two badges are both correct but read as a contradiction.
4. **Evidence strength yellow.** Only the literal value "Quantified" is styled yellow, so it looks arbitrary (agentic commerce is the only record with it).
5. **"Enter your own notes" isn't blank.** Step 1 falls back to the sample notes whenever the textarea is empty, so choosing "Enter your own notes" still shows sample material.

## Changes

**Step 3 — Use this proof**
- Remove the always-visible sample output from the cards. Card shows team, label, purpose, governance verdict, and the button.
- Button reveals the output inline inside that card (expand in place), with the button label toggling Generate output / Hide output.
- Keep the fuller detail panel (governance check + exclusion note) below, and scroll it into view on generate so the click always has a visible result.

**Record review — claim scope**
- Label the block explicitly as an illustration: eyebrow "Human review · claim scope (example)" plus a one-line note that this is a fixed illustrative example of the review step, not derived from the selected record, and keep the sample-data disclaimer next to it.

**Enterprise AI platform readiness**
- Keep permission as Public use (the point of the sample is that external approval, not permission, is the blocker) and remove the contradiction by making the badge state the reason: "Public use pending external approval" instead of "Not public-use ready", with a short line naming the missing step. Records that pass keep "Public use ready".
- If you'd rather it read as Private use instead, say so and I'll switch the record's permission field instead of relabeling.

**Evidence strength**
- Highlight every evidence-strength value in Signal Yellow on all records, so the field reads as the current status of proof/data rather than one special value.

**Step 1 — own notes**
- When the user chose "Enter your own notes", Step 1 starts empty with its own placeholder and does not fall back to sample material. The sample path still preloads the selected record's raw notes.

## Technical notes

- `src/routes/use.tsx`: per-card `expanded` state (reuse `selectedOutputId`), drop the inline `primaryOutputCopy` preview above the button, add `scrollIntoView` on the detail panel via a ref.
- `src/routes/record.tsx`: eyebrow + example note on the plum claim-review block.
- `src/components/proof/ui.tsx`: `UseControls` evidence badges all use tone `signal`; readiness copy helper for the record header badge.
- `src/routes/create.tsx`: source falls back to sample notes only when `usedOwnNotes` is false.
- No data-model changes; all edits stay in presentation/state code.
