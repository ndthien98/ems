const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt'
const JWT_EXPIRES_TIME = process.env.JWT_EXPIRES_TIME || '30d'

const SALT_ROUND = 10

const generatePassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUND)
  return hashedPassword;
}

const verifyPassword = async (password, hashedPassword) => {
  const result =
    await bcrypt.compare(
      password,
      hashedPassword
    );
  return result;
};

const generateToken = data => {
  return jwt.sign(data, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });
}

const verifyToken = token => {
  const data = jwt.verify(token, JWT_SECRET_KEY);
  delete data.iat
  delete data.exp
  return data
}



module.exports = {
  generatePassword,
  verifyPassword,
  generateToken,
  verifyToken,
}