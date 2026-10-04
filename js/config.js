/* ============================================================
   Portfolio configuration
   ------------------------------------------------------------
   CV_URL is the single configuration point for the resume link.
   Set it here, or override it at build/deploy time by defining
   window.PORTFOLIO_CONFIG before this file loads (e.g. via a
   server-injected snippet). No credentials are ever embedded.
   ============================================================ */
window.PORTFOLIO_CONFIG = window.PORTFOLIO_CONFIG || {};

window.PORTFOLIO_CONFIG.CV_URL =
  window.PORTFOLIO_CONFIG.CV_URL ||
  "https://drive.google.com/file/d/1SJUipWibo7Ad42HdP8-7LoDqfZGh4MU8/view?usp=drive_link";
