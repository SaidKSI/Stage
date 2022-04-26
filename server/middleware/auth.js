const jwt = require("jsonwebtoken"); 
const { secret } = require("./utils");

    const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    
    const token = authHeader?.split(" ")[1];
 
    if (token === null) return res.status(403).json({status: "failed", error: "unauthorized"})

    jwt.verify(token, secret, (err, userData) => { 
      if (err) 
      return res.status(403).json({status: "failed", error: "unauthorized"})
      
      next();
    });
  };

  module.exports={authenticateToken}