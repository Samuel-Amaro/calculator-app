"use strict";

import {initCalculator} from "./calculator.js";

window.addEventListener("load", event => {
  toggleTheme(localStorage.getItem("theme"));
});

function initToggleTheme() {
    //define option theme default
    localStorage.setItem("theme", 1);
    let btnRadios = document.querySelectorAll('input[type="radio"]');
    btnRadios.forEach(radioButton => {
      radioButton.addEventListener("change", (event) => {
        setOptionTheme(getOptionTheme());
      });
    });
}

initToggleTheme();
initCalculator();

function getOptionTheme() {
    let optionTheme = document.querySelector(".option-theme:checked");
    return optionTheme.value;
}

function setOptionTheme(themeOption) {
    let body = document.body;
    body.dataset.theme = themeOption;
    localStorage.setItem("theme", themeOption);
}

function toggleTheme(themeOption) {
  let body = document.body;
  body.dataset.theme = themeOption;
}