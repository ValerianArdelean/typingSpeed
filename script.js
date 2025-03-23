const sentences = [
	"Typing is an essential skill in the modern world, where digital communication is ubiquitous; by practicing regularly, you can greatly improve your speed and accuracy, which will benefit you in both personal and professional contexts.",
	"The old library, with its towering shelves filled with dusty tomes and ancient manuscripts, was a treasure trove of knowledge; scholars from around the world would travel great distances to study its rare collections, spending hours poring over fragile pages, deciphering faded scripts, and uncovering secrets of the past that had been forgotten for centuries.",
	"In the heart of the city, amidst the bustling streets and towering skyscrapers, there lies a small park, a hidden gem where nature thrives; here, one can find solace from the chaos, with trees providing shade, flowers blooming in vibrant colors, birds singing cheerfully, and a tranquil pond reflecting the sky above—a perfect place for reflection and relaxation, away from the hustle and bustle of urban life."
];

function createSentence() {
	sentenceHolder = document.getElementById("sentence");
	for (let i = 0; i < sentences[0].length; ++i) {
		let letter = document.createElement("span");
		letter.textContent = sentences[0][i];
		letter.id = `${i}`;
		letter.classList.add("letters");
		sentenceHolder.appendChild(letter);
	}
}


let index = 230;
document.addEventListener("keydown", function (event) {
	if (index >= sentences[0].length) return;
	let letter = document.getElementById(index);
	if (index > 0) {
		document.getElementById(index - 1).classList.remove("green");
	}
	letter.classList.remove("green", "red");
	if (event.key === sentences[0][index]) {
		letter.classList.add("green");
		++index;
		checkCompletion();
	} else {
		letter.classList.add("red");
	}
});

function checkCompletion() {
	if (index === sentence.length) {
		console.log("Sentence typed correctly!");
		alert("Well done! You typed the sentence correctly.");
	}
}



