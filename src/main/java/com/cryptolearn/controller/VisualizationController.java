package com.cryptolearn.controller;

import com.cryptolearn.service.VisualizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/visualize")
@CrossOrigin(origins = "*")
public class VisualizationController {
    private final VisualizationService visualizationService;

    public VisualizationController(VisualizationService visualizationService) {
        this.visualizationService = visualizationService;
    }

    @GetMapping("/CAESAR")
    public ResponseEntity<Map<String, Object>> visualizeCaesar(
            @RequestParam String plaintext,
            @RequestParam(defaultValue = "3") int shift) {
        try {
            Map<String, Object> result = visualizationService.visualizeCaesar(plaintext, shift);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/AES")
    public ResponseEntity<Map<String, Object>> visualizeAES(@RequestParam String plaintext) {
        try {
            Map<String, Object> result = visualizationService.visualizeAES(plaintext);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/RSA")
    public ResponseEntity<Map<String, Object>> visualizeRSA(@RequestParam String plaintext) {
        try {
            Map<String, Object> result = visualizationService.visualizeRSA(plaintext);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
