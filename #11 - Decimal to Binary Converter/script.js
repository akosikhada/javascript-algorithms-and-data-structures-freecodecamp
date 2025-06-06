const callStack = [
  'a(): returns "freeCodeCamp " + b()',
  'b(): returns "is " + c()',
  'c(): returns "awesome!"',
];

// TODO: Manage Call Stack
// 1. Understand the call stack order
//    a() is at the bottom (first call)
//    b() is in the middle (called by a())
//    c() is at the top (called by b())
// 2. Execution order
//    Functions execute from the top of the stack downwards (c(), then b(), then a())
// 3. When c() executes
//    It returns the string "awesome!"
//    c() is then popped off (removed) from the top of the callStack array.
// Action:
// Remove "c(): returns 'awesome!'" from the top of the callStack array.

const a = () => {
  return "freeCodeCamp " + b();
};

const b = () => {
  return "is " + c();
};

const c = () => {
  return "awesome!";
};

console.log(a());

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

const decimalToBinary = (input) => {
  let binary = "";

  if (input === 0) {
    binary = "0";
  }

  while (input > 0) {
    binary = (input % 2) + binary;
    input = Math.floor(input / 2);
  }

  result.innerText = binary;
};

const checkUserInput = () => {
  if (
    !numberInput.value ||
    isNaN(parseInt(numberInput.value)) ||
    parseInt(numberInput.value) < 0
  ) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  decimalToBinary(parseInt(numberInput.value));
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
