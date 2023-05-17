let length = 600;
let numSteps = 10;
let positions = new Array(numSteps*2 + 1);
let positionsCopy = new Array(numSteps * 2 + 1);
let numSimulations = 10000000;
let max = 0;
let min = 0;
let step = 0;

function setup() {
    createCanvas(length + 1, length + 1);
    console.log(positions)
    initPositions();
    // console.log(positions);
};

function draw() {
    background(255);
    renderSquares();
    renderDescriptor();
    // drawGrid();


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
    for(let i = 0; i < ((numSteps*2)+1); i += 1){
        positions[i] = new Array(numSteps*2 + 1);
        positionsCopy[i] = new Array(numSteps * 2 + 1);
        for(let j = 0; j < ((numSteps*2)+1); j += 1){
            if(i === (numSteps) && j === (numSteps)){
                positions[i][j] = numSimulations;
            }
            else{
                positions[i][j] = 0;
            }
            positionsCopy[i][j] = 0;
        }
    }
}

function clearPosCopy(){
    max = 0;
    min = numSimulations;
    for(let i = 0; i < positionsCopy.length; i += 1){
        for(let j = 0; j < positionsCopy[0].length; j += 1){
            max = Math.max(positionsCopy[i][j], max);
            if(positionsCopy[i][j] > 0)min = Math.min(positionsCopy[i][j], min)
            // min = Math.min(positionsCopy[i][j], min);
            positions[i][j] = positionsCopy[i][j];
            positionsCopy[i][j] = 0;

        }
    }
}

function calculateStep(){
    step += 1;
    for(let i = 0; i < positions.length; i += 1){
        for(let j = 0; j < positions[0].length; j += 1){
            if(positions[i][j] !== 0){
                for(let num = 0; num < positions[i][j]; num += 1){
                    let rand = Math.floor(Math.random()*4);
                    if (rand === 0) positionsCopy[i][j+1] += 1;
                    else if (rand === 1) positionsCopy[i][j-1] += 1;
                    else if (rand === 2) positionsCopy[i+1][j] += 1;
                    else positionsCopy[i-1][j] += 1; 
                }
            }
        }
    }
    clearPosCopy();
    console.log(positions);
}

function renderSquares(){
    for(let i = 0; i < positions.length; i += 1){
        for(let j = 0; j < positions[0].length; j += 1){
            // fill(i*255/positions.length, j*255/positions.length, 0);
            // fill()
            // fill(255 - (255/Math.log10(max)*Math.log10(positions[i][j])));
            // fill((255/Math.log10(max)*Math.log10(positions[i][j])), (255/Math.log10(max)*Math.log10(positions[i][j])), (255/Math.log10(max)*Math.log10(positions[i][j])));
            if(Math.abs(i-(numSteps)) + Math.abs(j-(numSteps)) > step)fill(56, 242, 108);
            else if((step%2==0) == (Math.abs(i-(numSteps))%2 != Math.abs(j-(numSteps))%2))fill(255, 255, 0);
            // else fill(255-(255/Math.log10(max)*Math.log10(positions[i][j])), (255/Math.log10(max)*Math.log10(positions[i][j])), -(255/Math.log10(max)*Math.log10(positions[i][j])));
            // else fill(255/(Math.log10(max) - Math.log10(min))*(Math.log10(positions[i][j])-Math.log10(min)))
            else fill(255*Math.log10(positions[i][j])/Math.log10(max))
            rect(i*(length/(numSteps*2 + 1)), j*(length/(numSteps*2 + 1)), length/(numSteps*2 + 1), length/(numSteps*2 + 1))
        }
    }
}

function renderDescriptor(){
    // console.log(mouseX + " " + mouseY)
    document.querySelector("#stepNum").innerHTML = "Step Number: " + step;
    if(mouseX < length && mouseY < length && mouseX > 0 && mouseY > 0){
        let tile = positions[Math.floor(mouseX/(length/(numSteps*2+1)))][Math.floor(mouseY/(length/(numSteps*2+1)))];
        document.querySelector("#descriptor").innerHTML = tile + " out of " + numSimulations + " for a total of " + (tile/numSimulations * 100).toFixed(3) + "%";

    }
    // console.log(positions[mouseX%(length/(numSteps*2+1))][mouseY%(length/(numSteps*2+1))]);
}

