let displayNumber = "0";
let currentNumber = null;
let storedNumber = null;
let operator = null;
let result;
let decimalPressed = false;
let percentPressed = false;

const display = document.querySelector("#currentDisplay");
display.innerText = displayNumber;

const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

const clearButton = document.querySelector("#btn-clear");
const evaluateButton = document.querySelector("#btn-equals");
const decimalButton = document.querySelector(".decimal");
const plusMinusButton = document.querySelector("#btn-plus-minus");
const percentageButton = document.querySelector("#btn-percent");

const equationDisplay = document.querySelector("#equation");

const maxDigits = 16;

for(let i = 0; i < numbers.length; i++) {
  const numberButton = numbers[i];
  numberButton.addEventListener("click", () => {
    if(percentPressed == true && storedNumber != null && currentNumber != null) {
      return;
    }
    if(storedNumber != null && operator == null) {
      storedNumber = null;
    }
    if(displayNumber.length < maxDigits) {
      if(displayNumber == "0") {
        displayNumber = "";
        displayNumber += numberButton.value;
        display.innerText = displayNumber;
        currentNumber = Number(displayNumber);
        var highlighted = document.getElementsByClassName("highlight");
        while (highlighted.length > 0) {
          highlighted[0].classList.remove("highlight");
        }
      } else {
        displayNumber += numberButton.value;
        display.innerText = displayNumber;
        currentNumber = Number(displayNumber);
        var highlighted = document.getElementsByClassName("highlight");
        while (highlighted.length > 0) {
          highlighted[0].classList.remove("highlight");
        }
      }
    }
  })
}

for(let i = 0; i < operators.length; i++) {
  const operatorButton = operators[i];
  operatorButton.addEventListener("click", () => {
    for (let j = 0; j < operators.length; j++) {
      operators[j].classList.remove("highlight");
    }
    operatorButton.classList.add("highlight");
    if(storedNumber == null) {
      decimalPressed = false;
      storedNumber = currentNumber;
      displayNumber = "";
      operator = operatorButton.value;
      currentNumber = null;
      equation.innerText = storedNumber + " " + operator;
    } else  if(currentNumber == null) {
      operator = operatorButton.value;
      operatorButton.classList.add("highlight");
      equation.innerText = storedNumber + " " + operator;
    } else {
      operatorButton.classList.add("highlight");
      decimalPressed= false;
      displayNumber = "";
      operate(storedNumber, operator, currentNumber);
      storedNumber = result;
      currentNumber = null;
      display.innerText = storedNumber;
      operator = operatorButton.value;
      equation.innerText =result + " " + operator;
    }
  })
}

const operate = function(num1, operator, num2) {
  if(storedNumber != null && currentNumber != null) {
    switch(operator) {
      case "+":
        result = (num1 + num2);
        break;
      case "-":
        result = (num1 - num2);
        break;
      case "*":
        result = (num1 * num2);
        break;
      case "/":
        if(num2 === 0) {
          result = ("Cannot divide by zero")
        } else {
          result = (num1 / num2);
        }
        break;
    }
    percentPressed = false;
    if (typeof result === "number") {
      result = roundResult(result);
    }
    return result;
  } else {
    console.error("Cannor operate with null")
  }
}

evaluateButton.addEventListener("click", () => {
  if (storedNumber !== null && currentNumber !== null) {
    operate(storedNumber, operator, currentNumber);
    displayNumber = result.toString();
    display.innerText = displayNumber;
    equationDisplay.innerText = `${storedNumber} ${operator} ${currentNumber} =`;
    storedNumber = result;
    currentNumber = null;
    operator = null;
    displayNumber = "";
    decimalPressed = false;
  }
});


clearButton.addEventListener("click", () => {
  currentNumber = 0;
  displayNumber = "0";
  storedNumber = null;
  operator = null;
  equation.innerText = "";
  display.innerText = "0";
  decimalPressed = false;
  percentPressed = false;
  result = null;
  equation.innerText = "";
  var highlighted = document.getElementsByClassName("highlight");
  while (highlighted.length > 0) {
    highlighted[0].classList.remove("highlight");
  }
})

decimalButton.addEventListener("click", () => {
  if((currentNumber == 0 || currentNumber == null) && decimalPressed == false) {
    displayNumber = "0";
    displayNumber += decimalButton.value;
    currentNumber = Number(displayNumber);
    decimalPressed = true;
    display.innerText = displayNumber;
  } else if(decimalPressed == false) {
    displayNumber += decimalButton.value;
    currentNumber = Number(displayNumber);
    decimalPressed = true;
    display.innerText = displayNumber;
  }
})

plusMinusButton.addEventListener("click", () => {
  if(displayNumber != "0" && displayNumber != null) {
    if(!displayNumber.includes("-")) {
      displayNumber = "-" + displayNumber;
      display.innerText = displayNumber;
      currentNumber = Number(displayNumber);
    } else {
      displayNumber = displayNumber.slice(1);
      display.innerText = displayNumber;
      currentNumber = Number(displayNumber);
    }
  }
})

percentageButton.addEventListener("click", () => {
  if(percentPressed == true) {
     return;
  }
  if(currentNumber != null && storedNumber == null) {
    let tempNumber = 0;
    result = currentNumber / 100;
    displayNumber = result.toString();
    display.innerText = displayNumber;
    currentNumber = result;
  } else if(currentNumber != null && storedNumber != null) {
    displayNumber += percentageButton.value;
    display.innerText = displayNumber;
    tempNumber = Number(displayNumber.slice(0, -1));
    currentNumber = storedNumber * (tempNumber / 100);
  }
  percentPressed = true;
})

const roundResult = function(number) {
  if(Number.isNaN(number)) {
    return NaN;
  } else if(!Number.isInteger(number)) {
    return Number(number.toFixed(4));
  } else {
    return number;
  }
}