const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n").map((line) => line.split(" "));

const cardNumbers = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

const handTypes = [
  "fiveOfAKind",
  "fourOfAKind",
  "fullHouse",
  "threeOfAKind",
  "twoPair",
  "onePair",
  "highCard",
];

const hands = [];

data.forEach(([hand, bid]) => {
  const handNumbers = hand
    .split("")
    .map((card) => cardNumbers.indexOf(card) + 1);

  const handSums = {};

  handNumbers.forEach((number) => {
    if (handSums[number]) {
      handSums[number]++;
    } else {
      handSums[number] = 1;
    }
  });

  let maxEntries = Object.entries(handSums).sort(
    ([keyA, valA], [keyB, valB]) => {
      if (valA === valB) {
        return keyB - keyA;
      } else {
        return valB - valA;
      }
    }
  );

  if (handSums["1"] && maxEntries.length > 1) {
    let [maxKey1] = maxEntries[0];
    let [maxKey2] = maxEntries[1];
    if (maxKey1 === "1") {
      handSums[maxKey2] += handSums["1"];
      delete handSums["1"];
    } else {
      handSums[maxKey1] += handSums["1"];
      delete handSums["1"];
    }
  }

  const type =
    Object.values(handSums).filter((val) => val === 5).length === 1
      ? "fiveOfAKind"
      : Object.values(handSums).filter((val) => val === 4).length === 1
      ? "fourOfAKind"
      : Object.values(handSums).filter((val) => val === 2).length === 2
      ? "twoPair"
      : Object.values(handSums).filter((val) => val === 3 || val === 2)
          .length === 2
      ? "fullHouse"
      : Object.values(handSums).filter((val) => val === 3).length === 1
      ? "threeOfAKind"
      : Object.values(handSums).filter((val) => val === 2).length === 1
      ? "onePair"
      : "highCard";

  hands.push({
    bid: parseInt(bid),
    handNumbers,
    type: handTypes.indexOf(type),
  });
});

hands.sort((a, b) => {
  if (a.type === b.type) {
    let winnerHand = null;
    let formerHandA = JSON.parse(JSON.stringify(a.handNumbers));
    let formerHandB = JSON.parse(JSON.stringify(b.handNumbers));
    while (!winnerHand) {
      let aHand = a.handNumbers.shift();
      let bHand = b.handNumbers.shift();
      if (aHand > bHand) {
        winnerHand = 1;
      } else if (aHand < bHand) {
        winnerHand = 2;
      }
      if (!aHand) {
        winnerHand = 3;
      }
    }

    a.handNumbers = formerHandA;
    b.handNumbers = formerHandB;
    return winnerHand === 1 ? 1 : winnerHand === 2 ? -1 : 0;
  }
  return b.type - a.type;
});

let sum = 0;

for (let i = 0; i < hands.length; i++) {
  sum += hands[i].bid * (i + 1);
}

console.log(sum);
