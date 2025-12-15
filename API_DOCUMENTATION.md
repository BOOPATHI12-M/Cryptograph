# API Documentation

Base URL: `http://localhost:8080/api`

All API endpoints return JSON responses.

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request Body:
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string",
    "role": "STUDENT"
  }
}
```

### Login
**POST** `/auth/login`

Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "string",
    "email": "string",
    "role": "STUDENT"
  }
}
```

## Algorithm Endpoints

### Get All Algorithms
**GET** `/algorithms`

Response:
```json
[
  {
    "id": 1,
    "name": "Caesar Cipher",
    "theory": "Theory text...",
    "steps": "Steps text...",
    "example": "Example text...",
    "formula": "Formula text...",
    "type": "SUBSTITUTION"
  }
]
```

### Get Algorithm by ID
**GET** `/algorithms/{id}`

Response:
```json
{
  "id": 1,
  "name": "Caesar Cipher",
  "theory": "Theory text...",
  "steps": "Steps text...",
  "example": "Example text...",
  "formula": "Formula text...",
  "type": "SUBSTITUTION"
}
```

### Create Algorithm (Admin Only)
**POST** `/algorithms`

Headers: `Authorization: Bearer {token}`

Request Body:
```json
{
  "name": "string",
  "theory": "string",
  "steps": "string",
  "example": "string",
  "formula": "string",
  "type": "SYMMETRIC|ASYMMETRIC|SUBSTITUTION|TRANSPOSITION"
}
```

### Update Algorithm (Admin Only)
**PUT** `/algorithms/{id}`

Headers: `Authorization: Bearer {token}`

Request Body: Same as Create

### Delete Algorithm (Admin Only)
**DELETE** `/algorithms/{id}`

Headers: `Authorization: Bearer {token}`

## Quiz Endpoints

### Get Questions by Algorithm
**GET** `/quiz/algorithm/{algorithmId}`

Response:
```json
[
  {
    "id": 1,
    "algorithm": {
      "id": 1,
      "name": "Caesar Cipher"
    },
    "question": "Question text?",
    "optionA": "Option A",
    "optionB": "Option B",
    "optionC": "Option C",
    "optionD": "Option D",
    "correctAnswer": "A",
    "points": 10
  }
]
```

### Get Question by ID
**GET** `/quiz/{id}`

### Create Question (Admin Only)
**POST** `/quiz`

Headers: `Authorization: Bearer {token}`

Request Body:
```json
{
  "algorithm": {
    "id": 1
  },
  "question": "string",
  "optionA": "string",
  "optionB": "string",
  "optionC": "string",
  "optionD": "string",
  "correctAnswer": "A|B|C|D",
  "points": 10
}
```

### Update Question (Admin Only)
**PUT** `/quiz/{id}`

Headers: `Authorization: Bearer {token}`

### Delete Question (Admin Only)
**DELETE** `/quiz/{id}`

Headers: `Authorization: Bearer {token}`

### Submit Quiz
**POST** `/quiz/submit/{algorithmId}`

Request Body:
```json
{
  "1": "A",
  "2": "B",
  "3": "C"
}
```
(Question ID as key, selected answer as value)

Response:
```json
{
  "score": 30,
  "algorithmId": 1
}
```

## Score Endpoints

### Save Score
**POST** `/scores`

Request Body:
```json
{
  "userId": 1,
  "algorithmId": 1,
  "score": 30,
  "totalQuestions": 3
}
```

### Get Scores by User
**GET** `/scores/user/{userId}`

Response:
```json
[
  {
    "id": 1,
    "user": {
      "id": 1,
      "username": "student"
    },
    "algorithm": {
      "id": 1,
      "name": "Caesar Cipher"
    },
    "score": 30,
    "totalQuestions": 3,
    "completedAt": "2024-01-01T12:00:00"
  }
]
```

### Get All Scores (Admin)
**GET** `/scores`

### Get Scores by Algorithm
**GET** `/scores/algorithm/{algorithmId}`

## Cryptography Endpoints

### Caesar Cipher

#### Encrypt
**POST** `/crypto/caesar/encrypt`

Request Body:
```json
{
  "plaintext": "HELLO",
  "shift": 3
}
```

Response:
```json
{
  "ciphertext": "KHOOR",
  "shift": "3"
}
```

#### Decrypt
**POST** `/crypto/caesar/decrypt`

Request Body:
```json
{
  "ciphertext": "KHOOR",
  "shift": 3
}
```

Response:
```json
{
  "plaintext": "HELLO"
}
```

### Vigenère Cipher

#### Encrypt
**POST** `/crypto/vigenere/encrypt`

Request Body:
```json
{
  "plaintext": "ATTACK",
  "key": "KEY"
}
```

#### Decrypt
**POST** `/crypto/vigenere/decrypt`

Request Body:
```json
{
  "ciphertext": "KXEYKY",
  "key": "KEY"
}
```

### Playfair Cipher

#### Encrypt
**POST** `/crypto/playfair/encrypt`

Request Body:
```json
{
  "plaintext": "HELLO",
  "key": "MONARCHY"
}
```

#### Decrypt
**POST** `/crypto/playfair/decrypt`

### RSA

#### Generate Keys
**POST** `/crypto/rsa/generate-keys`

Response:
```json
{
  "publicKey": "base64_encoded_public_key",
  "privateKey": "base64_encoded_private_key"
}
```

#### Encrypt
**POST** `/crypto/rsa/encrypt`

Request Body:
```json
{
  "plaintext": "Hello World",
  "publicKey": "base64_encoded_public_key"
}
```

Response:
```json
{
  "ciphertext": "base64_encoded_ciphertext"
}
```

#### Decrypt
**POST** `/crypto/rsa/decrypt`

Request Body:
```json
{
  "ciphertext": "base64_encoded_ciphertext",
  "privateKey": "base64_encoded_private_key"
}
```

### AES

#### Encrypt
**POST** `/crypto/aes/encrypt`

Request Body:
```json
{
  "plaintext": "Hello World"
}
```

Response:
```json
{
  "ciphertext": "base64_encoded_ciphertext",
  "key": "base64_encoded_key",
  "iv": "base64_encoded_iv"
}
```

#### Decrypt
**POST** `/crypto/aes/decrypt`

Request Body:
```json
{
  "ciphertext": "base64_encoded_ciphertext",
  "key": "base64_encoded_key",
  "iv": "base64_encoded_iv"
}
```

### DES

#### Encrypt
**POST** `/crypto/des/encrypt`

Request Body:
```json
{
  "plaintext": "Hello World"
}
```

Response:
```json
{
  "ciphertext": "base64_encoded_ciphertext",
  "key": "base64_encoded_key",
  "iv": "base64_encoded_iv"
}
```

#### Decrypt
**POST** `/crypto/des/decrypt`

Request Body:
```json
{
  "ciphertext": "base64_encoded_ciphertext",
  "key": "base64_encoded_key",
  "iv": "base64_encoded_iv"
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

## Status Codes

- `200 OK`: Successful request
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Authentication

Most endpoints (except auth and public read endpoints) require JWT authentication.

Include the token in the Authorization header:
```
Authorization: Bearer {your_jwt_token}
```

Tokens are obtained from `/auth/login` or `/auth/register` endpoints.

