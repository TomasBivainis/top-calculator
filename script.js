const btns = document.querySelectorAll('button');
const screen = document.querySelector('.screen');
const casualKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', '+', '-', '*'];

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if(btn.textContent === 'AC') display('');
    else if(btn.textContent === 'C') display(screen.textContent.slice(0, screen.textContent.length-1));
    else if(btn.textContent === '=') {
      const ans = calcEquation(screen.textContent);
      display(ans);
    }
    else screen.textContent += btn.textContent;
  })
});

function display(text) {
  screen.textContent = text;
}

function operate(op, a, b) {
  switch(op) {
    case '+':
      return Math.round((a + b) * 10) / 10;
    case '-':
      return Math.round((a - b) * 10) / 10;
    case '*':
      return Math.round(a * b * 10) / 10;
    case '/':
      return Math.round((a / b) *10) / 10;
  }
}

function calcNum(eq) {    
  let ops = [];

  for(let i = 0; i < eq.length; i++) {
    if(eq[i] === '*' || eq[i] === '/') ops.push(eq[i]);
  }
  
  if(ops.length === 0) return eq;

  let processed = eq.split('*').join('/').split('/');

  while(processed.length > 1) {
    let num1 = parseFloat(processed[0]);
    let num2 = parseFloat(processed[1]);

    if(ops[0] === ':' && num2 === 0) return "No.";

    processed[1] = operate(ops[0], num1, num2).toString();
    processed.shift();
    ops.shift();
  }

  return processed[0];
}

function calcEquation(eq) {
  let processed = eq.split('+').join('-').split('-');
  let operators = [];

  for(let i = 0; i < eq.length; i++) {
    if(eq[i] === '+' || eq[i] === '-') operators.push(eq[i]);
  }

  for(let i = 0 ; i < processed.length; i++) {
    processed[i] = calcNum(processed[i]);
    if(processed[i] === 'No.') return processed[i];
  }

  while(processed.length > 1) {
    let num1 = parseFloat(processed[0]);
    let num2 = parseFloat(processed[1]);

    processed[1] = operate(operators[0], num1, num2).toString();
    processed.shift();
    operators.shift();
  }

  return processed[0];
}

window.addEventListener('keydown', (key) => {
  if(casualKeys.findIndex(element => element === key.key) !== -1) display(screen.textContent + key.key);
  if(key.key === 'Enter') {
    const ans = calcEquation(screen.textContent);
    display(ans);
  }
  if(key.key === 'Backspace') {
    display(screen.textContent.slice(0, screen.textContent.length-1));
  }
})