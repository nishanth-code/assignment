const jwt = require('jsonwebtoken');
const jwtSecret = 'efcedff1bbf859a398ab876d8b6a437ccb0a5a51cb99b2c81ed6f6a9c8b022a6' 
const jwtOptions = {
  expiresIn: '24h' 
};

module.exports =  generateJWT = async(req,res)=>{
    const user = req.user;
    const token = jwt.sign({ id: user._id }, jwtSecret, jwtOptions);
   
    
  res.status(200).json({msg:'authentication sucessful',token})    
  }