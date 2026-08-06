# Copy additions + Enterprise AI badge wording

## 1. Framing line at the top (Start page)
Add directly under the product promise on the Start page hero:

"Customer proof often lives in transcripts, case studies, call notes, and team memory. This layer turns that material into governed proof GTM teams can safely reuse."

Styled as body copy in muted plum, above the two action buttons.

## 2. AI-native GTM statement (separate placement)
Add as its own thin-bordered callout block lower on the Start page, after the split-screen section (its own section with a divider above it):

"AI-native GTM means redesigning the workflow.
In this example, AI does not write more customer stories. It structures customer proof so teams can govern, retrieve, and reuse it."

Deep plum panel treatment so it reads as a positioning statement, not instructions.

## 3. Ownership line
Add as a small labeled line ("Ownership") in the same callout area / adjacent block:

"Customer Marketing / PMM owns the proof record. Sales, CS, Marketing, Website, AR/PR, and Events use it."

## 4. Enterprise AI platform badge
On the Review record screen, the top-right badge for a record with Public use permission but approval not yet Ready to use will read "Public use requested" instead of "Public use pending external approval". The explanatory sentence below it stays (permission allows public use; external approval is the remaining step). This affects the Enterprise AI platform record.

## Technical notes
- `src/routes/index.tsx`: hero paragraph addition; new section with the AI-native + ownership copy.
- `src/lib/governance.ts`: change `readinessLabel` return string for the public-use-but-unapproved case to "Public use requested".
- No data or governance-logic changes; wording and layout only.
