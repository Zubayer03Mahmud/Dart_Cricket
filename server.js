const path = require('path');

// Vercel serverless function handler
module.exports = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
};
