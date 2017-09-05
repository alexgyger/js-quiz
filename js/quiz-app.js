// Quiz-App by Alexander Gyger, build 1.3 - Aug 2017

var corrAnsw = 0;
var answSkipped = 0;
var htmlOutput = '';
let quizList = [
  ['Are Java and JavaScript the same?', 'no']
  ,
  ['What was the profession of the famous Malevich?', 'painter'],
  ['How many cantons does Switzerland have?', '26'],
  ['"$(this)" is typical for which JavaScript library?', 'jquery'],
  ['Which is the highest mountain in Switzerland?', 'dufourspitze']
 ];

function print(message) {
  // DOM-Object
  let outputDiv = document.getElementById('output');
  outputDiv.innerHTML = message;
}

function runQuiz(passArray) {
	for( i = 0; i < passArray.length; i += 1) {
		var currentQuestion = '';
		while (currentQuestion === ''){
			currentQuestion = prompt('Question ' + (i+1) + ': ' + passArray[i][0]);
		}
		// 4 input states: empty, cancelled(skipped), wrong, correct
		if (currentQuestion != null) {
			if (currentQuestion.toLowerCase() === passArray[i][1]){
				corrAnsw += 1;
				// console.log('corrAnsw: ' + corrAnsw);
				passArray[i][2] = true;
			} else {
				passArray[i][2] = false;
			}
		} else {
			passArray[i][2] = false;
			answSkipped += 1;
		}
		// console.log('passArray[i][2]: ' + passArray[i][2]);
	}
}

function createList(passPhrase) {
	htmlOutput += '<h2>' + passPhrase + '</h2><ol>';
	for(i = 0; i < quizList.length; i += 1) {
		// list all correctly answered questions
		if (quizList[i][2]){
			htmlOutput += '<li>' + quizList[i][0] + '</li>';
		}
	}
	htmlOutput += '</ol>';
}

function createWrong(passPhrase) {
	htmlOutput += '<h2>' + passPhrase + '</h2><ol>';
	for(i = 0; i < quizList.length; i += 1){
		// list all wrongly answered questions + display solutions
		if (!quizList[i][2]){
			htmlOutput += '<li>' + quizList[i][0] + ' <span class="hidden-hints">Hint: The right answer was: ' + quizList[i][1] + '.</span></li>';
		}
	}
	htmlOutput += '</ol>';
}

function buildUpHTML() {
	//Building up HTML-output after the quiz
	htmlOutput += '<h2>You got ' + corrAnsw + ' of a total of ' + quizList.length + ' question(s) right.</h2>';
	//Displaying skipped
	if(answSkipped > 0) {
		htmlOutput += '<h2>You skipped ' + answSkipped + ' question(s).</h2>';
	}
	//A - 'You got all question(s) correct:'
	//B - 'You got all question(s) wrong:'
	//C - 'You got these question(s) correct:'
	//    'You got these question(s) wrong:'
	if (corrAnsw === quizList.length) {
		createList('You got all questions correct:');
	} else if (corrAnsw === 0) {
		createWrong('You got all questions wrong:');
	} else {
		createList('You got these question(s) correct:');
		createWrong('You got these question(s) wrong:');
	}
}

// Running the quiz, saves answers (true/false) to the "quizList"-array
$("#btn-start-quiz").click(function(){
	$(this).hide();
	$("#btn-show-results").show();
	setTimeout(function(){
		runQuiz(quizList);
	}, 0);
	$("#btn-show-results").focus();
});

// Create and show results in #output div
$("#btn-show-results").click(function(){
	$(this).hide();
	$("#btn-retry-quiz").show();
	
	if (corrAnsw === quizList.length) {
		$("#result-congrats").show();
	} else {
		$("#btn-show-hints").show();
	}

	buildUpHTML();
	print(htmlOutput);
	
	// $('html, body').animate({
	// 	scrollTop: $(".middle").offset().top
	// }, 2000);
	// if (corrAnsw !== quizList.length) {
		$("html, body").animate({ 
			scrollTop: $(document).height() 
		}, "slow");
	// }
	
	$("#btn-show-hints").focus();
});

// Retry quiz - clear output and run quiz again
$("#btn-retry-quiz").click(function(){
	$(this).hide();
	$(".hidden-hints").hide();

	// Reset output variables
	corrAnsw = 0;
	answSkipped = 0;
	htmlOutput = '';
	print(htmlOutput);

	$("#btn-show-results").show();
	$("#result-congrats").hide();
	$("#btn-show-hints").hide()

	// Run Quiz again
	setTimeout(function(){
		runQuiz(quizList);
	}, 0);

	$("#btn-show-results").focus();
});

// Toggle hints
$("#btn-show-hints").click(function(){
	$(".hidden-hints").toggle();

	$("html, body").animate({ 
		scrollTop: $(document).height() 
	}, "slow");
});

$(".mycover").hover(function(){
	$(".infobox").hide();
});