"use strict";

let screen = document.querySelector(".viewfinder");
let operationAritmetic = [];
let operator1 = '', operator2 = '', operation = '';

export function initCalculator() {
  let buttonCommons = document.querySelectorAll(".button");
  buttonCommons.forEach((button) => {
    if (button.classList.contains("button__commons")) {
      button.addEventListener("pointerdown", handleClickBtn);
    }
    if (button.classList.contains("button__calculator")) {
      button.addEventListener("pointerdown", deleteOperatorScreen);
    }
    if(button.classList.contains("button__result")) {
        button.addEventListener("pointerdown", handlerBtnResult);
    }
  });
}

function handleClickBtn(event) {
    if (event.target.value != "DEL" || event.target.value != "RESET" || event.target.value != "=") {
        if(event.target.value.match(/[0-9.]/)) {
            operator1 = operator1 + event.target.value;
        }
        //operationAritmetic.push(event.target.value);
    }
    console.log(event.target.value);
    console.log(operationAritmetic);
    setUpdateScreen(event.target.value);
}

function setUpdateScreen(value) {
  screen.innerHTML = screen.innerHTML + value.trim();
}

function handlerBtnResult(event) {
    console.log('Calcular resultado');
    //verifica se possui dados para ser realizada operação
    if(operationAritmetic.length > 0) {
        let str = operationAritmetic.join('');
        //console.log(str.split(/[-+x\/]/));
        for (let index = 0; index < str.length; index++) {
            console.log(str[index]); 
        }
    }
}

function calculator(leftOperator, operation, rightOperator) {

}

function deleteOperatorScreen(event) {
  //verificar se foi clicado DEL ou RESET
  if (event.target.value === "DEL") {
    if (screen.textContent != "" || screen.textContent.length > 0) {
      let text = Array.from(screen.textContent.trim());
      text.pop();
      screen.textContent = text.join('');
    }else{
        screen.textContent = "0";
    }
  }
}
