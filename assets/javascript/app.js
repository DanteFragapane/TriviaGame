// Defining variables
let correct = 0
let wrong = 0
let currentQuestion = 0
let maxTime = 30 // Maximum amount of seconds given to answer a question
let timer = maxTime // Actual timer count

// Creating the question view
const createView = function createView(number = 0, question = '', options = ['']) {
  let div = $('<div>', {
    class: 'question'
  })
  div.append($('<h1>', {
    text: 'Question ' + number
  }))
  div.append($('<h3>', {
    text: question
  }))
  for (let i = 0; i < options.length; i++) {
    let option = options[i]
    if (option.match(/:answer/)) {
      option = option.replace(':answer', '')
      div.append($('<input>', {
        type: 'radio',
        text: option,
        class: 'answerOption answer ',
        name: number,
        value: i
      }))
    } else {
      div.append($('<input>', {
        type: 'radio',
        text: option,
        class: 'answerOption ',
        name: number,
        value: i
      }))
    }
  }
  return div
}

// Start timer for question
const startTimer = function startTimer(seconds = maxTime) {
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

const updateTimer = function updateTimer(seconds = timer) {
  $('#timer').html(seconds + ' seconds left')
}

// Stops the timer and the timeout
const stopTimer = function stopTimer([counter, timeout]) {
  clearInterval(counter)
  clearTimeout(timeout)
  timer = maxTime
}

// Settinng up the questions
// ``createView`` takes three parameters: a question number, a title, the question, and an array of answer choices, with one needing a ':answer' suffix,
// to program the answer in
const question1 = createView(1, 'What is this?', ['True:answer', 'False'])
const question2 = createView(2, 'What is that?', ['True', 'False:answer'])
const question3 = createView(3, 'What is the fifth busies airport in the U.S. based on passenger enplanement?', ['JFK:answer', 'LAX', 'ORD', 'ATL'])
const question4 = createView(4)

// Creating an array with the questions inside
const questionArray = [question1, question2, question3, question4]

$('#questions').append(questionArray)

// let [counter, timeout] = startTimer()
// $('#question').on('click', '.answerOption', function (event) {
//   stopTimer([counter, timeout])
//   const classArray = $(this).attr('class').split(' ') // Get an array of classes for the clicked button
//   console.log(classArray)
//   if (classArray.includes('answer')) { // Checking if the clicked button is the answer
//     correct = correct + 1
//   } else wrong = wrong + 1
// }