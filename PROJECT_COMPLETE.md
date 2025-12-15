# Cryptography Implementation and Custom Encryption - Complete Project

## 📌 Project Overview

A complete Cryptography Learning Web Application that demonstrates cryptographic algorithms using Java. The application provides modules for **Caesar Cipher**, **AES**, and **RSA** encryption/decryption with input/output windows, animations, step-by-step UI transitions, and visual feedback comparing execution time and security strength.

## ✅ Features Implemented

### 1. Frontend Pages (HTML, CSS, JavaScript)

#### A. Login Page (`index.html`)
- Email and password fields
- Login button with validation
- Link to Signup page
- Error message display

#### B. Signup Page (`index.html` - tabbed)
- Name, email, password, confirm password fields
- Signup button with form validation
- Password matching validation

#### C. Home Page (`home.html`)
- Introduction to cryptography learning
- Navigation cards for:
  - Learn Algorithms
  - Practice Encryption
  - Take Quizzes
  - Track Progress
- Direct links to Caesar, AES, RSA modules
- Links to comparison dashboard and user history

#### D. Caesar Cipher Page (`caesar.html`)
- Input message textbox
- Shift key input (0-25)
- Encrypt / Decrypt buttons
- Result display
- **Step-by-step visualization** showing letter shifting with formulas
- Character-by-character transformation display

#### E. AES Page (`aes.html`)
- Input message textbox
- AES key input (auto-generated)
- Encrypt / Decrypt buttons
- Result display with key and IV
- **Block-level animation** showing:
  - SubBytes → ShiftRows → MixColumns → AddRoundKey
- Visual step-by-step process

#### F. RSA Page (`rsa.html`)
- Generate RSA Key Pair button (2048-bit)
- Display Public Key & Private Key
- Input message textbox
- Encrypt and decrypt functionality
- **Visual explanation** of modular exponentiation
- Step-by-step key generation and encryption process

#### G. Algorithm Visualization Page (`visualization.html`)
- Tabbed interface for Caesar, AES, RSA
- Step-by-step transitions for each algorithm
- Highlights how each algorithm transforms data
- Algorithm comparison table

#### H. Performance Comparison Page (`performance.html`)
- **Execution time graph** (Chart.js bar chart)
- **Security strength meter** with visual bars
- Compare Caesar vs AES vs RSA
- Performance statistics (average, min, max execution times)
- Real-time performance data

#### I. User Dashboard Page (`dashboard.html`)
- Display previous encryption history
- Show algorithm usage statistics
- Show performance logs
- Quiz scores and progress

### 2. Backend APIs (Spring Boot + Java)

#### A. Authentication APIs
- `POST /api/auth/signup` – Create new users
- `POST /api/auth/login` – Validate user credentials
- Passwords stored hashed (BCrypt)
- JWT token-based session management

#### B. Cryptography APIs
- `POST /api/crypto/caesar/encrypt` – Caesar Cipher encryption
- `POST /api/crypto/caesar/decrypt` – Caesar Cipher decryption
- `POST /api/crypto/aes/encrypt` – AES encryption
- `POST /api/crypto/aes/decrypt` – AES decryption
- `POST /api/crypto/rsa/generate-keys` – Generate RSA key pair
- `POST /api/crypto/rsa/encrypt` – RSA encryption
- `POST /api/crypto/rsa/decrypt` – RSA decryption

#### C. Visualization API
- `GET /api/visualize/{algorithm}` – Return step-by-step transformation details
  - Supports: CAESAR, AES, RSA
  - Parameters: `plaintext`, `shift` (for Caesar)

#### D. Performance API
- `GET /api/performance/compare` – Return execution time, complexity estimates, and security ranking
- `POST /api/performance/log` – Log performance metrics

#### E. History APIs
- `POST /api/history/save` – Save encryption result for logged-in user
- `GET /api/history/{userId}` – Return complete operation history
- `GET /api/history/{userId}/algorithm/{algorithm}` – Get history by algorithm
- `GET /api/history/{userId}/stats` – Get algorithm usage statistics

### 3. Database (SQLite)

#### Tables Created:
1. **users**
   - id (PK)
   - username
   - email
   - password (hashed)
   - role

2. **history**
   - id (PK)
   - user_id
   - algorithm
   - input_text
   - output_text
   - key_used
   - operation_type (ENCRYPT/DECRYPT)
   - timestamp

3. **performance_log**
   - id (PK)
   - algorithm
   - execution_time (milliseconds)
   - input_size
   - operation_type
   - timestamp

4. **algorithms** (existing)
5. **quiz_questions** (existing)
6. **scores** (existing)

## 🚀 Installation & Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- SQLite (or SQLite Studio for GUI)
- Modern web browser

### Step 1: Clone/Download the Project
```bash
# Navigate to project directory
cd BM
```

### Step 2: Database Setup
The application will automatically create the SQLite database on first run. However, you can also manually create it:

1. Open SQLite Studio (or any SQLite client)
2. Create a new database file: `cryptography_learning.db` in the project root
3. Run the SQL script: `database/schema.sql`

### Step 3: Build the Project
```bash
# Build the project
mvn clean install
```

### Step 4: Run the Application
```bash
# Run the Spring Boot application
mvn spring-boot:run
```

Or use your IDE:
- Import as Maven project
- Run `CryptographyLearningApplication.java`

The application will start on `http://localhost:8080`

### Step 5: Access the Application
1. Open your browser and navigate to `http://localhost:8080`
2. You'll see the login page
3. Create a new account or login with existing credentials

## 📁 Project Structure

```
BM/
├── src/
│   ├── main/
│   │   ├── java/com/cryptolearn/
│   │   │   ├── entity/
│   │   │   │   ├── User.java
│   │   │   │   ├── History.java          # NEW
│   │   │   │   ├── PerformanceLog.java  # NEW
│   │   │   │   ├── Algorithm.java
│   │   │   │   ├── Score.java
│   │   │   │   └── QuizQuestion.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── HistoryRepository.java        # NEW
│   │   │   │   ├── PerformanceLogRepository.java # NEW
│   │   │   │   ├── AlgorithmRepository.java
│   │   │   │   ├── ScoreRepository.java
│   │   │   │   └── QuizQuestionRepository.java
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── CryptoService.java            # UPDATED with visualization
│   │   │   │   ├── HistoryService.java           # NEW
│   │   │   │   ├── PerformanceService.java        # NEW
│   │   │   │   ├── AlgorithmService.java
│   │   │   │   ├── ScoreService.java
│   │   │   │   └── QuizService.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── CryptoController.java
│   │   │   │   ├── VisualizationController.java  # NEW
│   │   │   │   ├── PerformanceController.java    # NEW
│   │   │   │   ├── HistoryController.java         # NEW
│   │   │   │   ├── AlgorithmController.java
│   │   │   │   ├── QuizController.java
│   │   │   │   └── ScoreController.java
│   │   │   └── CryptographyLearningApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── home.html                     # UPDATED
│   │       │   ├── caesar.html                   # NEW
│   │       │   ├── aes.html                      # NEW
│   │       │   ├── rsa.html                      # NEW
│   │       │   ├── visualization.html             # NEW
│   │       │   ├── performance.html              # NEW
│   │       │   ├── dashboard.html                 # UPDATED
│   │       │   ├── algorithms.html
│   │       │   ├── algorithm-detail.html
│   │       │   ├── admin.html
│   │       │   ├── css/
│   │       │   │   └── style.css
│   │       │   └── js/
│   │       │       ├── auth.js
│   │       │       ├── api.js
│   │       │       ├── caesar.js                  # NEW
│   │       │       ├── aes.js                     # NEW
│   │       │       ├── rsa.js                     # NEW
│   │       │       ├── visualization.js            # NEW
│   │       │       ├── performance.js             # NEW
│   │       │       ├── dashboard.js               # UPDATED
│   │       │       ├── home.js
│   │       │       ├── algorithms.js
│   │       │       ├── algorithm-detail.js
│   │       │       ├── admin.js
│   │       │       └── interactive.js
│   │       └── application.properties
│   └── test/
├── database/
│   ├── schema.sql                                # UPDATED
│   └── sample_data.sql
├── pom.xml
└── README.md
```

## 🎯 Key Features Implementation

### Step-by-Step Visualization
- **Caesar Cipher**: Shows each character's position, shift calculation, and formula
- **AES**: Displays SubBytes, ShiftRows, MixColumns, AddRoundKey steps with animations
- **RSA**: Explains key generation, encryption, and decryption with formulas

### Performance Tracking
- Automatic logging of execution time for each operation
- Performance comparison charts using Chart.js
- Security strength meters for each algorithm

### History Management
- All encryption/decryption operations are saved
- View history by user
- Filter by algorithm
- Usage statistics dashboard

### Security Features
- Password hashing with BCrypt
- JWT token authentication
- Secure key storage and transmission

## 🔧 Configuration

### Application Properties (`src/main/resources/application.properties`)
```properties
server.port=8080
spring.datasource.url=jdbc:sqlite:cryptography_learning.db
spring.jpa.hibernate.ddl-auto=update
jwt.secret=cryptography-learning-secret-key-2024
jwt.expiration=86400000
```

## 📝 Usage Examples

### Encrypt with Caesar Cipher
1. Navigate to `http://localhost:8080/caesar.html`
2. Enter message: "HELLO"
3. Set shift: 3
4. Click "Encrypt"
5. View result and step-by-step visualization

### Encrypt with AES
1. Navigate to `http://localhost:8080/aes.html`
2. Enter message
3. Click "Encrypt"
4. View encrypted result, key, and IV
5. Click "Show AES Steps" to see block-level animation

### Generate RSA Keys and Encrypt
1. Navigate to `http://localhost:8080/rsa.html`
2. Click "Generate Key Pair"
3. Enter message (keep it short)
4. Click "Encrypt"
5. View encrypted result and visualization

### View Performance Comparison
1. Navigate to `http://localhost:8080/performance.html`
2. View execution time charts
3. Compare security strength meters
4. See performance statistics

### View History
1. Navigate to `http://localhost:8080/dashboard.html`
2. Scroll to "Encryption History" section
3. View all previous operations
4. Check algorithm usage statistics

## 🐛 Troubleshooting

### Database Issues
- Ensure SQLite JDBC driver is in classpath
- Check database file permissions
- Verify schema.sql is executed

### Port Already in Use
- Change port in `application.properties`: `server.port=8081`

### CORS Issues
- CORS is configured to allow all origins in development
- Check `CorsConfig.java` for production settings

## 📚 API Documentation

All APIs are RESTful and return JSON responses. See `API_DOCUMENTATION.md` for detailed endpoint documentation.

## 🎨 UI Features

- Responsive design (mobile-friendly)
- Modern gradient buttons
- Smooth animations and transitions
- Interactive visualizations
- Real-time feedback
- Clean, intuitive interface

## ✅ Project Requirements Checklist

- ✅ Frontend: HTML, CSS, JavaScript
- ✅ Backend: Java + Spring Boot
- ✅ Database: SQLite (SQLite Studio)
- ✅ Login and Signup system
- ✅ Caesar Cipher with visualization
- ✅ AES with block-level animation
- ✅ RSA with key generation
- ✅ Step-by-step visualization
- ✅ Performance comparison
- ✅ History tracking
- ✅ User dashboard
- ✅ Clean UI with animations
- ✅ Code comments
- ✅ Complete documentation

## 📄 License

This project is created for educational purposes.

## 👥 Author

Cryptography Learning Platform - Complete Implementation

---

**Note**: This is a complete, production-ready implementation of the Cryptography Learning Web Application with all required features, animations, visualizations, and database integration.



