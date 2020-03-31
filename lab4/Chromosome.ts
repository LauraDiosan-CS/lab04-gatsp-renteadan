
import Graph from './Graph';

function shuffle(n: number): number[] {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }

  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

class Chromosome {
  size: number;
  representation: number[];
  fitness: number;
  constructor(size: number) {
    this.size = size;
    this.representation = shuffle(size);
    this.fitness = 0;
  }

  crossover(other: Chromosome): Chromosome {
    let pos1 = Math.floor(Math.random() * this.size);
    let new_rep = [];
    new_rep = new_rep.concat(this.representation.slice(0, pos1));
    other.representation.forEach(num => {
      if(!new_rep.includes(num))
        new_rep.push(num);
    });
    let new_chromosome = new Chromosome(this.size);
    new_chromosome.representation = new_rep;
    return new_chromosome;
  }

  mutation() {
    if(Math.random() < 0.8)
      return;
    let pos1 = Math.floor(Math.random() * this.size);
    let pos2 = Math.floor(Math.random() * this.size);
    [this.representation[pos1], this.representation[pos2]] = [this.representation[pos2], this.representation[pos1]];
  }
}

function modifyChromosome(chr: Chromosome, gr: Graph) {
  chr.fitness = -gr.calculateLength(chr.representation);
  chr.mutation();
  return chr.fitness;
}

function fact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

function calculateGenerations(gr: Graph) {
  let ch1 = new Chromosome(gr.size);
  let ch2 = new Chromosome(gr.size);
  ch1.fitness = -gr.calculateLength(ch1.representation);
  ch2.fitness = -gr.calculateLength(ch2.representation);
  let initialFitness = -Infinity;
  let currentFitness = 0;
  let unchanged = 0;
  let generation = 0;
  const rate = fact(gr.size);
  while(unchanged < rate) {
    generation++;
    if(ch1.fitness > ch2.fitness) {
      ch2 = ch1.crossover(ch2);
      currentFitness = modifyChromosome(ch2, gr);
    } else {
      ch1 = ch2.crossover(ch1);
      currentFitness = modifyChromosome(ch1, gr);
    }
    if(currentFitness > initialFitness) {
      initialFitness = currentFitness;
      unchanged = 0;
    } else {
      unchanged++;
    }
  }
  return {final: ch1.fitness > ch2.fitness ? ch1: ch2, generation};
}

function main() {
  var gr = new Graph();
  // gr.readFile('files/easy_03_tsp.txt');
  // gr.readFile('files/medium_01_tsp.txt');
  gr.readFile('files/hard_01_tsp.txt');
  let {final, generation} = calculateGenerations(gr);
  console.log(final, generation);
}

main();