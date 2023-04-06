require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticate  = (req,res,next)=>{

  const token = req.headers.token;

  const decoded = jwt.verify(token,process.env.KEY);
  console.log(decoded);
  if(decoded){
    req.body.userID = decoded.userID;
    next();
  }else{
    res.send({'msg':"token not verified"});
  }
  
}

module.exports = {authenticate}