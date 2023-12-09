const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str
  .split("\n")
  .map((line) => line.split(" ").map((num) => parseInt(num)));

const returnLinesTillZero = (line) => {
  const lines = [line];
  let currentLine = line;

  while (!checkIfAllZero(currentLine)) {
    const nextLine = [];
    for (let i = 0; i < currentLine.length - 1; i++) {
      nextLine.push(currentLine[i + 1] - currentLine[i]);
    }
    currentLine = nextLine;
    lines.push(nextLine);
  }
  return lines;
};

const returnNextValueInLine = (lines) => {
  const newLines = JSON.parse(JSON.stringify(lines));
  let newNumber = 0;
  for (let i = 0; i < lines.length; i++) {
    const currentLine = newLines.pop();

    newNumber = currentLine[currentLine.length - 1];

    if (i !== lines.length - 1) {
      newLines[newLines.length - 1].push(
        newLines[newLines.length - 1][
          newLines[newLines.length - 1].length - 1
        ] + newNumber
      );
    }
  }

  return newNumber;
};

const checkIfAllZero = (line) => {
  for (num of line) {
    if (num !== 0) {
      return false;
    }
  }
  return true;
};

const nextValues = [];

for (line of data) {
  const lines = returnLinesTillZero(line);

  const nextValueInLine = returnNextValueInLine(lines);

  nextValues.push(nextValueInLine);
}

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

console.log(sum(nextValues));
