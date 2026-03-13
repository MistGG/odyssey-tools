# Content files (bodyFile)

News and guides can keep **json/news.json** and **json/guides.json** short by putting the main body in separate files.

## How it works

- In **news.json** or **guides.json**, each item can have **bodyFile** instead of **body**:
  - `"bodyFile": "content/news/marketplace-reveal.md"`
  - `"bodyFile": "content/guides/roles-tank.md"`
- The site loads that file and renders it (Markdown for both news and guides).
- If you still use **body** in JSON, it works as before (HTML for news, Markdown for guides).

## Folder structure

- **content/news/** – one `.md` file per news article (e.g. `marketplace-reveal.md`).
- **content/guides/** – one `.md` file per guide (e.g. `roles-tank.md`).

## Writing body content

- Use **Markdown** in the `.md` files (headings, lists, links, bold, etc.).
- For **embedded videos**, use raw HTML in the file:
  ```html
  <div class="video-embed"><iframe src="https://www.youtube.com/embed/VIDEO_ID" title="..." allowfullscreen></iframe></div>
  ```

## Add post editor

Use the **Add post** link in the sidebar (or open **/editor/**). It lets you:

1. Choose News or Guide and fill in title, date, excerpt, optional image, and body (Markdown).
2. **Preview** the body.
3. **Download .md file** – save it into `content/news/` or `content/guides/`.
4. **Copy JSON entry** – paste it into the `items` array in **json/news.json** or **json/guides.json** (newest at the top).

The site is static, so the editor does not save to the repo; you add the downloaded file and the pasted JSON yourself (e.g. via Git or GitHub).

## Hiding the editor from the public

- The **Add post** link in the sidebar is hidden on the live site. It only appears when:
  - You are on **localhost**, or
  - You have "unlocked" the editor by visiting **yoursite/#editor-access** once (e.g. `https://mistgg.github.io/odyssey-tools/#editor-access`). That sets a flag in your browser so the link appears and you can open `/editor/`.
- If someone opens `/editor/` without access, they see a short message instead of the form. To get access on the live site, they would need to visit `/#editor-access` first (you can share that URL only with editors).
- **Repo visibility:** The GitHub repo is separate. If the repo is public, anyone can see the code; making the repo private (if you have GitHub Pro/Teams) hides it. The editor does not expose the repo—it only helps draft posts.
