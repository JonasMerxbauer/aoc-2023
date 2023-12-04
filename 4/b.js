const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n");

const winsPerCard = data.map((card) => {
  const [, numbers] = card.split(": ");
  const [winningNumbers, otherNumbers] = numbers.split(" | ").map((numbers) =>
    numbers
      .split(" ")
      .map((number) => parseInt(number))
      .filter((number) => !isNaN(number))
  );

  let numberOfMatches = 0;

  otherNumbers.forEach((number) => {
    if (winningNumbers.includes(number)) {
      numberOfMatches++;
    }
  });

  return numberOfMatches;
});

const unusedCards = Array(winsPerCard.length).fill(1);

const ownedCards = Array(winsPerCard.length).fill(0);

winsPerCard.forEach((wins, i) => {
  while (unusedCards[i] > 0) {
    ownedCards[i]++;
    unusedCards[i]--;

    if (wins) {
      for (let j = 1; j <= wins; j++) {
        unusedCards[i + j]++;
      }
    }
  }
});

const cardsTotal = ownedCards.reduce((acc, curr) => acc + curr, 0);

console.log(cardsTotal);
