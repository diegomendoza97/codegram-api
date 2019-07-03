const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = (req,res,next)=> {
  try {
    
    const token = req.headers.authorization.split(':')[1];
    const decoded  = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    next();
  } catch(err) {
    // console.log(err);
    return res.json({err: err, code: 51});
  }
}
