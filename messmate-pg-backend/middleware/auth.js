const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecret';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // expects "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token expired or invalid' });
    req.user = decoded; // attach user info to request
    next();
  });
};

module.exports = authenticateToken;
