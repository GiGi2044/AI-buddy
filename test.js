// Define variables for input and output
let num1 = parseFloat(prompt("Enter first number: "));
let num2 = parseFloat(prompt("Enter second number: "));
let operator = prompt("Enter operator (+, -, *, /): ");
let result;

// Check if input is valid
if (isNaN(num1) || isNaN(num2)) {
  console.log("Invalid input. Please enter numbers only.");
} else {
  // Perform calculation based on operator
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
      // Check for division by zero
      if (num2 === 0) {
        console.log("Cannot divide by zero.");
        break;
      }
      result = num1 / num2;
      break;
    default:
      console.log("Invalid operator. Please enter one of the following: +, -, *, /");
  }

  // Print the result to the console
  console.log(`${num1} ${operator} ${num2} = ${result}`);
}

// Sample output:
// Enter first number: 5
// Enter second number: 3
// Enter operator (+, -, *, /): *
// 5 * 3 = 15

hello
