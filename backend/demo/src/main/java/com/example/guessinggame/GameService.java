package com.example.guessinggame;

import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class GameService {

    private int secretNumber;
    private final Random random = new Random();

    public GameService() {
        startNewGame();
    }

    public void startNewGame() {
        // Genera un número aleatorio entre 1 y 100
        this.secretNumber = random.nextInt(100) + 1;
        System.out.println("Nuevo número secreto generado: " + this.secretNumber); // Para depuración
    }

    public String checkGuess(int guess) {
        if (guess < this.secretNumber) {
            return "¡El número es mayor! Vuelve a intentarlo.";
        } else if (guess > this.secretNumber) {
            return "¡El número es menor! Vuelve a intentarlo.";
        } else {
            return "¡Felicidades! El número era " + this.secretNumber;
        }
    }
}

