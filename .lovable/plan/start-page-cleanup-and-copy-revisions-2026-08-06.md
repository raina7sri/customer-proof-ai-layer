# Start page cleanup and copy revisions

## 1. Header banner
- Title Case the subtitle in the app header: "Rebuilding Customer Marketing to be AI-Native."

## 2. Hero section (Start page)
Rework the top block so it reads as one clean, well-spaced statement instead of five stacked paragraphs:
- H1: Customer Proof AI Layer
- Subtitle: Rebuilding Customer Marketing to be AI-Native.
- One body paragraph: "Customer proof often lives in transcripts, case studies, call notes, and team memory. This layer turns that material into governed proof that GTM teams can search, approve, measure, and reuse."
- Drop the duplicate promise line and the redundant "Turn rough customer conversations..." line so the message isn't repeated three times.
- Keep the two action buttons.

Add two compact labeled blocks directly under the hero (replacing the bottom section, see 3):
- "Why this is AI-native" — "AI-native GTM means redesigning the workflow. Here, AI structures customer proof as a layer on top of traditional Customer Marketing to build a governed, retrievable and structured set of outputs for use across functions."
- "Ownership" — "Customer Marketing / PMM owns the proof record. Sales, CS, Marketing, Website, AR/PR, and Events use it." (two lines as written)

## 3. Remove the lower duplicate section
- Delete the standalone plum "Why this is AI-native" + "Ownership" section near the bottom of the Start page.

## 4. Sample list order
- Reorder samples so Agentic commerce is #1 (it is the default) and Enterprise AI platform is #2; Enterprise payments, AI infrastructure, and CRM platform follow.

## 5. Disclaimer wording
- Remove "Not real customer claims." / "Not a real customer claim." from both disclaimer strings, leaving "Sample data — category-referenced synthetic example(s)."
- Update the footer line in the app shell to match.
- Remove the extra disclaimer line at the bottom of the Start page FAQ section (the footer already carries it).

## 6. Common questions
Keep the heading "What this system is, and how it governs proof" and replace the six answers with the revised wording provided (governance layer / rebuild Customer Marketing to be AI-native, record fields with "never from ungoverned raw notes", AI structures + humans approve, ownership, reuse governance, AI-native meaning). Format as a cleaner definition list with clearer separation between question and answer.

## Technical notes
- Files touched: `src/routes/index.tsx`, `src/components/proof/app-shell.tsx`, `src/data/faq.ts`, `src/data/proof-records.ts` (record order + disclaimer strings).
- FAQ JSON-LD is generated from `src/data/faq.ts`, so structured data stays in sync automatically.
- No governance logic, palette, or route changes.
