class ArrayManager{

    static initArray(amount){

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
    
    static flipArray(){
        for(let i = 0; i < bars.length/2 ; ++i){
           var temp = bars[i].style.height;
           bars[i].style.height = bars[bars.length - i - 1].style.height;
           bars[bars.length - i - 1].style.height = temp;
        } 
    }
}

class StatsManager{
    static updateStats(cmplx){
        complexityText.innerHTML = "Average Time Complexity: " + cmplx[0];
        wcomplexityText.innerHTML = "Worst Case Time Complexity: " + cmplx[1];
        scomplexityText.innerHTML = "Space Complexity: " + cmplx[2];
    }
}

class ButtonManager{

    static disableButtons(){
        for(var opt of algoBtns){
            opt.disabled = true;
        }
        arrayBtn.disabled = true;
        flipBtn.disabled = true;
        speedSlider.disabled = true;
        sizeSlider.disabled = true;
    }
    
    static enableButtons(){
        for(var opt of algoBtns){
            opt.disabled = false;
        }
        arrayBtn.disabled = false;
        flipBtn.disabled = false;
        speedSlider.disabled = false;
        sizeSlider.disabled = false;
    }
}
