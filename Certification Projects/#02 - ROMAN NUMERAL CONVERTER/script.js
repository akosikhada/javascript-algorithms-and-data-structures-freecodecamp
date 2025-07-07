document.addEventListener("DOMContentLoaded", function () {
  const convertBtn = document.getElementById("convert-btn");
  const numberInput = document.getElementById("number");
  const output = document.getElementById("output");

  convertBtn.addEventListener("click", convertToRoman);
  numberInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      convertToRoman();
    }
  });

  function convertToRoman() {
    const num = numberInput.value.trim();

    // Input validation
    if (num === "" || isNaN(num)) {
      output.textContent = "Please enter a valid number";
      return;
    }

    const number = parseInt(num);

    if (number < 1) {
      output.textContent = "Please enter a number greater than or equal to 1";
      return;
    }

    if (number >= 4000) {
      output.textContent = "Please enter a number less than or equal to 3999";
      return;
    }

    output.textContent = getRomanNumeral(number);
  }

  function getRomanNumeral(num) {
    const romanNumerals = [
      { value: 1000, symbol: "M" },
      { value: 900, symbol: "CM" },
      { value: 500, symbol: "D" },
      { value: 400, symbol: "CD" },
      { value: 100, symbol: "C" },
      { value: 90, symbol: "XC" },
      { value: 50, symbol: "L" },
      { value: 40, symbol: "XL" },
      { value: 10, symbol: "X" },
      { value: 9, symbol: "IX" },
      { value: 5, symbol: "V" },
      { value: 4, symbol: "IV" },
      { value: 1, symbol: "I" },
    ];

    let result = "";

    for (const numeral of romanNumerals) {
      while (num >= numeral.value) {
        result += numeral.symbol;
        num -= numeral.value;
      }
    }

    return result;
  }
});
