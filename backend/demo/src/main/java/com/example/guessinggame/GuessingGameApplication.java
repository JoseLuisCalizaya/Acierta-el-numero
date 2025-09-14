package com.example.guessinggame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Esta anotación le dice a Spring Boot que esta es la clase principal
@SpringBootApplication
public class GuessingGameApplication {

    // Este es el "botón de arranque" que ejecuta todo
    public static void main(String[] args) {
        SpringApplication.run(GuessingGameApplication.class, args);
    }
}
