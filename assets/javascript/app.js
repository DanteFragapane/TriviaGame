// Defining variables
let correct = 0
let wrong = 0
let currentQuestion = 0
let maxTime = 30 // Maximum amount of seconds given to answer a question
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
const submitForm = function submitForm(inputs, counter, timeout) {
  clearInterval(counter)
  clearTimeout(timeout)
  updateTimer(0)

  console.log(inputs)

  
}
// =======================================
// =======================================

// Settinng up the questions
// ``createView`` takes three parameters: a question number, a title, the question, and an array of answer choices, with one needing a ':answer' suffix,
// to program the answer in
const question1 = createView(1, 'What is this?', ['True:answer', 'False'])
const question2 = createView(2, 'What is that?', ['True', 'False:answer'])
const question3 = createView(3, 'What is the fifth busies airport in the U.S. based on passenger enplanement?', ['JFK:answer', 'LAX', 'ORD', 'ATL'])
const question4 = createView(4, 'What is the oldest continuous airport in operation in the United States?', ['KCLE', 'CYYZ', 'KCGS:answer'])

// Creating an array with the questions inside
const questionArray = [question1, question2, question3, question4]
const form = $('<form>')
const submit = $('<button>', {
  id: 'submit',
  text: 'Submit Answers'
})
form.append(questionArray, submit)
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
  if (!submitted) submitForm()
}, maxTime * 1000)

// On submitting the form
$('#questions').on('submit', 'form', function (event) {
  event.preventDefault()
  let inputs = $('input:checked')
  submitForm(inputs, counter, timeout)
})