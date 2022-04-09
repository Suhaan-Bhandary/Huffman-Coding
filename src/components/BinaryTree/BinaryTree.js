import styles from "./BinaryTree.module.css";

const TreeNode = ({
  node,
  isLeftLonelyNode,
  isRightLonelyNode,
  showFrequencies,
}) => {
  // * If the Node is a null node
  if (node == null) return <></>;

  // * If both the childrens are not present
  let placeholder = showFrequencies ? node.frequency : " ";

  let nodeValueDisplay = showFrequencies
    ? node.value + "-" + node.frequency
    : node.value;

  if (node.left == null && node.right == null) {
    return (
      <div
        className={`${
          isLeftLonelyNode || isRightLonelyNode ? "" : styles.node
        } ${isLeftLonelyNode ? styles.lonelyNodeLeft : ""} ${
          isRightLonelyNode ? styles.lonelyNodeRight : ""
        }`}
      >
        <div
          className={`${styles.node__element} ${
            node.value === -1 ? "" : styles.leafNodes
          }`}
        >
          {node.value === -1 ? placeholder : nodeValueDisplay}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${isLeftLonelyNode || isRightLonelyNode ? "" : styles.node} ${
        isLeftLonelyNode ? styles.lonelyNodeLeft : ""
      } ${isRightLonelyNode ? styles.lonelyNodeRight : ""}`}
    >
      <div
        className={`${styles.node__element} ${
          node.value === -1 ? "" : styles.leafNodes
        }`}
      >
        {node.value === -1 ? placeholder : nodeValueDisplay}
      </div>
      <div className={styles.node__bottom_line}></div>

      <div className={styles.node__children}>
        <TreeNode
          node={node.left}
          isLeftLonelyNode={node.right == null}
          isRightLonelyNode={false}
          showFrequencies={showFrequencies}
        />
        <TreeNode
          node={node.right}
          isLeftLonelyNode={false}
          isRightLonelyNode={node.left == null}
          showFrequencies={showFrequencies}
        />
      </div>
    </div>
  );
};

const BinaryTree = ({ root, showFrequencies }) => {
  return (
    <div className={styles.BinaryTree}>
      <TreeNode
        node={root}
        showFrequencies={showFrequencies}
        doesParentHasBothChilds={
          root != null && root.left != null && root.right != null
        }
      />
    </div>
  );
};

export default BinaryTree;
