function Individual(i, ii) {
    this.i = i;
    this.ii = ii;
    this.side = 20;

    this.state = 's';
    this.infectionPotential = random();
    this.recoveryPotential = 1 - this.infectionPotential;
    this.lifetime = 1000;

    this.getCol = function() {
        // Setting the color for the individual based on the individual's state
        switch (this.state) {
            case 'i':
                fill('red');
                break;
            case 'r':
                fill('grey');
                break;
            case 'd':
                fill('black');
                break;
            default:
                fill('green');
        }
    }

    this.render = function() {
        this.getCol();
        rect(this.ii * this.side, this.i * this.side, this.side, this.side);
    }

    this.getNeighbours = function(populationArr) {
        // Handling edge cases
        if (this.i === 0 && this.ii === 0) {
            return [populationArr[0][1], populationArr[1][0], populationArr[1][1]];
        }

        if (this.i === 0 && this.ii === populationArr[0].length - 1) {
            return [populationArr[0][18], populationArr[1][18], populationArr[1][19]];
        }

        if (this.i === populationArr.length - 1 && this.ii === 0) {
            return [populationArr[18][0], populationArr[18][1], populationArr[19][1]];
        }

        if (this.i === populationArr.length - 1 && this.ii === populationArr[0].length - 1) {
            return [populationArr[19][18], populationArr[18][18], populationArr[18][19]];
        }

        if (this.i === 0) {
            return [
                populationArr[this.i][this.ii - 1],
                populationArr[this.i][this.ii + 1],
                populationArr[this.i + 1][this.ii - 1],
                populationArr[this.i + 1][this.ii],
                populationArr[this.i + 1][this.ii + 1]
            ];
        }

        if (this.i === populationArr.length - 1) {
            return [
                populationArr[this.i - 1][this.ii - 1],
                populationArr[this.i - 1][this.ii],
                populationArr[this.i - 1][this.ii + 1],
                populationArr[this.i][this.ii - 1],
                populationArr[this.i][this.ii + 1]
            ];
        }

        if (this.ii === 0) {
            return [
                populationArr[this.i - 1][this.ii],
                populationArr[this.i + 1][this.ii],
                populationArr[this.i - 1][this.ii + 1],
                populationArr[this.i][this.ii + 1],
                populationArr[this.i + 1][this.ii + 1]
            ];
        }

        if (this.ii === populationArr.length - 1) {
            return [
                populationArr[this.i - 1][this.ii],
                populationArr[this.i + 1][this.ii],
                populationArr[this.i - 1][this.ii - 1],
                populationArr[this.i][this.ii - 1],
                populationArr[this.i + 1][this.ii - 1]
            ];
        }

        return [
            populationArr[this.i - 1][this.ii - 1],
            populationArr[this.i - 1][this.ii],
            populationArr[this.i - 1][this.ii + 1],
            populationArr[this.i][this.ii - 1],
            populationArr[this.i][this.ii + 1],
            populationArr[this.i + 1][this.ii - 1],
            populationArr[this.i + 1][this.ii],
            populationArr[this.i + 1][this.ii + 1]
        ];
    }

    this.infectNeighbours = function(populationArr) {
        if (this.state !== 'i') {
            return;
        }

        let neighbours = this.getNeighbours(populationArr);
        let susceptibleNeighbours = neighbours.filter((neighbour) => {
            if (neighbour.state === 's') {
                return neighbour;
            }
        });

        if (random() < this.infectionPotential && susceptibleNeighbours.length > 0) {
            susceptibleNeighbours[floor(random(susceptibleNeighbours.length))].state = 'i';
        }
    }

    this.tryRecovery = function() {
        if (this.state === 'i' && random() < this.recoveryPotential) {
            this.state = 'r';
        }
    }

    this.tryDeath = function() {
        if (this.state !== 'i') {
            return;
        }

        this.lifetime -= 50;

        if (this.lifetime <= 0) {
            this.state = 'd';
        }
    }

    this.update = function(populationArr) {
        this.render();
        this.infectNeighbours(populationArr);
        this.tryRecovery();
        this.tryDeath();
    }
}