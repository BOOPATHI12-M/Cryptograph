package com.cryptolearn.controller;

import com.cryptolearn.entity.Algorithm;
import com.cryptolearn.service.AlgorithmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/algorithms")
@CrossOrigin(origins = "*")
public class AlgorithmController {
    private final AlgorithmService algorithmService;

    public AlgorithmController(AlgorithmService algorithmService) {
        this.algorithmService = algorithmService;
    }

    @GetMapping
    public ResponseEntity<List<Algorithm>> getAllAlgorithms() {
        return ResponseEntity.ok(algorithmService.getAllAlgorithms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Algorithm> getAlgorithmById(@PathVariable Long id) {
        return algorithmService.getAlgorithmById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Algorithm> createAlgorithm(@RequestBody Algorithm algorithm) {
        return ResponseEntity.ok(algorithmService.createAlgorithm(algorithm));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Algorithm> updateAlgorithm(@PathVariable Long id, @RequestBody Algorithm algorithm) {
        try {
            return ResponseEntity.ok(algorithmService.updateAlgorithm(id, algorithm));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteAlgorithm(@PathVariable Long id) {
        try {
            algorithmService.deleteAlgorithm(id);
            return ResponseEntity.ok(Map.of("message", "Algorithm deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}

