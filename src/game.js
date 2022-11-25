const hangmanImg = document.querySelector('#hangman-img');
const result = document.querySelector('.task');
const hint = document.querySelector('.hint');
const letters = document.querySelector('.letters');

let word;

// Presetup
(() => {
    for (i = 97; i < 123; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = String.fromCharCode(i).toUpperCase();
        letters.appendChild(span)
    }
    getWord();
    const letterGrp = document.querySelectorAll('.letter');
    Array.from(letterGrp).map(letter => {
        letter.addEventListener('click', checkValue);
    })
})();

async function getWord() {
    p = new Promise((resolve, reject) => {
        setTimeout(() => { resolve("A word that has some meanings to it") }, 1000)
    })
    const response = await p;
    setText('welcome', response)
}

function setText(text, meaning) {
    hint.textContent = meaning;
    word = Array.from(text.toUpperCase())
    word.map(x => {
        result.textContent += '_'
    })
}

function checkValue(e) {
    const character = e.target.textContent;
    a = result.textContent.split("");
    let found = false;
    for (i = 0; i < word.length; i++) {
        if (character === word[i]) {
            console.log('match')
            e.target.style.backgroundColor = 'green';
            console.log(e.target)
            a[i] = character;
            found = true;
        }
    }
    if(!found) e.target.style.backgroundColor = 'red'
    result.textContent = a.join("");
}