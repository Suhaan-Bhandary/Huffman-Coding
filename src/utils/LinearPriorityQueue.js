class PriorityNode {
  constructor(node) {
    this.node = node;
    this.next = null;
  }
}

class LinearPriorityQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  // insert
  insert(node) {
    // Create a node with new value
    let element = new PriorityNode(node);

    // console.log(this.head, this.tail, this.count);

    if (this.count === 0) {
      // If the Priority Queue is empty
      this.head = element;
      this.tail = element;
    } else if (node.frequency < this.head.node.frequency) {
      // value is less than the head
      element.next = this.head;
      this.head = element;
    } else if (node.frequency >= this.tail.node.frequency) {
      // Value is greater than the tail
      this.tail.next = element;
      this.tail = element;
    } else {
      // value is between the head and tail
      let pre = null,
        curr = this.head;
      while (curr != null && node.frequency >= curr.node.frequency) {
        pre = curr;
        curr = curr.next;
      }

      // Now make the linkage of the node
      pre.next = element;
      element.next = curr;
    }

    this.count++;
  }

  // delete
  delete() {
    if(this.head == null) return null;

    let temp = this.head;
    if(this.head.next == null) this.tail = null;
    this.head = this.head.next;
    this.count--;
    return temp.node;
  }

  // size
  size() {
    return this.count;
  }
}


export default LinearPriorityQueue;