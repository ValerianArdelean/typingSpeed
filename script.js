const SENTENCES = [
	[35, 55, 67],
	"Typing is an essential skill in the modern world, where digital communication is ubiquitous; by practicing regularly, you can greatly improve your speed and accuracy, which will benefit you in both personal and professional contexts.",
	"The old library, with its towering shelves filled with dusty tomes and ancient manuscripts, was a treasure trove of knowledge; scholars from around the world would travel great distances to study its rare collections, spending hours poring over fragile pages, deciphering faded scripts, and uncovering secrets of the past that had been forgotten for centuries.",
	"In the heart of the city, amidst the bustling streets and towering skyscrapers, there lies a small park, a hidden gem where nature thrives; here, one can find solace from the chaos, with trees providing shade, flowers blooming in vibrant colors, birds singing cheerfully, and a tranquil pond reflecting the sky above—a perfect place for reflection and relaxation, away from the hustle and bustle of urban life."
];
let index = 0;
let testType = 0;
let lettersCount = 0;
let wordsCount = 0;
let isCorrect = 1;
let typos = 0;
let timeStarted = false;
let isGameOver = false;
let time = document.getElementById("time");
let info1 = document.getElementById("info1");
let info2 = document.getElementById("info2");

function createSentence(size) {
	testType = size;
	time.innerText = `${60 * testType}`;
	sentenceHolder = document.getElementById("sentence");
	sentenceHolder.innerHTML = "";
	for (let i = 0; i < SENTENCES[size].length; ++i) {
		let letter = document.createElement("span");
		letter.textContent = SENTENCES[size][i];
		letter.id = `${i}`;
		letter.classList.add("letters");
		sentenceHolder.appendChild(letter);
	}
	document.getElementById(index).classList.add("orange");
}

function isLetter(c) {
	return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function handleGameOver() {
	clearInterval(timeInterval);
	info1.innerText = "Press restart, or refresh the page!";
	info2.innerText = `Congrats, you typed ${wordsCount}
		correct words out of ${SENTENCES[0][testType - 1]}\n
		You also made ${typos} mistake${typos !== 1 ? 's' : ''}
		in punctuation or spacing.`;
}

function startTimer() {
	const MINUTE_IN_SECONDS = 60 * testType;
	const SECOND_IN_MILLISECONDS = 1000;
	let elapsed = MINUTE_IN_SECONDS * testType;
	timeInterval = setInterval(() => {
		--elapsed;
		let seconds = String(elapsed % MINUTE_IN_SECONDS).padStart(2, '0');
		time.innerText = `${seconds}`;
		if (elapsed < 1) {
			isGameOver = true;
			handleGameOver();
			return;
		}
	}, SECOND_IN_MILLISECONDS);
}

function startGame() {
	document.addEventListener("keydown", function (event) {
		const EXCLUDED_KEYS = ['shift', 'tab', 'control', 'alt',
							   'meta', 'enter', 'capslock', 'arrowup',
							   'arrowdown', 'arrowleft', 'arrowright'];
		
		if (EXCLUDED_KEYS.includes(event.key.toLowerCase()) || isGameOver) {
			return;
		}
		
		if (!timeStarted) {
			timeStarted = true;
			startTimer();
		}
		
		let currentLetter = document.getElementById(index);
		let itIsAletter = isLetter(SENTENCES[testType][index]);
		if (event.key === SENTENCES[testType][index]) {
			currentLetter.classList.remove("orange", "red");
			if (itIsAletter) {
				++lettersCount;
			} else if (lettersCount) {
				lettersCount = 0;
				wordsCount += isCorrect;
				isCorrect = 1;
			}
			if (index < (SENTENCES[testType].length - 1)) {
				++index;
				let nextLetter = document.getElementById(index);
				nextLetter.classList.add("orange");
			} else {
				handleGameOver();
				return;
			}
		} else {
			currentLetter.classList.add("red");
			if (itIsAletter) {
				isCorrect = 0;
			} else {
				++typos;
			}
		}
	});
}

function restart() {
	document.getElementById(index).classList.remove("orange", "red");
	index = 0;
	document.getElementById(index).classList.add("orange");
	lettersCount = 0;
	wordsCount = 0;
	isCorrect = 1;
	typos = 0;
	timeStarted = false;
	isGameOver = false;
	clearInterval(timeInterval);
	time.innerText = `${60 * testType}`;
	info1.innerText = "The countdown will begin to run with your first key stroke.";
	info2.innerText = "Typos can be corrected by simply typing the correct letter.";
}

startGame();
