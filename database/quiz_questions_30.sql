-- ============================================
-- 30 Quiz Questions for All Algorithms
-- ============================================
-- This file contains 30 quiz questions (5 questions per algorithm)
-- Algorithms: Caesar Cipher, Vigenère Cipher, Playfair Cipher, RSA, AES, DES
-- 
-- Note: algorithm_id values correspond to the order of insertion:
--   1 = Caesar Cipher
--   2 = Vigenère Cipher
--   3 = Playfair Cipher
--   4 = RSA
--   5 = AES
--   6 = DES
--
-- Usage: Run this SQL file after creating the algorithms table
-- ============================================

-- ============================================
-- CAESAR CIPHER (5 questions)
-- ============================================
INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(1, 'What is the main weakness of Caesar Cipher?', 'It uses only 25 possible keys', 'It is too complex', 'It requires a computer', 'It only works with numbers', 'A', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(1, 'If plaintext ''A'' is encrypted with shift 3, what is the ciphertext?', 'B', 'C', 'D', 'E', 'C', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(1, 'What is the maximum shift value in Caesar Cipher?', '24', '25', '26', '27', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(1, 'Who is the Caesar Cipher named after?', 'Augustus Caesar', 'Julius Caesar', 'Nero Caesar', 'Marcus Caesar', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(1, 'What happens to non-alphabetic characters in Caesar Cipher?', 'They are shifted', 'They are removed', 'They remain unchanged', 'They are replaced with X', 'C', 10);

-- ============================================
-- VIGENÈRE CIPHER (5 questions)
-- ============================================
INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(2, 'What makes Vigenère Cipher more secure than Caesar Cipher?', 'It uses multiple shift values', 'It uses larger keys', 'It encrypts faster', 'It uses numbers', 'A', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(2, 'How is the keyword used in Vigenère Cipher?', 'It is used once', 'It is repeated to match plaintext length', 'It is reversed', 'It is converted to numbers only', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(2, 'What type of cipher is Vigenère?', 'Transposition cipher', 'Polyalphabetic substitution cipher', 'Stream cipher', 'Block cipher', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(2, 'If the keyword is ''KEY'' and plaintext is ''HELLO'', what is the effective key?', 'KEY', 'KEYKEY', 'KEYKE', 'KEYKEYKEY', 'C', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(2, 'Who invented the Vigenère Cipher?', 'Blaise de Vigenère', 'Julius Caesar', 'Leonardo da Vinci', 'Alan Turing', 'A', 10);

-- ============================================
-- PLAYFAIR CIPHER (5 questions)
-- ============================================
INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(3, 'What size matrix does Playfair Cipher use?', '4x4', '5x5', '6x6', '8x8', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(3, 'What letters share the same cell in Playfair matrix?', 'A and B', 'I and J', 'X and Y', 'Q and Z', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(3, 'How does Playfair Cipher encrypt text?', 'Letter by letter', 'In pairs (digraphs)', 'In groups of three', 'In blocks of four', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(3, 'What happens if a pair has the same letter in Playfair?', 'It is skipped', 'X is inserted between them', 'It is encrypted as is', 'The pair is reversed', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(3, 'When two letters are in the same row in Playfair, what happens?', 'They shift down', 'They shift right', 'They swap positions', 'They shift left', 'B', 10);

-- ============================================
-- RSA (5 questions)
-- ============================================
INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(4, 'What makes RSA secure?', 'The difficulty of factoring large numbers', 'The complexity of the algorithm', 'The use of symmetric keys', 'The speed of encryption', 'A', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(4, 'RSA is an example of which type of cryptography?', 'Symmetric', 'Asymmetric', 'Hash', 'Stream', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(4, 'What does RSA stand for?', 'Rivest-Shamir-Adleman', 'Random Secure Algorithm', 'Rapid Security Algorithm', 'Rigid Security Algorithm', 'A', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(4, 'In RSA, what is calculated as (p-1)(q-1)?', 'n', 'e', 'φ(n)', 'd', 'C', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(4, 'What is the public key in RSA?', '(n, d)', '(n, e)', '(p, q)', '(e, d)', 'B', 10);

-- ============================================
-- AES (5 questions)
-- ============================================
INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(5, 'What block size does AES use?', '64 bits', '128 bits', '256 bits', '512 bits', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(5, 'What key sizes does AES support?', '128, 192, 256 bits', '64, 128, 256 bits', '128, 256, 512 bits', '192, 256, 512 bits', 'A', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(5, 'How many rounds does AES-128 use?', '9', '10', '11', '12', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(5, 'Which operation is NOT part of AES rounds?', 'SubBytes', 'ShiftRows', 'MixColumns', 'DivideBytes', 'D', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(5, 'When was AES established as a standard by NIST?', '1997', '2001', '2005', '2010', 'B', 10);

-- ============================================
-- DES (5 questions)
-- ============================================
INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(6, 'How many rounds does DES use?', '8', '12', '16', '20', 'C', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(6, 'What is the key size of DES?', '48 bits', '56 bits', '64 bits', '128 bits', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(6, 'What block size does DES use?', '56 bits', '64 bits', '128 bits', '256 bits', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(6, 'Why is DES considered insecure today?', 'It is too slow', 'The key length is too short', 'It uses too many rounds', 'It is too complex', 'B', 10);

INSERT OR IGNORE INTO quiz_questions (algorithm_id, question, option_a, option_b, option_c, option_d, correct_answer, points) VALUES 
(6, 'What network structure does DES use?', 'SPN (Substitution-Permutation Network)', 'Feistel Network', 'Avalanche Network', 'Diffusion Network', 'B', 10);

-- ============================================
-- Summary: 30 questions created
--   - Caesar Cipher: 5 questions
--   - Vigenère Cipher: 5 questions
--   - Playfair Cipher: 5 questions
--   - RSA: 5 questions
--   - AES: 5 questions
--   - DES: 5 questions
-- ============================================
