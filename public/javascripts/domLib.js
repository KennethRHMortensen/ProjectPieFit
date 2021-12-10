const $ = function (foo) {
  return document.getElementById(foo);
};

const $c = function (foo) {
  return document.getElementsByClassName(foo);
};

const $q = function (foo) {
  return document.querySelector(foo);
};

const $qa = function (foo) {
  return document.querySelectorAll(foo);
};

const $ce = function (foo) {
  return document.createElement(foo);
};

export { $, $c, $q, $qa, $ce };
