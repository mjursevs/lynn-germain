/* =========================================================
   Lynn Germain — site interactions
   nav · scroll-reveal · gallery filter · lightbox · mailto form
   ========================================================= */
(function () {
  "use strict";

  /* ---------- footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- nav: stuck state + mobile toggle ---------- */
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  function onScroll() {
    if (window.scrollY > 40) nav.classList.add("is-stuck");
    else nav.classList.remove("is-stuck");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  // close mobile menu after tapping a link
  document.querySelectorAll(".nav__mobile a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle && toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- gallery filter ---------- */
  var filters = document.querySelectorAll(".filter");
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      tiles.forEach(function (t) {
        var show = f === "all" || t.getAttribute("data-cat") === f;
        t.classList.toggle("is-hidden", !show);
      });
      rebuildLightboxList();
    });
  });

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var current = 0;
  var visibleTiles = tiles.slice();

  function rebuildLightboxList() {
    visibleTiles = tiles.filter(function (t) { return !t.classList.contains("is-hidden"); });
  }

  function tileData(t) {
    var img = t.querySelector("img");
    var title = t.querySelector(".tile__title");
    return {
      full: t.getAttribute("data-full") || img.src,
      alt: img.alt,
      cap: title ? title.textContent : img.alt
    };
  }

  function show(i) {
    if (!visibleTiles.length) return;
    current = (i + visibleTiles.length) % visibleTiles.length;
    var d = tileData(visibleTiles[current]);
    lbImg.src = d.full;
    lbImg.alt = d.alt;
    lbCap.textContent = d.cap;
  }

  function openLb(t) {
    rebuildLightboxList();
    var idx = visibleTiles.indexOf(t);
    show(idx < 0 ? 0 : idx);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  tiles.forEach(function (t) {
    t.addEventListener("click", function () { openLb(t); });
  });
  lbClose.addEventListener("click", closeLb);
  lbNext.addEventListener("click", function () { show(current + 1); });
  lbPrev.addEventListener("click", function () { show(current - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
  });

  /* ---------- inquiry form -> mailto ---------- */
  // NOTE: replace lynn@example.com with Lynn's real address (also in index.html).
  var LYNN_EMAIL = "lynn@example.com";
  var form = document.getElementById("inquiryForm");
  var hint = document.getElementById("formHint");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var piece = form.piece.value.trim();
      var msg = form.message.value.trim();

      if (!name || !email || !msg) {
        hint.textContent = "Please add your name, email, and a short message.";
        hint.classList.add("is-error");
        return;
      }
      hint.classList.remove("is-error");

      var subject = piece ? "Inquiry: " + piece : "Jewelry inquiry";
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        (piece ? "Piece of interest: " + piece + "\n" : "") +
        "\n" + msg + "\n";
      window.location.href =
        "mailto:" + LYNN_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      hint.textContent = "Opening your email app…";
    });
  }
})();
