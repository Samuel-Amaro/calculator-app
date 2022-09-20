"use strict";

let screen = document.querySelector(".viewfinder");
let operationAritmetic = [];
let previousNumberBeforeClick = '', nextPostClickNumber = '', operation = null, result = null;


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

/*TODO: tratar as operações de divisão para não retornar Infinity, NaN, ou value de erro
Apos serie de operações seguidas gera erro, porque?
*/
function handleClickBtn(event) {
    if (event.target.value != "DEL" || event.target.value != "RESET" || event.target.value != "=") {
        if (
          event.target.value === "+" ||
          event.target.value === "-" ||
          event.target.value === "x" ||
          event.target.value === "/"
        ) {
          if(operation != null) {
            result = calculator();
            operation = event.target.value;
            previousNumberBeforeClick = result;
            nextPostClickNumber = '';
            clearScreen();
            setUpdateScreen(previousNumberBeforeClick.toString() + operation);
            return;
          }else{
            operation = event.target.value;
            setUpdateScreen(event.target.value);
            return;
          }
        }

        if(operation === null) {
          previousNumberBeforeClick = previousNumberBeforeClick + event.target.value;
        }

        if(operation != null) {
          nextPostClickNumber = nextPostClickNumber + event.target.value;
        }
        
        console.log('previousNumber: ' + previousNumberBeforeClick);
        console.log('operation: ' + operation);
        console.log('nextNumber: ' + nextPostClickNumber);
    }

    setUpdateScreen(event.target.value);
}

function setUpdateScreen(value) {
  screen.innerHTML = screen.innerHTML + value.trim();
}

function clearScreen() {
  screen.innerHTML = '';
}

function clearValuesOperators() {
  previousNumberBeforeClick = '';
  nextPostClickNumber = '';
  operation = null;
}

function handlerBtnResult(event) {
   calculator();
}

function calculator() {
  if(previousNumberBeforeClick != '' && operation != null && nextPostClickNumber != '') {
    console.log(
      `${previousNumberBeforeClick} ${operation} ${nextPostClickNumber} = ${operationsCalculator(
        parseInt(previousNumberBeforeClick, 10),
        operation,
        parseInt(nextPostClickNumber, 10)
      )}`
    );

    let result = operationsCalculator(
      parseInt(previousNumberBeforeClick, 10),
      operation,
      parseInt(nextPostClickNumber, 10)
    );

    clearScreen();
    setUpdateScreen(result.toString());

    return result;
  }else{
    console.log('calculator informa que não ha numeros suficientes na operação previousNumber: ' + previousNumberBeforeClick + " / operation = " + operation + " / " + "nextNumber: " + nextPostClickNumber);
  }
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

function operationsCalculator(numberA, operation, numberB) {
  let result = null;
  switch(operation) {
    case '+':
      result = numberA + numberB;
      break;
    case '-':
      result = numberA - numberB;
      break;
    case '/':
      result = numberA / numberB;
      break;
    case 'x':
      result = numberA * numberB;
      break;
  }
  return result;
}



