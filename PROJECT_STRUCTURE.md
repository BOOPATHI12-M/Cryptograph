# Project Structure & UML Diagram

## Project Directory Structure

```
cryptography-learning-app/
│
├── src/
│   ├── main/
│   │   ├── java/com/cryptolearn/
│   │   │   ├── CryptographyLearningApplication.java
│   │   │   │
│   │   │   ├── entity/
│   │   │   │   ├── User.java
│   │   │   │   ├── Algorithm.java
│   │   │   │   ├── QuizQuestion.java
│   │   │   │   └── Score.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── AlgorithmRepository.java
│   │   │   │   ├── QuizQuestionRepository.java
│   │   │   │   └── ScoreRepository.java
│   │   │   │
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── AlgorithmService.java
│   │   │   │   ├── QuizService.java
│   │   │   │   ├── ScoreService.java
│   │   │   │   └── CryptoService.java
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── AlgorithmController.java
│   │   │   │   ├── QuizController.java
│   │   │   │   ├── ScoreController.java
│   │   │   │   └── CryptoController.java
│   │   │   │
│   │   │   └── config/
│   │   │       ├── CorsConfig.java
│   │   │       └── DataInitializer.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── index.html
│   │           ├── home.html
│   │           ├── algorithms.html
│   │           ├── algorithm-detail.html
│   │           ├── dashboard.html
│   │           ├── admin.html
│   │           ├── css/
│   │           │   └── style.css
│   │           └── js/
│   │               ├── api.js
│   │               ├── auth.js
│   │               ├── home.js
│   │               ├── algorithms.js
│   │               ├── algorithm-detail.js
│   │               ├── dashboard.js
│   │               └── admin.js
│   │
│   └── test/
│
├── database/
│   ├── schema.sql
│   └── sample_data.sql
│
├── pom.xml
├── README.md
├── API_DOCUMENTATION.md
├── INSTALLATION_GUIDE.md
├── SAMPLE_DATA.md
└── .gitignore
```

## Entity Relationship Diagram (ERD)

```
┌─────────────┐
│    User     │
├─────────────┤
│ id (PK)     │
│ username    │
│ password    │
│ email       │
│ role        │
└──────┬──────┘
       │
       │ 1
       │
       │ *
       │
┌──────▼──────┐
│   Score     │
├─────────────┤
│ id (PK)     │
│ user_id (FK)│
│ algorithm_id│
│ score       │
│ total_quest │
│ completed_at│
└──────┬──────┘
       │
       │ *
       │
       │ 1
       │
┌──────▼──────┐
│ Algorithm   │
├─────────────┤
│ id (PK)     │
│ name        │
│ theory      │
│ steps       │
│ example     │
│ formula     │
│ type        │
└──────┬──────┘
       │
       │ 1
       │
       │ *
       │
┌──────▼──────────┐
│ QuizQuestion   │
├────────────────┤
│ id (PK)        │
│ algorithm_id   │
│ question       │
│ optionA        │
│ optionB        │
│ optionC        │
│ optionD        │
│ correct_answer │
│ points         │
└────────────────┘
```

## Class Diagram (Simplified)

```
┌─────────────────────┐
│   Controllers       │
├─────────────────────┤
│ AuthController      │
│ AlgorithmController │
│ QuizController      │
│ ScoreController     │
│ CryptoController    │
└──────────┬──────────┘
           │ uses
           ▼
┌─────────────────────┐
│     Services        │
├─────────────────────┤
│ AuthService         │
│ AlgorithmService    │
│ QuizService         │
│ ScoreService        │
│ CryptoService       │
└──────────┬──────────┘
           │ uses
           ▼
┌─────────────────────┐
│   Repositories      │
├─────────────────────┤
│ UserRepository      │
│ AlgorithmRepository │
│ QuizQuestionRepo    │
│ ScoreRepository     │
└──────────┬──────────┘
           │ manages
           ▼
┌─────────────────────┐
│     Entities        │
├─────────────────────┤
│ User                │
│ Algorithm           │
│ QuizQuestion        │
│ Score               │
└─────────────────────┘
```

## Architecture Flow

```
┌──────────────┐
│   Frontend   │
│ (HTML/CSS/JS)│
└──────┬───────┘
       │ HTTP/REST
       │
       ▼
┌──────────────┐
│  Controllers │
│  (REST API)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Services   │
│ (Business    │
│   Logic)     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Repositories │
│   (JPA)      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   SQLite     │
│  Database    │
└──────────────┘
```

## Component Interactions

### Authentication Flow
```
User → AuthController → AuthService → UserRepository → Database
                      ↓
                   JWT Token
                      ↓
                 Frontend (localStorage)
```

### Algorithm Learning Flow
```
User → AlgorithmController → AlgorithmService → AlgorithmRepository → Database
     ↓
  Frontend displays: Theory, Steps, Example, Formula
```

### Encryption Flow
```
User Input → CryptoController → CryptoService → Algorithm Implementation
         ↓
    Encrypted/Decrypted Result
         ↓
    Frontend Display
```

### Quiz Flow
```
User → QuizController → QuizService → QuizQuestionRepository → Database
    ↓
  Submit Answers
    ↓
  Score Calculation
    ↓
  ScoreController → ScoreService → ScoreRepository → Database
```

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  HTML, CSS, JavaScript (Frontend)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      API Layer (REST)               │
│  Spring Boot Controllers             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Business Logic Layer            │
│  Spring Services                     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Data Access Layer               │
│  JPA Repositories                    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Database Layer                  │
│  SQLite Database                     │
└──────────────────────────────────────┘
```

## Security Flow

```
Request → CORS Filter → Controller → (Optional: JWT Validation) → Service
                                                                    ↓
                                                              Authorization Check
                                                                    ↓
                                                              Process Request
```

---

**Note**: This is a simplified representation. The actual implementation includes additional error handling, validation, and security measures.

