import axios from "axios";

export default class NodeService {
  getTreeTableNodes() {
    //return axios.get("data/treetablenodes.json").then((res) => res.data.root);
    return axios
      .get(process.env.VUE_APP_ROOT_API + "/legislacoes")
      .then((res) => setKey(res.data));
  }
}

function setKey(nodes) {
  function update(nodes) {
    return nodes.reduce((_key, node) => {
      if (node.children) {
        var sub_key = update(node.children);
        node.key = node.key = node.data.id;
        return sub_key;
      }

      if (node.data) node.key = node.data.id;
      return _key;
    }, 0);
  }

  update(nodes);
  return nodes;
}
