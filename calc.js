const data = document.querySelector(".display");
const numButtons = document.querySelectorAll("button[data-type=number]");
const opButtons = document.querySelectorAll("button[data-type=operator]");
const equalButton = document.querySelector("button[data-type=equals]");
const clearButton = document.querySelector("button[data-type=clear]");

// Parts of a calculator operation
let first = null;
let second = null;
let currentOperator = null;
let resetScreen = false;
let result = null;

// Math functions
function add(x, y) {
  return parseFloat(x) + parseFloat(y);
};

function subtract(x, y) {
  return parseFloat(x) - parseFloat(y);
};

function multiply(x, y) {
  return parseFloat(x) * parseFloat(y);
};

function divide(x, y) {
  return parseFloat(x) / parseFloat(y);
};

// Returns answers to equations using math functions above
function operate(x, y, operator) {
  if (operator === "add") {
    return add(x, y);
  } else if (operator === "subtract") {
    return subtract(x, y);
  } else if (operator === "multiply") {
    return multiply(x, y);
  } else if (operator === "divide") {
    return divide(x, y).toFixed(5);
  } else {
    return null;
  }
};

// Displays numbers
function displayNumber(number) {
  data.innerText += number;
}

// Shows results on display
function showNum() {
  return data.innerText;
}

// Stores number inputs
function storeNumber(value) {
  if (first === null) {
    first = value;
  } else {
    second = value;
  }
}

// Stores operator inputs
function storeOperator(operator) {
  if (currentOperator === null) {
    currentOperator = operator;
  } else if (first && second) {
    result = operate(Number(first), Number(second), operator);
    clearDisplay();
    displayNumber(result);
    first = result;
    second = null;
    currentOperator = operator;
  }
}

// Calculates result
function answer() {
  if (first && currentOperator && !resetScreen && !second) { 
    storeNumber(showNum());
    return operate(Number(first), Number(second), currentOperator);
  } else {
    return false;
  }
}

// Clears display
function clearDisplay() {
  data.innerText = '';
}

// Resets all values & clears display
function clearAll() {
  first = null;
  second = null;
  currentOperator = null;
  clearDisplay();
}

// Operator button functionality; populates next number on display
opButtons.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    storeNumber(showNum());
    storeOperator(e.target.id); // Changed from dataset.type to id
    resetScreen = true;
  });
});

// Number button functionality
numButtons.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (resetScreen) {
      clearDisplay();
    }
    displayNumber(e.target.innerText);
    resetScreen = false;
  });
});

// Equals button functionality
equalButton.addEventListener('click', () => {
  result = answer();
  clearDisplay();
  if (result) {
    displayNumber(result);
  }
});

// Clear button functionality
clearButton.addEventListener('click', () => {
  clearAll();
});


// Old and/or incorrect code

/* const container = document.getElementById("container");
const output = document.getElementById("output");
const data = document.querySelector(".calc_display");
const buttons = document.querySelectorAll(".buttons button");

const numButtons = document.querySelectorAll(".number");
const opButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let first = 0;
let second = 0;
let operator = '';
let result = ''

// Math functions
const add = function(a, b) {
  return a + b;
};

const subtract = function(c, d) {
  return c - d;
};

const multiply = function(array) {
  return array.length
    ? array.reduce((accumulator, nextItem) => accumulator * nextItem)
    : 0;
};

const divide = function(array) {
  return array.length
    ? array.reduce((accumulator, nextItem) => accumulator / nextItem)
    : 0;
};

const sum = function(multi) {
  let sum = 0;
  
  if(multi.length === 0) {
    return sum;
  }

  for (let i = 0; i < multi.length; i++) {
    if(isNaN(multi[i])) {
      return "ERROR";
    }

    sum += multi[i];
  }

  return sum;
};

const power = function(x, y) {
  return Math.pow(x, y)
};

const factorial = function(num) {
  let result = num;

  if (num === 0 || num === 1) {
    return 1;
  }

  while (num > 1) {
    num--;
    result *= num;
  }

  return result;
}; 

// Returns answers to equations using variables above
function operate(operator, first, second) {
  if (operator === "+") {
    return add(first, second);
  } else if (operator === "-") {
    return subtract(first, second);
  } else if (operator === "*") {
    return multiply(first, second);
  } else if (operator === "/") {
    return divide(first, second);
  } else {
    return "ERROR";
  }
};

// Store first number input
function storeFirst() {
  first = parseFloat(output.value);
  output.value = '';
  operator = '';
  return first;
}

// Store second number input
function storeSecond() {
  second = parseFloat(output.value);
  output.value = operate(operator, x, y);
  first = parseFloat(output.value); // Added later. Not part of OG code
  return second;
}

// Was supposed to define when first number & operator are set then call second number
function answer() {
  if (first && operator) {
    storeSecond();
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', operate);
  answer();
});

// Runs operate, then populates answer on display as buttons are clicked
buttons.forEach((button) => {
  button.addEventListener('click', function() {
    if (button.dataset.type === 'operator') {
      operator = button.value;
      answer();
    } else if (button.dataset.type === 'number') {
      output.value += button.value;
    } else if (button.dataset.type === 'clear') {
      output.value = '';
      first = 0;
      second = 0;
      operator = '';
    }
  })
})

// Number button functionality
numButtons.forEach((button) => {
  button.addEventListener('click', () => {
    let buttonContent = button.innerText;
    output.value += buttonContent; 
  });
});

// Operator button functionality
opButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.type === 'operator') {
      operator = button.value;
      // output.value = operate(operator, x, y);
      answer();
    }
  });
});

// Equals button functionality
equalButton.addEventListener('click', () => {
  if (first && operator) {
    output.value = operate(operator, first, parseFloat(output.value));
    clearDisplay();
    if (result) {
      displayNumber(result);
    }
  }
});

// Clear button functionality
clearButton.addEventListener('click', () => {
  if (button.dataset.type === 'clear') {
    clearAll();
    output.value = '';
    first = 0;
    second = 0;
    operator = '';
  }
});

// This SHOULD add event listeners for operator buttons but it doesn't (ChatGPT)
// This code seems to not make sense given the code above is nearly the same thing but for all buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', function() {
    operator = button.value;
  });
}); 

// May need this to prevent a "form submission" when entering buttons?
data.addEventListener("submit", (e) => {
   e.preventDefault();
}); */