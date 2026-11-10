# Case study page rules

"More work" cards at the bottom of case study pages have no arrow buttons. When creating or editing a case page, do not add them back.

Headings never end with a period.

Case pages: slides and images follow the carousel rule: 16:9 (or within 6%) fills the container; any other format is centred at 88% on --paper-sunk. No padding or tinted background around a filling image (side-frame bug).

No coloured panels, shadows or baked backgrounds behind images. Images get a 1px #E6E4DE border and radius 16px (mobile 12px).

"Two in a row" squares: never crop or zoom the image to fill the square. Show it at full width, natural proportions (`width: 100%; height: auto;`). A square-ish image centres; a non-square image pins to the top (`case-square--pin-top`), leaving empty space below rather than cropping.

Case template: see the "case-" classes on fleet-dashboard.html. New case pages reuse them.
