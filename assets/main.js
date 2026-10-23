"use strict";
(function () {
  var root = document.documentElement;
  var burger = document.querySelector(".hamburger");
  var menu = document.getElementById("mobile-menu");
  var mq = window.matchMedia("(max-width: 900px)");

  function setMenu(open) {
    if (!burger || !menu) { return; }
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("nav-open", open);
    root.style.overflow = open ? "hidden" : "";
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        burger.focus();
      }
    });
    var onChange = function () { if (!mq.matches) { setMenu(false); } };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); } else if (mq.addListener) { mq.addListener(onChange); }
    menu.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") { setMenu(false); }
    });
  }

  /* Hide the floating call button while the footer is on screen so it never covers footer content. */
  var fab = document.querySelector(".float-call");
  var foot = document.querySelector(".site-footer");
  if (fab && foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { fab.classList.toggle("is-hidden", en.isIntersecting); });
    }, { threshold: 0.05 }).observe(foot);
  }
})();
