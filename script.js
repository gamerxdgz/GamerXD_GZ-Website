"use strict";

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const yearEl = document.getElementById("year");

if (yearEl) yearEl.textContent = new Date().getFullYear();

function closeMenu() {
  document.body.classList.remove("menu-open");
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  const open = document.body.classList.toggle("menu-open");
  if (menuBtn) menuBtn.setAttribute("aria-expanded", String(open));
}

if (menuBtn) menuBtn.addEventListener("click", toggleMenu);

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
    closeMenu();
  }
});

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 980 && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  },
  { passive: true }
);
