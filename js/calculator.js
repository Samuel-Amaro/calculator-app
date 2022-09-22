"use strict";

let screen = document.querySelector(".viewfinder");
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
    if(screen.textContent.trim() === "399,981")
      clearScreen();

    if (event.target.value != "DEL" || event.target.value != "RESET" || event.target.value != "=") {
        if (
          event.target.value === "+" ||
          event.target.value === "-" ||
          event.target.value === "x" ||
          event.target.value === "/"
        ) {
          if(operation != null) {
            result = calculator();
            if(result === null) {
              alert('Operation invalid!');
              clearValuesOperators();
              clearScreen();
              return;
            }
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
    let numberPrevios = previousNumberBeforeClick.includes(".")
      ? parseFloat(previousNumberBeforeClick)
      : parseInt(previousNumberBeforeClick);
    let nextNumber = nextPostClickNumber.includes(".")
      ? parseFloat(nextPostClickNumber)
      : parseInt(nextPostClickNumber);

    console.log(
      `${previousNumberBeforeClick} ${operation} ${nextPostClickNumber} = ${operationsCalculator(
        numberPrevios,
        operation,
        nextNumber
      )}`
    );

    let result = operationsCalculator(numberPrevios, operation, nextNumber);

    if (result != Infinity && isNaN(result) === false) {
      clearScreen();
      setUpdateScreen(result.toString());
      return String(result);
    } else {
      alert("Operation invalid! Entry with numbers.");
      clearValuesOperators();
      clearScreen();
      return null;
    }
  }else{
    console.log('calculator informa que não ha numeros suficientes na operação previousNumber: ' + previousNumberBeforeClick + " / operation = " + operation + " / " + "nextNumber: " + nextPostClickNumber);
    return null;
  }
}

function deleteOperatorScreen(event) {
  //verificar se foi clicado DEL ou RESET
  if (event.target.value === "DEL") {
    if ((screen.textContent != "" && screen.textContent.length > 0 ) && (previousNumberBeforeClick != '' || nextPostClickNumber != '')) {
      deleteCharScreen();
    }else{
        alert("There are no operators to delete");
        clearScreen();
        clearValuesOperators();
    }
  }else{
    //CLICOU "RESET"
    clearScreen();
    clearValuesOperators();
  }
}

function deleteCharScreen() {
  let textScreen = Array.from(screen.textContent.trim());
  //saber se eu estou deletando uma operação ou resultado
  let valueCurrentOperation = calculator(
    parseInt(previousNumberBeforeClick),
    operation,
    parseInt(nextPostClickNumber)
  );

  //variaveis controladores das operações e screen são iguais
  if (textScreen.join("") === String(valueCurrentOperation)) {
    previousNumberBeforeClick = textScreen.join("");
    nextPostClickNumber = "";
    operation = null;
  }

  textScreen.pop();
  screen.textContent = textScreen.join("");

  if (nextPostClickNumber != "") {
    console.log(
      `nextNumber anterior: ${nextPostClickNumber} lenght: ${nextPostClickNumber.length}`
    );
    let newNextNumber = Array.from(nextPostClickNumber);
    newNextNumber.pop();
    nextPostClickNumber = newNextNumber.join("");
    console.log(
      `nextNumber atual: ${nextPostClickNumber} lenght: ${nextPostClickNumber.length}`
    );
    return;
  }

  if (operation != "" && operation != null) {
    console.log(`operation: ${operation} lenght: ${operation.length}`);
    let newOperation = Array.from(operation);
    newOperation.pop();
    operation = newOperation.join() === "" ? null : newOperation.join();
    console.log(
      `operation apos excluido: ${operation} lenght: ${operation?.length}`
    );
    return;
  }

  if (previousNumberBeforeClick != "") {
    console.log(
      `previousNumber: ${previousNumberBeforeClick} lenght: ${previousNumberBeforeClick.length}`
    );
    let newPreviousNumber = Array.from(previousNumberBeforeClick);
    newPreviousNumber.pop();
    previousNumberBeforeClick = newPreviousNumber.join("");
    console.log(
      `previous Number apos excluido: ${previousNumberBeforeClick} lenght: ${previousNumberBeforeClick.length}`
    );
    return;
  }

  if (
    (nextPostClickNumber === "" &&
      operation === "" &&
      previousNumberBeforeClick === "") ||
    screen.textContent.trim().length === 1
  ) {
    console.log("So possui 1 char na screen");
    clearScreen();
    clearValuesOperators();
    return;
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



