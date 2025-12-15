package com.cryptolearn.controller;

import com.cryptolearn.entity.Score;
import com.cryptolearn.service.ScoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "*")
public class ScoreController {
    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping
    public ResponseEntity<Score> saveScore(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long algorithmId = Long.valueOf(request.get("algorithmId").toString());
        int score = Integer.parseInt(request.get("score").toString());
        int totalQuestions = Integer.parseInt(request.get("totalQuestions").toString());
        
        return ResponseEntity.ok(scoreService.saveScore(userId, algorithmId, score, totalQuestions));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Score>> getScoresByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(scoreService.getScoresByUser(userId));
    }

    @GetMapping
    public ResponseEntity<List<Score>> getAllScores() {
        return ResponseEntity.ok(scoreService.getAllScores());
    }

    @GetMapping("/algorithm/{algorithmId}")
    public ResponseEntity<List<Score>> getScoresByAlgorithm(@PathVariable Long algorithmId) {
        return ResponseEntity.ok(scoreService.getScoresByAlgorithm(algorithmId));
    }
}

