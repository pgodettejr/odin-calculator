const container = document.getElementById("container");
const output = document.getElementById("output");
const data = document.getElementById("calc_display");
const operands = document.querySelectorAll('[data-type="operand"]');
const operators = document.querySelectorAll('[data-type="operator"]');

// Parts of a calculator operation (Me)
let first = 0;
let second = 0;
let operator = '';
let result = '';

// Math functions (Me)
const add = function(a, b) {
  return a + b;
};

const subtract = function(c, d) {
  return c - d;
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

// Returns answers to equations using variables above (Me)
function operate(operator, first, second) {
  if (operator === '+') {
    return add(first, second);
  } else if (operator === '-') {
    return subtract(first, second);
  } else if (operator === '*') {
    return multiply(first, second);
  } else if (operator === '/') {
    return divide(first, second);
  } else {
    return "ERROR";
  }
};

// Clears display (Google - CodePen)
function clearDisplay() {
  data.innerText = '';
}

// Stores first number (StackOverflow)
function storeFirst() {
  first = parseFloat(output.value);
  output.value = '';
  operator = '';
  return first;
}

// Function that stores the operator? StackOverflow code doesn't quite make sense here

// Stores second number (StackOverflow)
function storeSecond() {
  second = parseFloat(output.value);
  output.value = operate(operator, first, second);
  return second;
}

// Defines when first number & operator are set then calls second number (StackOverflow)
function answer() {
  if (first && operator) {
    storeSecond();
  }
}

// Operator button functionality; populates next number on display (ChatGPT)
operators.forEach((button) => {
  button.addEventListener('click', () => {
    if(button.dataset.type === 'operator') {
      operator = button.value;
      clearDisplay();
      answer();
    } else if (button.dataset.type === 'clear') {
      output.value = '';
      first = 0;
      second = 0;
      operator = '';
    }
  });
});

// Number button functionality
operands.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.type === 'operand') {
      output.value += button.value;
    } 
  });
});

/* This SHOULD add event listeners for operator buttons but it doesn't (ChatGPT)
// This code seems to not make sense given the code above is nearly the same thing but for all buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', function() {
    operator = button.value;
  });
}); */


// Old and/or incorrect code

/* const power = function(x, y) {
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

buttons.forEach((button) => {
  button.addEventListener('click', operate);
  answer();
}); */