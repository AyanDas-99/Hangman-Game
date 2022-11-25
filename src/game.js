const hangmanImg = document.querySelector('#hangman-img');
const result = document.querySelector('.task');
const hint = document.querySelector('.hint');
const letters = document.querySelector('.letters');

// Presetup
(() => {
    for (i = 97; i < 123; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = String.fromCharCode(i).toUpperCase();
        letters.appendChild(span)
    }

    console.log(getWord())
})();


async function getWord() {
    const URL = 'https://random-words-api.vercel.app/word'
    const response = fetch(URL);
    let value = await (await response).json();
    value = await value;
    console.log(value)
}