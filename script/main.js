var runBtn = document.getElementById("runBtn");
var speedSlider = document.getElementById("spdBtn");
var algoBtns = document.querySelectorAll(".radio");
var sizeSlider = document.getElementById("sizeBtn");
var arrayBtn = document.getElementById("arrayBtn");
var flipBtn = document.getElementById("flipBtn");
var complexityText = document.getElementById("complexity");
var wcomplexityText = document.getElementById("wcomplexity");
var scomplexityText = document.getElementById("scomplexity");
var comparisonsText = document.getElementById("comparisons");
var barDiv = document.querySelector(".bars");
var bars = document.querySelectorAll(".bar");
var running = false;
var baseInterval = 5;
var arraySize = 2 + Number(sizeSlider.value)*3;

main();

function main(){

    var sorterCollection = new AlgorithmCollection();
    sorterCollection.addAlgorithm(new SortingAlgorithm("Bubble Sort", new BubbleSorter(), "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"));
    sorterCollection.addAlgorithm(new SortingAlgorithm("Insertion Sort", new InsertionSorter(), "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"));
    sorterCollection.addAlgorithm(new SortingAlgorithm("Selection Sort", new SelectionSorter(), "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"));
    sorterCollection.addAlgorithm(new SortingAlgorithm("Merge Sort", new MergeSorter(), "O(nlog(n))", "O(nlog(n))", "O(n)"));
    sorterCollection.addAlgorithm(new SortingAlgorithm("Quick Sort", new QuickSorter(), "O(nlog(n))", "O(n" + "2".sup() + ")","O(nlog(n))"));
    sorterCollection.addAlgorithm(new SortingAlgorithm("Heap Sort", new HeapSorter(), "O(nlog(n))", "O(nlog(n))", "O(1)"));
    sorterCollection.currentAlgorithm = sorterCollection.algorithms[0];

    ArrayManager.initArray(arraySize);

    var visualizer = new SortingVisulizer(baseInterval);
    var runner = new AnimationRunner(sorterCollection, visualizer);


    for(let i = 0; i < sorterCollection.algorithms.length; ++i){
        algoBtns[i].addEventListener("change", function(){
            var cur = sorterCollection.algorithms[i];
            sorterCollection.currentAlgorithm = cur;
            StatsManager.updateStats([cur.averageCmplx, cur.worstCmplx, cur.spaceCmplx]);
        });
    }

    speedSlider.addEventListener("click", function(){
        visualizer.interval = getSpeed(speedSlider.value, sizeSlider.value);
    });

    arrayBtn.addEventListener("click", function(){
        ArrayManager.initArray(arraySize);
    });

    sizeSlider.addEventListener("click", function(){
        arraySize = 1 + Number(sizeSlider.value)*3;
        visualizer.interval = getSpeed(speedSlider.value, sizeSlider.value);

    });

    flipBtn.addEventListener("click",  ArrayManager.flipArray);

    runBtn.addEventListener("click", function(){
        runner.run();
    });

    return 0;
}

function getSpeed(speedSldr, sizeSldr){
    var temp = (1 - Number(speedSldr)/100);
    return (4 + 100*temp)*50/(sizeSldr + 1);
}