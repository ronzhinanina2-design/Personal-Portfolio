# Case study page rules

"More work" cards at the bottom of case study pages have no arrow buttons. When creating or editing a case page, do not add them back.

Headings never end with a period.

Case pages: slides and images follow the carousel rule: 16:9 (or within 6%) fills the container; any other format is centred at 88% on --paper-sunk. No padding or tinted background around a filling image (side-frame bug).

No coloured panels, shadows or baked backgrounds behind images. Images get a 1px #E6E4DE border and radius 16px (mobile 12px).

"Two in a row" images: never crop, zoom, or force a square. Each box sizes itself to its own image at full width, natural proportions (`width: 100%; height: auto;`, no `aspect-ratio` on the container) — the box just hugs the image, so there's never empty space inside it. The two boxes in a row can end up different heights; that's fine.

Case template: see the "case-" classes on fleet-dashboard.html. New case pages reuse them.
