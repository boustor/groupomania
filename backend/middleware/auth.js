const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId;
    next();
  } catch {
    res.status(401).json({
      //error: new Error('Invalid request!')
      message: "Etoken"
    });
  }
};