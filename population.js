function Population() {
    this.populationArr = [];
    this.gridLen = sqrt(width);

    this.getPatientZero = function() {
        this.populationArr[floor(random(this.gridLen))][floor(random(this.gridLen))].state = 'i';
    }

    this.initPopulation = function() {
        for (let i = 0; i < this.gridLen; i++) {
            this.populationArr[i] = [];
            for (let ii = 0; ii < this.gridLen; ii++) {
                this.populationArr[i].push(new Individual(i, ii));
            }
        }

        this.getPatientZero();
    }

    this.updatePopulation = function() {
        for (let i = 0; i < this.populationArr.length; i++) {
            for (let ii = 0; ii < this.populationArr[0].length; ii++) {
                this.populationArr[i][ii].update(this.populationArr);
            }
        }
    }
}