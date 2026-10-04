/* ============================================================
   Portfolio configuration
   ------------------------------------------------------------
   CV_URL is the single configuration point for the resume link.
   Set it here, or override it at build/deploy time by defining
   window.PORTFOLIO_CONFIG before this file loads (e.g. via a
   server-injected snippet). No credentials are ever embedded.
   ============================================================ */
window.PORTFOLIO_CONFIG = window.PORTFOLIO_CONFIG || {};

// Inline preview URL (embedded in the same-page resume modal).
window.PORTFOLIO_CONFIG.CV_URL =
  window.PORTFOLIO_CONFIG.CV_URL ||
  "https://drive.google.com/file/d/1SJUipWibo7Ad42HdP8-7LoDqfZGh4MU8/preview";

// Direct download URL (used by the "Download PDF" button).
window.PORTFOLIO_CONFIG.CV_DOWNLOAD_URL =
  window.PORTFOLIO_CONFIG.CV_DOWNLOAD_URL ||
  "https://drive.google.com/uc?export=download&id=1SJUipWibo7Ad42HdP8-7LoDqfZGh4MU8";

// Contact form backend (Google Apps Script Web App /exec URL).
// Leave empty to hide the contact form's send action gracefully.
window.PORTFOLIO_CONFIG.CONTACT_ENDPOINT =
  window.PORTFOLIO_CONFIG.CONTACT_ENDPOINT || "";
