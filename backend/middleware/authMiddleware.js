const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token);

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    req.userId = decoded.userId;
    console.log('Set userId:', req.userId);

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
