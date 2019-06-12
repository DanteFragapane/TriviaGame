# TriviaGame
A trivia game making use of timeouts and intervals made for class

### About
This game is a basic aviation trivia game utilizing basic timeouts and intervals for timing. 

### How to Use and Modify the Game
##### Running the Game: 
Merely open up the HTML file in your favorite browser and play away!
##### Modifying the Game:
In order to modify the game to, for example, add your own questions, it's quite simple. Open the ``app.js`` file located in ``./assets/javascript`` and modify the section titled ``Questions Setup``.
Inside that section, create new variables, incrementing the number on the end, and inside the ``createView`` function call, put parameters in this order:
1. Question number
2. The question itself
3. Answers inside of an array
   - One of those answers *must* be suffixed by ``:answer`` to indicate which is the correct answer

After this, include those inside the ``questionArray`` array. The code will handle dynamically adding these questions to the page. 
Open the HTML, and see your handiwork in action!

For example: 
```javascript
const question10 = createView(10, 'What is my name?', ['Dante:answer', 'Luis', 'Kyle'])
const questionArray = [..., question10]
```