# TriviaGame

### Overview
It is a fun triva quizz where the user gets to answer timed questions.The theme for this game is `Geography`.

### Demo
[Click Here to Watch the Demo](https://powerful-crag-56077.herokuapp.com)

### Technologies used
* Javascript, JQuery
* HTML5, CSS3 and Bootstrap. 

### Challenges faced
* How to make timed questions?
* How to swith between questions page, answer page and results page?

### Solutions found
* setTimer and setInterval functions helped solve the problem.
* JQuery DOM manipulations functions helped to switch between screens.

### How it works

* When the player starts the game, he is presented with a timed question(10 seconds). The player answers it or his time runs out.

* If the player selects the correct answer, it shows a screen congratulating him for choosing the right option. After 10 seconds, displays the next question -- it does this without any user input.

* The scenario is similar for wrong answers and time-outs.
  * If the player runs out of time, it tells the player that time's up and displays the correct answer. After waiting for 5 seconds, it shows the next question.
  * If the player chooses the wrong answer, it tells the player that he selected the wrong option and then displays the correct answer. After waiting for 5 seconds, it shows the next question.

* When questions are over, it shows the results screen which gives the summary of correct answers, incorrect answers, and  unanswered questions. After waiting for a 5 seconds, player is given an option to restart the game (without reloading the page).

#### Developed by Bhagya

