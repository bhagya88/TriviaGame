$(document).ready(function(){
	var timeRemaining;
	var questionIntervalId;
	var answerTimeoutId;
	var questions=[{
					question:"Question1",
					answer:"Answer1",
					options:["Answer2","Answer1","Answer3","Answer5"]},
					{
					question:"Question2",
					answer:"Answer2",
					options:["Answer2","Answer1","Answer3","Answer5"]},
					{
					question:"Question3",
					answer:"Answer1",
					options:["Answer2","Answer1","Answer3","Answer5"]},
					{
					question:"Question4",
					answer:"Answer1",
					options:["Answer2","Answer1","Answer3","Answer4"]}
					];
	var q= [];
	function initializeQuiz(){
		for(var i=0;i<questions.length;i++){
		q.push(i);
	}
	$('#timer').show();
	
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
		if(timeRemaining === 0 && questionIntervalId){
			getAnswer();
			return;
		}
	}

	function getQuestion(){
			if(q.length>0){
			var randomNum=Math.floor(Math.random()*q.length);
			console.log("Random number",randomNum);
			var currentQuestion=questions[q[randomNum]].question;
			//$("input[name=interview]:checked").val()
			q.splice(randomNum,1);
			console.log("arr",q);
			$('#ques').html(currentQuestion);
			$('#question').show();
			$('#answer').hide();
			
			timeRemaining = 10;
			questionIntervalId = setInterval(decrementTimer,1000);
			}else{
				getResult();
			}
	}
		

	function getAnswer(){
		$('#question').hide();
		$('#answer').show();
		clearInterval(questionIntervalId);
		answerTimeoutId = setTimeout(getQuestion,5000);
		return;
	}
	function getResult(){
		console.log("inside result");
		$('#answer').hide();
		$('#result').show();
		clearInterval(questionIntervalId);
		return;
	}

	

	console.log(questions);

	$('#question').hide();
	$('#answer').hide();
	$('#result').hide();
	$('#timer').hide();
	
	$('#btnStart').click(startQuiz);
	$('#userAnswer').click(getAnswer);
	$('#btnRestart').click(restartQuiz);



});