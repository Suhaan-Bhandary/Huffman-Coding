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
          {codes && <h3>Characters with there Encoded values: </h3>}
          <div className="encodedValues">
            {codes &&
              [...codes.keys()].map((code) => {
                return (
                  <p keys={codes.get(code)}>
                    {code}: {codes.get(code)}
                  </p>
                );
              })}
          </div>
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
