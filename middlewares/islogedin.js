const jwt = require('jsonwebtoken')
const jwtSecret = 'efcedff1bbf859a398ab876d8b6a437ccb0a5a51cb99b2c81ed6f6a9c8b022a6'
module.exports=isLoggedIn = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not provided' });
    }
  
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user; 
      
      next();
    });
  };