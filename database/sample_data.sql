-- Sample Data for Cryptography Learning Application

-- Insert Admin User (password: admin123)
INSERT OR IGNORE INTO users (username, password, email, role) VALUES 
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwK8pJ/2', 'admin@cryptolearn.com', 'ADMIN');

-- Insert Demo Student (password: student123)
INSERT OR IGNORE INTO users (username, password, email, role) VALUES 
('student', '$2a$10$8K1p/a0dL1A0q3Z5b5K5Ze5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K', 'student@cryptolearn.com', 'STUDENT');

-- Insert Algorithms
INSERT OR IGNORE INTO algorithms (name, theory, steps, example, formula, type) VALUES 
('Caesar Cipher', 
 'The Caesar Cipher is one of the earliest and simplest encryption techniques. Named after Julius Caesar, who used it to communicate with his generals, it is a type of substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet.',
 '1. Choose a shift value (key) between 1-25\n2. For each letter in the plaintext, shift it by the key value\n3. Wrap around if the shift goes beyond Z (or z)\n4. Non-alphabetic characters remain unchanged',
 'Plaintext: HELLO, Shift: 3 → Ciphertext: KHOOR',
 'E(x) = (x + k) mod 26\nD(x) = (x - k) mod 26\nwhere x is the letter position and k is the shift key',
 'SUBSTITUTION');

INSERT OR IGNORE INTO algorithms (name, theory, steps, example, formula, type) VALUES 
('Vigenère Cipher',
 'The Vigenère Cipher is a method of encrypting alphabetic text using a series of interwoven Caesar ciphers based on the letters of a keyword. It is more secure than the Caesar Cipher because it uses multiple shift values.',
 '1. Choose a keyword\n2. Repeat the keyword to match the length of the plaintext\n3. For each letter, apply Caesar Cipher with the corresponding keyword letter as the shift\n4. The shift value is the position of the keyword letter in the alphabet',
 'Plaintext: ATTACK, Key: KEY → Ciphertext: KXEYKY',
 'C_i = (P_i + K_i) mod 26\nP_i = (C_i - K_i) mod 26\nwhere C is ciphertext, P is plaintext, and K is the key',
 'SUBSTITUTION');

INSERT OR IGNORE INTO algorithms (name, theory, steps, example, formula, type) VALUES 
('Playfair Cipher',
 'The Playfair Cipher encrypts pairs of letters (digraphs) instead of single letters, making it more secure than simple substitution ciphers. It uses a 5x5 grid filled with a keyword.',
 '1. Create a 5x5 matrix using a keyword (I and J share the same cell)\n2. Split plaintext into pairs of letters\n3. Apply rules: same row (shift right), same column (shift down), rectangle (swap columns)\n4. If a pair has the same letter, insert X between them',
 'Plaintext: HELLO, Key: MONARCHY → Ciphertext: DMYAR',
 'Encryption rules based on position in 5x5 matrix:\n- Same row: shift right\n- Same column: shift down\n- Rectangle: swap columns',
 'SUBSTITUTION');

INSERT OR IGNORE INTO algorithms (name, theory, steps, example, formula, type) VALUES 
('RSA',
 'RSA (Rivest-Shamir-Adleman) is a public-key cryptosystem widely used for secure data transmission. It uses two keys: a public key for encryption and a private key for decryption. The security is based on the difficulty of factoring large integers.',
 '1. Generate two large prime numbers p and q\n2. Calculate n = p × q and φ(n) = (p-1)(q-1)\n3. Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1\n4. Calculate d such that e × d ≡ 1 (mod φ(n))\n5. Public key: (n, e), Private key: (n, d)\n6. Encrypt: c = m^e mod n\n7. Decrypt: m = c^d mod n',
 'p=3, q=11, n=33, e=3, d=7\nPlaintext: 5 → Ciphertext: 26',
 'Encryption: c ≡ m^e (mod n)\nDecryption: m ≡ c^d (mod n)\nwhere m is message, c is ciphertext, (n,e) is public key, (n,d) is private key',
 'ASYMMETRIC');

INSERT OR IGNORE INTO algorithms (name, theory, steps, example, formula, type) VALUES 
('AES',
 'Advanced Encryption Standard (AES) is a symmetric encryption algorithm widely used worldwide. It was established by the U.S. National Institute of Standards and Technology (NIST) in 2001. AES operates on 128-bit blocks and supports key sizes of 128, 192, or 256 bits.',
 '1. Key Expansion: Generate round keys from the cipher key\n2. Initial Round: AddRoundKey\n3. Rounds (9/11/13 for 128/192/256-bit keys): SubBytes, ShiftRows, MixColumns, AddRoundKey\n4. Final Round: SubBytes, ShiftRows, AddRoundKey',
 '128-bit key, 128-bit block size\nPlaintext block encrypted through multiple rounds',
 'AES uses operations:\n- SubBytes: S-box substitution\n- ShiftRows: Row shifting\n- MixColumns: Column mixing\n- AddRoundKey: XOR with round key',
 'SYMMETRIC');

INSERT OR IGNORE INTO algorithms (name, theory, steps, example, formula, type) VALUES 
('DES',
 'Data Encryption Standard (DES) is a symmetric-key block cipher published by NIST in 1977. It uses a 56-bit key and operates on 64-bit blocks. DES is now considered insecure due to its short key length, but it was historically important.',
 '1. Initial Permutation (IP)\n2. Split into left and right halves\n3. 16 rounds of Feistel network:\n   - Expand right half\n   - XOR with round key\n   - S-box substitution\n   - Permutation\n   - XOR with left half\n4. Final Permutation (FP)',
 '64-bit block, 56-bit key\n16 rounds of Feistel network',
 'DES uses Feistel network:\nL_i = R_{i-1}\nR_i = L_{i-1} ⊕ f(R_{i-1}, K_i)\nwhere f is the Feistel function',
 'SYMMETRIC');

-- Insert Sample Quiz Questions
-- Note: algorithm_id values depend on the order of insertion above
-- Assuming IDs: 1=Caesar, 2=Vigenère, 3=Playfair, 4=RSA, 5=AES, 6=DES

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(1, 'What is the main weakness of Caesar Cipher?', 'It uses only 25 possible keys', 'It is too complex', 'It requires a computer', 'It only works with numbers', 'A', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(1, 'If plaintext ''A'' is encrypted with shift 3, what is the ciphertext?', 'B', 'C', 'D', 'E', 'C', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(4, 'What makes RSA secure?', 'The difficulty of factoring large numbers', 'The complexity of the algorithm', 'The use of symmetric keys', 'The speed of encryption', 'A', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(4, 'RSA is an example of which type of cryptography?', 'Symmetric', 'Asymmetric', 'Hash', 'Stream', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(5, 'What block size does AES use?', '64 bits', '128 bits', '256 bits', '512 bits', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(6, 'How many rounds does DES use?', '8', '12', '16', '20', 'C', 10);

