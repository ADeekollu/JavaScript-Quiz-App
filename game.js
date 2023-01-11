const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Who won the World Cup in 2022?',
        choice1: 'Argentina',
        choice2: 'France',
        choice3: 'England',        
        choice4: 'Brazil',
        answer: 1,
    },
    {
        question: 'Who won the NCCA Football National Title in 2022?',
        choice1: 'TCU',
        choice2: 'Georgia',
        choice3: 'OSU',        
        choice4: 'Clemson',
        answer: 2,
    },
    {
        question: 'Who won the Baseball World Series in 2022?',
        choice1: 'Phillies',
        choice2: 'Giants',
        choice3: 'Astros',        
        choice4: 'Yankees',
        answer: 3,
    },
    {
        question: 'Who won the Stanley Cup in 2022?',
        choice1: 'Maple Leafs',
        choice2: 'Blue Jackets',
        choice3: 'Lightning',        
        choice4: 'Avalanche',
        answer: 4,
    }    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        })


    }, 1000)
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()