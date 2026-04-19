const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('./db');
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const connection = await pool.getConnection();

    // Check if user already exists
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username],
    );

    if (rows.length > 0) {
      connection.release();
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
    );

    connection.release();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const connection = await pool.getConnection();

    // Find user
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    if (rows.length === 0) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    connection.release();
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
