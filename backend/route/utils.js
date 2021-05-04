const jwt=require("jsonwebtoken")
var config = require('../config.json');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  console.log(token);
    jwt.verify(token, config.SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "invalid token" })
      req.user = user
      next()
    })
  }

  exports.authenticateToken=authenticateToken;