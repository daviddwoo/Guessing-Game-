//Guessing Game JS code

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100)
}

function shuffle(arr) {
    let m = arr.length, t, i;
    while(m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr
}

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber)
    }
    isLower() {
        return this.playersGuess < this.winningNumber
    }
    playersGuessSubmission(num) {
        if (num < 1 || num > 100 || !num) return 'That is an invalid guess.'
        else this.playersGuess = num;
        return this.checkGuess()
    }
    checkGuess() {
        if (this.playersGuess === this.winningNumber) return 'You Win!'
        if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.'
        } else {
            this.pastGuesses.push(this.playersGuess);
            if (this.pastGuesses.length > 4) return 'You Lose.'
            if (this.difference() < 10) return "You're burning up!"
            if (this.difference() < 25 && this.difference() >= 10) return "You're lukewarm."
            if (this.difference() < 50 && this.difference() >= 25) return "You're a bit chilly."
            if (this.difference() < 100 && this.difference() >= 50) return "You're ice cold!"
        }
    }
    provideHint() {
        return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()])
    }
}

function newGame() {
    return new Game()
}


//Event Listeners

let submit = document.getElementById('submitbutton');
let reset = document.getElementById('resetbutton');
let hint = document.getElementById('hintbutton');
let changeText = document.querySelector('h2');
let input = document.getElementById('submitguess');
let game = new Game();
let count = 1;

function getInputAndUpdate(inputElem) {
    let result = game.playersGuessSubmission(inputElem);
    if (!(result === 'You have already guessed that number.') && !(result === 'That is an invalid guess.') && !(result === undefined)) {
        document.getElementById(`guess${count++}`).innerHTML = inputElem
        changeText.innerHTML = result;
    }
    else changeText.innerHTML = result;
    input.value = '';
}

function getHintAndUpdate() {
    let result = game.provideHint();
    changeText.innerHTML = `The winning number is either ${result[0]}, ${result[1]}, or ${result[2]}`;
}

submit.addEventListener('click', function() {
    if (changeText.innerHTML === 'You Win!' || changeText.innerHTML === 'You Lose.') return
    let input = document.getElementById('submitguess').value
    getInputAndUpdate(+input);
})

hint.addEventListener('click', function() {
    if (changeText.innerHTML === 'You Win!' || changeText.innerHTML === 'You Lose.') return
    getHintAndUpdate();
})

reset.addEventListener('click', function() {
    game = newGame();
    window.location.reload();
})
