import styles from "./BinaryTree.module.css";

const TreeNode = ({ node, isLeftLonelyNode, isRightLonelyNode }) => {
  // * If the Node is a null node
  if (node == null) return <></>;

  // * If both the childrens are not present
  if (node.left == null && node.right == null) {
    return (
      <div
        className={`${
          isLeftLonelyNode || isRightLonelyNode ? "" : styles.node
        } ${isLeftLonelyNode ? styles.lonelyNodeLeft : ""} ${
          isRightLonelyNode ? styles.lonelyNodeRight : ""
        }`}
      >
        <div className={`${styles.node__element} ${node.value === -1 ? "" : styles.leafNodes}`}>
          {node.value === -1 ? " " : node.value}
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
      <div className={`${styles.node__element} ${node.value === -1 ? "" : styles.leafNodes}`}>
        {node.value === -1 ? " " : node.value}
      </div>
      <div className={styles.node__bottom_line}></div>

      <div className={styles.node__children}>
        <TreeNode
          node={node.left}
          isLeftLonelyNode={node.right == null}
          isRightLonelyNode={false}
        />
        <TreeNode
          node={node.right}
          isLeftLonelyNode={false}
          isRightLonelyNode={node.left == null}
        />
      </div>
    </div>
  );
};

const BinaryTree = ({ root }) => {
  return (
    <div className={styles.BinaryTree}>
      <TreeNode
        node={root}
        doesParentHasBothChilds={
          root != null && root.left != null && root.right != null
        }
      />
    </div>
  );
};

export default BinaryTree;
