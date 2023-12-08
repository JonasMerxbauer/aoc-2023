const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n").filter((line) => line.length > 0);

const instructions = data.shift().split("");

const start = "AAA";
const end = "ZZZ";

const nodes = data.map((line) => {
  const [node, nextNodesUnformatted] = line.split(" = ");

  const nextNodes = nextNodesUnformatted.split(", ").map((nextNode) => {
    return [...nextNode]
      .filter((char) => char !== "(" && char !== ")")
      .join("");
  });

  return { node, left: nextNodes[0], right: nextNodes[1] };
});

let currentNode = start;
let currentInstruction = 0;
let steps = 0;

while (currentNode !== end) {
  const node = nodes.find((node) => node.node === currentNode);

  const instruction = instructions[currentInstruction];

  if (instruction === "L") {
    currentNode = node.left;
  } else if (instruction === "R") {
    currentNode = node.right;
  }

  currentInstruction < instructions.length - 1
    ? currentInstruction++
    : (currentInstruction = 0);

  steps++;
}

console.log(steps);
