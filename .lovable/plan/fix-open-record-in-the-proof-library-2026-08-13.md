# Fix "Open record" in the Proof Library

## What's wrong

Your hypothesis is right about the intent, but the button never navigates. In `src/routes/library.tsx` the handler only calls `setSelectedRecordId(r.id)` — it updates the shared demo state and stops there. Since the user stays on `/library`, and that page shows no selection indicator, the click looks like a dead button.

The Review record page (`src/routes/record.tsx`) already reads `selectedRecordId` from the same demo state, so the selection would render correctly the moment the user lands there.

## Fix

Make "Open record" select the record and navigate to `/record` in one action:

- Select the record (as today), clear any custom-notes mode so the sample record shows, then navigate to `/record`.
- Render it as a real link (`<Link to="/record">` with an onClick that sets the selection) rather than a plain button, so it gets an href, cmd-click, keyboard behavior, and route preloading.
- Scroll position resets to the top of the record page on arrival.

## Optional refinements (say if you want these) - add these

1. Show the currently selected record in the library with a subtle "Selected" marker, so state changes are visible even before navigating.
2. Deep-link support: `/record?id=agentic-commerce` so a library card is shareable and the record page reads the id from the URL instead of only in-memory state.

## Technical notes

- `src/routes/library.tsx`: replace the `onClick`-only button with a `Link` to `/record`; call `setSelectedRecordId(r.id)` in its `onClick`. `setSelectedRecordId` already resets `selectedOutputId` and `usedOwnNotes`.
- No changes needed in `src/routes/record.tsx` for the base fix; option 2 would add a validated `search` param there.