const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const points = data
  .map((card) => {
    const [, numbers] = card.split(": ");
    const [winningNumbers, otherNumbers] = numbers.split(" | ").map((numbers) =>
      numbers
        .split(" ")
        .map((number) => parseInt(number))
        .filter((number) => !isNaN(number))
    );

    let numberOfMatches = 0;

    otherNumbers.forEach((number) => {
      if (winningNumbers.includes(number)) {
        if (numberOfMatches === 0) {
          numberOfMatches = 1;
        } else {
          numberOfMatches *= 2;
        }
      }
    });

    return numberOfMatches;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(points);
