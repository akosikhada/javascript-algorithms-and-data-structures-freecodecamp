// Function to calculate the average of the scores
function getAverage(scores) {
  let sum = 0; // Initialize sum to 0

  // Loop through each score in the scores array
  for (const score of scores) {
    sum += score; // Add the current score to the sum
  }

  // Return the average by dividing the sum by the total number of scores
  return sum / scores.length;
}

// Function to determine the grade based on the score
function getGrade(score) {
  // Check if the score is exactly 100, and return "A++"
  if (score === 100) {
    return "A++";
  }
  // Check if the score is 90 or above, and return "A"
  else if (score >= 90) {
    return "A";
  }
  // Check if the score is between 80 and 89, and return "B"
  else if (score >= 80) {
    return "B";
  }
  // Check if the score is between 70 and 79, and return "C"
  else if (score >= 70) {
    return "C";
  }
  // Check if the score is between 60 and 69, and return "D"
  else if (score >= 60) {
    return "D";
  }
  // If none of the above conditions are met, return "F" (fail)
  else {
    return "F";
  }
}

// Function to check if a student passed the course
function hasPassingGrade(score) {
  // Return true if the student's grade is not "F"
  return getGrade(score) !== "F";
}

// Function to generate the message to the student
function studentMsg(totalScores, studentScore) {
  // Calculate the class average using the getAverage function
  const classAverage = getAverage(totalScores);

  // Get the student's grade using the getGrade function
  const studentGrade = getGrade(studentScore);

  // Start building the message string with the class average and student's grade
  let message = `Class average: ${classAverage}. Your grade: ${studentGrade}.`;

  // If the student has a passing grade, add a message that they passed
  if (hasPassingGrade(studentScore)) {
    message += " You passed the course.";
  }
  // If the student doesn't have a passing grade, add a message that they failed
  else {
    message += " You failed the course.";
  }

  // Return the final message
  return message;
}

// Example usage: Testing the studentMsg function with an array of scores and a student's score
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
