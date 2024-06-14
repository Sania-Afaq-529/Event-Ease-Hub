const JWT = require("jsonwebtoken");

const secret = "Bilal@123";

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
};