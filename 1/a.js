const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

let sum = 0;
data.forEach((line) => {
  let first = null;
  let last = null;
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i]) && !first) {
      first = line[i];
      last = line[i];
    } else if (!isNaN(line[i])) {
      last = line[i];
    }
  }
  const num = Number(first + last);
  sum += num;
});

console.log(sum);
