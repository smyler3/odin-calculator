const PLUS = '+';
const MINUS = '-';
const TIMES = '*';
const DIVIDE = '/';
const ERROR = "ERROR";

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
    if (operator === PLUS) {
        return add(num1, num2);
    }
    else if (operator === MINUS) {
        return subtract(num1, num2);    
    }
    else if (operator === TIMES) {
        return multiply(num1, num2);
    }
    else if (operator === DIVIDE) {
        return divide(num1, num2);
    }
}

// Adds the event listeners for the calculator keys
function setupKeyEvents() {
    const screen = document.querySelector('#screen');
    const numberKeys = document.querySelectorAll('.num');
    const signKeys = document.querySelectorAll('.sign');
    const clear = document.querySelector('.clear');
    const equal = document.querySelector('.equals');

    // Allow number keys to add text content to the screen display
    numberKeys.forEach(key => key.addEventListener('click', function(e) {
        screen.textContent += e.target.textContent;
    }))

    // Allow operation keys to add text content to the screen display
    signKeys.forEach(key => key.addEventListener('click', function(e) {
        if (!errorFound) {
            let stopSceenPrint = checkOperator(screen.textContent, key.textContent, !operator);
            // Displaying error
            if (errorFound) {
                screen.textContent = ERROR;
            }
            // Displaying key pressed
            else if (!stopSceenPrint) {
                screen.textContent += e.target.textContent;
            }
        }
    }))

    // Allow the clear key to clear the screen display
    clear.addEventListener('click', function() {
        screen.textContent = '';
        num1 = null;
        operator = null;
        num2 = null;
        errorFound = false;
    });

    // Allow the equals key to run equations
    equal.addEventListener('click', handleEquals);
}

setupKeyEvents();
let num1 = null;
let operator = null;
let num2 = null;
let errorFound = false;

function checkOperator(precedingText, currentOperator, isFirstOperator) {
    console.log(`initial: pre: ${precedingText}, cur: ${currentOperator}, first: ${isFirstOperator}`);
    const screen = document.querySelector('#screen');
    let screenChanged = false;
    let lastChar = '';

    // Isolating only non-recorded entry data
    if (!isFirstOperator) {
        precedingText = screen.textContent.replace((num1 + operator), ''); 
    }

    // Grabbing the last available character 
    if (!precedingText) {
        lastChar = screen.textContent.slice(-1);
    }
    else {
        lastChar = precedingText.slice(-1);
    }

    console.log(`post: pre: ${precedingText}, cur: ${currentOperator}, first: ${isFirstOperator}, last: ${lastChar}`);

    if (precedingText) {
        // Checking if the preeceeding text is a +/- operator
        if (lastChar === PLUS) {
            if (currentOperator === PLUS) {
                screenChanged = true; // Do nothing as the two plusses just equate to a single plus
            }
            else if (currentOperator === MINUS) {
                screen.textContent = screen.textContent.slice(0, -1) + MINUS;  // The minus cancels out the plus
                screenChanged = true;
            }
            // The current operator is being used incorrectly
            else {
                errorFound = true;
                screenChanged = false;
            }
        }
        else if (lastChar === MINUS) {
            if (currentOperator === PLUS) {
                screenChanged = true; // Do nothing as the minus cancels out the plus
            }
            else if (currentOperator === MINUS) {
                screen.textContent = screen.textContent.slice(0, -1) + PLUS; // The minuses cancel out
                screenChanged = true; 
            }
            // The current operator is being used incorrectly
            else {
                errorFound = true;
                screenChanged = false;
            }
        }
        else {
            if (!errorFound) {
                screenChanged = handleOperator(precedingText, currentOperator, isFirstOperator);
            }
        }
    }
    else {
        if (lastChar === PLUS) {
            if (currentOperator === PLUS) {
                screenChanged = true; // Do nothing as the two plusses just equate to a single plus
            }
            else if (currentOperator === MINUS) {
                screen.textContent = screen.textContent.slice(0, -1) + MINUS;  // The minus cancels out the plus
                operator = MINUS;
                screenChanged = true;
            }
            // The current operator is being used incorrectly
            else {
                errorFound = true;
                screenChanged = false;
            }
        }
        else if (lastChar === MINUS) {
            if (currentOperator === PLUS) {
                screenChanged = true; // Do nothing as the minus cancels out the plus
            }
            else if (currentOperator === MINUS) {
                screen.textContent = screen.textContent.slice(0, -1) + PLUS; // The minuses cancel out
                operator = PLUS;
                screenChanged = true; 
            }
            // The current operator is being used incorrectly
            else {
                errorFound = true;
                screenChanged = false;
            }
        }
    }

    return screenChanged;
}

function handleOperator(precedingText, currentOperator, isFirstOperator) {
    console.log(`handle: pre: ${precedingText}, cur: ${currentOperator}, first: ${isFirstOperator}`);
    const screen = document.querySelector('#screen');
    let parsedNum = Number.parseInt(precedingText);
    let screenChanged = false;

    // First operator called
    if (isFirstOperator) {
        num1 = parsedNum;
        console.log(`handle: parsed number: ${parsedNum}`);
    }
    // Subsequent operator called
    else {
        num1 = operate(operator, num1, parsedNum);
        screen.textContent = num1;
        // For divisions by 0 
        if (num1 !== ERROR) {
            screen.textContent += currentOperator;
        }
        screenChanged = true;
    }

    operator = currentOperator;
    return screenChanged;
}

/*
    TODO: End the error state on screen as soon as another key has been pressed unless it's also an error?
function errorState() {

}
*/

// TODO: When adding logic for equals it can just try to Number.parseInt(textContent.replace(num1 + operator) and if it fails an error was made)
//       It will also needs it's own handleOperator function called handleEquals()
function handleEquals(isFirstOperator) {
    const screen = document.querySelector('#screen');
    let precedingText = screen.textContent.replace((num1 + operator), ''); 
    let parsedNum = Number.parseInt(precedingText);
    console.log(`equals: pre: ${precedingText}, operator: ${operator}, first: ${isFirstOperator}`);

    if (!isFirstOperator) {
        if (!isNaN(parsedNum)) {
            num1 = operate(operator, num1, parsedNum);
        }
        else {
            screen.textContent = ERROR;  
        }
    }
    else {
        screen.textContent = ERROR;
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