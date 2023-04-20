const container = document.getElementById("#container");
const output = document.getElementById("output");
const form = document.getElementById("calc_display");
const buttons = document.querySelectorAll(".buttons");

// Functions that populate the display when you click the buttons
// Store the 'display value' in a variable somewhere

let first = 0;
let second = 0;
let operator = '';

function storeFirst() {
  first = parseFloat(form.value);
  form.value = '';
  operator = '';
  return first;
}

function storeSecond() {
  second = parseFloat(form.value);
  form.value = operate(operator, first, second);
}

function answer() {
  if (first, operator) {
    storeSecond();
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', operate);
  answer();
});

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
    return "?";
  }
};

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
}; */