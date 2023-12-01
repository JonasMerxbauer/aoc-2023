const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const spelledNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sum = 0;
data.forEach((line) => {
  let first = null;
  let last = null;
  let newLine = "";

  for (let i = 0; i < line.length; i++) {
    newLine += line[i];
    Object.entries(spelledNumbers).forEach(([key, value]) => {
      if (newLine.includes(key)) {
        newLine = newLine.replace(key, value);
        newLine += line[i];
      }
    });
  }

  for (let i = 0; i < newLine.length; i++) {
    if (!isNaN(newLine[i]) && !first) {
      first = newLine[i];
      last = newLine[i];
    } else if (!isNaN(newLine[i])) {
      last = newLine[i];
    }
  }

  const num = Number(first + last);
  sum += num;
});

console.log(sum);
