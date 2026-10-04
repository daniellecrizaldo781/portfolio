/* ============================================================
   Danielle Ann Mari Crizaldo — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  /* ---------- Resume modal ---------- */
  var modal = document.getElementById("resume-modal");
  var frame = document.getElementById("resume-frame");
  var downloadBtn = document.querySelector(".js-resume-download");
  var openTriggers = Array.prototype.slice.call(document.querySelectorAll(".js-resume-open"));
  var closeTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-resume-close]"));
  var lastFocused = null;

  var cfg = window.PORTFOLIO_CONFIG || {};
  var cvUrl = cfg.CV_URL || "";
  var cvDownloadUrl = cfg.CV_DOWNLOAD_URL || "";

  function openModal() {
    if (!modal) return;
    lastFocused = document.activeElement;
    if (cvUrl) frame.setAttribute("src", cvUrl);
    if (cvDownloadUrl) downloadBtn.setAttribute("href", cvDownloadUrl);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    var closeBtn = modal.querySelector(".resume-modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  openTriggers.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  closeTriggers.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal();
    });
  });

  // Close on Escape.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (modal && modal.classList.contains("open")) {
        closeModal();
      } else if (navMenu.classList.contains("open")) {
        setMenu(false);
        navToggle.focus();
      }
    }
  });

  // Trap focus inside the modal while open.
  if (modal) {
    modal.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusables = modal.querySelectorAll('a[href], button:not([disabled])');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById("contact-form");
  var contactStatus = document.getElementById("cf-status");
  var contactSubmit = document.getElementById("cf-submit");
  var contactEndpoint = cfg.CONTACT_ENDPOINT || "";

  if (contactForm) {
    if (!contactEndpoint) {
      contactSubmit.disabled = true;
      contactSubmit.textContent = "Contact form coming soon";
      contactStatus.textContent = "Direct messaging is being set up. Please email me in the meantime.";
      contactStatus.className = "form-status";
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactEndpoint) return;

      var name = document.getElementById("cf-name").value.trim();
      var email = document.getElementById("cf-email").value.trim();
      var message = document.getElementById("cf-message").value.trim();
      var hp = document.getElementById("cf-hp").value;

      if (!name || !email || !message) {
        contactStatus.textContent = "Please fill in all fields.";
        contactStatus.className = "form-status error";
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        contactStatus.textContent = "Please enter a valid email address.";
        contactStatus.className = "form-status error";
        return;
      }

      contactSubmit.disabled = true;
      contactSubmit.textContent = "Sending…";
      contactStatus.textContent = "";
      contactStatus.className = "form-status";

      var formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("hp", hp);

      fetch(contactEndpoint, {
        method: "POST",
        body: formData
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data && data.ok) {
            contactStatus.textContent = "Thanks! Your message has been sent.";
            contactStatus.className = "form-status success";
            contactForm.reset();
          } else {
            contactStatus.textContent = (data && data.error) || "Something went wrong. Please try again.";
            contactStatus.className = "form-status error";
          }
        })
        .catch(function () {
          contactStatus.textContent = "Could not reach the server. Please try again or email me directly.";
          contactStatus.className = "form-status error";
        })
        .finally(function () {
          contactSubmit.disabled = false;
          contactSubmit.textContent = "Send Message →";
        });
    });
  }

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
