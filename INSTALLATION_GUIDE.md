# Installation Guide

Complete step-by-step guide to set up and run the Cryptography Learning Application.

## Prerequisites

Before installing, ensure you have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   - Download from: https://adoptium.net/
   - Verify installation: `java -version`

2. **Apache Maven 3.6 or higher**
   - Download from: https://maven.apache.org/download.cgi
   - Verify installation: `mvn -version`

3. **SQLite** (Optional, for manual database management)
   - Download SQLite Studio: https://sqlitestudio.pl/
   - Or use command-line SQLite

4. **Web Browser** (Chrome, Firefox, Edge, etc.)

5. **IDE (Optional but recommended)**
   - IntelliJ IDEA
   - Eclipse
   - VS Code

## Installation Steps

### Step 1: Download/Extract Project

1. Download or clone the project
2. Extract to a folder (e.g., `C:\Projects\cryptography-learning-app`)

### Step 2: Verify Java and Maven

Open terminal/command prompt and verify:

```bash
java -version
# Should show Java 17 or higher

mvn -version
# Should show Maven 3.6 or higher
```

### Step 3: Database Setup

The application will automatically create the database on first run. However, for manual setup:

#### Option A: Automatic (Recommended)
- Just run the application - database will be created automatically
- Sample data will be inserted via `DataInitializer.java`

#### Option B: Manual Setup
1. Open SQLite Studio
2. Create new database: `cryptography_learning.db`
3. Open and execute `database/schema.sql`
4. Open and execute `database/sample_data.sql`

### Step 4: Configure Application (Optional)

Edit `src/main/resources/application.properties`:

```properties
# Change port if 8080 is in use
server.port=8080

# Database path (relative to project root)
spring.datasource.url=jdbc:sqlite:cryptography_learning.db

# JWT secret (change for production)
jwt.secret=cryptography-learning-secret-key-2024
```

### Step 5: Build the Project

Open terminal in project root directory:

```bash
# Clean and build
mvn clean install

# This will:
# - Download dependencies
# - Compile Java code
# - Run tests (if any)
# - Package the application
```

**Expected Output:**
```
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

### Step 6: Run the Application

#### Method 1: Using Maven
```bash
mvn spring-boot:run
```

#### Method 2: Using IDE
1. Open project in your IDE
2. Navigate to `src/main/java/com/cryptolearn/CryptographyLearningApplication.java`
3. Right-click → Run

#### Method 3: Using JAR
```bash
# Build JAR first
mvn clean package

# Run JAR
java -jar target/cryptography-learning-app-1.0.0.jar
```

**Expected Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.1.5)

...
Started CryptographyLearningApplication in X.XXX seconds
```

### Step 7: Access the Application

1. **Frontend**: Open in browser:
   - `http://localhost:8080/index.html`
   - Or directly open `src/main/resources/static/index.html`

2. **API**: Test endpoints at:
   - `http://localhost:8080/api/algorithms`

### Step 8: Login

Use default credentials:

**Admin:**
- Username: `admin`
- Password: `admin123`

**Student:**
- Username: `student`
- Password: `student123`

Or create a new account using the Sign Up form.

## Verification

### Check Backend is Running

1. Open browser: `http://localhost:8080/api/algorithms`
2. Should see JSON response with algorithms list

### Check Database

1. Open SQLite Studio
2. Open `cryptography_learning.db`
3. Verify tables exist:
   - `users`
   - `algorithms`
   - `quiz_questions`
   - `scores`

### Test Frontend

1. Open `index.html` in browser
2. Login with credentials
3. Navigate through pages
4. Test encryption tools
5. Take a quiz

## Troubleshooting

### Issue: Port 8080 Already in Use

**Solution:**
1. Change port in `application.properties`:
   ```properties
   server.port=8081
   ```
2. Update frontend API URL in `js/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8081/api';
   ```

### Issue: Database Not Found

**Solution:**
1. Check database path in `application.properties`
2. Ensure write permissions in project directory
3. Manually create database using SQLite Studio

### Issue: Maven Dependencies Not Downloading

**Solution:**
1. Check internet connection
2. Verify Maven settings: `~/.m2/settings.xml`
3. Try: `mvn clean install -U` (force update)

### Issue: CORS Errors in Browser

**Solution:**
1. Ensure backend is running
2. Check CORS configuration in `CorsConfig.java`
3. Verify API URL in `js/api.js` matches backend URL

### Issue: JWT Token Errors

**Solution:**
1. Clear browser localStorage
2. Login again to get new token
3. Check JWT secret in `application.properties`

### Issue: Frontend Not Loading

**Solution:**
1. Check browser console for errors
2. Verify all JS files are loaded
3. Ensure backend is running
4. Check API calls in Network tab

## Development Setup

### For Development with Hot Reload

1. Install Spring Boot DevTools (already in pom.xml)
2. Enable auto-reload in IDE
3. Changes will auto-reload

### For Production Deployment

1. Build JAR: `mvn clean package`
2. Run: `java -jar target/cryptography-learning-app-1.0.0.jar`
3. Configure environment variables
4. Use production database
5. Set secure JWT secret

## Additional Resources

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- SQLite Documentation: https://www.sqlite.org/docs.html
- Maven Documentation: https://maven.apache.org/guides/

## Support

If you encounter issues:
1. Check error logs in console
2. Verify all prerequisites are installed
3. Review troubleshooting section
4. Check GitHub issues (if applicable)

---

**Note**: This application is designed for educational purposes. For production use, implement additional security measures.

