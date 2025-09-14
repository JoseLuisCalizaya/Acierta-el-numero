package com.example.guessinggame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @Autowired
    private GameService gameService;

    // Endpoint para iniciar un nuevo juego
    @PostMapping("/start")
    public Map<String, String> startNewGame() {
        gameService.startNewGame();
        return Map.of("message", "Nuevo juego iniciado. ¡Adivina un número entre 1 y 100!");
    }

    // Endpoint para procesar un intento
    @PostMapping("/guess")
    public Map<String, String> makeGuess(@RequestBody Map<String, Integer> payload) {
        int guess = payload.get("number");
        String result = gameService.checkGuess(guess);
        return Map.of("message", result);
    }
}

