// Heap Implementation at NPM Package: github.com/qiao/heap.js
import Heap from "heap";

// Creating a tree
class Node {
  constructor(v = 0) {
    this.value = v;
    this.left = null;
    this.right = null;

    this.frequency = 0;
  }
}

const getEncoding = (node, code, huffmanCodes) => {
  if (node == null) return;

  if (node.left == null && node.right == null) {
    huffmanCodes.set(node.value, code);
  }

  if (node.left != null) {
    getEncoding(node.left, code + "0", huffmanCodes);
  }

  if (node.right != null) {
    getEncoding(node.right, code + "1", huffmanCodes);
  }
};

const generateHuffmanTree = (message) => {
  // First calculate the frequency for every character
  const freq = new Map();
  for (let i = 0; i < message.length; i++) {
    if (freq.has(message[i])) {
      let oldValue = freq.get(message[i]);
      freq.set(message[i], oldValue + 1);
    } else {
      freq.set(message[i], 1);
    }
  }

  if (freq.size === 1) {
    if (message[0] !== "*") freq.set("*", 0);
    else freq.set("+", 0);
  }

  // Display the Frequencies
  // for (const [key, value] of freq.entries()) {
  //   console.log(key, value);
  // }

  // Create Node for every key with frequency in it
  let minHeap = new Heap((a, b) => a.frequency - b.frequency);
  for (const [key, value] of freq.entries()) {
    let temp = new Node(key);
    temp.frequency = value;
    minHeap.push(temp);
  }

  // Combine the first two lowest frequency nodes till only one node is remaining
  while (minHeap.size() !== 1) {
    let temp1 = minHeap.pop();
    let temp2 = minHeap.pop();
    let newFrequency = temp1.frequency + temp2.frequency;

    let node = new Node(-1);
    node.frequency = newFrequency;
    node.left = temp1;
    node.right = temp2;

    minHeap.push(node);
  }

  let root = minHeap.pop();

  // Get Encoding
  const huffmanCodes = new Map();
  getEncoding(root, "", huffmanCodes);

  // console.log(huffmanCodes);
  // console.log(root);

  return [root, huffmanCodes];
};

export default generateHuffmanTree;
