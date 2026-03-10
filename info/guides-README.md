# Guides (json/guides.json)

Guides are listed on **guides.html** by category (Roles, Digimon, Dungeons). Data is loaded from **json/guides.json**. Clicking a guide opens **guide.html** with that guide's full page: **large image on the left**, **markdown article on the right**.

## Format

- **defaultImage** – default image for cards and for the detail page if a guide has no **image** (e.g. `"images/oddysey_logo.png"`).
- **categories** – section order: `["Roles", "Digimon", "Dungeons"]`.
- **items** – array of guides. Order in the array sets the URL: first guide = `guide.html#0`, second = `guide.html#1`, etc. Each guide has:
  - **category** – `"Roles"`, `"Digimon"`, or `"Dungeons"`.
  - **date** – (optional) `"YYYY-MM-DD"` for the home **Updates** feed (newest first). If omitted, the guide may sort last.
  - **title** – guide title (used on the card and on the detail page).
  - **excerpt** – short line for the card (and fallback if there's no **body**).
  - **body** – (optional) full guide content in **Markdown**. Rendered on the detail page. Use `\n` for new lines in JSON.
  - **image** – (optional) image path for the card and for the large image on the left of the detail page. Omit to use **defaultImage**.

## Example: add a guide

Append a new object to **items**:

```json
{
  "category": "Dungeons",
  "title": "Boss mechanics",
  "excerpt": "How to handle the final boss and avoid one-shots.",
  "image": "images/dungeon-guide.png",
  "body": "## Preparation\n\nBring potions and a full party.\n\n### Phase 1\n\n- Dodge the red circles\n- Focus the adds first"
}
```

- **body** supports standard Markdown: `##` / `###` headings, **bold**, *italic*, lists, links, `code`, blockquotes.
- In JSON strings use `\n` for line breaks inside **body**.

## Detail page (guide.html)

- **Left:** Large image (guide's **image** or **defaultImage**), sticky on scroll.
- **Right:** Title + article from **body** rendered as HTML. If **body** is missing, the excerpt is shown as plain text.
- Markdown is rendered with [marked.js](https://marked.js.org/) (loaded from CDN).
