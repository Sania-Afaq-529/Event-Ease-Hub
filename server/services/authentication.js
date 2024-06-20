const JWT = require("jsonwebtoken");


const secret = "Bilal@123";

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ status: 403, message: 'No token provided' });
  }

  JWT.verify(token.split(' ')[1], secret, (err, decoded) => { // Replace 'your_secret_key' with your actual secret
    if (err) {
      return res.status(500).send({ status: 500, message: 'Failed to authenticate token' });
    }
    req.userId = decoded._id;
    next();
  });
};



function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const validate = JWT.verify(token, secret);
  return validate;
}

module.exports = {
  createToken,
  validateToken,
  verifyToken
};