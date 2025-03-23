let sentence = "Write this sentence";
sentenceHolder = document.getElementById("sentence");
for (let i = 0; i < sentence.length; ++i) {
	let letter = document.createElement("span");
	letter.textContent = sentence[i];
	letter.id = `${i}`;
	letter.classList.add("letters");
	sentenceHolder.appendChild(letter);
}

let index = 0;

document.addEventListener("keydown", function (event) {
	if (index >= sentence.length) return;
	let letter = document.getElementById(index);
	if (index > 0) {
		document.getElementById(index - 1).classList.remove("green");
	}
	letter.classList.remove("green", "red");
	if (event.key === sentence[index]) {
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



