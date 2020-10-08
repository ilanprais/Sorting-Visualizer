var runBtn = document.getElementById("runBtn");
var speedSlider = document.getElementById("spdBtn");
var algoBtns = document.querySelectorAll(".radio");
var sizeSlider = document.getElementById("sizeBtn");
var arrayBtn = document.getElementById("arrayBtn");
var flipBtn = document.getElementById("flipBtn");
var complexityText = document.getElementById("complexity");
var comparisonsText = document.getElementById("comparisons");
var barDiv = document.querySelector(".bars");
var running = false;

main();

function main(){

    var run = runBubbleSort;
    var stats = "O(n<sup>2</sup>)";

    algorithms ={
        0: ["Bubble Sort", runBubbleSort, "O(n" + "2".sup() + ")"],
        1: ["Insertion Sort", runInsertionSort, "O(n" + "2".sup() + ")"],
        2: ["Selection Sort", runSelectionSort, "O(n" + "2".sup() + ")"],
        3: ["Merge Sort", runMergeSort, "O(nlog(n))"],
        4: ["Quick Sort", runQuickSort, "O(nlog(n))"],
        5: ["Heap Sort", runHeapSort, "O(nlog(n))"],
    };

    initArray(30);

    for(let i = 0; i < 5; ++i){
        algoBtns[i].addEventListener("change", function(){
            run = algorithms[i][1];
            updateStats(algorithms[i][2]);
        });
    }

    arrayBtn.addEventListener("click", function(){
        initArray(30);
    });

    runBtn.addEventListener("click", function(){
        runAnimation(run, stats);
    });

    return 0;
}

function initArray(amount){

    var width= 40/amount;

    barDiv.innerHTML = "";

    for(let i = 0; i < amount; ++i){
        var div = document.createElement("div");
        div.className = "bar";
        var marginStr = width*1.85*i + "vw";
        div.style.marginLeft = marginStr;
        div.style.borderLeft = width + "vw rgba(0, 0, 255, 0.596) solid";
        div.style.height = Math.floor(72*Math.random() + 5) + "%"
        barDiv.appendChild(div);
    } 
}

function runAnimation(run){
    if(running){
        running = false;
        runBtn.value = "Visualize!";
    }
    else{
        running = true;
        runBtn.value = "Stop";
        disableButtons();
        run();   
        setTimeout(() => {

            running = false;
            runBtn.value = "Visualize!";
            enableButtons()

        }, 4000);

    }  
}

function updateStats(cmplx){
    complexityText.innerHTML= "Average Time Complexity: " + cmplx;
}

function disableButtons(){
    for(opt of algoBtns){
        opt.disabled = true;
    }
    arrayBtn.disabled = true;
    flipBtn.disabled = true;
    speedSlider.disabled = true;
    sizeSlider.disabled = true;
}

function enableButtons(){
    for(opt of algoBtns){
        opt.disabled = false;
    }
    arrayBtn.disabled = false;
    flipBtn.disabled = false;
    speedSlider.disabled = false;
    sizeSlider.disabled = false;
}

function runBubbleSort(){
    console.log("in bubble");
}

function runInsertionSort(){
    console.log("in insertion");
}

function runSelectionSort(){
    console.log("in selection");
}

function runMergeSort(){
    console.log("in merge");
}

function runQuickSort(){
    console.log("in quick");
}

function runHeapSort(){
    console.log("in heap");
}

