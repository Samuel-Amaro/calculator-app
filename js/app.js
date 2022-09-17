"use strict";

function initToggleTheme() {
    let btnRadios = document.querySelectorAll('input[type="radio"]');
    //cada vez que um radio for checked change e acionado
    btnRadios.forEach(radioButton => {
      radioButton.addEventListener("change", (event) => {
        //obtem preferencia de tema
        //define este tema
        setOptionTheme(getOptionTheme());
        alert(`${event.target.id} changed to value =  ${event.target.value}`);
      });
    });
}

initToggleTheme();

function getOptionTheme() {
    let optionTheme = document.querySelector(".option-theme:checked");
    return optionTheme.value;
}

function setOptionTheme(themeOption) {
    let body = document.body;
    body.dataset.theme = themeOption;
}
