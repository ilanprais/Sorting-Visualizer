class AnimationRunner{
    constructor(algorithmCollection, visualizer){
        this.algorithmCollection = algorithmCollection;
        this.visualizer = visualizer;
    }

    run(){
        this.visualizer.runAnimation(this.algorithmCollection.currentAlgorithm.sorter);
    }
}

class SortingVisulizer{

    constructor(interval){
        this.animations = [];
        this.array = [];
        this.interval = interval;
    }

    reset(){
        this.animations = [];
        this.array = [];
    }

    runAnimation(sorter){
        this.reset();
        if(running){
            finishAnimation();
            return;
        }

        running = true;
        runBtn.value = "Stop";
        runBtn.name = "stopBtn";
        ButtonManager.disableButtons();

        this.array = this.getNumberArray();

        sorter.sort(this.array, this.animations);

        var i = 0;
        var animations = this.animations;
        var id = setInterval(doFrame, this.interval);

        function doFrame(){
    
            clearColors();
            if(i >= animations.length || !running){
                clearColors();
                clearInterval(id);
                finishAnimation();
                return;
            }
            if(animations[i].compare){
                bars[animations[i].vals[0]].style.borderColor = "black";
                bars[animations[i].vals[1]].style.borderColor = "black";
            }
            if(animations[i].swap){
                bars[animations[i].vals[0]].style.borderColor = "black";
                bars[animations[i].vals[1]].style.borderColor = "black";
                var temp = bars[animations[i].vals[0]].style.height;
                bars[animations[i].vals[0]].style.height = this.bars[animations[i].vals[1]].style.height;
                bars[animations[i].vals[1]].style.height = temp;
            }
            if(animations[i].insert){
                bars[animations[i].vals[0]].style.borderColor = "black";
                bars[animations[i].vals[0]].style.height = animations[i].vals[1] + "%";
            }
    
            ++i;
            comparisonsText.textContent = "Comparisons: " + i; 
        }

        function finishAnimation(){
            running = false;
            runBtn.name = "runBtn";
            runBtn.value = "Visualize!";
            ButtonManager.enableButtons();
        }

        function clearColors(){
            for(var bar of bars){
                bar.style.borderColor = "rgba(0, 0, 255, 0.596)";
            }
        }
    }

    getNumberArray(){
        var array = [];
        for(var bar of bars){
            var str = bar.style.height;
            str = str.substr(0, str.length - 1);
            array.push(Number(str));
        }
        return array;
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