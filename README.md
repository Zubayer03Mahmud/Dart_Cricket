# 🏏 Dart Cricket - Login/Register System Setup

## Prerequisites
- **Node.js** installed on your machine
- **MySQL Server** running locally or remotely
- **npm** package manager

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create MySQL Database
Open MySQL command line or MySQL Workbench and run the SQL commands from `database.sql`:

```sql
CREATE DATABASE IF NOT EXISTS dart_cricket;
USE dart_cricket;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_username ON users(username);
```

### 3. Update Database Configuration
Edit `db.js` and update your MySQL credentials:

```javascript
const pool = mysql.createPool({
  host: 'localhost',        // Your MySQL host
  user: 'root',            // Your MySQL username
  password: 'your_password', // Your MySQL password
  database: 'dart_cricket',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

### 4. Start the Server
```bash
node server.js
```

The server will run on `http://localhost:3000`

## Features

✅ **User Registration**
- Username validation
- Email validation
- Password hashing with bcryptjs
- Duplicate account prevention

✅ **User Login**
- Email-based authentication
- Secure password verification
- User session confirmation

✅ **Database**
- MySQL with promise-based queries
- Connection pooling for performance
- Indexed lookups for speed

## Project Structure

```
├── server.js          # Main Express server
├── auth.js            # Authentication routes & logic
├── auth.html          # Login/Register UI
├── db.js              # MySQL database connection
├── database.sql       # Database schema
├── index.html         # Game page (accessible after login)
├── package.json       # Dependencies
└── README.md          # This file
```

## API Endpoints

### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## Security Features

🔒 **Password Hashing**: Uses bcryptjs for secure password storage
🔒 **Input Validation**: Server-side validation of all inputs
🔒 **SQL Injection Prevention**: Uses parameterized queries
🔒 **CORS Ready**: Can be extended with CORS middleware

## Troubleshooting

### "Connection refused" error
- Ensure MySQL server is running
- Check your host, user, and password in `db.js`

### "User already exists" error
- The email or username is already registered
- Try with a different email/username

### "Invalid email or password"
- Check your credentials
- Ensure the account exists in the database

## Next Steps

- Add session management (JWT tokens)
- Implement email verification
- Add password reset functionality
- Add user profile page
- Implement two-factor authentication
