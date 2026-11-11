# Case study page rules

"More work" cards at the bottom of case study pages have no arrow buttons. When creating or editing a case page, do not add them back.

Headings never end with a period.

Case pages: slides and images follow the carousel rule: 16:9 (or within 6%) fills the container; any other format is centred at 88% on --paper-sunk. No padding or tinted background around a filling image (side-frame bug).

No coloured panels, shadows or baked backgrounds behind images. Images get a 1px #E6E4DE border and radius 16px (mobile 12px).

"Two in a row" images: never crop, zoom, or force a square. Each box sizes itself to its own image at full width, natural proportions (`width: 100%; height: auto;`, no `aspect-ratio` on the container) — the box just hugs the image, so there's never empty space inside it. The two boxes in a row can end up different heights; that's fine.

Two images in a row are only for modal windows and narrow screens. Full desktop screens always go one per row at full width.

Case template: see the "case-" classes on fleet-dashboard.html. New case pages reuse them.

Case cards are one component (case-card): cover 16:9, quiet line "product type · year" above the title, title with the main number. No tags, description, arrows, shadows. The same component is used on the homepage and in "More work".

A card cover within 6% of 16:9 fills the container; any other format is centred at 88% on --paper-sunk.

Titles and quiet lines of cards are changed together with the H1 of each case when the case is rewritten.

# Site rules

Dark theme: the theme is the attribute data-theme="light|dark" on <html>; dark values live in one html[data-theme="dark"] block. No colour is hard-coded in components, only tokens.

Every portfolio page has the inline theme script in its <head> before the stylesheet. New pages must include it.

The saved theme choice is localStorage key nh-theme (light or dark). With no saved choice, follow prefers-color-scheme. Every storage access is in try/catch.

Dark theme: coloured panels behind images and the images themselves are not recoloured. Only the page and the neutral containers around them change.

The theme toggle is one icon button in the header before EN / RU. The icon shows the theme the click switches to.
