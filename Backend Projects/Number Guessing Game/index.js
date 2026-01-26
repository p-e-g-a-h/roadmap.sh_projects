const readline = require("readline-sync");

console.log("Welcome to the Number Guessing Game!");
console.log("I'm thinking of a number between 1 and 100.\n");
console.log("Please select the difficulty level:");
console.log("1. Easy (10 chances)");
console.log("2. Medium (5 chances)");
console.log("3. Hard (3 chances)\n");

let chancesInput;
do {
  chancesInput = readline.question("Enter your choice: ");
  chancesInput =
    chancesInput == 1 || chancesInput == 2 || chancesInput == 3
      ? chancesInput
      : 0;
} while (!chancesInput);

const level =
  chancesInput == 1 ? "Easy" : chancesInput == 2 ? "Medium" : "Hard";
console.log(`Great! You have selected the ${level} difficulty level.`);
console.log("Let's start the game!");

const chances = chancesInput == 1 ? 10 : chancesInput == 2 ? 5 : 3;
const x = Math.floor(Math.random() * 100 + 1);
let attempts = 1;
let state;

while (attempts <= chances) {
  numInput = readline.question("Enter your guess: ");

  if (numInput == x) {
    console.log(
      `Congratulations! You guessed the correct number in ${attempts} attempts.`,
    );
    state = "win";
    break;
  } else if (numInput > x) {
    console.log(`Incorrect! The number is less than ${numInput}.`);
  } else if (numInput < x) {
    console.log(`Incorrect! The number is greater than ${numInput}.`);
  }
  attempts++;
}

if (!state) {
  console.log("Sorry! You ran out of chances.");
}
