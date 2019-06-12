// Defining variables
let correct = 0
let wrong = 0
let currentQuestion = 0
let maxTime = 30 // Maximum amount of seconds given to answer a question
let timer = maxTime // Actual timer count
let submitted = false

const createQuestion = function createQuestion(number, question, options) {
  return {
    qNumber: number,
    question: question,
    options: options
  }
}

// Creating the question view
const createView = function createView(question) {
  let div = $('<div>', {
    class: 'question'
  })
  div.append($('<h1>', {
    text: 'Question ' + question.qNumber
  }))
  div.append($('<h3>', {
    text: question
  }))
  for (let i = 0; i < question.options.length; i++) {
    let option = question.options[i]
    if (option.match(/:answer/)) {
      option = option.replace(':answer', '')
      div.append($('<input>', {
        type: 'radio',
        text: option,
        class: 'answerOption answer ',
        name: question.qNumber,
        value: i
      }))
    } else {
      div.append($('<input>', {
        type: 'radio',
        text: option,
        class: 'answerOption ',
        name: question.qNumber,
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

const updateTimer = function updateTimer(seconds = timer) {
  if (seconds === 0) $('#timer').html('Time is Up!')
  else $('#timer').html(seconds + ' seconds left')
}

const submitForm = function submitForm(iputs, counter, timeout) {
  clearInterval(counter)
  clearTimeout(timeout)
  updateTimer(0)

  console.log(iputs)
}

// Settinng up the questions
// ``createView`` takes three parameters: a question number, a title, the question, and an array of answer choices, with one needing a ':answer' suffix,
// to program the answer in
const question1 = createQuestion(1, 'What is this?', ['True:answer', 'False'])
console.log(question1)
const q1View = createView(question1)
const question2 = createView(2, 'What is that?', ['True', 'False:answer'])
const question3 = createView(3, 'What is the fifth busies airport in the U.S. based on passenger enplanement?', ['JFK:answer', 'LAX', 'ORD', 'ATL'])
const question4 = createView(4)

// Creating an array with the questions inside
const questionArray = [q1View]//, q2View, q3View, q4View]
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

$('#questions').on('submit', 'form', function (event) {
  event.preventDefault()
  let inputs = $(this) //.serialize()
  submitForm(inputs, counter, timeout)
})