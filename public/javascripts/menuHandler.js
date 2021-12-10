import { $ } from "./domLib.js";

const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
let burgerMenu = $("burgermenu");

function openMenu() {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    menuOpen = true;
    burgerMenu.style.display = "block";
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
    burgerMenu.style.display = "none";
  }
}

menuBtn.addEventListener("click", openMenu);

function closeMenu() {
  if (menuOpen) {
    menuBtn.classList.remove("open");
    menuOpen = false;
    burgerMenu.style.display = "none";
  }
}

headerLink.forEach((link) => {
  link.addEventListener("click", closeMenu);
});
