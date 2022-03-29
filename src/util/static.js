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

const PRODUCT_CREATED = {
    STATUS: 'success',
    DESCRIPTION: 'Product created successfully',
  };

const PRODUCT_CREATED_FAILED = {
    STATUS: 'error',
    DESCRIPTION: 'Error in product creation',
  };

const PRODUCTS_SELECTED = {
    STATUS: 'success',
    DESCRIPTION: 'Products selected successfully',
  };

const PRODUCTS_SELECTED_FAILED = {
    STATUS: 'error',
    DESCRIPTION: 'Error in products selection',
  };

const PRODUCTS_BY_USER_SELECTED = {
    STATUS: 'success',
    DESCRIPTION: 'Products selected successfully',
  };

const PRODUCTS_BY_USER_SELECTED_FAILED = {
    STATUS: 'error',
    DESCRIPTION: 'Error in products selection',
  };

  const USER_DELETED = {
    STATUS: 'success',
    DESCRIPTION: 'User deleted successfully',
  };

const USER_DELETED_FAILED = {
    STATUS: 'error',
    DESCRIPTION: 'Error in user deletion',
  };

  const USER_UPDATED = {
    STATUS: 'success',
    DESCRIPTION: 'User updated successfully',
  };

const USER_UPDATED_FAILED = {
    STATUS: 'error',
    DESCRIPTION: 'Error in user update',
  };

  const USER_READ = {
    STATUS: 'success',
    DESCRIPTION: 'User read successfully',
  };

const USER_READ_FAILED = {
    STATUS: 'error',
    DESCRIPTION: 'Error in user read',
  };



  export {
    BAD_REQUEST,
    AUTH_FAILED,
    LOGIN_SUCCESS,
    USER_CREATED_FAILED,
    USER_CREATED,
    PRODUCT_CREATED,
    PRODUCT_CREATED_FAILED,
    PRODUCTS_SELECTED,
    PRODUCTS_SELECTED_FAILED,
    PRODUCTS_BY_USER_SELECTED,
    PRODUCTS_BY_USER_SELECTED_FAILED,
    USER_DELETED,
    USER_DELETED_FAILED,
    USER_UPDATED,
    USER_UPDATED_FAILED,
    USER_READ,
    USER_READ_FAILED
  };