"use strict";

let screen = document.querySelector(".viewfinder");
let previousNumberBeforeClick = "",
  nextPostClickNumber = "",
  operation = null,
  result = null;

export function initCalculator() {
  let buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    if (button.classList.contains("button__commons")) {
      button.addEventListener("pointerdown", handleClickBtn);
    }
    if (button.classList.contains("button__calculator")) {
      button.addEventListener("pointerdown", deleteOperatorScreen);
    }
    if (button.classList.contains("button__result")) {
      button.addEventListener("pointerdown", handlerBtnResult);
    }
  });
  document.addEventListener("keydown", handlerKeyButton);
}

function handleClickBtn(event) {
  if (screen.textContent.trim() === "399,981") clearScreen();

  if (
    event.target.value != "DEL" ||
    event.target.value != "RESET" ||
    event.target.value != "="
  ) {
    if (
      event.target.value === "+" ||
      event.target.value === "-" ||
      event.target.value === "x" ||
      event.target.value === "/"
    ) {
      if (operation != null) {
        result = calculator();
        if (result === null) {
          alert("Operation invalid!");
          clearValuesOperators();
          clearScreen();
          return;
        }
        operation = event.target.value;
        previousNumberBeforeClick = result;
        nextPostClickNumber = "";
        clearScreen();
        setUpdateScreen(previousNumberBeforeClick.toString() + operation);
        return;
      } else {
        operation = event.target.value;
        setUpdateScreen(event.target.value);
        return;
      }
    }

    if (operation === null) {
      previousNumberBeforeClick =
        previousNumberBeforeClick + event.target.value;
    }

    if (operation != null) {
      nextPostClickNumber = nextPostClickNumber + event.target.value;
    }
    
  }

  setUpdateScreen(event.target.value);

}

function setUpdateScreen(value) {
  screen.innerHTML = screen.innerHTML + value.trim();
}

function clearScreen() {
  screen.innerHTML = "";
}

function clearValuesOperators() {
  previousNumberBeforeClick = "";
  nextPostClickNumber = "";
  operation = null;
}

function handlerBtnResult(event) {
  let result = calculator();
  previousNumberBeforeClick = result === null ? '' : result;
  operation = null;
  nextPostClickNumber = "";
}

function calculator() {
  if (
    previousNumberBeforeClick != "" &&
    operation != null &&
    nextPostClickNumber != ""
  ) {
    let numberPrevios = previousNumberBeforeClick.includes(".")
      ? parseFloat(previousNumberBeforeClick)
      : parseInt(previousNumberBeforeClick);
    let nextNumber = nextPostClickNumber.includes(".")
      ? parseFloat(nextPostClickNumber)
      : parseInt(nextPostClickNumber);

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
  } else {
    alert(
      "calculator reports that there are not enough numbers in the operation"
    );
    clearScreen();
    clearValuesOperators();
    return null;
  }
}

function deleteOperatorScreen(event) {
  if (event?.target.value === "DEL" || event?.key === "Backspace") {
    if (
      screen.textContent != "" &&
      screen.textContent.length > 0 &&
      (previousNumberBeforeClick != "" || nextPostClickNumber != "")
    ) {
      deleteCharScreen();
    } else {
      alert("There are no operators to delete");
      clearScreen();
      clearValuesOperators();
    }
  } else {
    clearScreen();
    clearValuesOperators();
  }
}

function deleteCharScreen() {
  let textScreen = Array.from(screen.textContent.trim());
  textScreen.pop();
  screen.textContent = textScreen.join("");

  if (nextPostClickNumber != "") {
    let newNextNumber = Array.from(nextPostClickNumber);
    newNextNumber.pop();
    nextPostClickNumber = newNextNumber.join("");
    return;
  }

  if (operation != "" && operation != null) {
    let newOperation = Array.from(operation);
    newOperation.pop();
    operation = newOperation.join() === "" ? null : newOperation.join();
    return;
  }

  if (previousNumberBeforeClick != "") {
    let newPreviousNumber = Array.from(previousNumberBeforeClick);
    newPreviousNumber.pop();
    previousNumberBeforeClick = newPreviousNumber.join("");
    return;
  }

  if (
    (nextPostClickNumber === "" &&
      operation === "" &&
      previousNumberBeforeClick === "") ||
    screen.textContent.trim().length === 1
  ) {
    clearScreen();
    clearValuesOperators();
    return;
  }
}

function operationsCalculator(numberA, operation, numberB) {
  let result = null;
  switch (operation) {
    case "+":
      result = numberA + numberB;
      break;
    case "-":
      result = numberA - numberB;
      break;
    case "/":
      result = numberA / numberB;
      break;
    case "x":
      result = numberA * numberB;
      break;
  }
  return result;
}

function handlerKeyButton(event) {
  let keys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "-",
    "+",
    "=",
    "x",
    "/",
    ".",
    "Delete", //Reset
    "Enter", // =
    "Backspace", //delete 1 char
  ];
  /*TODO: atribuir handler a outros buttons key*/
  if (keys.includes(event.key)) {
    if (screen.textContent.trim() === "399,981") clearScreen();

    //se não vou deletar, resetar ou obter resultado, vou informar um numero
    if (event.key != "Delete" && event.key != "Backspace" && event.key != "=" && event.key != "Enter") {
      controlerCalculatorKey(event.key);
      event.preventDefault();
    } else {

      //vou resetar operação ou deletar um numero
      if (event.key === "Delete" || event.key === "Backspace") {
        deleteOperatorScreen(event);
      }

      //obter resultado
      if(event.key === "=" || event.key === "Enter") {
        handlerBtnResult(event);
      } 

    }
  }
}

function controlerCalculatorKey(value) {
  if (value === "+" || value === "-" || value === "x" || value === "/") {
    if (operation != null) {
      result = calculator();
      if (result === null) {
        alert("Operation invalid!");
        clearValuesOperators();
        clearScreen();
        return;
      }
      operation = value;
      previousNumberBeforeClick = result;
      nextPostClickNumber = "";
      clearScreen();
      setUpdateScreen(previousNumberBeforeClick.toString() + operation);
      return;
    } else {
      operation = value;
      setUpdateScreen(value);
      return;
    }
  }

  if (operation === null) {
    previousNumberBeforeClick = previousNumberBeforeClick + value;
  }

  if (operation != null) {
    nextPostClickNumber = nextPostClickNumber + value;
  }

  setUpdateScreen(value);
}
