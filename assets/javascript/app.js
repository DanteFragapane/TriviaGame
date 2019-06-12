// Defining variables
let correct = 0
let wrong = 0
let currentQuestion = 0
let maxTime = 60 // Maximum amount of seconds given to answer a question
let timer = maxTime // Actual timer count
let submitted = false

// =======================================
// Functions
// =======================================

// Creating the question view
const createView = function createView(qNumber, question, options) {
  let div = $('<div>', {
    class: 'question'
  })
  div.append($('<h2>', {
    text: 'Question ' + qNumber
  }))
  div.append($('<h4>', {
    text: question
  }))
  for (let i = 0; i < options.length; i++) {
    let option = options[i]
    if (option.match(/:answer/)) {
      option = option.replace(':answer', '')
      div.append($('<input>', {
        type: 'radio',
        text: option,
        class: 'answerOption answer',
        name: qNumber,
        value: i
      }))
    } else {
      div.append($('<input>', {
        type: 'radio',
        text: option,
        class: 'answerOption',
        name: qNumber,
        value: i
      }))
    }
    div.append($('<text>', {
      text: option
    }))
    div.append($('<br>'))
  }
  return div
}

// Update the timer's text
const updateTimer = function updateTimer(seconds = timer) {
  if (seconds === 0) $('#timer').html('Time is Up!')
  else $('#timer').html(seconds + ' seconds left')
}

// Function to handle the submitted form's data
const submitForm = function submitForm(counter, timeout) {
  clearInterval(counter)
  clearTimeout(timeout)
  updateTimer(0)

  let inputs = $('input:checked')
  console.log(inputs)

  // Loop through the inputs and find the inputs with the 'answer' class
  for (let i = 0; i < inputs.length; i++) {
    let answer = $(inputs[i])
    if (answer.attr('class').match(/ answer/g)) {
      correct = correct + 1
    }
  }
  wrong = questionArray.length - correct

  displayResults(correct, wrong)
}

// Show the results of the trivia!
const displayResults = function displayResults(correct, wrong) {
  $('#trivia').html('')

  let resultsDiv = $('<div>')
  resultsDiv.append($('<h1>', {
    text: 'Final Scores:'
  }))
  resultsDiv.append($('<h3>', {
    text: 'Correct: ' + correct
  }))
  resultsDiv.append($('<h3>', {
    text: 'Wrong: ' + wrong
  }))

  $('#trivia').append(resultsDiv)
}
// =======================================

// =======================================
// Question Setup
// =======================================

// Settinng up the questions
// ``createView`` takes three parameters: a question number, a title, the question, and an array of answer choices, with one needing a ':answer' suffix,
// to program the answer in
const question1 = createView(1, 'What year did commercial jet service begin?', ['1952:answer', '1953', '1950', '1951'])
const question2 = createView(2, 'How many engines did the Howard Hughes H‐4 Hercules, a.k.a. The Spruce Goose, have?', ['10', '8:answer', '2', '4'])
const question3 = createView(3, 'What is the fifth busies airport in the U.S. based on passenger enplanement?', ['JFK:answer', 'LAX', 'ORD', 'ATL'])
const question4 = createView(4, 'What is the oldest continuous airport in operation in the United States?', ['KCLE', 'CYYZ', 'KCGS:answer'])

// Creating an array with the questions inside
const questionArray = [question1, question2, question3, question4]

// Creating the form itself and buttons, and appending it to the ``#questions`` div
const form = $('<form>')
const submit = $('<button>', {
  id: 'submit',
  text: 'Submit Answers'
})
form.append(questionArray, $('<br>'), submit)
$('#questions').append(form)

// =======================================
// Game logic
// =======================================

// Start the game
updateTimer(maxTime)
let counter = setInterval(function () {
  updateTimer(--timer)
}, 1000)
let timeout = setTimeout(function () {
  clearInterval(counter)
  updateTimer(0)
  submitForm(counter, timeout)
}, maxTime * 1000)

// On submitting the form
$('#questions').on('submit', 'form', function (event) {
  event.preventDefault()
  submitForm(counter, timeout)
})
// =======================================
