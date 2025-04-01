let SENTENCES = [];

async function fetchSentence(size) {
	const API_URL = `https://api.quotable.io/random?minLength=${size - 50}&maxLength=${size + 50}`;
	try {
		const response = await fetch(API_URL);
		const data = await response.json();
		return data.content; // Extracting the sentence
	} catch (error) {
		console.error("Error fetching sentence:", error);
		return "Default fallback sentence in case of an error."; // Fallback in case of API failure
	}
}

async function loadSentences() {
	SENTENCES = await Promise.all([fetchSentence(250), fetchSentence(350), fetchSentence(400)]);
}
const EXCLUDED_KEYS = [
	'shift', 'tab', 'control', 'alt', 'meta', 'enter', 'capslock', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'
];

let game = {
	index : 0,
	testType : 0,
	lettersCount : 0,
	wordsCount : 0,
	wordIsCorrect : 1,
	typosCount: 0,
	isAtypo : 0,
	timeStarted : false,
	isGameOver : false,
	time : document.getElementById("time"),
	info1 : document.getElementById("info1"),
	info2 : document.getElementById("info2"),
	sentenceLength : 0
}

async function createSentence(size) {
	if (game.isGameOver || game.timeStarted) {
		return;
	}

	if (SENTENCES.length === 0) {
		await loadSentences();
	}
	
	game.testType = size;
	game.time.innerText = `${60 * game.testType}`;
	game.sentenceLength = SENTENCES[game.testType - 1].length;
	
	let sentenceHolder = document.getElementById("sentence");
	sentenceHolder.innerHTML = "";

	for (let i = 0; i < SENTENCES[size - 1].length; ++i) {
		let letter = document.createElement("span");
		letter.textContent = SENTENCES[size - 1][i];
		letter.id = `${i}`;
		letter.classList.add("letters");
		sentenceHolder.appendChild(letter);
	}

	document.getElementById(game.index).classList.add("orange");
}

window.onload = loadSentences;

function isLetter(c) {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function handleGameOver() {
	game.typosCount += game.isAtypo;
	game.isGameOver = true;
	clearInterval(timeInterval);
	game.info1.innerText = "Press restart, or refresh the page!";
	game.info2.innerText = `Congrats, you typed ${game.wordsCount}
		correct words out of ${SENTENCES[0][game.testType - 1]}\n
		You also made ${game.typosCount} mistake${game.typosCount !== 1 ? 's' : ''}
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
		game.wordsCount += game.wordIsCorrect;
		game.wordIsCorrect = 1;
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
		game.wordIsCorrect = 0;
	} else {
		game.isAtypo = 1;
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
		let itIsAletter = isLetter(SENTENCES[game.testType - 1][game.index]);
		countCorrectWords(itIsAletter);
		if (event.key === SENTENCES[game.testType - 1][game.index]) {
			currentLetter.classList.remove("orange", "red");
			game.typosCount += game.isAtypo;
			game.isAtypo = 0;
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
	game.wordIsCorrect = 1;
	game.typosCount = 0;
	game.isAtypo = 0;
	game.timeStarted = false;
	game.isGameOver = false;
	clearInterval(timeInterval);
	game.time.innerText = `${60 * game.testType}`;
	game.info1.innerText = "The countdown will begin to run with your first key stroke.";
	game.info2.innerText = "Typos can be corrected by simply typing the correct letter.";
}

startGame();
