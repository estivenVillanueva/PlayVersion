        const wheel = document.getElementById('wheel');
        const playerButtons = document.querySelectorAll('.player-btn');
        const playerScores = document.getElementById('playerScores');
        let currentPlayer = 1;
        let numberOfPlayers = 0;
        let players = [];

        // Configurar los botones de selección de jugadores
        playerButtons.forEach(button => {
            button.addEventListener('click', () => {
                numberOfPlayers = parseInt(button.dataset.players);
                setupGame(numberOfPlayers);
                playerButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        function setupGame(num) {
            players = Array.from({length: num}, (_, i) => ({
                id: i + 1,
                score: 0
            }));
            updateScoreDisplay();
        }

        function updateScoreDisplay() {
            playerScores.innerHTML = players.map(player => `
                <div class="player-score">
                    <h3>Player ${player.id}</h3>
                    <p>Score: ${player.score}</p>
                </div>
            `).join('');
        }

        // Configurar la ruleta
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const anglePerLetter = 350 / letters.length;

        letters.split('').forEach((letter, index) => {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            letterDiv.textContent = letter;
            letterDiv.style.transform = `rotate(${index * anglePerLetter}deg) translate(-50%, 100%)`;
            wheel.appendChild(letterDiv);
        });

        wheel.addEventListener('click', () => {
            if (numberOfPlayers === 0) {
                alert('Please select number of players first!');
                return;
            }
            
            const rotation = 1800 + Math.random() * 360;
            wheel.style.transform = `rotate(${rotation}deg)`;
            
            // Calcular la letra seleccionada y redirigir después de la animación
            setTimeout(() => {
                const finalRotation = rotation % 360;
                const letterIndex = Math.floor(finalRotation / anglePerLetter);
                const selectedLetter = letters[letterIndex];
                
                // Redirigir a la página del juego
                window.location.href = `game.html?letter=${selectedLetter}&player=1&players=${numberOfPlayers}`;
            }, 3000); // Esperar a que termine la animación de la ruleta
        });
    