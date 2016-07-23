var Letter = require('./letter.js');

function Word(wrd){
	this.gameWord = wrd;
	this.lets = [];
	this.found = false;
	this.guessedLetters = [];
	this.getLets = function(){
		for (var i = 0; i < this.gameWord.length; i++) {
			this.lets.push(this.gameWord[i]);
		}
	}
	//returns ture or false whether we found the current word or not
	this.didWeFindTheWord = function() {
		if (this.guessedLetters.length == this.lets.length) {
			this.found = true;
		}
		return this.found;
	};
	this.checkIfLetterFound = function(guessLetter) {
		var whatToReturn = 0;

		var char = new Letter(guessLetter);

		for (var i = 0; i < this.lets.length; i++) {
			if(this.lets[i] == char.character){
				char.guessedCorrectly = true;
				this.guessedLetters.push(char.character);
				whatToReturn++;
			}
		}
		return whatToReturn;
	};
	this.wordRender = function() {
		var str = "";
		
		for (var i = 0; i < this.lets.length; i++) {
			var char = new Letter(this.lets[i]);
			str += char.display();
		}
		return str;
	};
}

module.exports = Word;
