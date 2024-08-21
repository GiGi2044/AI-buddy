let num1 = parseFloat(prompt("Enter first number: "));
let num2 = parseFloat(prompt("Enter second number: "));
let operator = prompt("Enter operator (+, -, *, /): ");
let result;

if (isNaN(num1) || isNaN(num2)) {
  console.log("Invalid input. Please enter numbers only.");
} else {
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        console.log("Cannot divide by zero.");
        break;
      }
      result = num1 / num2;
      break;
    default:
      console.log("Invalid operator. Please enter one of the following: +, -, *, /");
  }
  console.log(`${num1} ${operator} ${num2} = ${result}`);
}
