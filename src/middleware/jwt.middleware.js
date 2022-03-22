import httpStatus from 'http-status';
import { AUTH_FAILED } from '../util/static.js';
import {
  decodeSession,
  checkExpirationStatus,
  encodeSession,
} from '../util/auth.js';
import { jwtSecretKey } from '../configuration/config.js';

export default function requireJwtMiddleware(
  request,
  response,
  next,
) {
  const requestHeader = 'authorization';
  const responseHeader = 'X-Renewed-JWT-Token';
  const header = request.header(requestHeader);

  if (!header) {
    response.status(httpStatus.UNAUTHORIZED).send({
      ...AUTH_FAILED,
      message: `Required ${requestHeader} header not found.`,
      TIMESTAMP: Date.now(),
    });
    return;
  }

  const decodedSession = decodeSession(jwtSecretKey, header);

  if (
    decodedSession.type === 'integrity-error'
    || decodedSession.type === 'invalid-token'
  ) {
    response.status(httpStatus.UNAUTHORIZED).send({
      ...AUTH_FAILED,
      message: `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`,
      TIMESTAMP: Date.now(),
    });
    return;
  }

  const expiration = checkExpirationStatus(
    decodedSession.session,
  );

  if (expiration === 'expired') {
    response.status(httpStatus.UNAUTHORIZED).send({
      ...AUTH_FAILED,
      message:
        'Authorization token has expired. Please create a new authorization token.',
      TIMESTAMP: Date.now(),
    });
    return;
  }

  let session;

  if (expiration === 'grace') {
    const { token, expires, issued } = encodeSession(
      jwtSecretKey,
      decodedSession.session,
    );
    session = {
      ...decodedSession.session,
      expires,
      issued,
    };

    response.setHeader(responseHeader, token);
  } else {
    session = decodedSession.session;
  }

  response.locals = {
    ...response.locals,
    session,
  };

  next();
}