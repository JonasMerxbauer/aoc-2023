const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\n").filter((line) => line.length > 0);

const instructions = data.shift().split("");

const nodes = data.map((line) => {
  const [node, nextNodesUnformatted] = line.split(" = ");

  const nextNodes = nextNodesUnformatted.split(", ").map((nextNode) => {
    return [...nextNode]
      .filter((char) => char !== "(" && char !== ")")
      .join("");
  });

  return { node, left: nextNodes[0], right: nextNodes[1] };
});

const startingNodes = nodes.filter((node) => node.node.endsWith("A"));

const getStepsToEndNode = (startNode, instructions) => {
  let currentNode = startNode;
  let steps = 0;
  let currentInstruction = 0;

  while (!currentNode.endsWith("Z")) {
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

  return steps;
};

const stepsToEndNodes = [];

startingNodes.forEach((node) => {
  stepsToEndNodes.push(getStepsToEndNode(node.node, instructions));
});

const lcm = (stepsToEndNodes) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const lcm = (x, y) => (x * y) / gcd(x, y);
  return stepsToEndNodes.reduce((a, b) => lcm(a, b));
};

console.log(lcm(stepsToEndNodes));
