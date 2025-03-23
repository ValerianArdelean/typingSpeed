const SENTENCES = [
	"Typing is an essential skill in the modern world, where digital communication is ubiquitous; by practicing regularly, you can greatly improve your speed and accuracy, which will benefit you in both personal and professional contexts.",
	"The old library, with its towering shelves filled with dusty tomes and ancient manuscripts, was a treasure trove of knowledge; scholars from around the world would travel great distances to study its rare collections, spending hours poring over fragile pages, deciphering faded scripts, and uncovering secrets of the past that had been forgotten for centuries.",
	"In the heart of the city, amidst the bustling streets and towering skyscrapers, there lies a small park, a hidden gem where nature thrives; here, one can find solace from the chaos, with trees providing shade, flowers blooming in vibrant colors, birds singing cheerfully, and a tranquil pond reflecting the sky above—a perfect place for reflection and relaxation, away from the hustle and bustle of urban life."
];
let index = 0;
let start = false;
let startTime = 0;
let time = document.getElementById("time");

function createSentence(size) {
	startTime = size + 1;
	time.innerText = `${60 * startTime}`;
	sentenceHolder = document.getElementById("sentence");
	sentenceHolder.innerHTML = "";
	for (let i = 0; i < SENTENCES[size].length; ++i) {
		let letter = document.createElement("span");
		letter.textContent = SENTENCES[size][i];
		letter.id = `${i}`;
		letter.classList.add("letters");
		sentenceHolder.appendChild(letter);
	}
}

function startTimer() {
	const MINUTE_IN_SECONDS = 60;
	const SECOND_IN_MILLISECONDS = 1000;
	let elapsed = MINUTE_IN_SECONDS * startTime;
	timeInterval = setInterval(() => {
		--elapsed;
		let seconds = String(elapsed % MINUTE_IN_SECONDS).padStart(2, '0');
		time.innerText = `${seconds}`;
		if (elapsed < 1) {
			clearInterval(timeInterval);
			return;
		}
	}, SECOND_IN_MILLISECONDS);

}

function checkCompletion() {
	if (index === SENTENCES[0].length) {
		console.log("Sentence typed correctly!");
		alert("Well done! You typed the sentence correctly.");
	}
}

function startGame() {
	document.addEventListener("keydown", function (event) {
		const excludedKeys = ['shift', 'tab', 'control', 'alt', 'meta', 'enter', 'capslock', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
		if (index >= SENTENCES[0].length ||
			excludedKeys.includes(event.key.toLowerCase())) {
			return;
		}
		
		if (!start) {
			start = true;
			startTimer();
		}
		
		let letter = document.getElementById(index);
		if (event.key === SENTENCES[0][index]) {
			letter.classList.remove("orange", "red");
			checkCompletion();
			++index;
			document.getElementById(index).classList.add("orange");
		} else {
			letter.classList.add("red");
		}
	});
}

startGame();
