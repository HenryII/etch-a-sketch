"use strict";
const containerSize = 960;
let squareNum = 16;
let squareColorArray = [];
const gridLines = document.querySelector('#gridLines');
const container = document.querySelector('.gridContainer');
const createGridBtn = document.querySelector('.createGridBtn');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('.close');
const squareNumInput = document.querySelector('#squareNumInput');

createGridBtn.addEventListener('click', displayModal);

gridLines.addEventListener('click', () => {
    if (!gridLines.checked) {
        clearGridLines();
    } else {
        reinstateGridLines();
    }
});

createGrid(squareNum);

function displayModal() {
    modal.showModal();
    squareNumInput.focus();
    modal.addEventListener('submit', (e) => {
        squareNum = parseInt(squareNumInput.value)
        console.log('sqN:', squareNum);
        if (squareNum > 100) {squareNum = 100;}
        clearGrid();
        createGrid(squareNum);
    });
}

function createGrid(squareNum) {
    const squareSize = containerSize / squareNum;
    for (let i = 1; i <= squareNum * squareNum; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('squares');
        squareDiv.setAttribute('id',`${i}`);
        squareDiv.style.cssText = `width: ${squareSize}px; height: ${squareSize}px;  background-color: inherit; flex: 0 0 ${squareSize};`;
        container.appendChild(squareDiv);
        if (!gridLines.checked) {
            squareDiv.style.border = 'none';
        } else {
            squareDiv.style.border = '0.5px solid black';
        }
        squareDiv.addEventListener('mouseover', changeColor);
    }
}

function clearGrid() {
    container.innerHTML = '';
}

function clearGridLines(squareNum) {
    let allSquares = container.querySelectorAll('.squares');
    let squareArray = [...allSquares];
    squareArray.forEach((square) => {
        square.style.border = 'none';
    });  
}

function reinstateGridLines(squareNum) {
    let allSquares = container.querySelectorAll('.squares');
    let squareArray = [...allSquares];
    squareArray.forEach((square) => {
        square.style.border = '0.5px solid black';
    });  
}

function changeColor(e) {
    const sqNum = parseInt(this.id);// Location of the square in the grid
    const colorIndex = sqNum - 1; // Location of the corresponding color values in array(zero based)
    let red = 0;
    let green = 0;
    let blue = 0;
    if (squareColorArray[colorIndex]) { // Square already has a color value previously stored
        // Stores values that's lower on each pass, which means the color becomes darker each time
        // until its totally black
        squareColorArray[colorIndex][0] -= 25;
        squareColorArray[colorIndex][1] -= 25;
        squareColorArray[colorIndex][2] -= 25;
        if (squareColorArray[colorIndex][0] < 0) squareColorArray[colorIndex][0] = 0;
        if (squareColorArray[colorIndex][1] < 0) squareColorArray[colorIndex][1] = 0;
        if (squareColorArray[colorIndex][2] < 0) squareColorArray[colorIndex][2] = 0;
        
        red = squareColorArray[colorIndex][0];
        green = squareColorArray[colorIndex][1];
        blue = squareColorArray[colorIndex][2];
    } else {                               // No value stored - store the value in the array
        red = Math.floor(Math.random() * 255);
        green = Math.floor(Math.random() * 255);
        blue = Math.floor(Math.random() * 255);
        squareColorArray[colorIndex] = [red, green, blue];
    }
    // e.target.style.backgroundColor = 'black';
    this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`; 
}

