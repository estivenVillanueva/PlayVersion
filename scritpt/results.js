import { playersWords } from './game.js';

// Calculamos el jugador con más palabras
let maxWords = 0;
let winnerPlayer = null;
let resultsText = "";

Object.keys(playersWords).forEach(player => {
    const wordCount = playersWords[player].length;
    resultsText += `Jugador ${player}: ${wordCount} palabras<br>`;

    if (wordCount > maxWords) {
        maxWords = wordCount;
        winnerPlayer = player;
    }
});

// Mostrar los resultados en `results.html`
document.getElementById('results').innerHTML = resultsText;
document.getElementById('winner').textContent = 
    winnerPlayer ? `🏆 ¡Ganador: Jugador ${winnerPlayer}! 🏆` : "No hay ganador.";

// Botón para reiniciar juego
document.getElementById('restartButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});
