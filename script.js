const PLUS = '+';
const MINUS = '-';
const TIMES = '*';
const DIVIDE = '/';
const ERROR = "ERROR";

// Adds the event listeners for the calculator keys
function setupKeyEvents() {
    const screen = document.querySelector('#screen');
    const numberKeys = document.querySelectorAll('.num');
    const signKeys = document.querySelectorAll('.sign');
    const clear = document.querySelector('.clear');
    const equal = document.querySelector('.equals');

    
    // Allow number keys to add text content to the screen display
    numberKeys.forEach(key => key.addEventListener('click', function(e) {
        updateScreen(e.target.textContent, true);
    }))

    // Allow the clear key to clear the screen display
    clear.addEventListener('click', clearScreen);

    // Allow the equals key to run equations
    equal.addEventListener('click', function() {
        handleEquals(!operator);
    });

    // Allow operation keys to add text content to the screen display
    signKeys.forEach(key => key.addEventListener('click', function(e) {
            let stopSceenPrint = checkOperator(screen.textContent, key.textContent, !operator);
            // Displaying key pressed
            if (!stopSceenPrint) {
                updateScreen(e.target.textContent, true);
            }
    }))
}

// Changes the screens display by adding or replacing text
function updateScreen(newText, addText) {
    screen = document.querySelector('#screen');
    console.log(`Screen: ${screen.textContent}`);
    if (addText) {
       screen.textContent += newText; 
    }
    else {
        screen.textContent = newText;
    }
}

// Clears the screen and stored values
function clearScreen() {
    updateScreen('', false)
    num1 = null;
    operator = null;
    num2 = null;
    errorFound = false;
}

// Handles the mathematical logic when the equals key is pressed
function handleEquals(isFirstOperator) {
    const screen = document.querySelector('#screen');
    let precedingText = screen.textContent.replace((num1 + operator), ''); 
    let parsedNum = Number.parseFloat(precedingText);
    console.log(`equals: pre: ${precedingText}, operator: ${operator}, first: ${isFirstOperator}, par${parsedNum}`);

    if (!isFirstOperator) {
        if (!isNaN(parsedNum)) {
            num1 = operate(operator, num1, parsedNum);
            // For divisions by 0 
            if (num1 !== ERROR) {
                updateScreen(num1, false)
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
    updateScreen(ERROR, false)
}

// Checks whether the current operator pressed is legal and returns whether the screen has already been changed or not
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
                updateScreen(screen.textContent.slice(0, -1) + MINUS, false); // The minus cancels out the plus
                screenChanged = true;
            }
            // The current operator is being used incorrectly
            else {
                setErrorState();
                screenChanged = false;
            }
        }
        else if (lastChar === MINUS) {
            if (currentOperator === PLUS) {
                screenChanged = true; // Do nothing as the minus cancels out the plus
            }
            else if (currentOperator === MINUS) {
                updateScreen(screen.textContent.slice(0, -1) + PLUS, false); // The minuses cancel out
                screenChanged = true; 
            }
            // The current operator is being used incorrectly
            else {            
                setErrorState();
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
                updateScreen(screen.textContent.slice(0, -1) + MINUS, false); // The minus cancels out the plus
                operator = MINUS;
                screenChanged = true;
            }
            // The current operator is being used incorrectly
            else {              
                setErrorState();
                screenChanged = false;
            }
        }
        else if (lastChar === MINUS) {
            if (currentOperator === PLUS) {
                screenChanged = true; // Do nothing as the minus cancels out the plus
            }
            else if (currentOperator === MINUS) {
                updateScreen(screen.textContent.slice(0, -1) + PLUS, false);  // The minuses cancel out
                operator = PLUS;
                screenChanged = true; 
            }
            // The current operator is being used incorrectly
            else {               
                setErrorState();
                screenChanged = false;
            }
        }
    }

    return screenChanged;
}

// Handles mathematical logic when an operator key is pressed
function handleOperator(precedingText, currentOperator, isFirstOperator) {
    console.log(`handle: pre: ${precedingText}, cur: ${currentOperator}, first: ${isFirstOperator}`);
    let parsedNum = Number.parseFloat(precedingText);
    let screenChanged = false;

    // First operator called
    if (isFirstOperator) {
        num1 = parsedNum;
        console.log(`handle: parsed number: ${parsedNum}`);
    }
    // Subsequent operator called
    else {
        num1 = operate(operator, num1, parsedNum);
        updateScreen(num1, false)
        // For divisions by 0 
        if (num1 !== ERROR) {
            updateScreen(currentOperator, true)
        }
        else {
            setErrorState();
        }
        screenChanged = true;
    }

    operator = currentOperator;
    return screenChanged;
}

setupKeyEvents();
let num1 = null;
let operator = null;
let num2 = null;
let errorFound = false;