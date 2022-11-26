const hangmanImg = document.querySelector('#hangman-img');
const result = document.querySelector('.task');
const hint = document.querySelector('.hint');
const letters = document.querySelector('.letters');
const reloadBtn = document.querySelector('.retry');

let word, tries = 6;

// Presetup
const Presetup = () => {
    // document.querySelector('.game-view').style.display = 'none';
    letters.innerHTML = ''
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
}
Presetup();

async function getWord() {
    try {
        const p = fetch('https://random-words-api.vercel.app/word');
        let response = (await p).json();
        response = await response;
        console.log(response)
        setText(response[0].word, response[0].definition)
        const loadingAnimation = document.querySelector('.loading');
        loadingAnimation.style.display = 'none'
    }
    catch (error) {
        window.navigation.navigate('error.html');
    }
}

// sets the question text and hind
function setText(text, meaning) {
    hint.textContent = meaning;
    word = Array.from(text.toUpperCase())
    result.textContent = ''
    word.map(x => {
        result.textContent += '_'
    })
}

// check if the pressed letter is correct
// if yes, make the btn green, else make it red
function checkValue(e) {
    const character = e.target.textContent;
    a = result.textContent.split("");
    let found = false;
    for (i = 0; i < word.length; i++) {
        if (character === word[i]) {
            e.target.style.backgroundColor = 'green';
            a[i] = character;
            found = true;
            playSound('../media/audio/rightLetter.mp3');
        }
    }
    if (!found) {
        e.target.style.backgroundColor = 'red'
        wrongLetter();
    }
    result.textContent = a.join("");

    // Check if task is completed
    if (!result.textContent.includes('_')) {
        setTimeout(() => window.navigation.navigate('win.html'), 1000);
    }
}


// Runs when any letter is wrong guessed
function wrongLetter() {
    const sound = playSound('../media/audio/wrongLetter.mp3');

    tries = tries - 1;
    if (tries === 0) {
        console.log('lost')
        setTimeout(() => window.navigation.navigate('lost.html'), 1000);
    }
    const name = '../media/hangman' + (6 - tries) + '.png';
    hangmanImg.src = name;
}

reloadBtn.addEventListener('click', () => {
    window.navigation.reload();
})

// load animation

function playSound(path) {
    const sound = new Audio(path);
    sound.play();
    return sound;
}

function stopSound(sound) {
    sound.pause();
}