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
var running = false;
var arraySize = arraySize = 2 + Number(sizeSlider.value)*3;;

main();

function main(){

    var run = runBubbleSort;
    var stats = ["O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"];

    algorithms ={
        //index: name, algorithm function, average cmplx, worst cmplx, space cmplx
        0: ["Bubble Sort", runBubbleSort, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        1: ["Insertion Sort", runInsertionSort, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        2: ["Selection Sort", runSelectionSort, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        3: ["Merge Sort", runMergeSort, "O(nlog(n))", "O(nlog(n))", "O(n)"],
        4: ["Quick Sort", runQuickSort, "O(nlog(n))", "O(n)","O(nlog(n))"],
        5: ["Heap Sort", runHeapSort, "O(nlog(n))", "O(nlog(n))", "O(1)"]
    };

    initArray(arraySize);

    for(let i = 0; i < 6; ++i){
        algoBtns[i].addEventListener("change", function(){
            run = algorithms[i][1];
            updateStats([algorithms[i][2], algorithms[i][3], algorithms[i][4]]);
        });
    }

    arrayBtn.addEventListener("click", function(){
        initArray(arraySize);
    });

    sizeSlider.addEventListener("click", function(){
        arraySize = 2 + Number(sizeSlider.value)*3;
    });

    flipBtn.addEventListener("click", flipArray);

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

function flipArray(){
    var bars = document.getElementsByClassName("bar");
    console.log(bars);
    for(let i = 0; i < bars.length/2 ; ++i){
       var temp = bars[i].style.marginLeft;
       bars[i].style.marginLeft = bars[bars.length - i - 1].style.marginLeft;
       bars[bars.length - i - 1].style.marginLeft = temp;
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
    complexityText.innerHTML = "Average Time Complexity: " + cmplx[0];
    wcomplexityText.innerHTML = "Worst Case Time Complexity: " + cmplx[1];
    scomplexityText.innerHTML = "Space Complexity: " + cmplx[2];
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

