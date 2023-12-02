const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

let validIdsSum = 0;

data.forEach((line) => {
  const [gameString, cubesString] = line.split(":");
  const id = gameString.split(" ")[1];

  const draws = cubesString.split(";");

  let isValid = true;

  draws.forEach((draw) => {
    const cubesDrawn = draw.split(",");

    cubesDrawn.forEach((cube) => {
      const [, first, second] = cube.split(" ");
      if (maxCubes[second] < first) {
        isValid = false;
      }
    });
  });

  if (isValid) {
    validIdsSum += Number(id);
  }
});

console.log(validIdsSum);
