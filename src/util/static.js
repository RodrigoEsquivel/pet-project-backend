const BAD_REQUEST = {
    STATUS: 'error',
    DESCRIPTION: 'Faltan los parámetros POST',
  };

const AUTH_FAILED = { 
    STATUS: 'error',
    DESCRIPTION: 'La autenticación falló',
  };

const LOGIN_SUCCESS = {
    STATUS: 'success',
    DESCRIPTION: 'INICIO DE SESIÓN EXITOSO',
  };

  export {
    BAD_REQUEST,
    AUTH_FAILED,
    LOGIN_SUCCESS
  };