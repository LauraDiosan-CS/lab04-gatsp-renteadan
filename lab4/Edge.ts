
export default class Edge {
  weight: number;
  start: number;
  end: number;

  constructor(start: number, end: number, weight: number) {
    this.start = start;
    this.end= end;
    this.weight = weight;
  }
}