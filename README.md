# Sorting Visualizer Web Application

## Overview
Sorting algorithms are very useful and interseting to explore. I decided to develop a web application which animates sorting algorithms and visualizes the sorting
proccess of each algorithm, for a better view and understanding of many different *sorting algorithms*. 

The user has 6 algorithms of choice:
- *Bubble Sort*
- *Insertion Sort*
- *Selection Sort*
- *Merge Sort*
- *Quick Sort*
- *Heap Sort*

After choosing the algorithm, the user can make adjustment to other features such as the **array size**, **orientation**, and **animation speed**, and when the
**Visualize!** button is pressed, the animation is executed.


**Visit At**  https://ilanprais.github.io/Sorting-Visualizer/

## The Code Design
The web application was written in *html*, *CSS*, and *JavaScript* (no plugins).
The JavaScript was used for reading the settings (algorithms, array size, animation speed, etc.) 
, for setting the sorting algorithm, generating the right array, and setting the Animation Runner to the right speed.

Each sorting algorithm was written in a seperate *Sorter* class (BubbleSorter, MergeSorter, etc.) containing a *sort* method, which 
sorts a standard number array, but adds all the array changes to an *animations* array which will be used later in the *Visualizer* to animate the changes in
real time.

The *Visulizer* class is responsible for visulizing a given sorting algorithm. it recieves an algorithm, calls *sort(number array, animations)*, and uses the *animations*
array which just got filled to animate the array changes on the bars that are the screen (*Strategy* DP). In this way, additional sorting algorithms can be implemented in the future, or even a different visualization of the algorithm can be added, with very minor changes to the code.


*Visit the website at*:
https://ilanprais.github.io/Sorting-Visualizer/
