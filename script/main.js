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
var arraySize = 2 + Number(sizeSlider.value)*3;
var interval = 5;
var timeout;

main();

function main(){

    var sorter = bubbleSorter;
    var stats = ["O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"];

    algorithms ={
        //index: name, algorithm function, average cmplx, worst cmplx, space cmplx
        0: ["Bubble Sort", bubbleSorter, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        1: ["Insertion Sort", runInsertionSort, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        2: ["Selection Sort", runSelectionSort, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        3: ["Merge Sort", runMergeSort, "O(nlog(n))", "O(nlog(n))", "O(n)"],
        4: ["Quick Sort", runQuickSort, "O(nlog(n))", "O(n)","O(nlog(n))"],
        5: ["Heap Sort", runHeapSort, "O(nlog(n))", "O(nlog(n))", "O(1)"]
    };

    initArray(arraySize);

    for(let i = 0; i < 6; ++i){
        algoBtns[i].addEventListener("change", function(){
            sorter = algorithms[i][1];
            updateStats([algorithms[i][2], algorithms[i][3], algorithms[i][4]]);
        });
    }

    speedSlider.addEventListener("click", function(){
        interval = 21 - Number(speedSlider.value)/5;
    });

    arrayBtn.addEventListener("click", function(){
        initArray(arraySize);
    });

    sizeSlider.addEventListener("click", function(){
        arraySize = 1 + Number(sizeSlider.value)*3;
    });

    flipBtn.addEventListener("click", flipArray);

    runBtn.addEventListener("click", function(){
        runAnimation(sorter);
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
        div.style.height = (72*Math.random() + 5) + "%"
        barDiv.appendChild(div);
    } 

    bars = document.querySelectorAll(".bar");
}

function flipArray(){
    console.log(bars);
    for(let i = 0; i < bars.length/2 ; ++i){
       var temp = bars[i].style.height;
       bars[i].style.height = bars[bars.length - i - 1].style.height;
       bars[bars.length - i - 1].style.height = temp;
    } 
}

function runAnimation(sorter){
    if(running){
        finishAnimation();
    }
    else{
        running = true;
        runBtn.value = "Stop";
        disableButtons();
        animation = new Visualizer(sorter); 
        animation.runAnimation(); 
    }  
}

function finishAnimation(){
    running = false;
    runBtn.value = "Visualize!";
    enableButtons();
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

function bubbleSorter(array){
    var swaps = [];
    var len = array.length;
    for (let i = 0; i < len; ++i) {
        for (let j = 0; j < len; ++j) {
            if (array[j] > array[j + 1]) {
                swaps.push([j, j + 1]);
                var tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
    }
    return swaps;
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



class Visualizer{

    constructor(sortFunc){
        this.sortFunc = sortFunc;
        this.swaps = [];
    }

    runSort(){
        var array = [];
        for(var bar of bars){
            var str = bar.style.height;
            str = str.substr(0, str.length - 1);
            array.push(Number(str));
        }
        console.log(array);
        this.swaps = this.sortFunc(array);
    }

    runAnimation(){
        this.runSort();
        
        var i = 0;
        var swaps = this.swaps;
        var id = setInterval(doSwap, interval);

        function doSwap(){
            clearBarColors();
            if(i >= swaps.length || !running){
                clearBarColors();
                clearInterval(id);
                finishAnimation();
                return;
            }
            bars[swaps[i][0]].style.borderColor = "black";
            bars[swaps[i][1]].style.borderColor = "black";
            var temp = bars[swaps[i][1]].style.height;
            bars[swaps[i][1]].style.height = bars[swaps[i][0]].style.height;
            bars[swaps[i][0]].style.height = temp;
            i++;
            comparisonsText.textContent = "Comparisons: " + i; 
        }

        function clearBarColors(){
            for(var bar of bars){
                bar.style.borderColor = "rgba(0, 0, 255, 0.596)";
                bar.style.borderColor = "rgba(0, 0, 255, 0.596)";
            }
        }
    }
}

