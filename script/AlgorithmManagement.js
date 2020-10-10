
class AlgorithmCollection{
    constructor(){
        this.algorithms = [];
        this.currentAlgorithm = this.algorithms[0];
    }

    addAlgorithm(algo){
        this.algorithms.push(algo);
    }
}

class SortingAlgorithm{
    constructor(name, sorter, averageCmplx, worstCmplx, spaceCmplx){
        this.name = name;
        this.sorter = sorter;
        this.averageCmplx = averageCmplx;
        this.worstCmplx = worstCmplx;
        this.spaceCmplx = spaceCmplx;
    }
}