import "./App.css";
import { useEffect, useState } from "react";
import generateHuffmanTree from "./utils/generateHuffmanTree";
import BinaryTree from "./components/BinaryTree/BinaryTree";

const App = () => {
  const [root, setRoot] = useState(null);
  const [codes, setCodes] = useState(null);
  const [liveUpdate, setLiveUpdate] = useState(false);
  const [message, setMessage] = useState("");

  const getHuffmanTree = () => {
    let [node, huffmanCodes] = generateHuffmanTree(message);
    setRoot(node);
    setCodes(huffmanCodes);
  };

  const getEncodedString = () => {
    let result = "";
    for (let i = 0; i < message.length; i++) {
      result += codes.get(message[i]);
    }
    return result;
  }

  const getEncodedStringSize = () => {
    let result = "";
    for (let i = 0; i < message.length; i++) {
      result += codes.get(message[i]);
    }
    return result.length;
  };

  const getFixedEncodedStringSize = () => {
    let letters = new Set([...message]);   
    const n = letters.size; 
    console.log(n, message.length);
    return message.length * Math.floor(Math.log2(n) + 1);
  }

  const getFixedEncodedStringCharSize = () => {
    let letters = new Set([...message]);
    return letters.size; 
  };

  useEffect(() => {
    if (!liveUpdate || message.length === 0) return;

    let [node, huffmanCodes] = generateHuffmanTree(message);
    setRoot(node);
    setCodes(huffmanCodes);
  }, [liveUpdate, message]);

  return (
    <div className="App">
      <h1 className="uppercase">Huffman Coding</h1>

      <section className="mainPanel">
        <div className="inputContainer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="button" onClick={getHuffmanTree}>
            Generate
          </button>
        </div>

        <p className="liveUpdateContainer">
          Live Update:{" "}
          <input
            type="checkbox"
            checked={liveUpdate}
            onChange={() => setLiveUpdate(!liveUpdate)}
          />
        </p>

        <div className="decodeValueContainer">
          {codes && (
            <>
              <p>Encoded String: {getEncodedString()}</p>
              <p>Huffman Code Size: {getEncodedStringSize()}</p>
              <p>Fixed Encoded Size: {getFixedEncodedStringSize()} [{getFixedEncodedStringCharSize()}]</p>

              <p>Encoding for Each Character</p>
              <div className="encodedValues">
                {[...codes.keys()].map((code) => {
                  return (
                    <p keys={codes.get(code)}>
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
