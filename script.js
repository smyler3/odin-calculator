const PLUS = '+';
const MINUS = '-';
const TIMES = '*';
const DIVIDE = '/';

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

// Adds the event listeners for the calculator keys
function setupKeyEvents() {
    const screen = document.querySelector('#screen');
    const numberKeys = document.querySelectorAll('.num');
    const signKeys = document.querySelectorAll('.sign');
    const clear = document.querySelector('.clear');

    // Allow number keys to add text content to the screen display
    numberKeys.forEach(key => key.addEventListener('click', function(e) {
        screen.textContent += e.target.textContent;
    }))

    // Allow operation keys to add text content to the screen display
    signKeys.forEach(key => key.addEventListener('click', function(e) {
        screen.textContent += e.target.textContent;
    }))

    // Allow the clear key to clear the screen display
    clear.addEventListener('click', function() {
        screen.textContent = '';
    });
}

setupKeyEvents();
let num1 = null;
let operator = null;
let num2 = null;

// TODO: Check if the error boolean is true or not before even bothering to run these checks
// TODO: Minus (the previous num + the current operator) from the current text to isolate only new entries (Hopefully the potential new number) as the screenText arg
// TODO: What should this function return, how to handle errors/cancelling out etc
function checkOperator(precedingText, currentOperator, isFirstOperator) {
    const ERROR = "ERROR";
    const screenText = document.querySelector('#screen');

    if (screenText) {
        // Checking if the preeceeding text is a +/- operator
        if (precedingText === PLUS) {
            if (currentOperator === PLUS) {
                // Do nothing as the two plusses just equate to a single plus
            }
            else if (currentOperator === MINUS) {
                return MINUS; // The minus cancels out the plus
            }
            // The current operator is being used incorrectly
            else {
                // TODO: Set error boolean to true
                return ERROR;
            }
        }
        else if (precedingText === MINUS) {
            if (currentOperator === PLUS) {
                // Do nothing as the minus cancels out the plus
            }
            else if (currentOperator === MINUS) {
                return PLUS; // The minuses cancel out
            }
            // The current operator is being used incorrectly
            else {
                // TODO: Set error boolean to true
                return ERROR;
            }
        }
        else {
            if (isFirstOperator) {
                // ***
                // Parse the number
                // Store the current operator for next maths
                // ***
            }
            else {
                // ***
                // Parse the number
                // Do the maths with the previous result, previous operator, and the parsed number
                // Store the current operator for next maths
                // ***    
            }
        }
    }
    else {
        if (currentOperator === MINUS || currentOperator === PLUS) {
            // Do nothing as this could be a sign for a number
        }
        // The current operator is being used incorrectly
        else {
            // Set error boolean to true
            return ERROR;
        }
    }
}

function handleOperator(preceedingText, currentOperator, isFirstOperator) {
    let parsedNum = Number.parseInt(preceedingText);
    if (isFirstOperator) {
        // TODO: Check how to enter arguments into a function stored in an objectstop Javascript (This is my best guess lol)
        // Store parsedNum as num1
        num1 = operators[operator](num1, parsedNum);
    }
    else {
        // Do maths with num1 <storedOperator> parsedNum
        // Store the result as num1
        if (currentOperator === PLUS) {
            num1 = add(num1);
        }
        if (currentOperator === MINUS) {
            num1 = subtract(num1);
        }
        if (currentOperator === TIMES) {
            num1 = multiply(num1);
        }
        if (currentOperator === DIVIDE) {
            num1 = divide(num1);
        }
    }

    currentOperator = operator;
}





























    // If it isn't:
        // (Minus the previous text + the current operator) from the current text to isolate only new entries (Hopefully the potential new number)
        // TODO: Mostly everything below here is identical to above so figure out some nuance maybe have a function that if it gets to the only differing code
        // (the sections marked with ***) then run that differing code through a different function

        // Check if there is any preeceeding text
        // If there is:
            // Check if it's a +/- operator
            // If it is:
                // Check if the current operator is a +/-
                // If it is:
                    // Solve the sign
                // If it isn't:
                    // ERROR: This current operator is being used incorrectly so set an error boolean to true;
            // If it isn't:
                // ***
                // Parse the number
                // Do the maths with the previous result, previous operator, and the parsed number
                // Store the current operator for next maths
                // ***
        // If there isn't:
            // Check if this operator is a +/-
            // If it is:
                // Do nothing as this could be a sign for a number
            // If it isn't:
                // ERROR: This current operator is being used incorrectly so set an error boolean to true;
