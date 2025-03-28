const SENTENCES = [
	[35, 55, 67],
	"Typing is an essential skill in the modern world, where digital communication is ubiquitous; by practicing regularly, you can greatly improve your speed and accuracy, which will benefit you in both personal and professional contexts.",
	"The old library, with its towering shelves filled with dusty tomes and ancient manuscripts, was a treasure trove of knowledge; scholars from around the world would travel great distances to study its rare collections, spending hours poring over fragile pages, deciphering faded scripts, and uncovering secrets of the past that had been forgotten for centuries.",
	"In the heart of the city, amidst the bustling streets and towering skyscrapers, there lies a small park, a hidden gem where nature thrives; here, one can find solace from the chaos, with trees providing shade, flowers blooming in vibrant colors, birds singing cheerfully, and a tranquil pond reflecting the sky above—a perfect place for reflection and relaxation, away from the hustle and bustle of urban life."
];
const EXCLUDED_KEYS = [
	'shift', 'tab', 'control', 'alt', 'meta', 'enter', 'capslock', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'
];

let game = {
	index : 0,
	testType : 0,
	lettersCount : 0,
	wordsCount : 0,
	isCorrect : 1,
	typos : 0,
	timeStarted : false,
	isGameOver : false,
	time : document.getElementById("time"),
	info1 : document.getElementById("info1"),
	info2 : document.getElementById("info2"),
	sentenceLength : 0
}

function createSentence(size) {
	if (game.isGameOver) {
		return;
	}
	game.sentenceLength = SENTENCES[size].length;
	game.testType = size;
	game.time.innerText = `${60 * game.testType}`;
	sentenceHolder = document.getElementById("sentence");
	sentenceHolder.innerHTML = "";
	for (let i = 0; i < SENTENCES[size].length; ++i) {
		let letter = document.createElement("span");
		letter.textContent = SENTENCES[size][i];
		letter.id = `${i}`;
		letter.classList.add("letters");
		sentenceHolder.appendChild(letter);
	}
	document.getElementById(game.index).classList.add("orange");
}

function isLetter(c) {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function handleGameOver() {
	game.isGameOver = true;
	clearInterval(timeInterval);
	game.info1.innerText = "Press restart, or refresh the page!";
	game.info2.innerText = `Congrats, you typed ${game.wordsCount}
		correct words out of ${SENTENCES[0][game.testType - 1]}\n
		You also made ${game.typos} mistake${game.typos !== 1 ? 's' : ''}
		in punctuation or spacing.`;
}

function startTimer() {
	const MINUTE_IN_SECONDS = 60 * game.testType;
	const SECOND_IN_MILLISECONDS = 1000;
	let elapsed = MINUTE_IN_SECONDS * game.testType;
	timeInterval = setInterval(() => {
		--elapsed;
		let seconds = String(elapsed % MINUTE_IN_SECONDS).padStart(2, '0');
		game.time.innerText = `${seconds}`;
		if (elapsed < 1) {
			game.isGameOver = true;
			handleGameOver();
			return;
		}
	}, SECOND_IN_MILLISECONDS);
}

function handleTime() {
	if (!game.timeStarted) {
		game.timeStarted = true;
		startTimer();
	}
}

function countCorrectWords(itIsAletter) {
	if (itIsAletter) {
		++game.lettersCount;
	} else if (game.lettersCount) {
		game.lettersCount = 0;
		game.wordsCount += game.isCorrect;
		game.isCorrect = 1;
	}
}

function handleCorrectKey() {
	++game.index;
	let nextLetter = document.getElementById(game.index);
	nextLetter.classList.add("orange");
}

function handdleWrongKey(element, itIsAletter) {
	element.classList.add("red");
	if (itIsAletter) {
		game.isCorrect = 0;
	} else {
		++game.typos;
	}
}

function startGame() {
	document.addEventListener("keydown", function (event) {
		if (EXCLUDED_KEYS.includes(event.key.toLowerCase()) ||
			game.isGameOver || !game.testType) {
			return;
		}
		
		handleTime();
		
		let currentLetter = document.getElementById(game.index);
		let itIsAletter = isLetter(SENTENCES[game.testType][game.index]);
		countCorrectWords(itIsAletter);
		if (event.key === SENTENCES[game.testType][game.index]) {
			currentLetter.classList.remove("orange", "red");
			if (game.index < game.sentenceLength - 1) {
				handleCorrectKey();
			} else {
				handleGameOver();
				return;
			}
		} else {
			handdleWrongKey(currentLetter, itIsAletter);
		}
		
	});
}

function restart() {
	document.getElementById(game.index).classList.remove("orange", "red");
	game.index = 0;
	document.getElementById(game.index).classList.add("orange");
	game.lettersCount = 0;
	game.wordsCount = 0;
	game.isCorrect = 1;
	game.typos = 0;
	game.timeStarted = false;
	game.isGameOver = false;
	clearInterval(timeInterval);
	game.time.innerText = `${60 * game.testType}`;
	game.info1.innerText = "The countdown will begin to run with your first key stroke.";
	game.info2.innerText = "Typos can be corrected by simply typing the correct letter.";
}

startGame();
