import "./App.css";
import { useEffect, useState } from "react";
import generateHuffmanTree from "./utils/generateHuffmanTree";
import BinaryTree from "./components/BinaryTree/BinaryTree";

const App = () => {
  const [root, setRoot] = useState(null);
  const [codes, setCodes] = useState(null);
  const [message, setMessage] = useState("");

  const [encodedString, setEncodedString] = useState("");
  const [fixedEncodedStringSize, setFixedEncodedStringSize] = useState(0);
  const [fixedEncodedCharSize, setFixedEncodedCharSize] = useState(0);

  useEffect(() => {
    if (message.length === 0) return;

    let [node, huffmanCodes] = generateHuffmanTree(message);
    setRoot(node);
    setCodes(huffmanCodes);

    // Updating the variables
    let result = "";
    for (let i = 0; i < message.length; i++) {
      result += huffmanCodes.get(message[i]);
    }
    setEncodedString(result);

    // Calculating the Fixed Size Coding
    let letters = new Set([...message]);
    const n = letters.size;
    setFixedEncodedCharSize(n);
    setFixedEncodedStringSize(message.length * Math.floor(Math.log2(n) + 1));
  }, [message]);

  return (
    <div className="App">
      <h1 className="uppercase">Huffman Coding</h1>

      <section className="mainPanel">
        <div className="inputContainer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          />
        </div>

        <div className="decodeValueContainer">
          {codes && (
            <>
              <p>Encoded String: {encodedString}</p>
              <p>Huffman Code Size: {encodedString.length}</p>
              <p>
                Fixed Encoded Size: {fixedEncodedStringSize} [
                {fixedEncodedCharSize}]
              </p>

              <p>Encoding for Each Character</p>
              <div className="encodedValues">
                {[...codes.keys()].map((code) => {
                  return (
                    <p key={codes.get(code)}>
                      {code}: {codes.get(code)}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <div className="binaryTreeContainer">
        <BinaryTree root={root} />
      </div>

      <footer>
        <p>Created By: Suhaan</p>
      </footer>
    </div>
  );
};

export default App;
