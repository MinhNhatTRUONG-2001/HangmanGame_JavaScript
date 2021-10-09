var wordBank = ["watermelon","smartphone","cookie","beautiful","telescope","exercise","electronics","keyboard","software","nature","cosmos","typhoon","society","futuristic","zebra","double","jigsaw","quarantine","village","syntax","zombie","bizzare","paradox","flexible","provide","quartz","tropical","jetpack","display","quality","quantity","important","consecutive"];
var letters = "abcdefghijklmnopqrstuvwxyz";
var guessedLetters = []; //Any guessed letter will be stored here
//console.log(wordBank.length);
var problem = wordBank[Math.floor(Math.random() * wordBank.length)]; //Take a random word from wordBank
//console.log(problem);

//Initially print hidden word pattern
var hiddenWord = "";
for (var i = 0; i < problem.length; i++) { 
    hiddenWord += "*";
}
var countMissingLetters = hiddenWord.length;
document.getElementById("description").innerHTML = "You need to guess this word (" + countMissingLetters + " letters):";
document.getElementById("hiddenWord").innerHTML = hiddenWord;
var lives = 6; // maximum 6 incorrect guesses

var hangman = document.getElementById("hangman");
var draw = hangman.getContext("2d");
//draw the hang
draw.beginPath();
draw.moveTo(200, 25);
draw.lineTo(200, 10);
draw.strokeStyle = "brown";
draw.stroke();
draw.beginPath();
draw.moveTo(200, 10);
draw.lineTo(75, 10);
draw.strokeStyle = "brown";
draw.stroke();
draw.beginPath();
draw.moveTo(75, 10);
draw.lineTo(75, 240);
draw.strokeStyle = "brown";
draw.stroke();
draw.beginPath();
draw.moveTo(50, 240);
draw.lineTo(100, 240);
draw.strokeStyle = "brown";
draw.stroke();

//"Guess" button function
function checkGuessedLetter() {
    var checkedLetter = document.getElementById("guess").value;

    //check if the letter has been guessed before
    for (var i in guessedLetters) {
        if (checkedLetter == guessedLetters[i]) {
            alert("This letter has been guessed before.");
            return -1;
        }
    }

    //check if the letter is valid
    if (checkedLetter == "" || checkedLetter.charCodeAt(0) < 97 || checkedLetter.charCodeAt(0) > 122) {
        alert("Invalid letter or field is empty. Letter must be between a-z.");
    } else { //check if the letter includes in the word
        var isInWord = false;
        for (var i = 0; i < problem.length; i++) {
            if (checkedLetter == problem[i]) {
                isInWord = true;
                break;
            }
        }
        if (isInWord == false) { //If false, display incorrect message + guessed letter
            guessedLetters.push(checkedLetter);
            lives--;
            switch (lives) {
                case 5: //head
                    draw.beginPath();
                    draw.arc(200, 50, 25, 0, 2 * Math.PI);
                    draw.strokeStyle = "green";
                    draw.stroke();
                    break;
                case 4: //body
                    draw.beginPath();
                    draw.moveTo(200, 75);
                    draw.lineTo(200, 150);
                    draw.strokeStyle = "green";
                    draw.stroke();
                    break;
                case 3: //left arm
                    draw.beginPath();
                    draw.moveTo(200, 80);
                    draw.lineTo(150, 125);
                    draw.strokeStyle = "green";
                    draw.stroke();
                    break;
                case 2: //right arm
                    draw.beginPath();
                    draw.moveTo(200, 80);
                    draw.lineTo(250, 125);
                    draw.strokeStyle = "green";
                    draw.stroke();
                    break;
                case 1: //left leg
                    draw.beginPath();
                    draw.moveTo(200, 150);
                    draw.lineTo(150, 200);
                    draw.strokeStyle = "green";
                    draw.stroke();
                    break;
                case 0: //right leg
                    draw.beginPath();
                    draw.moveTo(200, 150);
                    draw.lineTo(250, 200);
                    draw.strokeStyle = "green";
                    draw.stroke();
                    break;
            }
            document.getElementById("guessedLetters").innerHTML = "* Guessed letters: " + guessedLetters;
            document.getElementById("rightOrWrong").innerHTML = "Incorrect guess. No letter '" + checkedLetter + "' in this word.";
            if (lives == 0) { //If player guessed incorrectly 6 times, the game is over
                document.getElementById("result").innerHTML = ">>> Game over! You lose. The answer is '" + problem + "'. <<<";
                document.getElementById("guess").disabled = true;
                document.getElementById("guessButton").disabled = true;
                document.getElementById("again").innerHTML = "<a href='hangman.html'><button>Play again</button></a>";
            }
        } else { //If true, replace guessed letter into all hidden spots + display correct message and guessed letter
            guessedLetters.push(checkedLetter);
            document.getElementById("guessedLetters").innerHTML = "* Guessed letters: " + guessedLetters;
            var countCorrectLetter = 0;
            for (var i = 0; i < problem.length; i++) {
                if (checkedLetter == problem[i]) {
                    hiddenWord = hiddenWord.slice(0, i) + checkedLetter + hiddenWord.slice(i + 1);
                    countCorrectLetter++;
                    countMissingLetters--;
                }
            }
        //console.log(countMissingLetters);
            document.getElementById("rightOrWrong").innerHTML = (countCorrectLetter == 1) ? "Correct guess. There is 1 letter '" + checkedLetter + "'." : "Correct guess. There are " + countCorrectLetter + " letter '" + checkedLetter + "'.";
            document.getElementById("hiddenWord").innerHTML = hiddenWord;
            if (countMissingLetters == 0) { //If player guessed all letter correctly, a message and a "Play again" button are shown + "Guess" button disabled 
                document.getElementById("result").innerHTML = ">>> Yay! You guessed the whole word. <<<";
                document.getElementById("guess").disabled = true;
                document.getElementById("guessButton").disabled = true;
                document.getElementById("again").innerHTML = "<a href='hangman.html'><button>Play again</button></a>";
            }
        }
    }
}