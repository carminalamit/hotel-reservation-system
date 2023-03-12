import jwt from 'jsonwebtoken';

//Generate an access token and a refresh token for this database user
function jwtTokens({ id, name, email }) {
  const user = { id, name, email}; 
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6hr' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '6hr' });
  return ({ accessToken, refreshToken });
}

export {jwtTokens};