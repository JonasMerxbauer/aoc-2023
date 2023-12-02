const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

let sum = 0;

data.forEach((line) => {
  const [, cubesString] = line.split(":");

  const draws = cubesString.split(";");

  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  draws.forEach((draw) => {
    const cubesDrawn = draw.split(",");

    cubesDrawn.forEach((cube) => {
      const [, first, second] = cube.split(" ");

      if (cubes[second] < Number(first)) {
        cubes[second] = Number(first);
      }
    });
  });

  sum += cubes.red * cubes.green * cubes.blue;
});

console.log(sum);
