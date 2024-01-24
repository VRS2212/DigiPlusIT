const treeContainer = document.getElementById("tree");
const nodeTypeSelect = document.getElementById("nodeType");
const nodeDataInput = document.getElementById("nodeData");
const addChildButton = document.getElementById("addChildButton");
const addParentButton = document.getElementById("addParentButton");
const addSingleButton = document.getElementById("addSingleButton");

let tree = [];

function createNode(data) {
  return {
    data,
    children: [],
  };
}

function renderTree(tree, parent = null) {
  tree.forEach((node) => {
    const li = document.createElement("li");
    li.textContent = node.data;
    if (parent) {
      parent.appendChild(li);
    } else {
      treeContainer.appendChild(li);
    }
    const ul = document.createElement("ul");
    li.appendChild(ul);
    if (node.children.length > 0) {
      renderTree(node.children, ul);
    }
  });
}

function addChildNode(parentData) {
  const parentNode = tree.find((node) => node.data === parentData);
  if (parentNode) {
    const childData = nodeDataInput.value;
    parentNode.children.push(createNode(childData));
    renderTree(tree);
    nodeDataInput.value = "";
  } else {
    alert("Parent node not found.");
  }
}

function addParentNode(childData) {
  const childNode = tree.find((node) => node.data === childData);
  if (childNode) {
    const parentData = nodeDataInput.value;
    const parentNode = createNode(parentData);
    parentNode.children.push(childNode);
    tree = tree.filter((node) => node.data !== childData);
    tree.push(parentNode);
    renderTree(tree);
    nodeDataInput.value = "";
  } else {
    alert("Child node not found.");
  }
}

function addSingleNode() {
  const data = nodeDataInput.value;
  tree.push(createNode(data));
  renderTree(tree);
  nodeDataInput.value = "";
}

addChildButton.addEventListener("click", () => {
  addChildNode(tree[0].data); // Initially add child to the root node
});

addParentButton.addEventListener("click", () => {
  addParentNode(tree[0].data); // Initially add parent to the root node
});

addSingleButton.addEventListener("click", addSingleNode);

// Initial tree structure
tree.push(createNode("Root"));
renderTree(tree);
