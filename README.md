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

The resume button opens the CV in a new tab. The URL is configured in **one place**:

```
js/config.js
```

```js
window.PORTFOLIO_CONFIG.CV_URL = "https://drive.google.com/file/d/1SJUipWibo7Ad42HdP8-7LoDqfZGh4MU8/view?usp=drive_link";
```

To override at build/deploy time, define `window.PORTFOLIO_CONFIG.CV_URL` **before** `js/config.js` loads (e.g. via a server-injected snippet). If no CV URL is configured, the Resume button gracefully falls back to the Contact section. **No credentials are ever embedded in the code or exposed to the browser.**

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
