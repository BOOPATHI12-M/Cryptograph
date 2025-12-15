package com.cryptolearn.controller;

import com.cryptolearn.entity.History;
import com.cryptolearn.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class HistoryController {
    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveHistory(@RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.parseLong(request.get("userId").toString());
            String algorithm = request.get("algorithm").toString();
            String inputText = request.get("inputText").toString();
            String outputText = request.get("outputText").toString();
            String keyUsed = request.get("keyUsed") != null ? request.get("keyUsed").toString() : null;
            String operationType = request.get("operationType") != null ? 
                request.get("operationType").toString() : "ENCRYPT";

            History history = historyService.saveHistory(userId, algorithm, inputText, outputText, keyUsed, operationType);
            return ResponseEntity.ok(Map.of("message", "History saved successfully", "id", history.getId().toString()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<History>> getUserHistory(@PathVariable Long userId) {
        try {
            List<History> history = historyService.getUserHistory(userId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{userId}/algorithm/{algorithm}")
    public ResponseEntity<List<History>> getUserHistoryByAlgorithm(
            @PathVariable Long userId,
            @PathVariable String algorithm) {
        try {
            List<History> history = historyService.getUserHistoryByAlgorithm(userId, algorithm);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{userId}/stats")
    public ResponseEntity<Map<String, Long>> getAlgorithmUsageStats(@PathVariable Long userId) {
        try {
            Map<String, Long> stats = historyService.getAlgorithmUsageStats(userId);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
