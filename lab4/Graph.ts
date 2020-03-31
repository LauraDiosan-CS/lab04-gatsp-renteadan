
const fs = require('fs');
import Edge from './Edge';
export default class Graph {
  edgeList: {[start: number]: Edge[]};
  constructor() {
    this.edgeList = {};
  }

  addEdge(edge: Edge) {
    if(this.edgeList[edge.start])
      return this.edgeList[edge.start].push(edge);
    this.edgeList[edge.start] = [edge];
  }

  getWeight(start, end) {
    let weight = 0;
    this.edgeList[start].some(edge => {
      if(edge.end === end) {
        weight = edge.weight;
        return true;
      }
    });
    return weight;
  }

  calculateLength(nodes: number[]) {
    let length = 0;
    let current = nodes.shift();
    let initial = current;
    nodes.map(node => {
      length+= this.getWeight(current, node);
      current = node;
    });
    length+= this.getWeight(current, initial);
    nodes.unshift(initial);
    return length;
  }

  get size(): number {
    return Object.keys(this.edgeList).length;
  }

  readFile(filename) {
    const file = fs.readFileSync(filename, 'utf-8');
    const rows = file.split('\n');
    rows.forEach((row, index: number) => {
      row.split(' ').forEach((cell, cellIndex: number) => {
        if(cell === '0')
          return;
        const edge = new Edge(index, cellIndex, +cell);
        this.addEdge(edge);
      });
    });
  }
}

