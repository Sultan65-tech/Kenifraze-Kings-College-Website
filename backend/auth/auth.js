// auth.js
import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  // Get the token from the header: "Bearer <TOKEN>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // 1. Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // 2. Verify token against your secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified; // Save token data to the request object
    next(); // Pass control to the next function (route handler)
  } catch (error) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
}

export default verifyToken;





// Authentication Note

// install 
// jsonwebtoken
// dotenv--To store environment variable
// bcrypt  Allows crypto graphy and password hasing