const numberDisplay = document.getElementById('numberDisplay');
const showOperation = document.getElementById('showOperation');

// add

const add = function (a, b) {
  return a + b;
};

//  SUBSTRACT
const substract = function (a, b) {
  return a - b;
};
// MULTIPLY

const mult = function (a, b) {
  return a * b;
};

// divide

const divide = function (a, b) {
  return a / b;
};

// declarando variables vacias
let firstNumber = null;
let operator = null;
let resetDisplay = false;

// declao variable global para display
// funcs for (AC/DEL)
const display = document.getElementById('display');
numberDisplay.textContent = '0';

function clearDisplay() {
  numberDisplay.textContent = '0';
  showOperation.textContent = '';
  firstNumber = null;
  operator = null;
  resetDisplay = false;
}

function delDisplay() {
  let number = numberDisplay.textContent;
  if (number.length > 1) {
    numberDisplay.textContent = number.slice(0, -1);
  } else {
    numberDisplay.textContent = '0';
    showOperation.textContent = '';
  }
}

// DOT
const dot = document.getElementById('dot');
dot.addEventListener('click', () => {
  if (numberDisplay.textContent.includes(',')) {
    return;
  }
  numberDisplay.textContent += ',';
});

//
function setOperator(op) {
  firstNumber = parseFloat(numberDisplay.textContent.replace(',', '.'));
  operator = op;
  resetDisplay = true;

  switch (op) {
    case 'add':
      showOperation.textContent = '+';
      break;
    case 'substract':
      showOperation.textContent = '-';
      break;
    case 'mult':
      showOperation.textContent = 'x';
      break;
    case 'divide':
      showOperation.textContent = '/';
      break;
    default:
      showOperation.textContent = '';
  }
}
// + num
function appendNumber(num) {
  if (numberDisplay.textContent === '0' || resetDisplay) {
    numberDisplay.textContent = num;
    resetDisplay = false;
  } else {
    numberDisplay.textContent += num;
  }
}

// Calling operations

function operate() {
  let resultado = 0;
  let error = null;

  const secondNumber = parseFloat(numberDisplay.textContent.replace(',', '.'));

  if (operator === null || isNaN(secondNumber)) {
    return;
  }

  switch (operator) {
    case 'add':
      resultado = add(firstNumber, secondNumber);
      break;
    case 'substract':
      resultado = substract(firstNumber, secondNumber);
      break;
    case 'mult':
      resultado = mult(firstNumber, secondNumber);
      break;
    case 'divide':
      if (secondNumber === 0) {
        error = 'No se puede dividir por 0';
        break;
      }
      resultado = divide(firstNumber, secondNumber);
      break;
    default:
      error = 'Operador no válido';
      break;
  }

  if (error) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = error;

    setTimeout(() => {
      errorDiv.textContent = '';
    }, 5000);

    return;
  }

  // time error
  setTimeout(() => {
    document.getElementById('error').textContent = '';
  }, 3000);

  //
  numberDisplay.textContent = resultado.toString().replace('.', ',');
  operator = null;
  resetDisplay = true;
  document.getElementById('error').textContent = '';
}
