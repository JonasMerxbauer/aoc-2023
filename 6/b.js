const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const [time, distance] = data.map((line) =>
  line
    .split(" ")
    .map((number) => parseInt(number))
    .filter((number) => !isNaN(number))
    .join("")
);

let wins = 0;
for (
  let buttonPressedTime = 0;
  buttonPressedTime <= time;
  buttonPressedTime++
) {
  if (buttonPressedTime * (time - buttonPressedTime) > distance) {
    wins++;
  }
}

console.log(wins);
