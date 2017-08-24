//declare global variables
var randomNumber;
var max = 100;
var min = 0;

var level = 1;
var score = 0;
var score2 = 0;
var points = 10;

//declare DOM global variables
var guessButton = document.querySelector('#guessButton');
var clearButton = document.querySelector('#clearButton');
var resetButton = resetButton = document.querySelector('#resetButton');
var minMaxInputs = document.querySelectorAll('#min, #max');
var guessInputField = document.querySelector('#guess');
var errorMessage = document.querySelector('#errorMessage');
var startButton = document.querySelector('#startButton');
var playerOneName = 'Player 1';
var playerTwoName = 'Player 2';

window.onload = function() {

	//assign value to global variable randomNumber
	getRandomNumber();

	//set up event listeners
	guessButton.addEventListener('click', checkGuess);
	clearButton.addEventListener('click', clearInput);
	resetButton.addEventListener('click', resetPage);
	startButton.addEventListener('click', startGame);
	minMaxInputs[0].addEventListener('blur', adjustMinMax);
	minMaxInputs[1].addEventListener('blur', adjustMinMax);
	guessInputField.addEventListener('keyup', function(event){
		guessButton.disabled = false;
		clearButton.disabled = false;
		if(event.keyCode === 13) {
			checkGuess();
		} else if (guessInputField.value === '') {
			guessButton.disabled = true;
			clearButton.disabled = true;
		}	 
	});
	document.querySelector('#player1Name').addEventListener('blur', function(event) {
		playerOneName = document.querySelector('#player1Name').value;
		document.querySelector('#playerOneScore').innerHTML = playerOneName + "'s <br> Score: " + score;
	});
	document.querySelector('#player2Name').addEventListener('blur', function(event) {
		playerTwoName = document.querySelector('#player2Name').value;
		document.querySelector('#playerTwoScore').innerHTML = playerTwoName + "'s <br> Score: " + score2;
	});
}

function startGame() {
	document.querySelector('#myModal').style.display = 'none';
	document.querySelector('body').classList.remove('boom');
}

function getRandomNumber() {
	randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	console.log("random number = " + randomNumber);
}

function adjustMinMax() {
	min = parseInt(document.querySelector('#min').value);
	max = parseInt(document.querySelector('#max').value);

	//errors in min and max
	if(isNaN(min)) {
		guessInputField.placeholder = 'Please enter a valid Min.';
		guessInputField.disabled = true;
	} else if(isNaN(max)) {
		guessInputField.placeholder = 'Please enter a valid Max.';
		guessInputField.disabled = true;
	} else if(min >= max) {
		guessInputField.placeholder = 'Please enter a Min that is less than Max.';
		guessInputField.disabled = true;
	}

	//no errors in min or max
	else {
		getRandomNumber();
		points = ((max - min) / 10);
		document.querySelector('#possiblePoints').innerHTML = points + ' Points';
		document.querySelector('#possiblePoints2').innerHTML = points + ' Points';
	
		guessInputField.placeholder = 'Enter your guess between ' + min + ' and ' + max;
		guessInputField.disabled = false;
	}
}

function clearInput() {
	guessInputField.value = '';
	guessButton.disabled = true;
	clearButton.disabled = true;
}

function resetPage() {
	document.querySelector('#resultSection').style.display = 'none';
	guessInputField.value = '';
	getRandomNumber();
	
	guessButton.disabled = true;
	clearButton.disabled = true;

	//if the user has won
	if(resetButton.innerHTML === 'Next Level!') {
		nextLevel();

	//resetting to beginning
	} else {
		min = 0;
		max = 100;
		document.querySelector('#min').value = min;
		document.querySelector('#max').value = max;
		document.querySelector('#min').disabled = false;
		document.querySelector('#max').disabled = false;

		//reset score, level, and points variables
		score = 0;
		score2 = 0;
		level = 1;
		points = 10;

		document.querySelector('#playerOneScore').innerHTML = playerOneName + "'s <br> Score: " + score;
		document.querySelector('#playerTwoScore').innerHTML = playerTwoName + "'s <br> Score: " + score2;
		document.querySelector('#levelP').innerHTML = 'Level ' + level;
		document.querySelector('#levelP2').innerHTML = 'Level ' + level;
		document.querySelector('#possiblePoints').innerHTML = points + ' Points';
		document.querySelector('#possiblePoints2').innerHTML = points + ' Points';

		guessInputField.placeholder = 'Enter your guess between ' + min + ' and ' + max;
		resetButton.disabled = true;
		getRandomNumber();
	}
}
 
function checkGuess() {
	errorMessage.style.display = 'none';
	resetButton.disabled = false;
	minMaxInputs[0].disabled = true;
	minMaxInputs[1].disabled = true;

	var guess = parseInt(document.querySelector('#guess').value);
	clearInput();

	//errors in guess
	if(guess > max || guess < min || isNaN(guess)) {
		errorMessage.style.display = 'block';
		errorMessage.innerHTML = 'Please enter a valid number between ' + min + ' and ' + max;
		document.querySelector('#resultSection').style.display = 'none';
		guessButton.disabled = true;
		clearButton.disabled = true;

	//no errors in guess
	} else if(guess > randomNumber) {
		displayTooHigh(guess);
	} else if(guess < randomNumber) {
		displayTooLow(guess);
	} else {
		displayJustRight(guess);
	}
}

function displayTooHigh(guess) {
	//reduce points for wrong guess
	points--;
	document.querySelector('#possiblePoints').innerHTML = points + ' Points';
	document.querySelector('#possiblePoints2').innerHTML = points + ' Points';

	togglePlayer();
	document.querySelector('h2').innerHTML = guess;
	document.querySelector('#result').innerHTML = 'That is too high.';
	document.querySelector('#resultSection').style.display = 'block';
}

function displayTooLow(guess) {
	//reduce points for wrong guess
	points--;
	document.querySelector('#possiblePoints').innerHTML = points + ' Points';
	document.querySelector('#possiblePoints2').innerHTML = points + ' Points';

	togglePlayer();
	document.querySelector('h2').innerHTML = guess;
	document.querySelector('#result').innerHTML = 'That is too low.';
	document.querySelector('#resultSection').style.display = 'block';
}

function displayJustRight(guess) {
	document.querySelector('#possiblePoints').innerHTML = '-- Points';
	document.querySelector('#possiblePoints2').innerHTML = '-- Points';

	document.querySelector('#resultSection').style.display = 'block';
	guessButton.disabled = true;
	clearButton.disabled = true;

	var result = document.querySelector('#result');
	var body = document.querySelector('body');
	body.classList.add('boom');
	document.querySelector('h2').innerHTML = 'BOOM!';
	document.querySelector('#lastGuess').style.visibility = 'hidden';
	result.style.visibility = 'hidden';

	//change BOOM page back to normal after 1 second
	setTimeout(function() {
		body.classList.remove('boom');
		document.querySelector('h2').innerHTML = guess;
		result.style.visibility = 'visible';
		document.querySelector('#lastGuess').style.visibility = 'visible';
		document.querySelector('#lastGuess').innerText = 'Your last guess was';		
	}, 1000)

	result.innerHTML ='BOOM!';
	resetButton.innerHTML = 'Next Level!';

	//adjust player 1's score
	if(document.querySelector('#scoreBoard').classList.contains('yourTurn')) {
		score += points;
		document.querySelector('#playerOneScore').innerHTML = playerOneName + "'s <br> Score: " + score;

		//if Player 1 has won the game
		if(score >= 100) {
			resetPage();
			resetPage();

			setTimeout(function() {
				body.classList.add('boom');	
			}, 1000);
			
			document.querySelector('#myModal').style.display = 'block';
			document.querySelector('h4').innerHTML = '<strong>' + playerOneName + ' has won!</strong>';
			document.querySelector('#modalP1').innerHTML = '';
			document.querySelector('#modalP2').innerHTML = 'To play again, please enter the names of the players and click the Start Button.';
		}

	//adjust player 2's score
	} else {
		score2 += points;
		document.querySelector('#playerTwoScore').innerHTML = playerTwoName + "'s <br> Score: " + score2;

		//if Player 2 has won the game
		if(score2 >= 100) {
			resetPage();
			resetPage();
			
			setTimeout(function() {
				body.classList.add('boom');	
			}, 1000);
			
			document.querySelector('#myModal').style.display = 'block';
			document.querySelector('h4').innerHTML = '<strong>' + playerTwoName + ' has won!</strong>';
			document.querySelector('#modalP1').innerHTML = '';
			document.querySelector('#modalP2').innerHTML = 'To play again, please enter the names of the players and click the Start Button.';
			togglePlayer();
		}
	}
}

function nextLevel() {
	//adjust Level in scoreboard
		level++;
		document.querySelector('#levelP').innerHTML = 'Level ' + level;
		document.querySelector('#levelP2').innerHTML = 'Level ' + level;

	//adjust points for new level
		points = ((max - min) / 10);
		document.querySelector('#possiblePoints').innerHTML = points + ' Points';
		document.querySelector('#possiblePoints2').innerHTML = points + ' Points';

	document.querySelector('#resetButton').innerHTML = 'Reset';
	min -= 10;
	max += 10;

	document.querySelector('#min').value = min;
	document.querySelector('#max').value = max;
	guessInputField.placeholder = 'Enter your guess between ' + min + ' and ' + max;
}

function togglePlayer() {
	if(document.querySelector('#scoreBoard').classList.contains('yourTurn')) {
		document.querySelector('#scoreBoard').classList.remove('yourTurn');
		document.querySelector('#scoreBoard2').classList.add('yourTurn');
	} else {
		document.querySelector('#scoreBoard2').classList.remove('yourTurn');
		document.querySelector('#scoreBoard').classList.add('yourTurn');
	}
}