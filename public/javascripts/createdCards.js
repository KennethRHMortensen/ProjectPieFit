"use strict";

import { $, $c, $q, $qa, $ce } from "./domLib.js";
import { /*makeMenu*/ setTitles /*setFooter*/ } from "./nQm.js";
import { makeSwipe, makeMenu, makeMain, makeBurgerMenu } from "./makePage.js";

const doSomething = function () {
  makeSwipe("body");
  makeMenu("menu-bottom");
  makeBurgerMenu("menu-bottom");
  setTitles("Native Node, Sample");
  makeMain("main");

  // const makeGreeting = function () {
  //   // Create elements
  //   let textContainer = $ce("div");
  //   let heading = $ce("h2");
  //   let subheading = $ce("h3");
  //   let greeting = document.createTextNode("Welcome ");
  //   //let subheader = document.createTextNode("Choose a box and let's get fit!");

  //   // Set attributes
  //   textContainer.setAttribute("class", "text-container");
  //   heading.setAttribute("id", "user-greeting");
  //   subheading.setAttribute("class", "page-subheading");

  //   // Append elements
  //   heading.appendChild(greeting);
  //   textContainer.appendChild(heading);
  //   textContainer.appendChild(subheading);
  //   $q(".main-wrapper").appendChild(textContainer);
  // };
  // makeGreeting();

  // setFooter("nml", 2021);
};
window.addEventListener("load", doSomething);
