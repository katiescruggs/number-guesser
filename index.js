//declare global variables
var randomNumber;
var max = 100;
var min = 0;

var level = 1;
var score = 0;
var points;

//declare DOM global variables
var guessButton;
var clearButton;
var resetButton;
var minMaxInputs;
var guessInputField;
var errorMessage;

window.onload = function() {

	//assign value to global variable randomNumber
	getRandomNumber();

	//initialize scoreboard variables
	// level = 1;
	// score = 0;

	//initialize DOM variables
	guessButton = document.querySelector('#guessButton');
	clearButton = document.querySelector('#clearButton');
	resetButton = document.querySelector('#resetButton');
	minMaxInputs = document.querySelectorAll('#min, #max');
	guessInputField = document.querySelector('#guess');
	errorMessage = document.querySelector('#errorMessage');

	//set up event listeners
	guessButton.addEventListener('click', checkGuess);
	clearButton.addEventListener('click', clearInput);
	resetButton.addEventListener('click', resetPage);
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
	if(resetButton.innerHTML === 'Play again with a wider range!') {
		nextLevel();

	//resetting to beginning
	} else {
		min = 0;
		max = 100;
		document.querySelector('#min').value = min;
		document.querySelector('#max').value = max;
		document.querySelector('#min').disabled = false;
		document.querySelector('#max').disabled = false;

		guessInputField.placeholder = 'Enter your guess between ' + min + ' and ' + max;
		resetButton.disabled = true;
		getRandomNumber();
	}
}
 
function checkGuess() {
	//if first guess
	if(minMaxInputs[0].disabled === false) {
		points = ((max - min) / 10);
		console.log('first guess, points - ' + points);
	} else {
		points--;
		console.log('points = ' + points)
	}


	errorMessage.style.display = 'none';
	resetButton.disabled = false;

	minMaxInputs[0].disabled = true;
	minMaxInputs[1].disabled = true;
	var guess = parseInt(document.querySelector('#guess').value);
	
	//errors in guess
	if(guess > max || guess < min || isNaN(guess)) {

		// alert('Please enter a number between ' + min + ' and ' + max + '.');
		errorMessage.style.display = 'block';
		errorMessage.innerHTML = 'Please enter a valid number between ' + min + ' and ' + max;
		document.querySelector('#resultSection').style.display = 'none';
		guessButton.disabled = true;
		clearButton.disabled = true;
	} else if(guess > randomNumber) {
		displayTooHigh(guess);
	} else if(guess < randomNumber) {
		displayTooLow(guess);
	} else {
		displayJustRight(guess);
	}
}

function displayTooHigh(guess) {
	document.querySelector('h2').innerHTML = guess;
	document.querySelector('#result').innerHTML = 'That is too high.';
	document.querySelector('#resultSection').style.display = 'block';
	// resetButton.disabled = false;
}

function displayTooLow(guess) {
	document.querySelector('h2').innerHTML = guess;
	document.querySelector('#result').innerHTML = 'That is too low.';
	document.querySelector('#resultSection').style.display = 'block';
	// resetButton.disabled = false;
}

function displayJustRight(guess) {
	document.querySelector('#resultSection').style.display = 'block';
	guessButton.disabled = true;
	clearButton.disabled = true;

	var result = document.querySelector('#result');
	var body = document.querySelector('body');
	body.classList.add('boom');
	document.querySelector('h2').innerHTML = 'BOOM!';
	document.querySelector('#lastGuess').style.display = 'none';
	result.style.display = 'none';

	//change BOOM page back to normal after 1 second
	setTimeout(function() {
		body.classList.remove('boom');
		document.querySelector('h2').innerHTML = guess;
		result.style.display = 'block';
		document.querySelector('#lastGuess').style.display = 'block';
		document.querySelector('#lastGuess').innerText = 'Your last guess was';		
	}, 1000)

	//document.querySelector('h2').innerHTML = guess;
	result.innerHTML ='BOOM!';

	// resetButton.disabled = false;
	resetButton.innerHTML = 'Play again with a wider range!';
}

function nextLevel() {
	console.log('next level');
	level++;
	score += points;
	console.log('level is ' + level);
	console.log('score is ' + score);

	document.querySelector('#resetButton').innerHTML = 'Reset';
	min -= 10;
	max += 10;

	document.querySelector('#min').value = min;
	document.querySelector('#max').value = max;
	guessInputField.placeholder = 'Enter your guess between ' + min + ' and ' + max;
}


