# Danielle Ann Mari Crizaldo — Personal Portfolio

A polished, modern, professional personal portfolio website for **Danielle Ann Mari Crizaldo** — Customer Service Supervisor, Customer Experience & Operations Professional, and AI & Digital Tools Specialist.

Built as a lightweight, dependency-free static site (HTML + CSS + vanilla JS). No build step required — deploy directly to GitHub Pages or any static host.

## Sections

- **Hero** — name, role, intro, and CTA buttons
- **About** — people leadership + CX + operations + data + technology
- **Professional Highlights** — statistic-style cards
- **Experience** — timeline (Supervisor & Representative at 4AM Media LLC)
- **Skills** — grouped skill cards
- **Digital & Operations Projects** — dashboard + AI-assisted tools
- **Tools** — platform/icon grid
- **Contact** — email, phone, LinkedIn placeholder
- **Footer**

## Resume link (CV_URL)

The **Resume** button opens the CV in a **same-page modal** (no new tab), with a **Download PDF** button. The URLs are configured in **one place**:

```
js/config.js
```

```js
window.PORTFOLIO_CONFIG.CV_URL = "https://drive.google.com/file/d/1SJUipWibo7Ad42HdP8-7LoDqfZGh4MU8/preview";          // inline preview
window.PORTFOLIO_CONFIG.CV_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1SJUipWibo7Ad42HdP8-7LoDqfZGh4MU8"; // download
```

To override at build/deploy time, define `window.PORTFOLIO_CONFIG` **before** `js/config.js` loads (e.g. via a server-injected snippet). If no CV URL is configured, the Resume button gracefully falls back to the Contact section. **No credentials are ever embedded in the code or exposed to the browser.**

## HTTPS

The site forces HTTPS: an inline script in `<head>` redirects any `http://` request to `https://` before render. For a proper 301 redirect (better for SEO), enable **Always Use HTTPS** in Cloudflare for the `daniellecrizaldo.com` zone.

## Contact form (send email from the site)

The contact section includes a form that lets visitors type a message and send it directly to your inbox — no email client needed. It works through a **Google Apps Script Web App** backend (free, no third-party).

**Backend code:** `backend/contact.gs` — a standalone Apps Script that receives the form POST and sends it via Gmail's `MailApp.sendEmail()` to `danielle.annmari.crzld@gmail.com`. Includes honeypot spam protection and validation.

**One-time setup:**
1. Go to https://script.google.com → **+ New project**.
2. Delete the default code, paste the contents of `backend/contact.gs`, click **Save**.
3. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone** ← critical
4. Click **Deploy**, authorize Gmail access.
5. Copy the `/exec` URL and paste it into `js/config.js` as `CONTACT_ENDPOINT`:

```js
window.PORTFOLIO_CONFIG.CONTACT_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
```

Until `CONTACT_ENDPOINT` is set, the form shows a disabled "Contact form coming soon" state and the site still works normally. **No credentials are ever exposed to the browser.**

## Local development

```bash
# Serve locally
python -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000`.

## Deployment (GitHub Pages)

1. Push this repository to GitHub.
2. In the repo **Settings → Pages**, set the source to the `main` branch (root).
3. The site is served at `https://<username>.github.io/portfolio/`.

## Design

- **Palette:** soft blush pink, dusty rose, muted rose accents, off-white, dark charcoal
- **Typography:** Fraunces (serif headings) + Inter (sans body)
- **Accessibility:** semantic HTML, keyboard navigation, visible focus states, WCAG-AA contrast, `prefers-reduced-motion` support
- **Responsive:** desktop, laptop, tablet, and mobile

## Content accuracy

All content reflects the information provided. No fabricated metrics, certifications, employers, or technical claims. Technical work is described as **AI-assisted** / **digital tools** / **dashboard development**.
