let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById("messageArea")
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }


};

let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,

    ships: [
        {locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]}],


    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];  //Для каждого корабля
            let index = ship.locations.indexOf(guess);
            /*Массивы поддерживают метод indexOf,
            сходный с методом indexOf строк. Метод
            indexOf получает значение и возвращает
            индекс значения, если оно присутствует
            в массиве, или –1, если оно отсутствует.*/
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Попадение!");
                if (this.isSunk(ship)) {
                    view.displayMessage("Вы затопили мой военный корабль!");
                    this.shipsSunk++;
                }
                return true;

            }

        }
        view.displayMiss(guess);
        view.displayMessage("Промах!");
        return false;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
        console.log("Ships array: ");
        console.log(this.ships);
    },

    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) {
            row = (Math.floor(Math.random() * this.boardSize));
            col = (Math.floor(Math.random() * (this.boardSize - this.shipLength)));

        } else {
            row = (Math.floor(Math.random() * (this.boardSize - this.shipLength)));
            col = (Math.floor(Math.random() * this.boardSize));

        }
        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function(locations) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i]
            for (let j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

let controller = {
    guesses: 0,
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("Вы затопили все мои военные корабли!<br>" + "Колличество выстрелов: " + this.guesses)
            }

        }

    }

}

function parseGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Вводите координаты игрового поля! Например: D3");
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Неверные координаты!")
        } else if (row < 0 || row >= model.boardSize ||
            column < 0 || column >= model.boardSize) {
            alert("За пределами игрового поля!");
        } else {
            return row + column;
        }

    }
    return null;
}

function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();

}

function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }

}

window.onload = init;









