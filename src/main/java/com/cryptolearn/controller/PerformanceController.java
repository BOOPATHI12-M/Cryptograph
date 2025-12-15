package com.cryptolearn.controller;

import com.cryptolearn.entity.PerformanceLog;
import com.cryptolearn.service.PerformanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/performance")
@CrossOrigin(origins = "*")
public class PerformanceController {
    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }

    @PostMapping("/log")
    public ResponseEntity<Map<String, String>> logPerformance(@RequestBody Map<String, Object> request) {
        try {
            String algorithm = request.get("algorithm").toString();
            Long executionTime = Long.parseLong(request.get("executionTime").toString());
            Integer inputSize = request.get("inputSize") != null ? 
                Integer.parseInt(request.get("inputSize").toString()) : null;
            String operationType = request.get("operationType") != null ? 
                request.get("operationType").toString() : "ENCRYPT";

            PerformanceLog log = performanceService.logPerformance(algorithm, executionTime, inputSize, operationType);
            return ResponseEntity.ok(Map.of("message", "Performance logged successfully", "id", log.getId().toString()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/compare")
    public ResponseEntity<Map<String, Object>> getPerformanceComparison() {
        try {
            Map<String, Object> comparison = performanceService.getPerformanceComparison();
            return ResponseEntity.ok(comparison);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
