/* ============================================================
   Danielle Ann Mari Crizaldo — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var resumeLinks = Array.prototype.slice.call(document.querySelectorAll("#nav-resume, #hero-resume"));

  /* ---------- CV URL ---------- */
  var cvUrl = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.CV_URL) || "";
  resumeLinks.forEach(function (link) {
    if (cvUrl) {
      link.setAttribute("href", cvUrl);
    } else {
      // No CV configured: keep the button visible but point to the contact section.
      link.setAttribute("href", "#contact");
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  });

  /* ---------- Header shadow on scroll ---------- */
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navMenu.classList.toggle("open", open);
  }

  navToggle.addEventListener("click", function () {
    setMenu(navMenu.classList.contains("open") ? false : true);
  });

  // Close menu when a nav link is selected.
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  // Close menu on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  // Close menu when clicking outside.
  document.addEventListener("click", function (e) {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      setMenu(false);
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navMap = {};
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    if (id && id.charAt(0) === "#") navMap[id.slice(1)] = link;
  });

  var scrollTicking = false;
  function updateActive() {
    var pos = window.scrollY + 120;
    var currentId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) currentId = sec.id;
    });
    navLinks.forEach(function (link) { link.classList.remove("active"); });
    if (currentId && navMap[currentId]) navMap[currentId].classList.add("active");
    scrollTicking = false;
  }
  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(updateActive);
    }
  }, { passive: true });
  updateActive();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }
})();
