  $(document).ready(function () {
            var words = [
                "eddie_murphy",
                "fiona",
                "donkey",
                "puss_in_boots",
                "dragon",
                "farquaad",
                "ginger_bread_man",
                "pinocchio",
                "magic_mirror",
                "three_blin_dmice",
                "cinderella",
                "bluebird",
                "pied_piper",
                "onions",
                "smash_mouth",
                "duloc_mascot",
                "three_little_pigs",
                "snow_white",
                "ogre",
                "swamp",
                "tinker_bell",
                "robin_hood",
                "king_harold",
                "queen_lillian",
                "doris",
                "fairy_godmother",
                "mabel",
                "lil_red",
                "dwarves",
                "muffin_man",
                "gnomes",
                "merlin",
                "arthur_pendragon",
                "rapunzel",
                "humpty_dumpty",
                "jack_and_jill",
                "golden_goose"
            ];

            var lives, word, wordArray, guesses, counter;
            var started = false;
            var gameOver = false;
            var winCount = 0;
            var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','_'];
            var showLives = document.getElementById("mylives");
            var showWins = document.getElementById("winCount");
            var shrek = $("#theThird");
            var audioElement = document.createElement("audio");
            audioElement.setAttribute("src", "assets/images/ogre.mp3");


            function buttons() {
                myButtons = document.getElementById('buttons');
                letters = document.createElement('ul');
                for (var i = 0; i < alphabet.length; i++) {
                    letters.id = 'alphabet';
                    list = document.createElement('li');
                    list.id = 'letter';
                    list.innerHTML = alphabet[i];
                    check();
                    myButtons.appendChild(letters);
                    letters.appendChild(list);
                }
            }

            function result() {
                wordHolder = document.getElementById('hold');
                correct = document.createElement('ul');

                for (var i = 0; i < word.length; i++) {
                    correct.setAttribute('id', 'my-word');
                    guess = document.createElement('li');
                    guess.setAttribute('class', 'guess');
                    if (word[i] === "-") {
                        guess.innerHTML = "-";
                        space = 1;
                    } else {
                        guess.innerHTML = "-";
                    }

                    guesses.push(guess);
                    wordHolder.appendChild(correct);
                    correct.appendChild(guess);
                }
            }

            function comments() {
                showLives.innerHTML = "You have " + lives + " lives";
                showWins.innerHTML = "Win Count: " + winCount;
                if (lives < 1) {
                    showLives.innerHTML = "It's all ogre now";
                    audioElement.play();
                    gameOver = true;
                    endGame();
                }
                for (var i = 0; i < guesses.length; i++) {
                    if (counter + space === guesses.length) {
                        showLives.innerHTML = "You Win!";
                    }
                }
                if (showLives.innerHTML == "You Win!") {
                    winCount++;
                    showWins.innerHTML = "Win Count: " + winCount;
                }
            }

            function check() {
                list.onclick = function () {
                    var guess = (this.innerHTML);
                    this.setAttribute("class", "active");
                    this.onclick = null;
                    for (var i = 0; i < word.length; i++) {
                        if (word[i] === guess) {
                            guesses[i].innerHTML = guess;
                            counter++;
                        }
                    }
                    var j = (word.indexOf(guess));
                    if (j === -1) {
                        lives--;
                        moveShrek();
                        comments();
                    } else {
                        comments();
                    }
                }
            }

            function moveShrek() {
                shrek.animate({ left: "+=100px" }, "normal");
            }


            function play() {
                word = pickRandomWord();
                console.log(word);
                wordArray = word.split('');
                buttons();
                guesses = [];
                lives = 9;
                counter = 0;
                space = 0;
                gameOver = false;
                result();
                comments();
            }

            function pickRandomWord() {
                var rnd = Math.ceil(Math.random() * words.length - 1);
                return words[rnd];
            }

            function endGame() {
                correct.parentNode.removeChild(correct);
                letters.parentNode.removeChild(letters);
                document.getElementById('theThird').style.left = '100px';
            }


            document.getElementById('startGame').onclick = function () {
                if (!started) {
                    started = true;
                    this.style.display = "none";
                    document.getElementById('reset').style.display = "inline-block";
                    document.getElementById('theThird').style.display = "inline-block";
                    document.getElementById('puss').style.display = "inline-block";
                    play();
                }
            }

            document.getElementById('reset').onclick = function () {
                if(!gameOver){
                    correct.parentNode.removeChild(correct);
                    letters.parentNode.removeChild(letters);
                    gameOver = true;
                }
                document.getElementById('theThird').style.left = '100px';
                play();
            }

        });
