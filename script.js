const PLUS = '+';
const MINUS = '-';
const TIMES = '*';
const DIVIDE = '/';
const ERROR = "ERROR";
const MAX_DIGITS = 12;
const ROUNDING = 4;

// Adds the event listeners for the calculator keys
function setupKeyEvents() {
    const display = document.querySelector('#display');
    const numberKeys = document.querySelectorAll('.num');
    const signKeys = document.querySelectorAll('.sign');
    const clear = document.querySelector('.clear');
    const equal = document.querySelector('.equals');

    
    // Allow number keys to add text content to the screen display
    numberKeys.forEach(key => key.addEventListener('click', function(e) {
        updateDisplay(e.target.textContent, true);
    }))

    // Allow the clear key to clear the screen display
    clear.addEventListener('click', clearScreen);

    // Allow the equals key to run equations
    equal.addEventListener('click', function() {
        handleEquals(!operator);
    });

    // Allow operation keys to add text content to the screen display
    signKeys.forEach(key => key.addEventListener('click', function(e) {
            let stopSceenPrint = checkOperator(display.textContent, key.textContent, !operator);
            // Displaying key pressed
            if (!stopSceenPrint) {
                updateDisplay(e.target.textContent, true);
            }
    }))
}

// Changes the screens display by adding or replacing text
function updateDisplay(newText, addText) {
    display = document.querySelector('#display');
    console.log(`Display: ${display.textContent}, Num1: ${num1}`);

    // Overwrite error message
    if (display.textContent === ERROR || display.textContent == num1) {
        display.textContent = newText;
        return;
    }

    if (addText) {
        // There is room on the screen
        if (display.textContent.length !== MAX_DIGITS) {
            display.textContent += newText; 
        }
    }
    else {
        display.textContent = newText;
    }
}

function updateHoldingNum(newText) {
    holdingNum = document.querySelector('#holdingNum');
    console.log(`Holding: ${holdingNum.textContent}`);

    holdingNum.textContent = newText;
}

// Clears the screen and stored values
function clearScreen() {
    updateDisplay('', false);
    updateHoldingNum('');
    num1 = null;
    operator = null;
    num2 = null;
    errorFound = false;
}

// Handles the mathematical logic when the equals key is pressed
function handleEquals(isFirstOperator) {
    let precedingText = display.textContent.replace(operator, ''); 
    let parsedNum = Number.parseFloat(precedingText);
    console.log(`equals: pre: ${precedingText}, operator: ${operator}, first: ${isFirstOperator}, par${parsedNum}`);

    if (!isFirstOperator) {
        if (!isNaN(parsedNum)) {
            num1 = operate(operator, num1, parsedNum);
            checkNum(num1);
            // For divisions by 0 
            if (num1 !== ERROR) {
                updateHoldingNum(num1);
                // updateDisplay('');
                updateDisplay(num1, false)
                operator = null;
                num2 = null;
            }
            else {
                setErrorState();
            }
        }
        else { 
            setErrorState();
        }
    }
    else {
        setErrorState();
    }
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

// Wipes data and displays error on scren
function setErrorState() {
    clearScreen()
    updateDisplay(ERROR, false)
}

// Checks whether the current operator pressed is legal and returns whether the screen has already been changed or not
function checkOperator(precedingText, currentOperator, isFirstOperator) {
    console.log(`initial: pre: ${precedingText}, cur: ${currentOperator}, first: ${isFirstOperator}`);
    const display = document.querySelector('#display');
    let displayChanged = false;
    let lastChar = '';

    // Isolating only non-recorded entry data
    if (!isFirstOperator) {
        precedingText = display.textContent.replace(operator, ''); 
    }

    // Grabbing the last available character 
    if (!precedingText) {
        lastChar = display.textContent.slice(-1);
    }
    else {
        lastChar = precedingText.slice(-1);
    }

    console.log(`post: pre: ${precedingText}, cur: ${currentOperator}, first: ${isFirstOperator}, last: ${lastChar}`);

    if (precedingText) {
        // Checking if the preeceeding text is a +/- operator
        if (lastChar === PLUS) {
            if (currentOperator === PLUS) {
                displayChanged = true; // Do nothing as the two plusses just equate to a single plus
            }
            else if (currentOperator === MINUS) {
                updateDisplay(display.textContent.slice(0, -1) + MINUS, false); // The minus cancels out the plus
                displayChanged = true;
            }
            // The current operator is being used incorrectly
            else {
                setErrorState();
                displayChanged = false;
            }
        }
        else if (lastChar === MINUS) {
            if (currentOperator === PLUS) {
                displayChanged = true; // Do nothing as the minus cancels out the plus
            }
            else if (currentOperator === MINUS) {
                updateDisplay(display.textContent.slice(0, -1) + PLUS, false); // The minuses cancel out
                displayChanged = true; 
            }
            // The current operator is being used incorrectly
            else {            
                setErrorState();
                displayChanged = false;
            }
        }
        else {
            if (!errorFound) {
                displayChanged = handleOperator(precedingText, currentOperator, isFirstOperator);
            }
        }
    }
    else {
        if (lastChar === PLUS) {
            if (currentOperator === PLUS) {
                displayChanged = true; // Do nothing as the two plusses just equate to a single plus
            }
            else if (currentOperator === MINUS) {
                updateDisplay(display.textContent.slice(0, -1) + MINUS, false); // The minus cancels out the plus
                operator = MINUS;
                displayChanged = true;
            }
            // The current operator is being used incorrectly
            else {              
                setErrorState();
                displayChanged = false;
            }
        }
        else if (lastChar === MINUS) {
            if (currentOperator === PLUS) {
                displayChanged = true; // Do nothing as the minus cancels out the plus
            }
            else if (currentOperator === MINUS) {
                updateDisplay(display.textContent.slice(0, -1) + PLUS, false);  // The minuses cancel out
                operator = PLUS;
                displayChanged = true; 
            }
            // The current operator is being used incorrectly
            else {               
                setErrorState();
                displayChanged = false;
            }
        }
    }

    return displayChanged;
}

// Handles mathematical logic when an operator key is pressed
function handleOperator(precedingText, currentOperator, isFirstOperator) {
    console.log(`handle: pre: ${precedingText}, cur: ${currentOperator}, first: ${isFirstOperator}`);
    let parsedNum = Number.parseFloat(precedingText);
    let displayChanged = false;

    // First operator called
    if (isFirstOperator) {
        num1 = parsedNum;
        console.log(`handle: parsed number: ${parsedNum}`);
        updateHoldingNum(num1);
        updateDisplay('');
    }
    // Subsequent operator called
    else {
        num1 = operate(operator, num1, parsedNum);
        checkNum(num1);
        updateHoldingNum(num1);
        updateDisplay(num1, false)
        // For divisions by 0 
        if (num1 !== ERROR) {
            updateDisplay(currentOperator, true)
        }
        else {
            setErrorState();
        }
        displayChanged = true;
    }

    operator = currentOperator;
    return displayChanged;
}

// Rounds to keep text inscreem
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

// Rounds the number if needed to fit the screen
function checkNum(num) {
    const roundedNum = num.toPrecision(ROUNDING)
    if (num.toString().length > MAX_DIGITS) {
        if (roundedNum < MAX_DIGITS) {
            num1 = roundedNum;
        }
        else {
            checkNum(roundedNum)
        }
    }
}

setupKeyEvents();
window.addEventListener('keydown', function(e) {
    const key = this.document.querySelector(`div[data-key="${e.key}"]`);
    key.click();
});

let num1 = null;
let operator = null;
let num2 = null;
let errorFound = false;

// After first operator put the number up the top left