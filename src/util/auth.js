import pkg from 'jwt-simple';
const {  encode, decode } = pkg;

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
export function checkExpirationStatus(token){
  const now = Date.now();

  if (token.expires > now) return 'active';
  const threeHoursInMs = 3 * 60 * 60 * 1000;
  const threeHoursAfterExpiration = token.expires + threeHoursInMs;

  if (threeHoursAfterExpiration > now) return 'grace';

  return 'expired';
}

export function decodeSession(
  secretKey,
  tokenString,
) {
  const algorithm = 'HS512';

  let result;

  try {
    result = decode(tokenString, secretKey, false, algorithm);
  } catch (_e) {
    const e = _e;

    if (
      e.message === 'No token supplied'
      || e.message === 'Not enough or too many segments'
    ) {
      return {
        type: 'invalid-token',
      };
    }

    if (
      e.message === 'Signature verification failed'
      || e.message === 'Algorithm not supported'
    ) {
      return {
        type: 'integrity-error',
      };
    }

    if (e.message.indexOf('Unexpected token') === 0) {
      return {
        type: 'invalid-token',
      };
    }

    throw e;
  }

  return {
    type: 'valid',
    session: result,
  };
}