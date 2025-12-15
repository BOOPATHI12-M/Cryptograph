package com.cryptolearn.service;

import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@Service
public class CryptoService {

    // Caesar Cipher
    public Map<String, String> caesarEncrypt(String plaintext, int shift) {
        StringBuilder ciphertext = new StringBuilder();
        for (char c : plaintext.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                char shifted = (char) ((c - base + shift) % 26 + base);
                ciphertext.append(shifted);
            } else {
                ciphertext.append(c);
            }
        }
        Map<String, String> result = new HashMap<>();
        result.put("ciphertext", ciphertext.toString());
        result.put("shift", String.valueOf(shift));
        return result;
    }

    public String caesarDecrypt(String ciphertext, int shift) {
        return caesarEncrypt(ciphertext, 26 - shift).get("ciphertext");
    }

    // Vigenère Cipher
    public Map<String, String> vigenereEncrypt(String plaintext, String key) {
        StringBuilder ciphertext = new StringBuilder();
        key = key.toUpperCase();
        int keyIndex = 0;
        
        for (char c : plaintext.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                int shift = key.charAt(keyIndex % key.length()) - 'A';
                char shifted = (char) ((c - base + shift) % 26 + base);
                ciphertext.append(shifted);
                keyIndex++;
            } else {
                ciphertext.append(c);
            }
        }
        
        Map<String, String> result = new HashMap<>();
        result.put("ciphertext", ciphertext.toString());
        result.put("key", key);
        return result;
    }

    public String vigenereDecrypt(String ciphertext, String key) {
        StringBuilder plaintext = new StringBuilder();
        key = key.toUpperCase();
        int keyIndex = 0;
        
        for (char c : ciphertext.toCharArray()) {
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                int shift = key.charAt(keyIndex % key.length()) - 'A';
                char shifted = (char) ((c - base - shift + 26) % 26 + base);
                plaintext.append(shifted);
                keyIndex++;
            } else {
                plaintext.append(c);
            }
        }
        
        return plaintext.toString();
    }

    // Playfair Cipher
    public Map<String, String> playfairEncrypt(String plaintext, String key) {
        char[][] matrix = generatePlayfairMatrix(key);
        String processedText = preparePlayfairText(plaintext);
        StringBuilder ciphertext = new StringBuilder();
        
        for (int i = 0; i < processedText.length(); i += 2) {
            char char1 = processedText.charAt(i);
            char char2 = processedText.charAt(i + 1);
            int[] pos1 = findPosition(matrix, char1);
            int[] pos2 = findPosition(matrix, char2);
            
            if (pos1[0] == pos2[0]) { // Same row
                ciphertext.append(matrix[pos1[0]][(pos1[1] + 1) % 5]);
                ciphertext.append(matrix[pos2[0]][(pos2[1] + 1) % 5]);
            } else if (pos1[1] == pos2[1]) { // Same column
                ciphertext.append(matrix[(pos1[0] + 1) % 5][pos1[1]]);
                ciphertext.append(matrix[(pos2[0] + 1) % 5][pos2[1]]);
            } else { // Rectangle
                ciphertext.append(matrix[pos1[0]][pos2[1]]);
                ciphertext.append(matrix[pos2[0]][pos1[1]]);
            }
        }
        
        Map<String, String> result = new HashMap<>();
        result.put("ciphertext", ciphertext.toString());
        result.put("key", key.toUpperCase());
        return result;
    }

    public String playfairDecrypt(String ciphertext, String key) {
        char[][] matrix = generatePlayfairMatrix(key);
        StringBuilder plaintext = new StringBuilder();
        
        for (int i = 0; i < ciphertext.length(); i += 2) {
            char char1 = ciphertext.charAt(i);
            char char2 = ciphertext.charAt(i + 1);
            int[] pos1 = findPosition(matrix, char1);
            int[] pos2 = findPosition(matrix, char2);
            
            if (pos1[0] == pos2[0]) { // Same row
                plaintext.append(matrix[pos1[0]][(pos1[1] + 4) % 5]);
                plaintext.append(matrix[pos2[0]][(pos2[1] + 4) % 5]);
            } else if (pos1[1] == pos2[1]) { // Same column
                plaintext.append(matrix[(pos1[0] + 4) % 5][pos1[1]]);
                plaintext.append(matrix[(pos2[0] + 4) % 5][pos2[1]]);
            } else { // Rectangle
                plaintext.append(matrix[pos1[0]][pos2[1]]);
                plaintext.append(matrix[pos2[0]][pos1[1]]);
            }
        }
        
        return plaintext.toString();
    }

    private char[][] generatePlayfairMatrix(String key) {
        key = key.toUpperCase().replaceAll("[^A-Z]", "").replace("J", "I");
        boolean[] used = new boolean[26];
        char[][] matrix = new char[5][5];
        int row = 0, col = 0;
        
        // Add key characters
        for (char c : key.toCharArray()) {
            if (!used[c - 'A'] && c != 'J') {
                matrix[row][col] = c;
                used[c - 'A'] = true;
                col++;
                if (col == 5) {
                    col = 0;
                    row++;
                }
            }
        }
        
        // Add remaining alphabet
        for (char c = 'A'; c <= 'Z'; c++) {
            if (c != 'J' && !used[c - 'A']) {
                matrix[row][col] = c;
                col++;
                if (col == 5) {
                    col = 0;
                    row++;
                }
            }
        }
        
        return matrix;
    }

    private String preparePlayfairText(String text) {
        text = text.toUpperCase().replaceAll("[^A-Z]", "").replace("J", "I");
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            result.append(text.charAt(i));
            if (i < text.length() - 1 && text.charAt(i) == text.charAt(i + 1)) {
                result.append('X');
            }
        }
        if (result.length() % 2 != 0) {
            result.append('X');
        }
        return result.toString();
    }

    private int[] findPosition(char[][] matrix, char c) {
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                if (matrix[i][j] == c) {
                    return new int[]{i, j};
                }
            }
        }
        return new int[]{0, 0};
    }

    // RSA
    public Map<String, String> rsaGenerateKeys() throws Exception {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();
        
        Map<String, String> keys = new HashMap<>();
        keys.put("publicKey", Base64.getEncoder().encodeToString(publicKey.getEncoded()));
        keys.put("privateKey", Base64.getEncoder().encodeToString(privateKey.getEncoded()));
        return keys;
    }

    public String rsaEncrypt(String plaintext, String publicKeyBase64) throws Exception {
        byte[] publicKeyBytes = Base64.getDecoder().decode(publicKeyBase64);
        java.security.spec.X509EncodedKeySpec keySpec = new java.security.spec.X509EncodedKeySpec(publicKeyBytes);
        java.security.KeyFactory keyFactory = java.security.KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyFactory.generatePublic(keySpec);
        
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        byte[] encrypted = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
        
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public String rsaDecrypt(String ciphertext, String privateKeyBase64) throws Exception {
        byte[] privateKeyBytes = Base64.getDecoder().decode(privateKeyBase64);
        java.security.spec.PKCS8EncodedKeySpec keySpec = new java.security.spec.PKCS8EncodedKeySpec(privateKeyBytes);
        java.security.KeyFactory keyFactory = java.security.KeyFactory.getInstance("RSA");
        PrivateKey privateKey = keyFactory.generatePrivate(keySpec);
        
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
        
        return new String(decrypted, StandardCharsets.UTF_8);
    }

    // AES
    public Map<String, String> aesEncrypt(String plaintext) throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        keyGenerator.init(256);
        SecretKey secretKey = keyGenerator.generateKey();
        
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] iv = cipher.getIV();
        byte[] encrypted = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
        
        Map<String, String> result = new HashMap<>();
        result.put("ciphertext", Base64.getEncoder().encodeToString(encrypted));
        result.put("key", Base64.getEncoder().encodeToString(secretKey.getEncoded()));
        result.put("iv", Base64.getEncoder().encodeToString(iv));
        return result;
    }

    public String aesDecrypt(String ciphertext, String keyBase64, String ivBase64) throws Exception {
        SecretKey secretKey = new SecretKeySpec(Base64.getDecoder().decode(keyBase64), "AES");
        IvParameterSpec iv = new IvParameterSpec(Base64.getDecoder().decode(ivBase64));
        
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, iv);
        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
        
        return new String(decrypted, StandardCharsets.UTF_8);
    }

    // DES
    public Map<String, String> desEncrypt(String plaintext) throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("DES");
        SecretKey secretKey = keyGenerator.generateKey();
        
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] iv = cipher.getIV();
        byte[] encrypted = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
        
        Map<String, String> result = new HashMap<>();
        result.put("ciphertext", Base64.getEncoder().encodeToString(encrypted));
        result.put("key", Base64.getEncoder().encodeToString(secretKey.getEncoded()));
        result.put("iv", Base64.getEncoder().encodeToString(iv));
        return result;
    }

    public String desDecrypt(String ciphertext, String keyBase64, String ivBase64) throws Exception {
        SecretKey secretKey = new SecretKeySpec(Base64.getDecoder().decode(keyBase64), "DES");
        IvParameterSpec iv = new IvParameterSpec(Base64.getDecoder().decode(ivBase64));
        
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey, iv);
        byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(ciphertext));
        
        return new String(decrypted, StandardCharsets.UTF_8);
    }

    // Visualization Methods - Step-by-step transformations
    
    /**
     * Get step-by-step visualization for Caesar Cipher encryption
     */
    public Map<String, Object> getCaesarVisualization(String plaintext, int shift) {
        Map<String, Object> visualization = new HashMap<>();
        List<Map<String, Object>> steps = new ArrayList<>();
        
        for (int i = 0; i < plaintext.length(); i++) {
            char c = plaintext.charAt(i);
            Map<String, Object> step = new HashMap<>();
            
            if (Character.isLetter(c)) {
                char base = Character.isUpperCase(c) ? 'A' : 'a';
                int originalPos = c - base;
                int newPos = (originalPos + shift) % 26;
                char shifted = (char) (newPos + base);
                
                step.put("position", i);
                step.put("originalChar", String.valueOf(c));
                step.put("originalPosition", originalPos);
                step.put("shift", shift);
                step.put("newPosition", newPos);
                step.put("newChar", String.valueOf(shifted));
                step.put("formula", String.format("(%d + %d) mod 26 = %d", originalPos, shift, newPos));
            } else {
                step.put("position", i);
                step.put("originalChar", String.valueOf(c));
                step.put("newChar", String.valueOf(c));
                step.put("note", "Non-letter character, unchanged");
            }
            
            steps.add(step);
        }
        
        visualization.put("algorithm", "Caesar Cipher");
        visualization.put("plaintext", plaintext);
        visualization.put("shift", shift);
        visualization.put("steps", steps);
        visualization.put("result", caesarEncrypt(plaintext, shift).get("ciphertext"));
        
        return visualization;
    }

    /**
     * Get step-by-step visualization for AES encryption (simplified)
     */
    public Map<String, Object> getAESVisualization(String plaintext) {
        Map<String, Object> visualization = new HashMap<>();
        List<Map<String, String>> steps = new ArrayList<>();
        
        // Simulate AES steps
        Map<String, String> step1 = new HashMap<>();
        step1.put("step", "1. SubBytes");
        step1.put("description", "Substitute each byte using S-box");
        step1.put("state", "Substituted bytes");
        steps.add(step1);
        
        Map<String, String> step2 = new HashMap<>();
        step2.put("step", "2. ShiftRows");
        step2.put("description", "Shift rows cyclically");
        step2.put("state", "Rows shifted");
        steps.add(step2);
        
        Map<String, String> step3 = new HashMap<>();
        step3.put("step", "3. MixColumns");
        step3.put("description", "Mix columns using matrix multiplication");
        step3.put("state", "Columns mixed");
        steps.add(step3);
        
        Map<String, String> step4 = new HashMap<>();
        step4.put("step", "4. AddRoundKey");
        step4.put("description", "XOR with round key");
        step4.put("state", "Round key added");
        steps.add(step4);
        
        visualization.put("algorithm", "AES");
        visualization.put("plaintext", plaintext);
        visualization.put("steps", steps);
        visualization.put("blockSize", "128 bits");
        visualization.put("rounds", "10 (for 128-bit key)");
        
        return visualization;
    }

    /**
     * Get visualization for RSA key generation and encryption
     */
    public Map<String, Object> getRSAVisualization(String plaintext) {
        Map<String, Object> visualization = new HashMap<>();
        List<Map<String, String>> steps = new ArrayList<>();
        
        Map<String, String> step1 = new HashMap<>();
        step1.put("step", "1. Key Generation");
        step1.put("description", "Generate two large prime numbers p and q");
        step1.put("formula", "n = p × q, φ(n) = (p-1)(q-1)");
        steps.add(step1);
        
        Map<String, String> step2 = new HashMap<>();
        step2.put("step", "2. Public Key");
        step2.put("description", "Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1");
        step2.put("formula", "Public Key: (e, n)");
        steps.add(step2);
        
        Map<String, String> step3 = new HashMap<>();
        step3.put("step", "3. Private Key");
        step3.put("description", "Calculate d such that e × d ≡ 1 (mod φ(n))");
        step3.put("formula", "Private Key: (d, n)");
        steps.add(step3);
        
        Map<String, String> step4 = new HashMap<>();
        step4.put("step", "4. Encryption");
        step4.put("description", "Convert message to number m, then compute c = m^e mod n");
        step4.put("formula", "ciphertext = plaintext^e mod n");
        steps.add(step4);
        
        Map<String, String> step5 = new HashMap<>();
        step5.put("step", "5. Decryption");
        step5.put("description", "Compute m = c^d mod n");
        step5.put("formula", "plaintext = ciphertext^d mod n");
        steps.add(step5);
        
        visualization.put("algorithm", "RSA");
        visualization.put("plaintext", plaintext);
        visualization.put("steps", steps);
        visualization.put("keySize", "2048 bits");
        visualization.put("security", "Based on difficulty of factoring large numbers");
        
        return visualization;
    }
}

