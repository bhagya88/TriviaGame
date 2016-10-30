$(document).ready(function(){

	//declare global variables
	var timeRemaining;
	var questionIntervalId;
		
	var correctAnswers;
	var wrongAnswers;

	// declare questions as an array of objects
	var questions = [{
					question:"Where is Taj Mahal?",
					answerIndex:1,
					options:["Pakistan","India","Tibet","Indonesia"],
					pic:"tajmahal.jpg",
					status:'not yet guessed'
					},
					{ 
					question:"What is the capital of Argentina?",
					answerIndex:0,
					options:["Buenos Aires","Lima","Rio","Trinidad"],
					pic:"buenos.jpg",
					status:'not yet guessed'},
					{
					question:"Mt Rainier is located in this state.",
					answerIndex:3,
					options:["Texas","Oregon","Montana","Washigton"],
					pic:"rainier.jpg",
					status:'not yet guessed'
					},
					{
					question:"2016 Olympics happened in this city.",
					answerIndex:3,
					options:["Beiging","Tokyo","Seoul","Rio"],
					pic:"rio.jpg",
					status:'not yet guessed'}
					];

	// stores all available  question objects
	var availableQuestions; 

	// sets values for variables
	function initializeQuiz(){

		// copy all questions into available questions
		availableQuestions = questions.slice();
		
		$('#timer').show();
	    correctAnswers = 0;
	    wrongAnswers = 0;
	    $('#msg1').html("");
	    $('#msg2').html("");

	}

	// starts the quiz by initializing variables and settting the current question
	function startQuiz(){
		$('#start').hide();	
	    initializeQuiz();	
		getQuestion();
	}

	// handles cleanup before restart and starts quiz
	function restartQuiz(){
		$('#result').hide();	
	    initializeQuiz();
	    getQuestion();	
	}

	// decrements timer and handles timeup
	function decrementTimer(){
		
		timeRemaining--;

		$('#timer').html("<p>Time remaining: "+timeRemaining+" sec."+"</p>");
		
		if(timeRemaining === 0 && questionIntervalId){
			console.log("Timeup");
			$('#msg1').html("Time is up!");
			$('#msg2').html("The correct answer is "+currentQuestion.options[currentQuestion.answerIndex]);
			
			$('#picture').attr("src","assets/images/"+currentQuestion.pic);
			getAnswer();
			return;
		}
	}

	// gets a random question from available questions and shows question page
	function getQuestion(){

			if(availableQuestions.length>0){
				// generate random number
				var randomNum = Math.floor(Math.random()*availableQuestions.length);
				// set current question
				currentQuestion = availableQuestions[randomNum];
								
				// show answer options on page
				$('.option').eq(0).html(currentQuestion.options[0]);
				$('.option').eq(1).html(currentQuestion.options[1]);
				$('.option').eq(2).html(currentQuestion.options[2]);
				$('.option').eq(3).html(currentQuestion.options[3]);
				
				// removes current question from available questions
				availableQuestions.splice(randomNum,1);

			
				$('#ques').html(currentQuestion.question);
				$('#answer').hide();
				$('#question').show();
				
				timeRemaining =10;
				questionIntervalId = setInterval(decrementTimer,1000);
			}else{
				getResult();
			}
	}
		
	// gets the answer page
	function getAnswer(){
	
		$('#question').hide();
		console.log("before show");
		$('#answer').show();
		$('#main').append($('#answer'));
		console.log("after show");
		clearInterval(questionIntervalId);
		setTimeout(getQuestion,5000);
		
	}

	// checks the answer selection by user is correct or not 
	function checkAndGetAnswer(){

		selectedOption=$(this).html();
		

		if(selectedOption === currentQuestion.options[currentQuestion.answerIndex]){
			console.log("you chose correct answer",selectedOption);
			$('#msg1').html("You got it!");
			$('#msg2').html("");
			correctAnswers++;
		}else{
			$('#msg1').html("Oops!");
			$('#msg2').html("The correct answer is "+ currentQuestion.options[currentQuestion.answerIndex]);
			console.log("you chose wrong answer",selectedOption);
			wrongAnswers++;
		}
		console.log(currentQuestion.pic);
		$('#picture').attr("src","assets/images/"+currentQuestion.pic);
		getAnswer();
	}

	// shows the result page
	function getResult(){

		var unanswered = questions.length-correctAnswers-wrongAnswers;
		console.log("inside result");
		$('#answer').hide();
		$('#result').show();
		$('#timer').hide();
		$('#main').append($('#result'));
		$('#result>p').html('<p>correct answers: '+correctAnswers+'</p><p>wrong answers: '+wrongAnswers+'</p><p>Unanswered: '+unanswered+'</p');
	}



	console.log(questions);

	// hides question page, answer page and result page 
	$('#question').hide();
	$('#answer').hide();
	$('#result').hide();
	$('#timer').hide();
	
	$('#btnStart').click(startQuiz);
	$('#options').on('click','.option',checkAndGetAnswer);
	$('#btnRestart').click(restartQuiz);
});