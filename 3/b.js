const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const positions = data.map((line) => {
  return line.split("");
});

let sum = 0;

positions.forEach((line, i) => {
  line.forEach((char, j) => {
    if (char === "*") {
      let adjacentNumbers = [];

      j > 0 && !isNaN(positions[i][j - 1])
        ? adjacentNumbers.push(getNumber(i, j - 1))
        : null;

      j < positions[i].length - 1 && !isNaN(positions[i][j + 1])
        ? adjacentNumbers.push(getNumber(i, j + 1))
        : null;

      i < positions.length - 1 && !isNaN(positions[i + 1][j])
        ? adjacentNumbers.push(getNumber(i + 1, j))
        : null;

      i < positions.length - 1 &&
      j < positions[i].length - 1 &&
      !isNaN(positions[i + 1][j + 1])
        ? adjacentNumbers.push(getNumber(i + 1, j + 1))
        : null;

      i < positions.length - 1 && j > 0 && !isNaN(positions[i + 1][j - 1])
        ? adjacentNumbers.push(getNumber(i + 1, j - 1))
        : null;

      i > 0 && !isNaN(positions[i - 1][j])
        ? adjacentNumbers.push(getNumber(i - 1, j))
        : null;

      i > 0 && j < positions[i].length - 1 && !isNaN(positions[i - 1][j + 1])
        ? adjacentNumbers.push(getNumber(i - 1, j + 1))
        : null;

      i > 0 && j > 0 && !isNaN(positions[i - 1][j - 1])
        ? adjacentNumbers.push(getNumber(i - 1, j - 1))
        : null;

      const newAdjacentNumbers = adjacentNumbers.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.number === value.number && t.position === value.position
          )
      );

      if (newAdjacentNumbers.length === 2) {
        sum += newAdjacentNumbers[0].number * newAdjacentNumbers[1].number;
      }
    }
  });
});

function getNumber(posY, posX) {
  let currentPosX = posX;
  let currentNumber = positions[posY][posX];

  while (
    currentPosX < positions[posY].length &&
    !isNaN(positions[posY][currentPosX + 1])
  ) {
    currentNumber += positions[posY][currentPosX + 1];
    currentPosX++;
  }

  currentPosX = posX;

  while (currentPosX > 0 && !isNaN(positions[posY][currentPosX - 1])) {
    currentNumber = positions[posY][currentPosX - 1] + currentNumber;
    currentPosX--;
  }

  return {
    number: currentNumber,
    position: `${posY},${currentPosX}`,
  };
}

console.log(sum);
