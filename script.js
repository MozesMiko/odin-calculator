let displayNumber = "0";
let currentNumber = null;
let storedNumber = null;
let operator = null;
let result;

const display = document.querySelector("#currentDisplay");
display.innerText = displayNumber;

const numbers = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");

const clearButton = document.querySelector("#btn-clear");
const evaluateButton = document.querySelector("#btn-equals")

for(let i = 0; i < numbers.length; i++) {
  const numberButton = numbers[i];
  numberButton.addEventListener("click", () => {
    if(displayNumber == "0") {
      displayNumber = "";
      displayNumber += numberButton.value;
      display.innerText = displayNumber;
      currentNumber = Number(displayNumber);
      printShit();
    } else {
      displayNumber += numberButton.value;
      display.innerText = displayNumber;
      currentNumber = Number(displayNumber);
      printShit();
    }
  })
}

for(let i = 0; i < operators.length; i++) {
  const operatorButton = operators[i];
  operatorButton.addEventListener("click", () => {
    if(storedNumber == null) {
      storedNumber = currentNumber;
      displayNumber = "";
      operator = operatorButton.value;
      currentNumber = null;
      printShit();
    } else {
      displayNumber = "";
      operate(storedNumber, operator, currentNumber);
      storedNumber = result;
      currentNumber = null;
      display.innerText = storedNumber;
      operator = operatorButton.value;
      printShit();
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
    return result;
  } else {
    console.error("Cannor operate with null")
  }
}

evaluateButton.addEventListener("click", () => {
  operate(storedNumber, operator, currentNumber);
  displayNumber = result.toString();
  display.innerText = displayNumber;
  // equation.innerText = storedNumber + " " + operator + " " + currentNumber + " =";
  currentNumber = null;
  storedNumber = result;
  operator = null;
  displayNumber = "";
  printShit();
})

clearButton.addEventListener("click", () => {
  // var highlighted = document.getElementsByClassName("highlight");
  currentNumber = 0;
  displayNumber = "0";
  storedNumber = null;
  operator = null;
  equation.innerText = "";
  display.innerText = "0";
  // while (highlighted.length > 0) {
  //   highlighted[0].classList.remove("highlight");
  // }
})

const printShit = function() {
  // console.log("CurrentNumber is : " + currentNumber);
  // console.log("StoredNumber is : " + storedNumber);
  // console.log("displayNumber is : " + displayNumber);
  console.log("Equation is: " + storedNumber + " " 
              + operator + " " + currentNumber);
}