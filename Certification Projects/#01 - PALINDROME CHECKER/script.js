document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("check-btn");
  const textInput = document.getElementById("text-input");
  const result = document.getElementById("result");

  checkBtn.addEventListener("click", () => {
    // Get input value
    const inputValue = textInput.value;

    // Check if empty
    if (!inputValue) {
      alert("Please input a value");
      return;
    }

    // Check if it's a palindrome
    const isPalindrome = checkPalindrome(inputValue);

    // Display result
    result.textContent = `${inputValue} is${
      isPalindrome ? "" : " not"
    } a palindrome`;

    // Apply styling
    result.className = isPalindrome ? "success" : "error";
  });

  // Function to check if string is palindrome
  function checkPalindrome(str) {
    // Remove all non-alphanumeric characters and convert to lowercase
    const cleanStr = str.replace(/[^0-9a-z]/gi, "").toLowerCase();

    // Check if empty after cleaning
    if (cleanStr.length === 0) return true;

    // Check palindrome by comparing with reversed string
    const reversedStr = cleanStr.split("").reverse().join("");
    return cleanStr === reversedStr;
  }
});
