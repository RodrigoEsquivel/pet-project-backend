import joi from 'joi';


const login = {
    body: joi.object().keys({
      Email: joi.string().email({ tlds: { allow: false } }),
      Password: joi
        .string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        )
        .required(),
    }),
  };

  const create = {
    body: joi.object().keys({
      Email: joi.string().email({ tlds: { allow: false } }),
      Name: joi.string().required(),
      LastName: joi.string().required(),
      Role: joi.string().required(),
      Password: joi
        .string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        )
        .required(),
    }),
  };

  const deleteUser = {
    headers: joi.object().keys({
      authorization: joi.string().required(),
    }),
    body: joi.object().keys({
      UserId: joi.string().required(),
    }),
  };

  const update = {
    headers: joi.object().keys({
      authorization: joi.string().required(),
    }),
    body: joi.object().keys({
      UserId: joi.string().required(),
      Email: joi.string().email({ tlds: { allow: false } }),
      Name: joi.string().required(),
      LastName: joi.string().required(),
      Role: joi.string().required(),
      Password: joi
        .string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        )
        .required(),
      NewPassword: joi
        .string()
        .pattern(
          new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        )
        .required(),
    }),
  };

  const read = {
    headers: joi.object().keys({
      authorization: joi.string().required(),
    }),
    body: joi.object().keys({
      UserId: joi.string().required(),
    }),
  };

  const validateEmail = {
    body: joi.object().keys({
      Email: joi.string().email().required(),
    }),
  };

  export {login, create, deleteUser, update, read, validateEmail};