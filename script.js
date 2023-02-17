// Adds two numbers
function add(num1, num2) {
    return num1 + num2;
}

// Subtracts one number from another
function subtract(num1, num2) {
    return num1 - num2;
}

// Multiplies two numbers
function multiply(num1, num2) {
    return num1 * num2;
}

// Divides one number by another
function divide(numerator, denominator) {
    if (denominator !== 0) {
        return numerator / denominator;
    }
    // Division by 0
    return "ERROR";
}

// Calls an operator function on two numbers
function operate(operator, num1, num2) {
    if (operator === "add") {
        return add(num1, num2);
    }
    else if (operator === "subtract") {
        return subtract(num1, num2);    
    }
    else if (operator === "multiply") {
        return multiply(num1, num2);
    }
    else if (operator === "divide") {
        return divide(num1, num2);
    }
}

const screen = document.querySelector('#screen');

// Allow number keys to add text content to the screen display
const numberKeys = document.querySelectorAll('.num');
numberKeys.forEach(key => key.addEventListener('click', function(e) {
    console.log(e.target.textContent);
    screen.textContent += e.target.textContent;
}))

// Allow operation keys to add text content to the screen display
const signKeys = document.querySelectorAll('.sign');
signKeys.forEach(key => key.addEventListener('click', function(e) {
    console.log(e.target.textContent);
    screen.textContent += e.target.textContent;
}))

// Allow the clear key to clear the screen display
const clear = document.querySelector('.clear');
clear.addEventListener('click', function() {
    screen.textContent = ''
});