const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n\n");

const seeds = data[0]
  .split(": ")[1]
  .split(" ")
  .map((number) => parseInt(number));

for (let i = 1; i < data.length; i++) {
  const almanacMap = data[i].split(":\n")[1].split("\n");

  const completedTransitionsId = [];

  almanacMap.forEach((row) => {
    const [destinationStart, sourceStart, range] = row
      .split(" ")
      .map((number) => parseInt(number));

    const sourceEnd = sourceStart + range;

    seeds.forEach((seed, j) => {
      if (
        !completedTransitionsId.includes(j) &&
        seed >= sourceStart &&
        seed < sourceEnd
      ) {
        seeds[j] = destinationStart + (seed - sourceStart);
        completedTransitionsId.push(j);
      }
    });
  });
}

seeds.sort((a, b) => a - b);

console.log(seeds[0]);
