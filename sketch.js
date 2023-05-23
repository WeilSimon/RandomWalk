let length = 600;
let numSteps = 14;
// let positions = new Array(numSteps*2 + 1);
let positions = new Array(numSteps + 1);
let positionsCopy = new Array(numSteps * 2 + 1);
let numSimulations = 10000000;
let max = 0;
let min = 0;
let step = 0;
let maxStep = 0;

function setup() {
    createCanvas(length + 1, length + 1).parent("center");
    console.log(positions)
    initPositions();
};

function draw() {
    background(255);
    renderSquares();
    renderDescriptor();
};

function drawGrid(){
    stroke(0)
    strokeWeight(3)
    line(length/2, 0, length/2, length);
    line(0, length/2, length, length/2);
    strokeWeight(1)
    for(let i = length/2; i <= length; i += (length/((numSteps*2)+1))){
        line(i, 0, i, length);
        line(0, i, length, i);
        line(length-i, 0, length-i, length);
        line(0, length-i, length, length-i);
    }
}

function initPositions(){
    step = 0;
    max = numSimulations;
    min = 0;
    for(let stepNum = 0; stepNum < positions.length; stepNum += 1){
        positions[stepNum] = new Array(numSteps*2 + 1);
        for(let i = 0; i < ((numSteps*2)+1); i += 1){
            positions[stepNum][i] = new Array(numSteps*2 + 1);
            if(stepNum == 0) positionsCopy[i] = new Array(numSteps * 2 + 1);
            for(let j = 0; j < ((numSteps*2)+1); j += 1){
                if(i === (numSteps) && j === (numSteps)){
                    positions[stepNum][i][j] = numSimulations;
                }
                else{
                    positions[stepNum][i][j] = 0;
                }
                if(stepNum == 0) positionsCopy[i][j] = 0;
            }
        }
    }
    calculateStep();
    
}

function clearPosCopy(){
    max = 0;
    min = numSimulations;
    for(let i = 0; i < positionsCopy.length; i += 1){
        for(let j = 0; j < positionsCopy[0].length; j += 1){
            max = Math.max(positionsCopy[i][j], max);
            if(positionsCopy[i][j] > 0)min = Math.min(positionsCopy[i][j], min)
            // min = Math.min(positionsCopy[i][j], min);
            positions[maxStep][i][j] = positionsCopy[i][j];
            positionsCopy[i][j] = 0;

        }
    }
}

function calculateStep(){
    if(maxStep < numSteps){
        for(let i = 0; i < positions[0].length; i += 1){
            for(let j = 0; j < positions[0][0].length; j += 1){
                if(positions[maxStep][i][j] !== 0){
                    for(let num = 0; num < positions[maxStep][i][j]; num += 1){
                        let rand = Math.floor(Math.random()*4);
                        if (rand === 0) positionsCopy[i][j+1] += 1;
                        else if (rand === 1) positionsCopy[i][j-1] += 1;
                        else if (rand === 2) positionsCopy[i+1][j] += 1;
                        else positionsCopy[i-1][j] += 1; 
                    }
                }
            }
        }
        maxStep += 1;
        clearPosCopy();
        calculateStep();
    }
}

function nextStep(){
    if(step < maxStep){
        step += 1;
    }
}



function renderSquares(){
    colorMode(HSL);
    for(let i = 0; i < positions[0].length; i += 1){
        for(let j = 0; j < positions[0][0].length; j += 1){
            if(Math.abs(i-(numSteps)) + Math.abs(j-(numSteps)) > step)fill(0, 0, 95);
            else if((step%2==0) == (Math.abs(i-(numSteps))%2 != Math.abs(j-(numSteps))%2))fill(0, 0, 80);
            else if(positions[step][i][j] == 0) fill(120, 95, 51);
            else fill(120 - Math.log10(positions[step][i][j])/Math.log10(max) * 120, 95, 51);
            rect(i*(length/(numSteps*2 + 1)), j*(length/(numSteps*2 + 1)), length/(numSteps*2 + 1), length/(numSteps*2 + 1))
        }
    }
}

function renderDescriptor(){
    document.querySelector("#stepNum").innerHTML = "Step Number: " + step;
    if(mouseX < length && mouseY < length && mouseX > 0 && mouseY > 0){
        let tile = positions[step][Math.floor(mouseX/(length/(numSteps*2+1)))][Math.floor(mouseY/(length/(numSteps*2+1)))];
        document.querySelector("#descriptor").innerHTML = tile + " out of " + numSimulations + " for a total of " + (tile/numSimulations * 100).toFixed(3) + "%";

    }
}

