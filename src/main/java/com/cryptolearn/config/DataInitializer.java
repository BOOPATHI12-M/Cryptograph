package com.cryptolearn.config;

import com.cryptolearn.entity.Algorithm;
import com.cryptolearn.entity.QuizQuestion;
import com.cryptolearn.entity.User;
import com.cryptolearn.repository.AlgorithmRepository;
import com.cryptolearn.repository.QuizQuestionRepository;
import com.cryptolearn.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final AlgorithmRepository algorithmRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, AlgorithmRepository algorithmRepository,
                          QuizQuestionRepository quizQuestionRepository) {
        this.userRepository = userRepository;
        this.algorithmRepository = algorithmRepository;
        this.quizQuestionRepository = quizQuestionRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@cryptolearn.com");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);

            // Create demo student
            User student = new User();
            student.setUsername("student");
            student.setPassword(passwordEncoder.encode("student123"));
            student.setEmail("student@cryptolearn.com");
            student.setRole(User.Role.STUDENT);
            userRepository.save(student);
        }

        if (algorithmRepository.count() == 0) {
            // Caesar Cipher
            Algorithm caesar = new Algorithm();
            caesar.setName("Caesar Cipher");
            caesar.setType("SUBSTITUTION");
            caesar.setTheory("The Caesar Cipher is one of the earliest and simplest encryption techniques. Named after Julius Caesar, who used it to communicate with his generals, it is a type of substitution cipher where each letter in the plaintext is shifted a certain number of places down the alphabet.");
            caesar.setSteps("1. Choose a shift value (key) between 1-25\n2. For each letter in the plaintext, shift it by the key value\n3. Wrap around if the shift goes beyond Z (or z)\n4. Non-alphabetic characters remain unchanged");
            caesar.setExample("Plaintext: HELLO, Shift: 3 → Ciphertext: KHOOR");
            caesar.setFormula("E(x) = (x + k) mod 26\nD(x) = (x - k) mod 26\nwhere x is the letter position and k is the shift key");
            algorithmRepository.save(caesar);

            // Vigenère Cipher
            Algorithm vigenere = new Algorithm();
            vigenere.setName("Vigenère Cipher");
            vigenere.setType("SUBSTITUTION");
            vigenere.setTheory("The Vigenère Cipher is a method of encrypting alphabetic text using a series of interwoven Caesar ciphers based on the letters of a keyword. It is more secure than the Caesar Cipher because it uses multiple shift values.");
            vigenere.setSteps("1. Choose a keyword\n2. Repeat the keyword to match the length of the plaintext\n3. For each letter, apply Caesar Cipher with the corresponding keyword letter as the shift\n4. The shift value is the position of the keyword letter in the alphabet");
            vigenere.setExample("Plaintext: ATTACK, Key: KEY → Ciphertext: KXEYKY");
            vigenere.setFormula("C_i = (P_i + K_i) mod 26\nP_i = (C_i - K_i) mod 26\nwhere C is ciphertext, P is plaintext, and K is the key");
            algorithmRepository.save(vigenere);

            // Playfair Cipher
            Algorithm playfair = new Algorithm();
            playfair.setName("Playfair Cipher");
            playfair.setType("SUBSTITUTION");
            playfair.setTheory("The Playfair Cipher encrypts pairs of letters (digraphs) instead of single letters, making it more secure than simple substitution ciphers. It uses a 5x5 grid filled with a keyword.");
            playfair.setSteps("1. Create a 5x5 matrix using a keyword (I and J share the same cell)\n2. Split plaintext into pairs of letters\n3. Apply rules: same row (shift right), same column (shift down), rectangle (swap columns)\n4. If a pair has the same letter, insert X between them");
            playfair.setExample("Plaintext: HELLO, Key: MONARCHY → Ciphertext: DMYAR");
            playfair.setFormula("Encryption rules based on position in 5x5 matrix:\n- Same row: shift right\n- Same column: shift down\n- Rectangle: swap columns");
            algorithmRepository.save(playfair);

            // RSA
            Algorithm rsa = new Algorithm();
            rsa.setName("RSA");
            rsa.setType("ASYMMETRIC");
            rsa.setTheory("RSA (Rivest-Shamir-Adleman) is a public-key cryptosystem widely used for secure data transmission. It uses two keys: a public key for encryption and a private key for decryption. The security is based on the difficulty of factoring large integers.");
            rsa.setSteps("1. Generate two large prime numbers p and q\n2. Calculate n = p × q and φ(n) = (p-1)(q-1)\n3. Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1\n4. Calculate d such that e × d ≡ 1 (mod φ(n))\n5. Public key: (n, e), Private key: (n, d)\n6. Encrypt: c = m^e mod n\n7. Decrypt: m = c^d mod n");
            rsa.setExample("p=3, q=11, n=33, e=3, d=7\nPlaintext: 5 → Ciphertext: 26");
            rsa.setFormula("Encryption: c ≡ m^e (mod n)\nDecryption: m ≡ c^d (mod n)\nwhere m is message, c is ciphertext, (n,e) is public key, (n,d) is private key");
            algorithmRepository.save(rsa);

            // AES
            Algorithm aes = new Algorithm();
            aes.setName("AES");
            aes.setType("SYMMETRIC");
            aes.setTheory("Advanced Encryption Standard (AES) is a symmetric encryption algorithm widely used worldwide. It was established by the U.S. National Institute of Standards and Technology (NIST) in 2001. AES operates on 128-bit blocks and supports key sizes of 128, 192, or 256 bits.");
            aes.setSteps("1. Key Expansion: Generate round keys from the cipher key\n2. Initial Round: AddRoundKey\n3. Rounds (9/11/13 for 128/192/256-bit keys): SubBytes, ShiftRows, MixColumns, AddRoundKey\n4. Final Round: SubBytes, ShiftRows, AddRoundKey");
            aes.setExample("128-bit key, 128-bit block size\nPlaintext block encrypted through multiple rounds");
            aes.setFormula("AES uses operations:\n- SubBytes: S-box substitution\n- ShiftRows: Row shifting\n- MixColumns: Column mixing\n- AddRoundKey: XOR with round key");
            algorithmRepository.save(aes);

            // DES
            Algorithm des = new Algorithm();
            des.setName("DES");
            des.setType("SYMMETRIC");
            des.setTheory("Data Encryption Standard (DES) is a symmetric-key block cipher published by NIST in 1977. It uses a 56-bit key and operates on 64-bit blocks. DES is now considered insecure due to its short key length, but it was historically important.");
            des.setSteps("1. Initial Permutation (IP)\n2. Split into left and right halves\n3. 16 rounds of Feistel network:\n   - Expand right half\n   - XOR with round key\n   - S-box substitution\n   - Permutation\n   - XOR with left half\n4. Final Permutation (FP)");
            des.setExample("64-bit block, 56-bit key\n16 rounds of Feistel network");
            des.setFormula("DES uses Feistel network:\nL_i = R_{i-1}\nR_i = L_{i-1} ⊕ f(R_{i-1}, K_i)\nwhere f is the Feistel function");
            algorithmRepository.save(des);

            // Create 30 quiz questions (5 per algorithm)
            
            // Caesar Cipher Questions (5)
            QuizQuestion q1 = new QuizQuestion();
            q1.setAlgorithm(caesar);
            q1.setQuestion("What is the main weakness of Caesar Cipher?");
            q1.setOptionA("It uses only 25 possible keys");
            q1.setOptionB("It is too complex");
            q1.setOptionC("It requires a computer");
            q1.setOptionD("It only works with numbers");
            q1.setCorrectAnswer("A");
            q1.setPoints(10);
            quizQuestionRepository.save(q1);

            QuizQuestion q2 = new QuizQuestion();
            q2.setAlgorithm(caesar);
            q2.setQuestion("If plaintext 'A' is encrypted with shift 3, what is the ciphertext?");
            q2.setOptionA("B");
            q2.setOptionB("C");
            q2.setOptionC("D");
            q2.setOptionD("E");
            q2.setCorrectAnswer("C");
            q2.setPoints(10);
            quizQuestionRepository.save(q2);

            QuizQuestion q3 = new QuizQuestion();
            q3.setAlgorithm(caesar);
            q3.setQuestion("What is the maximum shift value in Caesar Cipher?");
            q3.setOptionA("24");
            q3.setOptionB("25");
            q3.setOptionC("26");
            q3.setOptionD("27");
            q3.setCorrectAnswer("B");
            q3.setPoints(10);
            quizQuestionRepository.save(q3);

            QuizQuestion q4 = new QuizQuestion();
            q4.setAlgorithm(caesar);
            q4.setQuestion("Who is the Caesar Cipher named after?");
            q4.setOptionA("Augustus Caesar");
            q4.setOptionB("Julius Caesar");
            q4.setOptionC("Nero Caesar");
            q4.setOptionD("Marcus Caesar");
            q4.setCorrectAnswer("B");
            q4.setPoints(10);
            quizQuestionRepository.save(q4);

            QuizQuestion q5 = new QuizQuestion();
            q5.setAlgorithm(caesar);
            q5.setQuestion("What happens to non-alphabetic characters in Caesar Cipher?");
            q5.setOptionA("They are shifted");
            q5.setOptionB("They are removed");
            q5.setOptionC("They remain unchanged");
            q5.setOptionD("They are replaced with X");
            q5.setCorrectAnswer("C");
            q5.setPoints(10);
            quizQuestionRepository.save(q5);

            // Vigenère Cipher Questions (5)
            QuizQuestion q6 = new QuizQuestion();
            q6.setAlgorithm(vigenere);
            q6.setQuestion("What makes Vigenère Cipher more secure than Caesar Cipher?");
            q6.setOptionA("It uses multiple shift values");
            q6.setOptionB("It uses larger keys");
            q6.setOptionC("It encrypts faster");
            q6.setOptionD("It uses numbers");
            q6.setCorrectAnswer("A");
            q6.setPoints(10);
            quizQuestionRepository.save(q6);

            QuizQuestion q7 = new QuizQuestion();
            q7.setAlgorithm(vigenere);
            q7.setQuestion("How is the keyword used in Vigenère Cipher?");
            q7.setOptionA("It is used once");
            q7.setOptionB("It is repeated to match plaintext length");
            q7.setOptionC("It is reversed");
            q7.setOptionD("It is converted to numbers only");
            q7.setCorrectAnswer("B");
            q7.setPoints(10);
            quizQuestionRepository.save(q7);

            QuizQuestion q8 = new QuizQuestion();
            q8.setAlgorithm(vigenere);
            q8.setQuestion("What type of cipher is Vigenère?");
            q8.setOptionA("Transposition cipher");
            q8.setOptionB("Polyalphabetic substitution cipher");
            q8.setOptionC("Stream cipher");
            q8.setOptionD("Block cipher");
            q8.setCorrectAnswer("B");
            q8.setPoints(10);
            quizQuestionRepository.save(q8);

            QuizQuestion q9 = new QuizQuestion();
            q9.setAlgorithm(vigenere);
            q9.setQuestion("If the keyword is 'KEY' and plaintext is 'HELLO', what is the effective key?");
            q9.setOptionA("KEY");
            q9.setOptionB("KEYKEY");
            q9.setOptionC("KEYKE");
            q9.setOptionD("KEYKEYKEY");
            q9.setCorrectAnswer("C");
            q9.setPoints(10);
            quizQuestionRepository.save(q9);

            QuizQuestion q10 = new QuizQuestion();
            q10.setAlgorithm(vigenere);
            q10.setQuestion("Who invented the Vigenère Cipher?");
            q10.setOptionA("Blaise de Vigenère");
            q10.setOptionB("Julius Caesar");
            q10.setOptionC("Leonardo da Vinci");
            q10.setOptionD("Alan Turing");
            q10.setCorrectAnswer("A");
            q10.setPoints(10);
            quizQuestionRepository.save(q10);

            // Playfair Cipher Questions (5)
            QuizQuestion q11 = new QuizQuestion();
            q11.setAlgorithm(playfair);
            q11.setQuestion("What size matrix does Playfair Cipher use?");
            q11.setOptionA("4x4");
            q11.setOptionB("5x5");
            q11.setOptionC("6x6");
            q11.setOptionD("8x8");
            q11.setCorrectAnswer("B");
            q11.setPoints(10);
            quizQuestionRepository.save(q11);

            QuizQuestion q12 = new QuizQuestion();
            q12.setAlgorithm(playfair);
            q12.setQuestion("What letters share the same cell in Playfair matrix?");
            q12.setOptionA("A and B");
            q12.setOptionB("I and J");
            q12.setOptionC("X and Y");
            q12.setOptionD("Q and Z");
            q12.setCorrectAnswer("B");
            q12.setPoints(10);
            quizQuestionRepository.save(q12);

            QuizQuestion q13 = new QuizQuestion();
            q13.setAlgorithm(playfair);
            q13.setQuestion("How does Playfair Cipher encrypt text?");
            q13.setOptionA("Letter by letter");
            q13.setOptionB("In pairs (digraphs)");
            q13.setOptionC("In groups of three");
            q13.setOptionD("In blocks of four");
            q13.setCorrectAnswer("B");
            q13.setPoints(10);
            quizQuestionRepository.save(q13);

            QuizQuestion q14 = new QuizQuestion();
            q14.setAlgorithm(playfair);
            q14.setQuestion("What happens if a pair has the same letter in Playfair?");
            q14.setOptionA("It is skipped");
            q14.setOptionB("X is inserted between them");
            q14.setOptionC("It is encrypted as is");
            q14.setOptionD("The pair is reversed");
            q14.setCorrectAnswer("B");
            q14.setPoints(10);
            quizQuestionRepository.save(q14);

            QuizQuestion q15 = new QuizQuestion();
            q15.setAlgorithm(playfair);
            q15.setQuestion("When two letters are in the same row in Playfair, what happens?");
            q15.setOptionA("They shift down");
            q15.setOptionB("They shift right");
            q15.setOptionC("They swap positions");
            q15.setOptionD("They shift left");
            q15.setCorrectAnswer("B");
            q15.setPoints(10);
            quizQuestionRepository.save(q15);

            // RSA Questions (5)
            QuizQuestion q16 = new QuizQuestion();
            q16.setAlgorithm(rsa);
            q16.setQuestion("What makes RSA secure?");
            q16.setOptionA("The difficulty of factoring large numbers");
            q16.setOptionB("The complexity of the algorithm");
            q16.setOptionC("The use of symmetric keys");
            q16.setOptionD("The speed of encryption");
            q16.setCorrectAnswer("A");
            q16.setPoints(10);
            quizQuestionRepository.save(q16);

            QuizQuestion q17 = new QuizQuestion();
            q17.setAlgorithm(rsa);
            q17.setQuestion("RSA is an example of which type of cryptography?");
            q17.setOptionA("Symmetric");
            q17.setOptionB("Asymmetric");
            q17.setOptionC("Hash");
            q17.setOptionD("Stream");
            q17.setCorrectAnswer("B");
            q17.setPoints(10);
            quizQuestionRepository.save(q17);

            QuizQuestion q18 = new QuizQuestion();
            q18.setAlgorithm(rsa);
            q18.setQuestion("What does RSA stand for?");
            q18.setOptionA("Rivest-Shamir-Adleman");
            q18.setOptionB("Random Secure Algorithm");
            q18.setOptionC("Rapid Security Algorithm");
            q18.setOptionD("Rigid Security Algorithm");
            q18.setCorrectAnswer("A");
            q18.setPoints(10);
            quizQuestionRepository.save(q18);

            QuizQuestion q19 = new QuizQuestion();
            q19.setAlgorithm(rsa);
            q19.setQuestion("In RSA, what is calculated as (p-1)(q-1)?");
            q19.setOptionA("n");
            q19.setOptionB("e");
            q19.setOptionC("φ(n)");
            q19.setOptionD("d");
            q19.setCorrectAnswer("C");
            q19.setPoints(10);
            quizQuestionRepository.save(q19);

            QuizQuestion q20 = new QuizQuestion();
            q20.setAlgorithm(rsa);
            q20.setQuestion("What is the public key in RSA?");
            q20.setOptionA("(n, d)");
            q20.setOptionB("(n, e)");
            q20.setOptionC("(p, q)");
            q20.setOptionD("(e, d)");
            q20.setCorrectAnswer("B");
            q20.setPoints(10);
            quizQuestionRepository.save(q20);

            // AES Questions (5)
            QuizQuestion q21 = new QuizQuestion();
            q21.setAlgorithm(aes);
            q21.setQuestion("What block size does AES use?");
            q21.setOptionA("64 bits");
            q21.setOptionB("128 bits");
            q21.setOptionC("256 bits");
            q21.setOptionD("512 bits");
            q21.setCorrectAnswer("B");
            q21.setPoints(10);
            quizQuestionRepository.save(q21);

            QuizQuestion q22 = new QuizQuestion();
            q22.setAlgorithm(aes);
            q22.setQuestion("What key sizes does AES support?");
            q22.setOptionA("128, 192, 256 bits");
            q22.setOptionB("64, 128, 256 bits");
            q22.setOptionC("128, 256, 512 bits");
            q22.setOptionD("192, 256, 512 bits");
            q22.setCorrectAnswer("A");
            q22.setPoints(10);
            quizQuestionRepository.save(q22);

            QuizQuestion q23 = new QuizQuestion();
            q23.setAlgorithm(aes);
            q23.setQuestion("How many rounds does AES-128 use?");
            q23.setOptionA("9");
            q23.setOptionB("10");
            q23.setOptionC("11");
            q23.setOptionD("12");
            q23.setCorrectAnswer("B");
            q23.setPoints(10);
            quizQuestionRepository.save(q23);

            QuizQuestion q24 = new QuizQuestion();
            q24.setAlgorithm(aes);
            q24.setQuestion("Which operation is NOT part of AES rounds?");
            q24.setOptionA("SubBytes");
            q24.setOptionB("ShiftRows");
            q24.setOptionC("MixColumns");
            q24.setOptionD("DivideBytes");
            q24.setCorrectAnswer("D");
            q24.setPoints(10);
            quizQuestionRepository.save(q24);

            QuizQuestion q25 = new QuizQuestion();
            q25.setAlgorithm(aes);
            q25.setQuestion("When was AES established as a standard by NIST?");
            q25.setOptionA("1997");
            q25.setOptionB("2001");
            q25.setOptionC("2005");
            q25.setOptionD("2010");
            q25.setCorrectAnswer("B");
            q25.setPoints(10);
            quizQuestionRepository.save(q25);

            // DES Questions (5)
            QuizQuestion q26 = new QuizQuestion();
            q26.setAlgorithm(des);
            q26.setQuestion("How many rounds does DES use?");
            q26.setOptionA("8");
            q26.setOptionB("12");
            q26.setOptionC("16");
            q26.setOptionD("20");
            q26.setCorrectAnswer("C");
            q26.setPoints(10);
            quizQuestionRepository.save(q26);

            QuizQuestion q27 = new QuizQuestion();
            q27.setAlgorithm(des);
            q27.setQuestion("What is the key size of DES?");
            q27.setOptionA("48 bits");
            q27.setOptionB("56 bits");
            q27.setOptionC("64 bits");
            q27.setOptionD("128 bits");
            q27.setCorrectAnswer("B");
            q27.setPoints(10);
            quizQuestionRepository.save(q27);

            QuizQuestion q28 = new QuizQuestion();
            q28.setAlgorithm(des);
            q28.setQuestion("What block size does DES use?");
            q28.setOptionA("56 bits");
            q28.setOptionB("64 bits");
            q28.setOptionC("128 bits");
            q28.setOptionD("256 bits");
            q28.setCorrectAnswer("B");
            q28.setPoints(10);
            quizQuestionRepository.save(q28);

            QuizQuestion q29 = new QuizQuestion();
            q29.setAlgorithm(des);
            q29.setQuestion("Why is DES considered insecure today?");
            q29.setOptionA("It is too slow");
            q29.setOptionB("The key length is too short");
            q29.setOptionC("It uses too many rounds");
            q29.setOptionD("It is too complex");
            q29.setCorrectAnswer("B");
            q29.setPoints(10);
            quizQuestionRepository.save(q29);

            QuizQuestion q30 = new QuizQuestion();
            q30.setAlgorithm(des);
            q30.setQuestion("What network structure does DES use?");
            q30.setOptionA("SPN (Substitution-Permutation Network)");
            q30.setOptionB("Feistel Network");
            q30.setOptionC("Avalanche Network");
            q30.setOptionD("Diffusion Network");
            q30.setCorrectAnswer("B");
            q30.setPoints(10);
            quizQuestionRepository.save(q30);
        }
    }
}

