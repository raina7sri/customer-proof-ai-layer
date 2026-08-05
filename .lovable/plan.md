# Customer Proof AI Layer — Aurics Lab prototype

A front-end-only interactive prototype. All content is hard-coded synthetic sample data — no backend, no AI calls. Everything runs client-side so the demo is instant and deterministic.

## Visual system

Aurics palette wired as semantic tokens in `src/styles.css` (oklch equivalents of):
Midnight Plum `#120D22`, Deep Plum `#24143F`, Strategic Violet `#5B44D4`, Pothos Green `#3F8F4E`, Signal Yellow `#F4CC48`, Warm White `#F8F5EC`.

Rules applied throughout: no orange, no gradients, no glossy AI look, no stock imagery or 3D. Generous whitespace, hairline dividers, plum text on warm white, violet for structure/actions, green only for approval/positive status, yellow only for proof/data/warning emphasis. Typography: one restrained sans pairing (loaded via `<link>` in the root route), tight tracking on labels, uppercase micro-labels for field names.

## Screens and flow

Single app shell (Midnight Plum header with product title, subtitle, and step nav) plus routes:

1. `/` — Landing / guided demo. Title, subtitle, promise body, primary CTA "Run sample workflow", secondary "Enter your own notes", sample-data disclaimer. Split-screen first view: left = "Start with a sample record" with all five categories as equal-weight tabs (Agentic commerce preselected, no visual primacy); right = "Enter your own customer notes".
2. `/create` — Create Customer Proof Record. Textarea with the specified placeholder, "Generate proof record" button, restrained five-step processing sequence (Identifying buyer problem → Extracting proof → Mapping proof priority → Checking approval and permission risks → Creating Customer Proof Record) shown as a thin stepped indicator with a yellow active node.
3. `/record` — Review Customer Proof Record. The five fields exactly as labeled: Customer context, Proof priority, Buyer problem, Approved proof, Use controls. Use controls renders badge groups for evidence strength, approval status, permission, and customer load. Below it, the "Human review: claim scope" block contrasting the AI extraction line with the human-approved version, plus the note "AI can surface evidence. Humans decide the claim scope."
4. `/use` — Use this proof. Five equal-weight output cards (Proof summary for Sales outreach, Business expansion note, Marketing case study brief, Website proof block, External approved proof note), each with owning team, purpose, sample output, and permission warning when the selected record's permission/approval/load rules trigger. Selecting a card reveals the role-specific output plus the governance check (Source attached, Permission checked, Approval checked, Claim scope preserved) and the "Excluded from output" note.
5. `/library` — Proof Library. Search bar "Search proof records" plus filter chips for Proof priority, Buyer problem, Vertical or use case, Approval status, Permission type, Customer load. Five record cards using category labels only (no fictional company names), each carrying its per-record sample-data label.
6. `/metrics` — Proof system health. The five metrics with the exact stated values, each with its definition line.
7. `/expansion` — How this could expand. The nine future capabilities as a restrained list, with the stated closing copy.

## Governance behavior (client-side rules)

A small rules module evaluates each record against each output type and returns allow / warn / block with a reason. Warns or blocks when: no source material, record not ready to use, permission private or restricted for the requested output, generated claim changed from the approved record, or customer paused. Update triggers (product/message changed, claim changed, customer context changed) are surfaced as a flag on the record. Public-use is only shown as available when approval, permission, proof strength, and no-update-flag all pass.

## Technical notes

- Data: `src/data/proof-records.ts` holds the five records (raw notes, five record fields, use controls, role output, output copy, per-record disclaimer) and the output-card definitions.
- Logic: `src/lib/governance.ts` for reuse rules, public-use rule, and update triggers.
- Components: `src/components/proof/*` for AppShell, StepNav, RecordFields, UseControlsBadges, ClaimScopeReview, OutputCard, GovernanceCheck, FilterChips, MetricTile.
- State: demo state (selected sample, entered notes, generated record, selected output) held in a lightweight React context in the app shell so navigating between steps keeps the flow intact.
- Each route defines its own `head()` metadata with distinct title/description/og tags.
