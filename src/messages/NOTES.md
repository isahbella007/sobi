# Translation status

`de.json` is a first-pass machine/AI-assisted translation — drafted so the
`/de` route has real content to render, not a placeholder. It has **not**
been reviewed by a native German speaker or the studio owner.

Same caveat applies twice over to `about.paragraphs.*`: these are a
translation of the owner's own verbatim English text (`en.json`'s
`about.paragraphs`), not a rewrite — the English wording itself must stay
untouched, but the German rendering of it is unreviewed and should be
checked by the owner before launch, same as every other `CONFIRM`-marked
placeholder already in `src/content/site.ts` (fabricated pricing,
testimonials, contact placeholders, etc.).
