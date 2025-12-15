package com.cryptolearn.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VisualizationService {
    private final CryptoService cryptoService;

    public VisualizationService(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    public Map<String, Object> visualizeCaesar(String plaintext, int shift) {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> steps = new ArrayList<>();
        StringBuilder ciphertext = new StringBuilder();

        for (int i = 0; i < plaintext.length(); i++) {
            char c = plaintext.charAt(i);
            Map<String, Object> step = new HashMap<>();
            step.put("position", i + 1);
            step.put("originalChar", String.valueOf(c));

            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                int originalPosition = c - base;
                int newPosition = (originalPosition + shift) % 26;
                char newChar = (char) (newPosition + base);

                step.put("originalPosition", originalPosition);
                step.put("shift", shift);
                step.put("newPosition", newPosition);
                step.put("newChar", String.valueOf(newChar));
                step.put("formula", String.format("(%d + %d) %% 26 = %d", originalPosition, shift, newPosition));

                ciphertext.append(newChar);
            } else {
                step.put("note", "Non-letter character, no shift applied");
                ciphertext.append(c);
            }

            steps.add(step);
        }

        result.put("result", ciphertext.toString());
        result.put("steps", steps);
        return result;
    }

    public Map<String, Object> visualizeAES(String plaintext) {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> steps = new ArrayList<>();

        // Simulate AES steps
        steps.add(createStep("Key Expansion", "Generate round keys from the master key", "Key Schedule"));
        steps.add(createStep("AddRoundKey", "XOR the state with the round key", "Initial Round"));
        steps.add(createStep("SubBytes", "Substitute each byte using S-box", "Substitution"));
        steps.add(createStep("ShiftRows", "Shift rows cyclically", "Permutation"));
        steps.add(createStep("MixColumns", "Mix columns using matrix multiplication", "Diffusion"));
        steps.add(createStep("AddRoundKey", "XOR with round key", "Final Round"));

        result.put("blockSize", 128);
        result.put("rounds", 10);
        result.put("steps", steps);
        return result;
    }

    public Map<String, Object> visualizeRSA(String plaintext) {
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> steps = new ArrayList<>();

        // Simulate RSA steps
        steps.add(createStep("Key Generation", "Generate public and private key pair", "n = p × q, φ(n) = (p-1)(q-1)"));
        steps.add(createStep("Public Key", "Public key (e, n) where e is chosen such that gcd(e, φ(n)) = 1", "e = 65537"));
        steps.add(createStep("Private Key", "Private key (d, n) where d is the modular inverse of e", "d ≡ e⁻¹ (mod φ(n))"));
        steps.add(createStep("Encryption", "Convert plaintext to number and encrypt", "c ≡ m^e (mod n)"));
        steps.add(createStep("Decryption", "Decrypt ciphertext to get plaintext", "m ≡ c^d (mod n)"));

        result.put("keySize", 2048);
        result.put("security", "Very High");
        result.put("steps", steps);
        return result;
    }

    private Map<String, Object> createStep(String step, String description, String state) {
        Map<String, Object> stepMap = new HashMap<>();
        stepMap.put("step", step);
        stepMap.put("description", description);
        stepMap.put("state", state);
        return stepMap;
    }
}
