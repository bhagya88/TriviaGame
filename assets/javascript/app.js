$(document).ready(function(){
	var timeRemaining;
	var questionIntervalId;
		
	var correctAnswers;
	var wrongAnswers;

	var currentQuestionIndex;
	var currentAnswer;

	var questions = [{
					question:"Where is Taj Mahal?",
					answerIndex:1,
					options:["Pakistan","India","Tibet","Indonesia"],
					pic:"tajmahal.jpg"
					},
					{ 
					question:"What is the capital of Argentina?",
					answerIndex:0,
					options:["Buenos Aires","Lima","Rio","Trinidad"],
					pic:"rio.jpg"},
					{
					question:"Mt Rainier is located in this state.",
					answerIndex:2,
					options:["Texas","Oregon","Montana","Washigton"],
					pic:"rainier.jpg"},
					{
					question:"2016 Olympics happened in this city.",
					answerIndex:3,
					options:["Beiging","Tokyo","Seoul","Rio"],
					pic:"rio.jpg"}
					];
	var q = [];


	function initializeQuiz(){
		for(var i = 0; i<questions.length; i++){
			q.push(i);
		}
		$('#timer').show();
	    correctAnswers = 0;
	    wrongAnswers = 0;
	    $('#msg1').html("");
	    $('#msg2').html("");

	}

	

	function startQuiz(){
		$('#start').hide();	
	    initializeQuiz();	
		getQuestion();
	}

	function restartQuiz(){
		$('#result').hide();	
	    initializeQuiz();
	    getQuestion();	
	}

	function decrementTimer(){
		
		timeRemaining--;

		$('#timer').html("<p>Time remaining: "+timeRemaining+" sec."+"</p>");
		console.log("inside decrement timer");
		if(timeRemaining === 0 && questionIntervalId){
			console.log("Timeup");
			$('#msg1').html("Time is up!");
			$('#msg2').html("The correct answer is "+currentAnswer);
			console.log(questions[currentQuestionIndex].pic);
			$('#picture').attr("src","assets/images/"+questions[currentQuestionIndex].pic);
			getAnswer();
			return;
		}
	}

	function getQuestion(){

			if(q.length>0){

				var randomNum = Math.floor(Math.random()*q.length);
				currentQuestionIndex = q[randomNum];

				console.log("Random number",randomNum);
				var currentQuestion=questions[currentQuestionIndex].question;
				currentAnswer = questions[currentQuestionIndex].options[questions[currentQuestionIndex].answerIndex];
				
				$('.option').eq(0).html(questions[currentQuestionIndex].options[0]);
				$('.option').eq(1).html(questions[currentQuestionIndex].options[1]);
				$('.option').eq(2).html(questions[currentQuestionIndex].options[2]);
				$('.option').eq(3).html(questions[currentQuestionIndex].options[3]);
				
				q.splice(randomNum,1);
				console.log("arr",q);
				$('#ques').html(currentQuestion);
				$('#answer').hide();
				$('#question').show();
				
				timeRemaining =3;
				questionIntervalId = setInterval(decrementTimer,1000);
			}else{
				getResult();
			}
	}
		

	function getAnswer(){

	
		$('#question').hide();
		console.log("before show");
		$('#answer').show();
		$('#main').append($('#answer'));
		console.log("after show");
		clearInterval(questionIntervalId);
		setTimeout(getQuestion,2000);
		
	}

	function checkAndGetAnswer(){

		selectedOption=$(this).html();
		

		if(selectedOption === currentAnswer){
			console.log("you chose correct answer",selectedOption);
			$('#msg1').html("You got it!");
			$('#msg2').html("");
			correctAnswers++;
		}else{
			$('#msg1').html("Oops!");
			$('#msg2').html("The correct answer is "+currentAnswer);
			console.log("you chose wrong answer",selectedOption);
			wrongAnswers++;
		}
		console.log(questions[currentQuestionIndex].pic);
		$('#picture').attr("src","assets/images/"+questions[currentQuestionIndex].pic);
		getAnswer();
	}

	function getResult(){

		var unanswered = questions.length-correctAnswers-wrongAnswers;
		console.log("inside result");
		$('#answer').hide();
		$('#result').show();
		$('#main').append($('#result'));
		$('#result>p').html('<p>correct answers: '+correctAnswers+'</p><p>wrong answers: '+wrongAnswers+'</p><p>Unanswered: '+unanswered+'</p');
	}



	console.log(questions);

	$('#question').hide();
	$('#answer').hide();
	$('#result').hide();
	$('#timer').hide();
	
	$('#btnStart').click(startQuiz);
	$('#options').on('click','.option',checkAndGetAnswer);
	$('#btnRestart').click(restartQuiz);



});