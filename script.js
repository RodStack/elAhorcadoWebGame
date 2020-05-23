const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const word = ['responsability', 'focus', 'faith', 'discipline', "effort"];

let selectedWord = word[Math.floor(Math.random() * word.length)];

const correctLetters = [];
const wrongLetters = [];





function displayWord() {
  wordEl.innerHTML = `${selectedWord.split('')
    .map(letter => 
        `<span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `
    )
  .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, ''); // reemplaza el \n break por nada toma split inner word y la transforma a string
  if(innerWord === selectedWord) {
    finalMessage.innerText = 'Felicitaciones haz Ganado :)'
    popup.style.display = 'flex'
  }
}

// Acutalizando las letras incorrectas

function updateWrongLettersEl() {
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;
  //Mostrando las figuras
   figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if(index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none'
    }
    //Comprobando si perdio
    if(wrongLetters.length === figureParts.length ) {
      finalMessage.innerText = 'Es una lastima pero perdiste :('
      popup.style.display = 'flex';
    }

    
   });
}

//Mostrar notificacion

function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');

  }, 2000);
}


//Reconociendo las entradas del teclado
window.addEventListener("keydown", e => {
  if(e.keyCode >= 65 && e.keyCode <= 90 ) {
    const letter = e.key;

    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        
        displayWord();
      }
    } else {
      if(!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//Reiniciando el Juego y el boton de volver jugar

playAgainButton.addEventListener('click', () => {
  wrongLetters.splice(0);
  correctLetters.splice(0);
  
  
  selectedWord = word[Math.floor(Math.random() * word.length)];

  displayWord();
  updateWrongLettersEl();

  popup.style.display = 'none';
});



displayWord();