package com.cryptolearn.controller;

import com.cryptolearn.entity.QuizQuestion;
import com.cryptolearn.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/algorithm/{algorithmId}")
    public ResponseEntity<List<QuizQuestion>> getQuestionsByAlgorithm(@PathVariable Long algorithmId) {
        return ResponseEntity.ok(quizService.getQuestionsByAlgorithm(algorithmId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizQuestion> getQuestionById(@PathVariable Long id) {
        return quizService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<QuizQuestion> createQuestion(@RequestBody QuizQuestion question) {
        return ResponseEntity.ok(quizService.createQuestion(question));
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuizQuestion> updateQuestion(@PathVariable Long id, @RequestBody QuizQuestion question) {
        try {
            return ResponseEntity.ok(quizService.updateQuestion(id, question));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteQuestion(@PathVariable Long id) {
        try {
            quizService.deleteQuestion(id);
            return ResponseEntity.ok(Map.of("message", "Question deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/submit/{algorithmId}")
    public ResponseEntity<Map<String, Object>> submitQuiz(
            @PathVariable Long algorithmId,
            @RequestBody Map<Long, String> answers) {
        int score = quizService.calculateScore(algorithmId, answers);
        return ResponseEntity.ok(Map.of(
            "score", score,
            "algorithmId", algorithmId
        ));
    }
}

