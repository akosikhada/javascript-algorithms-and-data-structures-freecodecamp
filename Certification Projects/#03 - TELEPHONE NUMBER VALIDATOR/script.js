const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const clearResult = () => {
  resultsDiv.textContent = "";
};

const clearInput = () => {
  userInput.value = "";
  clearResult();
};

clearBtn.addEventListener("click", clearInput);

const checkBrackets = (string) => {
  const openIndex = string.indexOf("(");
  const closeIndex = string.indexOf(")");

  if (
    (openIndex === -1 && closeIndex !== -1) ||
    (openIndex !== -1 && closeIndex === -1)
  ) {
    return false;
  }

  if (openIndex !== -1 && closeIndex !== -1) {
    const areaCode = string.slice(openIndex + 1, closeIndex);

    if (areaCode.length !== 3 || isNaN(Number(areaCode))) {
      return false;
    }

    const before = string.slice(0, openIndex);
    const after = string.slice(closeIndex + 1);
    const invalidCharsAround = /[()]/.test(before) || /[()]/.test(after);

    if (invalidCharsAround) {
      return false;
    }
  }

  return true;
};

const checkNumber = () => {
  clearResult();
  const value = userInput.value;
  if (!value || !value.trim()) {
    alert("Please provide a phone number");
    return false;
  } else if (value.startsWith("-") || !checkBrackets(value)) {
    resultsDiv.textContent = `Invalid US number: ${value}`;
    return false;
  }

  const sanitizedArr = value
    .replace(/([()\s+])/g, "-")
    .split("-")
    .filter(Boolean);

  let sanitized = "";

  if (sanitizedArr.length > 4) {
    resultsDiv.textContent = `Invalid US number: ${value}`;
    return false;
  } else if (sanitizedArr.length <= 4) {
    sanitized = sanitizedArr.join("");

    if (
      sanitized.length < 10 ||
      sanitized.length > 11 ||
      isNaN(Number(sanitized))
    ) {
      resultsDiv.textContent = `Invalid US number: ${value}`;
      return false;
    } else if (
      (sanitized.length === 11 && sanitized[0] !== "1") ||
      (sanitized.length === 10 &&
        (sanitized[0] === "0" || sanitized[0] === "1"))
    ) {
      resultsDiv.textContent = `Invalid US number: ${value}`;
      return false;
    }
  }

  resultsDiv.textContent = `Valid US number: ${value}`;
  return false;
};

checkBtn.addEventListener("click", checkNumber);
