# Customer Proof AI Layer

**Rebuilding Customer Marketing to be AI-Native.**

Customer proof lives in transcripts, QBR notes, call excerpts, and team memory — unstructured, unapproved, and impossible to reuse safely. This is a governance layer that turns that raw material into **Customer Proof Records** GTM teams can search, approve, measure, and reuse.

**Live demo:** https://customer-proof-ai-layer.lovable.app

> **AI structures and adapts customer proof. Humans approve what is true, current, commercially useful, and safe to use.**

Part of [Aurics Lab](https://raina7sri.github.io/aurics/) — AI-native GTM tools, built in the open.

---

## The problem this solves

Every GTM team rewrites the same customer story. Sales writes an outreach line, Marketing writes a case study, the website writes a proof block, AR/PR writes a briefing note — each from a different reading of the same call, each with a slightly different claim, none of them governed.

The failure mode is not that teams lack proof. It's that nothing decides **how far a claim may go**. So either proof goes unused, or it overreaches.

This layer puts a governed record between the raw material and the output. Customer Marketing / PMM owns the record. Sales, CS, Marketing, Website, AR/PR, and Events consume it.

## How it works

Raw customer material → **Customer Proof Record** → role-specific outputs, each governance-checked.

### The Customer Proof Record

Five fields, and everything downstream is generated from the approved proof only — never from ungoverned raw notes:

1. **Customer context** — who the customer is and the scope of the deployment
2. **Proof priority** — what this proof is best used to demonstrate
3. **Buyer problem** — the pre-purchase problem
4. **Approved proof** — the conservative, defensible outcome statement
5. **Use controls** — evidence strength, approval status, permission type, customer load

### The outputs

1. Proof summary for Sales outreach
2. Business expansion note
3. Marketing case study brief
4. Website proof block
5. External approved proof note

### The governance check

Every generated output is checked against the record's use controls before it is produced:

- Source attached
- Permission checked
- Approval checked
- Claim scope preserved

Anything held out of the output is listed with its reason — so the exclusion is visible, not silent.

### The human correction moment

This is the part the demo is built around. AI extraction produces:

> "The platform increased conversion by 12%."

The human-approved version:

> "During a six-week pilot, AI-referred sessions converted 12% above the site average. Referral volume remained limited, so this is classified as an early commercial signal, not validated enterprise ROI."

*AI can surface evidence. Humans decide the claim scope.*

Governance defaults are enforced in code, not left to the model — see [`src/lib/extract.server.ts`](src/lib/extract.server.ts). Any quantified business outcome the material does not explicitly approve is stripped from approved proof and moved to the excluded list, and every new record starts at `Private use` / `Internal review` regardless of what the notes claim.

## Walkthrough

| Route | What it does |
| --- | --- |
| `/` | Start — pick one of five sample records, or paste your own customer notes |
| `/create` | Structure raw material into a Customer Proof Record |
| `/record` | Review the governed record and the human correction moment |
| `/use` | Generate role-specific outputs with governance checks |
| `/library` | Search and filter records by priority, problem, vertical, approval, permission, load |
| `/metrics` | Proof system health — ready-to-use proof, source coverage, reuse count, customer load |
| `/expansion` | How this could expand: CRM/Gong/transcript integrations, approval routing, semantic search, proof gap analysis, field usage tracking, revenue influence attribution |

## Sample data

**Sample data — category-referenced synthetic examples. Not real customer claims.** The five sample records (enterprise payments, agentic commerce, AI infrastructure, CRM, enterprise AI) are illustrative, and no sample is the primary use case.

Notes you paste into the app are not stored. They are sent to the extraction model, structured into a record, and held in browser state for the session only.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (SSR) with TanStack Router + Query
- React 19, TypeScript, Vite 8
- Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com) on Radix primitives
- Zod for server-function input validation
- Nitro for the server build

## Running locally

Requires Node.js 22+.

```sh
git clone https://github.com/raina7sri/customer-proof-ai-layer
cd customer-proof-ai-layer
npm install
npm run dev
```

> **Use `npm`, not `bun`.** The committed `bun.lock` pins tarball URLs to Lovable's internal
> package mirror, which is not reachable outside their build sandbox. `npm install` resolves
> the same dependencies from the public registry.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`, `npm run format`.

### AI extraction

The sample-record path runs fully offline. The **"Enter your own notes"** path calls a server function that hits the Lovable AI Gateway and requires `LOVABLE_API_KEY` in the environment:

```sh
LOVABLE_API_KEY=... npm run dev
```

That key is provisioned by Lovable's hosting, so on the deployed lovable.app app it is already set. Running locally or self-hosting without it leaves the sample path working and surfaces *"AI is not configured for this project"* on the own-notes path. Swapping [`extract.server.ts`](src/lib/extract.server.ts) to call a provider API directly is the route to hosting this anywhere else.

## Design system

Aurics palette — no orange, no gradients, no glossy AI aesthetic:

| Token | Hex | Use |
| --- | --- | --- |
| Midnight Plum | `#120D22` | Dark hero backgrounds, app header |
| Deep Plum | `#24143F` | Primary text, dark cards, strong labels |
| Strategic Violet | `#5B44D4` | Primary action accent, links, active nav |
| Pothos Green | `#3F8F4E` | System/growth accent, approval states, metrics |
| Signal Yellow | `#F4CC48` | Proof/data/warning emphasis, active node |
| Warm White | `#F8F5EC` | Main light background, cards |

Full spec in [`docs/product-brief.md`](docs/product-brief.md).

## License

MIT — see [LICENSE](LICENSE).
