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
const num1 = null;
const operator = null;
const num2 = null;

// TODO: Check if the error boolean is true or not before even bothering to run these checks
// TODO: Minus (the previous num + the current operator) from the current text to isolate only new entries (Hopefully the potential new number) as the screenText arg
function checkOperator(precedingText, currentOperator, firstOperator) {
    const PLUS = '+';
    const MINUS = '-';
    const ERROR = "ERROR";
    const screenText = document.querySelector('#screen');

    if (screenText) {
        // Checking if the preeceeding text is a +/- operator
        if (precedingText === PLUS) {
            if (currentOperator === PLUS) {
                // Do nothing as the two plusses just equate to a single plus
            }
            else if (currentOperator === MINUS) {
                screenText.textContent = MINUS; // The minus cancels out the plus
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
                screenText.textContent = PLUS; // The minuses cancel out
            }
            // The current operator is being used incorrectly
            else {
                // TODO: Set error boolean to true
                return ERROR;
            }
        }
        else {
            if (firstOperator) {
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
