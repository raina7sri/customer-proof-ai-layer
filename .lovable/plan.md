# Rename: Customer Advocacy & Marketing / Product Marketing

Replace every reference to "Customer Marketing" with "Customer Advocacy & Marketing", and "PMM" with "Product Marketing", across UI copy, data, docs, and AEO files.

## Copy changes

- Subtitle everywhere becomes "Rebuilding Customer Advocacy & Marketing to be AI-Native." (app header, Start hero, docs, llms.txt, README).
- Ownership line becomes "Customer Advocacy & Marketing / Product Marketing owns the proof record. Sales, CS, Marketing, Website, AR/PR, and Events use it."
- FAQ answers and the question "What does AI-native customer marketing mean here?" → "What does AI-native Customer Advocacy & Marketing mean here?", with matching body wording.
- "Why this is AI-native" block: "...layer on top of traditional Customer Advocacy & Marketing...".
- Output card team label "Customer marketing" → "Customer Advocacy & Marketing".

## Files touched

- `src/components/proof/app-shell.tsx` (header subtitle)
- `src/routes/index.tsx` (hero subtitle, AI-native block, ownership line)
- `src/data/faq.ts` (three items)
- `src/data/proof-records.ts` (output team label)
- `public/llms.txt`, `docs/product-brief.md`, `README.md`

FAQ JSON-LD is generated from `src/data/faq.ts`, so structured data updates automatically. No logic, palette, or route changes.
