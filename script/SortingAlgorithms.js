class BubbleSorter{
    sort(array, animations){
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
}

class InsertionSorter{
    sort(array, animations){
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
}

class SelectionSorter{
    sort(array, animations){
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
}

class MergeSorter{
    sort(array, animations){
        return this.mergeSort(array, animations, 0);
    }
    
    mergeSort(array, animations, startIdx){
        if (array.length <= 1){
            return array;
        }
        var mid = Math.floor(array.length / 2),
            left = this.mergeSort(array.slice(0, mid), animations, startIdx),
            right = this.mergeSort(array.slice(mid), animations, startIdx + mid);
    
        return this.merge(left, right, startIdx, startIdx + mid, animations);
    }
    
    merge(arr1, arr2, startIdxL, startIdxR, animations){
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
}

class QuickSorter{

    sort(array, animations){
        return this.quicksort(array, 0, array.length - 1, animations);
    }
    
    quicksort(arr, low, high, animations){
        if (low < high){ 
                var pi = this.partition(arr, low, high, animations); 
      
                this.quicksort(arr, low, pi - 1, animations); 
                this.quicksort(arr, pi + 1, high, animations); 
        } 
    
        return arr;
    }
    
    partition(arr, low, high, animations){ 
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
}

class HeapSorter{
    sort(array, animations){
        return this.heapSort(array, animations);
    }
    
    heapSort(arr, animations){   
        var n = arr.length; 
        var i = Math.floor(n / 2 - 1);
        var k = n - 1;
    
        while(i >= 0) {
            this.heapify(arr, n, i, animations); 
            --i;
        }
    
        while (k >= 0){ 
            animations.push(new AnimationInfo([0, k], false, true, false));
            var temp = arr[0]; 
            arr[0] = arr[k]; 
            arr[k] = temp; 
    
            this.heapify(arr, k, 0, animations); 
            --k;
        } 
    
        return arr;
    }
    
    heapify(arr, n, i, animations){
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
      
                this.heapify(arr, n, largest, animations); 
            } 
    
            return arr;
    }
}