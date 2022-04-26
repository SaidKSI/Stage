const jwt = require("jsonwebtoken"); 

const secret="mysecret";

function generateAccessToken(object) {
  return jwt.sign(object, secret);
}
 
 

function verifyAccessToken(token) {
    return jwt.verify(token,secret,function(err,data){
      if(err)
      return false;

      return data
    });
  }




module.exports={generateAccessToken,verifyAccessToken,secret}