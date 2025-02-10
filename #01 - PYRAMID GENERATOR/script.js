// Define a constant character that will be used in the pyramid shape
const character = "!";

// Define how many rows the pyramid will have
const count = 10;

// Create an empty array to store each row of the pyramid
const rows = [];

// Boolean flag that will determine if the pyramid should be inverted (flipped)
let inverted = false;

// This function creates a row with the given number and the total row count
function padRow(rowNumber, rowCount) {
  // Create a string for the row that has leading spaces, followed by characters, and then trailing spaces
  return (
    " ".repeat(rowCount - rowNumber) + // Add leading spaces for centering the pyramid
    character.repeat(2 * rowNumber - 1) + // Add the character in increasing odd counts
    " ".repeat(rowCount - rowNumber) // Add trailing spaces for centering
  );
}

// Loop through rows from 1 to 'count' (10 in this case)
for (let i = 1; i <= count; i++) {
  // If 'inverted' is false, add the row at the end of the 'rows' array (normal pyramid)
  if (inverted) {
    // If 'inverted' is true, insert the row at the beginning of the 'rows' array (inverted pyramid)
    rows.unshift(padRow(i, count));
  } else {
    // Add the row to the end of the array to build the pyramid top to bottom
    rows.push(padRow(i, count));
  }
}

// Initialize an empty string to store the final pyramid shape
let result = "";

// Loop through each row in the 'rows' array and append it to the 'result' string
for (const row of rows) {
  result = result + row + "\n"; // Add each row and a newline for separation
}

// Log the final result to the console, which will display the pyramid
console.log(result);
