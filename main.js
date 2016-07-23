var prompt = require('prompt');
var Word = require('./word.js');
var Letter = require('./letter.js');

prompt.start();

game = {
	wordBank : ["heart and soul", "relax", "burning up", "manic monday", "into the groove", "invisible touch", "rebel yell"],
	wordsWon : 0,
	guessesRemaining : 10, //per word
	currentWrd : null, //the word object
	startGame : function (wrd){
		console.log("");
		console.log("Welcome to my Hangman Game!");
		//make sure the user has 10 guesses
		this.resetGuessesRemaining();

		//get a random word from the array
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);

		this.currentWrd.getLets(); //populate currentWrd (made from Word constructor function) object with letters

		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;
		console.log("");
		console.log("Your Word is: " + self.currentWrd.wordRender());
		console.log("");

		prompt.get(['guessLetter'], function(err, result) {
		    // result is an object like this: { guessLetter: 'f' }
		    var guessedLetter = new Letter(result.guessLetter);
		    console.log('You guessed: ' + guessedLetter.character);

		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var guessedCorrectly = self.currentWrd.checkIfLetterFound(guessedLetter.character);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (guessedCorrectly == 0){
		    	console.log(guessedLetter.character + ' is not in the word!');
		    	console.log("Please try again!");
		    	self.guessesRemaining--;
		    }else{
		    	console.log(guessedLetter.character + ' is in the word!');
		    	guessedLetter.guessedCorrectly = true;

		    	//check if you win only when you are right
	    		if(self.currentWrd.didWeFindTheWord()){
			    	console.log('You Won!!!');
			    	return; //end game
			    }
		    }

		    console.log('You have ' + self.guessesRemaining + ' guesses remaining!');
		    

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('Game over! The word was', self.currentWrd.gameWord);
		    }
		});
	}


};

game.startGame();