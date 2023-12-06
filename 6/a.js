const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const [times, distances] = data.map((line) =>
  line
    .split(" ")
    .map((number) => parseInt(number))
    .filter((number) => !isNaN(number))
);

let sum = 1;

times.forEach((time, i) => {
  let wins = 0;
  for (
    let buttonPressedTime = 0;
    buttonPressedTime <= time;
    buttonPressedTime++
  ) {
    if (buttonPressedTime * (time - buttonPressedTime) > distances[i]) {
      wins++;
    }
  }

  sum *= wins;
});

console.log(sum);
