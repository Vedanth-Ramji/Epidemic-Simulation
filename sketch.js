let population;

function setup() {
    createCanvas(400, 400);
    population = new Population();
    population.initPopulation();
}

function draw() {
    background(0);
    population.updatePopulation();
}