function Letter(char) {
    this.guessedCorrectly = false;
    this.character = char;
}

Letter.prototype.display = function() {
    if (this.guessedCorrectly == true) {
        return this.character;
    } else {
        return '_';
    }
};

// export letter constructor
module.exports = Letter;