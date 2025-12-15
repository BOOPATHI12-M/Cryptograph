# Sample Test Data

This document provides sample test data for the Cryptography Learning Application.

## Default User Accounts

### Admin Account
```
Username: admin
Password: admin123
Email: admin@cryptolearn.com
Role: ADMIN
```

### Student Account (Demo)
```
Username: student
Password: student123
Email: student@cryptolearn.com
Role: STUDENT
```

## Sample Algorithms

The application comes pre-loaded with 6 algorithms:

1. **Caesar Cipher** (SUBSTITUTION)
2. **Vigenère Cipher** (SUBSTITUTION)
3. **Playfair Cipher** (SUBSTITUTION)
4. **RSA** (ASYMMETRIC)
5. **AES** (SYMMETRIC)
6. **DES** (SYMMETRIC)

## Sample Quiz Questions

### Caesar Cipher Questions

**Question 1:**
- Question: "What is the main weakness of Caesar Cipher?"
- Option A: "It uses only 25 possible keys" ✓
- Option B: "It is too complex"
- Option C: "It requires a computer"
- Option D: "It only works with numbers"
- Points: 10

**Question 2:**
- Question: "If plaintext 'A' is encrypted with shift 3, what is the ciphertext?"
- Option A: "B"
- Option B: "C"
- Option C: "D" ✓
- Option D: "E"
- Points: 10

### RSA Questions

**Question 1:**
- Question: "What makes RSA secure?"
- Option A: "The difficulty of factoring large numbers" ✓
- Option B: "The complexity of the algorithm"
- Option C: "The use of symmetric keys"
- Option D: "The speed of encryption"
- Points: 10

**Question 2:**
- Question: "RSA is an example of which type of cryptography?"
- Option A: "Symmetric"
- Option B: "Asymmetric" ✓
- Option C: "Hash"
- Option D: "Stream"
- Points: 10

## Test Encryption Examples

### Caesar Cipher
```
Plaintext: HELLO
Shift: 3
Expected Ciphertext: KHOOR

Plaintext: WORLD
Shift: 5
Expected Ciphertext: BTWQI
```

### Vigenère Cipher
```
Plaintext: ATTACK
Key: KEY
Expected Ciphertext: KXEYKY

Plaintext: HELLO
Key: ABC
Expected Ciphertext: HFNLP
```

### Playfair Cipher
```
Plaintext: HELLO
Key: MONARCHY
Expected Ciphertext: DMYAR (approximate, depends on matrix)
```

### RSA
```
Plaintext: Hello World
Note: RSA works with numbers, text is converted to bytes
Keys are auto-generated (2048-bit)
```

### AES
```
Plaintext: Hello World
Key: Auto-generated (256-bit)
IV: Auto-generated
Note: Results vary due to random key/IV generation
```

### DES
```
Plaintext: Hello World
Key: Auto-generated (56-bit)
IV: Auto-generated
Note: Results vary due to random key/IV generation
```

## API Test Examples

### Test Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"student","password":"student123"}'
```

### Test Get Algorithms
```bash
curl http://localhost:8080/api/algorithms
```

### Test Caesar Encryption
```bash
curl -X POST http://localhost:8080/api/crypto/caesar/encrypt \
  -H "Content-Type: application/json" \
  -d '{"plaintext":"HELLO","shift":3}'
```

### Test Quiz Submission
```bash
curl -X POST http://localhost:8080/api/quiz/submit/1 \
  -H "Content-Type: application/json" \
  -d '{"1":"A","2":"C"}'
```

## Database Sample Queries

### View All Users
```sql
SELECT * FROM users;
```

### View All Algorithms
```sql
SELECT id, name, type FROM algorithms;
```

### View Quiz Questions
```sql
SELECT q.id, q.question, a.name as algorithm_name 
FROM quiz_questions q 
JOIN algorithms a ON q.algorithm_id = a.id;
```

### View User Scores
```sql
SELECT u.username, a.name as algorithm, s.score, s.total_questions, s.completed_at
FROM scores s
JOIN users u ON s.user_id = u.id
JOIN algorithms a ON s.algorithm_id = a.id
ORDER BY s.completed_at DESC;
```

## Creating Additional Test Data

### Add New Algorithm (via API)
```json
POST /api/algorithms
{
  "name": "Hill Cipher",
  "type": "SUBSTITUTION",
  "theory": "The Hill cipher is a polygraphic substitution cipher...",
  "steps": "1. Choose a matrix key\n2. Convert plaintext to numbers\n3. Multiply by key matrix",
  "example": "Plaintext: HELLO, Key: [[2,1],[3,4]]",
  "formula": "C = KP mod 26"
}
```

### Add New Quiz Question (via API)
```json
POST /api/quiz
{
  "algorithm": {"id": 1},
  "question": "What is the key size of AES-256?",
  "optionA": "128 bits",
  "optionB": "192 bits",
  "optionC": "256 bits",
  "optionD": "512 bits",
  "correctAnswer": "C",
  "points": 10
}
```

## Performance Test Data

### Large Text Encryption Test
```
Plaintext: "The quick brown fox jumps over the lazy dog. " (repeated 100 times)
Algorithm: Caesar Cipher
Shift: 13
Expected: Should encrypt/decrypt successfully
```

### Multiple Quiz Attempts
```
User: student
Algorithm: Caesar Cipher
Attempts: 5
Track scores in dashboard
```

## Security Test Data

### SQL Injection Test (Should Fail)
```
Username: admin' OR '1'='1
Password: anything
Expected: Should reject invalid login
```

### XSS Test (Should be Sanitized)
```
Plaintext: <script>alert('XSS')</script>
Expected: Should be handled safely
```

---

**Note**: All sample data is automatically loaded when the application starts for the first time via the `DataInitializer` class.

