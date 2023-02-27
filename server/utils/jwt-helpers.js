import jwt from 'jsonwebtoken';

//Generate an access token and a refresh token for this database user
function jwtTokens({ user_id, name, email }) {
  const user = { user_id, name, email}; 
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
  return ({ accessToken, refreshToken });
}

export {jwtTokens};