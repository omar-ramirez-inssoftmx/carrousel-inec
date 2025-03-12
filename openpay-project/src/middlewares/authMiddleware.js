const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Espera un token en el formato "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agrega los datos del usuario al objeto `req`
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token. Unauthorized.' });
  }
};

module.exports = authMiddleware;