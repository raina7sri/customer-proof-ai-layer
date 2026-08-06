# AEO optimization pass

Goal: make the site legible to answer engines (ChatGPT, Perplexity, Google AI Overviews, Bing Copilot) so it can be cited when someone asks about governed customer proof or AI-native customer marketing.

## 1. Machine-readable answer content
- Add a concise, question-shaped FAQ section on the Start page below the existing content, using the app's own language:
  - What is a Customer Proof AI Layer?
  - What is a Customer Proof Record?
  - What does "AI structures, humans approve" mean in practice?
  - Who owns the proof record, and who uses it?
  - How is proof reuse governed (permission, approval, claim scope, customer load)?
  Each answer 2-3 sentences, self-contained, plain wording, with the sample-data disclaimer intact.

## 2. Structured data (JSON-LD)
- `SoftwareApplication` + `Organization` (Aurics Lab) on the Start page.
- `FAQPage` matching the on-page FAQ exactly (no invented answers).
- `BreadcrumbList` on the inner screens.

## 3. Crawl and citation surfaces
- `public/llms.txt`: short description of the tool, its core principle, the five record fields, the five outputs, and links to each route.
- `public/sitemap.xml` listing all seven routes; reference it from `robots.txt`.
- Keep `robots.txt` open, and explicitly allow common answer-engine crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot).

## 4. Per-page metadata completeness
- Add canonical link tags per route.
- Add `og:type` and `twitter:card` where missing, and `og:url` per route.
- Tighten titles to under 60 characters and descriptions under 160 where they overflow.

## 5. Semantics and accessibility signals
- One `h1` per route (Start page currently has an h1 in the hero; the shell header also renders an h1 — demote the shell one to a non-heading element so each page has a single h1).
- Ensure section headings are real heading elements in order, and decorative markers stay `aria-hidden`.

## Technical notes
- JSON-LD via each route's `head()` `scripts` entry; no new dependencies.
- Static files added under `public/`.
- Copy changes are additive; no governance logic, data, or palette changes.
- After the code pass, run the SEO/AEO review scan so results appear in the SEO tab.
