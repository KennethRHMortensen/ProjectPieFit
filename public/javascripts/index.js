"use strict";

import { $, $c, $q, $qa, $ce } from "./domLib.js";
import { /*makeMenu*/ setTitles, setFooter } from "./nQm.js";
import { makeMenu, makeMain } from "./makePage.js";

const doSomething = function () {
  makeMenu("menu");
  setTitles("Native Node, Sample");
  makeMain("main");

  const makeGreeting = function () {
    // Create elements
    let textContainer = $ce("div");
    let text = $ce("p");
    let header = document.createTextNode("Welcome ");
    //let subheader = document.createTextNode("Choose a box and let's get fit!");

    // Set attributes
    textContainer.setAttribute("class", "text-container");
    text.setAttribute("class", "text");
    header.setAttribute("id", "greeting");

    // Append elements
    text.appendChild(header);
    textContainer.appendChild(text);
    $q(".main-wrapper").appendChild(textContainer);
  };
  makeGreeting();

  setFooter("nml", 2021);
};
window.addEventListener("load", doSomething);
