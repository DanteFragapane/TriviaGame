// Defining variables
let correct = 0
let wrong = 0
let currentQuestion = 0
let maxTime = 30 // Maximum amount of seconds given to answer a question
let timer = maxTime // Actual timer count

// Creating the question view
const createView = function createView (title = '', question = '', options = ['']) {
  let div = $('<div>', {
    class: 'question'
  })
  div.append($('<h1>', {
    text: title
  }))
  div.append($('<h3>', {
    text: question
  }))
  options.forEach(option => {
    if (option.match(/:answer/)) {
      option = option.replace(':answer', '')
      div.append($('<button>', {
        text: option,
        class: 'answerOption answer'
      }))
    } else {
      div.append($('<button>', {
        text: option,
        class: 'answerOption'
      }))
    }
  })
  return div
}

const updateView = function updateView (question = createView) {
  updateTimer(maxTime)
  $('#question').html(question)
}

// Start timer for question
const startTimer = function startTimer (seconds = maxTime) {
  updateTimer(maxTime)
  let counter = setInterval(function () {
    updateTimer(--timer)
  }, 1000)
  let timeout = setTimeout(function () {
    clearInterval(counter)
    updateTimer(maxTime)
  }, maxTime * 1000)
  return [counter, timeout]
}

const updateTimer = function updateTimer (seconds = timer) {
  $('#timer').html(seconds + ' seconds left')
}

// Stops the timer and the timeout
const stopTimer = function stopTimer ([counter, timeout]) {
  clearInterval(counter)
  clearTimeout(timeout)
  timer = maxTime
}

// Advance to next question, return that question
const nextQuestion = function nextQuestion (questionArray = [], currentQuestion = 0) {
  currentQuestion = currentQuestion + 1
  updateView(questionArray[currentQuestion])
  startTimer(maxTime)
}

// This will actually run the game
const questionTime = function () {
  let [counter, timeout] = startTimer()
  $('#question').on('click', '.answerOption', function (event) {
    stopTimer([counter, timeout])
    const classArray = $(this).attr('class').split(' ') // Get an array of classes for the clicked button
    console.log(classArray)
    if (classArray.includes('answer')) { // Checking if the clicked button is the answer
      correct = correct + 1
    } else wrong = wrong + 1

    question = nextQuestion(questionArray, currentQuestion)
  })
}
// Setting up the questions
let question = createView // Create a temporary question variable equal to a default question view

// ``createView`` takes three parameters, a title, the question, and an array of answer choices, with one needing a ':answer' suffix,
// to program the answer in
const question1 = createView('Question 1', 'What is this?', ['True:answer', 'False'])
question = question1 // Set the first question as the active question
const question2 = createView('Question 2', 'What is that?', ['True', 'False:answer'])

// Creating an array with the questions inside
const questionArray = [question1, question2]

updateView(question)

// Game logic
questionTime()
