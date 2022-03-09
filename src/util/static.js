const BAD_REQUEST = {
    STATUS: 'error',
    DESCRIPTION: 'POST parameters missing',
  };

const AUTH_FAILED = { 
    STATUS: 'error',
    DESCRIPTION: 'Authentication failed',
  };

const LOGIN_SUCCESS = {
    STATUS: 'success',
    DESCRIPTION: 'Successful login',
  };

const USER_CREATED_FAILED = {
    STATUS: 'error',
    DESCRIPTION: 'Error in user creation',
  };

const USER_CREATED = {
    STATUS: 'success',
    DESCRIPTION: 'User created successfully',
  };

  export {
    BAD_REQUEST,
    AUTH_FAILED,
    LOGIN_SUCCESS,
    USER_CREATED_FAILED,
    USER_CREATED,
  };