/*function clearAll() {console.log("cleared");};*/
let calculation = '';

function press(value) {
  calculation += value;
  document.getElementById('display').value = calculation;
}

function calculate() {
  let result = eval(calculation).toString();
  document.getElementById('total').value = result;
  calculation = result; // so you can keep calculating from the answer
}

function clearAll() {
  calculation = '';
  document.getElementById('display').value = calculation;
}

function deleteLast() {
  calculation = calculation.slice(0, -1);
  document.getElementById('display').value = calculation;
}

function percent() {
  if (calculation === '') return; // do nothing if there's no input yet
  
  let result = eval(calculation);
  if (isNaN(result)) {
    calculation = 'Error';
  } else {
    calculation = (result / 100).toString();
  }
  document.getElementById('display').value = calculation;
}