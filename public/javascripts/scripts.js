import { $ } from "./domLib.js";

const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false;
let burgerMenu = $("burgermenu");
export function openMenu() {
  if (!menuOpen) {
  menuBtn.classList.add("open");
  menuOpen = true;
  burgerMenu.style.display = "block";
  } se {
  menuBtn.classList.remove("open");
   mnuOpen = false;
    rgerMenu.style.display = "none";
  }
}

nuBtn.addEventListener("click", openMenu);

export function closeMenu() {
  if (menuOpen) {
      menuBtn.classList.remove("open");
    menuOpen = false;
    burgerMenu.style.display = "none";
  }
  }

headerLink.forEach((link) => {
  link.addEventListener("click", closeMenu);
  });

