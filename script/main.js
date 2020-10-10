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
var interval = 4;

main();

function main(){

    var sorter = bubbleSorter;

    algorithms ={
        //index: name, algorithm function, average cmplx, worst cmplx, space cmplx
        0: ["Bubble Sort", bubbleSorter, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        1: ["Insertion Sort", insertionSorter, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        2: ["Selection Sort", selectionSorter, "O(n" + "2".sup() + ")", "O(n" + "2".sup() + ")", "O(1)"],
        3: ["Merge Sort", mergeSorter, "O(nlog(n))", "O(nlog(n))", "O(n)"],
        4: ["Quick Sort", quickSorter, "O(nlog(n))", "O(n" + "2".sup() + ")","O(nlog(n))"],
        5: ["Heap Sort", heapSorter, "O(nlog(n))", "O(nlog(n))", "O(1)"]
    };

    initArray(arraySize);

    for(let i = 0; i < 6; ++i){
        algoBtns[i].addEventListener("change", function(){
            sorter = algorithms[i][1];
            updateStats([algorithms[i][2], algorithms[i][3], algorithms[i][4]]);
        });
    }

    speedSlider.addEventListener("click", function(){
        interval = (1 - Number(speedSlider.value)/100);
        interval = (4 + 100*interval)*50/(sizeSlider.value + 1);
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
        runBtn.name = "stopBtn";
        disableButtons();
        animation = new Visualizer(sorter); 
        animation.runAnimation(); 
    }  
}

function finishAnimation(){
    running = false;
    runBtn.name = "runBtn";
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

function bubbleSorter(array, animations){
    var len = array.length;
    for (let i = 0; i < len; ++i) {
        for (let j = 0; j < len - i - 1; ++j) {
            var curAnim = new AnimationInfo([j, j+1], true, true, false);
            if (array[j] > array[j + 1]) {
                var tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }else{
                curAnim.swap = false;
            }
            animations.push(curAnim);
        }
    }
    return array;
}

function insertionSorter(array, animations){
    for (let i = 1; i < array.length;  ++i) { 
        var key = array[i]; 
        var j = i - 1; 
        while (j >= 0 && array[j] > key) { 
            animations.push(new AnimationInfo([j + 1, array[j]], false, false, true));
            array[j + 1] = array[j]; 
            j = j - 1; 
        } 
        animations.push(new AnimationInfo([j + 1, key], false, false, true));
        array[j + 1] = key; 
    } 
    return array;
}

function selectionSorter(array, animations){
    for (let i = 0; i < array.length - 1; ++i){ 
        var min_idx = i; 
        for (let j = i + 1; j < array.length ; ++j) {
            animations.push(new AnimationInfo([min_idx, j], true, false, false));
            if (array[j] < array[min_idx]){
                min_idx = j; 
            }
        }
        animations.push(new AnimationInfo([min_idx, i], true, true, false));
        var temp = array[min_idx]; 
        array[min_idx] = array[i]; 
        array[i] = temp; 
    }
    return array;
}

function mergeSorter(array, animations){
    return mergeSort(array, animations, 0);
}

function mergeSort(array, animations, startIdx){
    if (array.length <= 1){
        return array;
    }
    var mid = Math.floor(array.length / 2),
        left = mergeSort(array.slice(0, mid), animations, startIdx),
        right = mergeSort(array.slice(mid), animations, startIdx + mid);

    return merge(left, right, startIdx, startIdx + mid, animations);
}

function merge(arr1, arr2, startIdxL, startIdxR, animations){
    var sorted = [];

    var i = startIdxL;
    var j = startIdxR;
    var at = startIdxL;
    while (arr1.length && arr2.length) {
        animations.push(new AnimationInfo([i, j], true, false, false));
        if (arr1[0] < arr2[0]){
            animations.push(new AnimationInfo([at, arr1[0]], false, false, true));
            sorted.push(arr1.shift());
            i++;
        } 
        else{
            animations.push(new AnimationInfo([at, arr2[0]], false, false, true));
            sorted.push(arr2.shift());
            j++;
        } 
        at++;
    }

    while(arr1.length){
        animations.push(new AnimationInfo([at, arr1[0]], false, false, true));
        sorted.push(arr1.shift());
        at++;
    } 

    while(arr2.length){
        animations.push(new AnimationInfo([at, arr2[0]], false, false, true));
        sorted.push(arr2.shift());
        at++;
    }

    return sorted.concat(arr1.slice().concat(arr2.slice()));
}



function quickSorter(array, animations){
    return quicksort(array, 0, array.length - 1, animations);
}

function quicksort(arr, low, high, animations){
    if (low < high){ 
            var pi = partition(arr, low, high, animations); 
  
            quicksort(arr, low, pi - 1, animations); 
            quicksort(arr, pi + 1, high, animations); 
    } 

    return arr;
}

function partition(arr, low, high, animations){ 
        var pivot = arr[high];  
        var i = (low - 1); 

        for (let j = low; j < high; ++j){ 
            animations.push(new AnimationInfo([j, high], true, false, false));
            if (arr[j] < pivot){ 
                i++; 
                var temp = arr[i]; 
                arr[i] = arr[j]; 
                arr[j] = temp; 
                animations.push(new AnimationInfo([i, j], false, true, false));
            } 
        } 

        animations.push(new AnimationInfo([i + 1, high], false, true, false));
        var temp = arr[i + 1]; 
        arr[i + 1] = arr[high]; 
        arr[high] = temp; 
  
        return i+1; 
    } 

function heapSorter(array, animations){
    return heapSort(array, animations);
}

function heapSort(arr, animations){   
    var n = arr.length; 
    var i = Math.floor(n / 2 - 1);
    var k = n - 1;

    while(i >= 0) {
        heapify(arr, n, i, animations); 
        --i;
    }

    while (k >= 0){ 
        animations.push(new AnimationInfo([0, k], false, true, false));
        var temp = arr[0]; 
        arr[0] = arr[k]; 
        arr[k] = temp; 

        heapify(arr, k, 0, animations); 
        --k;
    } 

    return arr;
}

function heapify(arr, n, i, animations){
        var largest = i; 
        var l = 2*i + 1; 
        var r = 2*i + 2; 
  
        if (l < n && arr[l] > arr[largest]) {
            largest = l; 
        }
  
        if (r < n && arr[r] > arr[largest]){
            largest = r; 
        }
  
        if (largest != i){ 
            animations.push(new AnimationInfo([i, largest], true, true, false));
            var swap = arr[i]; 
            arr[i] = arr[largest]; 
            arr[largest] = swap; 
  
            heapify(arr, n, largest, animations); 
        } 

        return arr;
}



class Visualizer{

    constructor(sortFunc){
        this.sortFunc = sortFunc;
        this.animations = [];
    }

    runSort(){
        var array = [];
        for(var bar of bars){
            var str = bar.style.height;
            str = str.substr(0, str.length - 1);
            array.push(Number(str));
        }
        this.sortFunc(array, this.animations);
    }

    runAnimation(){
        this.runSort();
        
        var i = 0;
        var animations = this.animations;
        var id = setInterval(doFrame, interval);

        function doFrame(){

            clearBarColors();
            if(i >= animations.length || !running){
                clearBarColors();
                clearInterval(id);
                finishAnimation();
                return;
            }
            if(animations[i].compare){
                bars[animations[i].vals[0]].style.borderColor = "black";
                bars[animations[i].vals[1]].style.borderColor = "black";
            }
            if(animations[i].swap){
                bars[animations[i].vals[0]].style.borderColor = "green";
                bars[animations[i].vals[1]].style.borderColor = "green";
                var temp = bars[animations[i].vals[0]].style.height;
                bars[animations[i].vals[0]].style.height = bars[animations[i].vals[1]].style.height;
                bars[animations[i].vals[1]].style.height = temp;
            }
            if(animations[i].insert){
                bars[animations[i].vals[0]].style.borderColor = "black";
                bars[animations[i].vals[0]].style.height = animations[i].vals[1] + "%";
            }
            i++;
            comparisonsText.textContent = "Comparisons: " + i; 
        }

        function clearBarColors(){
            for(var bar of bars){
                bar.style.borderColor = "rgba(0, 0, 255, 0.596)";
            }
        }
    }
}

class AnimationInfo{
    constructor(vals, compare, swap, insert){
        this.vals = vals; //[x, y]
        this.compare = compare;
        this.swap = swap;
        this.insert = insert;
    }
}

// class BubbleSorter{
//     sort(array, animations){

//     }
// }

// class InsertionSorter{
//     sort(array, animations){
        
//     }
// }

// class SelectionSorter{
//     sort(array, animations){
        
//     }
// }

// class MergeSorter{
//     sort(array, animations){
        
//     }
// }

// class QuickSorter{
//     sort(array, animations){
        
//     }
// }

// class HeapSorter{
//     sort(array, animations){
        
//     }
// }

// class SortingVisulizer{
//     constructor(sorter){
//         this.sorter = sorter;
//         this.animations = [];
//         this.a
//     }

//     runAnimation(){

//     }

// }
