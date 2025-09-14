import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('¡Adivina un número entre 1 y 100!');
  const [isGameOver, setIsGameOver] = useState(false);

  // Función para iniciar un nuevo juego
  const startNewGame = async () => {
    try {
      // Llama a la API del backend para iniciar un nuevo juego
      const response = await fetch('http://localhost:8080/api/game/start', {
        method: 'POST',
      });
      const data = await response.json();
      setMessage(data.message);
      setGuess('');
      setIsGameOver(false);
    } catch (error) {
      console.error('Error al iniciar un nuevo juego:', error);
      setMessage('Error de conexión con el servidor. ¿Está encendido?');
    }
  };

  // Se ejecuta una vez cuando el componente se carga por primera vez
  useEffect(() => {
    startNewGame();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guess || isGameOver) return;

    try {
      const response = await fetch('http://localhost:8080/api/game/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: parseInt(guess, 10) }),
      });
      const data = await response.json();
      
      setMessage(data.message);
      setGuess('');

      // Si el mensaje contiene "Felicidades", el juego ha terminado
      if (data.message.includes('Felicidades')) {
        setIsGameOver(true);
      }
    } catch (error) {
      console.error('Error al enviar el intento:', error);
      setMessage('No se pudo enviar tu intento. Revisa la conexión.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Adivina el Número que Pienso</h1>
        <p className="message">{message}</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Escribe tu número"
            disabled={isGameOver}
            className="guess-input"
          />
          <button type="submit" disabled={isGameOver} className="guess-button">
            ¡Adivinar!
          </button>
        </form>

        {isGameOver && (
          <button onClick={startNewGame} className="new-game-button">
            Nuevo Juego
          </button>
        )}
      </header>
    </div>
  );
}

export default App;

