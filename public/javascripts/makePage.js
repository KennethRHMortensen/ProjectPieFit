import { $, $c, $q, $qa, $ce } from "./domLib.js";

export const makePage = function (where) {};

/***** CREATE SWIPE CONTAINER ******/

export const makeSwipe = function (where) {
  // Create elements
  let swipeContainer = $ce("div");
  let btnWrapper = $ce("div");

  let swipeOptions = ["Workouts", "Stats"];

  for (let i = 0; i < swipeOptions.length; i++) {
    let swipeButton = $ce("button");
    let swipeInner = document.createTextNode(swipeOptions[i]);

    swipeButton.setAttribute("class", "swipe-btn");

    swipeButton.appendChild(swipeInner);
    btnWrapper.appendChild(swipeButton);
    swipeContainer.appendChild(btnWrapper);
  }
  // Set attributes
  btnWrapper.setAttribute("class", "swipe-btn-wrapper");
  swipeContainer.setAttribute("id", "swipe-container");

  // Append elements
  swipeContainer.appendChild(btnWrapper);
  $(where).appendChild(swipeContainer);
};

/***** CREATE MAIN CONTAINER ******/

export const makeMain = function (where) {
  // Create elements
  let mainContainer = $ce("div");
  let mainWrapper = $ce("div");

  // Set attributes
  mainContainer.setAttribute("id", "main-container");
  mainWrapper.setAttribute("class", "main-wrapper");

  // Append elements
  mainContainer.appendChild(mainWrapper);
  $(where).appendChild(mainContainer);
};

/***** CREATE PAGE TITLE ******/

const makeTitle = function (where) {
  // Create elements
  let titleContainer = $ce("div");
  let title = $ce("h1");

  // Set attributes
  titleContainer.setAttribute("id", "title-container");
  title.setAttribute("id", "title");

  // Append elements
  titleContainer.appendChild(title);
  $(where).appendChild(titleContainer);
};

/***** CREATE PARAGRAPH ******/

const makePara = function (where) {
  // Create elements
  let textContainer = $ce("div");
  let text = $ce("p");

  // Set attributes
  textContainer.setAttribute("class", "text-container");
  text.setAttribute("class", "text");

  // Append elements
  textContainer.appendChild(text);
  $(where).appendChild(textContainer);
};

/***** CREATE ADD PLACEHOLDER ******/

const makeAd = function (where) {
  // Create elements
  let adContainer = $ce("div");

  // Set attributes
  adContainer.setAttribute("class", "ad-container");

  // Append elements
  $(where).appendChild(adContainer);
};

/***** CREATE MENU ******/

export const makeMenu = function (where) {
  // Create elements
  let menuContainer = $ce("div");
  let btnWrapper = $ce("div");
  let burgerBtn = $ce("div");
  let btnBurgerLine = $ce("div");
  let icons = ["fas fa-cog", "fas fa-chevron-left", "fas fa-user"];

  // Set attributes
  menuContainer.setAttribute("id", "menu-container");
  btnWrapper.setAttribute("class", "menu-btn-wrapper");
  burgerBtn.setAttribute("class", "menu-btn-burger");
  btnBurgerLine.setAttribute("class", "menu-btn-line");

  // Make buttons with icons set attributes and append them
  for (let i = 0; i < icons.length; i++) {
    let btnWrapper = $ce("div");
    let button = $ce("button");
    let btnIcon = $ce("i");

    btnWrapper.setAttribute("class", "menu-btn-wrapper");
    btnIcon.setAttribute("class", icons[i]);

    button.appendChild(btnIcon);
    btnWrapper.appendChild(button);
    menuContainer.appendChild(btnWrapper);
  }

  // Append elements into html
  burgerBtn.appendChild(btnBurgerLine);
  btnWrapper.appendChild(burgerBtn);
  menuContainer.appendChild(btnWrapper);
  $(where).appendChild(menuContainer);

  let menuBtnLine = $q(".menu-btn-line");
  let menuOpen = false;
  //   let burgerMenu = $("burgermenu");

  function openMenu() {
    console.log("clicked");
    if (!menuOpen) {
      console.log("not open");
      menuBtnLine.classList.add("open");
      menuOpen = true;
      //   burgerMenu.style.display = "block";
    } else {
      console.log("open");
      menuBtnLine.classList.remove("open");
      menuOpen = false;
      //   burgerMenu.style.display = "none";
    }
  }

  burgerBtn.addEventListener("click", openMenu);
};
