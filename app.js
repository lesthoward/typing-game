const $word =  document.querySelector('.game__word');
const $inputWord = document.querySelector('.game__input');
const $time = document.querySelector('#time');
const $score = document.querySelector('#score');
const $selectDifficulty = document.querySelector('.game__select');
const uniqueWord = [
    'fast',
    'beautiful',
    'move',
    'keep',
    'developer',
    'design',
    'keyboard',
    'worry',
    'run',
    'expert',
    'hire',
    'work',
    'difficulty'
]


class Game {
    constructor() {
        if(!Game.instance) {
            this.out = 0
            this.inputWord;
            this.selectedWord;
            this.time = 2
            this.score = 0
            this.difficulty = 'medium'
            Game.instance = this
        } else {
            return Game.instance
        }
    }

    setWord() {
        $inputWord.focus()
        this.selectedWord = uniqueWord[Math.floor(Math.random() * uniqueWord.length)]

        $word.innerHTML = this.selectedWord.charAt(0).toUpperCase() + this.selectedWord.substring(1)
    }

    setInputWord (inputWord) {
        this.inputWord = inputWord
    }

    setDifficulty(selectValue) {
        this.difficulty = selectValue
    }

    checkScores() {
        if(this.inputWord === this.selectedWord) {
            switch(this.difficulty) {
                case 'easy':
                    this.time += 3
                    break;
                case 'medium':
                    this.time += 1
                    break;
                case 'hard':
                    this.time += .5
                    break;
                default:
                    break
            }
            this.sumScore()
            this.setWord()
            $inputWord.value = ''
        }
    }

    sumScore() {
        this.score += 1
        $score.innerHTML = this.score
    }

    substringTime() {
        this.out += 1
        const total = this.time - this.out
        $time.innerHTML = total + 's'

        
        if(total === 0) {
            return true
        }
    }
}


class UI {
    printScores (time, score) {
        $time.innerHTML = time + 's'
        $score.innerHTML = score
    }

    endGame(endGame) {
        if(endGame) {
            const gameOverScreen = document.querySelector('.game__over');
            gameOverScreen.style.display = 'flex'

            const btnPlayAgain = gameOverScreen.querySelector('.gameover__again')
            btnPlayAgain.addEventListener('click', () => location.reload())
        }
    }
}

const game = new Game()
const ui = new UI()
let initialIntervalState = 0


EventListeners ()
function EventListeners () {
    game.setWord()
    const {time, score} = game
    ui.printScores(time, score)
}


$selectDifficulty.addEventListener('change', e => {
    game.setDifficulty(e.target.value)
})



$inputWord.addEventListener('input', (e) => {
    const inputWord = e.target.value
    game.setInputWord(inputWord)
    game.checkScores()  
    
    // Limit only once to function "setGameInterval"
    initialIntervalState += 1
    setGameInterval()
})



function setGameInterval () {
    // While initialIntervalState is lower than 1
    if(initialIntervalState === 1) {
        setInterval(() => {
            const ednGameState = game.substringTime()
            console.log('file: app.js ~ line 141 ~ setInterval ~ ednGameState', ednGameState)
            ui.endGame(ednGameState)
        }, 1000);
    }
}




