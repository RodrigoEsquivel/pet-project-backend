import pkg from 'jwt-simple';
const {  encode } = pkg;

export function encodeSession(
  secretKey,
  partialSession,
){
  const algorithm = 'HS512';
  const issued = Date.now();
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
  const expires = issued + sevenDaysInMs;
  const session = {
    ...partialSession,
    issued,
    expires,
  };

  return {
    token: encode(session, secretKey, algorithm),
    issued,
    expires,
  };
}
