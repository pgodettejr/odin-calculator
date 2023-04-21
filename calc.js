const container = document.getElementById("container");
const output = document.getElementById("output");
const data = document.getElementById("calc_display");
const buttons = document.querySelectorAll(".buttons button");
// See operator event listener below
const operatorButtons = document.querySelectorAll('[data-type="operator"]');

// Parts of a calculator operation
let first = 0;
let second = 0;
let operator = '';

// Stores first number
function storeFirst() {
  first = parseFloat(output.value);
  output.value = '';
  operator = '';
  return first;
}

// Stores second number
function storeSecond() {
  second = parseFloat(output.value);
  output.value = operate(operator, first, second);
}

// Defines when first number & operator are set then calls second number
function answer() {
  if (first && operator) {
    storeSecond();
  }
}

// Runs operate, then populates answer on display as buttons are clicked
buttons.forEach((button) => {
  button.addEventListener('click', function() {
    if(button.dataset.type === 'operator') {
      operator = button.value;
      answer();
    } else if (button.dataset.type === 'operand') {
      output.value += button.value;
    } else if (button.dataset.type === 'clear') {
      output.value = '';
      first = 0;
      second = 0;
      operator = '';
    }
  });
});

// This SHOULD add event listeners for operator buttons but it doesn't
operatorButtons.forEach((button) => {
  button.addEventListener('click', function() {
    operator = button.value;
  });
});

// Returns answers to equations using variables above
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

// Math functions
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