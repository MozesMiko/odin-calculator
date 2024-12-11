let currentNumber = 4;
let inputNumber = 6;
let operator = "-";

const operate = function(num1, operator, num2) {
  switch(operator) {
    case "+":
      console.log(num1 + num2);
      break;
    case "-":
      console.log(num1 - num2);
      break;
    case "*":
      console.log(num1 * num2);
      break;
    case "/":
      console.log(num1 / num2);
      break;
  }
}

const clearButton = document.querySelector("#clear");

const clear = function() {
  currentNumber = "";
  inputNumber = "";
  operator = "";
  console.log(currentNumber);
  console.log(inputNumber);
  console.log(operator);
}

clearButton.addEventListener("click", clear)

const addButton = document.querySelector("#add");
const add = function(){
  operator = "+";
  console.log(operator);
}

addButton.addEventListener("click", add);

console.log(currentNumber);
console.log(inputNumber);
console.log(operator);