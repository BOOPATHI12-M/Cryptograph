package com.cryptolearn.controller;

import com.cryptolearn.service.CryptoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/crypto")
@CrossOrigin(origins = "*")
public class CryptoController {
    private final CryptoService cryptoService;

    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    // Caesar Cipher
    @PostMapping("/caesar/encrypt")
    public ResponseEntity<Map<String, String>> caesarEncrypt(@RequestBody Map<String, Object> request) {
        String plaintext = request.get("plaintext").toString();
        int shift = Integer.parseInt(request.get("shift").toString());
        return ResponseEntity.ok(cryptoService.caesarEncrypt(plaintext, shift));
    }

    @PostMapping("/caesar/decrypt")
    public ResponseEntity<Map<String, String>> caesarDecrypt(@RequestBody Map<String, Object> request) {
        String ciphertext = request.get("ciphertext").toString();
        int shift = Integer.parseInt(request.get("shift").toString());
        return ResponseEntity.ok(Map.of("plaintext", cryptoService.caesarDecrypt(ciphertext, shift)));
    }

    // Vigenère Cipher
    @PostMapping("/vigenere/encrypt")
    public ResponseEntity<Map<String, String>> vigenereEncrypt(@RequestBody Map<String, Object> request) {
        String plaintext = request.get("plaintext").toString();
        String key = request.get("key").toString();
        return ResponseEntity.ok(cryptoService.vigenereEncrypt(plaintext, key));
    }

    @PostMapping("/vigenere/decrypt")
    public ResponseEntity<Map<String, String>> vigenereDecrypt(@RequestBody Map<String, Object> request) {
        String ciphertext = request.get("ciphertext").toString();
        String key = request.get("key").toString();
        return ResponseEntity.ok(Map.of("plaintext", cryptoService.vigenereDecrypt(ciphertext, key)));
    }

    // Playfair Cipher
    @PostMapping("/playfair/encrypt")
    public ResponseEntity<Map<String, String>> playfairEncrypt(@RequestBody Map<String, Object> request) {
        String plaintext = request.get("plaintext").toString();
        String key = request.get("key").toString();
        return ResponseEntity.ok(cryptoService.playfairEncrypt(plaintext, key));
    }

    @PostMapping("/playfair/decrypt")
    public ResponseEntity<Map<String, String>> playfairDecrypt(@RequestBody Map<String, Object> request) {
        String ciphertext = request.get("ciphertext").toString();
        String key = request.get("key").toString();
        return ResponseEntity.ok(Map.of("plaintext", cryptoService.playfairDecrypt(ciphertext, key)));
    }

    // RSA
    @PostMapping("/rsa/generate-keys")
    public ResponseEntity<Map<String, String>> rsaGenerateKeys() {
        try {
            return ResponseEntity.ok(cryptoService.rsaGenerateKeys());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/rsa/encrypt")
    public ResponseEntity<Map<String, String>> rsaEncrypt(@RequestBody Map<String, Object> request) {
        try {
            String plaintext = request.get("plaintext").toString();
            String publicKey = request.get("publicKey").toString();
            return ResponseEntity.ok(Map.of("ciphertext", cryptoService.rsaEncrypt(plaintext, publicKey)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/rsa/decrypt")
    public ResponseEntity<Map<String, String>> rsaDecrypt(@RequestBody Map<String, Object> request) {
        try {
            String ciphertext = request.get("ciphertext").toString();
            String privateKey = request.get("privateKey").toString();
            return ResponseEntity.ok(Map.of("plaintext", cryptoService.rsaDecrypt(ciphertext, privateKey)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // AES
    @PostMapping("/aes/encrypt")
    public ResponseEntity<Map<String, String>> aesEncrypt(@RequestBody Map<String, Object> request) {
        try {
            String plaintext = request.get("plaintext").toString();
            return ResponseEntity.ok(cryptoService.aesEncrypt(plaintext));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/aes/decrypt")
    public ResponseEntity<Map<String, String>> aesDecrypt(@RequestBody Map<String, Object> request) {
        try {
            String ciphertext = request.get("ciphertext").toString();
            String key = request.get("key").toString();
            String iv = request.get("iv").toString();
            return ResponseEntity.ok(Map.of("plaintext", cryptoService.aesDecrypt(ciphertext, key, iv)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // DES
    @PostMapping("/des/encrypt")
    public ResponseEntity<Map<String, String>> desEncrypt(@RequestBody Map<String, Object> request) {
        try {
            String plaintext = request.get("plaintext").toString();
            return ResponseEntity.ok(cryptoService.desEncrypt(plaintext));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/des/decrypt")
    public ResponseEntity<Map<String, String>> desDecrypt(@RequestBody Map<String, Object> request) {
        try {
            String ciphertext = request.get("ciphertext").toString();
            String key = request.get("key").toString();
            String iv = request.get("iv").toString();
            return ResponseEntity.ok(Map.of("plaintext", cryptoService.desDecrypt(ciphertext, key, iv)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}

