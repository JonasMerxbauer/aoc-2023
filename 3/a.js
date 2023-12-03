const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const positions = data.map((line) => {
  return line.split("");
});

let sum = 0;
let number = 0;
let isPart = false;

positions.forEach((line, i) => {
  line.forEach((char, j) => {
    if (!isNaN(char)) {
      number === 0 ? (number = char) : (number += char);

      let adjacentTiles = [];

      adjacentTiles.push(j > 0 ? positions[i][j - 1] : null);
      adjacentTiles.push(
        j < positions[i].length - 1 ? positions[i][j + 1] : null
      );
      adjacentTiles.push(i < positions.length - 1 ? positions[i + 1][j] : null);
      adjacentTiles.push(
        i < positions.length - 1 && j < positions[i].length - 1
          ? positions[i + 1][j + 1]
          : null
      );
      adjacentTiles.push(
        i < positions.length - 1 && j > 0 ? positions[i + 1][j - 1] : null
      );
      adjacentTiles.push(i > 0 ? positions[i - 1][j] : null);
      adjacentTiles.push(
        i > 0 && j < positions[i].length - 1 ? positions[i - 1][j + 1] : null
      );
      adjacentTiles.push(i > 0 && j > 0 ? positions[i - 1][j - 1] : null);

      adjacentTiles.forEach((tile) => {
        if (tile != "." && isNaN(tile)) {
          isPart = true;
        }
      });
    } else {
      if (number != 0 && isPart) {
        sum += Number(number);
      }

      number = 0;
      isPart = false;
    }
  });

  if (number != 0 && isPart) {
    sum += Number(number);
    number = 0;
    isPart = false;
  }
});

console.log(sum);
