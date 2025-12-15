# Quick Start Guide

Get the Cryptography Learning Application up and running in 5 minutes!

## Prerequisites Check

```bash
java -version    # Should show Java 17+
mvn -version     # Should show Maven 3.6+
```

## Step 1: Build the Project

```bash
mvn clean install
```

## Step 2: Run the Application

```bash
mvn spring-boot:run
```

Wait for: `Started CryptographyLearningApplication`

## Step 3: Open the Application

1. Open browser: `http://localhost:8080/index.html`
2. Or navigate to: `src/main/resources/static/index.html`

## Step 4: Login

**Admin:**
- Username: `admin`
- Password: `admin123`

**Student:**
- Username: `student`
- Password: `student123`

## Step 5: Explore!

- Browse algorithms
- Learn theory and examples
- Practice encryption/decryption
- Take quizzes
- View your dashboard

## That's It! 🎉

The database is created automatically on first run with sample data.

## Troubleshooting

**Port 8080 in use?**
- Change port in `application.properties`: `server.port=8081`
- Update `js/api.js`: `const API_BASE_URL = 'http://localhost:8081/api';`

**Database issues?**
- Database auto-creates on first run
- Check file permissions in project directory

**CORS errors?**
- Ensure backend is running
- Check browser console for details

---

For detailed installation, see [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)

