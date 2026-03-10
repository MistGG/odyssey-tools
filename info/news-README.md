# News posts (json/news.json)

All news is loaded from **json/news.json**. Edit that file to add or change posts.

## Format

- **defaultThumbnail** – default image for the home page preview list (e.g. `"images/oddysey_logo.png"`).
- **defaultCardImage** – default image for the news page cards.
- **items** – array of posts (newest first). Each post can have:
  - **date** – display date, e.g. `"March 2025"`
  - **dateSort** – (optional) sort key for the home **Updates** feed: `"YYYY-MM-DD"`. If omitted, the item may sort last.
  - **title** – headline
  - **excerpt** – short description (used on cards and home; keep it brief)
  - **body** – (optional) full article content as **HTML**. If present, the full article view shows this instead of the excerpt. Use for long text, links, and embedded videos.
  - **link** – URL (e.g. `"news.html"` or a full article URL)
  - **image** – (optional) override image path for this post

## Full article body (HTML)

Use **body** when you want a full article with paragraphs, links, and embeds. The body is rendered as HTML, so you can use tags like `<p>`, `<a>`, `<strong>`, `<ul>`, and `<iframe>` for videos.

**Example:**

```json
{
  "date": "April 2025",
  "title": "New feature",
  "excerpt": "Short one-line summary for cards.",
  "link": "news.html",
  "body": "<p>First paragraph of the article.</p><p>Second paragraph with <a href=\"https://example.com\">a link</a>.</p>"
}
```

## Embedding YouTube videos and Shorts

You can embed regular YouTube videos and YouTube Shorts by putting an **iframe** inside **body**.

### Regular YouTube video

1. On YouTube, open the video and click **Share** → **Embed**.
2. Copy the `<iframe ...></iframe>` code.
3. Put it in your **body** string. In JSON you must escape double quotes as `\"`.

**Example body with a video:**

```json
"body": "<p>Here's our latest guide.</p><div class=\"video-embed\"><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/VIDEO_ID\" title=\"YouTube video\" allowfullscreen></iframe></div><p>More text after the video.</p>"
```

Replace `VIDEO_ID` with the video's ID from the URL (e.g. `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ`).

### YouTube Shorts

Shorts use the same embed format. Get the Short's ID from the URL (e.g. `youtube.com/shorts/ABC123xyz`) and use it in the embed URL:

- Embed URL: `https://www.youtube.com/embed/ABC123xyz`

So in your **body**:

```json
"body": "<p>Check out this Short.</p><div class=\"video-embed\"><iframe src=\"https://www.youtube.com/embed/SHORT_ID\" title=\"YouTube Short\" allowfullscreen></iframe></div>"
```

Wrapping the iframe in `<div class=\"video-embed\">` keeps the video responsive (16:9) on all screen sizes.

---

## Example: minimal post (no body)

```json
{
  "date": "April 2025",
  "title": "Quick update",
  "excerpt": "We added something cool.",
  "link": "news.html"
}
```

If you omit **body**, the full article view shows the **excerpt** only.
