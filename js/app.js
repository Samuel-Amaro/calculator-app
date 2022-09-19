"use strict";

import {initCalculator} from "./calculator.js";

function initToggleTheme() {
    let btnRadios = document.querySelectorAll('input[type="radio"]');
    //cada vez que um radio for checked change e acionado
    btnRadios.forEach(radioButton => {
      radioButton.addEventListener("change", (event) => {
        //obtem preferencia de tema
        //define este tema
        setOptionTheme(getOptionTheme());
        //TODO: salvar escolha de tema no localStorage do navegador
        //alert(`${event.target.id} changed to value =  ${event.target.value}`);
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
}
