// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const letter = urlParams.get('letter')?.toUpperCase() || 'A';
let currentTurnPlayer = parseInt(urlParams.get('player')) || 1;
const totalPlayers = parseInt(urlParams.get('players')) || 4;

// Establecer valores iniciales en el DOM
document.getElementById('selectedLetter').textContent = letter;
document.getElementById('currentPlayer').textContent = `Player ${currentTurnPlayer}`;

// Timer
let timeLeft = 60;
const timerElement = document.getElementById('timer');
let timerInterval;

// 🔥 Función para iniciar y reiniciar el temporizador
function startTimer() {
    clearInterval(timerInterval); // 🔴 Detener cualquier temporizador previo
    timeLeft = 60; // 🔄 Reiniciar a 60 segundos

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            wordInput.disabled = true; // 🚫 Bloquear input cuando el tiempo termine
            nextPlayer();
        }
        timeLeft--;
    }, 1000);
}

alert(`empezo el juego , jugador 1`)

// 🔥 Arreglos donde se guardan las palabras de cada jugador
const playersWords = Array.from({ length: totalPlayers }, () => []);
const allWords = new Set();

// Capturar elementos del DOM
const wordInput = document.getElementById('wordInput');
const wordsContainer = document.getElementById('wordsContainer');

// 🔥 Seleccionar automáticamente el input al cargar la página
window.onload = () => {
    wordInput.focus();
};
// ✅ **Función para mostrar todas las palabras ingresadas**
function showAllWords() {
    wordsContainer.innerHTML = ""; // 🧹 Limpiar antes de actualizar

    playersWords.forEach((words, index) => {
        if (words.length > 0) {
            const playerSection = document.createElement("div");
            playerSection.innerHTML = `<h3>Player ${index + 1}:</h3>`;

            const wordList = document.createElement("ul");
            words.forEach(word => {
                const listItem = document.createElement("li");
                listItem.textContent = word;
                wordList.appendChild(listItem);
            });

            playerSection.appendChild(wordList);
            wordsContainer.appendChild(playerSection);
        }
    });
}


// 🎯 **Manejar entrada de palabras**
wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !wordInput.disabled) { 
        const word = wordInput.value.trim().toUpperCase();

        if (!word.startsWith(letter)) {
            alert(`La palabra debe empezar con "${letter}"`);
            wordInput.value = '';
            return;
        }

        // 🚀 Revisar si la palabra ya fue usada por el mismo jugador
        const isWordUsedByCurrentPlayer = playersWords[currentTurnPlayer - 1].includes(word);

        if (isWordUsedByCurrentPlayer) {
            alert("Ya has usado esta palabra. Intenta otra diferente.");
            wordInput.value = '';
            return;
        }

        if (word) {
            playersWords[currentTurnPlayer - 1].push(word);
            showAllWords();

            wordInput.value = '';
        }
    }
});

// 🔥 **Función para pasar turno al siguiente jugador**
function nextPlayer() {
    if (currentTurnPlayer === totalPlayers) {
        showWinner();
    } else {
        alert(`Siguiente jugador`);
        currentTurnPlayer++;
        document.getElementById('currentPlayer').textContent = `Player ${currentTurnPlayer}`;
        wordInput.disabled = false; // ✅ Reactivar input para el siguiente jugador
        startTimer(); // 🔄 Reiniciar el temporizador
    }
}

// 🎉 **Función para mostrar el ganador**
function showWinner() {
    clearInterval(timerInterval);
    let maxWords = 0;
    let winnerPlayer = null;
    let resultsText = "<h2>Resultados:</h2>";

    playersWords.forEach((words, index) => {
        resultsText += `<p>Player ${index + 1}: ${words.length} palabras</p>`;
        if (words.length > maxWords) {
            maxWords = words.length;
            winnerPlayer = index + 1;
        }
    });

    resultsText += winnerPlayer 
        ? `<h1>🏆 Ganador: Player ${winnerPlayer}! 🏆</h1>` 
        : "<h1>¡Es un empate!</h1>";

    wordsContainer.innerHTML = resultsText;
}

// 🔥 **Función para reiniciar el juego**
document.getElementById('resetGame').addEventListener('click', () => {
    playersWords.forEach(arr => arr.length = 0); // Limpiar palabras
    allWords.clear();
    clearInterval(timerInterval); // Detener el temporizador
    window.location.href = 'index.html'; // Redirigir a la página principal
});

// 🔥 Iniciar el temporizador al cargar la página
startTimer();
